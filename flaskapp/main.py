import warnings
warnings.filterwarnings('ignore')
from flask import Flask, render_template, request,jsonify
import numpy as np
import pandas as pd
from flask_cors import CORS
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.metrics.pairwise import cosine_similarity

from sklearn.metrics import mean_squared_error

from scipy.sparse.linalg import svds # for sparse matrices

import pymongo
from scipy.sparse import csr_matrix
import json

def get_product_history():
    connection_string = "mongodb+srv://sakshamag21:sakshamag21@cluster0.uoww15d.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(connection_string)
    db = client['test']
    collection = db['userhistories']
    all_documents = collection.find()
    parsed_data = [documents for documents in all_documents]
    df = pd.DataFrame(parsed_data)
    # print(df)
    client.close()
    return df

app = Flask(__name__)
CORS(app)
df=get_product_history()
df=df.drop('__v',axis=1)
most_viewed = df.groupby('user_id').size().sort_values(ascending=False)
final_viewer_matrix = df.pivot(index = 'user_id', columns ='product_id', values = 'quantity').fillna(0)
possible_num_of_viewer = final_viewer_matrix.shape[0] * final_viewer_matrix.shape[1]
given_num_of_viewer = np.count_nonzero(final_viewer_matrix)

average_views = df.groupby('product_id').mean()['quantity']
count_views = df.groupby('product_id').count()['quantity']
final_views = pd.DataFrame({'avg_views':average_views, 'views_count':count_views})
final_views = final_views.sort_values(by='avg_views',ascending=False)

def top_n_products(final_views, n, min_interaction):
    recommendations = final_views[final_views['views_count']>min_interaction]
    
    #Sorting values w.r.t average rating 
    recommendations = recommendations.sort_values('avg_views',ascending=False)
    
    return recommendations.index[:n]

final_viewer_matrix['user_id'] = np.arange(0, final_viewer_matrix.shape[0])
final_viewer_matrix.set_index(['user_id'], inplace=True)

def similar_users(user_id, interactions_matrix):
    similarity = []
    for user in range(0, interactions_matrix.shape[0]): #  .shape[0] gives number of rows
        
        #finding cosine similarity between the user_id and each user
        sim = cosine_similarity([interactions_matrix.loc[user_id]], [interactions_matrix.loc[user]])
        
        #Appending the user and the corresponding similarity score with user_id as a tuple
        similarity.append((user,sim))
        
    similarity.sort(key=lambda x: x[1], reverse=True)
    most_similar_users = [tup[0] for tup in similarity] #Extract the user from each tuple in the sorted list
    similarity_score = [tup[1] for tup in similarity] ##Extracting the similarity score from each tuple in the sorted list
   
    #Remove the original user and its similarity score and keep only other similar users 
    most_similar_users.remove(user_id)
    similarity_score.remove(similarity_score[0])
       
    return most_similar_users, similarity_score


def recommendations(user_id, num_of_products, interactions_matrix):
    
    #Saving similar users using the function similar_users defined above
    most_similar_users = similar_users(user_id, interactions_matrix)[0]
    
    #Finding product IDs with which the user_id has interacted
    product_ids = set(list(interactions_matrix.columns[np.where(interactions_matrix.loc[user_id] > 0)]))
    recommendations = []
    
    observed_interactions = product_ids.copy()
    for similar_user in most_similar_users:
        if len(recommendations) < num_of_products:
            
            #Finding 'n' products which have been rated by similar users but not by the user_id
            similar_user_product_ids = set(list(interactions_matrix.columns[np.where(interactions_matrix.loc[similar_user] > 0)]))
            recommendations.extend(list(similar_user_product_ids.difference(observed_interactions)))
            observed_interactions = observed_interactions.union(similar_user_product_ids)
        else:
            break
    
    return recommendations[:num_of_products]


final_viewer_sparse = csr_matrix(final_viewer_matrix.values)

U, s, Vt = svds(final_viewer_sparse,k=2) 
sigma = np.diag(s)

all_user_predicted_viewer = np.dot(np.dot(U, sigma), Vt) 

# Predicted ratings
preds_df = pd.DataFrame(abs(all_user_predicted_viewer), columns = final_viewer_matrix.columns)
preds_df.head()
preds_matrix = csr_matrix(preds_df.values)

def recommend_items(user_id, interactions_matrix, preds_matrix, num_recommendations):
    user_ratings = interactions_matrix[user_id,:].toarray().reshape(-1)
    user_predictions = preds_matrix[user_id,:].toarray().reshape(-1)
    temp = pd.DataFrame({'user_ratings': user_ratings, 'user_predictions': user_predictions})
    temp['Recommended Products'] = np.arange(len(user_ratings))
    temp = temp.set_index('Recommended Products')
    temp = temp.loc[temp.user_ratings == 0]   
    temp = temp.sort_values('user_predictions',ascending=False)
    print('\nBelow are the recommended products for user(user_id = {}):\n'.format(user_id))
    print(temp['user_predictions'].head(num_recommendations))



@app.route('/allmostviewed',methods=['POST'])
def our_most_viewed():
    ans=top_n_products(final_views,10,1)
    return jsonify(ans)

@app.route('/yourmostviewed',methods=['POST'])
def your_most_viewed():

    return 'list of most viewed product by person'

@app.route('/recommended',methods=['POST'])
def most_recommended():
    ans= recommendations(1,10,interactions_matrix)
    return 'recommended product for you'






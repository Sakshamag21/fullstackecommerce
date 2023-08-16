import csv
import json
import ast

# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):
    data = []
    i = 0

    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        
        # Convert each row into a dictionary
        # and add it to data
        for rows in csvReader:
            url_list=['k']
            if (rows['image']):
                url_list = ast.literal_eval(rows['image'])  # Parse list using ast.literal_eval()
            hhl= str(url_list[0])
            # print(type(hhl),type('hell'))
            # Check if the prices are not empty strings
            if rows['discounted_price'] and rows['retail_price']:
                discount = str(round((int(rows['discounted_price']) / int(rows['retail_price'])) * 100))
            else:
                discount = 'N/A'
                
            newrow = {
                'id': rows['uniq_id'],
                'url':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZQAM89Vy0PpK014JHaBxY_y-3G2rt9CiRYA&usqp=CAU',
                'detailUrl': rows['product_url'],
                'title': {
                    'shortTitle': rows['product_name'],
                    'longTitle': rows['brand']
                },
                'price': {
                    'mrp': rows['retail_price'],
                    'cost': rows['discounted_price'],
                    'discount': discount
                },
                'quantity': 50,
                'description': rows['description'],
                'discount': 'None',
                'tagline': 'None'
            }
            data.append(newrow)
            i += 1

    # Open a json writer, and use the json.dumps()
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
        
# Driver Code
# Decide the two file paths according to your
# computer system
csvFilePath = r'flipkart_com-ecommerce_sample.csv'
jsonFilePath = r'Names.json'

# Call the make_json function
make_json(csvFilePath, jsonFilePath)

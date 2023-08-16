import json

# Read JSON data from input file
with open('lessProduct.json', 'r') as f:
    data = json.load(f)

# Perform the transformation
transformed_data = []
for entry in data:
    # print(type(entry['images']),entry['images'][0])
    gg= 'N/A'
    if (len(entry['images'])>0):
        gg= entry['images'][0]

    newrow = {
                'id': entry['_id'],
                'url':gg,
                'detailUrl': entry['url'],
                'title': {
                    'shortTitle': entry['title'],
                    'longTitle': 'N/A'
                },
                'price': {
                    'mrp': entry['actual_price'],
                    'cost': entry['selling_price'],
                    'discount': entry['discount']
                },
                'quantity': 50,
                'description': entry['description'],
                'discount': entry['discount'],
                'tagline': 'None',
                'category':entry['sub_category']
            }
    transformed_data.append(newrow)

# Write transformed data to output file
with open('output.json', 'w') as f:
    json.dump(transformed_data, f, indent=4)

print("Transformation complete. Check 'output.json' file.")

# app.py
from flask import Flask, render_template, send_from_directory, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from wordcloud import WordCloud
import matplotlib.pyplot as plt, mpld3
import os

app = Flask(__name__, static_folder='client/build', static_url_path='')
cors = CORS(app)

@app.route('/api/', methods=['GET'])
@cross_origin()
def respond():
    return "Welcome to the API!!!"


@app.route('/api/justpie/')
@cross_origin()
def generatePie():
    # Get the input data (Wedge is the distance between slices)
    data = request.args.get('data')
    colors = request.arts.get('colors')
    wedge = request.args.get('wedge')
        
    # Turn it into a list
    data = [float(i) for i in data.split(',')]
    colors = ['#'+i for i in colors.split(',')]

    # Make a matplotlib pie chart
    fig1, ax1 = plt.subplots(figsize=(20, 20))
    patches, texts = ax1.pie(data, 
                             explode=[float(wedge) for w in range(0, len(data))],
                             colors=colors,
                             startangle=90)
    
    # Equal aspect ratio
    ax1.axis('equal')
    plt.tight_layout()

    # Save the impage temporary on the local machine
    plt.savefig(os.getcwd() + '/test.png')


@app.route('/api/wordcloud/', methods=['GET'])
@cross_origin()
def generateWordCloud():
    # Get the input data (Wedge is the distance between slices)
    data = request.args.get('data')
    colors = request.arts.get('colors')
    wedge = request.args.get('wedge')
    
    # Turn it into a list
    data = [float(i) for i in data.split(',')]
    colors = ['#'+i for i in colors.split(',')]

    # Generate the word cloud object   
    wordcloud = WordCloud().generate(str(data))
    
    # Plot configurations
    plt.switch_backend('Agg')
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis("off")

    # Show the plot
    mpld3.show()

    # Save the image temporary on the local machine
    # plt.savefig(os.getcwd() + '/test.png')

    response = {}
    response["SUCCESS"] = f"Your word cloud was downloaded!!"
    return jsonify(response)


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(host='0.0.0.0')


# app.py
from flask import Flask, request, jsonify
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import os

app = Flask(__name__)

@app.route('/api/', methods=['GET'])
def respond():
    return "Welcome to the API!!!"


@app.route('/api/wordcloud/', methods=['GET'])
def generateWordCloud():
    # Get the input data (Wedge is the distance between slices)
    data = request.args.get('data')
    print(data)

    # Generate the word cloud object   
    wordcloud = WordCloud().generate(str(data))

    # Create and save the image to the current working directory
    image = wordcloud.to_image()
    image.save(os.getcwd() + '/test.png')
    
    """

    # Plot configurations
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis("off")

    # Show the plot
    plt.show()

    # Save the image temporary on the local machine
    plt.savefig(os.getcwd() + '/test.png')

    """

    response = {}
    response["SUCCESS"] = f"Your word cloud was downloaded!!"
    return jsonify(response)

@app.route('/')
def index():
    return "<h1>Word Cloud Generator App!!</h1>"


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)


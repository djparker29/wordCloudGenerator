# app.py
from flask import Flask, redirect, render_template, send_from_directory, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import os

app = Flask(__name__, static_folder='client/build', static_url_path='')
cors = CORS(app)

@app.route('/api/')
@cross_origin()
def respond():
  return redirect('/')


@app.route('/api/justpie/', methods=['GET', 'POST'])
@cross_origin()
def generatePie():
    
  # User reached route via POST
  if request.method == 'POST':
        
    # Get the input data (Wedge is the distance between slices)
    if not request.args.get('data') or not request.args.get('colors') or not request.args.get('wedge'):
      data = "10,25,40,25"
      colors = "#41B883,#E46651,#00D8FF,#DD1B16"
      wedge = "0.05"
    else:
      data = request.args.get('data')
      colors = request.args.get('colors')
      request.args.get('wedge')
            
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

    # User reached route via GET
  else:
    return redirect('/')


@app.route('/api/wordcloud/', methods=['GET', 'POST'])
@cross_origin()
def generateWordCloud():
   
  if request.method == 'POST':

    # Get the input data (Wedge is the distance between slices)
    data = request.args.get('data')
    colors = request.arts.get('colors')
        
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
    # mpld3.show()

    # Save the image temporary on the local machine
    # plt.savefig(os.getcwd() + '/test.png')

    response = {}
    response["SUCCESS"] = f"Your word cloud was downloaded!!"
    return jsonify(response)

  else:
    return redirect('/')


@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(host='0.0.0.0')


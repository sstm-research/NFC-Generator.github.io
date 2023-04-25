from flask import Flask, jsonify, request, make_response
import webbrowser
from database import *
from flask_cors import CORS
from flask_cors import cross_origin
app = Flask(__name__)
CORS(app)

@app.route('/gerenciador', methods=['POST'])
@cross_origin()
def entrada():        
    create_table('pagteste1')
    links = request.json
    print(links)
    for linha in range(len(links["links"])):
        link = links["links"][linha]
        inserir_links('pagteste1', link)
    return make_response(jsonify(links))

@app.route('/consultor', methods=['GET'])
@cross_origin()
def link():
    numero_acess = update('pagteste1')
    #link = webbrowser.open(numero_acess[2],new=0)
    print(numero_acess)
    return make_response(jsonify(numero_acess, 'guia aberta com sucesso'))


app.run(port=5000, host='localhost', debug=True)
if __name__ == '__main__':
    app.run()
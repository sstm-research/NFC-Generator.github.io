from flask import Flask, jsonify, request, make_response
import webbrowser
from database import *

app = Flask(__name__)


@app.route('/gerenciador', methods=['POST'])
def entrada():
    create_table('pagteste1')
    links = request.json
    for linha in range(len(links["links"])):
        link = links["links"][linha]
        inserir_links('pagteste1', link)
    return links


@app.route('/consultor', methods=['GET'])
def link():
    numero_acess = update('pagteste1')
    #link = webbrowser.open(numero_acess[2],new=0)
    print(numero_acess)
    return make_response(jsonify(numero_acess, 'guia aberta com sucesso'))


app.run(port=5000, host='localhost', debug=True)

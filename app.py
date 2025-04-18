from flask import Flask, request, jsonify, render_template
import speech_recognition as sr
import json
import os
from tempfile import NamedTemporaryFile

app = Flask(__name__)

with open('./data/manaus_centro.json', 'r', encoding='utf-8') as f:
    base_conhecimento = json.load(f)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    pergunta = data.get('query', '').lower()

    resposta = responder(pergunta)
    return jsonify({
        'response': resposta,
        'audio_url': ''
    })


def responder(pergunta):
    if "café" in pergunta:
        return listar_opcoes(base_conhecimento['cafes'], "cafés")
    elif "restaurante" in pergunta:
        return listar_opcoes(base_conhecimento['restaurantes'], "restaurantes")
    elif "turístico" in pergunta or "ponto" in pergunta:
        return listar_opcoes(base_conhecimento['pontos_turisticos'], "pontos turísticos")
    elif "hotel" in pergunta or "hospedar" in pergunta:
        return listar_opcoes(base_conhecimento['hoteis'], "hotéis")
    elif "historia" in pergunta or "história" in pergunta:
        return listar_opcoes(base_conhecimento['história'], "história")
    elif "bar" in pergunta or "bares" in pergunta:
        return listar_opcoes(base_conhecimento['bares'], "bares")
    elif "noturna" in pergunta or "noturnas" in pergunta:
        return listar_opcoes(base_conhecimento['noturna'], "casas noturnas")
    else:
        return "Desculpe, não entendi sua pergunta. Tente perguntar sobre a história, cafés, restaurantes, hotéis ou pontos turísticos no centro de Manaus."


def listar_opcoes(lista, tipo):
    resposta = f"Aqui estão algumas opções de {tipo} no centro histórico de manaus:\n"
    for lugar in lista:
        resposta += f"- {lugar['nome']} (Endereço: {lugar['endereco']}): {lugar['descricao']}\n"
    return resposta.strip()


if __name__ == '__main__':
    app.run(debug=True)

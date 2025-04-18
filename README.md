# Guia Turístico do Centro de Manaus

# Sistema de Perguntas e Respostas com Reconhecimento de Voz

Este sistema permite que o usuário faça perguntas usando sua voz, e o sistema responde com informações sobre cafés, restaurantes, pontos turísticos, hotéis e história do centro de Manaus. Ele utiliza reconhecimento de fala, síntese de voz e uma base de dados local em formato JSON para fornecer respostas detalhadas.

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript
  - `webkitSpeechRecognition` (API de Reconhecimento de Voz no Navegador)
  - `SpeechSynthesisUtterance` (Síntese de voz no navegador)
- **Backend**: Flask (Python)
  - Biblioteca `speech_recognition` para transcrição de áudio
  - `json` para carregar a base de dados de informações sobre Manaus
- **Base de Dados**: JSON (dados estáticos sobre o centro de Manaus)

## Funcionalidades

1. **Reconhecimento de voz**: O usuário pode fazer perguntas usando sua voz. O navegador utiliza o reconhecimento de voz para capturar o áudio e transformá-lo em texto.
2. **Respostas com áudio**: O sistema responde com texto e pode sintetizar a resposta em áudio, permitindo uma interação mais dinâmica e acessível.
3. **Base de Conhecimento**: O sistema possui informações sobre:
   - Cafés
   - Restaurantes
   - Pontos turísticos
   - Hotéis
   - História do centro de Manaus
   - Bares
   - casas noturnas
   - Portos de Manaus

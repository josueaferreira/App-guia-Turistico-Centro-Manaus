document.addEventListener('DOMContentLoaded', function() {
    const micBtn = document.getElementById('mic-btn');
    const stopBtn = document.getElementById('stop-btn');
    const statusText = document.getElementById('status-text');

    let isRecording = false;
    let recognition;

    function speakText(text) {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance();
            speech.text = text;
            speech.lang = 'pt-BR';
            speech.volume = 1;
            speech.rate = 1.2;
            speech.pitch = 1;

            const voices = window.speechSynthesis.getVoices();
            for (const voice of voices) {
                if (voice.lang.includes('pt') || voice.lang.includes('PT')) {
                    speech.voice = voice;
                    break;
                }
            }

            if (voices.length === 0) {
                window.speechSynthesis.onvoiceschanged = function() {
                    const voices = window.speechSynthesis.getVoices();
                    for (const voice of voices) {
                        if (voice.lang.includes('pt') || voice.lang.includes('PT')) {
                            speech.voice = voice;
                            break;
                        }
                    }
                    window.speechSynthesis.speak(speech);
                };
            } else {
                window.speechSynthesis.speak(speech);
            }

            speech.onend = function() {
                statusText.textContent = "Clique para fazer outra pergunta";
            };
        } else {
            console.error('Síntese de voz não suportada neste navegador');
            statusText.textContent = "Síntese de voz não suportada neste navegador";
        }
    }

    async function processQuery(text) {
        try {
            statusText.textContent = 'Processando sua pergunta...';

            const response = await fetch('/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: text }),
            });

            const data = await response.json();

            statusText.innerHTML = data.response.replace(/\n/g, '<br>');

            speakText(data.response);

        } catch (error) {
            console.error('Erro ao processar pergunta:', error);
            statusText.textContent = 'Erro ao processar sua pergunta. Tente novamente.';
        }
    }

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'pt-BR';

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            statusText.textContent = `Pergunta reconhecida: "${transcript}"`;

            processQuery(transcript);
        };

        recognition.onerror = function(event) {
            console.error('Erro de reconhecimento:', event.error);
            statusText.textContent = `Erro ao reconhecer fala: ${event.error}`;
            isRecording = false;
            micBtn.classList.remove('recording');
        };

        recognition.onend = function() {
            isRecording = false;
            micBtn.classList.remove('recording');
        };
    } else {
        statusText.textContent = 'Reconhecimento de voz não suportado neste navegador.';
        micBtn.disabled = true;
    }

    //clique para ativar ou desativar o mic
    micBtn.addEventListener('click', function() {
        if (!isRecording && recognition) {
            recognition.start();
            isRecording = true;
            micBtn.classList.add('recording');
            statusText.textContent = 'Ouvindo... Fale sua pergunta';
        } else if (isRecording && recognition) {
            recognition.stop();
            isRecording = false;
            micBtn.classList.remove('recording');
            statusText.textContent = 'Processando...';
        }
    });

    //clique para parar de
    stopBtn.addEventListener('click', function() {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            statusText.textContent = "Fala interrompida.";
        }
    });
});

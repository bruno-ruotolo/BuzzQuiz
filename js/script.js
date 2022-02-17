//TESTANDO PUSH
// Variaveis Globais
let tela1 = document.querySelector('.tela-1');

// function inicializada toda vez que clicar em Criar Quizz
function criarQuizz() {
    tela1.classList.add("escondido");
    const tela3_1 = document.querySelector('.tela-3-1');
    tela3_1.classList.remove("escondido");
}

function criarQuizzTela3_1() {
    if (criarQuizzTela3_1_Validacoes() === 1) {
        alert("Por favor, preencha os dados corretamente antes de prosseguir");
    }
    else if (criarQuizzTela3_1_Validacoes() === 0) {
        avacarTela3_2();
    }
}

function avacarTela3_2() {
    const tela3_1 = document.querySelector('.tela-3-1');
    tela3_1.classList.add("escondido");
    const tela3_2 = document.querySelector('.tela-3-2');
    tela3_2.classList.remove("escondido");
}

function criarQuizzTela3_1_Validacoes() {
    let erroContador = 0;

    const inputVazio = document.querySelectorAll(".tela-3-1 input");

    const tituloPerguntaValue = document.querySelector('.titulo-pergunta').value;
    const urlPerguntaValue = document.querySelector('.url-pergunta').value;
    const quantidadePerguntaValue = parseInt(document.querySelector('.quantidade-pergunta').value);
    const quantidadeNiveisPerguntaValue = parseInt(document.querySelector('.quantidade-niveis-pergunta').value);

    const validacoesParaUrl = urlPerguntaValue.includes('jpg') || urlPerguntaValue.includes('png') || urlPerguntaValue.includes('jpeg');

    inputVazio.forEach((inputVazio) => {
        if (inputVazio.value === "") {
            erroContador = 1;
        } else {
            if (tituloPerguntaValue.length < 20 || tituloPerguntaValue.length > 65) {
                erroContador = 1;
            } else if (!validacoesParaUrl) {
                erroContador = 1;
            } else if (quantidadePerguntaValue < 3) {
                erroContador = 1;
            } else if (quantidadeNiveisPerguntaValue < 2 || typeof quantidadeNiveisPerguntaValue !== 'number') {
                erroContador = 1;
            } else {
                (erroContador = 0)
            };
        }

    });

    return erroContador;
}

function criarQuizzTela3_2() {
    const tela3_2 = document.querySelector('.tela-3-2');
    tela3_2.classList.add("escondido");
    const tela3_3 = document.querySelector('.tela-3-3');
    tela3_3.classList.remove("escondido");
}

function criarQuizzTela3_3() {
    const tela3_3 = document.querySelector('.tela-3-3');
    tela3_3.classList.add("escondido");
    const tela3_4 = document.querySelector('.tela-3-4');
    tela3_4.classList.remove("escondido");
}

function voltarHome() {
    const tela3 = document.querySelector('.tela-3');
    tela3.classList.add("escondido");
    tela1.classList.remove("escondido")
}
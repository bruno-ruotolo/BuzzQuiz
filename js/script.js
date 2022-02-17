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
    // INVERTI PARA TESTAR A OUTRA TELA
    if (criarQuizzTela3_1_Validacoes() === 0) {
        alert("Por favor, preencha os dados corretamente antes de prosseguir");
    }
    else if (criarQuizzTela3_1_Validacoes() === 1) {
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
                console.log("Teste Quantidade");
            } else if (quantidadeNiveisPerguntaValue < 2) {
                erroContador = 1;
                console.log("Teste Nivel");
            } else {
                (erroContador = 0)
            };
        }

    });

    return erroContador;
}

function criarQuizzTela3_2() {
    if (criarQuizzTela3_2_Validacoes() === 1) {
        alert("Por favor, preencha os dados corretamente antes de prosseguir");
    }
    else if (criarQuizzTela3_2_Validacoes() === 0) {
        avacarTela3_3();
    }
}

function avacarTela3_3() {
    const tela3_2 = document.querySelector('.tela-3-2');
    tela3_2.classList.add("escondido");
    const tela3_3 = document.querySelector('.tela-3-3');
    tela3_3.classList.remove("escondido");
}

function criarQuizzTela3_2_Validacoes() {
    let erroContador = 0;

    const textoPergunta = document.querySelectorAll('.texto-pergunta');
    const corFundoPergunta = document.querySelectorAll('.cor-fundo-pergunta');
    const textoRespostaCorreta = document.querySelector('.texto-resposta-correta');
    const urlImagemRespostaCorreta = document.querySelector('.url-imagem-resposta-correta');
    const textoRespostaIncorreta = document.querySelector(".texto-resposta-incorreta-1");

    const arrayValidacaoCor = ["a", "b", "c", "d", "e", "f", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const validacoesUrlRespostaCorreta = urlImagemRespostaCorreta.value.includes('jpg') || urlImagemRespostaCorreta.value.includes('png') || urlImagemRespostaCorreta.value.includes('jpeg');

    textoPergunta.forEach((textoPergunta) => {
        if (textoPergunta.value.length < 20 || textoPergunta.value === "") {
            erroContador = 1;
            console.log("Teste textoPergunta");
        }
    });

    corFundoPergunta.forEach((corFundoPergunta) => {
        let corContador = 0;
        for (let i = 0; i < arrayValidacaoCor.length; i++) {
            if (!corFundoPergunta.value.includes(arrayValidacaoCor[i])) {
                corContador++;
                console.log(corContador);
                if (corContador > 10) {
                    erroContador = 1;
                }
            }
        }
        if (corFundoPergunta.value.length !== 7 || corFundoPergunta.value === "" || corFundoPergunta.value[0] !== "#") {
            erroContador = 1;
            console.log("Teste corFundoPergunta");
        }
    });

    if (textoRespostaCorreta.value === "" || (!validacoesUrlRespostaCorreta)) {
        erroContador = 1;
        console.log("Teste textoRespostaCorreta");
    }

    if (textoRespostaIncorreta.value === "") {
        erroContador = 1;
    }

    return erroContador;
}


function criarQuizzTela3_3() {
    const tela3_3 = document.querySelector('.tela-3-3');
    tela3_3.classList.add("escondido");
    const tela3_4 = document.querySelector('.tela-3-4');
    tela3_4.classList.remove("escondido");
}

function voltarHome() {
    const tela3 = document.querySelector('.tela-3');
    const tela2 = document.querySelector('.tela-2');
    tela3.classList.add("escondido");
    tela2.classList.add("escondido");
    tela1.classList.remove("escondido");
}

function reiniciarQuizz() {
    const topoDaTela = document.querySelector('.tela-2-container-titulo');
    const resultadosDoQuizz = document.querySelector('.tela-2-resultados-e-fim-do-quizz');
    topoDaTela.scrollIntoView();
    resultadosDoQuizz.classList.add("escondido");
    //Falta zerar as respostas q devem retornar pro estado inicial
}
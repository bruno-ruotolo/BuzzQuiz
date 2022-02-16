//TESTANDO PUSH
// Variaveis Globais
let tela1 = document.querySelector('.tela-1');

// function inicializada toda vez que clicar em Criar Quizz
function criarQuizz() {
    tela1.classList.add("escondido");
    const tela3_1 = document.querySelector('.tela-3-1');
    tela3_1.classList.remove("escondido");
}

function criarQuizzTela3_2() {
    const tela3_1 = document.querySelector('.tela-3-1');
    tela3_1.classList.add("escondido");
    const tela3_2 = document.querySelector('.tela-3-2');
    tela3_2.classList.remove("escondido");
}

function criarQuizzTela3_3() {
    const tela3_2 = document.querySelector('.tela-3-2');
    tela3_2.classList.add("escondido");
    const tela3_3 = document.querySelector('.tela-3-3');
    tela3_2.classList.remove("escondido");
}

function criarQuizzTela3_4() {
    const tela3_3 = document.querySelector('.tela-3-3');
    tela3_3.classList.add("escondido");
    const tela3_4 = document.querySelector('.tela-3-4');
    tela3_4.classList.remove("escondido");
}

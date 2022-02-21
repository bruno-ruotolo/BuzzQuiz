// Variaveis Globais
const tela1 = document.querySelector('.tela-1');
const tela2 = document.querySelector('.tela-2');
const tela3 = document.querySelector('.tela-3');
let arrayIDS = [];

let tituloPerguntaValue = '';
let urlPerguntaValue = null;
let idNovoQuizz = null;

let quantidadePerguntas = 0;
let quantidadeNiveis = 0;

let arrayQuestions = [];
let arrayNiveis = [];

let arrayNiveisQuizzSelecionado = [];

let indiceEscrolar = 1;
let porcentagemBruta = 0;
let contadorCorretas = 0;

// function inicializada toda vez que clicar em Criar Quizz
function criarQuizz() {
    tela1.classList.add("escondido");
    const tela3_1 = document.querySelector('.tela-3-1');
    tela3.classList.remove("escondido");
    tela3_1.classList.remove("escondido");
}

function criarQuizzTela3_1_Validacoes() {
    let erroContador = false;

    tituloPerguntaValue = document.querySelector('.titulo-pergunta').value;
    urlPerguntaValue = document.querySelector('.url-pergunta').value;
    const quantidadePerguntaValue = document.querySelector('.quantidade-pergunta').value;
    const quantidadeNiveisPerguntaValue = document.querySelector('.quantidade-niveis-pergunta').value;

    quantidadePerguntas = quantidadePerguntaValue;
    quantidadeNiveis = quantidadeNiveisPerguntaValue;

    erroContador = testandoURL(urlPerguntaValue);

    if (tituloPerguntaValue.length < 20 || tituloPerguntaValue.length > 65 || tituloPerguntaValue == '') {
        erroContador = true;
    } else if (quantidadePerguntaValue < 3 || isNaN(quantidadePerguntaValue)) {
        erroContador = true;
    } else if (quantidadeNiveisPerguntaValue < 2 || isNaN(quantidadeNiveisPerguntaValue)) {
        erroContador = true;
    };

    return erroContador;
}

function criarQuizzTela3_1() {
    if (criarQuizzTela3_1_Validacoes() === true) {
        alert("Por favor, preencha os dados corretamente antes de prosseguir");
    }
    else if (criarQuizzTela3_1_Validacoes() === false) {
        avacarTela3_2();
        mostrarTela3_2();
    }
}

function avacarTela3_2() {
    const tela3_1 = document.querySelector('.tela-3-1');
    tela3_1.classList.add("escondido");
    const tela3_2 = document.querySelector('.tela-3-2');
    tela3_2.classList.remove("escondido");
}



function mostrarTela3_2() {
    const querySelectorTela3_2 = document.querySelector(".tela-3-2");

    for (let i = 2; i <= quantidadePerguntas; i++) {
        querySelectorTela3_2.innerHTML += `
    <div data-identifier="question" class="perguntass pergunta-${i}"> 
        <article class="outras-opcoes">
        <h4>Pergunta ${i}</h4>
        <ion-icon data-identifier="expand" onclick = "editarPerguntas(this, 2)" name="create-outline"></ion-icon>
    </article>
    <div class="resposta-tela3 escondido">
        <div> 
            <input class="texto-pergunta" type="text" placeholder="Texto da pergunta">
            <input class="cor-fundo-pergunta" type="text" placeholder="Cor de fundo da pergunta">
        </div>
        
        <div>
            <h3>Resposta correta</h3>
            <input class="texto-resposta-correta" type="text" placeholder="Resposta correta">
            <input class="url-imagem-resposta-correta" type="text" placeholder="URL da imagem">
        </div>
        <div>
            <h3>Respostas incorretas</h3>
            <input class="texto-resposta-incorreta-1" type="text" placeholder="Resposta incorreta 1">
            <input class="url-resposta-incorreta-1" type="text" placeholder="URL da imagem 1">
        </div>
        <div>
            <input class="titulo-resposta-incorreta-2" type="text" placeholder="Resposta incorreta 2">
            <input class="url-resposta-incorreta-2" type="text" placeholder="URL da imagem 2">
        </div>
        <div>
            <input class="titulo-resposta-incorreta-3" type="text" placeholder="Resposta incorreta 3">
            <input class="url-resposta-incorreta-3" type="text" placeholder="URL da imagem 3">
        </div>
    </div>`

    }
    querySelectorTela3_2.innerHTML += `<button onclick="criarQuizzTela3_2()">Prosseguir pra criar níveis</button>
    </section>`;
}

function criarQuizzTela3_2() {
    if (criarQuizzTela3_2_Validacoes() === true) {
        alert("Por favor, preencha os dados corretamente antes de prosseguir");
    }
    else if (criarQuizzTela3_2_Validacoes() === false) {
        for (let i = 1; i <= quantidadePerguntas; i++) {
            criarArrayQuestions(i);
        }
        avacarTela3_3();
        mostrarTela3_3();
    }
}

function avacarTela3_3() {
    const tela3_2 = document.querySelector('.tela-3-2');
    tela3_2.classList.add("escondido");
    const tela3_3 = document.querySelector('.tela-3-3');
    tela3_3.classList.remove("escondido");
}



function criarArrayQuestions(indice) {
    const questionsQuery = document.querySelector(`.pergunta-${indice}`);
    const corQuizz = questionsQuery.querySelector(".cor-fundo-pergunta").value;
    const tituloPergunta = questionsQuery.querySelector(".texto-pergunta").value;
    const answersTextCorrect = questionsQuery.querySelector(".texto-resposta-correta").value;
    const urlImagemRespostaCorreta = questionsQuery.querySelector('.url-imagem-resposta-correta').value;
    const tituloRespostaIncorreta1 = questionsQuery.querySelector('.texto-resposta-incorreta-1').value;
    const urlRespostaIncorreta1 = questionsQuery.querySelector('.url-resposta-incorreta-1').value;
    const tituloRespostaIncorreta2 = questionsQuery.querySelector('.titulo-resposta-incorreta-2').value;
    const urlRespostaIncorreta2 = questionsQuery.querySelector('.url-resposta-incorreta-2').value;
    const tituloRespostaIncorreta3 = questionsQuery.querySelector('.titulo-resposta-incorreta-3').value;
    const urlRespostaIncorreta3 = questionsQuery.querySelector('.url-resposta-incorreta-3').value;

    let answersArray = [];
    answersArray = [{
        text: answersTextCorrect,
        image: urlImagemRespostaCorreta,
        isCorrectAnswer: true
    }, {
        text: tituloRespostaIncorreta1,
        image: urlRespostaIncorreta1,
        isCorrectAnswer: false
    }];

    if (tituloRespostaIncorreta2 !== '') {
        answersArray.push({
            text: tituloRespostaIncorreta2,
            image: urlRespostaIncorreta2,
            isCorrectAnswer: false
        })
    }

    if (tituloRespostaIncorreta3 !== '') {
        answersArray.push({
            text: tituloRespostaIncorreta3,
            image: urlRespostaIncorreta3,
            isCorrectAnswer: false
        })
    }

    arrayQuestions.push({
        title: tituloPergunta,
        color: corQuizz,
        answers: answersArray

    })
}

function criarQuizzTela3_2_Validacoes() {
    let erroContador = false;

    const textoPergunta = document.querySelectorAll('.texto-pergunta');
    const corFundoPergunta = document.querySelectorAll('.cor-fundo-pergunta');
    const textoRespostaCorreta = document.querySelector('.texto-resposta-correta');
    const urlImagemRespostaCorreta = document.querySelector('.url-imagem-resposta-correta');
    const textoRespostaIncorreta = document.querySelector(".texto-resposta-incorreta-1");
    const urlImagemRespostaIncorreta1 = document.querySelectorAll('.url-resposta-incorreta-1');


    const arrayValidacaoCor = ["a", "b", "c", "d", "e", "f", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    erroContador = (!(testandoURL(urlImagemRespostaCorreta.value)));
    urlImagemRespostaIncorreta1.forEach((urlImagemRespostaIncorreta1) => {
        erroContador = (!(testandoURL(urlImagemRespostaIncorreta1.value)));
    })


    textoPergunta.forEach((textoPergunta) => {
        if (textoPergunta.value.length < 20 || textoPergunta.value === "") {
            erroContador = true;
        }
    });

    corFundoPergunta.forEach((corFundoPergunta) => {
        let corContador = 0;
        const lowCaseColor = corFundoPergunta.value.toLowerCase();
        for (let i = 0; i < arrayValidacaoCor.length; i++) {
            if (!lowCaseColor.includes(arrayValidacaoCor[i])) {
                corContador++;
                if (corContador > 10) {
                    erroContador = true;
                } else { erroContador = false }
            }
        }
        if (corFundoPergunta.value.length !== 7 || corFundoPergunta.value === "" || corFundoPergunta.value[0] !== "#") {
            erroContador = true;
        } else { erroContador = false; }
    });



    if (textoRespostaCorreta.value === "") {
        erroContador = true;
    } else { erroContador = false; }

    if (textoRespostaIncorreta.value === "") {
        erroContador = true;
    } else { erroContador = false; }

    return erroContador;
}


function criarQuizzTela3_3() {
    if (criarQuizzTela3_3_Validacoes() === true) {
        alert("Por favor, preencha os dados corretamente antes de prosseguir");
    }
    else if (criarQuizzTela3_3_Validacoes() === false) {
        for (let i = 1; i <= quantidadeNiveis; i++) {
            criarArrayNiveis(i);
        }
        arrayCompleto = {
            title: tituloPerguntaValue,
            image: urlPerguntaValue,
            questions: arrayQuestions,
            levels: arrayNiveis
        }
        avacarTela3_4();
        postArrayCompleto(arrayCompleto);
        mostrarTela3_4();
    }
}

function mostrarTela3_3() {
    const querySelectorTela3_3 = document.querySelector(".tela-3-3");

    for (let i = 2; i <= quantidadeNiveis; i++) {
        querySelectorTela3_3.innerHTML += `<div data-identifier="level" class="perguntass nivel-quizz-${i}"> 
        <article class="outras-opcoes">
                <h4>Nível ${i}</h4>
                <ion-icon data-identifier="expand" onclick="editarPerguntas(this, 3)" name="create-outline"></ion-icon>
            </article>
<div class="nivel-tela3 escondido">
    <div> 
        <input type="text" class="titulo-nivel" placeholder="Título do nível">
        <input type="text" class="porcentagem-minima" placeholder="% de acerto mínima">
        <input type="text" class="imagem-nivel" placeholder="URL da imagem do nível">
        <textarea name="descricao-nivel" class="descricao-nivel" cols="10" rows="10"
            placeholder="Descrição do nível"></textarea>
    </div>
</div>`
    }
    querySelectorTela3_3.innerHTML += ` <button onclick="criarQuizzTela3_3()">Finalizar Quizz</button>`;
}


function criarArrayNiveis(indice) {
    const niveisQuery = document.querySelector(`.nivel-quizz-${indice}`);
    const tituloNivel = niveisQuery.querySelector(".titulo-nivel").value;
    const imagemNivel = niveisQuery.querySelector(".imagem-nivel").value;
    const descricaoNivel = niveisQuery.querySelector(".descricao-nivel").value;
    const porcentagemNivel = niveisQuery.querySelector('.porcentagem-minima').value;

    arrayNiveis.push({
        title: tituloNivel,
        image: imagemNivel,
        text: descricaoNivel,
        minValue: parseInt(porcentagemNivel)
    })
        ;
}


function criarQuizzTela3_3_Validacoes() {
    let erroContador = false;
    let nivelContador = true;

    const tituloNivel = document.querySelectorAll('.titulo-nivel');
    const porcentagemNivel = document.querySelectorAll('.porcentagem-minima');
    const imagemNivel = document.querySelectorAll('.imagem-nivel');
    const descricaoNivel = document.querySelectorAll(".descricao-nivel");

    imagemNivel.forEach((imagemNivel) => {
        erroContador = testandoURL(imagemNivel.value);
    });

    tituloNivel.forEach((tituloNivel) => {
        if (tituloNivel.value.length < 10 || tituloNivel.value === "") {
            erroContador = true;
        }
    });

    porcentagemNivel.forEach((porcentagemNivel) => {
        if (porcentagemNivel.value > 100 || porcentagemNivel.value === '' || porcentagemNivel.value < 0) {
            erroContador = true;
        }

        const parseIntPorcentagem = parseInt(porcentagemNivel.value);

        if (parseIntPorcentagem * 1 !== parseIntPorcentagem) {
            erroContador = true;
        }

        if (parseInt(porcentagemNivel.value) === 0) {
            nivelContador = false;
        }
    });

    descricaoNivel.forEach((descricaoNivel) => {
        if (descricaoNivel.value.length < 30 || descricaoNivel.value === "") {
            erroContador = true;
        }
    });

    return (erroContador || nivelContador);
}

function testandoURL(urlFornecida) {
    let expressão =
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regExp = new RegExp(expressão);
    let url = urlFornecida;

    if (!(url.match(regExp))) {
        return true;
    } else {
        return false;
    }
}

function avacarTela3_4() {
    const tela3_2 = document.querySelector('.tela-3-3');
    tela3_2.classList.add("escondido");
    const tela3_3 = document.querySelector('.tela-3-4');
    tela3_3.classList.remove("escondido");
}

function mostrarTela3_4() {
    const quizzCriado = document.querySelector(".imagem-titulo-quizz-criado");
    quizzCriado.innerHTML = `
            <div class="gradiente"></div>
            <img src=${urlPerguntaValue} alt="Simpsons">
            <p>${tituloPerguntaValue}</p>`

}

function postArrayCompleto(arrayCompleto) {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", arrayCompleto);
    promise.then((response) => {
        idNovoQuizz = response.data.id;
        addIDLocalStorage(idNovoQuizz);
    });

}

function editarPerguntas(este, tela) {
    if (tela == 2) {
        const querySelectorResposasTela3 = este.parentNode.parentNode.querySelector(`.resposta-tela3`);
        querySelectorResposasTela3.classList.remove("escondido");
    }

    if (tela == 3) {
        const querySelectorNiveisTela3 = este.parentNode.parentNode.querySelector(`.nivel-tela3`);
        querySelectorNiveisTela3.classList.remove("escondido");
    }
}


function acessarQuizzCriado() {
    tela3.classList.add('escondido');
    mostrarQuizTela2(idNovoQuizz);
}

function voltarHome() {
    window.location.reload();
    listagemQuizzes();
}

function reiniciarQuizz(idQuizz) {
    const topoDaTela = document.querySelector('.tela-2-container-titulo');
    const resultadosDoQuizz = document.querySelector('.tela-2-resultados');
    topoDaTela.scrollIntoView();
    resultadosDoQuizz.classList.add("escondido");
    mostrarQuizTela2(idQuizz);
}

// Listagem dos Quizzes
function listagemQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then((quizzes) => {
        document.querySelector('.todos-quizzes').innerHTML = "<h1>Todos os Quizzes</h1>";
        document.querySelector('.seus-quizzes-imagens').innerHTML = "";
        atualizaEVerificaLocalStorage();
        quizzes.data.forEach(mostrarQuizzesTela1);
    }
    );
    promise.catch((erro) => {
        console.error(erro.response.status);
    });
}

function mostrarQuizzesTela1(quizz) {
    let seusQuizzes = document.querySelector('.seus-quizzes');
    let todosQuizzes = document.querySelector('.todos-quizzes');
    let nenhumQuizz = document.querySelector('.nenhum-quizz');
    if (arrayIDS == null || arrayIDS.length == 0) {
        nenhumQuizz.classList.remove('escondido');
        seusQuizzes.classList.add('escondido');
        todosQuizzes.classList.remove('escondido');
        todosQuizzes.innerHTML += `
    <div data-identifier="quizz-card" onclick="mostrarQuizTela2(${quizz.id})">
        <div class="gradiente"></div>
        <img src="${quizz.image}">
        <p>${quizz.title}</p>
    </div>
    `;
    } else {
        seusQuizzes.classList.remove('escondido');
        nenhumQuizz.classList.add('escondido');
        let seusQuizzesImagens = document.querySelector('.seus-quizzes-imagens');
        if (arrayIDS.includes(quizz.id)) {
            seusQuizzesImagens.innerHTML += `
    <div data-identifier="quizz-card" onclick="mostrarQuizTela2(${quizz.id})">
        <div class="gradiente"></div>
        <img src="${quizz.image}">
        <p>${quizz.title}</p>
    </div>
    `;
        } else {
            todosQuizzes.innerHTML += `
    <div data-identifier="quizz-card" onclick="mostrarQuizTela2(${quizz.id})">
        <div class="gradiente"></div>
        <img src="${quizz.image}">
        <p>${quizz.title}</p>
    </div>
    `;
        }
    }


}

function mostrarQuizTela2(idQuizz) {
    tela1.classList.add("escondido");
    tela2.classList.remove("escondido");
    document.querySelector(".tela-2-resultados").classList.add("escondido");
    let telaPerguntas = document.querySelector('.tela-2-perguntas');
    telaPerguntas.innerHTML = "";
    document.getElementById("buttonRestart").setAttribute("onclick", `reiniciarQuizz(${idQuizz})`);
    let tela2Titulo = document.querySelector('.tela-2-container-titulo');
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/' + idQuizz);
    promise.then((quizz) => {
        tela2Titulo.innerHTML = `
            <div></div>
            <div class="gradiente-tela-2"></div>
            <img src="${quizz.data.image}" alt="">
            <h2>${quizz.data.title}</h2>`;
        let questoesQuizzEmbaralhadas = quizz.data.questions.sort(embaralharArray);
        questoesQuizzEmbaralhadas.forEach(imprimeQuestoes);
        arrayNiveisQuizzSelecionado = quizz.data.levels;

    }
    );
    promise.catch((erro) => {
        console.error(erro.response.status);
    });
}

function embaralharArray() {
    return Math.random() - 0.5;
}

function imprimeQuestoes(questoes) {
    let telaPerguntas = document.querySelector('.tela-2-perguntas');
    let questaoTexto = "";
    questaoTexto += `
    <div data-identifier="question" class="tela-2-container-pergunta">
        <div class="tela-2-container-pergunta-titulo" style="background-color: ${questoes.color};">
            <h2>${questoes.title}</h2>
        </div>
        <div class="tela-2-container-pergunta-respostas">`;
    let respostasQuizzEmbaralhadas = questoes.answers.sort(embaralharArray);
    respostasQuizzEmbaralhadas.forEach((resposta) => {
        questaoTexto += `
        <div data-identifier="answer" class = "${resposta.isCorrectAnswer}" onclick = "selecionarRespostas(this)">
            <img src="${resposta.image}">
            <p class="textoResposta" >${resposta.text}</p>
        </div>
        `;
    });
    questaoTexto += "</div></div>";
    telaPerguntas.innerHTML += questaoTexto;
}

let contatorDeRespondidas = 0;

function selecionarRespostas(elemento) {
    const imgTelaSelecionada = elemento.parentNode.querySelectorAll("div");
    contatorDeRespondidas++;

    imgTelaSelecionada.forEach((imgTelaSelecionada) => {
        imgTelaSelecionada.classList.add("esbranquicar");
        imgTelaSelecionada.removeAttribute("onclick");

        if (imgTelaSelecionada.classList.contains('true')) {
            imgTelaSelecionada.querySelector(".textoResposta").classList.add("corTextoVerde");
        } else {
            imgTelaSelecionada.querySelector(".textoResposta").classList.add("corTextoVermelho");
        }

    })
    elemento.classList.remove("esbranquicar");


    if (elemento.classList.contains("true")) {
        contadorCorretas++;
    }

    setTimeout(escrolar, 2000);
}

function escrolar() {
    const counteinerSelecionado = document.querySelectorAll(".tela-2-container-pergunta");
    const telaResultado = document.querySelector(".tela-2-resultados");

    const quantidadePerguntasQuizz = document.querySelectorAll(".tela-2-container-pergunta");

    porcentagemBruta = (contadorCorretas / quantidadePerguntasQuizz.length) * 100;

    if (contatorDeRespondidas === quantidadePerguntasQuizz.length) {
        setTimeout(finalizarQuizz(porcentagemBruta), 2000);
    }


    if (indiceEscrolar === counteinerSelecionado.length) {
        telaResultado.scrollIntoView(false)
        indiceEscrolar = 1;
        contadorCorretas = 0;
        contatorDeRespondidas = 0;
    } else {
        counteinerSelecionado[indiceEscrolar].scrollIntoView(false);
        indiceEscrolar++;
    }

}

// Function que trabalhara com o Local Storage
function atualizaEVerificaLocalStorage() {
    let dadosLocalStorage = localStorage.getItem("ids");
    if (dadosLocalStorage != null) {
        dadosLocalStorage = JSON.parse(dadosLocalStorage);
        if (!compareArrays(arrayIDS, dadosLocalStorage)) {
            arrayIDS = dadosLocalStorage;
            listagemQuizzes();
        }
    }
}

function addIDLocalStorage(id) {
    if (arrayIDS == null) {
        arrayIDS = [];
    }
    arrayIDS.push(id);
    let dadosSerializados = JSON.stringify(arrayIDS);
    localStorage.setItem("ids", dadosSerializados);
    listagemQuizzes();
}

function compareArrays(a1, a2) {
    return a1.length === a2.length && a1.every((value, index) => value === a2[index]);
}

function finalizarQuizz(porcentagemRespostasCertas) {
    porcentagemArrendondada = Math.round(porcentagemRespostasCertas);

    if (arrayNiveisQuizzSelecionado.length == 1) {
        if (porcentagemArrendondada > arrayNiveisQuizzSelecionado[0].minValue) {
            imprimirResultados(0, porcentagemArrendondada);
        }
    }
    if (arrayNiveisQuizzSelecionado.length == 2) {
        if (arrayNiveisQuizzSelecionado[0].minValue > arrayNiveisQuizzSelecionado[1].minValue) {
            if (arrayNiveisQuizzSelecionado[0].minValue < porcentagemArrendondada) {
                imprimirResultados(0, porcentagemArrendondada);
            } else if (arrayNiveisQuizzSelecionado[1] < porcentagemArrendondada) {

                imprimirResultados(1, porcentagemArrendondada);
            }
        } else if (arrayNiveisQuizzSelecionado[1].minValue < porcentagemArrendondada) {

            imprimirResultados(1, porcentagemArrendondada);
        } else if (arrayNiveisQuizzSelecionado[0].minValue < porcentagemArrendondada) {

            imprimirResultados(0, porcentagemArrendondada);

        }
    }
    if (arrayNiveisQuizzSelecionado.length == 3) {
        if (arrayNiveisQuizzSelecionado[0].minValue > arrayNiveisQuizzSelecionado[1].minValue && arrayNiveisQuizzSelecionado[0].minValue > arrayNiveisQuizzSelecionado[2].minValue) {
            if (porcentagemArrendondada > arrayNiveisQuizzSelecionado[0].minValue) {
                imprimirResultados(0, porcentagemArrendondada);
            } else if (arrayNiveisQuizzSelecionado[1].minValue > arrayNiveisQuizzSelecionado[2].minValue) {
                if (porcentagemArrendondada > arrayNiveisQuizzSelecionado[1].minValue) {

                    imprimirResultados(1, porcentagemArrendondada);
                } else {

                    imprimirResultados(2, porcentagemArrendondada);
                }
            } else {
                if (porcentagemArrendondada > arrayNiveisQuizzSelecionado[2].minValue) {

                    imprimirResultados(2, porcentagemArrendondada);
                } else {

                    imprimirResultados(1, porcentagemArrendondada);
                }
            }
        }
        if (arrayNiveisQuizzSelecionado[1].minValue > arrayNiveisQuizzSelecionado[0].minValue && arrayNiveisQuizzSelecionado[1].minValue > arrayNiveisQuizzSelecionado[2].minValue) {
            if (porcentagemArrendondada > arrayNiveisQuizzSelecionado[1].minValue) {
            } else if (arrayNiveisQuizzSelecionado[0].minValue > arrayNiveisQuizzSelecionado[2].minValue) {
                if (porcentagemArrendondada > arrayNiveisQuizzSelecionado[0].minValue) {
                    imprimirResultados(0, porcentagemArrendondada);
                } else {

                    imprimirResultados(2, porcentagemArrendondada);
                }
            } else if (porcentagemArrendondada > arrayNiveisQuizzSelecionado[2].minValue) {
                imprimirResultados(2, porcentagemArrendondada);
            } else {
                //Nivel indice 0 é o certo.
                imprimirResultados(0, porcentagemArrendondada);
            }
        }

        if (arrayNiveisQuizzSelecionado[2].minValue > arrayNiveisQuizzSelecionado[0].minValue && arrayNiveisQuizzSelecionado[2].minValue > arrayNiveisQuizzSelecionado[1].minValue) {
            if (porcentagemArrendondada > arrayNiveisQuizzSelecionado[2].minValue) {
                imprimirResultados(2, porcentagemArrendondada);
            } else if (arrayNiveisQuizzSelecionado[0].minValue > arrayNiveisQuizzSelecionado[1].minValue) {
                if (porcentagemArrendondada > arrayNiveisQuizzSelecionado[0].minValue) {
                    imprimirResultados(0, porcentagemArrendondada);

                } else {
                    imprimirResultados(1, porcentagemArrendondada);

                }
            } else if (porcentagemArrendondada > arrayNiveisQuizzSelecionado[1].minValue) {
                imprimirResultados(1, porcentagemArrendondada);

            } else {
                imprimirResultados(0, porcentagemArrendondada);

            }
        }
    }
}

function imprimirResultados(indice, porcentagem) {
    document.querySelector(".tela-2-resultados").classList.remove("escondido");
    let tituloResultado = arrayNiveisQuizzSelecionado[indice].title;
    let imgResultado = arrayNiveisQuizzSelecionado[indice].image;
    let textResultado = arrayNiveisQuizzSelecionado[indice].text;

    document.querySelector(".tela-2-resultados .tela-2-container-pergunta-titulo").innerHTML = `<h2>${porcentagem}% de acerto: ${tituloResultado}`
    document.querySelector(".tela-2-resultado-container").innerHTML = `
    <img src="${imgResultado}" alt="Dumbledore">
    <p>${textResultado}</p>
    `
}

// Funçoes para listar os Quizzes
listagemQuizzes();

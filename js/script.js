//TESTANDO PUSH
// Variaveis Globais
const tela1 = document.querySelector('.tela-1');
const tela2 = document.querySelector('.tela-2');
const tela3 = document.querySelector('.tela-3');
let arrayIDS = [];

let tituloPerguntaValue = null;
let urlPerguntaValue = null;
let idNovoQuizz = null;

let quantidadePerguntas = 0;
let quantidadeNiveis = 0;

let arrayQuestions = [];
let arrayNiveis = [];
// function inicializada toda vez que clicar em Criar Quizz

function criarQuizz() {
    tela1.classList.add("escondido");
    const tela3_1 = document.querySelector('.tela-3-1');
    tela3.classList.remove("escondido");
    tela3_1.classList.remove("escondido");
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

function criarQuizzTela3_1_Validacoes() {
    let erroContador = false;

    const inputVazio = document.querySelectorAll(".tela-3-1 input");

    tituloPerguntaValue = document.querySelector('.titulo-pergunta').value;
    urlPerguntaValue = document.querySelector('.url-pergunta').value;
    const quantidadePerguntaValue = parseInt(document.querySelector('.quantidade-pergunta').value);
    const quantidadeNiveisPerguntaValue = parseInt(document.querySelector('.quantidade-niveis-pergunta').value);

    quantidadePerguntas = quantidadePerguntaValue;
    quantidadeNiveis = quantidadeNiveisPerguntaValue;

    inputVazio.forEach((inputVazio) => {
        if (inputVazio.value === "") {
            erroContador = true;
        } else {
            if (tituloPerguntaValue.length < 20 || tituloPerguntaValue.length > 65) {
                erroContador = true;
            } else if (quantidadePerguntaValue < 3 || quantidadePerguntaValue === '') { //Voltar para <3
                erroContador = true;
                console.log("Teste Quantidade");
            } else if (quantidadeNiveisPerguntaValue < 2 || quantidadeNiveisPerguntaValue === '') { //Voltar para < 2
                erroContador = true;
                console.log("Teste Nivel");

            };
        }

        erroContador = testandoURL(urlPerguntaValue);

    });

    return erroContador;
}

function mostrarTela3_2() {
    const querySelectorTela3_2 = document.querySelector(".tela-3-2");

    for (let i = 2; i <= quantidadePerguntas; i++) {
        querySelectorTela3_2.innerHTML += `
    <div class="perguntass pergunta-${i}"> 
        <article class="outras-opcoes">
        <h4>Pergunta ${i}</h4>
        <ion-icon onclick = "editarPerguntas(this, 2)" name="create-outline"></ion-icon>
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
    console.log(arrayQuestions);
}

function criarQuizzTela3_2_Validacoes() {
    let erroContador = false;

    const textoPergunta = document.querySelectorAll('.texto-pergunta');
    const corFundoPergunta = document.querySelectorAll('.cor-fundo-pergunta');
    const textoRespostaCorreta = document.querySelector('.texto-resposta-correta');
    const urlImagemRespostaCorreta = document.querySelector('.url-imagem-resposta-correta'); // Colocar validações para incorretas
    const textoRespostaIncorreta = document.querySelector(".texto-resposta-incorreta-1");


    const arrayValidacaoCor = ["a", "b", "c", "d", "e", "f", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    textoPergunta.forEach((textoPergunta) => {
        if (textoPergunta.value.length < 20 || textoPergunta.value === "") {
            erroContador = true;
            console.log("Erro no texto");
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
                    console.log("Erro a cor");
                } else { erroContador = false }
            }
        }
        if (corFundoPergunta.value.length !== 7 || corFundoPergunta.value === "" || corFundoPergunta.value[0] !== "#") {
            erroContador = true;
            console.log("Erro na cor");
        } else { erroContador = false; }
    });

    erroContador = (!(testandoURL(urlImagemRespostaCorreta.value)));

    if (textoRespostaCorreta.value === "") {
        erroContador = true;
        console.log("eero titulo correta");
    } else { erroContador = false; }

    if (textoRespostaIncorreta.value === "") {
        erroContador = true;
        console.log("eero titulo incorreta");
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
            console.log(arrayNiveis); ''
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
        querySelectorTela3_3.innerHTML += `<div class="perguntass nivel-quizz-${i}"> 
        <article class="outras-opcoes">
                <h4>Nível ${i}</h4>
                <ion-icon onclick="editarPerguntas(this, 3)" name="create-outline"></ion-icon>
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



    tituloNivel.forEach((tituloNivel) => {
        if (tituloNivel.value.length < 10 || tituloNivel.value === '') {
            erroContador = true;
        } else { erroContador = false }
    });

    porcentagemNivel.forEach((porcentagemNivel) => {
        if (porcentagemNivel.value > 100 || porcentagemNivel.value === '' || porcentagemNivel.value < 0) {
            erroContador = true;
        } else { erroContador = false }

        const parseIntPorcentagem = parseInt(porcentagemNivel.value);

        if (parseIntPorcentagem * 1 !== parseIntPorcentagem) {
            erroContador = true;
            console.log("Erro na porcentagem")
        } else { erroContador = false }

        if (parseInt(porcentagemNivel.value) === 0) {
            nivelContador = false;
            console.log("zerando");
        }
    });

    tituloNivel.forEach((tituloNivel) => {
        if (tituloNivel.value.length < 10 || tituloNivel.value === "") {
            erroContador = true;
        } else { erroContador = false }
    });

    imagemNivel.forEach((imagemNivel) => {
        erroContador = testandoURL(imagemNivel.value);
    });

    descricaoNivel.forEach((descricaoNivel) => {
        if (descricaoNivel.value.length < 30 || descricaoNivel.value === "") {
            erroContador = true;
            console.log("Erro na Descricao");
        } else { erroContador = false }
    });

    console.log(erroContador);

    return (erroContador || nivelContador);

}
function testandoURL(urlFornecida) {
    let expressão =
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regExp = new RegExp(expressão);
    let url = urlFornecida;

    if (!(url.match(regExp))) {
        console.log("erro na Imagem");
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
        console.log(response);
        idNovoQuizz = response.data.id;
        addIDLocalStorage(idNovoQuizz);
    });

}

function editarPerguntas(este, tela) {
    console.log(este.parentNode.parentNode);

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
    tela3.classList.add("escondido");
    tela2.classList.add("escondido");
    tela1.classList.remove("escondido");
    listagemQuizzes();
}

function reiniciarQuizz() {
    const topoDaTela = document.querySelector('.tela-2-container-titulo');
    const resultadosDoQuizz = document.querySelector('.tela-2-resultados-e-fim-do-quizz');
    topoDaTela.scrollIntoView();
    resultadosDoQuizz.classList.add("escondido");
    //Falta zerar as respostas q devem retornar pro estado inicial
}


//function addIDLocalStorage(id)  --> Quando for der o POST e retornar um ID. Utilizar essa função
// para jogar o ID no LocalStorage.

// Listagem dos Quizzes
function listagemQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promise.then((quizzes) => {
        console.log(quizzes);
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
    <div onclick="mostrarQuizTela2(${quizz.id})">
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
    <div onclick="mostrarQuizTela2(${quizz.id})">
        <div class="gradiente"></div>
        <img src="${quizz.image}">
        <p>${quizz.title}</p>
    </div>
    `;
        } else {
            todosQuizzes.innerHTML += `
    <div onclick="mostrarQuizTela2(${quizz.id})">
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
    let telaPerguntas = document.querySelector('.tela-2-perguntas');
    telaPerguntas.innerHTML = "";
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
    <div class="tela-2-container-pergunta">
        <div class="tela-2-container-pergunta-titulo" style="background-color: ${questoes.color};">
            <h2>${questoes.title}</h2>
        </div>
        <div class="tela-2-container-pergunta-respostas">`;
    let respostasQuizzEmbaralhadas = questoes.answers.sort(embaralharArray);
    respostasQuizzEmbaralhadas.forEach((resposta) => {
        questaoTexto += `
        <div class = "${resposta.isCorrectAnswer}">
            <img src="${resposta.image}">
            <p>${resposta.text}</p>
        </div>
        `;
    });
    questaoTexto += "</div></div>";
    telaPerguntas.innerHTML += questaoTexto;
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

// Funçoes para listar os Quizzes
listagemQuizzes();
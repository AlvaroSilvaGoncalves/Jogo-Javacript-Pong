

var canvas = document.getElementById("mycanvas"); // pega a id no html
var ctx = canvas.getContext("2d");  // Tudo que for desenhar na canvas vai ser 2d

var teclas = {};
var bola = {
    x: canvas.width / 2 - 15,
    y: canvas.height / 2 - 15,
    altura: 30,
    largura: 30,
    dirx: -1,
    diry: 1,
    mod: 0,
    speed: 1
};

var esquerda = {
    x: 10,
    y: canvas.height / 2 - 60,
    altura: 120,
    largura: 30,
    score: 0,
    speed: 10 
};

var direita = {
    x: 960,
    y: canvas.height / 2 - 60,
    altura: 120,
    largura: 30,
    score: 0,
    speed: 10
};

document.addEventListener("keydown", function(e) {  // Adiciona um evento que quando aperta a tecla seta para cima a barra ira para cima
    teclas[e.keyCode] = true;  // Pega o codigo da tecla
}, false);

document.addEventListener("keyup", function (e) {  // Deleta a tecla que estava celecionada
    delete teclas[e.keyCode];
}, false);

function movebloco () {

    // Movimentaçao Player 1
    if (87 in teclas && esquerda.y > 0) {  // se 87 que representa a tecla W estiver no objeto teclas, ira fazer o bloco subir
        esquerda.y -= esquerda.speed; // decrementa para subir
    }
    else if (83 in teclas && esquerda.y + esquerda.altura < canvas.height) {
        esquerda.y += esquerda.speed;  // encrementa para desser
    }

    // Movimentaçao Player 2
    if (38 in teclas && direita.y > 0) {
        direita.y -= direita.speed;
    }
    else if (40 in teclas && direita.y + direita.altura < canvas.height){
        direita.y += direita.speed; 
    }
}

function movebola () {  // Movimentaçao da bola
    if(bola.y + bola.altura >= esquerda.y && bola.y <= esquerda.y + esquerda.altura && bola.x <= esquerda.x + esquerda.largura) {
        bola.dirx = 1;
        bola.mod += 0.2;
    }
    else if (bola.y + bola.altura >= direita.y && bola.y <= direita.y + direita.altura && bola.x + bola.largura >= direita.x) {
        bola.dirx = -1;
        bola.mod += 0.2;
    }

    if (bola.y <= 0) {
        bola.diry = 1;
    }
    else if (bola.y + bola.altura >= canvas.height) {
        bola.diry = -1;
    }

    // Muda a velocidade da bola
    bola.x += (bola.speed + bola.mod) * bola.dirx;  
    bola.y += (bola.speed + bola.mod) * bola.diry;

// Realiza a contagem de pontos    
    if (bola.x < esquerda.x + esquerda.largura - 15){
        newgame("player 2");
    }
    else if(bola.x + bola.largura > direita.x + 15) {
        newgame("player 1");
    }
};

// Realiza a contagem de pontos
function newgame (winner) {
    if(winner == "player 1") {
        esquerda.score++;
    }
    else {
        direita.score++;
    }

    esquerda.y = canvas.height / 2 - esquerda.altura / 2;
    direita.y = esquerda.y;

    bola.y = canvas.height / 2 - bola.altura / 2;
    bola.x = canvas.width / 2 - bola.largura / 2;

    bola.mod = 0;
};

function desenha() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpa a canvas
    movebloco();  // Chama a funçao para movimentar os player
    movebola();  // Chama a funçao que move a bola

    ctx.fillStyle = "white"; // Tudo que for desenhado na canvas, sera na cor branca

    ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);  // Desenha o player da esquerda
    ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura);  // Desenha o player da direita
    ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);  // Desenha a bola

    ctx.font = "20px Arial";  // Modifica a fonte do texto
    ctx.fillText("Player 1: " + esquerda.score, 60, 40);  // Adiciona a pontuaçao do player 1
    ctx.fillText("Player 2: " + direita.score, 840, 690);  // Adiciona a pontuaçao do player 2
    
}

setInterval(desenha, 10); // Roda a funçao desenha eternamente, assim gerando os frames da canvas


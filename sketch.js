//variaveis da bolinha
let xBolinha =300;
let yBolinha = 200;
let diametro= 13;
let raio = diametro/2;

//velocidade da bolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

//variaveis raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYoponente;


//variavies colisao
let colidiu = false;


//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//tamanho da tela
function setup() {
  createCanvas(600, 400);
  trilha.loop(); //musica
}

//faz o jogo funcionar
function draw() {
  background(0);  
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);  
  movimentaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
} 
  
function mostraBolinha(){  circle(xBolinha,yBolinha,diametro);  
}

function movimentaBolinha(){
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;  
}



function verificaColisaoBorda(){
  if(xBolinha + raio > width || xBolinha - raio <0){
    velocidadeXbolinha *= -1;
  }
  if(yBolinha + raio> height || yBolinha - raio <0){
    velocidadeYbolinha *= -1;
  }
}


function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento,raqueteAltura);
}





function movimentaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
     yRaquete += 10
  }
}


function verificaColisaoRaquete(){
  if(xBolinha < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXbolinha *= -1;
    raquetada.play();//som
  }
}

function verificaColisaoRaquete(x,y){
  colidiu =
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXbolinha *= -1;
    raquetada.play();//som
  }
}



function movimentaRaqueteOponente(){
  velocidadeYoponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYoponente;
} 


function incluiPlacar(){
  stroke(255) //contorno
  textAlign(CENTER);
  textSize(16); //tamanho placar  
  fill(color(255,140,0))
  rect(150,10,40,20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255,140,0))
  rect(450,10,40,20);
  fill(255);
  text(pontosDoOponente, 470,26 );
}
  
function marcaPonto(){ 
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play() //som
  }
  if(xBolinha < 10){
    pontosDoOponente +=1;
    ponto.play(); //som
  }
}


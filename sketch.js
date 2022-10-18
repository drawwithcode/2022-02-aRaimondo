let dough = [];                           //array ingredienti
let sauce = [];
let cheese = [];
let topping1 = [];
let topping2 = [];
let pizza = [];                           //array vuoto della pizza da riempire

let index = 0;                            //indice scorrimento ingredienti
let pizzaIndex = 0;                       //indice step ingredienti

let avanti;
let indietro;
let save;
let change;
let sfondo;
let phase=0;                              //indice per cambiare tra creazione pizze e sfondo

let pizze = [];                           //array pizze create nella seconda fase



function preload() {
  dough[0] = loadImage('./resources/dough/Normale.png')
  dough[1] = loadImage('./resources/dough/Integrale.png')
  dough[2] = loadImage('./resources/dough/Pongo.png')

  sauce[0] = loadImage('./resources/sauce/Rossa.png');
  sauce[1] = loadImage('./resources/sauce/Bianca.png');

  cheese[0] = loadImage('./resources/cheese/cheese.png');
  cheese[1] = loadImage('./resources/cheese/nocheese.png')

  topping1[0] = loadImage('./resources/topping1/Olive.png');
  topping1[1] = loadImage('./resources/topping1/Pepperoni.png');
  topping1[2] = loadImage('./resources/topping1/Funghi.png');
  topping1[3] = loadImage('./resources/topping1/Acciughe.png');
  topping1[4] = loadImage('./resources/topping1/Cipolle.png');
  topping1[5] = loadImage('./resources/topping1/Niente.png');

  topping2[0] = loadImage('./resources/topping1/Olive.png');
  topping2[1] = loadImage('./resources/topping1/Pepperoni.png');
  topping2[2] = loadImage('./resources/topping1/Funghi.png');
  topping2[3] = loadImage('./resources/topping1/Acciughe.png');
  topping2[4] = loadImage('./resources/topping1/Cipolle.png');

  sfondo = loadImage('./resources/sfondo/spazio.jpg')


}

function setup() {
  createCanvas(windowWidth, windowHeight);
  avanti = new Tasto(9*(windowWidth/10), windowHeight/2, 50,">");         //tasto avanti
  indietro = new Tasto(windowWidth/10, windowHeight/2, 50, "<");          //tasto indietro
  save = new Tasto(7*(windowWidth/10), 4*(windowHeight/5), 50, 'Ok');     //tasto salva ingrediente
  change = new Tasto(9*(windowWidth/10), 4*(windowHeight/5), 50);         //tasto cambio fase
  change.color = "blue";


}

function draw() {
  background('black');
  imageMode(CENTER);
  textAlign(CENTER, CENTER)

  push()
  imageMode(CORNER);
  if(windowHeight/windowWidth<=sfondo.height/sfondo.width){                       //immagine di sfondo adattabile a dimensione
    image(sfondo, 0, 0, windowWidth, sfondo.height*windowWidth/sfondo.width);
  }else{
    image(sfondo, 0, 0, sfondo.width*windowHeight/sfondo.height, windowHeight);
  }
  pop()



  if (phase == 0){                                      //prima fase
    drawPizza();                                        //funzione disegno array pizza
    noStroke();
    avanti.show();                                      //mostrare tasto avanti
    indietro.show();                                    //mostrare tasto indietro
    if(pizzaIndex <= 4){                                //tasto scelta ingredienti scompare all'ultimo step
    save.show();
    }
    if(pizzaIndex == 5){                                //mostrare tasto per cambio fase
      change.show()}                                    
  }
  else {
    for(let i=0; i<pizze.length; i++){                  //ciclo for per mostrare e aggiornare le pizze create
      pizze[i].show();
      pizze[i].update();
    }
    fill(255, 255, 255, 100);
    text('Click anywhere to spawn a pizza', windowWidth/2, 4*(windowHeight/5))
  }
}

function mousePressed(){
  if (phase == 0){                                      //nella prima fase fa cambiare gli ingredienti e salvarli nell'array pizza tramite i tasti
  avanti.next();
  indietro.prev();
  change.cambio();
  if(pizzaIndex <= 4){                                  //il tasto per salvare gli ingredienti scompare dopo aver scelto l'ultimo
  save.salva();
  }
  
}else{
  pizze.push(new Pizza(mouseX, mouseY));                //nel punto dove si clicca appaiono pizze
  print("pizza")
}

}

class Tasto {                                           //creazione classe tasto usata per tutti quelli presenti
  constructor(xpos, ypos, radius, title){
    this.x = xpos;
    this.y = ypos;
    this.r = radius;
    this.color = "green";
    this.name = title;
  }
  show(){                                                //funzione per mostrare il tasto
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.r);
    textAlign(CENTER);
    textSize(32);
    fill("white");
    text(this.name, this.x, this.y);
  }

  next(){                                                //funzione per scorrere verso destra gli ingredienti
    let d = dist(mouseX, mouseY, this.x, this.y)         //il tasto si attiva quando si clicca sopra
    if (d < this.r){
      index++;

      if (index == 3 && pizzaIndex == 0){                //ogni click aumenta l'indice dell'ingrediente e in base allo step in cui ci si trova ritorna a zero dopo il valore massimo
        index = 0;
      }
      if (index == 2 && pizzaIndex == 1){
        index = 0;
      }
      if (index == 2 && pizzaIndex == 2){
        index = 0;
      }
      if (index == 6 && pizzaIndex == 3){
        index = 0;
      }
      if (index == 5 && pizzaIndex == 4){
        index = 0;
      }

      print(index);
    }
  }

  prev(){                                                 //come next() ma diminuendo l'indice anziché aumentandolo
    let d = dist(mouseX, mouseY, this.x, this.y)
    if (d < this.r){
      index = index - 1;

      if (index == -1 && pizzaIndex == 0){
        index = 2;
      }
      if (index == -1 && pizzaIndex == 1){
        index = 1;
      }
      if (index == -1 && pizzaIndex == 2){
        index = 1;
      }
      if (index == -1 && pizzaIndex == 3){
        index = 5;
      }
      if (index == -1 && pizzaIndex == 4){
        index = 4;
      }
    }
  }

  salva(){                                                    //riempie array pizza con ingredienti mostrati a schermo
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.r){

      pizza[pizzaIndex] = index;
      pizzaIndex++;
      index=0;
      print(pizza);

    }
  }

  cambio(){                                                    //cambia la fase
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.r){
      phase++;
      print(phase);

    }
  }
}

class Pizza{                                                              //classe delle pizze create nella seconda fase
  constructor(xpos, ypos){
    this.x = xpos;
    this.y = ypos;
    this.speedX = 10*random(-1,1);                                        //velocità delle pizze randomica ogni volta che ne viene creata una
    this.speedY = 10*random(-1,1);
    this.size = width/7*random(0.5,1);
  }
  show(){                                                                 //mostra pizza
    image(dough[pizza[0]], this.x, this.y, this.size, this.size);   
    image(sauce[pizza[1]], this.x, this.y, this.size, this.size);
    image(cheese[pizza[2]], this.x, this.y, this.size, this.size);
    image(topping1[pizza[3]], this.x, this.y, this.size, this.size);
    image(topping2[pizza[4]], this.x, this.y, this.size, this.size);
  }
  update(){                                                               //fa muovere la pizza e la fa rimbalzare sui limiti
    this.y += this.speedY;
    this.x += this.speedX;

    if(this.x >= width || this.x <= 0){
      this.speedX *= -1;
    }

    if(this.y >= height || this.y <= 0){
      this.speedY *= -1;
    }

  }
}

function drawPizza(){                                                 //in base al pizzaIndex fa scegliere i diversi ingredienti e li mostra a schermo, mostrando l'array pizza che si riempie

  if(pizzaIndex == 0){
    image(dough[index], width/2, height/2, width/7, width/7);
    fill("white");
    text('Choose your dough!', windowWidth/2, 4*(windowHeight/5))
  }

  if(pizzaIndex == 1){
    image(dough[pizza[0]], width/2, height/2, width/7, width/7);
    image(sauce[index], width/2, height/2, width/7, width/7);
    fill("white");
    text('Choose your sauce!', windowWidth/2, 4*(windowHeight/5))
  }

  if(pizzaIndex == 2){
    image(dough[pizza[0]], width/2, height/2, width/7, width/7);
    image(sauce[pizza[1]], width/2, height/2, width/7, width/7);
    image(cheese[index], width/2, height/2, width/7, width/7);
    fill("white");
    text('Do you want cheese?', windowWidth/2, 4*(windowHeight/5))
  }

  if(pizzaIndex == 3){
    image(dough[pizza[0]], width/2, height/2, width/7, width/7);
    image(sauce[pizza[1]], width/2, height/2, width/7, width/7);
    image(cheese[pizza[2]], width/2, height/2, width/7, width/7);
    image(topping1[index], width/2, height/2, width/7, width/7);
    fill("white");
    text('Choose your first topping!', windowWidth/2, 4*(windowHeight/5))
  }

  if(pizzaIndex == 4){
    image(dough[pizza[0]], width/2, height/2, width/7, width/7);
    image(sauce[pizza[1]], width/2, height/2, width/7, width/7);
    image(cheese[pizza[2]], width/2, height/2, width/7, width/7);
    image(topping1[pizza[3]], width/2, height/2, width/7, width/7);
    image(topping2[index], width/2, height/2, width/7, width/7);
    fill("white");
    text('Choose your second topping!', windowWidth/2, 4*(windowHeight/5))
  }

  if(pizzaIndex == 5){
    image(dough[pizza[0]], width/2, height/2, width/7, width/7);
    image(sauce[pizza[1]], width/2, height/2, width/7, width/7);
    image(cheese[pizza[2]], width/2, height/2, width/7, width/7);
    image(topping1[pizza[3]], width/2, height/2, width/7, width/7);
    image(topping2[pizza[4]], width/2, height/2, width/7, width/7);
    fill("white");
    text('Click the blue button to save your pizza!', windowWidth/2, 4*(windowHeight/5))
  }

}

function windowResized(){                             //permette di ridimensionare in tempo reale la finestra

  avanti.x = 9*(windowWidth/10);
  avanti.y = (windowHeight/2);

  indietro.x = windowWidth/10;
  indietro.y = (windowHeight/2);

  save.x = 7*(windowWidth/10);
  save.y = 4*(windowHeight/5);

  change.x = 8*(windowWidth/10);
  change.y = 4*(windowHeight/5);

  resizeCanvas(windowWidth, windowHeight);
}
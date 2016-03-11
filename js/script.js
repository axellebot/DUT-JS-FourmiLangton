$body = document.getElementById("body");
$canevas = document.createElement("canvas");
var context = $canevas.getContext('2d');

var coef = 15 ;

var mCote = 100; //nb de case en hauteur et largeur


function Case(posX, posY, color) {
    this.x = posX || null;
    this.y = posY || null;
    this.color = color || "white";
    //console.log("New Case in : " + this.x + "   " + this.y + " and the color : " + this.color);
}

function Grille(line, column) {
    this.grille = new Array();
    for (var i = 0; i < line; i++) {
        this.grille[i] = new Array();
    }
    for (var i = 0; i < line; i++) {
        for (var j = 0; j < column; j++) {
            //console.log("i -> " + i);
            //console.log("j -> " + j);
            this.grille[i][j] = new Case(j, i, null);
        }
    }
}

function initGrille() {
    tab = new Grille(mCote, mCote);
    $body.appendChild($canevas);
    $canevas.height = $canevas.width = mCote * coef;
}

initGrille();


function Fourmi(posX, posY) {
    this.x = posX;
    this.y = posY;
    this.orientation = "up";
    this.changeCouleur = function () {
        switch (tab.grille[this.y][this.x].color) {
            case "black":
                tab.grille[this.y][this.x].color = "white";
                break;
            case "white":
                tab.grille[this.y][this.x].color = "black";
                break;
        }
    };
    this.seDeplace = function () {
        this.changeCouleur();
        switch (tab.grille[this.y][this.x].color) {
            case "black":
                switch (this.orientation) {
                    case "up":
                        this.x--;
                        this.orientation = "left";
                        break;
                    case "down":
                        this.x++;
                        this.orientation = "right";
                        break;
                    case "left":
                        this.y--;
                        this.orientation = "down";
                        break;
                    case "right":
                        this.y++;
                        this.orientation = "up";
                        break;
                }
                break;
            case "white":
                switch (this.orientation) {
                    case "up":
                        this.x++;
                        this.orientation = "right";
                        break;
                    case "down":
                        this.x--;
                        this.orientation = "left";
                        break;
                    case "left":
                        this.y++;
                        this.orientation = "up";
                        break;
                    case "right":
                        this.y--;
                        this.orientation = "down";
                        break;
                }
                break;
        }
    }
}

var mFourmi = new Fourmi(mCote / 2, mCote / 2);

setInterval(function () {
        update();
    }, 1
);
function update() {
    mFourmi.seDeplace();
    for (var i = 0; i < tab.grille.length; i++) {
        for (var j = 0; j < tab.grille[i].length; j++) {
            switch (tab.grille[i][j].color) {
                case "black":
                    context.fillStyle = "Black";
                    context.fillRect(j + j * coef, i + i * coef, 1 * coef, 1 * coef);
                    break;
                case "white":
                    context.fillStyle = "White";
                    context.fillRect(j + j * coef, i + i * coef, 1 * coef, 1 * coef);
                    break;
            }
        }
    }
}
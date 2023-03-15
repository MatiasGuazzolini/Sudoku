var  numSelected =null;
var tileSelected =null;
var errors=0;
var board =[            //cargamos el board que mostraremos y la solucion con la cual vamos a estar comparandola
    "-6-1-4-5-",
    "--83-56--",
    "2-------1",
    "8--4-7--6",
    "--6---3--",
    "7--9-1--4",
    "5-------2",
    "--72-69--",
    "-4-5-8-7-",
]
var solution =[
    "963174258",
    "178325649",
    "254689731",
    "821437596",
    "496852317",
    "735961824",
    "589713462",
    "317246985",
    "642598173",
]

window.onload = function () {       //hago que al cargar la ventana se ejecute la funcion
    setGame();
}

function setGame () {
    //Digitos debajo del board
    for (let i=1; i<=9; i++){       
        let number= document.createElement("div");
        number.id=i;
        number.innerText = i;
        number.addEventListener("click", selectedNumber); // cuando se realiza un click, llamamos a la funcion select
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);      //con esto creamos como si en html fuera: <div id= "1" class= "number"> 1 <div>
    }

    //Cremaos el board 9x9 aca por el mismo motivo mencionado anteriormente

    for (let m=0; m<9; m++){                    // voy rellenando filas y columnas con el for
        for  (let g=0; g<9; g++){
            let tile = document.createElement("div");
            tile.id = m.toString() + "-" + g.toString();
            if (board[m][g] != "-"){            //hago que las tiles que no esten vacias, impriman su valor 
                tile.innerText= board[m][g];
                tile.classList.add("tile-start");
            }
            if (m == 3 || m == 6){                      //agrego la linea horizontal y vertical del board
                tile.classList.add("horizontal-line");
            }
            if (g==3 || g == 6){
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectedTile);       //eventlistener de click y le asigno el valor de selectedTile
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

// una vez creado el tablero de juego agregamos funcionalidades del juego en si

function selectedNumber (){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected")
    }
    numSelected=this;
    numSelected.classList.add("number-selected");
}
function selectedTile() {
    if (numSelected){
        if(this.innerText != ""){
            return;
        }
        
        let coords= this.id.split("-");     //hacemos split para tener numeros individuales, 0-0, 0-1, que seria ["0", "0"] y asi consecutivamente
        let m= parseInt(coords[0]);     //usamos el parseint debido a que tenemos un string en el array y queremos que nos devuelva un entero (int)
        let g = parseInt(coords [1]);

        if (solution[m][g] == numSelected.id){      //asignamos el id de nu,selected si el valor que ingresamos coincide con la solucion
            this.innerText = numSelected.id
        }
        else{                                       //vamos sumando los erroes que se cometen
            errors+= 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}
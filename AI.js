//This is the Heuristic Algorithm for beating the mineSweeper Game
//For Each tile, We have to calculate the probability of a bomb being in that tile. And the tile with the highest probability will be flagged
//We also need to clear tiles that are guaranteed to be safe
let numbered_tiles = [] //Used for referencing to later to determine the remaining bomb locations
let updated = false;

function Probability(i,j,value){

    let coordinates = [];
    let remaining_bombs = value;
    //We need to go through all candidate coordinate locations;
    for(let a = 0; a < 8; a++){

        let dely = (a < 3?-1:(a > 3 && a < 7?1:0))

        let delx = (a > 1 && a < 5?1:(a > 5 || !a?-1:0))
        
        if(i + dely > -1 && i + dely < row && j + delx > -1 && j + delx < col){

            let curr_tile = document.getElementById((i+dely)+','+(j+delx))

            if(curr_tile.getAttribute('class') == "unchecked" || curr_tile.getAttribute('class') == "bomb" /*Also Unchecked*/){

                coordinates.push([i+dely,j+delx])  //Viable Coordinate
            
            }
            else if(curr_tile.getAttribute('class') == "flagged"){

                remaining_bombs --;

            }
        }
    }
    //Then, we need to calculate the possibility of a mine being there for each viable Coordinate
    //The best case is when we are guaranteed 100% 
    if(coordinates.length == remaining_bombs){
        //Flag all nearby bombs
        for(var a = 0; a < coordinates.length; a++){

            tile = document.getElementById(coordinates[a][0] + ',' + coordinates[a][1]);

            tile.setAttribute('class', "flagged");

            bomb_number --;

            bomb_count.innerHTML = bomb_number;

            let img = tile.childNodes;

            img[0].src = "Images/flag.png";

        }

        return true;

    }
    else if(!remaining_bombs){

        clear_tile(i,j)

    }

    return false;

}
function AI(){
    //First need to check if we have to pick a random tile. First Choice;
    if(!updated){

        let y = Math.floor(Math.random()*row)

        let x = Math.floor(Math.random()*col)

        left_click(y,x)

        updated = true;
    }
    //Otherwise, use the data given
    else{
        //Current Coordinates for tile we analyze
        updated = false;
        let ref = 0;
        while(ref < numbered_tiles.length){
            let i = numbered_tiles[ref][0]
            let j = numbered_tiles[ref][1]
            if(Probability(i,j,parseInt(document.getElementById(i+','+j).getAttribute('value')))){
                
                updated = true; 
                
                numbered_tiles.splice(ref, 1)

                break;
            
            }

            ref++;
        }

    }
    complete()
}
function left_click(i,j){

    let tile = document.getElementById(i+','+j)

    if(tile.getAttribute('class') != undefined && tile.getAttribute('class') == "unchecked"){

        if(tile.getAttribute('value') == "0"){

            collect_tiles(i,j);
        }
        else {

            numbered_tiles.push([i,j])

            tile.setAttribute('class', "check_"+tile.getAttribute('value'))

            tile.innerHTML = tile.getAttribute('value')

            tile.style.fontSize = tile_width * 0.8
        };
    }

    else if(tile.getAttribute('class') == "bomb"){

        detonate_bombs(i,j);

        game_status = 3;

    }
}
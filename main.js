let board = document.getElementById('grid');
let bomb_count = document.getElementById('bomb_count')
let clock = document.getElementById('clock')

let bomb_number = 50, timer = 0;
let row = 20, col = 30;
let tile_width = innerHeight * 0.9 * (1/row);

board.style.width = tile_width * col;
board.style.height = innerHeight*0.9;

//Initialize clock and number of bombs;
bomb_count.innerHTML = ": " + bomb_number;
clock.innerHTML = ": " + timer;

function set_bombs(){
    let locations = [];
    for(var a = 0; a < row; a++){
        for(var b = 0; b < col; b++){
            locations.push([a,b])
        }
    }
    for(var i = 0; i < bomb_number; i++){
        let a = Math.floor(Math.random()*(locations.length-1))
        let x = locations[a][0], y = locations[a][1];
        locations.splice(a,1)
        let bomb_tile = document.getElementById(x + ',' + y)
        bomb_tile.setAttribute('value', "b")
        bomb_tile.setAttribute('class', "bomb")
        bomb_tile.addEventListener('click', function(){
            if(bomb_tile.getAttribute('class') == "bomb"){
                detonate_bombs(x,y)
            }
        })
        bomb_tile.addEventListener('contextmenu', function(){
            if(bomb_tile.getAttribute('class') == "bomb"){
                bomb_tile.setAttribute('class', "flagged")
                let img = bomb_tile.childNodes;
                img[0].src = "Images/flag.png"
                bomb_number --;
            }
            else if(bomb_tile.getAttribute('class') == "flagged"){
                bomb_tile.setAttribute('class', "bomb")
                let img = bomb_tile.childNodes;
                img[0].src = "Images/empty.png"
                bomb_number ++;
            }
        })
    }
}
function detonate_bombs(i,j){
    for(var a = 0; a < row; a++){
        for(var b = 0; b < col; b++){
            let tile = document.getElementById(a + ',' + b);
            if(tile.getAttribute('class') == "bomb"){
                tile.setAttribute('class', "detonated")
                let img = tile.childNodes;
                img[0].src = "Images/Bomb.png"
            }
        }
    }
    let curr_bomb = document.getElementById(i+','+j);
    curr_bomb.style.background = "red";
}
function count_neighboring_bombs(i,j){
    //(-1,-1),(0,-1),(1,-1),(1,0),(1,1),(0,1),(-1,1),(-1,0)
    //x: -1,0,1,1,1,0,-1,-1
    //y: -1,-1,-1,0,1,1,1,0
    let bombs = 0;
    for(let a = 0; a < 8; a++){
        let dely = (a < 3?-1:(a > 3 && a < 7?1:0))
        let delx = (a > 1 && a < 5?1:(a > 5 || !a?-1:0))
        if(i + dely > -1 && i + dely < row && j + delx > -1 && j + delx < col){
            let neighbor = document.getElementById((i+dely)+','+(j+delx))
            if(neighbor.getAttribute('class') != undefined && neighbor.getAttribute('class') == "bomb")
                bombs ++;
        }
    }
    return bombs;
}
function collect_tiles(i,j){
    //Approach: DFS
    let stack = [];
    stack.push([i,j])
    while(stack.length > 0){
        let curr = stack[stack.length-1];
        let tile = document.getElementById(curr[0] + ',' + curr[1]);
        if(tile.getAttribute('class') == "unchecked"){
            tile.setAttribute('class', 'check_' + tile.getAttribute('value'))
            tile.innerHTML = tile.getAttribute('value')
            if(tile.getAttribute('value') == "0"){
                for(let a = 0; a < 8; a++){
                    let dely = (a < 3?-1:(a > 3 && a < 7?1:0))
                    let delx = (a > 1 && a < 5?1:(a > 5 || !a?-1:0))
                    if(curr[0] + dely > -1 && curr[0] + dely < row && curr[1] + delx > -1 && curr[1] + delx < col){
                        stack.push([curr[0]+dely,curr[1]+delx])
                    }
                }
            }
        }
        else stack.pop();
    }
}
function set_tiles(){
    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            let tile = document.getElementById(i + ',' + j)
            if(tile.getAttribute('class') == undefined){
                let a = count_neighboring_bombs(i,j)
                let img = document.createElement('img')
                img.src = "Images/empty.png"
                img.width = tile_width;
                img.height = tile_width;
                tile.setAttribute('value', a);
                tile.setAttribute('class', "unchecked")
                tile.addEventListener('click', function(){
                    if(tile.getAttribute('class') != undefined && tile.getAttribute('class') == "unchecked"){
                        if(tile.getAttribute('value') == "0"){
                            collect_tiles(i,j);
                        }
                        else {
                            tile.setAttribute('class', "check_"+tile.getAttribute('value'))
                            tile.innerHTML = tile.getAttribute('value')
                        };
                    }
                })
                //Flagging Cells
                tile.addEventListener('contextmenu', function(){
                    if(tile.getAttribute('class') == "unchecked"){
                        tile.setAttribute('class', "flagged")
                        let img = tile.childNodes;
                        img[0].src = "Images/flag.png"
                        bomb_number --;
                    }
                    else if(tile.getAttribute('class') == "flagged"){
                        tile.setAttribute('class', "unchecked")
                        let img = tile.childNodes;
                        img[0].src = "Images/empty.png"
                        bomb_number ++;
                    }
                })
            }
        }
    }
}
function add_empty_tile(i,j){
    let tile = document.createElement('div')
    let img = document.createElement('img');
    img.src = "Images/empty.png";
    img.width = tile_width;
    img.height = tile_width;
    tile.appendChild(img);
    tile.style.top = i * tile_width;
    tile.style.left = j * tile_width;
    tile.style.width = tile_width;
    tile.style.height = tile_width;
    tile.style.border = "solid black 1px"
    tile.setAttribute('id', i + ',' + j)
    board.appendChild(tile);
}
function initialize_grid(){
    for(var a = 0; a < row; a++){
        for(var b = 0; b <col; b++){
            add_empty_tile(a,b)
        }
    }
}
function main(){
    initialize_grid()
    set_bombs()
    set_tiles()
}
window.addEventListener('contextmenu', () => {
    bomb_count.innerHTML = bomb_number;
})
main()

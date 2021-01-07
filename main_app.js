let board = document.getElementById('grid');
let bomb_count = document.getElementById('bomb_count')
let clock = document.getElementById('clock')

let bomb_number, timer;
let total_bombs;
let row, col;
let tile_width;
//game_status: 0 if not begun, 1 if playing, 2 if won, 3 if lost
let game_status;

//Initialize clock and number of bombs;

function complete(){
    //Check every cell in the grid and see if there are any unchecked cells. If so, return
    for(var a = 0; a < row; a++){

        for(var b = 0; b < col; b++){

            if(document.getElementById(a+','+b).getAttribute('class') == "unchecked"){
                return;
            }
        }
    }

    game_status = 2 //Otherwise, you won

    
}
function initialize_grid(){
    for(var a = 0; a < row; a++){
        for(var b = 0; b <col; b++){
            add_empty_tile(a,b)
        }
    }
}
function reset_grid(){
    let parent = document.getElementById('grid')
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}
function new_game(bombs, r_size, c_size){
    //Reset all variables
    
    timer = 0;
    game_status = 0;
    bomb_number = bombs;
    total_bombs = bombs;
    row = r_size;
    col = c_size;
    tile_width  = innerHeight * 0.85 * (1/row);
    board.style.width = tile_width * col;
    board.style.height = innerHeight*0.85;

    bomb_count.innerHTML = ": " + bomb_number;
    clock.innerHTML = ": " + timer;

    reset_grid()
    initialize_grid()
    set_bombs()
    set_tiles()
}
window.addEventListener('contextmenu', () => {
    bomb_count.innerHTML = bomb_number;
})
window.addEventListener('click', ()=> {
    complete()

    let expression;

    switch(game_status){
        //We have three cases: We survived, We won, We lost
        case 1: 
            expression = "fas fa-surprise"
            break 
        case 2:
            expression = "fas fa-grin-beam"
            break 
        case 3: 
            expression = "fas fa-dizzy"
            break 
        default:
            expression = "fas fa-smile"
            break;
    }
    
    document.getElementById("face").setAttribute('class', expression)

})
window.addEventListener('dblclick', ()=> {
    complete()

    let expression;

    switch(game_status){
        //We have three cases: We survived, We won, We lost
        case 1: 
            expression = "fas fa-surprise"
            break 
        case 2:
            expression = "fas fa-grin-beam"
            break 
        case 3: 
            expression = "fas fa-dizzy"
            break 
        default:
            expression = "fas fa-smile"
            break;
    }
    
    document.getElementById("face").setAttribute('class', expression)

})

new_game(10,10,10)

//Clock
setInterval(function(){
    if(game_status == 1){
        timer++
        clock.innerHTML = ": " + timer;
    }
    if(document.getElementById("face").getAttribute('class') == "fas fa-surprise"){
        document.getElementById("face").setAttribute('class', "fas fa-smile")
    }
}, 1000)
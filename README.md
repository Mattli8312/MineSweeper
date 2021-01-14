# MineSweeper
## Introduction
MineSweeper is an incredible puzzle game developed in the 1960s across many computing platforms. The game is comprised of a 2D grid
which houses mines in certain unknown areas. Surrounding these unknown locations are tiles that indicate how many mines are adjacent to them. Each tile has eight adjacent cells and the user must use these tiles to determine which tiles are hiding mines. 
## Implementation
I implemented this game using HTML/CSS (with additional bootstrap functions) and JavaScript (no libraries). You can check out this MineSweeper clone by using this link (https://mattli8312.github.io/MineSweeper/.), or you can clone this repo and run the files on a local browser. 
## AI Algorithm:
I implemented a Heuristic Algorithm which calculates the probability of a tile being a mine. This Algorithm has many drawbacks, however for a map with a smaller density of mines, this algorithm is very effective. To use this, you can simply click the tools icon and click AI. This should run the algorithm in real time for you to See!
## main_app.js
main_app.js is mainly responsible for user interaction and setting up the game board. 
### Functions
* complete(): Simply checks all the cells to see if the user has cleared all tiles of mines. 
* initialize_grid(): Adds tile divs to the grid div.
* reset_grid(): Removes all tile divs from the grid div.
* new_game(bombs, r_size, c_size): resets and initializes grid given appropriate parameters.
* options(): When the options button is clicked, this function opens up difficulty levels and customizations at user's disposal.
* customize(): Allows user to define their preferred number of rows, columns, and bombs and recreates a new game accordingly.
### EventListeners
* ('dblclick'): Used to change the appearance of the smiley face based on the tile selected.
* ('click'): same implementation as 'dblclick'
* ('contextmenu'): updates bomb counter
* ('setInterval'): for timer  
## main_code.js
main_code.js is responsible for the game logic that minesweeper uses.
### Functions
* set_bombs(): Finds x number of unique locations on the grid and places bombs there, where x is the predetermined total number of mines.
* detonate_bombs(i,j): When the user selects a tile containing a bomb, this function will set off all the other bombs to be displayed on the board.
* count_neighboring_bombs(i,j): For the tile selected, it will check all eight adjacent tiles and calculate the sum of those tiles containing mines.
* collect_tile(i,j): This function uses Depth-First-Search. Specifically, I used a stack to go through all adjacent tiles containing zeroes and ones. If a tile has a zero, it adds on all adjacent neighbors to the stack and if a tile has a number, it will remove from the stack.
* clear_tile(i,j): When a tile has been flagged for adjacent mines, if the location of the flags is correct, it will call collect_tile's function to clear all adjacent regions.
* set_tiles(): Goes through each cell in the grid and counts number of neighboring bombs and sets that tile's value to that quantity.
* add_empty_tile(i,j): Used for initializing the grid.

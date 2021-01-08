# MineSweeper
## Introduction
MineSweeper is an incredible puzzle game developed in the 1960s across many computing platforms. The game is comprised of a 2D grid
which houses mines in certain unknown areas. Surrounding these unknown locations are tiles that indicate how many mines are adjacent to them. Each tile has eight adjacent cells and the user must use these tiles to determine which tiles are hiding mines. 
## Implementation
I implemented this game using HTML/CSS (with additional bootstrap functions) and JavaScript (no libraries). You can check out this MineSweeper clone by connecting to this link (link), or you can clone this repo and run the files on a local browser. 
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
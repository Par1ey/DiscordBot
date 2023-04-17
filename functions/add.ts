const { googleIt } = require('Google')

function add(game, table){
    let link = googleIt(game);
    table.set(game,link);
}

global.spilListe = new Map<string, string>();
add("minesweeper", global.spilListe)

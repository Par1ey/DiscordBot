const googleIt = require('Google')

class Append{
    constructor(){}

    add(game){
        let link = googleIt(game);
        global.spilListe.set(game,link);
    }
};

global.spilListe = new Map<string, string>();

const googleIt = require('google-it')

module.exports = class Append{

    constructor(q){
        this.name = q;
        this.link = ":)";
        this.map = new Map();
    }

    async GoogleSearch(){
        await googleIt({'disableConsole': true, 'only-urls': true, 'limit': 1, 'query':  this.name})
        .then(results => {this.map.set(this.name, results.link); console.log(results)}).catch(e => {})
    }

    async set(){
        await this.GoogleSearch().then(this.map.set(this.name, this.link));
    }

    add(name, link){
        map.set(name, link);
    }
}
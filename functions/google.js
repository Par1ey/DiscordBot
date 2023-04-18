const  { googleIt } = require('google-it')

class Google{
  constructor(q){
    this.query = q;
  }

  GoogleSearch(){

    googleIt({'only-urls': true, 'limit': 1, 'query':  this.query}).then(results => {
        results.link;
      }).catch(e => {
        // any possible errors that might have occurred (like no Internet connection)
      })
    }
}

async function test(q){
  const search = new Google(q);
  console.log(search);
}

test("Minesweeper Online");


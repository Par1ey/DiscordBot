const  { googleIt } = require('google-it')

function Google (query){

googleIt({'only-urls': true, 'limit': 1, 'query':  query}).then(results => {
  console.log(results.link)
}).catch(e => {
  // any possible errors that might have occurred (like no Internet connection)
})
}
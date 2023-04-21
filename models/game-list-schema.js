const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const gameListSchema = new mongoose.Schema({
  gameName: reqString,
  link: reqString,
  guildId: reqString,
  channelId: reqString,
}, {collection: 'gameList'});

const name = 'gameList'

module.exports = mongoose.model[name] || mongoose.model(name, gameListSchema, name)

const gameListModel = mongoose.model[name] || mongoose.model(name, gameListSchema, name);
module.exports = gameListModel;

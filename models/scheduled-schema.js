const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const scheduledSchema = new mongoose.Schema({
  name: reqString,
  date: {
    type: Date,
    required: true,
  },
  content: reqString,
  guildId: reqString,
  channelId: reqString,
}, {collection: 'Scheduled-Messages'});

const name = 'Scheduled-Messages'

module.exports = mongoose.model[name] || mongoose.model(name, scheduledSchema, name)

const scheduledModel = mongoose.model[name] || mongoose.model(name, scheduledSchema, name);
module.exports = scheduledModel;

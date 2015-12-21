/**
 * Created by kvaghasiya on 12/20/15.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// Define your schema here
var User   = new Schema({
    name: String,
    username: String,
    email: String,
    zip: Number
});

module.exports = mongoose.model('User', User);
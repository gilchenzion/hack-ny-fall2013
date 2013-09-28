
var mongoose = require('mongoose');
var mongourl = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/decks'; 
mongoose.connect(mongourl);
var db = mongoose.connection;

var deckSchema = mongoose.Schema({
	createdAt: Date.now,
	title: String,
	description: String,
	imageURL: String,
	numOfCards: Number,
	numOfNouns: Number,
	numOfAdjs: Number,
	tags:[String],
	nounCards: [String],
	adjCards: [String],
	generated: Boolean
});

var Deck = db.model('Deck', deckSchema);

exports.getAllDecks = function (req, res) {
	
};

exports.getDeckById = function (req, res) {

};

exports.postDeck = function (req, res) {

};
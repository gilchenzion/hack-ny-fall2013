
var mongoose = require('mongoose');
var mongourl = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/decks'; 
mongoose.connect(mongourl);
var db = mongoose.connection;

var deckSchema = mongoose.Schema({
	createdAt: { type: Date, default: Date.now },
	title: String,
	description: String,
	imageURL: String,
	numOfCards: Number,
	numOfNouns: Number,
	numOfAdjs: Number,
	numOfVotes: Number,
	tags:[String],
	nounCards: [String],
	adjCards: [String],
	generated: Boolean
});

var Deck = db.model('Deck', deckSchema);

exports.getAllDecks = function (req, res) {
	Deck.find({}, function(err, result) {
		if(err) {
			return handleError(err);
		} else {
			return res.send(result);
		}
	});
};

exports.getDeckById = function (req, res) {
	Deck.findById(req.params.id, function(err, result) {
		if(err) {
			return handleError(err);
		} else {
			return res.send(result);
		}
	});
};

exports.postDeck = function (req, res) {
	var newDeck = new Deck(req.body);
	newDeck.save(function(err) {
		if(err) {
			return handleError(err);
		} else {
			console.log('woooot');
		}
	});
	return res.send(newDeck);
};

var mongoose = require('mongoose');
var queryString = require('querystring');

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
	params = {};
	var query = req._parsedUrl.query;
	var objParams = queryString.parse(query);
	if(query != "") {
		var params = {
			title: { $regex: new RegExp(objParams.title), $options: 'i' }
		}
	}
	var page = objParams.page;
	var limit = objParams.limit;
	var skip = limit * (page - 1);
	Deck.find(params, {} ,{limit: limit, skip: skip}, function(err, result) {
		if(err) {
			return handleError(err);
		} else {
			return res.send({
				count: result.length,
				result: result
			});
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

exports.generateDeck = function (req, res) {
	return res.send({
		working: true
	});
}
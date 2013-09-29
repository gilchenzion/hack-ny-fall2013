
var mongoose = require('mongoose');
var queryString = require('querystring');
var request = require('request');

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
	var query = "muslim";
	var nyTimes = "http://api.nytimes.com/svc/semantic/v2/concept/search.json?fields=article_list&api-key=719abfb140844f90fe632b5f28db4118:3:68190560&query=" + query;
	request(nyTimes, function(err, result) {
		var finalWords = [];
		console.log(result.body);
		var results = JSON.parse(result.body).results
		console.log(results);
		var i;
		for(i =0; i < results.length; i++) {
			var r = results[i].article_list.results;
			var j;
			for(j = 0; j < r.length; j++) {
				var concepts = r[j].concepts;
				finalWords = finalWords.concat(concepts.nytd_des, concepts.nytd_geo, concepts.nytd_per, concepts.nytd_org);
			}
		}
		
		res.send({
			result: finalWords
		});
	});
};
module.exports = function(app, mongoose, mongodb) {
    var PhraseSchema = new mongoose.Schema({
        added: { type: Date },
        phrase: { type: String},
        comments: { type: Number, default: 0 }
    });

    var Phrase = mongoose.model('Phrases', PhraseSchema);

    var postCallback = function(err) {
        if (err) {
            return console.log(err);
        }
        return console.log('Post saved');
    };

    var updateComments = function(phraseId) {
        console.log('Updating # of comments on ' + phraseId);
        Phrase.update({_id: phraseId }, { $inc: { comments: 1 }}, {upsert: true}, function(err) {
            if (err) console.log(err);
        });
    };

    var postPhrase = function(phrase) {
        console.log('Updating phrase ' + phrase);
        var pPhrase = new Phrase({
            added: new Date(),
            phrase: phrase
        });
        pPhrase.save(postCallback);
        return pPhrase;
    };

    var findAll = function(callback) {
        console.log('Getting all phrases');
        Phrase.find({}, callback);
    };

    var findById = function(id, callback) {
        console.log('Getting phrase by id: ' + id);
        Phrase.findById(id, callback);
    };

    return {
        postPhrase: postPhrase,
        updateComments: updateComments,
        Phrase: Phrase,
        findAll: findAll,
        findById: findById
    };
};

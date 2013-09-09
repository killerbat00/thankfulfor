module.exports = function(app, mongoose, mongodb) {
    var PhraseSchema = new mongoose.Schema({
        addedSimple: { type: String },
        added: { type: String },
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
        var added = new Date();
        var pPhrase = new Phrase({
            addedSimple: added.toString().substring(4,15),
            added: added.toUTCString(),
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

    var findByDate = function(date, callback) {
        var dt = new Date(parseInt(date));
        var realDate = dt.toString().substring(4,15);
        console.log('Getting phrases by date: ' + realDate);
        Phrase.find({addedSimple: realDate}, callback);
    };

    return {
        postPhrase: postPhrase,
        updateComments: updateComments,
        Phrase: Phrase,
        findAll: findAll,
        findById: findById,
        findByDate: findByDate
    };
};

module.exports = function(app, mongoose) {
    
    var PhraseSchema = new mongoose.Schema({
        phraseId: { type: mongoose.Schema.ObjectId },
        added: { type: Date },
        phrase: { type: String}
    });

    var Phrase = mongoose.model('Phrases', PhraseSchema);

    var postCallback = function(err) {
        if (err) {
            return console.log(err);
        };
        return console.log('Post saved');
    };

    var postPhrase = function(phrase) {
        console.log('Updating phrase ' + phrase);
        var pPhrase = new Phrase({
            added: new Date(),
            phrase: phrase,
        });
        pPhrase.save(postCallback);
        return pPhrase;
        console.log('save command sent');
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
        Phrase: Phrase,
        findAll: findAll,
        findById: findById
    }
}


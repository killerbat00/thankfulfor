define(['models/Phrase'], function(Phrase) {
    var PhraseCollection = Backbone.Collection.extend({
        model: Phrase
    });

    return PhraseCollection;
});


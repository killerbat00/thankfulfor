define(['views/index', 'models/Phrase', 'models/PhraseCollection'], function(indexView, Phrase, PhraseCollection) {
    var ThankfulRouter = Backbone.Router.extend({
        routes: {
            'index': 'index'
        },

        index: function() {
            var phraseCollection = new PhraseCollection();
            phraseCollection.url = '/phrases';
            this.changeView(new IndexView({
                collection: phraseCollection
            }));
            phraseCollection.fetch();
        }
    });
    return  new ThankfulRouter();
});


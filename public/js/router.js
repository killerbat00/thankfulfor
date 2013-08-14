define(['views/index', 'models/Phrase', 'models/PhraseCollection'], function(IndexView, Phrase, PhraseCollection) {
    var ThankfulRouter = Backbone.Router.extend({
        currentView:null,

        routes: {
            'index': 'index',
        },

        changeView: function(view) {
            if (null != this.currentView ) {
                this.currentView.undelegateEvents();
            }
            this.currentView = view;
            this.currentView.render();
        },

        index: function() {
            var phraseCollection = new PhraseCollection();
            phraseCollection.url = '/phrases';
            this.changeView(new IndexView({
                collection: phraseCollection
            }));
            phraseCollection.fetch();
            if(phraseCollection === 0) {
                $('.phrase_list').append("<li>Nobody's thaknful. Be the first.</li>");
            }
        }
    });

    return  new ThankfulRouter();
});


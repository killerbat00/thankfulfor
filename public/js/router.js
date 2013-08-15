define(['views/index', 'models/Phrase', 'models/PhraseCollection'], function(IndexView, Phrase, PhraseCollection) {
    var ThankfulRouter = Backbone.Router.extend({
        currentView:null,

        routes: {
            'index': 'index'/*,
            'comments/:id' : 'comment'*/
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
        }/*,

        comment: function() {
            var commentCollection = new commentCollection();
            this.changeView(new commentView());
            commentCollection.fetch();
        }*/
    });

    return new ThankfulRouter();
});


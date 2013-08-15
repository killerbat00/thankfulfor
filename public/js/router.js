define(['views/index', 'views/commentPage', 'models/Comment', 'models/CommentCollection', 'models/Phrase', 'models/PhraseCollection'], 
function(IndexView, CommentView, Comment, CommentCollection, Phrase, PhraseCollection) {
    var ThankfulRouter = Backbone.Router.extend({
        currentView: null,

        routes: {
            '' : 'index',
            'index': 'index',
            'comments/:id' : 'comment'
        },

        changeView: function(view) {
            if (null != this.currentView ) {
                this.currentView.undelegateEvents();
            }
            this.currentView = view;
            this.currentView.render();
        },

        index: function() {
            this.navigate('index', true);
            var phraseCollection = new PhraseCollection();
            phraseCollection.url = '/phrases';
            this.changeView(new IndexView({
                collection: phraseCollection
            }));
            phraseCollection.fetch();
        },

        comment: function(id) {
            this.navigate('/comments/'+id, true);
            var commentCollection = new CommentCollection();
            commentCollection.url = '/comments/'+id;
            this.changeView(new CommentView({
                collection: commentCollection
            }));
            commentCollection.fetch();
        }
    });

    return new ThankfulRouter();
});


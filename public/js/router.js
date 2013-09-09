define(['views/index', 'views/commentPage', 'views/notFound', 'views/addedPage', 'models/Comment', 'models/CommentCollection', 'models/Phrase', 'models/PhraseCollection', 'models/Added', 'models/AddedCollection'],
function(IndexView, CommentView, notFoundView, AddedView, Comment, CommentCollection, Phrase, PhraseCollection, Added, AddedCollection) {
    var ThankfulRouter = Backbone.Router.extend({
        currentView: null,

        routes: {
            '' : 'index',
            'index': 'index',
            'comments/:id' : 'comment',
            'added/:d' : 'added',
            '*path' : 'notFound'
        },

        changeView: function(view) {
            if (null !== this.currentView ) {
                this.currentView.undelegateEvents();
            }
            this.currentView = view;
            this.currentView.render();
        },
        notFound: function() {
            this.navigate('notFound', {trigger: true});
            this.changeView(new notFoundView());
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
            this.navigate('comments/' + id, true);
            var commentCollection = new CommentCollection();
            commentCollection.url = '/comments/' + id;
            this.changeView(new CommentView({
                collection: commentCollection
            }));
            commentCollection.fetch()
        },

        added: function(d) {
            this.navigate('added/' + d, true);
            var addedCollection = new AddedCollection();
            addedCollection.url = '/added/' + d;
            this.changeView(new AddedView({
                collection: addedCollection
            }));
            addedCollection.fetch()
        }
    });

    return new ThankfulRouter();
});


define(['ThankfulForView', 'text!templates/index.html',
        'views/phrase', 'models/Phrase'],
function(ThankfulForView, indexTemplate, PhraseView, Phrase) {
    var indexView = ThankfulForView.extend({
        el: $('#content'),
        events: {
            'submit form': 'postPhrase'
        },

        initialize: function() {
            this.collection.on('add', this.onPhraseAdded, this);
            this.collection.on('reset', this.onPhraseCollectionReset, this);
        },

        onPhraseCollectionReset: function(collection) {
            var that = this;
            collection.each(function(model) {
                that.onPhraseAdded(model);
            });
        },

        onPhraseAdded: function(phrase) {
            var phraseHtml = (new PhraseView({model: phrase })).render().el;
            $(phraseHtml).prependTo('.phrase_list').hide().fadeIn('slow');
        },

        postPhrase: function() {
            var input = $('input[name=phrase]');
            var phraseText = input.val();
            var phraseCollection = this.collection;
            $.post('/phrases', {
                phrase: phraseText
            }, function(data) {
                phraseCollection.add(new Phrase({phrase: phraseText}));
                input.val('');
                //$('input[name=phrase]').val('');
            });
            return false;
        },

        render: function() {
            this.$el.html(indexTemplate);
        }
    });

    return indexView;
});





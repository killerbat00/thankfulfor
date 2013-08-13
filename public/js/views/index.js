define(['ThankfulForView', 'text!templates/index.html',
        'views/phrase', 'models/Phrase'],
function(ThankfulForView, indexTemplate, PhraseView, Phrase) {
    var indexView = ThankfulForView.extend({
        el: $('#content'),
        events: {
            'focus div[class=phrase]': 'clear',
            'click input[value=Add]' : 'postPhrase',
            'keypress div[class=phrase]':'postPhraseEnter'
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

        clear: function() {
            var phraseDiv = $('.phrase');
            phraseDiv.text('');
        },

        postPhrase: function(e) {
            e.preventDefault();
            var phraseText = $('.phrase').text();
            var phraseCollection = this.collection;
            $.post('/phrases', {
                phrase: phraseText
            }, function(data) {
                phraseCollection.add(new Phrase({phrase: phraseText}));
                $('.phrase').text('');
            });
            return false;
        },

        postPhraseEnter: function(e) {
            if (e.keyCode != 13) return;
            this.postPhrase(e);
        },

        render: function() {
            this.$el.html(indexTemplate);
        }
    });

    return indexView;
});





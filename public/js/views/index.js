define(['ThankfulForView', 'text!templates/index.html',
        'views/phrase', 'models/Phrase'],
function(ThankfulForView, indexTemplate, PhraseView, Phrase) {
    var indexView = ThankfulForView.extend({
        el: $('#content'),
        events: {
            'click div[id=phraseBox]' : 'clear',
            'click input[value=Add]' : 'postPhrase',
            'keypress div[id=phraseBox]' : 'postPhraseEnter',
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
            if (collection.length===0) {
                $('.phrase_list').append('<strong>Nobody is thankful. Be the first!</strong>');
            }
        },

        onPhraseAdded: function(phrase) {
            var phraseHtml = (new PhraseView({model: phrase })).render().el;
            $(phraseHtml).prependTo('.phrase_list').hide().fadeIn('slow');
        },

        clear: function(e) {
            e.preventDefault();
            var phraseDiv = $('#phraseBox');
            phraseDiv.text('');
            phraseDiv.addClass('visited');
            phraseDiv.focus();
        },

        postPhrase: function(e) {
            e.preventDefault();
            var phraseDiv = $('#phraseBox');
            var phraseText = phraseDiv.text();
            var phraseCollection = this.collection;

            if(!phraseDiv.hasClass('visited')) return;
            if (((e.keyCode === 13) && (phraseDiv.text()=== ''))) {
                $('#errorMsg').slideDown('fast');
            }
            if(phraseCollection.length === 0) {
                $('.phrase_list').empty();
            }
            $.post('/phrases', {
                phrase: phraseText
            }, function(data) {
                var content = JSON.parse(data);
                phraseCollection.add(new Phrase({phrase: content.phrase,
                                                 added: content.added,
                                                 _id: content._id}));
                $('#phraseBox').text('');
                $('#errorMsg').slideUp('fast');
            });
            return false;
        },

        postPhraseEnter: function(e) {
            if (e.keyCode != 13) return;
            this.postPhrase(e);
        },

        render: function() {
            this.$el.html(indexTemplate);
            $('#preContent').slideUp('medium');
            return this;
        }


    });

    return indexView;
});

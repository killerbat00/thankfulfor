define(['ThankfulForView', 'text!templates/addedPage.html',
        'views/added', 'models/Added'],
function(ThankfulForView, addedPageTemplate, AddedView, Added) {
    var addedPageView = ThankfulForView.extend({
        el: $('#content'),

        events: {
            'blut .phrase' : 'resetDiv'
        },

        initialize: function() {
            this.collection.on('add', this.onPhraseAdded, this);
            this.collection.on('reset', this.onPhraseCollectionReset, this);
        },

        resetDiv: function() {
            var div = $('#phraseBox');
            if(div.text() === '' && div.hasClass('visited')) {
                div.html("<i>Enter something you're thankful for here...</i>");
            }
        },

        onPhraseCollectionReset: function(collection) {
            var that = this;
            collection.each(function(model) {
                that.onPhraseAdded(model);
            });
            if (collection.length === 0) {
                $('.phrase_list').empty().append('<String>Nobody was thankful at that time!</strong>');
            }
        },

        onPhraseAdded: function(phrase) {
            var phraseHtml = (new AddedView({model: phrase })).render().el;
            $(phraseHtml).prependTo('.phrase_list').hide().fadeIn('slow');
        },

        render: function() {
            $(this.$el).html(addedPageTemplate);
            $('#preContent').slideUp('medium');
            $('body').css('overflow', '');
            return this;
        }
    });

    return addedPageView;
});
                
    


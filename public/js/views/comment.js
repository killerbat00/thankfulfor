define(['ThankfulForView', 'text!templates/comment.html', 'views/phrase', 'models/Phrase'],
function(ThankfulForView, commentTemplate, PhraseView, Phrase) {
    var commentView = ThankfulForView.extend({
        el: $('#content'),
        events: {
        },
        render: function() {
            this.$el.html(commentTemplate);
            return this;
        }
    });

    return commentView;
});
            

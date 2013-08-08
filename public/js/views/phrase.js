define(['ThankfulForView', 'text!templates/phrase.html'],
function(ThankfulForView, phraseTemplate) {
    var phraseView = ThankfulForView.extend({
        tagName: 'li',
        render: function() {
            $(this.el).html(_.template(phraseTemplate,this.model.toJSON()));
            return this;
        }
    });
    return phraseView;
});

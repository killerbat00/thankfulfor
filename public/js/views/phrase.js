define(['ThankfulForView', 'text!templates/phrase.html'],
function(ThankfulForView, phraseTemplate) {
    var phraseView = ThankfulForView.extend({
        tagName: 'li',

        events: {
            'mouseover #phrase': 'mouseOver',
            'mouseout #phrase' : 'mouseOut'
        },

        mouseOver: function() {
            var ele = $(this.el);
            if(!ele.hasClass('hovered')) {
                ele.addClass('hovered');
            }
        },

        mouseOut: function() {
            var ele = $(this.el);
            if (ele.hasClass('hovered')) {
                ele.removeClass('hovered');
            }
        },

        render: function() {
            $(this.el).html(_.template(phraseTemplate,this.model.toJSON()));
            return this;
        }
    });
    return phraseView;
});

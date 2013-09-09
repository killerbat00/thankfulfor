define(['ThankfulForView', 'text!templates/added.html'],
function(ThankfulForView, addedTemplate) {
    var addedView = ThankfulForView.extend({
        tagName: 'li',

        events: {
            'mouseover #phrase' : 'mouseOver',
            'mouseout #phrase' : 'mouseOut'
        },

        mouseOver: function() {
            var ele = $(this.el);
            if (!ele.hasClass('hovered')) {
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
            $(this.el).html(_.template(addedTemplate, this.model.toJSON()));
            return this;
        }
    });
    return addedView;
});

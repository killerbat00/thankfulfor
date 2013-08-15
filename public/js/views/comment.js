define(['ThankfulForView', 'text!templates/commentSingle.html'],
    function(ThankfulForView, commentTemplate) {
        var commentView = ThankfulForView.extend({
            tagName: 'li',

            events: {
                'mouseover #comment' :'mouseOver',
                'mouseout #comment' : 'mouseOut'
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
                $(this.el).html(_.template(commentTemplate, this.model.toJSON()));
                return this;
            }
    });
    return commentView;
});

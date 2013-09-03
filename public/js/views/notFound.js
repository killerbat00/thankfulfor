define(['ThankfulForView', 'text!templates/notFound.html'],
function(ThankfulForView, errorTemplate) {
    var errView = ThankfulForView.extend({
        el: $('#content'),
        render: function() {
            this.$el.html(errorTemplate);
            $('#preContent').slideUp('medium');
            $('body').css('overflow', '');
            return this;
        }
    });
    return errView;
});

define(function(require) {
    var Comment = Backbone.Model.extend({
        urlRoot: '/comments/'
    });
    return Comment;
});

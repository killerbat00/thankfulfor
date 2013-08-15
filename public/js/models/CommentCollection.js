define(['models/Comment'], function(Comment) {
    var CommentCollection = Backbone.Collection.extend({
        model: Comment
    });

    return CommentCollection;
});

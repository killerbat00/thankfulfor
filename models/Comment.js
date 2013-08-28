module.exports = function(app, mongoose) {

    var CommentSchema = new mongoose.Schema({
        phraseId: { type: mongoose.Schema.ObjectId},
        added: { type: Date },
        text: { type: String },
    });

    var Comment = mongoose.model('Comments', CommentSchema);

    var postCallback = function(err) {
        if (err) {
            return console.log(err);
        }
        return console.log('Comment Saved');
    };

    var postComment = function(phraseId, comment) {
        console.log('Posting comment ' + comment + ' to ' + phraseId);
        var cComment = new Comment({
            phraseId: phraseId,
            added: new Date(),
            text: comment
        });
        cComment.save(postCallback);
        return cComment;
    };
    
    var findAll = function(phraseId, callback) {
        console.log('Getting all comments');
        Comment.find({phraseId: phraseId}, callback);
    };

    return {
        postComment: postComment,
        Comment: Comment,
        findAll: findAll
    };
};

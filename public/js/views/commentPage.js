define(['ThankfulForView', 'text!templates/comment.html', 'views/comment', 'models/Comment'],
function(ThankfulForView, commentTemplate, CommentView, Comment) {
    var commentView = ThankfulForView.extend({
        el: $('#content'),
        events: {
            'click div[id=phraseBox]' : 'clear',
            'click input[value=Add]' : 'postComment',
            'keypress div[id=phraseBox]' : 'postCommentEnter'
        },

        initialize: function() {
            this.collection.on('add', this.onCommentAdded, this);
            this.collection.on('reset', this.onCommentAddedReset, this);
        },

        onCommentAddedReset: function(collection) {
            var that = this;
            collection.each(function(model) {
                that.onCommentAdded(model);
            });
            if (collection.length===0) {
                $('.comment_list').append('<strong>No comments. Be the first!</strong>');
            }
        },

        onCommentAdded: function(comment) {
            var commentHtml = (new CommentView({model: comment})).render().el;
            $(commentHtml).prependTo('.comment_list').hide().fadeIn('slow');
        },

        clear: function(e) {
            e.preventDefault();
            var phraseDiv = $('#phraseBox');
            phraseDiv.text('');
            phraseDiv.addClass('visited');
            phraseDiv.focus();
        },

        postComment: function(e) {
            e.preventDefault();
            var phraseDiv = $('#phraseBox');
            var commentText = phraseDiv.text();
            var commentCollection = this.collection;

            if(!phraseDiv.hasClass('visited')) return;
            if(((e.keyCode === 13) && (phraseDiv.text() === ''))) {
                $('#errorMsg').fadeIn('medium');
            }
            if(phraseDiv.text() === '') {
                $('#errorMsg').fadeIn('medium');
            }
            if(commentCollection.length === 0) {
                $('.comment_list').empty();
            }
            var id = window.location.hash.split("/")[1];
            $.post('/comments/' + id, {
                text: commentText
            }, function(data) {
                var content = JSON.parse(data);
                commentCollection.add(new Comment({phraseId: id,
                                                   added: content.added,
                                                   text: content.text}));
                $('#phraseBox').text('');
                $('#errorMsg').fadeOut('medium');
            });
            return false;
        },

        postCommentEnter: function(e) {
            if(e.keyCode != 13) return;
            this.postComment(e);
        },

        render: function() {
            this.$el.html(commentTemplate);
            $('#preContent').slideUp('medium');
            return this;
        }
    });

    return commentView;
});
            

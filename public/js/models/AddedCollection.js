define(['models/Added'], function(Added) {
    var AddedCollection = Backbone.Collection.extend({
        model: Added
    });
    return AddedCollection;
});

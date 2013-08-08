define(function(require) {
    var Phrase = Backbone.Model.extend({
        urlRoot: '/phrases'
    });
    return Phrase;
});

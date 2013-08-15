define(['router'], function(router) {
    var initialize = function() {
        runApplication();
    };

    var runApplication = function() {
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});

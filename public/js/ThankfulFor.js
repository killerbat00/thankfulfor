define(['router'], function(router) {
    var initialize = function() {
        runApplication();
    };

    var runApplication = function() {
        $('body').css('overflow', 'hidden');
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});

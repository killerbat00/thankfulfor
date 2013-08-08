require.config({

    paths: {
        jQuery: '/js/libs/jquery',
        Underscore: '/js/libs/underscore',
        Backbone: '/js/libs/backbone',
        models: 'models',
        text: '/js/libs/text',
        templates: '../templates',
        ThankfulForView: '/js/ThankfulForView'
    },

    shim: {
        'Backbone': ['Underscore', 'jQuery'],
        'ThankfulFor': ['Backbone']
    }
});

require(['ThankfulFor'], function(ThankfulFor) {
    ThankfulFor.initialize();
});


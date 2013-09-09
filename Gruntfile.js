module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            server: {
                src: ['models/Comment.js', 'models/Phrase.js', 'server.js']
            },
            client: {
                src: ['public/js/*.js', 'public/js/models/*.js', 'public/js/views/*.js']
            }
        },
        requirejs: {
            compile: {
            options: {
                appDir: "public/",
                baseUrl: "js",
                dir: "build",
                modules: [
                    {
                        name: 'boot'
                    }
                ],
                paths: {
                    "Underscore": "libs/underscore",
                    "jQuery" : "libs/jquery",
                    "Backbone": "libs/backbone",
                    "text": "libs/text"
                },
                shim: {
                    'Backbone': ['Underscore', 'jQuery'],
                    'ThankfulFor': ['Backbone']
                },
                keepBuildDir: true
            }
        }
        },
        uglify: {
            options: {
                compress: true
            }
        }
                
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint:server', 'jshint:client']);
    grunt.registerTask('build', 'requirejs');
    grunt.registerTask('ugly', 'uglify');
};

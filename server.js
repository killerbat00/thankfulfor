#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var http    = require('http');
var fs      = require('fs');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var dbPath = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/thankfulfor';


/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_INTERNAL_IP;
        self.port      = process.env.OPENSHIFT_INTERNAL_PORT || "8080";

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_INTERNAL_IP var, using 0.0.0.0');
            self.ipaddress = "0.0.0.0";
        };
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.jade': '' };
        }

        //  Local cache for static content.
        self.zcache['index.jade'] = fs.readFileSync('./views/index.jade');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };

    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express();
        var models = {
            Phrase: require('./models/Phrase')(self.app, mongoose, mongodb),
            Comment: require('./models/Comment')(self.app, mongoose)
        };
        self.app.configure(function() {
            self.app.set('view engine', 'jade');
            self.app.use(express.static(__dirname + '/public'));
            self.app.use(express.bodyParser());
            self.app.use(express.cookieParser());
            mongoose.connect(dbPath, function onMongooseError(err) {
                if (err) throw err;
            });
        });
        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        };
        self.app.get('/', function(req, res) {
            res.render('index.jade');
        });

        self.app.post('/phrases', function(req, res) {
            var phrase = req.param('phrase', null);
            if (null == phrase || phrase.length < 1) {
                res.send(400);
                return;
            }
            var sPhrase = models.Phrase.postPhrase(phrase);
            var fPhrase = JSON.stringify(sPhrase);
            //JSONstringify to allow for immediate use.
            res.send(fPhrase);
        });

        self.app.get('/comments/:id', function(req, res) {
            var id = req.params.id;
            models.Comment.findAll(id, function onDone(err, comments) {
                if (err) {
                    res.send(404);
                } else {
                    res.send(comments);
                }
            });
        });

        self.app.post('/comments/:id', function(req, res) {
            var comment = req.param('text', null);
            var id = req.params.id;
            if (null == comment || comment.length < 1) {
                res.send(400);
                return;
            } 
            var cComment = models.Comment.postComment(id, comment);
            models.Phrase.updateComments(id);
            res.send(JSON.stringify(cComment));
        });

        self.app.get('/phrases', function(req, res) {
            models.Phrase.findAll(function onDone(err, phrases) {
                if (err) {
                    res.send(404);
                } else {
                    res.send(phrases);
                }
            });
        });
        self.app.get('/phrases/:id', function(req, res) {
            models.Phrase.findById(req.params.id, function onDone(err, phrase) {
                if (err || !phrase) {
                    res.send(404);
                } else {
                    res.send(phrase);
                }
            });
        });
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();


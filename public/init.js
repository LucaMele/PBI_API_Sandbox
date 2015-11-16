/**
 * Created by lmele on 27.10.2015.
 */
require.config({
    deps: [
        'main'
    ],
    paths : {
        backbone: 'lib/backbone/backbone',
        app: '../modules/app',
        jquery: 'lib/jquery/dist/jquery',
        underscore: 'lib/underscore/underscore',
        marionette: 'lib/backbone.marionette/lib/backbone.marionette',
    },
    shim : {
        Backbone: {
            deps: ['underscore'],
            exports: 'backbone'
        },
        Marionette: {
            deps: ['backbone', 'underscore', 'jquery'],
            exports: 'marionette'
        },
        underscore: {
            exports: '_'
        },
        app: {
            deps: ['backbone', 'underscore', 'jquery'],
            exports: 'app'
        }
    },
    map : {
        // 'modules/content.course' : 'core/course'
    }
});

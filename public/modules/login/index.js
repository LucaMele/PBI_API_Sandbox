/**
 * Created by lmele on 26.10.2015.
 */

define([
    'backbone',
    'marionette',
    'underscore',
    'app',
    'modules/storage/index'
], function (Backbone, Marionette, _, App, Storage, Adal) {

    "use strict";

    var Login = App.module('Login');

    var CLIENT_ID = 'd5757c3d-32b5-419c-b770-3d81560005a8';

    Login.Controller = Marionette.Controller.extend({
        initialize: function() {
            this.apiReqCode = 'https://login.windows.net/common/oauth2/authorize' +
                '?response_type=code'+
                '&client_id='+ CLIENT_ID +
                '&resource=https://analysis.windows.net/powerbi/api'+
                '&redirect_uri= '+ window.location.href + '/token';
        },
        index: function() {
            if (Storage.getObject('code')) {
                App.trigger('api:login', Storage.getObject('code'));
                return;
            }
            this.login();
        },
        login: function() {
            if (_.isUndefined(this.loginWindow) &&
                !~window.location.href.indexOf('&session_state')) {
                this.setupView();
                this.openWindow(this.apiReqCode);
            }
            App.major.show(new this.loginView());
        },
        setupView: function() {
            this.loginView = Marionette.ItemView.extend({
                model: new Backbone.Model({
                    auth: ''
                }),
                template: "login/index.html",
                modelEvents: {
                    "change": "modelChanged"
                },
                modelChanged: function() {
                    this.render();
                }
            });
        },
        /*grantAccess: function(code) {
            this.token = new Login.token({
                grant_type: 'authorization_code',
                client_id: 'd5757c3d-32b5-419c-b770-3d81560005a8',
                client_secret: 'wEmd7jkTbBHmN/0VvI/4kXA/675cyHe0Mb8mgfHho1Q=',
                redirect_uri: window.location.href,
                code: code,
            });
            this.token.save();


            // App.trigger('api:login', Storage.getObject('auth'));
        },*/
        openWindow: function (req) {
            this.loginWindow = window.open(
                req,
                "_blank",
                "toolbar=yes," +
                " scrollbars=yes, " +
                "resizable=yes, " +
                "top=100," +
                " left=100," +
                " width=800," +
                " height=600");
        }
    });
    return Login;
});

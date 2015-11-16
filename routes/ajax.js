
var express = require('express');
var router = express.Router();
var passport = require('passport-azure-oauth');


router.get("/token", function(req, res){
	var code = req.query.code;

	console.log(code);
    passport.use(new AzureOAuthStrategy({
		    clientId    : 'd5757c3d-32b5-419c-b770-3d81560005a8',
		    clientSecret: 'wEmd7jkTbBHmN/0VvI/4kXA/675cyHe0Mb8mgfHho1Q=',
		    resource    : 'https://analysis.windows.net/powerbi/api',
		    redirectURL : 'http://power-bi-sandbox.azurewebsites.net/',
		    grant_type  : 'authorization_code',
		    code: code
		},
		function(accessToken, refreshToken, profile, done) {	    
		    res.format({
		        'application/json': function(){
		            res.send(user);
		        }
		    });
	    	return done(err, user);
		}
	));
});


module.exports = router;
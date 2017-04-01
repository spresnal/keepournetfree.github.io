var twitterScheduler = (function (baseScheduler) {
    var filePath = __dirname+"/tweets.js",
        authKeys = require('./twitterkeys');

    twitterScheduler.run = function() {
        
    };

    baseScheduler.initialize(filePath, authKeys);

	return twitterScheduler;
}(baseScheduler));
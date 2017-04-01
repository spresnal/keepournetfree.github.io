var baseScheduler = (function (baseScheduler) {
    var fileAccess = requre('fs'),
        oAuth = require('oauth').OAuth, 
        filePath,
        authKeys,
        posts;

    baseScheduler.initialize = function(filePath, authKeys){
        this.filePath = filePath;
        this.authKeys = authKeys;
    };

    baseScheduler.fileExists = function(){
        if(!fs.existsSync(filePath)) return;
        console.log("Please specify the filePath to use for this scheduler...");
    };

    baseScheduler.watchFile = function(){
        fileAccess.watchFile(filePath, function(curr, prev) {
            console.log(curr);
            console.log(prev);
            // if (err) throw err;
            // posts = JSON.parse(data);
        });
    };

    baseScheduler.schedulePost = function(timeStamp, text) {
        if(!baseScheduler.fileExists()) return;

        var post = {
            timeStamp: timeStamp,
            text: text
        };

        posts.push(post);

        fileAccess.writeFile(filePath, JSON.stringify(posts), function(err) {
            if(err) throw err;
            console.log("File Saved...");
        });
    };

    baseScheduler.run = function() {
        if(!filePath || !authkeys){
            console.log("filePath and/or authKeys were not initialized...");
            return;
        }

        baseScheduler.watchFile();

    };

	return baseScheduler;
}(baseScheduler || {}));
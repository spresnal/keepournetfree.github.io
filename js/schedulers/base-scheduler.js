function BaseScheduler(filePath, authKeys){
    this._fileSystem = require('fs');
    this._oAuth = require('oauth').OAuth;
    this._filePath = filePath;
    this._authkeys = authKeys;
    this._posts = [];
}

BaseScheduler.prototype.fileExists = function(){
    console.log(this._filePath);
    return this._fileSystem.existsSync(this._filePath);
};

BaseScheduler.prototype.openCreateFile = function(){
    if(this.fileExists()) return;
    this._fileSystem.writeFile(this._filePath, '', function(err, data){
        console.log(err);
        console.log(data);
    });
};

BaseScheduler.prototype.watchFile = function(){
    this._fileSystem.watchFile(this._filePath, function(curr, prev) {
        console.log(curr);
        console.log(prev);
        // if (err) throw err;
        // posts = JSON.parse(data);
    });  
};

BaseScheduler.prototype.schedulePost = function(timeStamp, text) {
    if(!this.fileExists()) return;

    var post = {
        timeStamp: timeStamp,
        text: text
    };

    this._posts.push(post);

    this._fileSystem.writeFile(this._filePath, JSON.stringify(this._posts), function(err) {
        if(err) throw err;
        console.log("File Saved...");
    });
};

BaseScheduler.prototype.sendPosts = function(postsToSend){
    postsToSend.forEach(function(postToSend){
        console.log('Sending Post: ' + postToSend.text);
        console.log('Time: ' + postToSend.timeStamp);
        console.log('----------------------------------');
    });
};

BaseScheduler.prototype.getPostsToBeSent = function(){
    var postsToSend = [];

    this._posts.forEach(function(post){
        if(new Date(post.timeStamp) > new Date()){
            postsToSend.push(post);
        }
    });

    return postsToSend;
};

BaseScheduler.prototype.run = function() {
    if(!this._filePath || !this._authKeys){
        console.log("filePath and/or authKeys are not set...");
        return;
    }

    this.openCreateFile();
    this.watchFile();
    while(true){
        var postsToBeSent = this.getPostsToBeSent();
        if(postsToBeSent.length)
            this.sendPosts(postsToBeSent);
    }
};

module.exports = BaseScheduler;
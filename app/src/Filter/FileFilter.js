var crypto = require('crypto');
var paths = require('rpg-node-mvc').paths;
var multer = require('multer');

var storage_config = {
    destination:paths.TMP_FILES,
    filename:function(req,file,cb){
        crypto.randomBytes(15,function(ex,buf){
            cb(null,buf.toString('hex')+'.tmp');
        });
    }
};

module.exports = multer({
    storage:multer.diskStorage(storage_config)
}).any();



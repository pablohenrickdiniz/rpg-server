var paths = require('rpg-node-mvc').paths;
var fs = require('fs');
var deepmerge = require('deepmerge');
var File = require('rpg-node-mvc/config/file');
module.exports = {
    exts: {
        'image/png': 'png',
        'image/jpeg': 'jpg',
        'image/jpg': 'jpg',
        'image/gif': 'gif'
    },
    defaults:{
        dir:paths.TMP_FILES+'/images',
        prefix:''
    },
    createImage:function(file,config,callback){
        var self = this;
        if(config.name != undefined && self.exts[file.mimetype] != undefined){
            var ext = self.exts[file.mimetype];
            config = deepmerge(this.defaults,config);
            var name = config.name;
            var newPath = config.dir+'/'+name+'.'+ext;
            if(!File.exists(config.dir)){
                fs.mkdir(config.dir);
            }
            fs.rename(file.path,newPath,function(err){
                callback(!err);
            });
        }
        else{
            callback(false);
        }
    }
};
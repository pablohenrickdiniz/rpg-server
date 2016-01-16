/**
 * Created by pablo on 12/01/16.
 */
var paths = require('rpg-node-mvc').paths;
var fileFilter = require(paths.APP_FILTER+'/FileFilter');
var ImageComponent = require(paths.APP_COMPONENT+'/ImageComponent');
var crypto = require('crypto');

module.exports = {
    __constructor:function(){
        var self = this;
        self.name = 'animations';
        self.modelName = 'Animation'
    },
    methods:{
        /**
         * @Method("upload");
         * @RequestMethod("POST");
         */
        upload:[fileFilter,function(req,res,next){
            var files = req.files;
            if(files[0] != undefined){
                var name = crypto.randomBytes(20).toString('hex');
                var result = [];
                ImageComponent.createImage(files[0],{
                    name:name,
                    dir:paths.WWW_ROOT+'/animations'
                },function(created){
                    res.end(JSON.stringify({
                        success:created
                    }));
                });
            }
            else{
                res.end(JSON.stringify({
                    success:false
                }));
            }
        }]
    }
};

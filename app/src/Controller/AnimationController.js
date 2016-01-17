/**
 * Created by pablo on 12/01/16.
 */
var paths = require('rpg-node-mvc').paths;
var fileFilter = require(paths.APP_FILTER+'/FileFilter');
var ImageComponent = require(paths.APP_COMPONENT+'/ImageComponent');
var crypto = require('crypto');
var fs = require('fs');

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
            var self = this;
            if(files[0] != undefined){
                var name = crypto.randomBytes(20).toString('hex');
                var result = [];
                ImageComponent.createImage(files[0],{
                    name:name,
                    dir:paths.WWW_ROOT+'/animations'
                },function(created,path){
                    if(created){
                        self.Animation.save({
                            file:path,
                            width:req.body.width,
                            height:req.body.height
                        },function(err,doc){
                            if(err){
                                res.end(JSON.stringify({
                                    errors:err,
                                    success:false
                                }));
                            }
                            else{
                                res.end(JSON.stringify({
                                    success:true,
                                    id:doc._id
                                }));
                            }
                        });
                    }
                });
            }
            else{
                res.end(JSON.stringify({
                    success:false
                }));
            }
        }],
        /**
         * @Method("getFile");
         * @RequestMethod("GET");
         * @Uri("/file/:name");
         */
        getFile:function(req,res,next){
            var name = req.params.name;
            var dir = paths.WWW_ROOT+'/animations';
            var filePath = dir+'/'+name;
            var stat = fs.statSync(filePath);
            res.writeHead(200, {
                'Content-Type': 'application/octet-stream',
                'Content-Length': stat.size
            });
            var readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
        },
        /**
         * @Method("list");
         * @RequestMethod("GET");
         *
         */
        list:function(req,res,next){
            var self = this;
            self.Animation.count({},function(err,c){
                if(err){
                    self.json({
                        success:false,
                        errors:err
                    });
                    res.end();
                }
                else{
                    var page = req.query.page | 1;
                    self.Animation.paginate({}, {page:page,limit:8,sort:{created:'desc'}}).then(function(result){
                        res.json({
                            success:true,
                            count:c,
                            animations:result.docs
                        });
                        res.end();
                    });
                }
            });
        },
        /**
         * @Method("delete");
         * @RequestMethod("DELETE");
         */
        delete:function(req,res,next){
            var id = req.query.id;
            var self = this;
            self.Animation.findOne({_id:id},function(err,doc){
                if(err || !doc){
                    self.endJson({
                        success:true
                    });
                }
                else{
                    self.Animation.remove({_id:id},function(err){
                        if(err){
                            self.endJson({
                                success:false
                            });
                        }
                        else{
                            fs.unlink(paths.WWW_ROOT+'/animations/'+doc.file,function(err){
                                self.endJson({
                                    success:true
                                });
                            });
                        }
                    });
                }
            });
        }
    }
};

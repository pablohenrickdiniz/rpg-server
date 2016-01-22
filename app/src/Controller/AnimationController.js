/**
 * Created by pablo on 12/01/16.
 */
var paths = require('rpg-node-mvc').paths;
var path = require('path');
var fileFilter = require(path.join(paths('filters'),'FileFilter'));
var ImageComponent = require(path.join(paths('components'),'ImageComponent'));
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
                    dir:path.join(paths('webroot'),'animations')
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
                                    animation:doc
                                }));
                            }
                        });
                    }
                    else{
                        res.end(JSON.stringify({
                            success:false
                        }));
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
         * @Method("list");
         * @RequestMethod("GET");
         *
         */
        list:function(req,res,next){
            var self = this;
            self.Animation.count({},function(err,c){
                if(err){
                    self.endJson({
                        success:false,
                        errors:err
                    });
                }
                else{
                    var conditions = {
                        sort:{created:'desc'}
                    };

                    var limit = req.query.limit | null;
                    var page = req.query.page | null;


                    conditions.limit = limit?limit:c;

                    if(page){
                        conditions.page = page;
                    }


                    self.Animation.paginate({}, conditions).then(function(result){
                        self.endJson({
                            success:true,
                            count:c,
                            animations:result.docs
                        });
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
                            fs.unlink(path.join(paths('webroot'),'animations',doc.file),function(err){
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

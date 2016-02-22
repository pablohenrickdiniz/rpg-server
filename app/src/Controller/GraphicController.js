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
        self.name = 'graphics';
        self.modelName = 'Graphic'
    },
    methods:{
        /**
         * @Method("upload");
         * @RequestMethod("POST");
         */
        upload:[fileFilter,function(req,res,next){
            var files = req.files;
            var self = this;
            var type = req.query.type;
            if(files[0] != undefined && type !== undefined){
                var name = crypto.randomBytes(20).toString('hex');
                var result = [];
                ImageComponent.createImage(files[0],{
                    name:name,
                    dir:path.join(paths('webroot'),'graphics',type)
                },function(created,path){
                    if(created){
                        self.Graphic.save({
                            file:path,
                            width:req.body.width,
                            height:req.body.height,
                            type:type,
                            created:Date.now()
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
                                    doc:doc,
                                    type:type
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

            var type = req.query.type;
            var conditions = {};
            if(type !== undefined){
                conditions.type = type;
            }

            self.Graphic.count(conditions,function(err,c){
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

                    if(type !== undefined){
                        conditions.type = type;
                    }

                    self.Graphic.paginate({}, conditions).then(function(result){
                        self.endJson({
                            success:true,
                            count:c,
                            graphics:result.docs
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
            id = [].concat(id);

            var self = this;
            self.Graphic.find({_id:{$in:id}},function(err,docs){
                if(err || docs.length == 0){
                    self.endJson({
                        success:true
                    });
                }
                else{
                    self.Graphic.remove({_id:{$in:id}},function(err){
                        if(err){
                            self.endJson({
                                success:false
                            });
                        }
                        else{
                            var callback = function(docs){
                                if(docs.length > 0){
                                    var doc = docs.pop();
                                    fs.unlink(path.join(paths('webroot'),doc.type,doc.file),function(err){
                                        callback(docs);
                                    });
                                }
                                else{
                                    self.endJson({
                                        success:true
                                    });
                                }
                            };
                            callback(docs);
                        }
                    });
                }
            });
        }
    }
};

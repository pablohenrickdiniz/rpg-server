/**
 * Created by pablo on 12/01/16.
 */

module.exports = {
    __constructor:function(){
        var self = this;
        self.name = 'animations';
        self.modelName = 'Animation'
    },
    methods:{
        /**
         * @Method("list");
         * @RequestMethod("GET");
         *
         */
        list:function(req,res,next){
            var self = this;
            var conditions = {};
            self.Animation.count(conditions,function(err,c){
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
            id = [].concat(id);
            var self = this;
            self.Animation.remove({_id:{$in:id}},function(err){
                self.endJson({success:!err});
            });
        }
    }
};

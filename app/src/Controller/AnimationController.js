/**
 * Created by pablo on 12/01/16.
 */
var paths = require('rpg-node-mvc').paths;
var fileFilter = require(paths.APP_FILTER+'/FileFilter');


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
            console.log(files);
            res.end(JSON.stringify({
                success:true
            }));
        }]
    }
};

module.exports = {
    __constructor:function(){
        var self = this;
        self.name = 'users';
        self.modelName = 'User';
    },
    methods:{
        /**
         * @Method("setup");
         * @RequestMethod("GET");
         * @ContentType("application/json")
         *
         */
        setup:function(){
            var self = this;
            self.User.save({
                username:'phydokz',
                password:'123teste',
                role:'admin',
                'profile.email':'phydokz@hotmail.com',
                'profile.fullname':"Pablo Henrick Diniz",
                'profile.birthdate':Date.now()
            },function(err){
                if(err){
                    self.end(JSON.stringify(err));
                }
                else{
                    self.end(JSON.stringify({success:true}));
                }
            });
        },
        /**
         * @Method("add");
         * @RequestMethod("POST");
         * @Uri("/");
         * @ContentType("application/json")
         */
        add:function(){
            var self = this;
            self.User.save(self.request.body,function(err){
                if(err){
                    self.response.end(JSON.stringify(err));
                }
                else{
                    self.response.end(JSON.stringify({success:true}));
                }
            });
        },
        /**
         * @Method("delete");
         * @RequestMethod("GET");
         * @RequestMethod("DELETE");
         * @ContentType("application/json");
         * @Uri("/");
         */
        delete:function(){
            var self  = this;
            self.User.remove({},function(err){
                if(err){
                    self.end(JSON.stringify(err));
                }
                else{
                    self.end(JSON.stringify({success:true}));
                }
            });
        },
        /**
         * @Method("list");
         * @RequestMethod("GET");
         * @ContentType("application/json")
         */
        list:function(){
            var self = this;
            self.User.find({role:'admin'},function(err,result){
                if(err){
                    self.end(JSON.stringify([]));
                }
                else{
                    self.end(JSON.stringify(result));
                }
            });
        },
        /**
         * @Method("login");
         * @RequestMethod("POST");
         * @ContentType("application/json")
         */
        login:function(){

        }
    }
};


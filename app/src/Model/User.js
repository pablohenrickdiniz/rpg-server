var crypto = require('crypto');
var Schema = require('mongoose').Schema;
var bcrypt = require('bcrypt');
var defaultModel = require('node-mvc/Model/Model');
var deepmerge = require('deepmerge');

var User = {
    name : 'User',
    _messages : {
        username:{
            required:"O nome de usuário não pode ser vazio",
            unique:"Esse nome de usuário não está disponível"
        },
        password:{
            required:"A senha deve ser informada",
            length:"A senha deve possuir no mínimo 6 caracteres"
        },
        role:{
            required:"Você não possui nenhum papel definido!"
        },
        'profile.email':{
            required:"O email deve ser informado",
            email:"Esse endereço de email é inválido",
            unique:"Esse endereço de email já está sendo usado"
        },
        'profile.fullname':{
            required:"Você deve informar seu nome completo!"
        },
        'profile.birthdate':{
            required:"A data de nascimento é obrigatória"
        }
    },
    _schema : {
        username:{
            type:String,
            required:true,
            index:{unique:true},
            trim:true
        },
        password:{
            type:String,
            required:true,
            length: {
                minimun: 6
            },
            set:function(password){
                return bcrypt.hashSync(password,10);
            }
        },
        recoverCode:{
            type:String,
            trim:true,
            unique:true,
            default:function(){
                return  crypto.randomBytes(20).toString('hex');
            }
        },
        active:{
            type:Boolean,
            required:false,
            default:false
        },
        role:{
            type:String,
            required:true,
            default:'user'
        },
        profile:{
            email:{
                type:String,
                required:true,
                index:{unique:true},
                trim:true,
                match:[/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,'Esse endereço de email é inválido']
            },
            fullname:{
                type:String,
                required:true,
                trim:true
            },
            birthdate:{
                type:Date,
                required:true
            }
        }
    }
};

User = deepmerge(defaultModel,User);

module.exports = User;
var defaultModel = require('rpg-node-mvc').Model;
var deepmerge = require('deepmerge');

var Animation = {
    name : 'Animation',
    _messages : {
        file:{
            required:'A imagem deve ser enviada!'
        },
        width:{
            required:'A largura deve ser informada!'
        },
        height:{
            required:'A altura deve ser informada!'
        }
    },
    _schema : {
        file:{
            type:String,
            required:true,
            trim:true
        },
        width:{
            type:Number,
            required:true,
            default:0
        },
        height:{
            type:Number,
            required:true,
            default:0
        },
        created:{
            type:Date,
            required:true,
            default:Date.now
        }
    }
};

Animation = deepmerge(defaultModel,Animation);
module.exports = Animation;
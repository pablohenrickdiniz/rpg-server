var defaultModel = require('rpg-node-mvc').Model;
var deepmerge = require('deepmerge');

var Tileset = {
    name : 'Tileset',
    _messages : {
        file:{
            required:'A imagem deve ser enviada!'
        },
        width:{
            required:'A largura deve ser informada!',
            Number:'valor inválido para largura'
        },
        height:{
            required:'A altura deve ser informada!',
            Number:'valor inválido para altura'
        },
        created:{
            Date:'Essa data é inválida'
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
    },
    defaultConnection:'rpgbuilder'
};

Tileset = deepmerge(defaultModel,Tileset);
module.exports = Tileset;
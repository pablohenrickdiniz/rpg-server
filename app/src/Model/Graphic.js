var defaultModel = require('rpg-node-mvc').Model;
var deepmerge = require('deepmerge');

var Graphic = {
    name : 'Graphic',
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
        type:{
            required:'O tipo do grafíco deve ser informado!',
            String:'Esse nome não é válido!'
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
        type:{
            type:String,
            required:true,
            trim:true
        },
        created:{
            type:Date,
            required:true,
            default:Date.now
        }
    },
    _virtual:{
        url:{}
    },
    defaultConnection:'rpgbuilder'
};

Graphic = deepmerge(defaultModel,Graphic);
module.exports = Graphic;
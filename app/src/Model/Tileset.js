var defaultModel = require('rpg-node-mvc').Model;
var deepmerge = require('deepmerge');

var Tileset = {
    name : 'User',
    _messages : {
        image:{
            required:'A imagem deve ser enviada!'
        },
        'grid.width':{
            min:'A largura mínima deve ser de 16px'
        },
        'grid.height':{
            min:'A altura mínima deve ser de 16px'
        }
    },
    _schema : {
        image:{
            type:String,
            required:true,
            trim:true
        },
        grid:{
            width:{
                required:true,
                type:Number,
                min:16,
                default:32
            },
            height:{
                type:Number,
                min:16,
                default:32
            }
        }
    },
    defaultConnection:'rpgbuilder'
};

Tileset = deepmerge(defaultModel,Tileset);
module.exports = Tileset;
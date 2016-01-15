var defaultModel = require('rpg-node-mvc').Model;
var deepmerge = require('deepmerge');

var Animation = {
    name : 'Animation',
    _messages : {
        file:{
            required:'A imagem deve ser enviada!'
        }
    },
    _schema : {
        file:{
            type:String,
            required:true,
            trim:true
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
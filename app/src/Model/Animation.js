var defaultModel = require('rpg-node-mvc').Model;
var deepmerge = require('deepmerge');
var Schema = require('mongoose').Schema;

var Animation = {
    name : 'Animation',
    _messages : {
        speed:{
            required:'A velocidade deve ser informada'
        }
    },
    _schema : {
       graphics:[String],
       frames:[Schema.Types.Mixed],
       speed:{
           type:Number,
           required:true,
           default:15
       },
       created:{
           type:Date,
           required:true,
           default:Date.now
       }
    },
    defaultConnection:'rpgbuilder'
};

Animation = deepmerge(defaultModel,Animation);
module.exports = Animation;
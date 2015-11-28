module.exports = {
    defaultFolder:'/uploads',
    getUploadModule:function(config){

    },
    getExtension:function(fileName){
        var index = fileName.lastIndexOf('.');
        var ext = 'tmp';
        if(index != -1){
            ext = fileName.substring(index+1,fileName.length);
        }
        return ext;
    }
};
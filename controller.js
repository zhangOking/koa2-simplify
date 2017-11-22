const fs = require('fs');// 先导入fs模块，然后用readdirSync列出文件

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

//查找controllers文件夹中的所有js文件，格式化路径
function addControllers(router) {
    var files = fs.readdirSync(__dirname + '/controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    console.log(js_files,'------js_file当前所有以.js结尾的文件')
    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        console.log(__dirname,'------__dirname')
        console.log(mapping,'------mapping')
        addMapping(router, mapping);
    }
}




module.exports = function(dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();//使用koa-router来处理url
    addControllers(router, controllers_dir);
    return router.routes();
}
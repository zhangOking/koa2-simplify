'use strict';

//koa2用class，用大写的Koa表示
const Koa = require('koa');

//使用koa-bodyparser来处理post请求的解析
const bodyParser = require('koa-bodyparser');

// 导入controller middleware:
const controller = require('./controller');

// 创建一个Koa对象表示web app本身
const app = new Koa();

//必须在router之前注册到app对象上
app.use(bodyParser());
// 使用middleware:
app.use(controller());



//监听5568端口
app.listen(5568);
console.log(`app-----5568`);
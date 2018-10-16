//入口文件

//1导包 
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');


//2app对象
const app = express();

app.engine('html',require('express-art-template'));

app.use('/node_modules',express.static('./node_modules'));
app.use('/public',express.static('./public'));

app.use(bodyParser.urlencoded({
    extended: false
}));


// 3监听请求

app.use(router);
//4 监听端口
app.listen(12345,()=>{
    console.log('端口监听')
})
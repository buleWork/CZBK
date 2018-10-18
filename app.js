//入口文件

//1导包 
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const session = require('express-session');

const MySQLStore =require('express-mysql-session')(session);

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'news'
};
const sessionStore = new MySQLStore(options);



//2app对象
const app = express();

app.engine('html',require('express-art-template'));

app.use('/node_modules',express.static('./node_modules'));
app.use('/public',express.static('./public'));

app.use(bodyParser.urlencoded({
    extended: false
}));
//配置express-mysql-session包
app.use(session({
    key:'session_cookie_name',
    secret:'session_cookie_secret',
    stroe:sessionStore,
    resave:false,
    saveUninitialized:false
    
}));
9
// 3监听请求

app.use(router);
//4 监听端口
app.listen(12345,()=>{
    console.log('端口监听')
})
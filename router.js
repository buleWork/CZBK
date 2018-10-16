//1导包
const express = require('express');
// 导入控制器文件
const c_user = require('./controllers/c_user');
const c_topic = require('./controllers/c_topic');

const router = express.Router();


// 3监听请求

// 渲染登录页的请求
router.get('/signin', c_user.showSignin);
// 监听登录的表单请求
router.post('/signin', c_user.handleSignin),
 // 渲染话题页
 router.get('/', c_topic.showTopic);
module.exports= router;
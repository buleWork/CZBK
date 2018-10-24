//1导包
const express = require('express');
// 导入控制器文件
const c_user = require('./controllers/c_user');
const c_topic = require('./controllers/c_topic');

const router = express.Router();


// 3监听请求

// 渲染登录页的请求
// router.get('/signin', c_user.showSignin);
// 监听登录的表单请求
// router.post('/signin', c_user.handleSignin),
//  // 渲染话题页
//  router.get('/', c_topic.showTopic);
router
    .get('/signin', c_user.showSignin)
    .post('/signin', c_user.handleSignin)
    .get('/', c_topic.showTopic)
    .get('/topic/create', c_topic.createTopic)
    .post('/createTopic',c_topic.handleCreateTopic)
    .get('/signout', c_user.handleSignout)
 // 动态路由   router.get('/固定标识/:参数名')
    .get('/topic/:topicID',c_topic.showDetail)

    .get('/topic/:topicID/edit', c_topic.showEdit)
    .post('/editTopic/:topicID', c_topic.handleEditTopic)
    .get('/topic/:topicID/delete', c_topic.deleteTopic)

    .get('/signup',c_user.showSignup)
    .post('/signup',c_user.handleSignup)
    
module.exports= router;
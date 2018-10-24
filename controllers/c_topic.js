
 const m_topic = require('../models/m_topic');
 const moment = require('moment');



exports.showTopic = (req, res) => {
    // res.render('index.html')
    m_topic.findAllTopic((err, data) => {
        if (err) {
            return res.send({
                code: 500,
                message: '服务器错啦 好开心'
            });
        }
        // console.log(data);

        // data 类型 是数组
        // res.render(V,M)

        // 如果用户登录成功, 把用户信息进行传递 在header.html使用
        res.render('index.html', {
            topics: data,
            user: req.session.user

        });

    });
};

// 发布新话题
 exports.createTopic = (req,res) =>{
    res.render('topic/create.html');
 }


 exports.handleCreateTopic = (req,res) =>{
    const body = req.body;

    body.createdAt = moment().format();

    body.userId = req.session.user.id;
    
    m_topic.addTopic(body,(err,data)=>{
        if(err){
            return res.send({
                code:500,
                message:'服务器错误'
            });
        }

        res.send({
            code:200,
            message:'发布新话题成功'
        });
    })
 }
// 渲染话题详情页
 exports.showDetail = (req, res) => {

    const topicID = req.params.topicID;
    // 根据当前话题的id值 topicID 去数据库中找到话题数据
    // 让模型操作数据库 返回结果 
    m_topic.findTopicByID(topicID, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                message: '服务器又错了'
            })
        }
        // console.log(data);
        res.render('topic/show.html', {
            topic: data[0],
            sessionUserId: req.session.user.id
            // req.session.user.id
        });

    });
 }

// 渲染话题编辑页面
exports.showEdit = (req,res) => {
    const topicID = req.params.topicID;

    m_topic.findTopicByID(topicID,(err,data) => {
        if(err){
            return res.send({
                code:500,
                massage:'服务器错啦，好开心'
            })
        }
        res.render('topic/edit.html',{topic:data[0]})
    })
}

// 处理编辑页面的表单请求

exports.handleEditTopic = (req,res) => {
    const body = req.body;
    const topicID = req.params.topicID;

    m_topic.updateTopicByID(topicID, body, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                err: '服务器错误'
            })
        }
        res.send({
            code: 200,
            message: '编辑成功'
        })
    })
}

// 删除话题
exports.deleteTopic = (req,res) => {
    const topicID = req.params.topicID;

    m_topic.deleteTopicByID(topicID,(err,data)=>{
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            })
        }
        res.send({
            code: 200,
            message: '删除成功'
        })

    })
}
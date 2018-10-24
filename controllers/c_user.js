
// 导入m_user.js
const m_user = require('../models/m_use');


const showSignin = (req,res)=>{
    res.render('signin.html');
};

const handleSignin = (req,res) => {
    //1获取表单数据
    const body = req.body;
    //console.log(body);

    m_user.checkEmail(body.email, (err, data) => {
        if (err) {
            // return res.send(err)
            return res.send({
                code: 500,
                message: '服务器错误'
            })
        }
        // 邮箱不存在
        if (!data[0]) {
            console.log('邮箱不存在');

            return res.send({
                code: 1,
                message: '邮箱不存在'
            })
        }
        // 3. 后验证密码
        if (body.password != data[0].password) {
            return res.send({
                code: 2,
                message: '密码错误'
            })
        }


        req.session.user= data[0]
       // console.log(req.session.user)



        res.send({
                code: 200,
                message: '可以跳转了'
            })
            // 4. 跳转到话题列表页
            //  res.redirect('/');
    });

};

//处理用户退出的请求
exports.handleSignout = (req, res) => {
    // 清除session中保存的用户信息
    delete req.session.user;

    // 跳转到用户登录页
    res.redirect('/signin');

};


//渲染注册
exports.showSignup = (req,res) => {
    res.render('signup.html');
}
// 处理注册的表单
exports.handleSignup = (req,res) => {

    const body = req.body;
    m_user.checkEmail(body.email,(err,data) => {
        if(err){
            return res.send({
                code:500,
                message:err.message
            })
        }
        //如果邮箱存在 data[0]
        if(data[0]){
            return res.send({
                code:1,
                message:'邮箱存在，换换'
            })
        }
        //如果邮箱不存在 在验证昵称  body.nickname

        m_user.checkNickname(body.nickname,(err,data) => {
            if(err){
                return res.send({
                    code:500,
                    message:err.message
                })
            }
            //如果昵称存在 data[0]
            if(data[0]){
                return res.send({
                    code:2,
                    message:'昵称存在了，再想一个'
                })
            }

            // 如果邮箱/昵称都不存在 添加新数据

            m_user.addUser(body,(err,data) => {
                if(err){
                    return res.send({
                        code:500,
                        message:err.message
                    })
                }

                res.send({
                    code:200,
                    message:'注册成功'
                })
            })

        })
    })
}

exports.showSignin = showSignin;
exports.handleSignin = handleSignin;

// 导入m_user.js
const m_user = require('../models/m_use');


const showSignin = (req,res)=>{
    res.render('signin.html');
};

const handleSignin = (req,res) => {
    //1获取表单数据
    const body = req.body;
    console.log(body);

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
        res.send({
                code: 200,
                message: '可以跳转了'
            })
            // 4. 跳转到话题列表页
            // res.redirect('/');
    });
    




};



exports.showSignin = showSignin;
exports.handleSignin = handleSignin;
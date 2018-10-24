// 导入db_config.js
 const db = require('../tools/db_config')


 exports.findAllTopic = (callback) => {
     const sqlstr = 'SELECT *FROM `topics` ORDER BY `createdAt` DESC'
     db.query(sqlstr, (err, data) => {

        // 要在c_topic中使用findAllTopic里面query()这个异步操作返回的结果
        // 所以, 通过回调函数的方式将结果以参数的形式进行传递
        if (err) {
            return callback(err, null);
        }
        callback(null, data)

    })

}



exports.addTopic = (body,callback) => {
    const sqlstr = 'INSERT INTO `topics` SET ?';
    db.query(sqlstr,body,(err,data) => {
        if(err){
            return callback(err)
        }
        callback(null,data)
    })
}



exports.findTopicByID = (topicID, callback) =>{
   // ? 用参数topicID 来传
    const sqlstr = 'SELECT *FROM `topics` WHERE id = ?';
    db.query(sqlstr,topicID,(err,data) => {
        if(err){
            return callback(err)
        }
        callback(null,data)
    })
 }

 exports.updateTopicByID = (topicID,body,callback) => {
    const sqlstr = 'UPDATE `topics` SET `title`=?,`content`=? WHERE `id`=?';
    db.query(sqlstr,[body.title,body.content,topicID],(err,data)=>{
        if(err){
            return callback(err)
        }
        callback(null,data);
    })
 }

 exports.deleteTopicByID =(topicID,callback) => {
    const sqlstr = 'DELETE FROM `topics` WHERE `id`=?';
    db.query(sqlstr, topicID, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    })
 }
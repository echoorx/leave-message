wx.cloud.init({
  env: 'leave-a-message-8300cd'
})
const db = wx.cloud.database()
const CommentsCollection = db.collection('Comments')
module.exports = {
  CommentsCollection
}
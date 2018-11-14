wx.cloud.init({
  env: 'leave-a-message-8300cd'
})
const db = wx.cloud.database()
const MsgCollection = db.collection('MsgList')

module.exports = {
  MsgCollection
}
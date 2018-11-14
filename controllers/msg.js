const MsgCollection = require('../model/msg.js').MsgCollection
var app = getApp()
module.exports = {
  //getMsgTotl
  getMsgTotal (data) {
    let query = data || {}
    return MsgCollection.where(query).count()
  },
  // getAllMsg
  getAllMsg (data) {
    let query = {
      limit: data.limit || 5,
      skip: data.page || 1,
      _openid: data.openid || ''
    }
    query.skip = (query.skip - 1) * query.limit
    if(query._openid){
      return MsgCollection.where({ _openid: query._openid }).orderBy('createdAt', 'desc').limit(query.limit).skip(query.skip).get()
    } else {
      return MsgCollection.orderBy('createdAt', 'desc').limit(query.limit).skip(query.skip).get()
    }
  },
  // addMsg
  addMsg (data) {
    return MsgCollection.add({ data })
  },

  // getDetail
  getDetail(id) {
    return MsgCollection.where({_id: id}).get()
  }
}
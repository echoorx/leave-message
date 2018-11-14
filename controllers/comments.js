const CommentsCollection = require('../model/comments.js').CommentsCollection
module.exports = {
  // get comment count
  getCommentsCount(data) {
    return CommentsCollection.where(data).count()
  },

  // get all comments
  getAllComments(data) {
    let query = {
      limit: data.limit || 5,
      skip: data.page || 1,
      msg_id: data.msg_id || ''
    }
    query.skip = (query.skip - 1) * query.limit
    return CommentsCollection.where({ msg_id: query.msg_id }).orderBy('createdAt', 'desc').limit(query.limit).skip(query.skip).get()
  },


  // get my comments



  // del my comments



  // add comment
  addComments(data) {
    return CommentsCollection.add({ data })
  }


}
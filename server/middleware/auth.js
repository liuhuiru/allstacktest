const jwt = require('jsonwebtoken')
const assert = require("http-assert")
const AdminUser = require('../models/AdminUser')
const Researcher = require('../models/Researcher')


module.exports = options => {
  return async (req, res, next) => {
    //权限验证
    const token = String(req.headers.authorization || '').split(' ').pop()
    // console.log(token)
    if (token === 'Bearer') {
      return res.status(401).send({
        message: '请先登录'
      })
    }
    // assert(token, 401, '请先登录')
    const { id } = jwt.verify(token, req.app.get('secret'))
    // console.log(id)
    assert(id, 401, '请先登录')
    req.user = await (AdminUser.findById(id)) || (Researcher.findById(id))
    // console.log(req.user)
    assert(req.user, 401, '请先登录')
    await next()
  }
}
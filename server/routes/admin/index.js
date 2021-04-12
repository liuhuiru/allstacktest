module.exports = app => {

  const express = require('express')
  const router = express.Router()


  const Researcher = require('../../models/Researcher')
  const AdminUser = require('../../models/AdminUser')

  //创建科研人员信息接口
  router.post('/researcher', async (req, res) => {
    const model = await Researcher.create(req.body)
    res.send(model)
  })

  //修改指定id科研人员信息接口
  router.put('/researcher/:id', async (req, res) => {
    const model = await Researcher.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 获取科研人员信息列表接口
  router.get('/researcher', async (req, res) => {
    const items = await Researcher.find()
    res.send(items)
  })

  //根据id获取某个科研人员信息接口
  router.get('/researcher/:id', async (req, res) => {
    const model = await Researcher.findById(req.params.id)
    res.send(model)
  })

  //根据id删除某个科研人员信息接口
  router.delete('/researcher/:id', async (req, res) => {
    await Researcher.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  //创建管理员信息接口
  router.post('/admin_users', async (req, res) => {
    const model = await AdminUser.create(req.body)
    res.send(model)
  })



  //登录接口
  router.post('/login', async (req, res) => {
    const { username, password } = req.body
    //根据用户名找用户
    const AdminUser = require('../../models/AdminUser')
    const user = await AdminUser.findOne({ username }).select('+password')
    if (!user) {
      return res.status(422).send({
        message: '用户不存在'
      })
    }
    //校验密码
    const isVaild = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
  })

  app.use('/admin/api', router)
}
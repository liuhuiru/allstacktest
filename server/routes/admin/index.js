module.exports = app => {

  const express = require('express')
  const router = express.Router()
  const jwt = require('jsonwebtoken')
  const assert = require("http-assert")
  const multer = require('multer')


  const Researcher = require('../../models/Researcher')
  const AdminUser = require('../../models/AdminUser')
  const Project = require('../../models/Project')
  const Paper = require('../../models/Paper')
  const Patent = require('../../models/Patent')
  const Notice = require('../../models/Notice')

  //登录校验中间件
  const authMiddleware = require('../../middleware/auth')

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
  router.get('/researcher', authMiddleware(), async (req, res) => {
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
  //修改指定id管理人员信息接口
  router.put('/admin_users/:id', async (req, res) => {
    const model = await AdminUser.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 获取管理人员信息列表接口
  router.get('/admin_users', async (req, res) => {
    const items = await AdminUser.find()
    res.send(items)
  })

  //根据id获取某个管理人员信息接口
  router.get('/admin_users/:id', async (req, res) => {
    const model = await AdminUser.findById(req.params.id)
    res.send(model)
  })

  //根据id删除某个管理人员信息接口
  router.delete('/admin_users/:id', async (req, res) => {
    await AdminUser.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  //创建项目接口
  router.post('/project', authMiddleware(), async (req, res) => {
    const model = await Project.create(req.body)
    res.send(model)
  })
  //获取项目列表接口
  router.get('/project', async (req, res) => {
    const items = await Project.find()
    res.send(items)
  })
  //获取某个项目信息接口
  router.get('/project/:id', async (req, res) => {
    const model = await Project.findById(req.params.id)
    res.send(model)
  })
  //修改项目接口
  router.put('/project/:id', async (req, res) => {
    const model = await Project.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //删除项目接口
  router.delete('/project/:id', async (req, res) => {
    await Project.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  //创建论文信息接口
  router.post('/paper', authMiddleware(), async (req, res) => {
    const model = await Paper.create(req.body)
    res.send(model)
  })
  //获取论文列表接口
  router.get('/paper', async (req, res) => {
    const items = await Paper.find()
    res.send(items)
  })
  //获取某个论文信息接口
  router.get('/paper/:id', async (req, res) => {
    const model = await Paper.findById(req.params.id)
    res.send(model)
  })
  //修改论文接口
  router.put('/paper/:id', async (req, res) => {
    const model = await Paper.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //删除论文接口
  router.delete('/paper/:id', async (req, res) => {
    await Paper.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  //*********************************************************************** */
  //创建专利
  router.post('/patent', authMiddleware(), async (req, res) => {
    const model = await Patent.create(req.body)
    res.send(model)
  })
  //获取专利列表
  router.get('/patent', authMiddleware(), async (req, res) => {
    const items = await Patent.find()
    res.send(items)
  })
  //获取专利信息
  router.get('/patent/:id', authMiddleware(), async (req, res) => {
    const model = await Patent.findById(req.params.id)
    res.send(model)
  })
  //修改专利
  router.put('/patent/:id', authMiddleware(), async (req, res) => {
    const model = await Patent.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //删除专利
  router.delete('/patent/:id', authMiddleware(), async (req, res) => {
    await Patent.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })


  //*************************************************************************
  //创建公告
  router.post('/notice', authMiddleware(), async (req, res) => {
    const model = await Notice.create(req.body)
    res.send(model)
  })
  //获取公告列表
  router.get('/notice', authMiddleware(), async (req, res) => {
    const items = await Notice.find()
    res.send(items)
  })
  //获取公告信息
  router.get('/notice/:id', authMiddleware(), async (req, res) => {
    const model = await Notice.findById(req.params.id)
    res.send(model)
  })
  //修改公告
  router.put('/notice/:id', authMiddleware(), async (req, res) => {
    const model = await Notice.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //删除公告
  router.delete('/notice/:id', authMiddleware(), async (req, res) => {
    await Notice.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })


  //******************************************************************************** */
  //登录接口
  router.post('/login', async (req, res) => {
    const { username, password, role } = req.body
    //根据用户名找用户,密码校验
    console.log(role)
    if (role === 'admin') {
      const user = await AdminUser.findOne({ username }).select('+password')
      assert(user, 422, '用户不存在')
      const isValid = require('bcrypt').compareSync(password, user.password)
      assert(isValid, 422, '密码错误')
      const id = user._id
      const token = jwt.sign({ id: user._id }, app.get('secret'))
      res.send({ token, role, id })
    }
    else {
      const user = await Researcher.findOne({ username }).select('+password')
      assert(user, 422, '用户不存在')
      const isValid = require('bcrypt').compareSync(password, user.password)
      assert(isValid, 422, '密码错误')
      const id = user._id
      const token = jwt.sign({ id: user._id }, app.get('secret'))
      res.send({ token, role, id })
    }

  })

  //********************************************************************* */
  app.use('/admin/api', router)

  //错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })

  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

}
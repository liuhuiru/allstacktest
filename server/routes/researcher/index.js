module.exports = app => {
  const express = require('express')
  // const multer = require('multer')

  const router = express.Router()
  // const upload = multer({ dest: __dirname + '/../../uploads' })

  // router.post('/upload', upload.single('file'), async (req, res) => {
  //   const file = req.file
  //   res.send(file)
  // })

  app.use('/researcher/api', router)

}

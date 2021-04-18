const express = require("express")

const app = express()

app.set('secret', 'we23rnkjd')

app.use(require('cors')())//引入跨域
app.use(express.json())//引入json

require('./routes/admin')(app)
require('./plugins/db')(app)


app.listen(3000, () => {
  console.log('http://localhost:3000')
})
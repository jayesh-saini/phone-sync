const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.send('Server is alive ❤️')
})

app.use('/api/sms', require('./routes/sms'))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
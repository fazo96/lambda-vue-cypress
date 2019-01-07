const express = require('express')
const path = require('path')

const app = express()
app.use('/', express.static(path.join(__dirname, 'frontend')))
app.use((req, res) => res.sendFile(path.join(__dirname, '/frontend/index.html')))

app.listen(8080, () => console.log('Listening on port 8080'))
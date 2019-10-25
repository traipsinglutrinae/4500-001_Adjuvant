import express from 'express';

const app = express()
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
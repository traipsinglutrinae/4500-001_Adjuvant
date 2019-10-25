import express from 'express';

const app = express()
const port = process.env.PORT || 3000;

app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/web-tool', (req, res) => res.sendFile(__dirname + '/web-tool/index.html'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
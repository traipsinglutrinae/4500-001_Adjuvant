import express from 'express';
import path from 'path';

const app = express()
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/views/index.html')))

app.get('/index', function (req, res,html) {
 res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.get('/index35', function (req, res,html) {
 res.sendFile(path.join(__dirname+'/views/index35.html'));
});

app.get('/index68', function (req, res,html) {
 res.sendFile(path.join(__dirname+'/views/index68.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

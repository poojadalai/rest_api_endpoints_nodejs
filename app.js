
const express = require('express');
const app = express();
const router = require('./routes/products');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/api', router);

app.use('/', (req, res) => {
    res.status(500).json({ code: 500, message: 'API is running, endpoint ' + req.path + ' not found' });
});

app.options('*', (req, res) => { res.status(200).end(); });
const port = process.env.PORT || 8020;

app.listen(port, () => { console.log(`Server is running at port: ${port}`) });
module.exports = app;
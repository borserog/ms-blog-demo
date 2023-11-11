const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const getMsUrl = (num) => `http://localhost:400${num}/events`;

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post(getMsUrl(0), event);
    axios.post(getMsUrl(1), event);
    axios.post(getMsUrl(2), event);
    axios.post(getMsUrl(3), event);

    res.send({status: 'OK'});
});


app.listen(4005, () => {
    console.log('Listening on 4005');
})

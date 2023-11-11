const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

const getMsUrl = (num) => `http://localhost:400${num}/events`;

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post(getMsUrl(0), event).catch(err => console.warn(err));
    axios.post(getMsUrl(1), event).catch(err => console.warn(err));
    axios.post(getMsUrl(2), event).catch(err => console.warn(err))
    axios.post(getMsUrl(3), event).catch(err => console.warn(err));


    res.send({status: 'OK'});
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Listening on 4005');
})

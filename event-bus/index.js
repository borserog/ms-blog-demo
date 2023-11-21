const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

const getMsUrl = (num, root) => `http://${root}:400${num}/events`;

app.post('/events', (req, res) => {
    const event = req.body;

    console.log(event);
    events.push(event);

    axios.post(getMsUrl(0, `posts-clusterip-srv`), event).catch(err => console.warn(err));
    axios.post(getMsUrl(1, `comments-srv`), event).catch(err => console.warn(err));
    axios.post(getMsUrl(2, `query-srv`), event).catch(err => console.warn(err))
    axios.post(getMsUrl(3, `moderation-srv`), event).catch(err => console.warn(err));


    res.send({status: 'OK'});
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Listening on 4005');
})

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const {id, title} = data;

        posts[id] = {id, title, comments: []};
    }

    if (type === 'CommentCreated') {
        const {id, content, postId, status} = data;

        const post = posts[postId];
        post.comments.push({id, content, status})
    }

    if (type === 'CommentUpdated') {
        const {id, content, postId, status} = data;

        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id);

        comment.status = status;
        comment.content = content;
    }
}

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    console.log('Event Received', req.body.type);
    const {type, data} = req.body;

    handleEvent(type, data);

    console.log(JSON.stringify(posts));
    res.send({});
});

app.listen(4002, async () => {
    console.log('[QUERY_SERVICE] Listening on 4002');

    const res = await axios.get('http://event-bus-srv:4005/events').catch(err => console.warn(err));

    try {
        for (let event of res.data) {
            console.log('Processing event:', event.type)
            handleEvent(event.type, event.data);
        }
    } catch (e) {
        console.warn(e);
    }
});

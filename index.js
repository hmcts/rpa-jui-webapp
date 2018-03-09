const express = require('express');
const app = express();

app.use((req, res) => {
    res.status(200).end('ok');
});

const port = process.env.PORT || 3000;
app.listen(port);

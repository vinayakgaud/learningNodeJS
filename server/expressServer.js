const http = require('http')
const express = require('express');
const app = express(); //app is my handler function

app.get('/', (req, res)=>{
    res.send('Hello from Home Page') //get is http method, we can use different methods also
})

app.get('/about', (req, res)=>{
    res.send('Hello from About Page ' + req.query.name)
})

app.listen(8000, ()=>{
    console.log('Server listening on port 8000')
})

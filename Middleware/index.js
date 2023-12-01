import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 8000;
//we can use, `use` keyword to create middleware, it takes handler function and take 3 parameters, 1 for req, 2 for res we can use it to end request here also, 3 next access to next middleware
app.use((req, res, next)=>{
    console.log('Hello from middleware') // as we didn't tell middleware what to do next so our server is stuck in here, we need to mention what middleware should do next
    // return res.json({
    //     err: 'returned from middleware'
    // }) //returned the middleware, ended the request here
    req.myUserJob = 'Software Developer' //changing the request adding my own attribute in here, this changed request will be sent to next middleware and also to routes I can access it there also
    fs.appendFile('./Middleware/logs.txt', `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}`, (err, data)=>{
        if(err) console.log(err)
        else next();
    })
    next(); //we are sending request ahead
});

app.use((req, res, next)=>{
    console.log('Hello from middleware 2, my job title is: '+req.myUserJob)
    next();
});

app.get('/api/users/:name',(req, res)=>{
    return res.json({
        msg: `Welcome to homepage ${req.params.name} your job title is ${req.myUserJob}`
    })
})

app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`) 
})
import express from 'express';
import fs from 'fs';
import users from './users.json' assert {type: "json"}; //because of v8 engine if we don't assert type as json system checks if it is js module or some other file, and throws error, so we need to mention that the file type should be json in this case

const app = express();
const PORT = 8000;

//Middleware
app.use(express.json())
//for urlencoded version
// app.use(express.urlencoded({ extended: false}))
//Routes
app.get('/users', (req, res)=>{
    const html = `
        <ul>
            ${users.map(user => `<li>${user.first_name}</li>`).join('')}
        </ul>
    `
    res.send(html);
}) //this is for example for hybrid server

//Rest API
app.get('/',(req, res)=>{
    res.send('Welcome to home page')
})

app.get('/api/users', (req, res)=>{
    res.json(users);
})

app.route('/api/users/:id')
.get((req, res)=>{
    //:id is express feature to indicate dynamic parameter
    const id = Number(req.params.id); //as id is number that's why type casting it to number as parameter we got is string
    const user = users.find(user => user.id === id)
    return res.json(user)
})
.patch((req, res)=>{
    const updateBody = req.body;
    const id = Number(req.params.id)
    let user = users.find(user=>user.id=== id);
    const index = users.indexOf(user)
    users.splice(index, 1)
    user = {id, ...updateBody}
    users.push(user);
    fs.writeFile('./Rest API/users.json', JSON.stringify(users),(err, data)=>{
        if(err){
            return res.json({
                error: err
            })
        }else{
            return res.json({
                Status: 'Success'
            });
        }
    })
})
.delete((req, res)=>{
    const id = Number(req.params.id);
    const user = users.find(user=>user.id === id);
    const index = users.indexOf(user)
    users.splice(index, 1)
    fs.writeFile('./Rest API/users.json', JSON.stringify(users),(err, data)=>{
        if(err){
            return res.json({
                error: err
            })
        }else{
            return res.json({
                Status: 'Success'
            });
        }
    })
})
//we can group/ combine multiple different request with same route in one

app.post('/api/users',(req, res)=>{
    const body = req.body;
    // console.log(body) //we are getting undefined here because express doesn't knwo what type of data is it, for it we need middleware, after setting up middleware we are getting data
    users.push({id:users.length+1, ...body}) //we have imported users.json as users and as it is array we are pushing one object to it
    //for id we are providing value, for remaining attributes we are saying use remaining value from vody variable, ...body, we cannot name is anything else, we are telling system to take variable parameter but take value from body variable
    fs.writeFile('./Rest API/users.json', JSON.stringify(users),(err, data)=>{
        if(err){
            return res.json({
                error: err
            })
        }else{
            return res.json({
                Status: 'Success',
                userID: users.length
            });
        }
    })
})



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
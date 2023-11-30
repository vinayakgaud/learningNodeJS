//server using HTTP module
const http = require('http')
//http doesn't able to differentiat between url path and query parameters so it logs everything in req.url
//so we use external package for it

const fs = require('fs')
const url = require('url') //first it check in package.json for dependencies if no dependecies are present then it check in inbuilt packages

//creating server
//create Server take requestListener callback function to process the incoming request
//req is request that comes from client it stores all information about client, res is response that is sent to client
const myServer = http.createServer((req, res)=>{
    if(req.url === '/favicon.ico') return res.end(); //we are not logging request for favicon.ico
    //logging request from user
    //1701277759915: /about?id=1&a=5 New Request Received

    const log = `${Date.now()}: ${req.url} ${req.method} New Request Received\n` //req.method provide HTTP method

    //we receive two logs for single request, because browser send 1 extra request for favicon
    const myUrl = url.parse(req.url, true) //true is for passign query string
    fs.appendFile('log.txt',log, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            //we should do no blocking task, and not do image processing or something which will cause problems and block user
            //we can support multiple routes using switch
            switch(myUrl.pathname){ //checking for pathname from parsed url instead of complete url
                case '/': res.end('homePage') //ending function by sending response from  server that says hello
                break;
                case '/about':
                    const id = myUrl.query.id
                    res.end(`i am web developer: ${id}`)
                break;
                default: res.end('404 Not found');
            }
        }
    })
});

//to run server we will need port, on that port number we will make server listen for incoming requests
myServer.listen(8000, ()=>console.log('Server listening on port 8000')) //callback fn is not mandatory

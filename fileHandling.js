//for filesystem we use module fs
const fs = require('fs');

//to create a new file
// fs.writeFileSync('./text.txt', 'Hello There') //first parameter is dir, second is file content
//writeFileSync is for synchronous call
//we have writeFile for asynchronous call
// fs.writeFileSync('./text.txt', 'Hello World new content') //if we call it again, it will remove last files content and overwrite it with new content

//writeFile also work same but takes 3rd paramter callback Fn for any error

// fs.writeFile('./text.txt', 'Hello World Async', (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('File written successfully')
//     }
// })

//Reading from the existing file
//synchronous readFileSync returns the result and throws an error which we can handle in try cath
// const result = fs.readFileSync('./contact.txt', 'utf8') //second parameter is encoding type here we use global encoding utf-8
// console.log('sync: ',result)

// fs.readFile('./contact.txt', 'utf8', (err, result)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log('async: ',result)
//     }
// })
//asynchronoys readFile doesn't return the result, it expects a callback fn where we will use two parameters err and result, err first result second

//appending content to existing file
//it appens the data into file and not remove previous data
// fs.appendFileSync('./contact.txt','\nHey There')
// fs.appendFile('./contact.txt', '\nAsync data', (err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log('successful')
//     }
// })

//to copy a file
// fs.cp('./contact.txt','./copied-contact.txt',(err)=>{

// })
// fs.cpSync('./contact.txt','./copied-contact-async.txt')

//removing the file
// fs.unlinkSync('./copied-contact.txt')
// fs.unlink('./copied-contact-async.txt',err=>{

// })

//to check stats of file
// console.log(fs.statSync('./contact.txt'))
// fs.stat('./contact.txt',(err, result)=>{
//     if(err) {
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// }) //undefined

// console.log(fs.statSync('./contact.txt').isFile())

//to make directory
// fs.mkdirSync('synchronousDirectory') //to make single directory
fs.rmdirSync('synchronousDirectory') //to remove directory
fs.mkdirSync('synchronousDirectory/a/a', {recursive: true}) //recursive true means run func recursively and create internal sub folders also
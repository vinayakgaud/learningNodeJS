//instead of creating math functions in here we can create separate module
//to use another module in this file we can use below method
// const math = require('math'); //if we write it this way it will give error because it will search for math in inbuilt or installed modules
const mathModule = require('./math') 
//require is node specific attribute
//we have to use this way have to provide complete directory path, ./ represent current directory
// console.log(mathModule) //module.exports = add
//if we export add function we get this error
//[Function: add]
/**
    $ npm start

> learning-nodejs@1.0.0 start
> node main

Vinayak - we getting vinayak as output because we exported vinayak in math.js
*/
// console.log(mathModule.addFn(2,4)) //op- 6, mathModule is exported as add function
// console.log(mathModule.subFn(2,4)) //6
// -2, if we name it
console.log(mathModule.add(2,4))
console.log(mathModule.sub(2,4))
//there is different wau to import it, need to check documentation
//we can also call it by destructuring

const {add, sub} = require('./math')
console.log(add(2,4))
console.log(sub(2,4))

console.log(mathModule)

//we can also use default export

// const {default: math} = require('./math')
// console.log(math.add(2,4))
// console.log(math.sub(2,4))

//we can also use named export

// const {add: addFn, sub: subFn} = require('./math')
// console.log(addFn(2,4))
// console.log(subFn(2,4))

//we can also use export *

// const {add: addFn1, sub: subFn1} = require('./math')
// console.log(addFn1(2,4))
// console.log(subFn1(2,4))

//we can also use export default *

// const {default: math1} = require('./math')
// console.log(math1.add(2,4))
// console.log(math1.sub(2,4))


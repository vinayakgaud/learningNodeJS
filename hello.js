//dom and window element of JS is removed in node we cannot run it in node cli
//file handling, cryptography, hashing is added in node
//npm init to start node file, to create package.json
//we can write our own scripts also in package.json of node, and run it using npm run scriptName, npm scriptName
console.log('Hey there') //we can run it in node using node hello
// console.log(window) //as it is web element it doesn't work in node
/**
 * console.log(window)
            ^

ReferenceError: window is not defined
    at Object.<anonymous> (G:\Learning FullStack Web Development\hello.js:3:13)
    at Module._compile (node:internal/modules/cjs/loader:1376:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Module._load (node:internal/modules/cjs/loader:1023:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:135:12)
    at node:internal/main/run_main_module:28:49

Node.js v20.10.0
 */
const add = (a, b)=>{
    return a+b;
}
const sub = (a, b)=>{
    return a-b;
}

module.exports = {
    add,
    sub
};// instead export it as obj because we will have many functions, we can also provide it name if required as `name: func`

//one of export method - export default add;
//other way to export
// exports.add = (a,b)=>a+b;
// exports.sub = (a,b)=>a-b;
//{ add: [Function (anonymous)], sub: [Function (anonymous)] }
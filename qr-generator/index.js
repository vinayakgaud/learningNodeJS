import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image'; 

inquirer
.prompt([
    {
        name: 'URL',
        message: "Enter your URL here:"
    }
])
.then(answers=>{
    const url = answers.URL
    const qr_png = qr.image(url, {
        type: 'png',
        size: 6,
        margin: 3,
        parse_url: true
    })
    function* id(){
        let i = 0;
        while(true){
            yield i++;
        }
    }
    const gen = id();
    qr_png.pipe(fs.createWriteStream(`generated_qr_${gen.next().value}.png`))
})
.catch(err=>{
    if(err.isTtyError){
        console.log("Prompt couldn't be rendered in the current env")
    }else{
        console.log(err)
    }
})
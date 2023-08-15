let body = document.querySelector('body')
let range = document.querySelector('#range')
let rangeLength = document.querySelector('.rangeLength')
let ball = document.getElementsByClassName('ball');
let check = document.getElementsByClassName('check')
let outPutString = document.querySelector('.outPutString')
let generateBtn = document.querySelector('.generateBtn')
let exp = document.querySelector('.exp')
let brackets = document.querySelectorAll('.brackets')
let copiedMsg = document.querySelector('.copiedMsg')
let container = document.querySelector('.container')

function rangeFunc(){
    let valuePercentage = Math.floor((range.value / range.max) * 100)
    if(rangeLength.value < 6){
        range.style.background = `linear-gradient(to right,rgb(255, 166, 0) ${valuePercentage}% , rgba(255, 255, 255, 0.103) ${valuePercentage}%)`
    }else if (rangeLength.value < 9){
        range.style.background = `linear-gradient(to right,rgb(208, 255, 0) ${valuePercentage}% , rgba(255, 255, 255, 0.103) ${valuePercentage}%)`
    }else if (rangeLength.value < 15){
        range.style.background = `linear-gradient(to right,rgb(115, 210, 0) ${valuePercentage}% , rgba(255, 255, 255, 0.103) ${valuePercentage}%)`
    }else if(rangeLength.value >= 15){
        range.style.background = `linear-gradient(to right,rgb(0, 255, 21) ${valuePercentage}% , rgba(255, 255, 255, 0.103) ${valuePercentage}%)`
    }
}

range.addEventListener('input', () => {
    rangeLength.value = range.value
    rangeFunc()
})
rangeLength.addEventListener('keyup', () => {
    range.value = rangeLength.value
    let valuePercentage = Math.floor((rangeLength.value / range.max) * 100)
    if(rangeLength.value ==""){
        rangeLength.value = ""
        range.value = 0
        range.style.background = `linear-gradient(to right,rgb(0, 255, 21) ${valuePercentage}% , rgba(255, 255, 255, 0.103) ${valuePercentage}%)`
    }else{
        rangeFunc()
    }

    if (rangeLength.value > 30) {
        rangeLength.value = 30
    }
})

// toggle button code 
let concatedStr;
let ballArray = Array.from(ball)
for (x of ballArray) {
    x.addEventListener('click', (e) => {
        myTarget = e.target;
        myTarget.classList.toggle('ballMoveRight')
        myTarget.parentElement.classList.toggle('afterChecked')
    })

    function myFunc1(){
        let capitalCase = ''
        let smallCase = ''
        let digitCase = ''
        let specialCase = ''

        function myFunc(num, strName, val){
            if (ballArray[num].classList.contains('ballMoveRight')){
                return strName = `${val}`
            } else {return strName = '' }
        }

        let A =myFunc(0, capitalCase ,'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        let B =myFunc(1, smallCase ,'abcdefghijklmnopqrstuvwxyz')
        let C =myFunc(2, digitCase ,'0123456789')
        let D =myFunc(3, specialCase ,'!@#$%^&*()[]{}')

        let emptyString;
        emptyString="" + A+B+C+D
        concatedStr = ''
        for(let i =0; i<=range.value-1; i++){
            let randomStrElm = emptyString[Math.floor(Math.random()*emptyString.length)]
            concatedStr +=randomStrElm
            outPutString.value =concatedStr
        }
    }

    generateBtn.addEventListener('click',()=>{
        for (x of ballArray){
            if(ballArray[0].classList.contains('ballMoveRight') || ballArray[1].classList.contains('ballMoveRight') || ballArray[2].classList.contains('ballMoveRight')|| ballArray[3].classList.contains('ballMoveRight')){
                myFunc1()
                exp.style.color = "rgb(71, 252, 0)";
                for(x of brackets){
                    x.style.color = 'rgb(71,252,0'
                }
                if(range.value==0){
                    exp.innerHTML = 'Please Specify Length'
                    exp.style.color='red'
                    range.style.background='rgba(255, 0, 0, 0.178)'
                    outPutString.value = ''
                }else if(range.value<6){
                    exp.innerHTML = 'PASSWORD TOO WEAK'
                    exp.style.color= 'rgb(255, 166, 0)'
                }else if(range.value<9){
                    exp.innerHTML = 'WEAK PASSWORD'
                    exp.style.color = 'rgb(208, 255, 0)'
                }else if(range.value<15){
                    exp.innerHTML = 'STRONG PASSWORD'
                    exp.style.color = 'rgb(115, 210, 0)'
                }else if(range.value>=15){
                    exp.innerHTML = 'VERY STRONG PASSWORD'
                    exp.style.color = 'rgb(0, 255, 21)'
                }
            }else{
                exp.innerHTML='PASSWORD TYPE IS NOT DEFINED'
                exp.style.color='red'
                outPutString.value = ''
                
                for(x of brackets){
                    x.style.color = 'red'
                }
            }
        }
    }) 
}

let copy = document.querySelector('.copy');
function copyFunc(msg, bg,border, top){
    copiedMsg.innerHTML = msg
    copiedMsg.style.background = bg
    copiedMsg.style.borderBottom = border
    copiedMsg.style.top = top
}
copy.addEventListener('click',()=>{
    let x;
    if(outPutString.value == ''){
        if(window.screen.width<500){
            x='rgb(255,0,0)'
            copiedMsg.style.borderRadius = 'initial'
        }else{
            x ='rgba(255,0,0,0.171)'
            copiedMsg.style.borderRadius = '10px 10px 0px 0px'
        }
        copyFunc("You need to generate password",`${x}`,'1px solid red','0%')
    }else{
        navigator.clipboard.writeText(concatedStr)
        if(window.screen.width<500){
            x='green'
            copiedMsg.style.borderRadius = 'initial'
            }else{
                x ='rgba(71,252,0,0.171)'
                copiedMsg.style.borderRadius = '10px 10px 0px 0px'
            }
            copyFunc(
            `[<span class="copiedTxt"> ${outPutString.value}  </span> ]copied to clipboard`,
            `${x}`,
            '1px solid rgb(71,252,0)',
             '0%'
            )
            copy.innerHTML= 'copied'
            copy.style.color = 'rgb(71,252,0)'
            generateBtn.addEventListener('click',()=>{
            copy.innerHTML = 'copy'
            copy.style.color = 'white'
            })
        }
    setTimeout(() => {
    copiedMsg.style.top= '-15%'
    },2000);

})
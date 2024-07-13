const InputC = document.getElementsByTagName('input');
const labelC = document.getElementsByTagName('label');
const joinBtn = document.querySelector('.JoinBtn');
const email = InputC.item(0);
const nick = InputC.item(1);
const pw = InputC.item(2);
const pwCheck = InputC.item(3);
const emailRegExp= /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const pwRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

function changeValue(){
    for(let i=0; i<InputC.length; i++){
        if (InputC.item(i).value == '') {
            labelC.item(i).style.cssText = 'position:absolute; top:35px; left:12px; font-size:16px';
            const Joinspan = document.getElementById('JoinSpan'+i);
            Joinspan.innerHTML='';
        } else {
            labelC.item(i).style.cssText = 'font-size:small; color:gray; transform:translate(-5px, -15px);';
        }
    }
}

function emailValid(str){
    return emailRegExp.test(str);
}
function pwValid(str){
    return pwRegExp.test(str);
}
function pwCheckValid(pw, checkPw){
    return pw===checkPw;
}

email.onkeyup = function (){
    const emailValue = email.value;
    if(emailValid(emailValue)){
        document.getElementById('JoinSpan0').innerHTML='사용가능한 이메일입니다.';
    } else {
        document.getElementById('JoinSpan0').innerHTML='이메일 형식에 맞춰 작성해주세요.';
    }
}

nick.onkeyup = function (){
    checkNick(nick.value).then(result=>{
        if(result==='0'){
            document.getElementById('JoinSpan1').innerHTML='사용가능한 닉네임입니다.';
        } else if(result==='1'){
            document.getElementById('JoinSpan1').innerHTML='중복된 닉네임이 존재합니다.';
        }
    })
}

pw.onkeyup = function (){
    const pwValue = pw.value;
    if(pwValid(pwValue)){
        document.getElementById('JoinSpan2').innerHTML='사용가능한 비밀번호입니다.';
    } else {
        document.getElementById('JoinSpan2').innerHTML='대소문자,숫자,특수기호를 포함해 8~20자로 작성해주세요.';
    }
}

pwCheck.onkeyup = function (){
    const pwValue = pw.value;
    const pwCheckValue = pwCheck.value;
    if(pwCheckValid(pwValue,pwCheckValue)){
        document.getElementById('JoinSpan3').innerHTML='비밀번호가 일치합니다.';
    } else {
        document.getElementById('JoinSpan3').innerHTML='비밀번호가 일치하지않습니다.';
    }
}

joinBtn.addEventListener('click',()=>{
    const formValid = emailValid(email.value)
        && pwValid(pw.value)
        && pwCheckValid(pw.value,pwCheck.value);
    if(formValid){
        console.log("활성화")
        document.querySelector('.JoinBtn').type = 'submit';
    } else {
        console.log("비활성화")
        document.querySelector('.JoinBtn').type = 'button';
    }
})

async function checkNick(nick){
    try{
        const url='/user/nick';
        const config={
            method:'POST',
            headers:{ 'content-type':'text/plain; charset=UTF-8' },
            body:nick
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}
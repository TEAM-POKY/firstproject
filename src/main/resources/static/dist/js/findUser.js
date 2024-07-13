const emailModal = document.querySelector('.findEModalArea');
const modalClose = document.querySelector('.modalClose');
const findEmail = document.querySelector('.findEmailBtn');
const findPw = document.querySelector('.findPwBtn');
const nick = document.querySelector('.findNickInput');

window.addEventListener('load',()=>{
    document.querySelector('.findEModal').innerHTML='';
    findEmail.addEventListener('click',()=>{
    console.log(nick.value)
        if(!nick.value==''){
            console.log(nick.value)
            document.querySelector('.findNoNick').innerHTML='';
            findEmailF(nick.value).then(result=>{
                if(result){
                    document.querySelector('.findEModal').innerHTML=`
                    <button class="modalClose" onclick="closeModal()">X</button>
                    <div class="showEmail">${result.nickname}님의 이메일은 ${result.email} 입니다.</div>
                    <a href="/user/login" class="findUserLogin">로그인 하기</a>
                    <a href="/user/findUser">비밀번호 찾기</a>`;
                    emailModal.style.display='block';
                } else {
                    document.querySelector('.findEModal').innerHTML=`
                    <button class="modalClose" onclick="closeModal()">X</button>
                    <div class="showNoEmail">존재하지 않는 닉네임입니다.<br>다시 입력 해주세요.</div>`;
                    emailModal.style.display='block';
                }
            })
        } else if(nick.value=='') {
            document.querySelector('.findNoNick').innerHTML='닉네임을 입력해주세요.';
        }
    })
})

function closeModal(){
    console.log("닫힘버튼누름")
    emailModal.style.display='none';
}

async function findEmailF(nick){
    try{
        const url = '/user/find/'+nick;
        const config={ method:'POST' };
        const resp = await fetch(url,config);
        const result = await resp.json();
        return result;
    } catch (error){
        console.log(error);
    }
}
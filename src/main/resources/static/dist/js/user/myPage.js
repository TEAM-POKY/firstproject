//api key
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmRmZTQ3YTQ0NzU2ZTI5MDAyNTcxNWE2YjQyZDhkNSIsIm5iZiI6MTcyMTA3OTk3NS4wMjMyMTQsInN1YiI6IjY2MDNkNTE3NjA2MjBhMDE3YzMwMjY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yepq4-FusJE30k6cCnybO96yFv6CgiDyauetmowyE-U'
    }
};
//로그인귀찮아서 임시값 나중에삭제
// const currentId = "ehdwo13@gmail.com"
let nickName = '';

//유저정보
async function getUserInfo(currentId) {
    try {
        const url = '/user/info/' + currentId;
        const config = {
            method: 'GET'
        };
        const resp = await fetch(url, config);
        const result = await resp.json();
        return result;
    } catch (e) {
        console.log(e);
    }
}
getUserInfo(currentId).then(result => {
    const uploadPath = '/upload/';
    const imgPath = uploadPath+result.profile;
    if (result) {
        nickName = result.nickname;
        renderNickName();
        document.getElementById('email').innerText = result.email;
        document.getElementById('myProfile').src = result.profile ? imgPath : "/dist/image/person-circle.svg";
    }
});
//닉네임 렌더링함수
function renderNickName() {
    let str = '';
    str = `<span>${nickName}</span>`;
    str += ` <img src="/dist/image/pencil.svg" alt="noPic" id="changeNickName">`;
    document.getElementById('nickName').innerHTML = str;
    document.getElementById('changeNickName').addEventListener('click', changeToInput);
}
//input창 변경함수
function changeToInput() {
    document.getElementById('nickName').innerHTML = `
            <input type="text" id="nickNameInput" value="${nickName}">
            <button id="checkDuplicate">중복체크</button>
            <button id="cancelChange">취소</button>
        `;
    document.getElementById('checkDuplicate').addEventListener('click', checkDuplicateAndUpdate);
    document.getElementById('cancelChange').addEventListener('click', renderNickName);
}
//닉네임업데이트로직
function checkDuplicateAndUpdate() {
    let newNickName = document.getElementById('nickNameInput').value;
    checkDuplicateNickName(newNickName).then(isDuplicate => {
        if (isDuplicate == "false") {
            let updateButton = document.getElementById('checkDuplicate');
            updateButton.textContent = '수정';
            updateButton.id = 'updateNickName';
            document.getElementById('updateNickName').addEventListener('click',()=>{
                updateNickName(nickName, newNickName).then(result =>{
                    if(result == "success"){
                        alert("닉네임 변경이 완료되었습니다. ")
                        window.location.reload();
                    }else{
                        alert("닉네임 변경 오류\n관리자에게 문의해주세요. ")
                    }
                })
            })
            //input창 감지해서 변동시 중복체크 다시하는 로직
            document.getElementById('nickNameInput').addEventListener('input', function () {
                document.getElementById('updateNickName').textContent = '중복체크';
                document.getElementById('updateNickName').id = 'checkDuplicate';
                document.getElementById('checkDuplicate').addEventListener('click', checkDuplicateAndUpdate);
            });
        }else{
            alert("중복된 닉네임입니다. 다시 입력해주세요. ")
        }
    });
}
//닉네임중복체크함수
async function checkDuplicateNickName(nickname) {
    try {
        let encodedNickname = encodeURIComponent(nickname);
        let response = await fetch(`/user/checkNickname?nickname=${encodedNickname}`);
        return await response.text();
    } catch (error) {
        console.log(error);
    }
}
//닉네임업데이트함수
async function updateNickName(oldNickname, newNickname){
    try {
        const url = "/user/updateNickname";
        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oldNickname: encodeURIComponent(oldNickname),
                newNickname: encodeURIComponent(newNickname)
            })
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}
//팔로우정보
async function followInfo(currentId){
    try {
        const url = "/user/follow/"+currentId;
        const config = {
            method: 'GET'
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    }catch (error) {
        console.log(error)
    }
}
followInfo(currentId).then(result =>{
    let follower = result.split("/")[0];
    let following = result.split("/")[1];
    document.getElementById('followInfo').innerText = `팔로워 ${follower}명 | 팔로잉 ${following}명`;
})
//프로필변경
function changeProfileImage() {
    let popupW = 500;
    let popupH = 600;
    let left = Math.ceil((window.screen.width - popupW)/2);
    let top = Math.ceil((window.screen.height - popupH)/2);

    window.open("/user/profile","blank",'width='+popupW+',height='+popupH+',left='+left+',top='+top+',scrollbars=yes,resizable=no,toolbar=no,menubar=no,location=no');
}

//수정작업시작
//캘린더
const calendarBody = document.getElementById('calendarBody');
const monthYear = document.getElementById('monthYear');
let currentDate = new Date();
function loadCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    monthYear.innerHTML = `${year}년 ${month + 1}월`;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    calendarBody.innerHTML = '';
    let row = document.createElement('tr');
    for (let i = 0; i < firstDay; i++) {
        const cell = document.createElement('td');
        row.appendChild(cell);
    }

    for (let date = 1; date <= lastDate; date++) {
        if (row.children.length === 7) {
            calendarBody.appendChild(row);
            row = document.createElement('tr');
        }
        const cell = document.createElement('td');

        // 날짜 정보를 셀에 저장
        const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
        cell.dataset.date = formattedDate;

        // 기본 크기의 빈 div 추가
        const posterContainer = document.createElement('div');
        posterContainer.style.width = '80px';
        posterContainer.style.height = '120px';
        posterContainer.classList.add('poster-container');
        cell.appendChild(posterContainer);

        const dateText = document.createElement('div');
        dateText.textContent = date;
        dateText.classList.add('date-text');
        cell.appendChild(dateText);

        const dayOfWeek = new Date(year, month, date).getDay();
        if (dayOfWeek === 5) {
            cell.classList.add('saturday');
        } else if (dayOfWeek === 6) {
            cell.classList.add('sunday');
        }

        row.appendChild(cell);
    }

    while (row.children.length < 7) {
        const cell = document.createElement('td');
        row.appendChild(cell);
    }
    calendarBody.appendChild(row);

    // getStar 함수 호출
    getStar(currentId).then(result => {
        if(result != null || result){
            const mediaInfo = result.map(item => ({
                mediaId: item.mediaId,
                date: item.date.split(' ')[0]
            }));
            // 각 mediaId에 대해 영화 정보를 가져오고 포스터 경로를 캘린더에 추가
            Promise.all(mediaInfo.map(info => {
                return fetch(`https://api.themoviedb.org/3/movie/${info.mediaId}?language=en-US`, options)
                    .then(response => response.json())
                    .then(data => {
                        console.log('Fetched data for mediaId:', info.mediaId, data);
                        return {
                            date: info.date,
                            posterPath: data.poster_path
                        };
                    });
            })).then(results => {
                results.forEach(result => {
                    console.log('Result:', result);
                    const cell = document.querySelector(`[data-date="${result.date}"]`);
                    if (cell) {
                        const posterContainer = cell.querySelector('.poster-container');
                        if (posterContainer) {
                            // 기존 포스터가 있으면 삭제
                            posterContainer.innerHTML = '';
                            // 포스터 이미지 추가
                            const poster = document.createElement('img');
                            poster.src = `https://image.tmdb.org/t/p/w500${result.posterPath}`;
                            poster.style.width = '100%';
                            poster.style.height = '100%';
                            poster.style.paddingLeft = '40px';
                            posterContainer.appendChild(poster);
                        }
                    }
                });
            }).catch(err => console.error(err));
        }
    });
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadCalendar(currentDate);
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadCalendar(currentDate);
}
async function getStar(currentId){
    try {
        const url = '/user/star/'+currentId;
        const config = {
            method: 'GET'
        };
        const resp = await fetch(url, config);
        const result = await resp.json();
        return result;
    }catch(err){
        console.log(err);
    }
}

window.onload = () => {
    loadCalendar(currentDate);
}


let ctx = document.getElementById('donutChart').getContext('2d');
let total = 110;
let donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['스릴러', '액션', '판타지', '연애', '코미디'],
        datasets: [{
            data: [calc(50, total), calc(20,total), calc(10,total), calc(20,total), calc(10,total)],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#7b19cf'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#7b19cf']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    }
});
function calc(number, total){
    return (number/total * 100).toFixed(1);
}

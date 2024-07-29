//api key
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmRmZTQ3YTQ0NzU2ZTI5MDAyNTcxNWE2YjQyZDhkNSIsIm5iZiI6MTcyMTA3OTk3NS4wMjMyMTQsInN1YiI6IjY2MDNkNTE3NjA2MjBhMDE3YzMwMjY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yepq4-FusJE30k6cCnybO96yFv6CgiDyauetmowyE-U'
    }
};
let nickName = '';//

//유저정보
async function getUserInfo(currentId) {
    try {
        const url = '/user/info/' + currentId;
        const config = {
            method: 'GET'
        };
        const resp = await fetch(url, config);
        return await resp.json();
    } catch (e) {
        console.log(e);
    }
}
getUserInfo(currentId).then(result => {
    const uploadPath = '/upload/';
    const imgPath = uploadPath+result.profile;
    if (result) {
        nickName = result.nickname;
        document.getElementById('userAnalysis').innerText = nickName+"님의 취향분석";
        renderNickName();
        document.getElementById('email').innerText = result.email;
        document.getElementById('myProfile').src = result.profile ? imgPath : "/dist/image/person-circle.svg";
    }
});
//닉네임 렌더링함수
function renderNickName() {
    let str = '';
    str = `<span id="nickNameSpan">${nickName}</span>`;
    if(loginId != currentId){
        let isFollow = document.getElementById('isFollow').innerText;
        console.log(isFollow);
        if(isFollow == "true"){
            str += `<button id="followInfo">팔로우</button>`
        }else{
            str += `<button id="followInfo">언팔로우</button>`
        }
        document.getElementById('changeProfileImage').style.display = 'none';
        document.getElementById('nickName').innerHTML = str;
    }else{
        str += ` <img src="/dist/image/pencil.svg" alt="noPic" id="changeNickName">`
        str += `<button id="withdrawalBtn">회원탈퇴</button>`;
        document.getElementById('nickName').innerHTML = str;
        document.getElementById('changeNickName').addEventListener('click', changeToInput);
        document.getElementById('withdrawalBtn').addEventListener('click', async () => {
            if (confirm("작성한 댓글과 별점은 삭제되지않습니다. \n정말 회원탈퇴하시겠습니까?")) {
                await withdrawalAccount(loginId);
            }
        });
    }
}
//팔로우 언팔로우 로직
async function followStatus(){
    console.log()
}
async function withdrawalAccount(loginId){
    try {
        const response = await fetch(`/user/withdraw/${loginId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            alert('회원 탈퇴가 완료되었습니다.');
            window.location.href = "/user/logout"
        } else {
            const errorData = await response.json();
            alert(`회원 탈퇴 실패: ${errorData.message}`);
        }
    } catch (error) {
        console.error('회원 탈퇴 요청 중 오류 발생:', error);
        alert('회원 탈퇴 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
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
    let updateButton = document.getElementById('checkDuplicate');
    if(!newNickName.includes("_user")) {
        checkDuplicateNickName(newNickName).then(isDuplicate => {
            if (isDuplicate == "false") {
                alert("사용가능한 닉네임입니다. ")
                updateButton.removeEventListener('click', checkDuplicateAndUpdate);
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
    }else{
        alert("_user는 포함될 수 없습니다. 다시 입력해주세요. ")
        document.getElementById('nickNameInput').value = '';
    }
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
        return await resp.text();
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
        return await resp.text();
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

async function loadCalendar(date) {
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
        posterContainer.style.position = 'relative';
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

    try {
        const result = await getStar(currentId);
        console.log(result);
        if (Array.isArray(result) && result.length > 0) {
            const mediaInfo = result.map(item => ({
                mediaId: item.mediaId,
                date: item.date.split(' ')[0]
            }));
            // 각 mediaId에 대해 영화 정보를 가져오고 포스터 경로를 캘린더에 추가
            const results = await Promise.all(mediaInfo.map(info => {
                return fetch(`https://api.themoviedb.org/3/movie/${info.mediaId}?language=en-US`, options)
                    .then(response => response.json())
                    .then(data => ({
                        date: info.date,
                        mediaId: info.mediaId,
                        posterPath: data.poster_path
                    }));
            }));
            const postersByDate = results.reduce((acc, result) => {
                if (!acc[result.date]) acc[result.date] = [];
                acc[result.date].push(result);
                return acc;
            }, {});

            Object.keys(postersByDate).forEach(date => {
                const cell = document.querySelector(`[data-date="${date}"]`);
                if (cell) {
                    const posterContainer = cell.querySelector('.poster-container');
                    if (posterContainer) {
                        posterContainer.innerHTML = '';
                        const posters = postersByDate[date];
                        posters.forEach((poster, index) => {
                            const posterImg = document.createElement('img');
                            posterImg.src = `https://image.tmdb.org/t/p/w500${poster.posterPath}`;
                            posterImg.style.width = '100%';
                            posterImg.style.height = '100%';
                            posterImg.style.position = 'absolute';
                            posterImg.style.left = `${index * 10}px`; // 포스터가 겹치도록 설정
                            posterImg.dataset.mediaId = poster.mediaId;
                            posterContainer.appendChild(posterImg);
                            posterImg.addEventListener('click', () => {
                                // 링크로 이동하는 로직 추가
                                window.location.href = `https://www.themoviedb.org/movie/${poster.mediaId}`;
                            });
                        });
                        if (posters.length > 1) {
                            const badge = document.createElement('div');
                            badge.classList.add('badge');
                            badge.textContent = posters.length;
                            badge.addEventListener('click', () => {
                                showModal(posters);
                            });
                            posterContainer.appendChild(badge);
                        }
                    }
                }
            });
        }
    } catch (err) {
        console.error('Error fetching star data:', err);
    }
}

function showModal(posters) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = '';
    posters.forEach(poster => {
        const posterImg = document.createElement('img');
        posterImg.src = `https://image.tmdb.org/t/p/w500${poster.posterPath}`;
        posterImg.style.width = '100px';
        posterImg.style.height = '150px';
        posterImg.dataset.mediaId = poster.mediaId;
        modalContent.appendChild(posterImg);
        posterImg.addEventListener('click', () => {
            // 링크로 이동하는 로직 추가
            window.location.href = `https://www.themoviedb.org/movie/${poster.mediaId}`;
        });
    });
    modal.style.display = 'block';
}

document.getElementById('modalClose').addEventListener('click', () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
});

async function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    await loadCalendar(currentDate);
}

async function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    await loadCalendar(currentDate);
}

async function getStar(currentId){
    try {
        const url = '/user/star/'+currentId;
        const config = {
            method: 'GET'
        };
        const resp = await fetch(url, config);
        return await resp.json();
    }catch(err){
        console.log(err);
    }
}

window.onload = async () => {
    await loadCalendar(currentDate);
}

//count section 정보가져오기
async function getCountSection(currentId){
    try {
        const url = "/user/getCountInfo/"+currentId;
        const config = {
            method: 'GET'
        }
        const resp = await fetch(url, config);
        const result = await resp.json();
        return result;
    }catch (error){
        console.log(error);
    }
}
//채워주기
getCountSection(currentId).then(result =>{
    document.getElementById('countWish').innerText = result.wish_count+"개";
    document.getElementById('countStar').innerText = result.star_count+"개";
    document.getElementById('countComment').innerText = result.comment_count+"개";
})

//도넛차트


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

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
        const poster = document.createElement('img');
        poster.src = 'https://via.placeholder.com/80x120';
        poster.classList.add('poster');
        cell.appendChild(poster);
        const dateText = document.createElement('div');
        dateText.textContent = date;
        dateText.classList.add('date-text');
        cell.appendChild(dateText);
        row.appendChild(cell);
    }

    while (row.children.length < 7) {
        const cell = document.createElement('td');
        row.appendChild(cell);
    }
    calendarBody.appendChild(row);
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadCalendar(currentDate);
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadCalendar(currentDate);
}

window.onload = () => {
    loadCalendar(currentDate);
}

function changeProfileImage() {
    alert('프로필 이미지 변경 기능');
}
var ctx = document.getElementById('donutChart').getContext('2d');
var donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['스릴러', '액션', '판타지', '연애','코미디'],
        datasets: [{
            data: [50, 20, 10, 20, 10],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#7b19cf'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#7b19cf']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    }
});


function scrollLeft(id) {
    document.getElementById(id).scrollBy({
        top: 0,
        left: -100,
        behavior: 'smooth'
    });
}

function scrollRight(id) {
    document.getElementById(id).scrollBy({
        top: 0,
        left: 100,
        behavior: 'smooth'
    });
}

const apiKey = 'afdfe47a44756e290025715a6b42d8d5';
let requestToken = '';

document.getElementById('token').addEventListener('click', async () => {
    const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('네트워크 응답이 좋지 않습니다');
        }
        const data = await response.json();
        requestToken = data.request_token;
        console.log('Request Token:', requestToken);
        localStorage.setItem('requestToken', requestToken);
        let id = 'ehdwosla13';
        let pw = `274ehdwo!`
        const url1 = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}&username=${id}&password=${pw}&request_token=`+requestToken;
        try {
            const response = await fetch(url1, {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error('네트워크 응답이 좋지 않습니다');
            }
            const data = await response.json();
            const sessionId = data.session_id;
            console.log('Session ID:', sessionId);
        } catch (error) {
            console.error('세션 생성에 실패했습니다:', error);
        }
    } catch (error) {
        console.error('토큰 가져오기에 실패했습니다:', error);
    }
});

document.getElementById('session').addEventListener('click', async () => {
    if (!requestToken) {
        requestToken = localStorage.getItem('requestToken');
    }

    if (!requestToken) {
        alert('먼저 토큰을 가져와야 합니다');
        return;
    }
    let id = 'ehdwosla13';
    let pw = `274ehdwo!`
    // const url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`;
    const url = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}&username=${id}&password=${pw}&request_token=`+requestToken;
    try {
        const response = await fetch(url, {
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error('네트워크 응답이 좋지 않습니다');
        }
        const data = await response.json();
        const sessionId = data.session_id;
        console.log('Session ID:', sessionId);
    } catch (error) {
        console.error('세션 생성에 실패했습니다:', error);
    }
});
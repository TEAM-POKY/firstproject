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

        const dayOfWeek = new Date(year, month, date).getDay();
        if (dayOfWeek === 5) {
            cell.classList.add('saturday');
        } else if (dayOfWeek === 6) {
            cell.classList.add('sunday');
        }

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
function updateScrollButtons(profileId) {
    const profileWrapper = document.querySelector(`#${profileId}`).parentElement;
    const profile = document.getElementById(profileId);
    const scrollButtons = profileWrapper.querySelectorAll('.scroll-button');
    if (profile.children.length > 5) {
        profileWrapper.classList.add('more-than-five');
        profile.style.justifyContent = 'flex-start'; // 스크롤이 가능할 때는 시작 정렬
    } else {
        profileWrapper.classList.remove('more-than-five');
        profile.style.justifyContent = 'center'; // 스크롤이 필요 없을 때는 가운데 정렬
    }
}

function scrollLeft(profileId) {
    const profile = document.getElementById(profileId);
    profile.scrollBy({ left: -200, behavior: 'smooth' });
}

function scrollRight(profileId) {
    const profile = document.getElementById(profileId);
    profile.scrollBy({ left: 200, behavior: 'smooth' });
}

window.onload = () => {
    loadCalendar(currentDate);
    updateScrollButtons('actorProfiles');
    updateScrollButtons('directorProfiles');
}

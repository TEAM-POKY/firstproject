const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');
const thumbnail = document.querySelector(".detail1");
const mainposter = document.querySelector(".mainposter");
const voteDiv = document.querySelector(".detailVote");
const detailTitlediv = document.querySelector(".detailTitle");
const detailCatediv = document.querySelector(".detailcate");
const storyText = document.querySelector(".detailText");
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

getDetail(movieId).then(result => {
    const posterPath = result.poster_path ? `${imageBaseUrl}${result.poster_path}` : '';
    const backdropPath = result.backdrop_path ? `${imageBaseUrl}${result.backdrop_path}` : '';

    const backdropsrc = backdropPath;
    const mainpostersrc = posterPath;
    const voteNum = `⭐${result.vote_average} (${result.vote_count})`;
    const detailTitle = result.title;

    // 카테고리 목록 생성
    const cateul = document.createElement('ul');
    cateul.classList.add('detailCateUl'); // 스타일 적용
    for (const category of result.genres) {
        const cateLi = document.createElement('li');
        const span = document.createElement('span');
        span.classList.add(category.id);
        span.textContent = `#${category.name}`;
        cateLi.appendChild(span);
        cateul.appendChild(cateLi);
    }
    detailCatediv.appendChild(cateul);

    // 백그라운드 이미지 및 포스터 설정
    thumbnail.style.backgroundImage = backdropPath ? `linear-gradient(to right, black,#000000e0, rgba(42,40,40,0.7)), url(${backdropsrc})` : `linear-gradient(to right, black,#000000e0, rgba(42,40,40,0.7))`;
    mainposter.src = mainpostersrc ? mainpostersrc : '기본 포스터 URL';
    voteDiv.innerText = voteNum;
    detailTitlediv.innerText = detailTitle;
    storyText.innerText = result.overview;
}).catch(err => {
    console.error('Error fetching movie details:', err);
});

getCommentList(movieId).then(result => {
    const detailContainer = document.querySelector(".detail3");
    console.log(result); // 데이터 확인용
    const ul = document.createElement("ul");
    ul.classList.add("detailCommentUl");
    if(result.length == 0){
        detailContainer.innerHTML = `<div class="detailNoComment"><span>아직 댓글이 없습니다.</span></div>`;
        return;
    }
    result.forEach(comment => {
        const li = document.createElement('li');
        li.innerHTML = `
                    <div class="detailUserName">${comment.email}</div>
                    <div class="detailRegDate">${elapsedTime(comment.regDate)}</div>`;
        if (comment.spoiler === 0) {
            li.innerHTML+= `<div class="detailContent">${comment.content}</div>`;
        } else {
            li.innerHTML += `
                    <div class="detailspoiler">
                        <div class="detailContent" style="display: none">${comment.content}</div>
                        <span>스포일러입니다.</span>
                        <button type="button" onclick="toggleSpoiler(this)">보기</button>
                    </div>`;
        }
        ul.appendChild(li);
    });
    detailContainer.appendChild(ul);

});

// 더보기/간략히 보기 버튼 처리
document.querySelector('.detailStory').addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('more-text')) {
        target.style.display = 'none';
        document.querySelector('.less-text').style.display = 'inline-block';
        storyText.style.display = 'inline-block';
    } else if (target.classList.contains('less-text')) {
        target.style.display = 'none';
        document.querySelector('.more-text').style.display = 'inline-block';
        storyText.style.display = '-webkit-box';
    }
});

// 스포일러 버튼
function toggleSpoiler(button) {
    const detailContent = button.parentElement.querySelector('.detailContent');
    const spoilerElements = button.parentElement.querySelectorAll('span, button');
    detailContent.style.display = 'block';
    spoilerElements.forEach(el => el.style.display = 'none');
}

async function getDetail(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, options);
        if (!response.ok) {
            throw new Error('Movie details not found');
        }
        const result = await response.json();
        return result;
    } catch (err) {
        console.error('Error fetching movie details:', err);
        throw err;
    }
}

async function getCommentList(movieId) {
    try {
        const response = await fetch(`/movie/getCommentList/${movieId}`);
        if (!response.ok) {
            throw new Error('Comment list not found');
        }
        const result = await response.json();
        return result;
    } catch (err) {
        console.error('Error fetching comment list:', err);
        throw err;
    }
}

// 글쓴 시간 나타내는 메서드
function elapsedTime(date) {
    const start = new Date(date);
    const end = new Date();
    const diff = (end - start) / 1000;
    const times = [
        {name: '년', milliSeconds: 60 * 60 * 24 * 365},
        {name: '개월', milliSeconds: 60 * 60 * 24 * 30},
        {name: '일', milliSeconds: 60 * 60 * 24},
        {name: '시간', milliSeconds: 60 * 60},
        {name: '분', milliSeconds: 60},
    ];

    for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);

        if (betweenTime > 0) {
            return `${betweenTime}${value.name} 전`;
        }
    }
    return '방금 전';
}


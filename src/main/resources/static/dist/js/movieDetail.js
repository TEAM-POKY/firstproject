console.log("js in!");
const movieId = '1022789';
const thumbnail = document.querySelector(".detail1");
const mainposter = document.querySelector(".mainposter");
const voteDiv = document.querySelector(".detailVote");
const detailTitlediv = document.querySelector(".detailTitle");
const detailCatediv = document.querySelector(".detailcate");
const storyText = document.querySelector(".detailText");
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

console.log(movieId);

getDetail(movieId).then(result => {
    console.log(result);
    const posterPath = result.poster_path ? `${imageBaseUrl}${result.poster_path}` : '';
    const backdropPath = result.backdrop_path ? `${imageBaseUrl}${result.backdrop_path}` : '';
    var backdropsrc = backdropPath;
    var mainpostersrc = posterPath;
    var voteNum = '⭐' + result.vote_average + '(' + result.vote_count + ')';
    var detailTitle = result.title
    const cateul= document.createElement('ul');
    cateul.classList.add('detailCateUl'); // 스타일 적용
    for(var category of result.genres){
        cateLi = document.createElement('li');
        cateLi.innerHTML = `<span class="${category.id}">#${category.name}</span>`;
        cateul.appendChild(cateLi);
    }

    detailCatediv.appendChild(cateul);


    var storyTelling = result.overview;
    thumbnail.style.backgroundImage = "linear-gradient(to right, black,#000000e0, rgba(42,40,40,0.7))," + "url(" + backdropsrc + ")"; // 백그라운드 이미지
    mainposter.src = mainpostersrc; //메인 포스터
    voteDiv.innerText = voteNum; // 별점
    detailTitlediv.innerText = detailTitle; // 제목
    storyText.innerText = storyTelling; // 줄거리
})
// api 받아서 넣을 장소

// 더보기 기능 구현
const moreText = document.querySelector('.more-text');
const lessText = document.querySelector('.less-text');

moreText.addEventListener('click', () => {

    moreText.style.display = 'none';
    lessText.style.display = 'inline-block';
    storyText.style.display = 'inline-block';
});

lessText.addEventListener('click', () => {

    lessText.style.display = 'none';
    moreText.style.display = 'inline-block';
    storyText.style.display = '-webkit-box';
});

async function getDetail(movieId) {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, options);
        const result = await response.json();
        return result;
    } catch (err) {
        console.log("movie not find :" + err);
    }

}



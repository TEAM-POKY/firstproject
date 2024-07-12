console.log("js in!");
const thumbnail = document.querySelector(".detail1");
const mainposter = document.querySelector(".mainposter");
const voteDiv = document.querySelector(".detailVote");
const detailTitlediv = document.querySelector(".detailTitle");
const detailCatediv = document.querySelector(".detailcate");
const storyText = document.querySelector(".detailText");
// api 받아서 넣을 장소
var srcstr = 'https://image.tmdb.org/t/p/w500/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg';
var mainpostersrc = 'https://image.laftel.net/items/thumbs/big/0fde8a97-0a4f-4998-a828-ed7eb1ed10a2.jpg';
var voteNum = '⭐'+'7.8';
var detailTitle = '나는 모든것을 패링 한다 역착각의 세계 이세계부터 다시 시작하는 세계';
var detailCate = '카테고리';
var storyTelling = '13살이 된 라일리의 행복을 위해 매일 바쁘게 머릿속 감정 컨트롤 본부를 운영하는 ‘기쁨’, ‘슬픔’, ‘버럭’, ‘까칠’, ‘소심’. 그러던 어느 날, 낯선 감정인 ‘불안’, ‘당황’, ‘따분’, ‘부럽’이가 본부에 등장하고, 언제나 최악의 상황을 대비하며 제멋대로인 ‘불안’이와 기존 감정들은 계속 충돌한다. 결국 새로운 감정들에 의해 본부에서 쫓겨나게 된 기존 감정들은 다시 본부로 돌아가기 위해 위험천만한 모험을 시작하는데…'
// 값이 들어가는 곳
thumbnail.style.backgroundImage = "linear-gradient(to right, black,#000000e0, rgba(42,40,40,0.7)),"+"url("+srcstr+")"; // 백그라운드 이미지
mainposter.src = mainpostersrc; //메인 포스터
voteDiv.innerText = voteNum; // 별점
detailTitlediv.innerText = detailTitle; // 제목
detailCatediv.innerText = detailCate; // 카테고리
storyText.innerText = storyTelling; // 줄거리


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



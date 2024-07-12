console.log("js in!");
const thumbnail = document.querySelector(".detail1");
const mainposter = document.querySelector(".mainposter");
const voteDiv = document.querySelector(".detailVote");
const detailTitlediv = document.querySelector(".detailTitle");
const detailCatediv = document.querySelector(".detailcate");
var srcstr = 'https://image.tmdb.org/t/p/w500/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg';
var mainpostersrc = 'https://image.laftel.net/items/thumbs/big/0fde8a97-0a4f-4998-a828-ed7eb1ed10a2.jpg';
var voteNum = '⭐'+'7.8';
var detailTitle = '나는 모든것을 패링 한다 역착각의 세계 이세계부터 다시 시작하는 세계';
var detailCate = '카테고리';
thumbnail.style.backgroundImage = "linear-gradient(to right, black,#000000e0, rgba(42,40,40,0.7)),"+"url("+srcstr+")";
mainposter.src = mainpostersrc;
voteDiv.innerText = voteNum;
detailTitlediv.innerText = detailTitle;
detailCatediv.innerText = detailCate;



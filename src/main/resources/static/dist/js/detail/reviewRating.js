const rateWrap = document.querySelectorAll('.rating'),
    label = document.querySelectorAll('.rating .rating__label'),
    input = document.querySelectorAll('.rating .rating__input'),
    labelLength = label.length,
    opacityHover = '0.5';
const user = document.getElementById("userId");

// 이건 클릭하면 값 가지고 가는 용
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') {
        const ratingInfo = {
            email: user.innerText,
            rate: e.target.value,
            mediaId: movieId
        }
        ratingMovie(ratingInfo).then(result => {
            console.log(result);
        })
        console.log(ratingInfo);
    }
});

// // 불러오고 넣을때 사용하면 딱 일듯
// var findfill = document.querySelectorAll('.filled');
// findfill.forEach(fill => {
//     findprev = fill.previousElementSibling;
// })
// console.log(findprev.value);

let stars = document.querySelectorAll('.rating .star-icon');

checkedRate();

rateWrap.forEach(wrap => {
    wrap.addEventListener('mouseenter', () => {
        stars = wrap.querySelectorAll('.star-icon');

        stars.forEach((starIcon, idx) => {
            starIcon.addEventListener('mouseenter', () => {
                initStars();
                filledRate(idx, labelLength);

                for (let i = 0; i < stars.length; i++) {
                    if (stars[i].classList.contains('filled')) {
                        stars[i].style.opacity = opacityHover;
                    }
                }
            });

            starIcon.addEventListener('mouseleave', () => {
                starIcon.style.opacity = '1';
                initStars();
                checkedRate();
            });

            wrap.addEventListener('mouseleave', () => {
                starIcon.style.opacity = '1';
            });
        });
    });
});

function filledRate(index, length) {
    if (index <= length) {
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('filled');
        }
    }
}

function checkedRate() {
    let checkedRadio = document.querySelectorAll('.rating input[type="radio"]:checked');


    // initStars();
    checkedRadio.forEach(radio => {
        let previousSiblings = prevAll(radio);

        for (let i = 0; i < previousSiblings.length; i++) {
            previousSiblings[i].querySelector('.star-icon').classList.add('filled');
        }

        radio.nextElementSibling.classList.add('filled');

        function prevAll() {
            let radioSiblings = [],
                prevSibling = radio.parentElement.previousElementSibling;

            while (prevSibling) {
                radioSiblings.push(prevSibling);
                prevSibling = prevSibling.previousElementSibling;
            }
            return radioSiblings;
        }
    });
}

// 별점 넣는 기능
async function ratingMovie(ratingInfo) {
    try {
        const url = "/movie/ratingMovie";
        const config = {
            method: "POST",
            headers: {
                'content-type': 'application/json; charset =utf-8'
            },
            body: JSON.stringify(ratingInfo)
        };
        const resp = await fetch(url, config);
        const result = resp.text();
        return result;
    } catch (err) {
        console.log(err);
    }
}

// //
// async function getreview(userinfo){
//     try{
//         const url = "/movie/getreview";
//         const config ={
//             method: "POST",
//             headers: {
//                 'content-type': 'application/json; charset =utf-8'
//             },
//             body: JSON.stringify(userinfo)
//         };
//         const res = await fetch(url,config);
//         const result = res.json();
//         return result;
//     }catch (err){
//         console.log("not userinfo"+err);
//     }
// }
//
// // 리뷰리스트 가져오기
// async function spreadreview(movieId) {
//     try{
//         const res = await fetch("/movie/reviewlist/"+movieId);
//         const result = res.json();
//         return result;
//     }catch (err){
//         console.log("movieId not find"+err);
//     }
// }

function initStars() { // 별 초기화 함수
    for (let i = 0; i < stars.length; i++) {
        stars[i].classList.remove('filled');
    }
}
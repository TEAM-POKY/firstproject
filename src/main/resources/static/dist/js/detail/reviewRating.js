const rateWrap = document.querySelectorAll('.rating'),
    label = document.querySelectorAll('.rating .rating__label'),
    input = document.querySelectorAll('.rating .rating__input'),
    labelLength = label.length,
    opacityHover = '0.5';
const user = document.getElementById("userId");
const comment = document.getElementById("commentBtn");
const spoilerCheckbox = document.getElementById('spoiler');
const userInfo = {
    email: user.innerText,
    mediaId: movieId
};
let rate = 0;

israting(userInfo).then(result => {
    rate = result.rate;
    console.log(rate);
    if (rate >= 0) {
        console.log("if문 탐");
        const inputs = document.querySelectorAll(".rating__input");
        inputs.forEach(input => {
            const value = parseFloat(input.getAttribute('value'));
            if (value <= rate) {
                input.nextElementSibling.classList.add('filled');
            }
        });
    }
});

spoilerCheckbox.addEventListener('change', function () {
    if (spoilerCheckbox.checked) {
        spoilerCheckbox.value = 1;
    } else {
        spoilerCheckbox.value = 0;
    }
});

// 이건 클릭하면 값 가지고 가는 용
document.addEventListener('click', (e) => {
    if (e.target.className === 'rating__input') {
        const ratingInfo = {
            email: user.innerText,
            rate: e.target.value,
            mediaId: movieId
        }
        ratingMovie(ratingInfo).then(result => {
            if (result == 1) {
                alert("별점을 등록 하였습니다.");
                location.reload(true);
            }
        })
    }
});

comment.addEventListener('click', () => {
    israting(userInfo).then(result => {
        console.log(result);
        if (result == null) {
            alert("별점 등록 후 리뷰 등록이 가능합니다.");
            document.getElementById("commentText").value = "";

        } else {
            const config = {
                mediaId: movieId,
                content: document.getElementById("commentText").value,
                spoiler: spoilerCheckbox.value,
                email: user.innerText
            };
            commentMovie(config).then(result => {
                console.log(result);
                if (result == 1) {
                    alert("댓글을 등록하였습니다.");
                }
            })
        }
    })

});


let stars = document.querySelectorAll('.rating .star-icon');

// checkedRate();

rateWrap.forEach(wrap => {
    wrap.addEventListener('mouseover', () => {
        stars = wrap.querySelectorAll('.star-icon');
        stars.forEach((starIcon, idx) => {
            starIcon.addEventListener('mouseover', () => {
                initStars();
                filledRate(idx, labelLength);
                for (let i = 0; i < stars.length; i++) {
                    if (stars[i].classList.contains('filled')) {
                        stars[i].style.opacity = opacityHover;
                    }
                }
            });
            starIcon.addEventListener('mouseout', () => {
                starIcon.style.opacity = '1';
                 checkedRate();
            });
            wrap.addEventListener('mouseout', () => {
                starIcon.style.opacity = '1';
                initStars();
                if (rate >= 0) {
                    console.log("if문 탐");
                    const inputs = document.querySelectorAll(".rating__input");
                    inputs.forEach(input => {
                        const value = parseFloat(input.getAttribute('value'));
                        if (value <= rate) {
                            input.nextElementSibling.classList.add('filled');
                        }
                    });
                }
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

//코멘트 넣기
async function commentMovie(commentInfo) {
    try {
        const url = "/movie/comment";
        const config = {
            method: "POST",
            headers: {
                'content-type': 'application/json; charset =utf-8'
            },
            body: JSON.stringify(commentInfo)
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (err) {
        console.log("댓글 작성 실패 " + err);
    }
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
        const result = await resp.text();
        return result;
    } catch (err) {
        console.log(err);
    }
}

// 별점 등록을 했는지
async function israting(userInfo) {
    try {
        const url = "/movie/isRating";
        const config = {
            method: "POST",
            headers: {
                'content-type': 'application/json; charset =utf-8'
            },
            body: JSON.stringify(userInfo)
        };
        const resp = await fetch(url, config);
        const result = await resp.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

function initStars() { // 별 초기화 함수
    for (let i = 0; i < stars.length; i++) {
        stars[i].classList.remove('filled');
    }
}
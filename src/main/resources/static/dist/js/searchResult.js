const UrlParams = new URLSearchParams(window.location.search);
const keyword = UrlParams.get('keyword');
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';


    searchMovieList(keyword).then(result => {
        console.log(result);
        //검색결과없을때
        if(result.results.length<1){
            console.log("검색결과 없음");
        }
        for (let rr of result.results) {
            const posterPath = rr.poster_path ? `${imageBaseUrl}${rr.poster_path}` : '';
            const profilePath = rr.profile_path ? `${imageBaseUrl}${rr.profile_path}` : '';
            if (rr.media_type === "person") {
                document.querySelector('.personSpan').style.display='block';
                const personDiv = document.createElement('div');
                personDiv.classList.add('personResultDiv');
                let personDetails =`<div class="personOne">
                                    <a href="/movie/person?personId=${rr.id}"><div class="personImg" style="background: url('${profilePath}') no-repeat center -16px /100%">`;
                if(profilePath==''){
                    if(rr.gender===1){
                        personDetails+=`<img src="/dist/image/default_profile_w.jpg">`;
                    } else {
                        personDetails+=`<img src="/dist/image/default_profile_m.jpg">`;
                    }
                        personDetails+=`</a><div class="nameDiv">${rr.name}</div></div>`;
                }
                else if(profilePath!==''){
                    personDetails+=`</div></a><div class="nameDiv2">${rr.name}</div>`;
                }
                personDiv.innerHTML=personDetails;
                document.querySelector('.personResult').appendChild(personDiv);
                // document.querySelector('.personImg').style.background+=`url('${profilePath}') no-repeat center -16px /100%`;
            }
            if (rr.media_type === "movie") {
                document.querySelector('.movieSpan').style.display='block';
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movieResultDiv');
                const movieDetails =`
                    <div class="movieOne">
                        <a href="/movie/detail?movieId=${rr.id}">
                        <img src="${posterPath}"></a>
                        <div class="nameDiv">${rr.title}</div>
                    </div>`;
                movieDiv.innerHTML=movieDetails;
                document.querySelector('.movieResult').appendChild(movieDiv);
            }
            if (rr.media_type === "tv") {
                document.querySelector('.tvSpan').style.display='block';
                const tvDiv = document.createElement('div');
                tvDiv.classList.add('tvResultDiv');
                const tvDetails =`
                    <div class="tvOne">
                        <img src="${posterPath}">
                        <div class="nameDiv">${rr.name}</div>
                    </img>`;
                tvDiv.innerHTML=tvDetails;
                document.querySelector('.tvResult').appendChild(tvDiv);
            }
        }
    })



async function searchMovieList(keyword){
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=false&language=ko-KR&page=1`,options);
        const result = await response.json();
        return result;
    } catch (err) {
        console.log("movie not find :" + err);
    }
}

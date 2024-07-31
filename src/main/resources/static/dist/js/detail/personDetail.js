const urlParams = new URLSearchParams(window.location.search);
const personId = urlParams.get('personId');
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

personDetail(personId).then(result=>{
    console.log(result);
    const profilePath = result.profile_path ? `${imageBaseUrl}${result.profile_path}` : '';
    const personInfo = document.createElement('div');
    personInfo.classList.add('personDiv');
    let structure='';
    if(profilePath!==''){
        structure += `<img src=${profilePath}>`;
    } else {
        if(result.gender===1){
            structure+=`<img src="/dist/image/default_profile_w.jpg">`;
        } else {
            structure+=`<img src="/dist/image/default_profile_m.jpg">`;
        }
    }
    structure += `
    <ul class="personUl"><li class="personName">${result.name}</li>
    <li class="personBirth">${result.birthday.replaceAll("-",".")}</li>`;
    //사망인물 체크
    if(result.deathday!==null){
        structure+=`<li class="personDeath">사망 ${result.deathday.replaceAll("-",".")}</li>`;
    }
    if(result.known_for_department==="Directing"){
        structure+=`<li><button type="button" id="directorFollowBtn">팔로우 +</button></li>`;
    } else {
        structure+=`<li><button type="button" id="actorFollowBtn">팔로우 +</button></li>`;
    }
    structure+=`</ul>`;
    personInfo.innerHTML=structure;
    personSNS(personId).then(sns=>{
        console.log(sns);
        if(sns.instagram_id!==null){
            document.querySelector('.personUl').innerHTML+=`<li class="instaId"><a href="https://www.instagram.com/${sns.instagram_id}/">인스타그램</a></li>`
        }
        if(sns.twitter_id!==null){
            document.querySelector('.personUl').innerHTML+=`<li class="twitterId"><a href="https://www.x.com/${sns.twitter_id}/">X</a></li>`
        }
    })
    document.querySelector('.personInfo').appendChild(personInfo);
})
credits(personId).then(result=>{
    console.log(result);
    //cast(배역)
    if(result.cast.length>0){
        console.log(result.cast);
        const uniqueMedia = result.cast.filter(
            (obj, idx) => {
                return ( result.cast.findIndex((obj2) => {
                        return obj.backdrop_path === obj2.backdrop_path }) === idx
                )
            }
        )
        for(let castMedia of uniqueMedia){
            const posterPath = castMedia.poster_path ? `${imageBaseUrl}${castMedia.poster_path}` : '';
            if(castMedia.media_type==='movie'){
                document.querySelector('.personMovieList').style.display='block';
                const mediaDiv = document.createElement('div');
                mediaDiv.classList.add('personMovieOne');
                let structure='';
                structure=`<div class="mediaLeftInfo">
                            <div class="mlTitle">${castMedia.title}</div>
                            <div class="mDepart" data-id="${castMedia.id}"></div>
                            <div class="mlData">${castMedia.release_date.replaceAll("-",".")}</div>
                        </div>
                        <div class="mediaRightInfo">
                            <a href="/movie/detail?movieId=${castMedia.id}">`;
                if(posterPath!==''){
                    structure+=`<img src="${posterPath}">`;
                } else {
                    structure+=`<img src="/dist/image/no_image.png">`;
                }
                structure+=`</a></div>`;
                mediaDiv.innerHTML=structure;
                document.querySelector('.personMovieInfo').appendChild(mediaDiv);
            } else {
                document.querySelector('.personTvList').style.display='block';
                const mediaDiv = document.createElement('div');
                mediaDiv.classList.add('personTvOne');
                let structure='';
                structure=`<div class="mediaLeftInfo">
                            <div class="mlTitle">${castMedia.name}</div>
                            <div class="mDepart" data-id="${castMedia.id}"></div>
                            <div class="mlData">${castMedia.first_air_date.replaceAll("-",".")}</div>
                        </div>
                        <div class="mediaRightInfo">
                            <a href="#">`;
                if(posterPath!==''){
                    structure+=`<img src="${posterPath}">`;
                } else {
                    structure+=`<img src="/dist/image/no_image.png">`;
                }
                mediaDiv.innerHTML=structure;
                document.querySelector('.personTvInfo').appendChild(mediaDiv);
            }
        }
    }
    //crew(제작참여)
    if(result.crew.length>0){
        const uniqueMedia = result.crew.filter(
            (obj, idx) => {
                return ( result.crew.findIndex((obj2) => {
                        return obj.backdrop_path === obj2.backdrop_path }) === idx
                )
            }
        )
        //중복제거한 후 출력
        for(let crewMedia of uniqueMedia){
            const posterPath = crewMedia.poster_path ? `${imageBaseUrl}${crewMedia.poster_path}` : '';
            if(crewMedia.media_type==='movie'){
                document.querySelector('.personMovieList').style.display='block';
                const mediaDiv = document.createElement('div');
                mediaDiv.classList.add('personMovieOne');
                let structure='';
                structure=`<div class="mediaLeftInfo">
                            <div class="mlTitle">${crewMedia.title}</div>
                            <div class="mDepart" data-id="${crewMedia.id}"></div>
                            <div class="mlData">${crewMedia.release_date.replaceAll("-",".")}</div>
                        </div>
                        <div class="mediaRightInfo">
                            <a href="/movie/detail?movieId=${crewMedia.id}">`;
                if(posterPath!==''){
                    structure+=`<img src="${posterPath}">`;
                } else {
                    structure+=`<img src="/dist/image/no_image.png">`;
                }
                structure+=`</a></div>`;
                mediaDiv.innerHTML=structure;
                document.querySelector('.personMovieInfo').appendChild(mediaDiv);
            } else {
                document.querySelector('.personTvList').style.display='block';
                const mediaDiv = document.createElement('div');
                mediaDiv.classList.add('personTvOne');
                let structure='';
                structure=`<div class="mediaLeftInfo">
                            <div class="mlTitle">${crewMedia.name}</div>
                            <div class="mDepart" data-id="${crewMedia.id}"></div>
                            <div class="mlData">${crewMedia.first_air_date.replaceAll("-",".")}</div>
                        </div>
                        <div class="mediaRightInfo">
                            <a href="#">`;
                if(posterPath!==''){
                    structure+=`<img src="${posterPath}">`;
                } else {
                    structure+=`<img src="/dist/image/no_image.png">`;
                }
                structure+=`</a></div>`;
                mediaDiv.innerHTML=structure;
                document.querySelector('.personTvInfo').appendChild(mediaDiv);
            }
        }
        for(let cast of result.cast){
            const character = `${cast.character}`;
            if(character!==null) {
                const mediaDepart = document.querySelector(`.mDepart[data-id="${cast.id}"]`);
                if(mediaDepart){
                    mediaDepart.innerHTML+=`<span>출연</span>`;
                }
            }

        }
        for(let crew of result.crew){
            const job = `${crew.department}`;
            let jobText = '';
            if(job==='Writing') jobText='각본';
            if(job==='Directing') jobText='감독';
            if(job==='Creator') jobText='제작';

            const mediaDepart = document.querySelector(`.mDepart[data-id="${crew.id}"]`);
            if(mediaDepart){
                mediaDepart.innerHTML+=`<span>${jobText}</span>`;
            }
        }
    }
})

async function personDetail(personId){
    try{
        const response = await fetch(`https://api.themoviedb.org/3/person/${personId}?language=ko-KR`, options)
        const result = await response.json();
        return result;
    } catch(err){
        console.log("person not find : "+err);
    }
}

async function credits(personId){
    try{
        const response = await fetch(`https://api.themoviedb.org/3/person/${personId}/combined_credits?language=ko-KR`, options)
        const result = await response.json();
        return result;
    } catch(err){
        console.log("person not find : "+err);
    }
}

async function personSNS(personId){
    try{
        const response = await fetch(`https://api.themoviedb.org/3/person/${personId}/external_ids`, options)
        const result = await response.json();
        return result;
    } catch(err){
        console.log("person not find : "+err);
    }
}
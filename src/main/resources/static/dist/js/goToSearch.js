document.querySelector('.searchBtn').addEventListener('click',()=>{
    if(document.querySelector('.searchInput').value==''){
        alert('검색어를 입력해주세요.');
    } else {
        let keyword = document.querySelector('.searchInput');
        window.location.href=`/movie/searchResult?keyword=${keyword.value}`;
        console.log(keyword.value);
        searchMovieList(keyword.value).then(r=>{
            console.log(r);
        })
    }
})
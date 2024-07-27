document.querySelector('.searchBtn').addEventListener('click',()=>{
    let keyword = document.querySelector('.searchInput');
    window.location.href=`/movie/searchResult?keyword=${keyword.value}`;
    console.log(keyword.value);
    searchMovieList(keyword.value).then(r=>{
        console.log(r);
    })
})
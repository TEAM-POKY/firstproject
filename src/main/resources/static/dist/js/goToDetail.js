console.log("goToDetail js in");
document.addEventListener('click', function (event) {
    var clickedElement = event.target;

    // 클릭된 요소가 div인지 확인하고, 원하는 div 요소를 찾을 때까지 부모 요소로 거슬러 올라감
    while (clickedElement) {
        if (clickedElement.className === 'nowPlayingMovie') {
            var divId = clickedElement.id;
            console.log('Clicked div id:', divId);
            break;
        }
        clickedElement = clickedElement.parentElement;
    }
});


async function movieIdToServer(movieId){
    try {
        const url = "/movie/detail/"+movieId;
        const config = {
            method : "GET",
            headers : {
                "Content-type":"application/json; charset=UTF-8"
            },
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error){
        console.log(error);
    }
}

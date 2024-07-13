console.log("goToDetail js in");
document.addEventListener('click', function (event) {
    var clickedElement = event.target;
    while (clickedElement) {
        if (clickedElement.className === 'nowPlayingMovie') {
            var link = document.getElementById('movieLink').href;
            window.location.href = link;
            break;
        }
        clickedElement = clickedElement.parentElement;
    }
});


function slideSpeed(speed) {
    document.querySelector('.nowPlayingOutBox').style.transform += 'translateX(-100%)';
    document.querySelector('.nowPlayingOutBox').style.transition = `${speed}s`;
}

function slideSpeed2(speed) {
    document.querySelector('.nowPlayingOutBox').style.transform += 'translateX(100%)';
    document.querySelector('.nowPlayingOutBox').style.transition = `${speed}s`;
}
let barWidth = 1400;

document.getElementById('rightBtn').addEventListener('click', () => {
        slideSpeed(1);
        // document.querySelector('.container').style.transform += 'translate(-100vw)';
        // document.querySelector('.container').style.transition = '1.5s';
    document.querySelector('.nowPlayingOutBox').style.overflow = 'visible';
    document.querySelector('.nowPlayingOutBox').style.width = `${barWidth}px`;
        // barWidth += 70;
    });


document.getElementById('leftBtn').addEventListener('click', () => {
        slideSpeed2(1);
        // document.querySelector('.container').style.transform += 'translate(-100vw)';
        // document.querySelector('.container').style.transition = '1.5s';
    document.querySelector('.nowPlayingOutBox').style.overflow = 'visible';
    document.querySelector('.nowPlayingOutBox').style.width = `${barWidth}px`;
        // barWidth += 70;
    });

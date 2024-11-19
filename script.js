const video = document.getElementById('video');
const rewindButton = document.getElementById('rewind');
const forwardButton = document.getElementById('forward');
const episodeButtons = document.querySelectorAll('.episode-list button');


rewindButton.addEventListener('click', () => (video.currentTime -= 10));
forwardButton.addEventListener('click', () => (video.currentTime += 10));


episodeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const newSrc = button.getAttribute('data-src');
        video.src = newSrc;
       
    });
});

document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', () => {
        const isZoomed = img.classList.contains('zoomed');
        if (isZoomed) {
            img.classList.remove('zoomed');
            document.body.classList.remove('zoom-active');
        } else {
            document.querySelectorAll('.zoomable.zoomed').forEach(zoomedImg => {
                zoomedImg.classList.remove('zoomed');
            });
            img.classList.add('zoomed');
            document.body.classList.add('zoom-active');
        }
    });
});





const episodeList = document.querySelector('.episode-list');

let isDown = false;
let startX;
let scrollLeft;

episodeList.addEventListener('mousedown', (e) => {
    isDown = true;
    episodeList.classList.add('dragging');
    startX = e.pageX - episodeList.offsetLeft;
    scrollLeft = episodeList.scrollLeft;
});

episodeList.addEventListener('mouseleave', () => {
    isDown = false;
    episodeList.classList.remove('dragging');
});

episodeList.addEventListener('mouseup', () => {
    isDown = false;
    episodeList.classList.remove('dragging');
});

episodeList.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - episodeList.offsetLeft;
    const walk = (x - startX) * 2; // Швидкість прокрутки
    episodeList.scrollLeft = scrollLeft - walk;
});

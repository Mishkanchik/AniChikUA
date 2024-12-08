const video = document.getElementById('video');
const rewindButton = document.getElementById('rewind');
const forwardButton = document.getElementById('forward');
const episodeButtons = document.querySelectorAll('.episode-list button');


rewindButton.addEventListener('click', () => (video.currentTime -= 10));
forwardButton.addEventListener('click', () => (video.currentTime += 10));


episodeButtons.forEach(button => {
    button.addEventListener('click', () => {
       
        document.querySelector('.episode-list button.active')?.classList.remove('active');
        button.classList.add('active');

      
        video.src = button.getAttribute('data-src');
        
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
    const walk = (x - startX) * 2; 
    episodeList.scrollLeft = scrollLeft - walk;
});






const submitButton = document.getElementById('submit-btn');
const usernameInput = document.getElementById('username');
const descriptionInput = document.getElementById('description');
const commentsContainer = document.getElementById('comments-container');


window.addEventListener('load', () => {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    savedComments.forEach(comment => {
        displayComment(comment.username, comment.description);
    });
});

submitButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!username || !description) {
        alert('Please fill in both fields!');
        return;
    }


    const comment = { username, description };
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    savedComments.push(comment);
    localStorage.setItem('comments', JSON.stringify(savedComments));

    displayComment(username, description);


    usernameInput.value = '';
    descriptionInput.value = '';
});

function displayComment(username, description) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comments';
    const commentHr = document.createElement('hr');

    const nameHeading = document.createElement('h3');
    nameHeading.className = 'name';
    nameHeading.innerHTML = `<i>${username}</i>`;

    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.className = 'user-description';
    descriptionParagraph.textContent = description;

    commentDiv.appendChild(nameHeading);
    commentDiv.appendChild(commentHr);
    commentDiv.appendChild(descriptionParagraph);

    commentsContainer.appendChild(commentDiv);
}

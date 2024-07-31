console.log("random Comment js in");
async function fetchRandomComments() {
    try {
        const response = await fetch('/api/comments/random'); // 수정된 URL
        const comments = await response.json();
        console.log("comment >>>> ", comments);
        return comments;
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

async function getDetail(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, options);
        if (!response.ok) {
            throw new Error('Movie details not found');
        }
        const result = await response.json();
        return result;
    } catch (err) {
        console.error('Error fetching movie details:', err);
        throw err;
    }
}


async function displayComments(comments) {
    const commentContainer = document.querySelector('.commentInBox');
    commentContainer.innerHTML = '';

    for (const comment of comments) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        const movieId = comment.mediaId;

        try {
            const result = await getDetail(movieId);
            const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
            const posterPath = result.poster_path ? `${imageBaseUrl}${result.poster_path}` : '기본 포스터 url';

            const commentContent = `
                <img class="mainposter" src="${posterPath}" alt="포스터">
                <small class="commentThing commentContents">${comment.content}</p>
                <hr>
                <small class="commentThing commentWriter">${comment.email}</small>
                <button type="button">+</button>
            `;
            commentDiv.innerHTML = commentContent;
            commentContainer.appendChild(commentDiv);
        } catch (error) {
            console.error('Error displaying comment details:', error);
        }
    }
}

window.onload = async () => {
    const comments = await fetchRandomComments();
    if (comments) {
        await displayComments(comments);
    }
};

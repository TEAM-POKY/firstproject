console.log("topMovieSlide js in");
(function() {
let currentSlide = 0;
const slideWidth = 1380;
const visibleItems = 5;

const slideSpeed = (speed) => {
    const innerContainer = document.querySelector('.innerContainer2');
    const movieItems = innerContainer.querySelectorAll('.topMovie').length;
    const maxSlide = movieItems - visibleItems;

    if (currentSlide < maxSlide) {
        currentSlide++;
        innerContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        innerContainer.style.transition = `transform ${speed}s`;
    }

    updateButtonVisibility();
};

const slideSpeed2 = (speed) => {
    if (currentSlide > 0) {
        currentSlide--;
        document.querySelector('.innerContainer2').style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        document.querySelector('.innerContainer2').style.transition = `transform ${speed}s`;
    }

    updateButtonVisibility();
};

document.getElementById('rightBtn2').addEventListener('click', () => {
    slideSpeed(1);
    document.querySelector('.movieOutBox').style.overflow = 'hidden';
});

document.getElementById('leftBtn2').addEventListener('click', () => {
    slideSpeed2(1);
    document.querySelector('.movieOutBox').style.overflow = 'hidden';
});
const updateButtonVisibility = () => {
    const innerContainer = document.querySelector('.innerContainer2');
    const movieItems = innerContainer.querySelectorAll('.nowPlayingMovie').length;
    const visibleItems = 5;
    const maxSlide = movieItems/visibleItems;
    const leftBtn = document.getElementById('leftBtn2');
    const rightBtn = document.getElementById('rightBtn2');

    // console.log("max 슬라이드 개수 > > >", maxSlide);
    // console.log("보여줄 영화 개수 > > > ", movieItems);
    // console.log("슬라이드 개수 > > > ", currentSlide);

    leftBtn.style.display = (currentSlide > 0) ? 'block' : 'none';
    rightBtn.style.display = (currentSlide+1 < maxSlide) ? 'block' : 'none';
};


const fetchMovieData = async () => {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&region=KR', options);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
};
const displayMovies = async () => {
    const movies = await fetchMovieData();
    const innerContainer = document.querySelector('.innerContainer2');
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

    for (const movie of movies) {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('topMovieMain');

        const posterPath = movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : '';
        const movieDetails = `
                <div class="topMovie" style="cursor:pointer;" id="${movie.id}">
                    <img src="${posterPath}" alt="${movie.title} 포스터">
                    <ul>
                        <li>${movie.title}</li>
                        <li>${movie.release_date}</li>
                        <li>${movie.vote_average}</li>
                    </ul>
                </div>
            `;

        let currentSlide = 0;
        const slideWidth = 1380;
        const visibleItems = 5;

        const slideSpeed = (speed) => {
            const innerContainer = document.querySelector('.innerContainer');
            const movieItems = innerContainer.querySelectorAll('.nowPlayingMovie').length;
            const maxSlide = movieItems - visibleItems;

            if (currentSlide < maxSlide) {
                currentSlide++;
                innerContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
                innerContainer.style.transition = `transform ${speed}s`;
            }

            updateButtonVisibility();
        };

        const slideSpeed2 = (speed) => {
            if (currentSlide > 0) {
                currentSlide--;
                document.querySelector('.innerContainer').style.transform = `translateX(-${currentSlide * slideWidth}px)`;
                document.querySelector('.innerContainer').style.transition = `transform ${speed}s`;
            }

            updateButtonVisibility();
        };

        document.getElementById('rightBtn2').addEventListener('click', () => {
            slideSpeed(1);
            document.querySelector('.movieOutBox').style.overflow = 'hidden';
        });

        document.getElementById('leftBtn2').addEventListener('click', () => {
            slideSpeed2(1);
            document.querySelector('.movieOutBox').style.overflow = 'hidden';
        });
        const updateButtonVisibility = () => {
            const innerContainer = document.querySelector('.innerContainer2');
            const movieItems = innerContainer.querySelectorAll('.nowPlayingMovie').length;
            const visibleItems = 5;
            const maxSlide = movieItems/visibleItems;
            const leftBtn = document.getElementById('leftBtn2');
            const rightBtn = document.getElementById('rightBtn2');

            // console.log("max 슬라이드 개수 > > >", maxSlide);
            // console.log("보여줄 영화 개수 > > > ", movieItems);
            // console.log("슬라이드 개수 > > > ", currentSlide);

            leftBtn.style.display = (currentSlide > 0) ? 'block' : 'none';
            rightBtn.style.display = (currentSlide+1 < maxSlide) ? 'block' : 'none';
        };
        //
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         accept: 'application/json',
        //         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmRmZTQ3YTQ0NzU2ZTI5MDAyNTcxNWE2YjQyZDhkNSIsIm5iZiI6MTcyMDU1MTg4Mi44MzAxMDcsInN1YiI6IjY2MDNkNTE3NjA2MjBhMDE3YzMwMjY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kW6FWbNBxEum0GSPLqFOf-LQu3BMA-50-IJXe_Hd3w8'
        //     }
        // };
        //
        // fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
        //     .then(response => response.json())
        //     .then(response => console.log(response))
        //     .catch(err => console.error(err));

        const fetchMovieData = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&region=KR', options);
                const data = await response.json();
                return data.results;
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };
        const displayMovies = async () => {
            const movies = await fetchMovieData();
            const innerContainer = document.querySelector('.innerContainer2');
            const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

            for (const movie of movies) {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('topMovieMain');

                const posterPath = movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : '';
                const movieDetails = `
                <div class="topMovie" style="cursor:pointer;" id="${movie.id}">
                    <img src="${posterPath}" alt="${movie.title} 포스터">
                    <ul>
                        <li>${movie.title}</li>
                        <li>${movie.release_date}</li>
                        <li>${movie.vote_average}</li>
                    </ul>
                </div>
            `;
                movieDiv.innerHTML = movieDetails;
                innerContainer.appendChild(movieDiv);
            }
            updateButtonVisibility();
        };
        displayMovies();
        movieDiv.innerHTML = movieDetails;
        innerContainer.appendChild(movieDiv);
    }
    updateButtonVisibility();
};

displayMovies();

})();
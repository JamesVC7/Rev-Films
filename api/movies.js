// api/movies.js
const API_KEY = 'fdf614942e909e5778bdafb2f2f868bf'; 

export async function getMovies() {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=true&language=es-ES&page=1&sort_by=popularity.desc`);
  const data = await response.json();
  return data.results;
}

export async function getMovieVideos(movieId) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`);
  const data = await response.json();
  return data.results;
}

export async function getMovieByTitle(title) {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}&language=es-ES`);
  const data = await response.json();
  return data.results[0]; 
}

export async function getMovieReviews(movieId) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await response.json();
  return data.results.map(review => ({
    author: review.author,
    content: review.content,
    avatar_path: review.author_details.avatar_path,
    rating: review.author_details.rating,
  }));
}

export async function searchMovies(query) {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`);
  const data = await response.json();
  return data.results;
}

export async function getMovieImages(movieId) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`);
  const data = await response.json();
  return data.posters;
}

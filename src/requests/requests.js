const API_KEY = "310634ca62bc199b630aa5983cee3c0d";

const requests = {
    fetchGenres: `/genre/movie/list?api_key=${API_KEY}`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}`,
    fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}`,
    fetchPopular: `/movie/popular?api_key=${API_KEY}`,
    fetchPlaying: `/movie/now_playing?api_key=${API_KEY}`,
    fetchTrending: (media_type, time_window) => `/trending/${media_type}/${time_window}?api_key=${API_KEY}`,
    fetchDiscover: (genre = null, sort_by = 'popularity.desc') => `/discover/movie?with_genres=${genre}&sort_by=${sort_by}&api_key=${API_KEY}`,
    fetchById: (id) => `/movie/${id}?api_key=${API_KEY}`,
    fetchTrailers: (id) => `/movie/${id}/videos?api_key=${API_KEY}`
};

export default requests;
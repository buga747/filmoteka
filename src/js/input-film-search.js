import { renderMoviesOnInput } from './input-list-markup';
import { getFilmsByName } from './fetchApi';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { activateMovieModal } from './renderMovieCard';

const searchFormInputEl = document.querySelector('#searchQuery');
const inputContainer = document.querySelector('#search-list');

const DEBOUNCE_DELAY = 300;
searchFormInputEl.addEventListener(
  'input',
  debounce(onInputSearch, DEBOUNCE_DELAY)
);

function onInputSearch(evt) {
  const queryValue = evt.target.value;
  inputContainer.innerHTML = '';

  if (queryValue === '') {
    Notify.failure('Please type something');
    return;
  }

  getFilmsByName(queryValue)
    .then(({ results, total_results }) => {
      if (total_results === 0 && queryValue !== 0) {
        Notify.failure('Sorry, film is not found');
      }
      if (results === undefined || results.length === 0) {
        inputContainer.innerHTML = '';
      } else {
        renderMoviesOnInput(results);
        activateMovieModal();
        //  pagination.reset(data.totalHits);
        //  pagination.on('beforeMove', e => {
        //    page = e.page;
        //    fetchPixabayAPI(query, page, perPage).then(({ data }) => {
        //      renderGallery(data.hits);
        //      onSimplelightboxAdd();
        //      window.scrollTo({
        //        behavior: 'smooth',
        //        top: 0,
        //      });
        //    });
        //  });
      }
    })
    .catch(err => console.log(err));
}

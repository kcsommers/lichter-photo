import './styles/main.scss';
import { Storage } from './core/storage';
import { log } from './core/helpers/utils';
import { Image } from './pages/photoshelter/image/image.photoshelter';
import { GalleryCollection } from './pages/photoshelter/gallery-collection/gallery-collection.photoshelter';
import { Search } from './pages/photoshelter/search/search.photoshelter';
import { SearchResults } from './pages/photoshelter/search-results/search-results.photoshelter';
import { Archive } from './pages/photoshelter/archive/archive.photoshelter';

const loadScript = () => {
  const pathStart = 'https://lichterphoto.photoshelter.com';

  const path = window.location.pathname.replace(pathStart, '');
  log('PATH:::: ', path, window.location);

  if (
    (path === '/index' || path === '/') &&
    (!window.location.href || !window.location.href.includes('?edit'))
  ) {
    window.location = 'https://lichterphoto.com';
    return;
  }

  if (path.startsWith('/image') || path.startsWith('/gallery-image')) {
    // /image === from search results
    // /gallery-image === from gallery

    Image.init();

    // import(
    //   /* webpackChunkName: "image" */
    //   './page-scripts/image'
    // )
    //   .then(m => m.Image.init())
    //   .catch(err => console.error(err));

    return 'image';
  }

  if (path.startsWith('/gallery-collection')) {
    localStorage.removeItem(Storage.SEARCH_DETAILS);
    GalleryCollection.init();

    // import(
    //   /* webpackChunkName: "gallery-collection" */
    //   './page-scripts/gallery-collection'
    // )
    //   .then(m => m.GalleryCollection.init())
    //   .catch(err => console.error(err));

    return 'gallery-collection';
  }

  if (path.startsWith('/search-page')) {
    localStorage.removeItem(Storage.SEARCH_DETAILS);
    Search.init();

    // import(
    //   /* webpackChunkName: "search-page" */
    //   './page-scripts/search-page'
    // )
    //   .then(m => m.SearchPage.init())
    //   .catch(err => console.error(err));

    return 'search-page';
  }

  if (path.startsWith('/search') && !path.startsWith('/search-page')) {
    SearchResults.init();

    // import(
    //   /* webpackChunkName: "search" */
    //   './page-scripts/search'
    // )
    //   .then(m => m.Search.init())
    //   .catch(err => console.error(err));

    return 'search';
  }

  if (path.startsWith('/archive')) {
    localStorage.removeItem(Storage.SEARCH_DETAILS);
    Archive.init();

    // import(
    //   /* webpackChunkName: "search" */
    //   './page-scripts/search'
    // )
    //   .then(m => m.Search.init())
    //   .catch(err => console.error(err));

    return 'archive';
  }

  localStorage.removeItem(Storage.SEARCH_DETAILS);
  return '';
};

(function () {
  const page = loadScript();

  log('PAGE:::: ', page);

  if (page) {
    const html = document.querySelector('html');
    if (html) {
      html.classList.add('kc-page');
      html.classList.add(`kc-${page}-page`);
    }
  } else {
    log('Removing QUERY_DATA from storage');
    localStorage.removeItem(Storage.QUERY_DATA);
  }
})();

import './styles/main.scss';
import { Storage } from './storage';
import { log } from './utils';
import { Image } from './page-scripts/image';
import { GalleryCollection } from './page-scripts/gallery-collection';
import { SearchPage } from './page-scripts/search-page';
import { Search } from './page-scripts/search';

const loadScript = () => {

  const pathStart = 'https://lichterphoto.photoshelter.com';
  const path = window.location.pathname.replace(pathStart, '');

  log('PATH:::: ', path);

  if (path === '/index' || path === '/') {
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

    GalleryCollection.init();

    // import(
    //   /* webpackChunkName: "gallery-collection" */
    //   './page-scripts/gallery-collection'
    // )
    //   .then(m => m.GalleryCollection.init())
    //   .catch(err => console.error(err));

    return 'gallery-collection'
  }

  if (path.startsWith('/search-page')) {

    SearchPage.init();

    // import(
    //   /* webpackChunkName: "search-page" */
    //   './page-scripts/search-page'
    // )
    //   .then(m => m.SearchPage.init())
    //   .catch(err => console.error(err));

    return 'search-page';
  }

  if (path.startsWith('/search') && !path.startsWith('/search-page')) {

    Search.init();

    // import(
    //   /* webpackChunkName: "search" */
    //   './page-scripts/search'
    // )
    //   .then(m => m.Search.init())
    //   .catch(err => console.error(err));

    return 'search';
  }

  return '';
};


(function () {

  const page = loadScript();

  log('PAGE:::: ', page)

  if (page) {

    const html = document.querySelector('html');
    if (html) {
      html.classList.add('kc-page');
      html.classList.add(`kc-${page}-page`);
    }

  } else {
    localStorage.removeItem(Storage.QUERY_DATA);
  }

})();

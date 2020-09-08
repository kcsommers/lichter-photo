import './styles/main.scss';
import { Storage } from './storage';
import { log } from './utils';



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
    return 'image';
  }

  if (path.startsWith('/gallery-collection')) {
    import(
      /* webpackChunkName: "gallery-collection" */
      './page-scripts/gallery-collection'
    )
      .then(m => m.GalleryCollection.init())
      .catch(err => console.error(err));

    return 'gallery-collection'
  }

  if (path.startsWith('/gallery') && !path.startsWith('/gallery-collection')) {
    import(
      /* webpackChunkName: "gallery" */
      './page-scripts/gallery'
    )
      .then(m => m.Gallery.init())
      .catch(err => console.error(err));

    return 'gallery';
  }

  if (path.startsWith('/search-page')) {
    return 'search-page';
  }

  if (path.startsWith('/search') && !path.startsWith('/search-page')) {
    import(
      /* webpackChunkName: "search" */
      './page-scripts/search'
    )
      .then(m => m.Search.init())
      .catch(err => console.error(err));

    return 'search';
  }

  return '';
};


(function () {

  const page = loadScript();

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

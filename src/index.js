import { ArlenNess } from './page-scripts/arlen-ness';
import { Gallery } from './page-scripts/gallery';
import { GalleryCollection } from './page-scripts/gallery-collection';
import { Search } from './page-scripts/search';
import { SearchPage } from './page-scripts/search-page';
import { Image } from './page-scripts/image';
import './styles/main.scss';
import { Storage } from './storage';

const getPage = (url) => {
  const pathStart = 'https://lichterphoto.photoshelter.com';
  const path = url.replace(pathStart, '');
  if (path.startsWith('/image') || path.startsWith('/gallery-image')) {
    // /image === from search results
    // /gallery-image === from gallery
    Image();
    return 'image';
  }
  if (/\/gallery\//.test(path)) {
    Gallery(path);
    return 'gallery';
  }
  if (path.startsWith('/search-page')) {
    SearchPage();
    return 'search-page';
  }
  if (path.startsWith('/search') && !path.startsWith('/search-page')) {
    Search();
    return 'search';
  }

  // if (/\/arlen-ness\//.test(path)) {
  //   ArlenNess();
  //   return 'arlen-ness';
  // }
  // if (/\/gallery-collection\//.test(path)) {
  //   GalleryCollection();
  //   return (path.match(/By-Builder/)) ? 'gallery-collection' : null;
  // }
  return null;
};

const page = getPage(window.location.href);
if (!page) {
  localStorage.removeItem(Storage.QUERY_DATA);
} else {
  const html = document.querySelector('html');
  if (html) {
    html.classList.add('kc-page');
    html.classList.add(`kc-${page}-page`);
  }
}

// const lazyLoadScript = async (page) => {
//   switch (page) {
//     case 'ness': {
//       const { default: script } = await import(
//         /* webpackChunkName: "arlen-ness" */
//         './page-scripts/arlen-ness'
//       );
//       return script;
//     }
//     case 'gallery': {
//       const { default: script } = await import(
//         /* webpackChunkName: "gallery" */
//         './page-scripts/gallery'
//       );
//       return script;
//     }
//     case 'search': {
//       const { default: script } = await import(
//         /* webpackChunkName: "search" */
//         './page-scripts/search'
//       );
//       return script;
//     }
//     case 'gallery-collection': {
//       const { default: script } = await import(
//         /* webpackChunkName: "gallery-collection" */
//         './page-scripts/gallery-collection'
//       );
//       return script;
//     }
//   }
// };

// (function () {
//   console.log('Index script')
//   const path = window.location.pathname;
//   const page = getPage(path);
//   if (page) {
//     const loadedScript = lazyLoadScript(page);
//   } else {
//     localStorage.removeItem('lp-queryData');
//   }
// })();


// Dynamic Import
// function getComponent() {
//   return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
//     const element = document.createElement('div');
//     element.innerHTML = _.join(['Hello', 'webpack', '']);
//     return element;
//   }).catch(error => 'An error occured while loading the component');
// }

// getComponent().then(component => {
//   document.body.appendChild(component);
// });

// // Lazy Loading
// function component() {
//   const element = document.createElement('div');
//   const button = document.createElement('button');
//   const br = document.createElement('br');

//   button.innerHTML = 'Click me and look at the console!';
//   element.appendChild(br);
//   element.appendChild(button);

//   button.onclick = e => import(/* webpackChunkName: "anotherModule" */ './another-module').then(module => {
//     const another = module.default; // "default" is the actual module
//     another();
//   });

//   return element;
// }

// document.body.appendChild(component());
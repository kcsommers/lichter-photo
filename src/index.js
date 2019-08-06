import { ArlenNess } from './page-scripts/arlen-ness';
import { Gallery } from './page-scripts/gallery';
import { GalleryCollection } from './page-scripts/gallery-collection';
import { Search } from './page-scripts/search';
import './styles/main.scss';

const getPage = (path) => {
  if (/\/arlen-ness\//.test(path)) {
    ArlenNess();
    return 'arlen-ness';
  }
  if (/\/gallery-collection\//.test(path)) {
    GalleryCollection();
    return (path.match(/By-Builder/)) ? 'gallery-collection' : null;
  }
  if (/\/gallery\//.test(path)) {
    Gallery(path);
    return 'gallery';
  }
  if (/\/search?/.test(path)) {
    Search();
    return 'search';
  }
  return null;
};

const page = getPage(window.location.href);
if (!page) {
  localStorage.removeItem('lp-queryData');
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
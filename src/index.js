const getPage = (path) => {
  if (/\/gallery-collection\//.test(path)) {
    return (path.match(/By-Builder/)) ? 'gallery-collection' : null;
  }
  if (/\/gallery\//.test(path)) {
    return 'gallery';
  }
  if (/\/search?/.test(path)) {
    return 'search';
  }
  return null;
};

const loadScript = async (page) => {
  switch (page) {
    case 'gallery': {
      const { default: script } = await import(
        /* webpackChunkName: "GalleryScript" */
        './page-scripts/gallery'
      );
      return script;
    }
    case 'search': {
      const { default: script } = await import(
        /* webpackChunkName: "SearchScript" */
        './page-scripts/search'
      );
      return script;
    }
    case 'gallery-collection': {
      const { default: script } = await import(
        /* webpackChunkName: "GalleryCollectionScript" */
        './page-scripts/gallery-collection'
      );
      return script;
    }
  }
};

(function () {
  const path = window.location.pathname;
  const page = getPage(path);
  if (page) {
    const loadedScript = loadScript(page);
  } else {
    localStorage.removeItem('lp-queryData');
  }
})();


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

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

// Lazy Loading
function component() {
  const element = document.createElement('div');
  const button = document.createElement('button');
  const br = document.createElement('br');

  button.innerHTML = 'Click me and look at the console!';
  element.appendChild(br);
  element.appendChild(button);

  button.onclick = e => import(/* webpackChunkName: "anotherModule" */ './another-module').then(module => {
    const another = module.default;
    another();
  });

  return element;
}

document.body.appendChild(component());
import { appendFilterTags, constructQuery } from '../filter-tags';

export const Gallery = (path) => {
  const { gID, cID } = parsePath(path);
  const url = (gID && cID) ? `https://lichterphoto.photoshelter.com/gallery/${gID}/${cID}?full_gallery=true` : `${path}?full_gallery=true`;
  // store gID and cID in local storage if they exist
  if (gID && cID) {
    localStorage.setItem('lp-queryData', JSON.stringify(Object.assign({ gID, cID }, { url })));
  }
  // set the window location to showcase search page on initial gallery visit
  if (!/full_gallery=true/.test(path)) {
    window.location = constructQuery(gID, cID, 'showcase');
  }
  // append filter tags when dom is loaded
  document.addEventListener('DOMContentLoaded', appendFilterTags.bind(this, gID, cID, url, 'name', 'viewAll'));
};

const parsePath = (path) => {
  // split up the path to get the cID and gID
  const pathSplit = path.split('/');
  const cID = pathSplit[pathSplit.length - 1];
  const gIDMaybe = pathSplit[pathSplit.length - 2];
  const gID = (parseInt(gIDMaybe, 10) || gIDMaybe === '0') ? pathSplit[pathSplit.length - 3] : gIDMaybe;
  return { gID, cID }
};

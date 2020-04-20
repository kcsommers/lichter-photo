import { constructQuery } from '../dom';
import { Storage } from '../storage';

/**
 * Gallery page will never fully load
 * it will be redirected to search results page
 */

export const Gallery = (path) => {
  const { gID, cID } = parsePath(path);
  if (gID && cID) {
    const url = `https://lichterphoto.photoshelter.com/gallery/${gID}/${cID}`;
    localStorage.setItem(Storage.QUERY_DATA, JSON.stringify({ gID, cID, url }));
    // redirect window to search page, with showcase as search term
    window.location = constructQuery(gID, cID, 'showcase');
  }
};

const parsePath = (path) => {
  // split up the path to get the cID and gID
  const pathSplit = path.split('/');
  const cID = pathSplit[pathSplit.length - 1];
  const gIDMaybe = pathSplit[pathSplit.length - 2];
  const gID = (parseInt(gIDMaybe, 10) || gIDMaybe === '0') ? pathSplit[pathSplit.length - 3] : gIDMaybe;
  return { gID, cID }
};

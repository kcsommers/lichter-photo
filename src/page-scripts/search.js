import { appendFilterTags } from '../filter-tags';

export const Search = () => {
  const { gID, cID, searchTerm } = parsePath(window.location.href);
  const url = (gID && cID) ? `https://lichterphoto.photoshelter.com/gallery/${gID}/${cID}?full_gallery=true` : `${path}?full_gallery=true`;
  // store gID and cID in local storage if they exist
  if (gID && cID) {
    localStorage.setItem('lp-queryData', JSON.stringify(Object.assign({ gID, cID, searchTerm }, { url })));
  }
  // append filter tags when dom is loaded
  document.addEventListener('DOMContentLoaded', appendFilterTags.bind(this, gID, cID, url, 'name', searchTerm || 'viewAll'));
};

const parsePath = (path) => {
  let gID, cID, searchTerm;
  const gIDMatch = path.match(/(G_ID=)(.*?)(?=&)/)
  const cIDMatch = path.match(/(C_ID=)(.*?)(?=&)/);
  const searchTermMatch = path.match(/(I_DSC=)(.*?)(?=&)/);
  // If the path contains gID and cID, return their values
  if (gIDMatch && cIDMatch) {
    gID = gIDMatch[0].split('G_ID=')[1];
    cID = cIDMatch[0].split('C_ID=')[1];
    searchTerm = searchTermMatch ? searchTermMatch[0].split('I_DSC=')[1] : null;
  } else {
    // Otherwise look for it in local storage
    const storageData = localStorage.getItem('lp-queryData');
    if (storageData) {
      const queryData = JSON.parse(storageData);
      cID = queryData.cID;
      gID = queryData.gID;
      searchTerm = queryData.searchTerm;
    }
  }
  return { gID, cID, searchTerm }
};
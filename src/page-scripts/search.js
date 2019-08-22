import { appendFilterTags, appendPortraitCheckbox } from '../dom';

export const Search = () => {
  const path = window.location.href;
  const { gID, cID, searchTerm } = parsePath(path);
  const url = (gID && cID) ? `https://lichterphoto.photoshelter.com/gallery/${gID}/${cID}?full_gallery=true` : `${path}?full_gallery=true`;
  // store gID and cID in local storage if they exist
  if ((gID && cID) || searchTerm) {
    localStorage.setItem('lp-queryData', JSON.stringify(Object.assign({ gID, cID, searchTerm }, { url })));
  }
  // append filter tags when dom is loaded
  document.addEventListener('DOMContentLoaded', () => {
    appendFilterTags(gID, cID, url, 'name', searchTerm || 'viewAll');
    appendPortraitCheckbox(searchTerm, /\+portrait/i.test(searchTerm));
  });
};

const parsePath = (path) => {
  const storageData = localStorage.getItem('lp-queryData') && JSON.parse(localStorage.getItem('lp-queryData'));
  const gIDMatch = path.match(/(G_ID=)(.*?)(?=&)/);
  const cIDMatch = path.match(/(C_ID=)(.*?)(?=&)/);
  const searchTermMatch = path.match(/(I_DSC=)(.*?)(?=&)/);
  let gID, cID, searchTerm;
  if (gIDMatch) {
    gID = gIDMatch[2];
  } else if (storageData && storageData.gID) {
    gID = storageData.gID;
  }
  if (cIDMatch) {
    cID = cIDMatch[2];
  } else if (storageData && storageData.cID) {
    cID = storageData.cID;
  }
  if (searchTermMatch) {
    searchTerm = searchTermMatch[2];
  } else if (storageData && storageData.searchTerm) {
    searchTerm = storageData.searchTerm;
  }
  return { gID, cID, searchTerm }
};
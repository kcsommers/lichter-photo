import { appendFilterTags, appendPortraitCheckbox } from '../dom';
import { Storage } from '../storage';
import { getGalleryInfo } from '../photoshelter-api';

export const Search = () => {
  const path = window.location.href;
  const { gID, cID, searchTerm } = parsePath(path);
  const url = (gID && cID) ? `https://lichterphoto.photoshelter.com/gallery/${gID}/${cID}?full_gallery=true` : `${path}?full_gallery=true`;
  console.log('GID', gID);
  console.log('cID', cID);
  console.log('seaterm', searchTerm);

  // @TODO add class to body or html to hide initial content with css

  // append filter tags when dom is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // if theres no gallery id, we're coming directly from search page
    if (!gID) {
      console.log('CAME FROM SEARCH PAGE', searchTerm);
      appendFilterTags('', '', 'viewAll');
      appendPortraitCheckbox('', /\+portrait/i.test(''));
      return;
    }

    // Remove 'Search Result' text from title
    const c1Title = document.querySelector('.c1title');
    if (c1Title) {
      c1Title.textContent = '';
    }

    // remove brackets from images found
    const imgsFound = document.querySelector('.name');
    if (imgsFound) {
      imgsFound.textContent = imgsFound.textContent.replace(/[\{\}(found)]/g, '').trim();
    }

    // remove image labels
    const imageDivs = document.querySelectorAll('.image');
    const infoDivs = document.querySelectorAll('.info');
    for (let i = 0; i < imageDivs.length; i++) {
      imageDivs[i].removeChild(infoDivs[i]);
    }

    // call photoshelter api to get gallery info
    getGalleryInfo(gID)
      .then(res => {
        if (res) {
          const resParsed = JSON.parse(res);
          if (resParsed.data && resParsed.data.Gallery && resParsed.data.Gallery.name) {
            // Update title with gallery name
            if (c1Title) {
              c1Title.textContent = resParsed.data.Gallery.name;
            }
          }
        }
      }).catch(err => console.error(err))

    // append tags
    let activeTag = 'viewAll';
    if (searchTerm.includes('showcase')) {
      activeTag = 'showcase';
    } else if (searchTerm.includes('featured')) {
      activeTag = 'featured';
    }
    appendFilterTags(gID, cID, activeTag);
    appendPortraitCheckbox(searchTerm, /\+portrait/i.test(searchTerm));
  });
};

const parsePath = (path) => {
  const queryData = localStorage.getItem(Storage.QUERY_DATA);
  const queryDataParsed = queryData && JSON.parse(queryData);

  const gIDMatch = path.match(/(G_ID=)(.*?)(?=&)/);
  const cIDMatch = path.match(/(C_ID=)(.*?)(?=&)/);
  const searchTermMatch = path.match(/(I_DSC=)(.*?)(?=&)/);

  let gID, cID, searchTerm;
  if (gIDMatch) {
    gID = gIDMatch[2];
  } else if (queryDataParsed && queryDataParsed.gID) {
    gID = queryDataParsed.gID;
  }
  if (cIDMatch) {
    cID = cIDMatch[2];
  } else if (queryDataParsed && queryDataParsed.cID) {
    cID = queryDataParsed.cID;
  }
  if (searchTermMatch) {
    searchTerm = searchTermMatch[2];
  } else if (queryDataParsed && queryDataParsed.searchTerm) {
    searchTerm = queryDataParsed.searchTerm;
  }
  return { gID, cID, searchTerm }
};
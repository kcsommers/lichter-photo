import { appendFilterTags, appendPortraitCheckbox } from '../dom';
import { Storage } from '../storage';
import { getGalleryInfo } from '../photoshelter-api';

export const Search = () => {
  const { gID, cID, searchTerm, isAnd } = parsePath(window.location.href);

  // append filter tags when dom is loaded
  document.addEventListener('DOMContentLoaded', () => {
    /**
     * Remove brackets from images found
     */
    const nameDiv = document.querySelector('.name');
    if (nameDiv) {
      nameDiv.textContent = nameDiv.textContent.replace(/[\{\}(found)]/g, '').trim();
    }

    // look for pagination div
    const paginationDiv = document.querySelector('.pagination');
    if (paginationDiv) {
      const nextTag = document.querySelector('.page_next');
      let nextUrl;
      if (nextTag) {
        nextUrl = `${nextTag.href}&I_DSC=${searchTerm}&${isAnd}&G_ID=${gID}&C_ID=${cID}`;
        nextTag.href = nextUrl;
      }
      const prevTag = document.querySelector('.page_previous');
      let prevUrl;
      if (prevTag) {
        prevUrl = `${prevTag.href}&I_DSC=${searchTerm}&${isAnd}&G_ID=${gID}&C_ID=${cID}`;
        prevTag.href = prevUrl;
      }
      document.addEventListener('keyup', (e) => {
        if (nextUrl && e.keyCode === 39) { // arrow right
          window.location = nextUrl;
        }
        if (prevUrl && e.keyCode === 37) { // arrow left
          window.location = prevUrl;
        }
      });
    }

    const c1Title = document.querySelector('.c1title');
    // if theres no gallery id, we're coming directly from search page
    if (!gID) {
      appendFilterTags('', '', searchTerm, isAnd);
      appendPortraitCheckbox(searchTerm, /\+portrait/i.test(searchTerm));
      if (c1Title) {
        c1Title.classList.add('kc-c1title-visible');
      }
    } else {
      appendFilterTags(gID, cID, searchTerm, isAnd);
      appendPortraitCheckbox(searchTerm, /\+portrait/i.test(searchTerm));
      // call photoshelter api to get gallery info
      getGalleryInfo(gID)
        .then(res => {
          if (res) {
            const resParsed = JSON.parse(res);
            if (resParsed.data && resParsed.data.Gallery && resParsed.data.Gallery.name) {
              // Update title with gallery name
              if (c1Title) {
                c1Title.textContent = resParsed.data.Gallery.name;
                c1Title.classList.add('kc-c1title-visible');
              }
            }
          }
        }).catch(err => console.error(err));
    }

    // fade in tags and imgs found
    if (nameDiv) {
      nameDiv.classList.add('kc-name-visible');
    }
  });
};

const parsePath = (path) => {
  const queryData = localStorage.getItem(Storage.QUERY_DATA);
  const queryDataParsed = queryData && JSON.parse(queryData);

  const gIDMatch = path.match(/(G_ID=)(.*?)(?=&)/);
  const cIDMatch = path.match(/(C_ID=)(.*?)(?=&)/);
  const searchTermMatch = path.match(/(I_DSC=)(.*?)(?=&)/);
  const isAndMatch = path.match(/(I_DSC_AND=)(t|f)/);

  let gID, cID, searchTerm, isAnd;
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
  if (isAndMatch) {
    isAnd = isAndMatch[0];
  }

  return { gID, cID, searchTerm, isAnd }
};
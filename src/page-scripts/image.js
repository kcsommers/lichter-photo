import { Storage } from "../storage";
import { getGalleryInfo } from "../photoshelter-api";
import { constructQuery } from "../dom";

export const Image = () => {
  document.addEventListener('DOMContentLoaded', () => {

    /***************
     * Center Prev/Next Arrows
     */
    const interactDiv = document.querySelector('.interact');
    const moreInfoDiv = document.querySelector('.more-info');
    const imgBoxSubDiv = document.querySelector('.imageBoxSub')
    if (interactDiv && moreInfoDiv && imgBoxSubDiv) {
      interactDiv.classList.add('kc-interact');
      const moreInfoWrap = document.createElement('div');
      moreInfoWrap.classList.add('kc-more-info-wrap');
      imgBoxSubDiv.classList.add('kc-imageBoxSub');
      moreInfoWrap.appendChild(moreInfoDiv);
      interactDiv.appendChild(moreInfoWrap);
    }

    /***************
     * Back to gallery link
     */
    // get gallery id from local storage
    const queryDataFromStorage = localStorage.getItem(Storage.QUERY_DATA);
    const queryData = queryDataFromStorage && JSON.parse(queryDataFromStorage);
    const backLink = document.querySelector('.search_results_link');
    if (queryData && queryData.gID && queryData.cID) {
      getGalleryInfo(queryData.gID)
        .then(res => {
          if (res) {
            const resParsed = JSON.parse(res);
            if (resParsed.data && resParsed.data.Gallery && resParsed.data.Gallery.name) {
              // Update title with gallery name
              if (backLink) {
                backLink.textContent = resParsed.data.Gallery.name;
                backLink.href = constructQuery(queryData.gID, queryData.cID, 'showcase');
                backLink.classList.add('kc-search-results-link-visible');
              }
            }
          }
        })
        .catch(err => console.error(err));
    } else {
      if (backLink) {
        backLink.classList.add('kc-search-results-link-visible');
      }
    }

    /***************
     * Remove Copyright
     */
    const dl = document.querySelector('dl');
    if (dl) {
      const cpLabel = dl.children[2];
      const cpName = dl.children[3];
      dl.removeChild(cpLabel);
      dl.removeChild(cpName);
    }

    // const imageGalleriesTags = document.querySelectorAll('.image_galleries');
    // const mainDiv = document.querySelector('#main');
    // if (mainDiv && imageGalleriesTags && imageGalleriesTags[0]) {
    //   const gallery = imageGalleriesTags[0].text;
    //   const href = imageGalleriesTags[0].href;
    //   const newTag = document.createElement('a');
    //   newTag.classList.add('kc-gallery-link');
    //   newTag.href = href;
    //   newTag.textContent = gallery;
    //   const newTagWrap = document.createElement('div');
    //   newTagWrap.classList.add('kc-gallery-link-wrap');
    //   newTagWrap.appendChild(newTag);
    //   mainDiv.insertBefore(newTagWrap, mainDiv.children[1]);
    // }

    /**************
     * Image size removal
     */
  });
};
import { Storage } from "../storage";
import { getGalleryInfo } from "../photoshelter-api";
import { constructSearchPageQuery } from "../dom";

export const Image = {

  init: function () {

    document.addEventListener('DOMContentLoaded', () => {

      this.centerNav();

      this.setBackLink();

      this.setAddToCartText();

      this.reorderShit();

    });

  },

  setAddToCartText: function () {
    const btn = document.querySelector('a.psCartAddLink');

    if (btn) {
      btn.textContent = 'Print Purchase Options';
      btn.classList.add('kc-add-to-cart-visible');
    }
  },

  centerNav: function () {
    const interactDiv = document.querySelector('.interact');
    const moreInfoDiv = document.querySelector('.more-info');
    const imgBoxSubDiv = document.querySelector('.imageBoxSub');

    if (interactDiv && moreInfoDiv && imgBoxSubDiv) {
      interactDiv.classList.add('kc-interact');
      const moreInfoWrap = document.createElement('div');
      moreInfoWrap.classList.add('kc-more-info-wrap');
      imgBoxSubDiv.classList.add('kc-imageBoxSub');
      moreInfoWrap.appendChild(moreInfoDiv);
      interactDiv.appendChild(moreInfoWrap);
    }
  },

  setBackLink: function () {
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
                backLink.href = constructSearchPageQuery(queryData.gID, queryData.cID, queryData.searchTerm || '', queryData.offset || '');
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
  },

  reorderShit: function () {
    const more = document.querySelector('.more');
    const dl = document.querySelector('dl');

    if (more && dl) {

      const printBtn = document.querySelector('.add_to_cart_link');
      const lightboxBtn = document.querySelector('.add_to_lightbox_link');

      const description = document.querySelector('.description');

      const filenameLabel = Array.from(dl.children).find(c => c.textContent === 'Filename');
      const filename = filenameLabel && filenameLabel.nextElementSibling;

      const keywordsList = document.querySelector('.keywords-list');
      const keywordsLabel = keywordsList && keywordsList.previousElementSibling;

      const galleriesLabel = Array.from(dl.children).find(c => c.textContent === 'Contained in galleries');
      const galleries = galleriesLabel && galleriesLabel.nextElementSibling;

      const newContainer = document.createElement('div');
      let newDl, newDl2;

      if (description) {
        more.removeChild(description);
        newContainer.appendChild(description);
      }

      if (filenameLabel) {
        newDl = document.createElement('dl');
        dl.removeChild(filenameLabel);
        newDl.appendChild(filenameLabel);
      }

      if (filename) {
        if (!newDl) {
          newDl = document.createElement('dl');
        }
        dl.removeChild(filename);
        newDl.appendChild(filename);
      }

      if (newDl) {
        newContainer.appendChild(newDl);
      }

      if (printBtn) {
        more.removeChild(printBtn);
        newContainer.appendChild(printBtn);
      }

      if (lightboxBtn) {
        more.removeChild(lightboxBtn);
        newContainer.appendChild(lightboxBtn);
      }

      if (keywordsLabel) {
        newDl2 = document.createElement('dl');
        dl.removeChild(keywordsLabel);
        newDl2.appendChild(keywordsLabel);
      }

      if (keywordsList) {
        if (!newDl2) {
          newDl2 = document.createElement('dl');
        }
        dl.removeChild(keywordsList);
        newDl2.appendChild(keywordsList);
      }

      if (galleriesLabel) {
        if (!newDl2) {
          newDl2 = document.createElement('dl');
        }
        dl.removeChild(galleriesLabel);
        newDl2.appendChild(galleriesLabel);
      }

      if (galleries) {
        if (!newDl2) {
          newDl2 = document.createElement('dl');
        }
        dl.removeChild(galleries);
        newDl2.appendChild(galleries);
      }

      if (newDl2) {
        newContainer.appendChild(newDl2);
      }

      more.prepend(newContainer);

    }


    // const printBtn = document.querySelector('.add_to_cart_link');
    // const lightboxBtn = document.querySelector('.add_to_lightbox_link');

    // const description = document.querySelector('.description');
    // const descriptionDiv = document.createElement('div');

    // const filenameLabel = document.querySelector('dl dt:first-child');
    // const filename = document.querySelector('dl dd:nth-child(2)');
    // const filenameDl = document.createElement('dl');

    // if (more) {
    //   more.removeChild(printBtn);
    //   more.removeChild(lightboxBtn);
    //   more.removeChild(description);

    //   dl.removeChild(filenameLabel);
    //   dl.removeChild(filename);

    //   descriptionDiv.appendChild(description);
    //   filenameDl.appendChild(filenameLabel);
    //   filenameDl.appendChild(filename);
    //   descriptionDiv.appendChild(filenameDl);

    //   more.prepend(lightboxBtn);
    //   more.prepend(printBtn);
    //   more.prepend(descriptionDiv);
    // }
  }

};
import { appendFilterTags, clampDescription } from '../dom';
import { getGalleryInfo } from '../photoshelter-api';
import { log, parsePath } from '../utils';
import { Storage } from '../storage';

export const Search = {

  queryParams: null,

  init: function () {

    // get query params from path
    this.queryParams = parsePath(window.location.href);
    localStorage.setItem(Storage.QUERY_DATA, JSON.stringify(this.queryParams));

    // Remove brackets from images found
    this.removeBracketsFromTotal();

    // update pagination arrows
    this.setPagination();

    // set gallery details
    this.setGalleryDetails();
  },

  removeBracketsFromTotal: function () {
    const nameDiv = document.querySelector('.name');
    if (nameDiv) {
      nameDiv.textContent = nameDiv.textContent.replace(/[\{\}(found)]/g, '').trim();
      nameDiv.classList.add('kc-name-visible');
    }
  },

  setPagination: function () {
    const paginationDiv = document.querySelector('.pagination');
    if (paginationDiv) {

      const appendedQuery = `&I_DSC=${this.queryParams.searchTerm}&I_DSC_AND=${this.queryParams.isAnd}&G_ID=${this.queryParams.gID}&C_ID=${this.queryParams.cID}`;

      const prevTag = document.querySelector('.page_previous');
      const nextTag = document.querySelector('.page_next');

      if (nextTag) {
        nextTag.href = nextTag.href + appendedQuery;
      }

      if (prevTag) {
        prevTag.href = prevTag.href + appendedQuery;
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
  },

  setGalleryDetails: function () {

    const c1Title = document.querySelector('.c1title');

    appendFilterTags(
      this.queryParams.gID || '',
      this.queryParams.cID || '',
      this.queryParams.searchTerm || '',
      this.queryParams.isAnd
    );

    // if theres no gallery id, we're coming directly from search page
    if (this.queryParams.gID) {

      // call photoshelter api to get gallery info
      getGalleryInfo(this.queryParams.gID)
        .then(res => {
          if (res) {
            const resParsed = JSON.parse(res);
            if (resParsed.data && resParsed.data.Gallery) {

              // gallery name
              if (resParsed.data.Gallery.name && c1Title) {
                c1Title.textContent = resParsed.data.Gallery.name;
                c1Title.classList.add('kc-c1title-visible');
              }

              // gallery description
              if (resParsed.data.Gallery.description) {
                const headerDiv = document.querySelector('.content div:first-child')
                if (headerDiv) {
                  const descDiv = document.createElement('div');
                  descDiv.classList.add('kc-description-wrap');
                  descDiv.classList.add('kc-fade-in');
                  descDiv.innerHTML = resParsed.data.Gallery.description;
                  headerDiv.appendChild(descDiv);
                  clampDescription(headerDiv, descDiv);
                }
              }
            }
          }
        }).catch(err => console.error(err));

      return;
    }

    if (c1Title) {
      c1Title.classList.add('kc-c1title-visible');
    }
  }

};


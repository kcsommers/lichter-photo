import { appendFilterTags, clampDescription, createBreadCrumbs } from '../../../core/helpers/dom';
import { getCollectionRootPath, getGalleryInfo } from '../../../core/helpers/photoshelter-api';
import { SITE_URL, log, parsePath } from '../../../core/helpers/utils';
import { Storage } from '../../../core/storage';

export const SearchResults = {

  queryParams: null,

  init: function () {

    document.addEventListener('DOMContentLoaded', () => {

      // get query params from path
      this.queryParams = parsePath(window.location.href);

      localStorage.setItem(Storage.QUERY_DATA, JSON.stringify(this.queryParams));

      // Remove brackets from images found
      this.removeBracketsFromTotal();

      // if theres no gallery id, we're coming directly from search page
      if (this.queryParams.gID) {
        // update pagination arrows
        this.setPagination();

        // set gallery details
        this.setGalleryDetails();

        this.setBreadCrumbs();
      }
      else {
        const c1Title = document.querySelector('.c1title');
        if (c1Title) {
          c1Title.classList.add('kc-c1title-visible');
        }
      }

    });
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
    const prevTag = document.querySelector('.page_previous');
    const nextTag = document.querySelector('.page_next');
    const countDiv = document.querySelector('.count');

    if (paginationDiv) {

      const appendedQuery = `&I_DSC=${this.queryParams.searchTerm}&I_DSC_AND=${this.queryParams.isAnd}&G_ID=${this.queryParams.gID}&C_ID=${this.queryParams.cID}`;

      let nextUrl, prevUrl;

      if (nextTag) {
        nextUrl = nextTag.href + appendedQuery;
        nextTag.href = nextUrl;
      }

      if (prevTag) {
        prevUrl = prevTag.href + appendedQuery;
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

    if (countDiv) {
      countDiv.style.position = 'relative';
      countDiv.style.cursor = 'pointer';

      const countMatch = countDiv.textContent.match(/(\bof\b )([0-9]+)$/g);
      if (countMatch && countMatch[0]) {
        const totalPages = +countMatch[0].split(' ')[1];
        const url = nextTag ? nextTag.href : prevTag ? prevTag.href : '';

        if (totalPages && url) {

          const dropdown = document.createElement('div');
          dropdown.classList.add('kc-pagination-dropdown');

          for (let i = 0; i < totalPages; i++) {
            const pageTag = document.createElement('a');
            pageTag.classList.add('kc-page-tag');
            pageTag.textContent = `${i + 1}`;
            pageTag.setAttribute('href', url.replace(/_bqO=[0-9]+/, `_bqO=${i * 100}`))
            dropdown.appendChild(pageTag);
          }

          countDiv.appendChild(dropdown);

          countDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.add('kc-pagination-dropdown-visible');

            const removeClass = (e) => {
              e.stopPropagation();
              dropdown.classList.remove('kc-pagination-dropdown-visible');
              document.removeEventListener('click', removeClass)
            }

            document.addEventListener('click', removeClass)
          });

        }
      }
    }
  },


  setGalleryDetails: function () {

    const c1Title = document.querySelector('.c1title');

    // call photoshelter api to get gallery info
    getGalleryInfo(this.queryParams.gID)
      .then(res => {
        if (res) {

          const resParsed = JSON.parse(res);
          if (resParsed.data && resParsed.data.Gallery) {

            appendFilterTags(
              resParsed.data.Gallery.name,
              this.queryParams.gID || '',
              this.queryParams.cID || '',
              this.queryParams.searchTerm || '',
              this.queryParams.isAnd
            );

            // gallery name
            if (resParsed.data.Gallery.name && c1Title) {
              c1Title.textContent = resParsed.data.Gallery.name;
              c1Title.classList.add('kc-c1title-visible');
            }

            // gallery description
            if (resParsed.data.Gallery.description) {

              const firstChild = document.querySelector('.content div:first-child')
              if (firstChild) {
                const descDiv = document.createElement('div');
                descDiv.classList.add('kc-description-wrap');
                descDiv.classList.add('kc-fade-in');
                descDiv.innerHTML = resParsed.data.Gallery.description;

                const headerDiv = firstChild.classList.contains('kc-breadcrumbs-wrap') ? firstChild.nextElementSibling : firstChild;

                headerDiv.appendChild(descDiv);
                clampDescription(headerDiv, descDiv);
              }
            }
          }
        }
      }).catch(err => console.error(err));
  },

  setBreadCrumbs: function () {

    log('[setBreadCrumbs]:::: ', this.queryData)

    const contentContainer = document.querySelector('.content');

    if (!contentContainer) {
      return;
    }

    const breadcrumbsWrap = document.createElement('div');
    breadcrumbsWrap.classList.add('kc-breadcrumbs-wrap');

    contentContainer.prepend(breadcrumbsWrap);

    getCollectionRootPath(this.queryParams.cID)
      .then(collectionPath => {
        const collectionPathParsed = collectionPath && JSON.parse(collectionPath).data;

        const breadcrumbs = collectionPathParsed.RootPath.reduce((crumbs, p) => {

          if (p.collection_id === 'root_hidden' || p.collection_id === 'root_site') {
            return crumbs;
          }

          crumbs.push({ text: p.name, path: `${SITE_URL}/gallery-collection/${p.name}/${p.collection_id}` });
          return crumbs;
        }, []);

        createBreadCrumbs(breadcrumbs, breadcrumbsWrap, contentContainer);
      })
      .catch(err => {
        contentContainer.removeChild(breadcrumbsWrap);
        console.error(err);
      })
  }

};
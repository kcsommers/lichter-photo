import { Storage } from "../../../core/storage";
import { getCollectionRootPath, getGalleryInfo } from "../../../core/helpers/photoshelter-api";
import { constructSearchPageQuery, createBreadCrumbs } from "../../../core/helpers/dom";
import { SITE_URL, log } from "../../../core/helpers/utils";


export const Image = {

  queryData: null,

  init: function () {


    const queryDataFromStorage = localStorage.getItem(Storage.QUERY_DATA);

    this.queryData = queryDataFromStorage && JSON.parse(queryDataFromStorage);

    document.addEventListener('DOMContentLoaded', () => {

      this.centerNav();

      if (this.queryData) {

        this.setBreadCrumbs();

        // this.setBackLink();
      }
      else {
        const backLink = document.querySelector('.search_results_link');
        if (backLink) {
          backLink.classList.add('kc-search-results-link-visible')
        }
      }

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

  setBreadCrumbs: function () {

    log('[setBreadCrumbs]:::: ', this.queryData)

    const dataBox = document.querySelector('.dataBox');

    if (!dataBox) {
      return;
    }

    const breadcrumbsWrap = document.createElement('div');
    breadcrumbsWrap.classList.add('kc-breadcrumbs-wrap');

    dataBox.prepend(breadcrumbsWrap);

    Promise.all([getGalleryInfo(this.queryData.gID), getCollectionRootPath(this.queryData.cID)])
      .then(([galInfo, collectionPath]) => {
        const galInfoParsed = galInfo && JSON.parse(galInfo).data;
        const collectionPathParsed = collectionPath && JSON.parse(collectionPath).data;

        log('PATH INFO:::: ', galInfoParsed, collectionPathParsed)

        if (galInfoParsed && collectionPathParsed) {

          const galPath = constructSearchPageQuery(
            this.queryData.gID,
            this.queryData.cID,
            this.queryData.searchTerm || '',
            this.queryData.isAnd || '',
            this.queryData.offset || '',
            this.queryData.bqH || ''
          );

          const galCrumb = { text: galInfoParsed.Gallery.name, path: galPath };
          const breadcrumbs = [galCrumb];

          collectionPathParsed.RootPath.forEach(p => {

            if (p.collection_id === 'root_hidden' || p.collection_id === 'root_site') {
              return;
            }

            breadcrumbs.push({ text: p.name, path: `${SITE_URL}/gallery-collection/${p.name}/${p.collection_id}` });
          });

          createBreadCrumbs(breadcrumbs, breadcrumbsWrap, dataBox);

        }
        else {
          dataBox.removeChild(breadcrumbsWrap);
        }

      })
      .catch(err => {
        dataBox.removeChild(breadcrumbsWrap);
        console.error(err);
      });
  },

  setBackLink: function () {
    const backLink = document.querySelector('.search_results_link');

    if (this.queryData && this.queryData.gID && this.queryData.cID) {
      getGalleryInfo(this.queryData.gID)
        .then(res => {

          if (res) {
            const resParsed = JSON.parse(res);
            if (resParsed.data && resParsed.data.Gallery && resParsed.data.Gallery.name) {
              // Update title with gallery name
              if (backLink) {
                backLink.textContent = resParsed.data.Gallery.name;
                backLink.href = constructSearchPageQuery(
                  this.queryData.gID,
                  this.queryData.cID,
                  this.queryData.searchTerm || '',
                  this.queryData.offset || ''
                );
              }
            }
          }
        })
        .catch(err => console.error(err));
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
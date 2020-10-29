import { clampDescription, constructSearchPageQuery, createBreadCrumbs } from '../dom';
import { baseUrl, parseHref } from '../utils';
import { getLifestyleQuery, safeGalleries } from '../galleries';
import { getCollectionRootPath } from '../photoshelter-api';

export const GalleryCollection = {

  cID: null,

  init: function () {

    const path = parseHref(location.href);
    this.cID = path && path.cID;

    document.addEventListener('DOMContentLoaded', () => {

      clampDescription(document.querySelector('div.content'), document.querySelector('div.description'));

      this.hijackThumbTags();


      if (this.cID) {
        this.setBreadcrumbs();
      }
    });
  },

  hijackThumbTags: function () {

    const thumbTags = document.querySelectorAll('li.gallery>.thumbnail>a');

    if (!thumbTags) {
      return;
    }

    thumbTags.forEach(tag => {

      const { cID, gID, name } = parseHref(tag.href);

      if (cID && gID && name) {
        let searchTerm = !safeGalleries.includes(name.toLowerCase()) ? 'showcase' : '';

        const lifestyleQuery = getLifestyleQuery(name);
        if (lifestyleQuery) {
          searchTerm += `+${lifestyleQuery}`;
        }

        tag.setAttribute('href', constructSearchPageQuery(gID, cID, searchTerm));

      }
    });

  },

  setBreadcrumbs: function () {

    log('[setBreadcrumbs]:::: ', this.cID)

    const contentContainer = document.querySelector('.content');

    if (!contentContainer) {
      return;
    }

    const breadcrumbsWrap = document.createElement('div');
    breadcrumbsWrap.classList.add('kc-breadcrumbs-wrap');

    contentContainer.prepend(breadcrumbsWrap);

    getCollectionRootPath(this.cID)
      .then(collectionPath => {
        const collectionPathParsed = collectionPath && JSON.parse(collectionPath).data;

        const breadcrumbs = collectionPathParsed.RootPath.reduce((crumbs, p) => {

          if (p.collection_id === 'root_hidden' || p.collection_id === this.cID) {
            return crumbs;
          }

          if (p.collection_id === 'root_site') {
            crumbs.push({ text: 'Archive', path: `${baseUrl}/archive` });
            return crumbs;
          }

          crumbs.push({ text: p.name, path: `${baseUrl}/gallery-collection/${p.name}/${p.collection_id}` });
          return crumbs;
        }, []);

        createBreadCrumbs(breadcrumbs, breadcrumbsWrap, contentContainer);
        contentContainer.removeChild(contentContainer.children[1]);

      })
      .catch(err => {
        contentContainer.removeChild(breadcrumbsWrap);
        console.error(err);
      })
  }

};



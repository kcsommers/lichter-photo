import { clampDescription, constructSearchPageQuery, createBreadCrumbs } from '../../../core/helpers/dom';
import { SITE_URL, parseHref, log } from '../../../core/helpers/utils';
import { getLifestyleQuery, safeGalleries } from '../../../core/galleries';
import { getCollectionRootPath } from '../../../core/helpers/photoshelter-api';

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

    const collections = document.querySelectorAll('li.gallery');

    if (!collections) {
      return;
    }

    collections.forEach(c => {

      if (!c.children || !c.children.length) {
        return;
      }

      // li.gallery > div.thumbnail > a
      const thumbTag = c.children[0].children && c.children[0].children[0];

      // li.gallery > div.info > div.name > a
      const nameTag = (
        c.children[1] &&
        c.children[1].children &&
        c.children[1].children[0] &&
        c.children[1].children[0].children
      ) && c.children[1].children[0].children[0];

      if (!thumbTag) {
        return;
      }

      const { cID, gID, name } = parseHref(thumbTag.href);

      if (cID && gID && name) {
        let searchTerm = !safeGalleries.includes(name.toLowerCase()) ? 'showcase' : '';

        const lifestyleQuery = getLifestyleQuery(name);
        if (lifestyleQuery) {
          searchTerm += `+${lifestyleQuery}`;
        }

        thumbTag.setAttribute('href', constructSearchPageQuery(gID, cID, searchTerm));

        if (nameTag) {
          nameTag.setAttribute('href', constructSearchPageQuery(gID, cID, searchTerm));
        }

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

          if (p.collection_id === 'root_hidden' || p.collection_id === this.cID || p.collection_id === 'root_site') {
            return crumbs;
          }

          crumbs.push({ text: p.name, path: `${SITE_URL}/gallery-collection/${p.name}/${p.collection_id}` });
          return crumbs;
        }, []);

        if (breadcrumbs.length) {
          createBreadCrumbs(breadcrumbs, breadcrumbsWrap, contentContainer);
          contentContainer.removeChild(contentContainer.children[1]);
        }
        else {
          contentContainer.removeChild(breadcrumbsWrap);
        }


      })
      .catch(err => {
        contentContainer.removeChild(breadcrumbsWrap);
        console.error(err);
      })
  }

};



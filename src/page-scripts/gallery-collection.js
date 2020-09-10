import { clampDescription, constructSearchPageQuery } from '../dom';
import { safeGalleries } from '../galleries';

export const GalleryCollection = {

  init: function () {
    clampDescription(document.querySelector('div.content'), document.querySelector('div.description'));

    this.hijackThumbTags();
  },

  hijackThumbTags: function () {

    const thumbTags = document.querySelectorAll('li.gallery>.thumbnail>a');

    if (thumbTags) {

      thumbTags.forEach(tag => {

        const { cID, gID, name } = this.parseHref(tag.href);

        if (cID && gID && name && !safeGalleries.includes(name.toLowerCase())) {
          tag.setAttribute('href', constructSearchPageQuery(gID, cID, 'showcase'));
        }
      });

    }

  },

  parseHref: function (path) {

    if (path) {
      const pathSplit = path.split('/');
      const cID = pathSplit[pathSplit.length - 1];
      const gID = pathSplit[pathSplit.length - 2];
      const name = pathSplit[pathSplit.length - 3];

      return { cID, gID, name };
    }
    return '';
  }

};



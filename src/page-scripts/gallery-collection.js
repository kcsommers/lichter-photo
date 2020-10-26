import { clampDescription, constructSearchPageQuery } from '../dom';
import { parseHref } from '../utils';
import { getLifestyleQuery, safeGalleries } from '../galleries';

export const GalleryCollection = {

  init: function () {
    document.addEventListener('DOMContentLoaded', () => {
      clampDescription(document.querySelector('div.content'), document.querySelector('div.description'));

      this.hijackThumbTags();
    });
  },

  hijackThumbTags: function () {

    const thumbTags = document.querySelectorAll('li.gallery>.thumbnail>a');

    if (thumbTags) {

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

    }

  },

};



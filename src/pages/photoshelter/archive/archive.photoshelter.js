import { clampDescription, constructSearchPageQuery } from '../../../core/helpers/dom';
import { safeGalleries } from '../../../core/galleries';
import { parseHref } from '../../../core/helpers/utils';

export const Archive = {

  init: function () {
    document.addEventListener('DOMContentLoaded', () => {
      clampDescription(document.querySelector('div.content'), document.querySelector('div.description'));

      this.hijackGalleryThumbTags();
    });
  },

  hijackGalleryThumbTags: function () {

    const thumbTags = document.querySelectorAll('li.gallery>.thumbnail>a');

    if (thumbTags) {

      thumbTags.forEach(tag => {

        const { cID, gID, name } = parseHref(tag.href);

        if (cID && gID && name) {
          const searchTerm = !safeGalleries.includes(name.toLowerCase()) ? 'showcase' : '';
          tag.setAttribute('href', constructSearchPageQuery(gID, cID, searchTerm));
        }
      });

    }

  }

};
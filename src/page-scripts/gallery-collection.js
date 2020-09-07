import { clampDescription } from '../dom';

export const GalleryCollection = {

  init: function () {
    clampDescription(document.querySelector('div.content'), document.querySelector('div.description'));
  }

};



import { clampDescription } from '../dom';
import { GalleryFilters } from '../galleries';
import { getGalleryImages, getGalleryInfo, getGalleryImagesWithSearch } from '../photoshelter-api';
import { getQueryParams } from '../utils';

export const Gallery = {

  IMAGES_PER_PAGE: 10,

  queryParams: null,

  name: '',

  description: '',

  imgMap: new Map(),

  currentPage: 1,

  paging: null,

  totalImages: 0,

  totalPages: 1,

  init: function () {

    this.queryParams = getQueryParams();

    if (this.queryParams.G_ID) {

      getGalleryInfo(this.queryParams.G_ID)
        .then(response => {

          const responseParsed = JSON.parse(response);

          if (responseParsed && responseParsed.status === 'ok') {

            this.name = responseParsed.data.Gallery.name;

            this.description = responseParsed.data.Gallery.description;

            this.appendDetails();

            this.getGalleryImages()
              .then(res => {
                this.imgMap.set(this.currentPage, this.parseResponse(res, this.queryParams));

                this.appendNav();
              })
              .catch(err => console.error(err))

          }

        })
        .catch(err => console.error(err))
    }

  },

  appendDetails: function () {
    const detailsContainer = document.querySelector('.kc-gallery-details-container');
    detailsContainer.classList.remove('w-container');

    const detailsInner = document.createElement('div');
    detailsInner.classList.add('kc-gallery-details-inner');

    const title = document.createElement('h2');
    title.classList.add('kc-c1title');
    title.innerText = this.name;
    detailsInner.appendChild(title);

    const descWrap = document.createElement('div');
    if (this.description) {
      descWrap.classList.add('kc-description-wrap');
      descWrap.innerText = this.description.replace(/(\r\n|\n|\r)/gm, '').trim();

      detailsInner.appendChild(descWrap);
    }

    detailsContainer.appendChild(detailsInner);

    if (this.description) {
      clampDescription(detailsContainer, descWrap);
    }

  },

  appendNav: function () {
    const navContainer = document.querySelector('.kc-gallery-nav');
    navContainer.classList.remove('w-container');

    const navInner = document.createElement('div');
    navInner.classList.add('kc-nav-inner');

    const totalContainer = document.createElement('div');
    totalContainer.classList.add('kc-total-container');
    totalContainer.innerText = this.totalImages + ' images';

    navInner.appendChild(totalContainer);

    const controls = document.createElement('div');
    controls.classList.add('kc-nav-controls');

    const pageCount = document.createElement('span');
    pageCount.classList.add('kc-page-count');
    pageCount.innerText = `Page ${this.currentPage} of ${this.totalPages}`;

    controls.appendChild(pageCount);

    navInner.appendChild(controls);

    navContainer.appendChild(navInner);

  },

  getGalleryImages: function () {
    if (this.queryParams.q) {
      return getGalleryImagesWithSearch(this.queryParams.G_ID, this.queryParams.q, this.currentPage)
    }

    return getGalleryImages(this.queryParams.G_ID, this.currentPage)
  },

  parseResponse: function (response) {

    const images = [];

    if (response) {
      const responseParsed = JSON.parse(response);

      if (responseParsed && responseParsed.status === 'ok' && responseParsed.data) {

        if (this.queryParams.q && responseParsed.data.Media) {

          this.paging = responseParsed.data.Paging
          this.totalImages = responseParsed.data.Total;
          this.totalPages = Math.ceil(this.totalImages / this.IMAGES_PER_PAGE)

          const media = responseParsed.data.Media;

          media.forEach(m => {
            images.push({
              image_id: m.Image.image_id,
              file_name: m.file_name,
              src: m.Image.Link.base
            })
          })

          return images;

        }

        if (responseParsed.data.Gallery) {

          this.paging = responseParsed.Gallery.Paging
          this.totalImages = responseParsed.Gallery.Total;
          this.totalPages = Math.ceil(this.totalImages / this.IMAGES_PER_PAGE)

          const galleryImages = responseParsed.data.Gallery.GalleryImage || [];

          galleryImages.forEach(g => {
            images.push({
              image_id: g.image_id,
              file_name: g.Image.file_name,
              src: g.ImageLink.base
            });
          });

          return images;

        }
      }
    }

    return images;
  }

}

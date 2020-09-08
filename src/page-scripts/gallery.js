import { clampDescription, attachSpinner, removeAllSpinners, showErrorMessage, removeSpinner } from '../dom';
import { GalleryFilters } from '../galleries';
import { getGalleryImages, getGalleryInfo, getGalleryImagesWithSearch } from '../photoshelter-api';
import { getQueryParams, log } from '../utils';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowLeft, faArrowRight)
window.FontAwesomeConfig = {
  searchPseudoElements: true
}

const baseUrl = 'https://lichter-wrapper.webflow.io/gallery';

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

  elements: {
    details: document.querySelector('.kc-gallery-details'),
    nav: document.querySelector('.kc-gallery-nav'),
    tags: document.querySelector('.kc-gallery-filters'),
    images: document.querySelector('.kc-gallery-images')
  },

  init: function () {

    for (const c in this.elements) {
      this.elements[c].classList.remove('w-container');
    }

    attachSpinner(this.elements.details);
    attachSpinner(this.elements.images);

    this.queryParams = getQueryParams();

    if (!this.queryParams || !this.queryParams.G_ID) {

      removeAllSpinners();

      showErrorMessage('You are missing the required field G_ID.', this.elements.details);

      return;
    }


    getGalleryInfo(this.queryParams.G_ID)
      .then(response => {

        const responseParsed = JSON.parse(response);

        log('GALLERY INFO:::: ', responseParsed);

        if (responseParsed && responseParsed.status === 'ok') {

          this.name = responseParsed.data.Gallery.name;

          this.description = responseParsed.data.Gallery.description;

          this.appendDetails();

          this.appendFilterTags();

          this.getGalleryImages()
            .then(res => {
              this.imgMap.set(this.currentPage, this.parseResponse(res, this.queryParams));

              log('CURRENT PAGE IMAGES:::: ', this.imgMap.get(this.currentPage));

              this.appendNav();

              this.updateImages();
            })
            .catch(err => console.error(err))

        }

      })
      .catch(err => console.error(err))
  },

  updateImages: function () {

    const currentImages = this.imgMap.get(this.currentPage);

    if (currentImages) {
      const imagesWrap = document.createElement('div');
      imagesWrap.classList.add('kc-gallery-images-inner');

      currentImages.forEach(img => {

        const thumbWrap = document.createElement('div');
        thumbWrap.classList.add('kc-thumb-wrap');

        const thumbTag = document.createElement('a');
        thumbTag.classList.add('kc-thumb-tag');

        const thumb = document.createElement('img');
        thumb.classList.add('kc-thumb');
        thumb.setAttribute('src', img.src);
        thumb.setAttribute('alt', img.file_name);

        thumbTag.appendChild(thumb);
        thumbWrap.appendChild(thumbTag);
        imagesWrap.appendChild(thumbWrap);

      });

      removeSpinner(this.elements.images);
      this.elements.images.appendChild(imagesWrap);
      return;
    }

    this.getGalleryImages()
      .then(res => {
        this.imgMap.set(this.currentPage, this.parseResponse(res, this.queryParams));

        log('CURRENT PAGE IMAGES:::: ', this.imgMap.get(this.currentPage));

        this.updateImages();
      })
      .catch(err => console.error(err))

  },

  appendDetails: function () {

    const detailsContainer = document.querySelector('.kc-gallery-details');
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

    removeSpinner(this.elements.details);

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

    const pagination = document.createElement('div');
    pagination.classList.add('kc-gallery-pagination');

    const pageCount = document.createElement('span');
    pageCount.classList.add('kc-gallery-page-count');
    this.elements.pageCount = pageCount;

    const leftArrow = document.createElement('a');
    leftArrow.classList.add('kc-arrow-left-tag');
    this.elements.leftArrow = leftArrow;
    leftArrow.addEventListener('click', this.prevPage.bind(this))

    const rightArrow = document.createElement('a');
    rightArrow.classList.add('kc-arrow-right-tag');
    this.elements.rightArrow = rightArrow;
    rightArrow.addEventListener('click', this.nextPage.bind(this))

    pagination.appendChild(leftArrow);
    pagination.appendChild(pageCount);
    pagination.appendChild(rightArrow);

    navInner.appendChild(pagination);

    navContainer.appendChild(navInner);

    this.updatePagination();

  },

  appendFilterTags: function () {

    const filterObj = GalleryFilters[this.queryParams.G_ID] || GalleryFilters.default;

    const filtersInner = document.createElement('div');
    filtersInner.classList.add('kc-gallery-filters-inner');

    filterObj.filters.forEach(f => {
      const tag = document.createElement('a');
      tag.classList.add(f.isSpecial ? 'kc-filter-tag-special' : 'kc-filter-tag');
      tag.setAttribute('data-params', `G_ID=${this.queryParams.G_ID}&C_ID=${this.queryParams.C_ID || ''}&gallery=${this.queryParams.gallery || ''}&q=${f.keyword}`);

      if (
        (this.queryParams.q && f.keyword && this.queryParams.q.includes(f.keyword)) ||
        (!this.queryParams.q && !f.keyword)
      ) {
        tag.classList.add('kc-filter-tag-active');
      } else {
        tag.addEventListener('click', this.updateFilter.bind(this));
      }

      tag.appendChild(document.createTextNode(f.name));
      filtersInner.appendChild(tag);
    });

    this.elements.tags.appendChild(filtersInner);

  },

  updateFilter: function (event) {
    console.log('EVETN:::: ', event.target, event.target.dataset)
    const dataset = event.target.dataset;
    if (dataset && dataset.params) {
      this.queryParams = getQueryParams(dataset.params);
    }
  },

  updatePagination: function () {
    this.elements.pageCount.innerHTML = `Page <strong>${this.currentPage}</strong> of ${this.totalPages}`;

    if (this.currentPage < this.totalPages) {
      this.elements.rightArrow.classList.add('kc-arrow-visible')
    } else {
      this.elements.rightArrow.classList.remove('kc-arrow-visible');
    }

    if (this.currentPage > 1) {
      this.elements.leftArrow.classList.add('kc-arrow-visible');
    } else {
      this.elements.leftArrow.classList.remove('kc-arrow-visible');
    }
  },

  nextPage: function () {
    this.elements.images.childNodes[0].remove();
    attachSpinner(this.elements.images);
    this.currentPage++;
    this.updateImages();
    this.updatePagination();
  },

  prevPage: function () {
    this.elements.images.childNodes[0].remove();
    attachSpinner(this.elements.images);
    this.currentPage--;
    this.updateImages();
    this.updatePagination();
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

        if (responseParsed.data.GalleryImage) {

          this.paging = responseParsed.data.Paging
          this.totalImages = responseParsed.data.Total;
          this.totalPages = Math.ceil(this.totalImages / this.IMAGES_PER_PAGE)

          const galleryImages = responseParsed.data.GalleryImage || [];

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



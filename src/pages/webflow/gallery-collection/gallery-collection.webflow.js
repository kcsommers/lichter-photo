import './gallery-collection.webflow.scss';
import { getCollection } from "../../../core/helpers/photoshelter-api";
import { getQueryParams, log } from "../../../core/helpers/utils";
import { attachSpinner, constructSearchPageQuery, removeAllSpinners, removeSpinner } from '../../../core/helpers/dom';
import { BreadCrumbs } from '../../../components/breadcrumbs/breadcrumbs.component';
import { GalleryDetails } from '../../../components/gallery-details/gallery-details.component';

export const GalleryCollectionWF = {

  collection: null,

  init: function () {

    attachSpinner(document.querySelector('.kc-gallery-body'));

    // const queryParams = getQueryParams();

    const collectionIdDiv = document.querySelector('div.kc-collection-id');
    if (!collectionIdDiv) {
      return;
    }

    const queryParams = { C_ID: collectionIdDiv.textContent };

    const breadCrumbs = new BreadCrumbs(queryParams, document.querySelector('.kc-breadcrumbs-container'), true);
    breadCrumbs.create();

    if (queryParams && queryParams.C_ID) {
      this.fetchCollection(queryParams.C_ID);
    }
  },

  fetchCollection: function (cID) {
    getCollection(cID)
      .then(collection => {
        log('COLLECTION:::: ', collection);

        this.collection = collection;

        this.attachDetails();

        this.attachImages(collection.Children);

        this.showGallery();
      })
      .catch(err => console.error(err))
  },

  showGallery: function () {

    removeAllSpinners();

    const container = document.querySelector('.kc-gallery-inner');
    container.classList.remove('kc-gallery-hidden');

  },

  attachDetails: function () {

    const details = new GalleryDetails(
      this.collection.name,
      `${this.collection.Total} Galleries`,
      this.collection.description,
      document.querySelector('.kc-gallery-details')
    );

    details.create();

  },

  attachImages: function (children) {
    const thumbsContainer = document.querySelector('.kc-gallery-images');

    if (!thumbsContainer || !children || !children) {
      return;
    }

    const containerInner = document.createElement('div');
    containerInner.classList.add('kc-thumbs-container');

    children.forEach(c => {

      const isCollection = !!c.ChildCollection;

      containerInner.appendChild(isCollection
        ? this.createCollectionThumb(c.ChildCollection)
        : this.createGalleryThumb(c.ChildGallery)
      );

    });

    thumbsContainer.appendChild(containerInner);

  },

  createGalleryThumb(gallery) {

    const href = constructSearchPageQuery(gallery.gallery_id, this.collection.collection_id, 'showcase');

    const thumb = this.createThumb(gallery.KeyImage.ImageLink.link, href);

    const label = this.createLabel(gallery.name, href, gallery.MediaCount.total, 'Images');


    const container = document.createElement('div');
    container.classList.add('kc-thumb-container');
    container.appendChild(thumb);
    container.appendChild(label);

    return container;

  },

  createCollectionThumb(collection) {
    const container = document.createElement('div');
    return container;

  },

  createThumb: function (imgSrc, href) {
    const img = document.createElement('img');
    img.classList.add('kc-thumb-img');
    img.setAttribute('src', imgSrc);

    const wrap = document.createElement('a');
    wrap.classList.add('kc-thumb-wrap');
    wrap.setAttribute('href', href)

    wrap.appendChild(img);

    return wrap;
  },

  createLabel: function (name, href, total, type) {

    const tagWrap = document.createElement('div');
    tagWrap.classList.add('kc-label-tag-wrap');
    const tag = document.createElement('a');
    tag.classList.add('kc-label-tag');
    tag.setAttribute('href', href);
    tag.textContent = name;
    tagWrap.appendChild(tag);

    const count = document.createElement('div');
    count.classList.add('kc-count-wrap');
    count.textContent = `${total} ${type}`;

    const labelWrap = document.createElement('div');
    labelWrap.classList.add('kc-label-wrap');

    labelWrap.appendChild(tag);
    labelWrap.appendChild(count);

    return labelWrap;

  }

}

GalleryCollectionWF.init();
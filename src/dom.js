import { GalleryFilters } from './galleries';
import { subtract } from 'lodash';

export const constructSearchPageQuery = (gID, cID, searchTerm, isAnd) => {
  // will be the a tags href
  return `https://lichterphoto.photoshelter.com/search?I_DSC=${searchTerm}&${isAnd || 'I_DSC_AND=t'}&G_ID=${gID}&C_ID=${cID}&_ACT=usrSearch`;
};

export const constructSearchTerm = (currentSearch, newFilter, allGalleryFilters) => {

  const regEx = new RegExp(`(\\+)?(${allGalleryFilters.map(k => `${k}|`).join('')})`, 'gi');

  currentSearch = currentSearch.replace(regEx, '');

  if (newFilter) {
    return currentSearch ? `${currentSearch}+${newFilter}` : newFilter;
  }
  return currentSearch;
}

export const appendFilterTags = function (gID, cID, searchTerm, isAnd) {

  const gallery = GalleryFilters[gID] || GalleryFilters.default;

  const isSpecialGal = gID in GalleryFilters;

  const filterTags = gallery.filters.map(f => {
    const tag = document.createElement('a');

    tag.classList.add(!gallery.isSpecial ? 'kc-filter-tag' : 'kc-filter-tag-special');

    // add the active class if searchterm includes the keyword
    if (f.keyword && searchTerm.includes(f.keyword)) {
      tag.classList.add('kc-filter-tag-active');
    } else {

      tag.setAttribute('href', constructSearchPageQuery(gID, cID, constructSearchTerm(searchTerm, f.keyword, gallery.keywords), isAnd));
    }

    tag.appendChild(document.createTextNode(f.name));

    return tag;
  });

  // if none of the tags are active, the view all tag (which is always first in the array) should be
  if (!filterTags.some(t => t.classList.contains('kc-filter-tag-active'))) {
    filterTags[0].classList.add('kc-filter-tag-active');
    filterTags[0].removeAttribute('href');
  }

  // create filtersContainer
  const filtersContainer = document.createElement('div');
  filtersContainer.classList.add('kc-filters-container');
  const DOMContainer = document.querySelector('.name'); // container from photoshelter code
  if (DOMContainer) {

    // skip view all tag, it will be either prepended or appended
    for (let i = 1; i < filterTags.length; i++) {
      filtersContainer.appendChild(filterTags[i]);
    }

    if (!isSpecialGal) {
      filtersContainer.append(filterTags[0]);
    } else {
      filtersContainer.prepend(filterTags[0]);
    }

    DOMContainer.appendChild(filtersContainer);
  }
};

export const clampDescription = (mainContainer, descriptionContainer) => {
  if (mainContainer && descriptionContainer) {

    const descriptionHeight = descriptionContainer.getBoundingClientRect().height;

    if (descriptionHeight > 70) {
      descriptionContainer.classList.add('kc-description')
      const showMoreBtn = document.createElement('span');
      showMoreBtn.textContent = 'Show More';
      showMoreBtn.classList.add('kc-showmore-btn');

      showMoreBtn.addEventListener('click', (e) => {
        if (descriptionContainer.classList.contains('open')) {
          e.target.textContent = 'Show More';
          descriptionContainer.classList.remove('open');
        } else {
          descriptionContainer.classList.add('open');
          e.target.textContent = 'Show Less';
        }
      });

      mainContainer.insertBefore(showMoreBtn, mainContainer.children[3]);
    }
  }
};

export const attachSpinner = (container) => {

  if (container) {
    const spinnerWrap = document.createElement('div');
    spinnerWrap.classList.add('kc-spinner-wrap');

    const spinner = document.createElement('div');
    spinner.classList.add('kc-spinner');

    spinnerWrap.appendChild(spinner);

    container.appendChild(spinnerWrap);
  }
};

export const removeSpinner = (container) => {
  if (container) {

    for (let i = 0; i < container.childNodes.length; i++) {
      if (container.childNodes[i].classList.contains('kc-spinner-wrap')) {
        container.childNodes[i].remove();
        break;
      }
    }

  }
};

export const removeAllSpinners = () => {
  const spinners = document.querySelectorAll('.kc-spinner-wrap');

  if (spinners) {
    spinners.forEach(s => s.remove());
  }

};

export const showErrorMessage = (msg, container) => {
  if (container) {

    const errorContainer = document.createElement('div');
    errorContainer.classList.add('kc-error-container');

    const title = document.createElement('h1');
    title.classList.add('kc-error-title');
    title.innerText = 'Error';

    const subTitle = document.createElement('p');
    subTitle.classList.add('kc-error-subtitle');
    subTitle.innerText = 'Sorry, we encountered an error';

    const error = document.createElement('div');
    error.classList.add('kc-error');
    error.innerText = msg;

    errorContainer.appendChild(title)
    errorContainer.appendChild(subTitle)
    errorContainer.appendChild(error)

    container.appendChild(errorContainer);
  }
};
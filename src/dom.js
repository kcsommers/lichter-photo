import { GalleryFilters } from './galleries';

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

    if (!isSpecialGal) {
      tag.classList.add('kc-filter-tag');
    } else {
      tag.classList.add('kc-filter-tag-special');
    }

    // add the active class if searchterm includes the keyword
    if (f.keyword && searchTerm.includes(f.keyword)) {
      tag.classList.add('active');
    } else {
      tag.href = constructSearchPageQuery(gID, cID, constructSearchTerm(searchTerm, f.keyword, gallery.keywords), isAnd);
    }

    tag.appendChild(document.createTextNode(f.name));

    return tag;
  });

  // if none of the tags are active, the view all tag (which is always first in the array) should be
  if (!filterTags.some(t => t.classList.contains('active'))) {
    filterTags[0].classList.add('active');
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

// const checkboxChanged = (searchTerm, isChecked) => {
//   const path = window.location.href;
//   const searchTermMatch = path.match(/(I_DSC=)(.*?)(?=&)/);
//   if (!searchTerm) {
//     // get search term from url
//     searchTerm = searchTermMatch && searchTermMatch[2];
//   }

//   if (!searchTerm) {
//     // if url doesnt work look in local storage
//     const queryData = localStorage.getItem(Storage.QUERY_DATA)
//     const storageData = JSON.parse(queryData);
//     searchTerm = (storageData && storageData.searchTerm) || '';
//   }

//   let newSearchTerm = isChecked ?
//     searchTerm
//       .replace(/(\+)?showcase/i, '')
//       .replace(/(\+)?featured/i, '')
//     + '+portrait'
//     : searchTerm.replace(/\+portrait/i, '');

//   let newPath = path
//     .replace(`I_DSC=${searchTerm}`, `I_DSC=${newSearchTerm}`)
//     .replace('I_DSC_AND=f', 'I_DSC_AND=t');;
//   if (!path.includes('I_DSC_AND=t')) {
//     newPath = newPath + '&I_DSC_AND=t';
//   }
//   // set the window location to the new path
//   window.location = newPath;

// }

// export const appendPortraitCheckbox = (searchTerm, isChecked) => {
//   // Checkbox container
//   const checkboxContainer = document.createElement('div');
//   checkboxContainer.classList.add('kc-portrait-checkbox-container');

//   // Checkmark
//   const checkmark = document.createElement('div');
//   checkmark.classList.add('kc-portrait-checkbox-checkmark');

//   // Styled checkbox
//   const styledCheckbox = document.createElement('div');
//   styledCheckbox.classList.add('kc-styled-portrait-checkbox');
//   styledCheckbox.appendChild(checkmark);

//   // Checkbox input
//   const checkbox = document.createElement('input');
//   checkbox.setAttribute('type', 'checkbox');
//   checkbox.checked = isChecked;
//   checkbox.id = 'kc-portrait-checkbox';
//   checkbox.addEventListener('change', (e) => { checkboxChanged(searchTerm, e.target.checked) });

//   // Checkbox label
//   const label = document.createElement('label');
//   label.classList.add('kc-portrait-checkbox-label');
//   label.htmlFor = 'kc-portrait-checkbox'
//   const labelText = document.createTextNode('Portraits');
//   label.appendChild(checkbox);
//   label.appendChild(styledCheckbox);
//   label.appendChild(labelText);

//   checkboxContainer.appendChild(label);
//   const filtersContainer = document.querySelector('.kc-filters-container');
//   filtersContainer.appendChild(checkboxContainer);
// };

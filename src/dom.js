import { Storage } from "./storage";

export const constructQuery = (gID, cID, searchTerm) => {
  // will be the a tags href
  return `https://lichterphoto.photoshelter.com/search?I_DSC=${searchTerm}&G_ID=${gID}&C_ID=${cID}&_ACT=usrSearch`;
};

export const appendFilterTags = function (gID, cID, currentTag) {
  // View All tag
  const viewAllTag = document.createElement('a');
  viewAllTag.classList.add('kc-filter-tag', 'view-all-tag');
  viewAllTag.href = constructQuery(gID, cID, '');
  viewAllTag.appendChild(document.createTextNode('View All'));

  // Showcase tag
  const showcaseTag = document.createElement('a');
  showcaseTag.classList.add('kc-filter-tag', 'showcase-tag');
  showcaseTag.href = constructQuery(gID, cID, 'showcase');
  showcaseTag.appendChild(document.createTextNode('Showcase'));

  // Featured tag
  const featuredTag = document.createElement('a');
  featuredTag.classList.add('kc-filter-tag', 'featured-tag');
  featuredTag.href = constructQuery(gID, cID, 'featured');
  featuredTag.appendChild(document.createTextNode('Featured'));

  const filterTags = {
    viewAll: viewAllTag,
    showcase: showcaseTag,
    featured: featuredTag
  };

  if (['viewAll', 'showcase', 'featured'].includes(currentTag)) {
    filterTags[currentTag].removeAttribute('href');
    filterTags[currentTag].style.color = '#c35a1c';
  }

  // create filtersContainer
  const filtersContainer = document.createElement('div');
  filtersContainer.classList.add('kc-filters-container');
  const filtersWrap = document.createElement('div');
  filtersWrap.classList.add('kc-filters-tags-container');
  const DOMContainer = document.querySelector('.name'); // container from photoshelter code
  if (DOMContainer) {
    filtersWrap.appendChild(showcaseTag);
    filtersWrap.appendChild(featuredTag);
    filtersWrap.appendChild(viewAllTag);
    filtersContainer.appendChild(filtersWrap);
    DOMContainer.appendChild(filtersContainer);
  }
};

const checkboxChanged = (searchTerm, isChecked) => {
  console.log('CHANGED:::: ', searchTerm, isChecked)
  const path = window.location.href;
  const searchTermMatch = path.match(/(I_DSC=)(.*?)(?=&)/);
  if (!searchTerm) {
    // get search term from url
    searchTerm = searchTermMatch && searchTermMatch[2];
  }


  if (!searchTerm) {
    // if url doesnt work look in local storage
    const queryData = localStorage.getItem(Storage.QUERY_DATA)
    const storageData = JSON.parse(queryData);
    searchTerm = (storageData && storageData.searchTerm) || '';
  }

  console.log('SE', searchTerm)
  const newSearchTerm = isChecked ?
    searchTerm + '+portrait' :
    searchTerm.replace(/\+portrait/i, '');

  let newPath = path
    .replace(`I_DSC=${searchTerm}`, `I_DSC=${newSearchTerm}`)
    .replace('I_DSC_AND=f', 'I_DSC_AND=t');;
  if (!path.includes('I_DSC_AND=t')) {
    newPath = newPath + '&I_DSC_AND=t';
  }
  // set the window location to the new path
  window.location = newPath;

}

export const appendPortraitCheckbox = (searchTerm, isChecked) => {
  // Checkbox container
  const checkboxContainer = document.createElement('div');
  checkboxContainer.classList.add('kc-portrait-checkbox-container');

  // Checkmark
  const checkmark = document.createElement('div');
  checkmark.classList.add('kc-portrait-checkbox-checkmark');

  // Styled checkbox
  const styledCheckbox = document.createElement('div');
  styledCheckbox.classList.add('kc-styled-portrait-checkbox');
  styledCheckbox.appendChild(checkmark);

  // Checkbox input
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = isChecked;
  checkbox.id = 'kc-portrait-checkbox';
  checkbox.addEventListener('change', (e) => { checkboxChanged(searchTerm, e.target.checked) });

  // Checkbox label
  const label = document.createElement('label');
  label.classList.add('kc-portrait-checkbox-label');
  label.htmlFor = 'kc-portrait-checkbox'
  const labelText = document.createTextNode('Portraits');
  label.appendChild(checkbox);
  label.appendChild(styledCheckbox);
  label.appendChild(labelText);

  checkboxContainer.appendChild(label);
  const filtersContainer = document.querySelector('.kc-filters-container');
  filtersContainer.appendChild(checkboxContainer);
};

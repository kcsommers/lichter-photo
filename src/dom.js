export const constructQuery = (gID, cID, searchTerm) => {
  // will be the a tags href
  return `https://lichterphoto.photoshelter.com/search?I_DSC=${searchTerm}&G_ID=${gID}&C_ID=${cID}&I_DSC_AND=t&_ACT=usrSearch`;
};

export const appendFilterTags = function (gID, cID, viewAllUrl, containerClass, currentTag) {
  // View All tag
  const viewAllTag = document.createElement('a');
  viewAllTag.classList.add('lp-filter-tag', 'view-all-tag');
  viewAllTag.href = viewAllUrl;
  viewAllTag.appendChild(document.createTextNode('View All'));

  // Showcase tag
  const showcaseTag = document.createElement('a');
  showcaseTag.classList.add('lp-filter-tag', 'showcase-tag');
  showcaseTag.href = constructQuery(gID, cID, 'showcase');
  showcaseTag.appendChild(document.createTextNode('Showcase'));

  // Featured tag
  const featuredTag = document.createElement('a');
  featuredTag.classList.add('lp-filter-tag', 'featured-tag');
  featuredTag.href = constructQuery(gID, cID, 'featured');
  featuredTag.appendChild(document.createTextNode('Featured'));

  const filterTags = {
    viewAll: viewAllTag,
    showcase: showcaseTag,
    featured: featuredTag
  };

  filterTags[currentTag].removeAttribute('href');
  filterTags[currentTag].style.color = '#c35a1c';

  //create filtersContainer
  const filtersContainer = document.createElement('div');
  filtersContainer.classList.add('lp-filters-container');
  const DOMContainer = document.querySelector(`.${containerClass}`); // container from photoshelter code
  filtersContainer.appendChild(viewAllTag)
  filtersContainer.appendChild(showcaseTag)
  filtersContainer.appendChild(featuredTag);
  DOMContainer.appendChild(filtersContainer);
};

export const appendPortraitCheckbox = (searchTerm) => {
  const checkboxContainer = document.createElement('div');
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.addEventListener('change', (e) => {
    if (event.target.checked) {
      console.log('Checked');
    } else {
      console.log('Unchecked');
    }
  });
  checkboxContainer.appendChild(checkbox);
  const searchResultsTitleContainer = document.querySelector('.content').childNodes[0];
  searchResultsTitleContainer.classList.add('kc-search-results-title-container');
  searchResultsTitleContainer.appendChild(checkboxContainer);
};
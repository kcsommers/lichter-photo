export const constructQuery = (gID, cID, searchTerm) => {
  // will be the a tags href
  return `https://lichterphoto.photoshelter.com/search?I_DSC=${searchTerm}&G_ID=${gID}&C_ID=${cID}&I_DSC_AND=t&_ACT=usrSearch`;
};

export const appendFilterTags = function (gID, cID, viewAllUrl, containerClass, currentTag) {
  // View All tag
  const viewAllTag = document.createElement('a');
  viewAllTag.classList.add('kc-filter-tag', 'view-all-tag');
  viewAllTag.href = viewAllUrl;
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

  filterTags[currentTag].removeAttribute('href');
  filterTags[currentTag].style.color = '#c35a1c';

  //create filtersContainer
  const filtersContainer = document.createElement('div');
  filtersContainer.classList.add('kc-filters-container');
  const filtersWrap = document.createElement('div');
  filtersWrap.classList.add('kc-filters-tags-container');
  const DOMContainer = document.querySelector(`.${containerClass}`); // container from photoshelter code
  filtersWrap.appendChild(viewAllTag)
  filtersWrap.appendChild(showcaseTag)
  filtersWrap.appendChild(featuredTag);
  filtersContainer.appendChild(filtersWrap)
  DOMContainer.appendChild(filtersContainer);
};

export const appendPortraitCheckbox = (searchTerm) => {
  console.log('Searchterm:::: ', searchTerm)
  const path = window.location.href;
  const searchTermMatch = path.match(/(I_DSC=)(.*?)(?=&)/);
  const checkboxContainer = document.createElement('div');
  checkboxContainer.classList.add('kc-portrait-checkbox-container');
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.addEventListener('change', (e) => {
    if (!searchTerm) {
      // get search term from url
      searchTerm = searchTermMatch && searchTermMatch[2];
    }

    if (!searchTerm) {
      // if url doesnt work look in local storage
      const storageData = localStorage.getItem('lp-queryData') && JSON.parse(localStorage.getItem('lp-queryData'));
      searchTerm = storageData && storageData.searchTerm;
    }

    if (searchTerm) {
      const newSearchTerm = event.target.checked ?
        searchTerm + '+portrait' :
        searchTerm.replace('+portrait', '');

      let newPath = path
        .replace(`I_DSC=${searchTerm}`, `I_DSC=${newSearchTerm}`)
        .replace('I_DSC_AND=f', 'I_DSC_AND=t');;
      if (!path.includes('I_DSC_AND=t')) {
        newPath = newPath + '&I_DSC_AND=t';
      }
      window.location = newPath;
    }
  });
  checkboxContainer.appendChild(checkbox);
  const filtersContainer = document.querySelector('.kc-filters-container');
  filtersContainer.appendChild(checkboxContainer);
};
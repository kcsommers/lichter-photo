export const constructQuery = (gID, cID, searchTerm) => {
  // will be the a tags href
  return `https://lichterphoto.photoshelter.com/search?I_DSC=${searchTerm}&G_ID=${gID}&C_ID=${cID}&I_DSC_AND=t&_ACT=usrSearch`;
};

export const appendFilterTags = (gID, cID, viewAllUrl, containerClass, currentTag) => {
  // View All tag
  const viewAllTag = document.createElement('a').classList.add('lp-filter-tg', 'view-all-tag');
  viewAllTag.href = viewAllUrl;
  viewAllTag.appendChild(document.createTextNode('View All'));

  // Showcase tag
  const showcaseTag = document.createElement('a').classList.add('lp-filter-tg', 'showcase-tag');
  showcaseTag.href = constructQuery(gID, cID, 'showcase');
  showcaseTag.appendChild(document.createTextNode('Showcase'));

  // Featured tag
  const featuredTag = document.createElement('a').classList.add('lp-filter-tg', 'featured-tag');
  featuredTag.href = constructQuery(gID, cID, 'showcase');
  featuredTag.appendChild(document.createTextNode('Featured'));

  this[currentTag].removeAttribute('href')
  this[currentTag].style.color = '#c35a1c';

  //create filtersContainer
  const filtersContainer = document.createElement('div').classList.add('lp-filters-container');
  const DOMContainer = document.querySelector(`.${containerClass}`); // container from photoshelter code
  filtersContainer.appendChild(viewAllTag).appendChild(showcaseTag).appendChild(featuredTag);
  DOMContainer.appendChild(filtersContainer);
};
export const GalleryCollection = () => {
  document.addEventListener('DOMContentLoaded', () => {
    /**
     * Show more description button
     */
    const contentDiv = document.querySelector('div.content');
    const descriptionDiv = document.querySelector('div.description');
    if (contentDiv && descriptionDiv) {
      const descriptionDivHeight = descriptionDiv.getBoundingClientRect().height;
      if (descriptionDivHeight > 70) {
        descriptionDiv.classList.add('kc-description')
        const showMoreBtn = document.createElement('span');
        showMoreBtn.textContent = 'Show More';
        showMoreBtn.classList.add('kc-showmore-btn');
        showMoreBtn.addEventListener('click', (e) => {
          if (descriptionDiv.classList.contains('open')) {
            e.target.textContent = 'Show More';
            descriptionDiv.classList.remove('open');
          } else {
            descriptionDiv.classList.add('open');
            e.target.textContent = 'Show Less';
          }
        });
        contentDiv.insertBefore(showMoreBtn, contentDiv.children[3]);
      }
    }
  });
};

const hijackThumbnails = () => {
  const thumbnails = document.querySelectorAll('.thumbnail');
  for (const thumb of thumbnails) {
    const thumbTag = thumb.firstChild; // <div.thumbnail><a></a></div>
    const hrefMatch = thumbTag.href && thumbTag.href.match(/([a-zA-Z-']*)((P|p)ortrait(s?)|((B|b)ike(s?)))/);
    if (hrefMatch) { // if the tags href contains e.g. Name-Name-Portraits
      const searchTerm = hrefMatch[0].split('-').join(' ');
      thumbTag.addEventListener('click', (e) => {
        e.preventDefault();
        search(searchTerm);
      });
    }
  }
};

const search = (searchTerm) => {
  const url = `https://lichterphoto.photoshelter.com/search?I_DSC=${searchTerm}&I_DSC_AND=t&_ACT=search`;
  window.location = url;
};

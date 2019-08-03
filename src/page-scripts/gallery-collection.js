export const GalleryCollection = () => {
  document.addEventListener('DOMContentLoaded', hijackThumbnails);
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
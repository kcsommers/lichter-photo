import { getGalleryThumbs } from '../photoshelter-api';

export const ArlenNess = () => {
  document.addEventListener('DOMContentLoaded', (e) => {
    const collectionID = 'C0000D9Hndx5YX1s';
    getGalleryThumbs(collectionID, 0).then(response => {
      const parsedResponse = JSON.parse(response);
      if (parsedResponse.data && parsedResponse.data.Children && parsedResponse.data.Children.length) {
        const thumbsDOMContainer = document.querySelector('.kc-gallery-thumbs-container');
        const thumbsContainer = document.createElement('div');
        thumbsContainer.classList.add('kc-thumbs-container');

        let currentRow = 0;
        parsedResponse.data.Children.forEach((gallery, i) => {
          if (i > 0 && i % 4 === 0) {
            currentRow++;
          }

          const galleryID = gallery.ChildGallery.galleryID;
          const href = `https://lichterphoto.photoshelter.com/gallery/${galleryID}/${collectionID}`

          const newThumbContainer = document.createElement('div');
          newThumbContainer.classList.add('kc-thumbnail-container');

          const newThumbTag = document.createElement('a');
          newThumbTag.classList.add('kc-thumbnail-tag')
          newThumbTag.href = href;
          newThumbTag.style.gridColumn = i - (4 * currentRow);

          const newThumb = document.createElement('img');
          newThumb.classList.add('kc-thumbnail');
          newThumb.src = gallery.ChildGallery.KeyImage.ImageLink.base;

          const infoContainer = document.createElement('div');
          infoContainer.classList.add('kc-thumb-info-container');
          const nameContainer = document.createElement('div');
          nameContainer.classList.add('kc-thumb-name-container');
          const nameTag = document.createElement('a');
          nameTag.classList.add('kc-gallery-name');
          nameTag.href = href;
          const galleryName = document.createTextNode(`${gallery.ChildGallery.Gallery.name}`);
          nameTag.appendChild(galleryName);
          nameContainer.appendChild(nameTag);
          const imgCountContainer = document.createElement('div');
          imgCountContainer.classList.add('kc-gallery-images-count-container');
          const imgCountSpan = document.createElement('span');
          imgCountSpan.classList.add('kc-gallery-images-count');
          const imgCount = document.createTextNode(`${gallery.ChildGallery.MediaCount.images} images`);
          imgCountSpan.appendChild(imgCount);
          imgCountContainer.appendChild(imgCountSpan);
          infoContainer.appendChild(nameContainer);
          infoContainer.appendChild(imgCountSpan);


          newThumbTag.appendChild(newThumb);
          newThumbContainer.appendChild(newThumbTag);
          newThumbContainer.appendChild(infoContainer);
          thumbsContainer.appendChild(newThumbContainer);
        });
        thumbsDOMContainer.appendChild(thumbsContainer);
      }
    }).catch(e => {
      console.error(e);
    });
  });
}
import './gallery-details.component.scss';

export class GalleryDetails {

  name = '';

  total = '';

  description = '';

  container = null;

  mainContainer = null;

  constructor(name, total, description, container, mainContainer) {
    this.name = name;

    this.total = total;

    this.description = description;

    this.container = container;

    this.mainContainer = mainContainer;
  }

  create() {

    const title = this.getTitle();
    const total = this.getTotal();
    const description = this.getDescription();

    this.container.appendChild(title);
    this.container.appendChild(total);

    if (description) {
      this.container.appendChild(description);
    }

  }

  getTitle() {

    const h2 = document.createElement('h2');
    h2.classList.add('kc-gallery-title');

    h2.textContent = this.name;

    return h2;

  }

  getTotal() {

    const h3 = document.createElement('h3');
    h3.classList.add('kc-gallery-total');

    h3.textContent = this.total;

    return h3;

  }

  getDescription() {

    if (!this.description) {
      return null;
    }

    const wrap = document.createElement('div');
    wrap.classList.add('kc-description-container', 'kc-description-hidden');

    const inner = document.createElement('div');
    inner.classList.add('kc-description');

    inner.textContent = this.description;

    wrap.appendChild(inner);

    setTimeout(() => {
      const descHeight = inner.getBoundingClientRect().height;
      if (descHeight > 70) {
        this.clampDescription(inner, wrap);
      }
      else {
        wrap.classList.remove('kc-description-hidden');
      }

    })

    return wrap;
  }

  clampDescription(descriptionDiv, descriptionContainer) {
    descriptionDiv.classList.add('kc-description-clamped');

    const showMoreBtn = document.createElement('span');
    showMoreBtn.textContent = 'Show More';
    showMoreBtn.classList.add('kc-showmore-btn');

    showMoreBtn.addEventListener('click', (e) => {
      if (descriptionDiv.classList.contains('kc-description-clamped')) {
        e.target.textContent = 'Show Less';
        descriptionDiv.classList.remove('kc-description-clamped');
      } else {
        descriptionDiv.classList.add('kc-description-clamped');
        e.target.textContent = 'Show More';
      }
    });

    descriptionContainer.classList.remove('kc-description-hidden');
    descriptionContainer.appendChild(showMoreBtn);

  }
}
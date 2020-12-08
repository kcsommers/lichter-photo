import './breadcrumbs.component.scss';
import { createBreadCrumbs } from "../../core/helpers/dom";
import { getCollectionRootPath } from "../../core/helpers/photoshelter-api";
import { SITE_URL } from "../../core/helpers/utils";

export class BreadCrumbs {

  queryParams = null;

  container = null;

  isWebflowPage = false;

  constructor(queryParams, container, isWebflowPage) {
    this.queryParams = queryParams;

    this.container = container;

    this.isWebflowPage = isWebflowPage;
  }

  create() {

    if (!this.queryParams) {
      console.warn('No query params to work with!');
      return;
    }

    if (!this.container) {
      console.warn('Breadcrumbs container does not exist!');
      return;
    }

    const breadcrumbsWrap = document.createElement('div');
    breadcrumbsWrap.classList.add('kc-breadcrumbs-wrap');

    this.container.prepend(breadcrumbsWrap);

    const cID = this.queryParams.cID || this.queryParams.C_ID;

    getCollectionRootPath(cID)
      .then(collectionPath => {
        const collectionPathParsed = collectionPath && JSON.parse(collectionPath).data;

        const breadcrumbs = collectionPathParsed.RootPath.reduce((crumbs, p) => {

          if (p.collection_id === 'root_hidden' || p.collection_id === 'root_site' || p.collection_id === cID) {
            return crumbs;
          }

          crumbs.push({ text: p.name, path: `${SITE_URL}/gallery-collection/${p.name}/${p.collection_id}` });
          return crumbs;
        }, []);

        this.attachBreadCrumbs(breadcrumbs, breadcrumbsWrap, this.container);
      })
      .catch(err => {
        this.container.removeChild(breadcrumbsWrap);
        console.error(err);
      })

  }

  // breadcrumbs = { text, path }[]
  attachBreadCrumbs = (breadcrumbs, wrap, container) => {

    const crumbEl = (crumb) => {
      const crumbTag = document.createElement('a');
      crumbTag.classList.add('kc-breadcrumb');
      if (this.isWebflowPage) {
        crumbTag.classList.add('kc-breadcrumb-tag-webflow');
      }
      crumbTag.href = crumb.path;
      crumbTag.textContent = crumb.text;

      return crumbTag;
    };

    breadcrumbs.forEach(c => {
      wrap.prepend(crumbEl(c));
    });

    container.prepend(wrap);

    setTimeout(() => {
      wrap.classList.add('kc-breadcrumbs-wrap-visible');
    });
  };

};
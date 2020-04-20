import { Storage } from "../storage";

export const SearchPage = () => {
  localStorage.removeItem(Storage.QUERY_DATA);
  document.addEventListener('DOMContentLoaded', () => {
    const formEl = document.querySelector('.search_box_advanced');
    if (formEl) {
      const modelEl = formEl.children[6];
      const propertyEl = formEl.children[7];
      const pricingEl = formEl.children[8];
      if (modelEl) {
        formEl.removeChild(modelEl);
      }
      if (propertyEl) {
        formEl.removeChild(propertyEl);
      }
      if (pricingEl) {
        formEl.removeChild(pricingEl);
      }
    }
  });
};

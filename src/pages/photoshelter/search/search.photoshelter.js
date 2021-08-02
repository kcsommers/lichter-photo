import { Storage } from '../../../core/storage';

export const Search = {
  init: function () {
    localStorage.removeItem(Storage.QUERY_DATA);

    document.addEventListener('DOMContentLoaded', () => {
      // set sort by to Date
      // this.setSortBy();
    });
  },

  setSortBy: function () {
    const sortByInput = document.querySelector(
      '.search_box_advanced select[name=I_SORT]'
    );

    if (sortByInput) {
      sortByInput.value = 'DATE';
    }
  },
};

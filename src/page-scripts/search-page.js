import { Storage } from "../storage";

export const SearchPage = {

  init: function () {
    localStorage.removeItem(Storage.QUERY_DATA);
  }

};

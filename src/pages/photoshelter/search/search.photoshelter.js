import { Storage } from "../../../core/storage";

export const Search = {

  init: function () {
    localStorage.removeItem(Storage.QUERY_DATA);
  }

};

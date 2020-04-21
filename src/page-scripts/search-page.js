import { Storage } from "../storage";

export const SearchPage = () => {
  localStorage.removeItem(Storage.QUERY_DATA);
};

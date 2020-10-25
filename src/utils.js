export const baseUrl = 'https://lichterphoto.photoshelter.com';

export const getQueryParams = (query) => {

  const toParse = query || window.location.search;

  if (toParse) {
    const query = toParse.substr(1);

    const result = {};

    query.split('&').forEach((part) => {
      const item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });

    return result;

  }

  return null;
}

export const log = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.log.apply(console, args);

  }
};

export const parsePath = (path) => {
  const queryData = localStorage.getItem(Storage.QUERY_DATA);
  const queryDataParsed = queryData && JSON.parse(queryData);

  const gIDMatch = path.match(/(G_ID=)(.*?)(?=&)/);
  const cIDMatch = path.match(/(C_ID=)(.*?)(?=&)/);
  const searchTermMatch = path.match(/(I_DSC=)(.*?)(?=&)/);
  const isAndMatch = path.match(/(I_DSC_AND=)(t|f)/);
  const offsetMatch = path.match(/(_bqO=[0-9]+)/);

  let gID, cID, searchTerm, isAnd, offset;
  if (gIDMatch) {
    gID = gIDMatch[2];
  } else if (queryDataParsed && queryDataParsed.gID) {
    gID = queryDataParsed.gID;
  }
  if (cIDMatch) {
    cID = cIDMatch[2];
  } else if (queryDataParsed && queryDataParsed.cID) {
    cID = queryDataParsed.cID;
  }
  if (searchTermMatch) {
    searchTerm = searchTermMatch[2];
  } else if (queryDataParsed && queryDataParsed.searchTerm) {
    searchTerm = queryDataParsed.searchTerm;
  }
  if (isAndMatch) {
    isAnd = isAndMatch[0];
  }
  if (offsetMatch) {
    offset = offsetMatch[0];
  }

  return { gID, cID, searchTerm, isAnd, offset }
};

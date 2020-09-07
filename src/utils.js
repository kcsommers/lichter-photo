
export const getQueryParams = () => {

  if (window.location.search) {
    const query = window.location.search.substr(1);

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


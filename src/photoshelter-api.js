const http = require('http');

const baseUrl = '/psapi/v3';
const host = 'www.photoshelter.com';
const headers = {
  'x-ps-api-key': '_ZGaiaXPmIU'
};
const apiOptions = (path) => ({ host, path, headers });

export const getGalleryThumbs = (cID) => {
  const extend = {
    Gallery: {},
    MediaCount: {
      fields: 'images'
    },
    KeyImage: {
      fields: 'image_id'
    },
    ImageLink: {
      fields: 'base,link'
    }
  }
  const path = `${baseUrl}/collection/${cID}/children?extend=${JSON.stringify(extend)}`;
  return requestData(apiOptions(path));
};

export const getGalleryInfo = (gID) => {
  return requestData(apiOptions(`${baseUrl}/gallery/${gID}`));
};

const requestData = (options) => {
  return new Promise((resolve, reject) => {
    http.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });

    }).on('error', (e) => {
      reject(e);
    });
  });
};

// const path = `/psapi/v3/gallery/G0000z5GWRYpQAlU/images`;
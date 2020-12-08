const http = require('http');

const baseUrl = '/psapi/v3';
const host = 'www.photoshelter.com';
const headers = {
  'x-ps-api-key': '_ZGaiaXPmIU'
};
const apiOptions = (path) => ({ host, path, headers });

export const getCollection = (cID) => {
  const extend = {
    Children: {},
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
  };

  const path = `${baseUrl}/collection/${cID}?extend=${JSON.stringify(extend)}`;

  const tap = (res) => {
    const resParsed = JSON.parse(res);

    if (!resParsed.data || !resParsed.data.Collection) {
      return resParsed;
    }

    return resParsed.data.Collection;
  };

  return requestData(apiOptions(path), tap);
};

export const getGalleryInfo = (gID) => {
  return requestData(apiOptions(`${baseUrl}/gallery/${gID}`));
};

export const getCollectionRootPath = (cID) => {
  if (cID === 'root_site') {
    return new Promise((resolve, rj) => resolve(JSON.stringify({
      data: {
        RootPath: [{
          collection_id: 'root_site'
        }]
      }
    })))
  }
  return requestData(apiOptions(`${baseUrl}/collection/${cID}/root_path`));
}

export const getGalleryImagesWithSearch = (gID, searchTerms, page) => {
  const extension = {
    "ImageLink": {
      "fields": "base"
    }
  };

  const url = `${baseUrl}/media/search?terms=${searchTerms}&galleries=${gID}&sort_by=file_name&sort_dir=asc&page=${page}&per_page=10&extend=${JSON.stringify(extension)}`;

  return requestData(apiOptions(url));
}

export const getGalleryImages = (gID, page) => {

  const extension = {
    "Image": {
      "fields": "file_name,img_id",
    },
    "ImageLink": {
      "fields": "link,base",
      "params": {
        "image_mode": "fit",
        "image_size": "300x300"
      }
    }
  };

  const url = `${baseUrl}/gallery/${gID}/images?page=${page}&per_page=10&sort_by=file_name&sort_dir=asc&extend=${JSON.stringify(extension)}`;

  return requestData(apiOptions(url));
};

const requestData = (options, tap) => {

  return new Promise((resolve, reject) => {
    http.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(tap ? tap(data) : data);
      });

    }).on('error', (e) => {
      reject(e);
    });
  });
};

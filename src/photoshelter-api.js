require('dotenv').config();

const http = require('http');

console.log('KEY', process.env.PHOTOSHELTER_API_KEY)

const apiHost = 'www.photoshelter.com'
const options = {
  host: apiHost,
  path: '/psapi/v3/gallery/G0000z5GWRYpQAlU/images',
  headers: {
    'x-ps-api-key': process.env.PHOTOSHELTER_API_KEY
  }
}

http.get(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    console.log('ON DATA');
    data += chunk;
  });

  res.on('end', () => {
    console.log('ON END');
    console.log(JSON.parse(data));
  });

}).on('error', (e) => {
  console.log(`Error: ${e.message}`);
});
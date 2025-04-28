import jsonp from 'jsonp';

const fetchJsonp = (url) => {
  return new Promise((resolve, reject) => {
    jsonp(url, { param: 'callback' }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

export default fetchJsonp;
import { API_TIMEOUT_SECONDS } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// export const getJSON = async function (URL) {
//   try {
//     const res = await Promise.race([fetch(URL), timeout(API_TIMEOUT_SECONDS)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async function (URL, UploadData) {
//   try {
//     const resPro = fetch(URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(UploadData),
//     });

//     const res = await Promise.race([resPro, timeout(API_TIMEOUT_SECONDS)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

export const AJAX = async function (url, UploadData = undefined) {
  try {
    const fetchPro = UploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(UploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(API_TIMEOUT_SECONDS)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

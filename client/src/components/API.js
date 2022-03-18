const API = {
  getBlockInfo: (id) => {
    return fetch(`/fabricator/api/getDataObject/?id=${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json());
  },
  saveBlock: (id, data) => {
    fetch('/fabricator/api/saveBlock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({ id, data }),
    })
  },
};

export default API;

const API = {
  getBlockInfo(id) {
    return fetch(`/fabricator/api/getBlock/?id=${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json());
  },

  getBlockTypes() {
    return fetch('/fabricator/api/getBlockTypes', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json());
  },

  getBlockSchema(blockType) {
    fetch(`/fabricator/api/getBlockSchema?blockType=${blockType}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json());
  },

  newBlock(elementAreaId, blockType) {
    return fetch(`/fabricator/api/newBlock?elementAreaId=${elementAreaId}&blockType=${blockType}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin'
    });
  },

  saveBlock(id, data) {
    fetch('/fabricator/api/saveBlock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({ id, data }),
    });
  },
};

export default API;

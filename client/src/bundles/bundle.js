import React from 'react';
import ReactDOM from 'react-dom';

import Fabric from '../js/Fabric';

window.document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Fabric />,
    document.getElementById('fabricator-app')
  );
});

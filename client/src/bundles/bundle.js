import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <div>Edit with Fabricator</div>
  );
}

window.document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('fabricator-app')
  );
});

import React from 'react';
import ReactDOM from 'react-dom';


class Fabricator extends React.Component {
  constructor(props) {
    super(props);

    // unsure if this is the right way??
    const ROOT = document.querySelector('#fabricator-app');
    const allowedFields = ROOT.getAttribute('allowed-fields');
    const hasBlocks = ROOT.getAttribute('has-blocks');


    this.state = {
      allowedFields,
      hasBlocks
    };

    console.log(this.state);
  }

  render() {
    const hasBlocks = this.state.hasBlocks;
    let menuState = '';
    if (hasBlocks) {
      menuState = 'Elemental';
    } else {
      menuState = 'PagesOnly';
    }

    return (
      <div>
        {menuState}
        <ContactsList />
      </div>
    );
  }
}

class ContactsList extends React.Component{
  render(){ 
    return(
      <ul>
          <li>
              Joe 02712345678
          </li>
      </ul>
    );
  }
  }


window.document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Fabricator />,
    document.getElementById('fabricator-app')
  );
});

import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../components/Navbar';


class Fabricator extends React.Component {
  constructor(props) {
    super(props);

    // unsure if this is the right way??
    const ROOT = document.querySelector('#fabricator-app');
    const allowedFields = ROOT.getAttribute('allowed-fields');
    const blocks = ROOT.getAttribute('blocks');

    console.log(JSON.parse(JSON.stringify(blocks)));
    console.log(JSON.parse(blocks));


    this.state = {
      allowedFields,
      blocks
    };

    console.log(this.state);
  }

  render() {
    // const hasBlocks = this.state.hasBlocks;
    let menuState = '';
    // if (hasBlocks) {
    //   menuState = 'Elemental';
    // } else {
    //   menuState = 'PagesOnly';
    // }

    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

window.document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Fabricator />,
    document.getElementById('fabricator-app')
  );
});

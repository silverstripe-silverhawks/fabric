import React from 'react';

class NewBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blockTypes: [{
        'Title': 'Content',
      }]
    }
  }

  render() {
    const blockTypes = this.state.blockTypes;
      return (
        <div className="fabricator-input">
          <label htmlFor="Title">Title</label>
          <select className="select-field" value="Content">
            { blockTypes.map(ele => <option key={ele.Title} value={ele.Title}>{ele.Title}</option>)}
          </select>
        </div>
      );
  };
}

export default NewBlock;

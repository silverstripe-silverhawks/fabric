import React from 'react';
import API from '../API';

class NewBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blockTypes: [],
      elementAreaId: props.elementAreaId,
      selectedBlockType: '',
    };

    this.createNewBlock = this.createNewBlock.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    API.getBlockTypes()
    .then(blockTypes => {
      this.setState({
        blockTypes
      });
    });
  }

  createNewBlock() {
    const { elementAreaId, selectedBlockType } = this.state;
    API.newBlock(elementAreaId, selectedBlockType)
    .then(created => {
      console.log(created);
    });
  }

  handleChange(e) {
    this.setState({
      selectedBlockType: e.target.value,
    });
  }

  render() {
    const { blockTypes, selectedBlockType } = this.state;

    return (
      <div className="fabricator__content">
        <div className="fabricator__block">
          <div className="fabricator-input">
            <label htmlFor="Title">Title</label>
            <select className="select-field" value={selectedBlockType} onChange={this.handleChange}>
              { blockTypes.map(ele => <option key={ele.Title} value={ele.Class}>{ele.Title}</option>)}
            </select>

            <button className="btn" onClick={this.createNewBlock}>Get</button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewBlock;

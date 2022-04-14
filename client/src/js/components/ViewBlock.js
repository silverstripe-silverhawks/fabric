import React from 'react';
import ManyManyBlock from './ManyManyBlock';
import API from '../API';
import Input from './Input';
import FieldListIterator from './FieldListIterator';

class ViewBlock extends React.Component {
  constructor(props) {
    super(props);
    const blockInfo = props.blockInfo;
    const id = props.blockInfo.ID.value;

    this.state = {
      id,
      blockInfo,
      hasMany: [],
      loading: true,
    };

    this.saveBlock = this.saveBlock.bind(this);
  }

  componentDidMount() {
    API.getBlockInfo(this.state.id)
    .then(data => {
      // convert has many into array structure for rendering
      const hasMany = [];
      Object.keys(data.HasMany).map((hasManyKey, index) => {
        hasMany.push({
          Title: hasManyKey,
          Values: data.HasMany[hasManyKey]
        });
      });

      this.setState({
        loading: false,
        hasMany,
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  saveBlock() {
    const id = this.state.editBlockId;
    const changedValues = {};

    Object.entries(this.state.blockInfo).forEach(([key, value]) => {

      if ('hasChanged' in value) {
        changedValues[key] = this.state.blockInfo[key];
      }
    });

    if (Object.keys(changedValues).length > 0) {
      API.saveBlock(id, changedValues)
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(error => {
        console.error(error);
      });
    }
  }

  render() {
    const pageFieldsIterator = {
      keys: Object.keys(this.state.blockInfo),
      skipKeys: ['ID', 'Type'],
      object: this.state.blockInfo,
    };

    if (this.state.loading) {
      return <div className="fabricator-loader" />;
    }

    return (
      <div className="fabricator__content">
        <div className="fabricator__block page">
          <FieldListIterator iterator={pageFieldsIterator} />
        </div>

        { this.state.hasMany.map((hasMany) => <ManyManyBlock data={hasMany} />) }

        <div className="block-content__footer">
          <button className="fabricator-btn fabricator-btn--outline-green" onClick={this.saveBlock}>Save</button>
        </div>
      </div>
    );
  }
}

export default ViewBlock;


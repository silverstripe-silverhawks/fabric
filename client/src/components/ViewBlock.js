import React from 'react';
import API from './API';

class ViewBlock extends React.Component {
  constructor(props) {
    super(props);

    // let blockInfo = [];
    // let id = 0;
    const blockInfo = props.blockInfo;
    const id = props.blockInfo.ID.value;

    this.state = {
      id,
      blockInfo,
      hasMany: [],
      loading: true,
    };

    this.saveBlock = this.saveBlock.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  componentDidMount() {
    API.getBlockInfo(this.state.id)
    .then(data => {
      // convert has many into array structure for rendering
      let hasMany = [];
      Object.keys(data.HasMany).map((hasManyKey, index) => {
        hasMany.push({
          Title: hasManyKey,
          Values: data.HasMany[hasManyKey]
        });
      });

      this.setState({
        loading: false,
        hasMany: hasMany,
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  updateValue(e, key) {
    const value = e.target.value;
    this.setState(prevState => ({
      blockInfo: {
        ...prevState.blockInfo,
        [key]: {
          ...prevState.blockInfo[key],
          value,
          hasChanged: true,
        },
      },
    }));

    // update the dom element now...
    // this might require some re-thinking
    const id = this.state.editBlockId;
    let type = this.state.editBlockInfo[key].type.toLowerCase();
    const element = document.querySelector(`#e${id}`);

    // for demo purposes
    // this implementation is dangerous and not ideal.
    // it should be changed to a more robust solution
    // as it makes assumptions about the dom structure

    // https://www.npmjs.com/package/sanitize-html
    if (type === 'htmltext') type = 'content';
    element.querySelector(`[class*="__${type}"]`).innerHTML = value;
  }

  saveBlock() {
    let changedValues = {};

    Object.entries(this.state.blockInfo).forEach(([key, value]) => {

      if ('hasChanged' in value) {
        changedValues[key] = this.state.blockInfo[key];
      }
    });

    if (Object.keys(changedValues).length > 0) {
      API.saveBlock(id,  changedValues)
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(error => {
        console.error(error);
      });
    }
  }

  render() {
    const newBlock = this.state.id === -1;
    const info = this.state.blockInfo;

    const getTitle = () => {
      return this.state.blockInfo.Title.value;
    };

    const renderInput = (elementField, key) => {
      if (elementField.type === 'Boolean') {
        return <input type="checkbox" id={elementField.type} name={elementField.type} defaultChecked={parseInt(elementField.value, 10)} />;
      } else if (elementField.type === 'HTMLText') {
        return (
          <textarea
            className="text-field"
            rows="10"
            type="text"
            name={elementField.type}
            value={elementField.value}
            onChange={(e) => this.updateValue(e, key)}
          />
        );
      }

      return (
        <input
          className="text-field"
          type="text"
          name={elementField.type}
          value={elementField.value}
          onChange={(e) => this.updateValue(e, key)}
        />
      );
    };

    const renderEditBlockFields = () => {
      const fields = Object.keys(this.state.blockInfo).map((eleKey, index) => {
        if (eleKey !== 'ID' && eleKey !== 'Type') {
          const elementField = this.state.blockInfo[eleKey];
          return (
            <div key={index} className="fabricator-input">
              <div className="label">{ eleKey }</div>
              { renderInput(elementField, eleKey) }
            </div>
          );
        }
      });

      return (
        <div className="fabricator-edit-block__content">
          <div className="fabricator-input__block">
            { fields}
          </div>
        </div>
      );
    };

    const renderHasMany = () => {
      const hasMany = this.state.hasMany;
      return hasMany.map(ele => {
        return (
          <div className="fabricator-edit-block__content">
            <div className="fabricator-input__block">
              <div key={ele.Title}>
                <h3>{ ele.Title }</h3>
                <ul>
                  { Object.keys(ele.Values).map((eleValue, index) => {
                    return <li key={index}>{ ele.Values[eleValue].Title.value }</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        );
      });
    };

    if(this.state.loading) {
      return <div className="fabricator-loader" />
    }


    return (
      <div>
        { renderEditBlockFields() }
        { renderHasMany() }

        <div className="fabricator-edit-block-content-footer">
          <button className="fabricator-btn fabricator-btn--outline-green" onClick={this.saveBlock}>Save</button>
        </div>
      </div>
    );
  }

}

export default ViewBlock;


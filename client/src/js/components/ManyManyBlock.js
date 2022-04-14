import React from 'react';
import FieldListIterator from './FieldListIterator';

class ManyManyBlock extends React.Component {
  constructor(props) {
    super(props);

    const keys = Object.keys(props.data.Values[0]);

    this.state = {
      data: props.data,
      keys,
    };
  }

  render() {
    const values = this.state.data.Values;
    const keys = this.state.keys;

    return (
      <div className="fabricator__block has-many">
        <h3>{ this.state.data.Title }</h3>
        {
          values.map((ele, index) => (
            <div>
              <h4>{this.state.data.Title} {index + 1} </h4>
              <FieldListIterator iterator={{ keys, object: ele }} />
            </div>
          ))
        }
      </div>
    );
  }
}

export default ManyManyBlock;

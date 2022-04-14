// Used in the ManyManyBlock component
import React from 'react';
import Input from './Input';

// Allows us to loop through the values of an object
class FieldListIterator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      iterator: props.iterator
    };
  }

  render() {
    const { keys, object } = this.state.iterator;

    return (
      keys.map(key => (
        <div className="fabricator-input">
          <label htmlFor={key}>{ key }</label>
          <Input key={key} name={key} field={object[key]} />
        </div>
      ))
    );
  }
}

export default FieldListIterator;

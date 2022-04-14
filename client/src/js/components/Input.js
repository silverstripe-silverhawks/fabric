import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      field: props.field,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // need to add mobx for state management
  handleChange(e) {
    const { value } = e.target;
    this.setState(prevState => ({
      field: {
        ...prevState.field,
        value,
        hasChanged: true,
      },
    }));
  }

  render() {
    const { name, field } = this.state;
    if (field.type === 'Boolean') {
      return <input type="checkbox" id={field.type} name={name} defaultChecked={parseInt(field.value, 10)} />;
    }
    if (field.type === 'HTMLText') {
      return (
        <textarea
          className="text-field"
          rows="10"
          type="text"
          name={name}
          value={field.value}
          onChange={this.handleChange}
        />
      );
    }

    return (
      <input
        className="text-field"
        type="text"
        name={name}
        value={field.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default Input;

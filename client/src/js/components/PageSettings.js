import React from 'react';

class PageSettings extends React.Component {
  constructor(props) {
    super(props);

    this.setState({
      settings: [],
    });
  }

  render() {
    return (
      <div>Page settings</div>
    );
  }
}

export default PageSettings;

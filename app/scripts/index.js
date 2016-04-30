import React, { Component } from 'react';

import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { stateField: '' };
  }

  render() {
    return (
      <div>Test componentxc as</div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.wrapper'));

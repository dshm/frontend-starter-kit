import { markupMenu } from './markup-menu';
markupMenu(window.document);


/*
  remove when start project*****************************************************
*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '"MARKUP-framework"' };
  }

  render() {
    return (
      <div>React component {this.state.name}</div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.wrapper'));
/*
********************************************************************************
*/
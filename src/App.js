import React, { Component } from 'react';
import './App.css';

import Articles from './components/Articles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    this.props.changeOrderByUpvotes();
    this.setState({ articles: this.props.articles })
  }

  onTopClicked = () => {
    this.props.changeOrderByDate();
    this.setState({ articles: this.props.articles })
  }

  onNewestClicked = () => {
    this.props.changeOrderByUpvotes();
    this.setState({ articles: this.props.articles })
  }

  render() {
    const { articles } = this.state;

    return (
      <div className="App">
        <div className="navigation">
          <button data-testid="top-link" onClick={this.onTopClicked}>Top</button>
          <button data-testid="newest-link" onClick={this.onNewestClicked}>Newest</button>
        </div>
        <Articles articles={articles} />
      </div>
    );
  }
}

export default App;

import React from 'react';

class Articles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { articles } = this.props
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Upvotes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((el, i) => (
            <tr key={i} data-testid="article">
              <td data-testid="article-title">{el.title}</td>
              <td data-testid="article-upvotes">{el.upvotes}</td>
              <td data-testid="article-date">{el.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Articles;

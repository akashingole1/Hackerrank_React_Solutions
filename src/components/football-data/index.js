
import React, { Component } from "react";
import "./index.css";
const classNames = require('classnames');

export default class FootballMatchesData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      matchData: [],
      firstHit: false
    };
  }

  onClick = (year) => (e) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    this.setState({
      selectedYear: year
    })
    fetch(`https://jsonmock.hackerrank.com/api/football_competitions?year=${year}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ matchData: json.data, firstHit: true })
      })
  }

  render() {
    var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li className={
                classNames({
                  'sidebar-item': true,
                  'active': this.state.selectedYear === year
                })
              }
                onClick={this.onClick(year)}
                key={year}>
                <a>{year}</a>
              </li>
            )
          })}
        </ul>

        <section className="content">
          {this.state.matchData && this.state.matchData.length > 0 ?
            <section>
              <div className="total-matches" data-testid="total-matches">Total matches: {this.state.matchData.length}</div>

              <ul className="mr-20 matches styled" data-testid="match-list">
                {this.state.matchData.map((item, index) => {
                  return (
                    <li key={index} className="slide-up-fade-in">Match {item.name} won by {item.winner}</li>
                  )
                })}
              </ul>
            </section> : this.state.firstHit ? <div data-testid="no-result" className="slide-up-fade-in no-result">No Matches Found</div> : ''
          }
        </section>
      </div>
    );
  }
}
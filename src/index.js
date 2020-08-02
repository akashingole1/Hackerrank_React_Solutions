import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const ARTICLES = [
  {
    title: "A message to our customers",
    upvotes: 12,
    date: "2020-01-24",
  },
  {
    title: "Alphabet earnings",
    upvotes: 22,
    date: "2019-11-23",
  },
  {
    title: "Artificial Mountains",
    upvotes: 2,
    date: "2019-11-22",
  },
  {
    title: "Scaling to 100k Users",
    upvotes: 72,
    date: "2019-01-21",
  },
  {
    title: "the Emu War",
    upvotes: 24,
    date: "2019-10-21",
  },
  {
    title: "What's SAP",
    upvotes: 1,
    date: "2019-11-21",
  },
  {
    title: "Simple text editor has 15k monthly users",
    upvotes: 7,
    date: "2010-12-31",
  },
];

function changeOrderByDate() {
  ARTICLES.sort(function (a, b) {
    var dateA = new Date(a.date), dateB = new Date(b.date); return dateB - dateA;
  })
}

function changeOrderByUpvotes() {
  ARTICLES.sort(function (a, b) { return b.upvotes - a.upvotes })
}
ReactDOM.render(<App articles={ARTICLES} changeOrderByDate={changeOrderByDate}
  changeOrderByUpvotes={changeOrderByUpvotes} />, document.getElementById('root'));
registerServiceWorker();

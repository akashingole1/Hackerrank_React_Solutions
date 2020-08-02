import React from 'react';
import App from './App';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import fetchMock from 'fetch-mock'
import 'jest-dom/extend-expect';

const renderApp = () => render(<App/>);

afterEach(() => {
  fetchMock.restore();
  cleanup()
});

test('initial UI is rendered as expected', () => {
	let { getByTestId, queryByTestId } = renderApp();
  expect(getByTestId('app-title')).toHaveTextContent('Football Comptetions');
  expect(getByTestId('year-list').childNodes).toHaveLength(7);
	expect(queryByTestId('total-matches')).toBe(null);
  expect(queryByTestId('match-list')).toBe(null);
  expect(queryByTestId('no-result')).toBe(null);
});

test('search is made on by clicking on search button and no results found', async() => {
	let { getByTestId, queryByTestId } = renderApp();

  const url = 'https://jsonmock.hackerrank.com/api/football_competitions?year=2017';
  fetchMock.getOnce(url, JSON.stringify({ page:1,per_page:10,total:0,total_pages:0,data:[]}));
  
  fireEvent.click(getByTestId('year-list').childNodes[6]);

  await wait(() => {
    expect(queryByTestId('total-matches')).toBe(null);
    expect(queryByTestId('match-list')).toBe(null);
    expect(queryByTestId('no-result')).not.toBe(null);
    expect(getByTestId('no-result')).toHaveTextContent('No Matches Found');
  });
});

test('search is made on by clicking on search button and result found - test 1', async() => {
	let { getByTestId, queryByTestId } = renderApp();

  const url = 'https://jsonmock.hackerrank.com/api/football_competitions?year=2011';
  fetchMock.getOnce(url, JSON.stringify({ page:1,per_page:10,total:0,total_pages:0,data:[{"name":"UEFA Champions League","country":"","year":2011,"winner":"Chelsea","runnerup":"Bayern Munich"},{"name":"Serie A","country":"Italy","year":2011,"winner":"Juventus","runnerup":"AC Milan"},{"name":"Bundesliga","country":"Germany","year":2011,"winner":"Borussia Dortmund","runnerup":"Bayern Munchen"}]}));
  
  fireEvent.click(getByTestId('year-list').childNodes[0]);

  await wait(() => {
    expect(queryByTestId('total-matches')).toHaveTextContent('Total matches: 3');
    const results = queryByTestId('match-list');
    expect(results.childNodes).toHaveLength(3);
    expect(results.childNodes[0]).toHaveTextContent('Match UEFA Champions League won by Chelsea');
    expect(results.childNodes[1]).toHaveTextContent('Match Serie A won by Juventus');
    expect(results.childNodes[2]).toHaveTextContent('Match Bundesliga won by Borussia Dortmund');
    expect(queryByTestId('no-result')).toBe(null);
  });
});

test('search is made on by clicking on search button and result found - test 2', async() => {
	let { getByTestId, queryByTestId } = renderApp();

  const url = 'https://jsonmock.hackerrank.com/api/football_competitions?year=2013';
  fetchMock.getOnce(url, JSON.stringify({ page:1,per_page:10,total:0,total_pages:0,data:[{"name":"English Premier League","country":"England","year":2013,"winner":"Manchester City","runnerup":"Liverpool"},{"name":"La Liga","country":"Spain","year":2013,"winner":"Atletico Madrid","runnerup":"FC Barcelona"}]}));
  
  fireEvent.click(getByTestId('year-list').childNodes[2]);

  await wait(() => {
    expect(queryByTestId('total-matches')).toHaveTextContent('Total matches: 2');
    const results = queryByTestId('match-list');
    expect(results.childNodes).toHaveLength(2);
    expect(results.childNodes[0]).toHaveTextContent('Match English Premier League won by Manchester City');
    expect(results.childNodes[1]).toHaveTextContent('Match La Liga won by Atletico Madrid');
    expect(queryByTestId('no-result')).toBe(null);
  });
});

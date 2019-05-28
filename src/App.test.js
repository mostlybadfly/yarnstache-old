import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// we could try to write this test if you're interested!
describe('fetch request', () => {
  xit('returns a list of yarns', () => {

  })
})

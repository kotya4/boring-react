import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Weather } from './weather.js';

async function main() {

  await Weather.init();

  ReactDOM.render(
    <App  weather={Weather} />,
    document.getElementById('root')
  );

}

main();

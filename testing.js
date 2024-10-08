// testing.js
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import IconSportAllSports from './lib/sports/solid/icon-sport-all-sports.jsx';

const renderedIconSportAllSports = ReactDOMServer.renderToString(<IconSportAllSports />);
console.log(renderedIconSportAllSports);

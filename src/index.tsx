import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './App';
import './styles/index.css';

const rootElement = document.getElementById('root');

render(
    <App />,
    rootElement,
);

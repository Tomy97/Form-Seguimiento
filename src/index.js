import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ar-poncho/dist/css/poncho.min.css';
import Container from "./components/Container/container";

ReactDOM.render(
  <React.Fragment>
    <Container />
  </React.Fragment>,
  document.getElementById('root')
);


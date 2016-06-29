'use strict';

var React = require('react');

if (!React) {
  throw new Error('AMUIReact requires React.');
}

module.exports = {
  VERSION: '1.0.0',

  // layout
  ReactForm: require('./ReactForm'),
  ReactInput: require('./ReactInput'),
  ReactLoading: require('./ReactLoading'),
  ReactModal: require('./ReactModal'), 
  ReactSelect: require('./ReactSelect'),  
  ReactTableForm: require('./ReactTableForm'),
  Table: require('./Table/Table'),
  Upload: require('./Upload'),

  utils: require('./utils')
};

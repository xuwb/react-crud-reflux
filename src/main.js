'use strict';

define(function (require) {
	var React = require('react'),
	    ReactDOM = require('reactDom'),
	    Containter = require('jsx/container');

	ReactDOM.render(React.createElement(Containter, { dataSource: 'src/data.json' }), document.getElementById('main'));
});
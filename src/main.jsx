'use strict';

define(function(require) {
	var React     = require('react'),
		ReactDOM  = require('reactDom'),
		DataTable = require('jsx/dataTable');

	var dataTable = ReactDOM.render(
		<DataTable source="src/data.json" />,
		document.getElementById('main')
	);
})
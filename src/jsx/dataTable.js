'use strict';

// 主体

define(function (require, exports, module) {
	var React = require('react');

	var CrudBtn = require('./crudBtn'),
	    DataRow = require('./dataRow');

	var DataTable = React.createClass({
		displayName: 'DataTable',

		getInitialState: function getInitialState() {
			return {
				data: []
			};
		},
		onTableBtnClick: function onTableBtnClick(type, data) {
			var list = this.state.data;

			switch (type) {
				case 'modify':
					this.props.callbackParent(data);
					break;
				case 'delete':
					var index = list.indexOf(data);
					index != -1 && list.splice(index, 1);
					this.setState({ data: list });
					break;
			}
		},
		render: function render() {
			var list = [];
			this.state.data.forEach(function (value) {
				list.push(React.createElement(DataRow, { key: value.id, data: value, callbackParent: this.onTableBtnClick }));
			}.bind(this));

			return React.createElement(
				'table',
				{ className: 'col-table', ref: 'tableList' },
				React.createElement(
					'thead',
					null,
					React.createElement(
						'tr',
						null,
						React.createElement(
							'td',
							{ width: '100' },
							'标题'
						),
						React.createElement(
							'td',
							{ width: '80' },
							'作者'
						),
						React.createElement(
							'td',
							{ width: '150' },
							'发布时间'
						),
						React.createElement(
							'td',
							{ width: '150' },
							'操作'
						)
					)
				),
				React.createElement(
					'tbody',
					null,
					list
				)
			);
		},
		componentDidMount: function componentDidMount() {
			var self = this;
			$.ajax({
				type: 'get',
				url: self.props.source,
				success: function success(data) {
					self.setState({
						data: data
					});
					self.props.setLastId(parseInt(data[data.length - 1].id));
				}
			});
		}
	});
	module.exports = DataTable;
});
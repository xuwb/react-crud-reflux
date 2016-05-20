'use strict';

// 主体

define(function (require, exports, module) {
	var React = require('react');

	var util = require('../common/util'),
	    CrudBtn = require('./crudBtn'),
	    DataRow = require('./dataRow'),
	    InfoBox = require('./infoBox');

	var DataTable = React.createClass({
		displayName: 'DataTable',

		getInitialState: function getInitialState() {
			return {
				elemTrs: null,
				articalId: 0,
				infoBtnType: 'add',
				infoStyle: {
					display: 'none'
				}
			};
		},
		addHandler: function addHandler(e) {
			e.preventDefault();
			e.stopPropagation();
			console.log('onClick add');

			this.setState({
				infoBtnType: 'add',
				infoStyle: {
					display: 'block'
				}
			});
		},
		onModifyClick: function onModifyClick(value) {
			console.log('modify-callback:' + value);

			this.refs.infoBox.setState({
				id: value.id,
				title: value.title,
				author: value.author
			}), this.setState({
				infoBtnType: 'modify',
				infoStyle: {
					display: 'block'
				}
			});
		},
		onDeleteClick: function onDeleteClick(value) {
			var list = this.state.elemTrs,
			    index;

			for (index in list) {
				if (list[index].key == value.id) break;
			}
			list.splice(index, 1);
			this.setState({
				elemTrs: list
			});
		},
		onInfoClick: function onInfoClick(show, value) {
			var list = this.state.elemTrs,
			    newId = ++this.state.articalId,
			    infoBtnType = this.state.infoBtnType;

			if (value) {
				if (infoBtnType == 'add') {
					this.setState({ articalId: newId });
					value.id = newId;
					list.push(this.createRow(value));
				}
				if (infoBtnType == 'modify') {
					var index;
					for (index in list) {
						if (list[index].key == value.id) break;
					}
					list.splice(index, 1, this.createRow(value));
				}
			}
			this.setState({
				elemTrs: list,
				infoStyle: {
					display: show
				}
			});
		},

		onTableBtnClick: function onTableBtnClick(list) {
			list = list ? list : this.state.elemTrs;
			self.setState({
				elemTrs: list
			});
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'col-top' },
					React.createElement(
						'h1',
						{ className: 'col-title' },
						'增删改DEMO'
					),
					React.createElement(
						'a',
						{ className: 'btn btn-add', href: '#', onClick: this.addHandler },
						'添加'
					)
				),
				React.createElement(
					'div',
					{ className: 'col-info', style: this.state.infoStyle },
					React.createElement(InfoBox, { ref: 'infoBox', callbackParent: this.onInfoClick, articalId: this.state.articalId })
				),
				React.createElement(
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
						this.state.elemTrs
					)
				)
			);
		},
		componentDidMount: function componentDidMount() {
			var self = this;
			$.ajax({
				type: 'get',
				url: this.props.source,
				success: function success(data) {
					var list = [];
					data.forEach(function (value) {
						// 通过组件方式调用
						self.setState({ articalId: parseInt(value.id) });
						list.push(self.createRow(value));
					});
					self.setState({
						elemTrs: list
					});
				}
			});
		},
		createRow: function createRow(value) {
			return React.createElement(
				DataRow,
				{ key: value.id },
				React.createElement(
					'span',
					null,
					value.title
				),
				React.createElement(
					'span',
					null,
					value.author
				),
				React.createElement(
					'span',
					null,
					util.formatDateTime(value.pubtime)
				),
				React.createElement(
					'span',
					null,
					React.createElement(CrudBtn, { btnName: '修改', data: value, callbackParent: this.onModifyClick }),
					' ',
					React.createElement(CrudBtn, { btnName: '删除', data: value, callbackParent: this.onDeleteClick })
				)
			);
		}
	});
	module.exports = DataTable;
});
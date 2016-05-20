'use strict';

// 修改删除按钮

define(function (require, exports, module) {

	var React = require('react');

	var CrudBtn = React.createClass({
		displayName: 'CrudBtn',

		getInitialState: function getInitialState() {
			return {};
		},
		clickHandler: function clickHandler(e) {
			e.preventDefault();
			e.stopPropagation();

			switch (this.props.btnName) {
				case '修改':
					console.log('update');
					this.props.callbackParent(this.props.data);
					break;
				case '删除':
					if (confirm("是否删除" + this.props.data.title + "？")) {
						this.props.callbackParent(this.props.data);
					}
					break;
			}
		},
		render: function render() {
			return React.createElement(
				'a',
				{ href: "#", onClick: this.clickHandler },
				this.props.btnName
			);
		}
	});
	return CrudBtn;
});
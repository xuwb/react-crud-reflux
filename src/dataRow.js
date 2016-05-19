"use strict";

// 表格行
var DataRow = React.createClass({
	displayName: "DataRow",

	render: function render() {
		return React.createElement(
			"tr",
			{ "data-id": this.props.dataId },
			React.Children.map(this.props.children, function (child) {
				return React.createElement(
					"td",
					null,
					child
				);
			})
		);
	}
});
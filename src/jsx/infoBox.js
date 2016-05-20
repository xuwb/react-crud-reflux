'use strict';

define(function (require, exports, module) {
	var React = require('react');

	// 添加修改信息
	var InfoBox = React.createClass({
		displayName: 'InfoBox',

		getInitialState: function getInitialState() {
			return { id: '', title: '', author: '' };
		},
		okHandler: function okHandler(e) {
			e.preventDefault();
			e.stopPropagation();

			var newInfo, showState;

			if (!this.refs.title.value) {
				newInfo = null;
				showState = 'block';
				alert('标题不能为空');
			} else {
				var infoId = this.state.id;
				if (!infoId) infoId = this.props.articalId;

				newInfo = {
					id: infoId,
					title: this.refs.title.value,
					author: this.refs.author.value ? this.refs.author.value : 'none',
					description: 'none',
					pubtime: new Date()
				};
				showState = 'none';
			}
			this.reset();
			this.props.callbackParent(showState, newInfo);
		},
		cancelHander: function cancelHander(e) {
			e.preventDefault();
			e.stopPropagation();

			this.reset();
			this.props.callbackParent('none');
		},
		changeHandler: function changeHandler(e) {
			var obj = {};
			obj[e.target.getAttribute('name')] = e.target.value;
			this.setState(obj);
		},
		reset: function reset() {
			this.setState({
				id: '',
				title: '',
				author: ''
			});
		},
		render: function render() {
			// 不能再渲染过程中（render，componentDidUpdate等）调用 this.setState，会导致死循环
			return React.createElement(
				'form',
				null,
				React.createElement(
					'ul',
					null,
					React.createElement(
						'li',
						null,
						React.createElement(
							'span',
							null,
							'标题'
						),
						React.createElement(
							'span',
							null,
							React.createElement('input', { ref: 'title', name: 'title', type: 'text', value: this.state.title, onChange: this.changeHandler })
						)
					),
					React.createElement(
						'li',
						null,
						React.createElement(
							'span',
							null,
							'作者'
						),
						React.createElement(
							'span',
							null,
							React.createElement('input', { ref: 'author', name: 'author', type: 'text', value: this.state.author, onChange: this.changeHandler })
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'col-btn' },
					React.createElement(
						'a',
						{ href: '#', className: 'btn btn-ok', onClick: this.okHandler },
						'确定'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'btn btn-cancel', onClick: this.cancelHander },
						'取消'
					)
				)
			);
		}
	});
	return InfoBox;
});
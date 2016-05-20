'use strict';

define(function(require, exports, module) {
	var React = require('react');

	// 添加修改信息
	var InfoBox = React.createClass({
		getInitialState: function() { 
	        return {id:'', title: '', author: ''};
        }, 
		okHandler: function(e){
			e.preventDefault();
			e.stopPropagation();
			
			var newInfo, showState;

			if(!this.refs.title.value) {
				newInfo = null;
				showState = 'block';
				alert('标题不能为空');
			}
			else {
				var infoId = this.state.id;
				if(!infoId) infoId = this.props.articalId;

				newInfo = {
					id: infoId,
					title: this.refs.title.value,
					author: this.refs.author.value ? this.refs.author.value : 'none',
					description: 'none',
					pubtime: new Date()
				}
				showState = 'none';
			}
			this.reset();
		    this.props.callbackParent(showState, newInfo);
		},
		cancelHander: function(e){
			e.preventDefault();
			e.stopPropagation();

			this.reset();
			this.props.callbackParent('none');
		},
		changeHandler: function(e){
			var obj = {};
			obj[e.target.getAttribute('name')] = e.target.value;
			this.setState(obj);
		},
		reset: function() {
			this.setState({
				id: '',
				title: '',
				author: ''
			});
		},
		render: function(){
			// 不能再渲染过程中（render，componentDidUpdate等）调用 this.setState，会导致死循环
			return (
				<form>
					<ul>
						<li>
							<span>标题</span>
							<span><input ref="title" name="title" type="text" value={this.state.title} onChange={this.changeHandler} /></span>
						</li>
						<li>
							<span>作者</span>
							<span><input ref="author" name="author" type="text" value={this.state.author} onChange={this.changeHandler} /></span>
						</li>
					</ul>
					<div className="col-btn">
						<a href="#" className="btn btn-ok" onClick={this.okHandler}>确定</a>
						<a href="#" className="btn btn-cancel" onClick={this.cancelHander}>取消</a>
					</div>
				</form>
			)
		}
	});
	return InfoBox;
})
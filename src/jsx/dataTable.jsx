'use strict';

// 主体
define(function(require, exports, module){
	var React = require('react');

	var util = require('../common/util'),
		CrudBtn = require('./crudBtn'),
		DataRow = require('./dataRow'),
		InfoBox = require('./infoBox');

	var DataTable = React.createClass({
		getInitialState: function(){
			return {
				elemTrs: null,
				articalId: 0,
				infoBtnType: 'add',
				infoStyle: {
					display: 'none'
				}
			}
		},
		addHandler: function(e){
			e.preventDefault();
			e.stopPropagation();
			console.log('onClick add');

			this.setState({
				infoBtnType: 'add',
				infoStyle: {
					display: 'block'
				}
			})
		},
		onModifyClick: function(value){
			console.log('modify-callback:' + value);

			this.refs.infoBox.setState({
				id: value.id,
				title: value.title,
				author: value.author
			}),

			this.setState({
				infoBtnType: 'modify',
				infoStyle: {
					display: 'block'
				}
			})
		},
		onDeleteClick: function(value){
			var list = this.state.elemTrs, index;

			for(index in list){  
			    if(list[index].key == value.id) break;
			} 
			list.splice(index, 1);
			this.setState({
				elemTrs: list
			})
		},
		onInfoClick: function(show, value){
			var list = this.state.elemTrs,
				newId = ++this.state.articalId,
				infoBtnType = this.state.infoBtnType;

			if(value) {
				if(infoBtnType == 'add') {
					this.setState({articalId: newId});
					value.id = newId;
					list.push(this.createRow(value));
				}
				if(infoBtnType == 'modify') {
					var index;
					for(index in list){  
					    if(list[index].key == value.id) break;
					} 
					list.splice(index, 1, this.createRow(value));
				}
			}
			this.setState({
				elemTrs: list,
				infoStyle: {
					display: show
				}
			})
		},
		
		onTableBtnClick: function(list){
			list = list ? list : this.state.elemTrs;
			self.setState({
				elemTrs: list
			})
		},
		render: function(){
			return (
				<div className="container">
					<div className="col-top">
						<h1 className="col-title">增删改DEMO</h1>
						<a className="btn btn-add" href="#" onClick={this.addHandler}>添加</a>
					</div>
					<div className="col-info" style={this.state.infoStyle}>
						<InfoBox ref="infoBox" callbackParent={this.onInfoClick} articalId={this.state.articalId} />
					</div>
					<table className="col-table" ref="tableList">
						<thead>
							<tr>
								<td width="100">标题</td>
							  	<td width="80">作者</td>
							  	<td width="150">发布时间</td>
							  	<td width="150">操作</td>
							</tr>
						</thead>
						<tbody>{this.state.elemTrs}</tbody>
					</table>
				</div>
			)
		},
		componentDidMount: function(){
			var self = this;
			$.ajax({
				type: 'get',
				url: this.props.source,
				success: function(data){
					var list = [];
					data.forEach(function(value){
						// 通过组件方式调用
						self.setState({articalId: parseInt(value.id)});
						list.push(self.createRow(value));
					})
					self.setState({
						elemTrs: list
					})
				}
			})
		},
		createRow: function(value){
			return (
				<DataRow key={value.id} >
					<span>{value.title}</span>
				  	<span>{value.author}</span>
				  	<span>{util.formatDateTime(value.pubtime)}</span>
				  	<span>
					  	<CrudBtn btnName="修改" data={value} callbackParent={this.onModifyClick} />
					  	&nbsp;
					  	<CrudBtn btnName="删除" data={value} callbackParent={this.onDeleteClick} />
				  	</span>
				</DataRow>
			)
		}
	});
	module.exports = DataTable;
});
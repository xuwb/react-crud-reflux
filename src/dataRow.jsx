// 表格行
var DataRow = React.createClass({
	render: function(){
		return (
			<tr data-id={this.props.dataId}>
				{
					React.Children.map(this.props.children, function(child){
						return <td>{child}</td>
					})
				}
			</tr>
		)
	}
});
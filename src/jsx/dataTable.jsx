'use strict';

// 主体
define(function(require, exports, module){
    var React     = require('react'),
        Reflux    = require('reflux');

    var CrudBtn   = require('./crudBtn'),
        DataRow   = require('./dataRow');

    var CrudStore = require('../stores/crud_store');

    var DataTable = React.createClass({
        mixins: [Reflux.connect(CrudStore, 'data')],

        getInitialState: function(){
            return {
                data: []
            }
        },
        onTableBtnClick: function(type, data){
            var list = this.state.data;

            switch(type){
                case 'modify':
                    this.props.callbackParent(data);
                    break;
                case 'delete':
                    var index = list.indexOf(data);
                    index != -1 && list.splice(index, 1);
                    this.setState({data: list});
                    break;
            }
        },
        render: function(){
            var list = [];
            // console.log(this.state.data);
            this.state.data.forEach(function(value) {
                list.push(<DataRow key={value.id} data={value} callbackParent={this.onTableBtnClick} />)
            }.bind(this));

            return (
                <table className="col-table" ref="tableList">
                    <thead>
                        <tr>
                            <td width="100">标题</td>
                              <td width="80">作者</td>
                              <td width="150">发布时间</td>
                              <td width="150">操作</td>
                        </tr>
                    </thead>
                    <tbody>{list}</tbody>
                </table>
            )
        }
        // componentDidMount: function(){
        //     var self = this;
        //     $.ajax({
        //         type: 'get',
        //         url: self.props.source,
        //         success: function(data){
        //             self.setState({
        //                 data: data
        //             });
        //             self.props.setLastId(parseInt(data[data.length-1].id));
        //         }
        //     })
        // }
    });
    module.exports = DataTable;
});
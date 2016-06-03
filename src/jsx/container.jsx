'use strict';

define(function(require, exports, module) {
    var React     = require('react'),
        // ReactDOM  = require('reactDom'),
        CrudBtn   = require('./crudBtn'),
        InfoBox   = require('./infoBox'),
        DataTable = require('./dataTable');

    var Container = React.createClass({

        getInitialState: function(){
            return {
                infoBtnType: 'add',
                infoStyle: {
                    display: 'none'
                }
            }
        },
        onAddClick: function() {
            this.setState({
                // infoBtnType: 'add',
                infoStyle: {
                    display: 'block'
                }
            });

            this.refs.infoBox.setState({id: null});
        },
        onModifyClick: function(value){
            // ReactDOM.findDOMNode 获取真实DOM，等同于getElementById对象
            // console.log(ReactDOM.findDOMNode(this.refs.infoBox).setAttribute('class', 'aa'));
            // console.log(ReactDOM.findDOMNode(this.refs.infoBox));
            // console.log(this.refs.infoBox);
            this.refs.infoBox.setState({
                id: value.id,
                title: value.title,
                author: value.author
            });

            this.setState({
                // infoBtnType: 'modify',
                infoStyle: {
                    display: 'block'
                }
            });
        },
        onInfoClick: function(show){
            // var dataTable = this.refs.dataTable,
            //     list = dataTable.state.data,
            //     infoBtnType = this.state.infoBtnType;

            // if(value) {
            //     if(infoBtnType == 'add') {
            //         var newId = ++value.id;
            //         this.setState({articalId: newId});
            //         list.push(value);
            //     }
            //     if(infoBtnType == 'modify') {
            //         var index; 
            //         for(index in list){   
            //             if(list[index].id == value.id) break; 
            //         }
            //         list.splice(index, 1, value);
            //     }
            //     this.refs.dataTable.setState({
            //         data: list
            //     });
            // }
            this.setState({
                infoStyle: {
                    display: show
                }
            })
        },
        setLastId: function(id) {
            this.setState({articalId: id});
        },
        render: function() {
            return(
                <div className="container">
                    <div className="col-top">
                        <h1 className="col-title">增删改DEMO</h1>
                        <CrudBtn btnName="添加" className="btn btn-add" callbackParent={this.onAddClick} />
                    </div>
                    <div className="col-info" style={this.state.infoStyle}>
                        <InfoBox ref="infoBox" callbackParent={this.onInfoClick} />
                    </div>
                    <DataTable ref="dataTable" source={this.props.dataSource} callbackParent={this.onModifyClick} setLastId={this.setLastId} />
                </div>
            )
        }
    });
    return Container;
})
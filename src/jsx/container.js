'use strict';

define(function (require, exports, module) {
    var React = require('react'),
        CrudBtn = require('./crudBtn'),
        InfoBox = require('./infoBox'),
        DataTable = require('./dataTable');

    var Container = React.createClass({
        displayName: 'Container',

        getInitialState: function getInitialState() {
            return {
                infoBtnType: 'add',
                articalId: 0,
                infoStyle: {
                    display: 'none'
                }
            };
        },
        onAddClick: function onAddClick() {
            this.setState({
                infoBtnType: 'add',
                infoStyle: {
                    display: 'block'
                }
            });

            var infoBox = this.refs.infoBox;
            infoBox.setState({ id: this.state.articalId });
        },
        onModifyClick: function onModifyClick(value) {

            this.refs.infoBox.setState({
                id: value.id,
                title: value.title,
                author: value.author
            });

            this.setState({
                infoBtnType: 'modify',
                infoStyle: {
                    display: 'block'
                }
            });
        },
        onInfoClick: function onInfoClick(show, value) {
            var dataTable = this.refs.dataTable,
                list = dataTable.state.data,
                infoBtnType = this.state.infoBtnType;

            if (value) {
                if (infoBtnType == 'add') {
                    var newId = ++value.id;
                    this.setState({ articalId: newId });
                    list.push(value);
                }
                if (infoBtnType == 'modify') {
                    var index;
                    for (index in list) {
                        if (list[index].id == value.id) break;
                    }
                    list.splice(index, 1, value);
                }
                this.refs.dataTable.setState({
                    data: list
                });
            }
            this.setState({
                infoStyle: {
                    display: show
                }
            });
        },
        setLastId: function setLastId(id) {
            this.setState({ articalId: id });
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
                    React.createElement(CrudBtn, { btnName: '添加', className: 'btn btn-add', callbackParent: this.onAddClick })
                ),
                React.createElement(
                    'div',
                    { className: 'col-info', style: this.state.infoStyle },
                    React.createElement(InfoBox, { ref: 'infoBox', callbackParent: this.onInfoClick })
                ),
                React.createElement(DataTable, { ref: 'dataTable', source: this.props.dataSource, callbackParent: this.onModifyClick, setLastId: this.setLastId })
            );
        }
    });
    return Container;
});
'use strict';

define(function(require, exports, module) {
    var React   = require('react'),
        CrudBtn = require('./crudBtn');

    // 添加修改信息
    var InfoBox = React.createClass({
        getInitialState: function() { 
            return {id:0, title: '', author: ''};
        }, 
        okHandler: function(e){
            var newInfo, showState;

            if(!this.refs.title.value) {
                newInfo = null;
                showState = 'block';
                alert('标题不能为空');
            }
            else {
                var infoId = this.state.id;

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
            // 不能在渲染过程中（render，componentDidUpdate等）调用 this.setState，会导致死循环
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
                        <CrudBtn btnName="确定" className="btn btn-ok" callbackParent={this.okHandler} />
                        <CrudBtn btnName="取消" className="btn btn-cancel" callbackParent={this.cancelHander} />
                    </div>
                </form>
            )
        }
    });
    return InfoBox;
})
'use strict';

define(function(require, exports, module) {
    var Reflux      = require('reflux'),
        CrudActions = require('../actions/crud_actions'),
        ConnectActions = require('actions/connect_actions'),
        Utils       = require('common/util');

    return Reflux.createStore({
        listenables: [ConnectActions],

        showInfo: false,
        onAdd: function(){

            var me = this;
            me.trigger({
                infoStyle:{
                    display: me.showInfo ? 'none' : 'block'
                }
            }, function(){
                    me.showInfo = !me.showInfo;
                    console.log(me.showInfo);
            });
        }
    });

});
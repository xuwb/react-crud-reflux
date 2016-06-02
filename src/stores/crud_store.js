'use strict';

define(function(require, exports, module) {
    var Reflux      = require('reflux'),
        CrudActions = require('../actions/crud_actions'),
        Utils       = require('common/util');

    var CrudStore = Reflux.createStore({
        listenables: [CrudActions],

        init: function() {
            this.onFetch();
        },
        onFetch: function() {
            var self = this;
            Utils.fetch('src/data.json')
                .then(function(data) {
                    self.trigger(data);
                })
                .catch(function(err) {
                    console.log(err);
                })
            // var self = this;
            // $.ajax({
            //     type: 'get',
            //     url: 'src/data.json',
            //     success: function(data){
            //         self.trigger(data);
            //     }
            // });
        },
        onAdd: function() {

        },
        onDelete: function() {

        },
        onModify: function() {
            
        }
    })

    return CrudStore;

});
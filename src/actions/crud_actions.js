'use strict';
define(function(require, exports, module) {
    var Reflux    = require('reflux');

    exports.CrudActions = Reflux.createActions([
        'fetch',
        'add',
        'delete',
        'modify'
    ]);
});

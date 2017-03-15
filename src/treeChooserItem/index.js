'use strict';

module.exports = function (treeChooser) {
  treeChooser
    .directive('treeChooserItem', require('./treeChooserItem.directive'))
    .controller('treeChooserItemController', require('./treeChooserItem.controller'))
    .factory('TreeChooserItem', require('./treeChooserItem.factory'));
};

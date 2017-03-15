'use strict';

module.exports = function (treeChooser) {
  treeChooser
    .directive('treeChooser', require('./treeChooser.directive'))
    .controller('treeChooserController', require('./treeChooser.controller'));
};

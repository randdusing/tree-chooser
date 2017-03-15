'use strict';

function TreeChooserItemController ($element) {
  var vm = this;
  vm.chooserVm = $element.controller('treeChooser');
}

module.exports = TreeChooserItemController;

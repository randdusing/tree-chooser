'use strict';

function TreeChooserItem() {
  return {
    bindToController: true,
    controller: 'treeChooserItemController',
    controllerAs: 'vm',
    require: '^treeChooser',
    scope: {
      item: '=treeChooserItem'
    },
    template: require('./treeChooserItem.html'),
  };
}

module.exports = TreeChooserItem;

'use strict';

/*@ngInject*/
function TreeChooserController(
  $element,
  $scope,
  $window,
  TreeChooserItem,
  $timeout
) {
  var vm = this,
    _ = require('lodash');

  // @todo create a separate directive for the list

  /**
   * Show the search results, add outside click handler
   */
  vm.show = function () {
    if (vm.shown) {
      return;
    }

    vm.shown = true;

    vm.next();

    // Add event listener to determine when user clicks outside of tree chooser
    if (!vm.disableClick) {
      //wrap to $timeout to avoid immediate call because of current click event
      $timeout(function () {
        $window.addEventListener('click', vm.closeFromClick);
      });
    }
  };

  /**
   * Close the search results, remove outside click handler
   */
  vm.close = function () {
    vm.filterText = '';
    vm.reset();
    vm.shown = false;
    if (!vm.disableClick) {
      $window.removeEventListener('click', vm.closeFromClick);
    }
  };

  /**
   * Close on outside click
   */
  vm.closeFromClick = function () {
    vm.close();
    $scope.$apply();
  };

  /**
   * Reset the collapsed and active state
   */
  vm.reset = function () {
    _.forEach(vm.itemsFlat, function (item) {
      item.setActive(false);
      item.setExpanded(false);
    });
  };

  /**
   * Handle results keyboard navigation
   * @param {Object} $event
   */
  vm.onListKeyDown = function ($event) {
    var shouldStop = false;

    switch ($event.keyCode) {
      case 27: //Escape
        shouldStop = true;
        vm.close();
        $scope.focusInput();
        break;
      case 13: //Enter
        shouldStop = true;
        vm.toggleSelectedActive();
        vm.close();
        $scope.focusInput();
        break;
      case 40: //Down Arrow
        shouldStop = true;
        vm.next();
        break;
      case 38: //Up Arrow
        shouldStop = true;
        vm.prev();
        break;
      case 37: //Left Arrow
        shouldStop = true;
        vm.collapseActive();
        break;
      case 39: //Right Arrow
        shouldStop = true;
        vm.expandActive();
        break;
      case 32: //Space
        shouldStop = true;
        vm.toggleSelectedActive();
        break;
      case 9: //Tab
        vm.toggleSelectedActive();
        vm.close();
        break;
    }

    if (shouldStop) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  };

  /**
   * Handle input keyboard navigation
   * @param {Object} $event
   */
  vm.onTextKeyDown = function ($event) {
    switch ($event.keyCode) {
      case 27: //Escape
        vm.close();
        break;
      case 13: //Enter
        if (vm.shown) {
          vm.toggleSelectedActive();
        } else {
          vm.show($event);
        }
        break;
      case 40: //Down Arrow
        vm.show($event);
        $scope.focusList();
        break;
      case 8: //Backspace
        if (_.isEmpty(vm.filterText) && (vm.multiselect ? !_.isEmpty(vm.ngModel.$viewValue) : !_.isNil(vm.ngModel.$viewValue))) {
          vm.removeFromModel();
        }
        break;
      case 9: //Tab
        vm.toggleSelectedActive();
        vm.close();
        break;
    }
  };

  /**
   * Find next visible item
   */
  vm.next = function () {
    if (_.isEmpty(vm.itemsFlat)) {
      return;
    }

    var active = vm.findActive();

    if (!active) {
      var first = _.find(vm.itemsFlat, function (item) {
        return item.isShowing();
      });
      // If no results are shown, there's nothing to set first!
      if (first) {
        first.setActive(true);
      }
    } else {
      var start = _.findIndex(vm.itemsFlat, function (item) {
        return item.isActive();
      });
      active.setActive(false);

      // @todo optimize array traversal
      var next = _.find(vm.itemsFlat, function (item, index) {
        return index > start && item.isShowing();
      });
      if (!next) {
        next = _.find(vm.itemsFlat, function (item, index) {
          return index < start && item.isShowing();
        });
      }
      if (next) {
        next.setActive(true);
      }
    }

    $scope.scrollActive();
  };

  /**
   * Find previous visible item
   */
  vm.prev = function () {
    var active = vm.findActive();

    if (!active) {
      var last = _.findLast(vm.itemsFlat, function (item) {
        return item.isShowing();
      });
      // If no results are shown, there's nothing to set last!
      if (last) {
        last.setActive(true);
      }
    } else {
      var start = _.findIndex(vm.itemsFlat, function (item) {
        return item.isActive();
      });
      active.setActive(false);

      // @todo optimize array traversal
      var prev = _.findLast(vm.itemsFlat, function (item, index) {
        return index < start && item.isShowing();
      });
      if (!prev) {
        prev = _.findLast(vm.itemsFlat, function (item, index) {
          return index > start && item.isShowing();
        });
      }
      if (prev) {
        prev.setActive(true);
      }
    }

    $scope.scrollActive();
  };

  /**
   * Expand active item
   */
  vm.expandActive = function () {
    var active = vm.findActive();
    if (active) {
      active.setExpanded(true);
    }
  };

  /**
   * Collapse active item
   */
  vm.collapseActive = function () {
    var active = vm.findActive();
    if (active) {
      active.setExpanded(false);
    }
  };

  /**
   * Set all items inactive
   */
  vm.clearActive = function () {
    _.forEach(vm.itemsFlat, function (item) {
      item.setActive(false);
    });
  };

  /**
   * Toggle selection on active item
   */
  vm.toggleSelectedActive = function () {
    var active = vm.findActive();
    if (active) {
      vm.toggleSelected(active);
    }
  };

  /**
   * Get the active item
   */
  vm.findActive = function () {
    return _.find(vm.itemsFlat, function (item) {
      return item.isActive();
    });
  };

  /**
   * Toggle selected unless disabled
   */
  vm.toggleSelected = function (item) {
    if (vm.disableNode(item)) {
      return;
    }

    vm.setSelected(item, !item.isSelected());
    if (item.isSelected() && !vm.multiselect) {
      vm.close();
    }
  };

  /**
   * Select all unfiltered children
   */
  vm.selectChildren = function (item) {
    _.forEach(item.getPresentChildren(), function (child) {
      if (!child.isSelected()) {
        vm.setSelected(child, true);
      }
      vm.selectChildren(child);
    });
  };

  /**
   * Deselect all children
   */
  vm.deselectChildren = function (item) {
    _.forEach(item.getChildren(), function (child) {
      if (child.isSelected()) {
        vm.setSelected(child, false);
      }
      vm.deselectChildren(child);
    });
  };

  /**
   * Set selection state
   */
  vm.setSelected = function (item, value) {
    // Enforce leaf only restrictions if necessary
    if (value && vm.onlyLeaves && !item.isLeaf()) {
      value = false;
    }
    item.setSelected(value);
    if (value) {
      vm.addToModel(item);
      if (vm.selectsChildren && vm.multiselect) {
        vm.selectChildren(item);
      }
    } else {
      vm.removeFromModel(item.getItem());
      if (vm.deselectsChildren && vm.multiselect) {
        vm.deselectChildren(item);
      }
    }
  };

  /**
   * Get top level present items
   */
  vm.getPresentItems = function () {
    return _.filter(vm.items, function (item) {
      return item.isPresent();
    });
  };

  /**
   * Determine if visible or not
   * @todo isMatch, isPresent, isExcluded, etc all needs to better naming
   */
  vm.isMatch = function (item) {
    if (!vm.filterText) {
      return true;
    }
    return vm.filterNode(item.getItem(), vm.filterText);
  };

  /**
   * Recursively set exclusions so that parents of included children aren't hidden
   * and fill array of matched leaf elements
   */
  vm.setExclusions = function (items, parentMatched) {
    _.forEach(items, function (item) {
      vm.setExclusions(item.getChildren(), parentMatched || vm.isMatch(item));
      item.setExcluded(!vm.isMatch(item) && !item.hasAChildPresent() && !parentMatched);
    });
  };

  /**
   * Recursively set exclusions so that parents of included children aren't hidden
   */
  vm.showAll = function () {
    _(vm.itemsFlat)
      .filter(function (item) {
        return item.isPresent();
      })
      .forEach(function (item) {
        item.setExpanded(true);
      });

    vm.show();
  };

  /**
   * Clear all no leaves
   * @todo if deselect Children is enabled, won't this deselect leaves?
   */
  vm.clearBranches = function () {
    _.forEach(vm.itemsFlat, function (item) {
      if (!item.isLeaf() && item.isSelected()) {
        vm.setSelected(item, false);
      }
    });
  };

  /**
   * Get model as items because it could be ssaved as id
   */
  vm.getModelAsItems = function () {
    return _(vm.multiselect ? vm.ngModel.$viewValue : [vm.ngModel.$viewValue])
      .map(function (item) {
        // Can' guarantee the item still exists unless restrict model is on
        return vm.modelAsId ? _.invoke(vm.itemsIndex[item], 'getItem') : item;
      })
      .compact()
      .value();
  };

  /**
   * Add item to model and trigger validation
   */
  vm.addToModel = function (item) {
    var value = vm.modelAsId ? item.getId() : item.getItem();
    if (vm.multiselect) {
      vm.ngModel.$viewValue.push(value);
      vm.ngModel.$validate();
    } else {
      vm.ngModel.$setViewValue(value);
    }
  };

  /**
   * Remove item from model and trigger validation
   */
  vm.removeFromModel = function (item) {
    if (!vm.multiselect) {
      vm.ngModel.$setViewValue(null);
    } else {
      if (item) {
        var id = _.get(item, vm.properties.id);
        _.remove(vm.ngModel.$viewValue, function (item) {
          return vm.modelAsId ? item === id : _.get(item, vm.properties.id) === id;
        });
      } else {
        vm.ngModel.$viewValue.pop();
      }
      vm.ngModel.$validate();
    }
  };

  /**
   * Sync model to items in case model, items or restrictModel changes
   */
  vm.syncModelToItems = _.debounce(function () {
    _.forEach(vm.itemsFlat, function (item) {
      item.setSelected(false);
    });

    var model = vm.multiselect ? vm.ngModel.$modelValue : [vm.ngModel.$modelValue];

    var toDelete = [];
    // Set selected items back to true
    _.forEach(model, function (item) {
      var id = vm.modelAsId ? item : _.get(item, vm.properties.id);
      var checkItem = vm.itemsIndex[id];
      if (checkItem) {
        checkItem.setSelected(true);
      } else if (vm.restrictModel) {
        toDelete.push(item);
      }
    });

    _.forEach(toDelete, function (item) {
      vm.removeFromModel(item);
    });

    // This is debounced, so ensure scope is applied!
    $scope.$apply();
  });

  /**
   * Create TreeChooserItem hierarchy
   */
  vm.createItems = function (items) {
    return _.map(items, function (item) {
      return new TreeChooserItem(item, null, vm.properties);
    });
  };

  /**
   * Flatten hierarchy for more efficient processing
   */
  vm.flattenItems = function (items) {
    return _(items)
      .map(function (item) {
        return [item, vm.flattenItems(item.getChildren())];
      })
      .flattenDeep()
      .value();
  };

  vm.chooseActive = function(item) {
    var childs = item.getChildren();
    if (vm.disableActiveNodes && childs.length) {
      vm.chooseActive(childs[0]);
    } else {
      item.setActive(true);
    }
  };

  this.$onInit = function () {
    // Flag to determine whether search results are showing
    vm.shown = false;

    // Properties use to access special parts of item
    vm.properties = {
      id: vm.idProperty || 'id',
      label: vm.labelProperty || 'label',
      children: vm.childrenProperty || 'children'
    };

    // Enable multiselect by default
    if (_.isUndefined(vm.multiselect)) {
      vm.multiselect = true;
    }
    // Disable only leaves by default
    if (_.isUndefined(vm.onlyLeaves)) {
      vm.onlyLeaves = false;
    }
    // Disable selects children by default
    if (_.isUndefined(vm.selectsChildren)) {
      vm.selectsChildren = false;
    }
    // Disable deselects children by default
    if (_.isUndefined(vm.deselectsChildren)) {
      vm.deselectsChildren = false;
    }
    // Disable restrict model by default
    if (_.isUndefined(vm.restrictModel)) {
      vm.restrictModel = false;
    }
    // Enable pills by default
    if (_.isUndefined(vm.enablePills)) {
      vm.enablePills = true;
    }
    // Save ID to model by default
    if (_.isUndefined(vm.modelAsId)) {
      vm.modelAsId = true;
    }
    // Auto show after specified filter text length
    if (!_.isNumber(vm.filterAutoShowLength)) {
      vm.filterAutoShowLength = 2;
    }
    // Default filter node function
    if (!_.isFunction(vm.filterNode)) {
      vm.filterNode = function (item, filterText) {
        return _.includes(_.toLower(_.get(item, vm.properties.label)), _.toLower(filterText));
      };
    }
    // Default disable node function
    if (!_.isFunction(vm.disableNode)) {
      vm.disableNode = _.stubFalse;
    }
    // Default to enable close to click
    if (!_.isUndefined(vm.disableClick)) {
      vm.disableClick = false;
    }

    // Default to enable nodes to be active
    if (!_.isUndefined(vm.disableActiveNodes)) {
      vm.disableActiveNodes = false;
    }

    // Get access to ngModel
    vm.ngModel = $element.controller('ngModel');
    // And override $isEmpty to account for array emptiness if multiselect
    if (vm.multiselect) {
      vm.ngModel.$isEmpty = _.isEmpty;
    }

    this.registerWatches();
  };

  this.registerWatches = function () {
    /**
     * Update exclusions on filter text change
     */
    $scope.$watch('vm.filterText', function () {
      var active = vm.findActive();
      if (active) {
        active.setActive(false);
      }
      vm.setExclusions(vm.items);
      var items = vm.getPresentItems();
      if (vm.filterText !== '' && items.length) {
        vm.chooseActive(items[0]);
      }
      if (_.size(vm.filterText) === vm.filterAutoShowLength) {
        vm.showAll();
      }
    });

    /**
     * Sync on model change
     */
    $scope.$watchCollection('vm.ngModel.$modelValue', function () {
      vm.syncModelToItems();
    });

    /**
     * Sync on items change
     */
    $scope.$watch('vm.treeData', function () {
      // @todo is this manual GC needed?
      _.forEach(vm.itemsFlat, function (item, index) {
        delete vm.itemsFlat[index];
      });

      // Create chooser items, so the underlying model is not touched
      vm.items = vm.createItems(vm.treeData);
      // Flatten into a sorted list for easier navigation
      vm.itemsFlat = vm.flattenItems(vm.items);
      // Item index
      vm.itemsIndex = _.keyBy(vm.itemsFlat, function (item) {
        return item.getId();
      });

      vm.syncModelToItems();
    });

    /**
     * Sync on restrict model
     */
    $scope.$watch('vm.restrictModel', function (value) {
      if (value) {
        vm.syncModelToItems();
      }
    });

    /**
     * Deselect branches on only leaves true
     */
    $scope.$watch('vm.onlyLeaves', function (value) {
      if (value) {
        vm.clearBranches();
      }
    });

    /**
     * Disable results on disable
     */
    $scope.$watch('vm.ngDisabled', function (value) {
      if (value) {
        vm.close();
      }
    });
  };
}

module.exports = TreeChooserController;

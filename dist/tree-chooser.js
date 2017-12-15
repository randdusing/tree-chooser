exports["tree-chooser"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1);
	
	var treeChooser = angular.module('treeChooser', []);
	
	__webpack_require__(2)(treeChooser);
	__webpack_require__(11)(treeChooser);
	
	module.exports = treeChooser;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("angular");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (treeChooser) {
	  treeChooser.directive('treeChooser', __webpack_require__(3)).controller('treeChooserController', __webpack_require__(9));
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/*@ngInject*/
	
	TreeChooser.$inject = ['$timeout'];
	function TreeChooser($timeout) {
	  __webpack_require__(4);
	
	  var angular = __webpack_require__(1);
	
	  return {
	    bindToController: true,
	    controller: 'treeChooserController',
	    controllerAs: 'vm',
	    require: ['ngModel'],
	    scope: {
	      /**
	       * Tree data structure
	       * @type {Array.<Object>}
	       */
	      treeData: '=treeChooser',
	
	      /**
	       * Property that contains unique ID
	       * @type {string}
	       */
	      idProperty: '@',
	
	      /**
	       * Property that contains label
	       * @todo alternately support template
	       * @type {string}
	       */
	      labelProperty: '@',
	
	      /**
	       * Property that contains children array
	       * @type {string}
	       */
	      childrenProperty: '@',
	
	      /**
	       * Deselect all descendants
	       * @type {boolean}
	       */
	      deselectsChildren: '=?',
	
	      /**
	       * Function to determine if item is disabled
	       * @type {Function}
	       */
	      disableNode: '=?',
	
	      /**
	       * Function to determine if item is filtered
	       * @type {Function}
	       */
	      filterNode: '=?',
	
	      /**
	       * Show list and expand all nodes after specified length
	       * @type {number}
	       */
	      filterAutoShowLength: '=?',
	
	      /**
	       * Enable multiselection
	       * @type {boolean}
	       */
	      multiselect: '=?',
	
	      /**
	       * ngDisabled pass through
	       * @type {boolean}
	       */
	      ngDisabled: '=?',
	
	      /**
	       * ngPlaceholder pass through
	       * @type {boolean}
	       */
	      ngPlaceholder: '=?',
	
	      /**
	       * Only allow selection of leaf nodes
	       * @type {boolean}
	       */
	      onlyLeaves: '=?',
	
	      /**
	       * Restrict model to members of tree data structure
	       * @type {boolean}
	       */
	      restrictModel: '=?',
	
	      /**
	       * Select all descendants
	       * @type {boolean}
	       */
	      selectsChildren: '=?',
	
	      /**
	       * Enable pills
	       * @type {boolean}
	       */
	      enablePills: '=?',
	
	      /**
	       * Just use the ID as the model value?
	       * @type {boolean}
	       */
	      modelAsId: '=?',
	
	      /**
	       * Disable outside click to close
	       * @type {boolean}
	       */
	      disableClick: '=?'
	    },
	    template: __webpack_require__(8),
	    link: function link(scope, element) {
	      var input = angular.element(element[0].querySelector('.treeChooser-input input'));
	      input.on('click', function (event) {
	        event.stopPropagation();
	      });
	
	      var list = angular.element(element[0].querySelector('.treeChooser-list'));
	      list.on('click', function (event) {
	        event.stopPropagation();
	      });
	
	      var treeChooserDiv = angular.element(element[0].querySelector('.treeChooser'));
	      scope.addTabindex = function () {
	        this.vm.tabindex = '0';
	      };
	      scope.removeTabindex = function () {
	        this.vm.tabindex = '-1';
	      };
	      scope.focusTreeChooserDiv = function () {
	        scope.addTabindex();
	        $timeout(function () {
	          treeChooserDiv[0].focus();
	        });
	      };
	
	      scope.focusInput = function () {
	        $timeout(function () {
	          input[0].focus();
	        });
	      };
	
	      scope.focusList = function () {
	        $timeout(function () {
	          list[0].focus();
	        });
	      };
	
	      scope.getListStyles = function () {
	        return {
	          top: input[0].parentNode.offsetHeight + 'px',
	          width: input[0].parentNode.offsetWidth + 'px'
	        };
	      };
	
	      scope.scrollActive = function () {
	        $timeout(function () {
	          var active = element[0].querySelector('.treeChooser-active .treeChooser-label');
	          // If no results are shown, there won't be an active!
	          if (active) {
	            list[0].scrollTop = active.offsetTop;
	          }
	        });
	      };
	    }
	  };
	}
	
	module.exports = TreeChooser;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

	module.exports = "<div class=treeChooser ng-attr-tabindex={{vm.tabindex}}> <div class=treeChooser-input ng-class=\"{'treeChooser-input-focused': vm.focused}\"> <span ng-if=vm.enablePills ng-click=\"vm.removeFromModel(item); focusInput();\" ng-repeat=\"item in vm.getModelAsItems()\"> {{item[vm.properties.label]}} </span> <input type=text ng-disabled=vm.ngDisabled ng-model=vm.filterText ng-keydown=vm.onTextKeyDown($event) ng-focus=\"vm.focused = true; vm.tryShow($event);\" ng-blur=\"vm.focused = false\" placeholder={{vm.ngPlaceholder}}> </div> <ul ng-show=vm.shown ng-keydown=vm.onListKeyDown($event) ng-style=getListStyles() class=treeChooser-list tabindex=-1> <li ng-repeat=\"item in vm.getPresentItems()\" tree-chooser-item=item></li> <li ng-if=!vm.getPresentItems().length>No match</li> </ul> </div> ";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/*@ngInject*/
	
	TreeChooserController.$inject = ['$element', '$scope', '$timeout', '$window', 'TreeChooserItem'];
	function TreeChooserController($element, $scope, $timeout, $window, TreeChooserItem) {
	  var vm = this,
	      _ = __webpack_require__(10);
	
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
	      $timeout(function () {
	        $window.addEventListener('click', vm.closeFromClick);
	      });
	    }
	  };
	
	  /**
	   * Show on focus, unless returning from the list
	   * @param {Event} $event
	   */
	  vm.tryShow = function ($event) {
	    if (_.includes(_.get($event.relatedTarget, 'className'), 'treeChooser-list')) {
	      return;
	    }
	    vm.show();
	  };
	
	  /**
	   * Close the search results, remove outside click handler
	   */
	  vm.close = function () {
	    vm.filterText = '';
	    vm.reset();
	    vm.shown = false;
	    vm.clearActive();
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
	      case 27:
	        //Escape
	        shouldStop = true;
	        vm.close();
	        $scope.focusInput();
	        break;
	      case 13:
	        //Enter
	        shouldStop = true;
	        vm.toggleSelectedActive();
	        vm.close();
	        $scope.focusInput();
	        break;
	      case 40:
	        //Down Arrow
	        shouldStop = true;
	        vm.next();
	        break;
	      case 38:
	        //Up Arrow
	        shouldStop = true;
	        vm.prev();
	        break;
	      case 37:
	        //Left Arrow
	        shouldStop = true;
	        vm.collapseActive();
	        break;
	      case 39:
	        //Right Arrow
	        shouldStop = true;
	        vm.expandActive();
	        break;
	      case 32:
	        //Space
	        shouldStop = true;
	        vm.toggleSelectedActive();
	        break;
	      case 9:
	        //Tab
	        vm.toggleSelectedActive(true);
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
	      case 27:
	        //Escape
	        vm.close();
	        break;
	      case 13:
	        //Enter
	        if (vm.shown) {
	          vm.toggleSelectedActive();
	        } else {
	          vm.show($event);
	        }
	        break;
	      case 40:
	        //Down Arrow
	        vm.show($event);
	        $scope.focusList();
	        break;
	      case 8:
	        //Backspace
	        if (_.isEmpty(vm.filterText) && (vm.multiselect ? !_.isEmpty(vm.ngModel.$viewValue) : !_.isNil(vm.ngModel.$viewValue))) {
	          vm.removeFromModel();
	        }
	        break;
	      case 9:
	        //Tab
	        vm.toggleSelectedActive(true);
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
	   * @param {boolean} [isTab]
	   */
	  vm.toggleSelectedActive = function (isTab) {
	    var active = vm.findActive();
	    if (active) {
	      // Don't unselect on tab
	      if (isTab && active.isSelected()) {
	        return;
	      }
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
	      } else if (!vm.selectsChildren && !vm.multiselect) {
	        $scope.focusTreeChooserDiv();
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
	   * @param {Array} items
	   * @param {boolean} parentMatched
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
	    _(vm.itemsFlat).filter(function (item) {
	      return item.isPresent();
	    }).forEach(function (item) {
	      item.setExpanded(true);
	    });
	
	    vm.show();
	  };
	
	  /**
	   * Set active property to false if active item exists
	   */
	  vm.resetActive = function () {
	    var active = vm.findActive();
	    if (active) {
	      active.setActive(false);
	    }
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
	   * Get model as items because it could be saved as id
	   */
	  vm.getModelAsItems = function () {
	    return _(vm.multiselect ? vm.ngModel.$viewValue : [vm.ngModel.$viewValue]).map(function (item) {
	      // Can' guarantee the item still exists unless restrict model is on
	      return vm.modelAsId ? _.invoke(vm.itemsIndex[item], 'getItem') : item;
	    }).compact().value();
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
	      $scope.removeTabindex();
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
	        if (vm.isInitialLoad) {
	          vm.isInitialLoad = false;
	          if (!vm.selectsChildren && !vm.multiselect) {
	            $scope.addTabindex();
	          }
	        }
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
	    return _(items).map(function (item) {
	      return [item, vm.flattenItems(item.getChildren())];
	    }).flattenDeep().value();
	  };
	
	  /**
	   * Set the active element on search
	   */
	  vm.setActive = function () {
	    vm.resetActive();
	    var first;
	    if (vm.onlyLeaves) {
	      // Find first present leaf in flat items
	      first = _.find(vm.itemsFlat, function (item) {
	        return item.isLeaf() && item.isPresent();
	      });
	    } else {
	      // Find first present branch, at least one branch will be present in items
	      first = _.find(vm.items, function (item) {
	        return item.isPresent();
	      });
	    }
	
	    if (first) {
	      first.setActive(true);
	    }
	  };
	
	  this.$onInit = function () {
	    // Flag to determine whether search results are showing
	    vm.shown = false;
	
	    // flag indicating that this is the initial load
	    vm.isInitialLoad = true;
	
	    // default .treeChooser tabindex value
	    vm.tabindex = '-1';
	
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
	      vm.setExclusions(vm.items);
	      if (_.size(vm.filterText) >= vm.filterAutoShowLength) {
	        vm.showAll();
	        vm.setActive();
	      } else {
	        vm.reset();
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

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = require("lodash");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (treeChooser) {
	  treeChooser.directive('treeChooserItem', __webpack_require__(12)).controller('treeChooserItemController', __webpack_require__(14)).factory('TreeChooserItem', __webpack_require__(15));
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

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
	    template: __webpack_require__(13)
	  };
	}
	
	module.exports = TreeChooserItem;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = "<span class=treeChooser-item ng-class=\"{'treeChooser-selected': vm.item.isSelected(), 'treeChooser-active': vm.item.isActive()}\"> <span class=treeChooser-expansion ng-click=\"vm.chooserVm.clearActive(); vm.item.setActive(true); vm.item.toggleExpanded()\"> <span ng-show=\"vm.item.hasAChildPresent() && vm.item.isExpanded()\" class=treeChooser-expanded>-</span> <span ng-show=\"vm.item.hasAChildPresent() && !vm.item.isExpanded()\" class=treeChooser-collapsed>+</span> </span> <span class=treeChooser-label ng-class=\"{'treeChooser-disabled': vm.chooserVm.disableNode(vm.item)}\" ng-click=\"vm.chooserVm.clearActive(); vm.item.setActive(true); vm.chooserVm.toggleSelected(vm.item)\"> {{vm.item.getLabel()}} </span> <ul ng-if=vm.item.isExpanded()> <li ng-repeat=\"item in vm.item.getPresentChildren()\" tree-chooser-item=item></li> </ul> </span> ";

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';
	
	/*@ngInject*/
	
	TreeChooserItemController.$inject = ['$element'];
	function TreeChooserItemController($element) {
	  var vm = this;
	  vm.chooserVm = $element.controller('treeChooser');
	}
	
	module.exports = TreeChooserItemController;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	function TreeChooserItemFactory() {
	  var _ = __webpack_require__(10);
	
	  function TreeChooserItem(item, parent, properties) {
	    var _this = this;
	
	    this.item = item; // @todo use this for templates
	
	    this.properties = properties;
	    this.id = _.get(this.item, this.properties.id);
	    this.label = _.get(this.item, this.properties.label);
	
	    this.parent = parent;
	
	    this.active = false;
	    this.excluded = false;
	    this.expanded = false;
	    this.selected = false;
	
	    var children = _.get(item, properties.children);
	    this.children = _.map(children, function (child) {
	      return new TreeChooserItem(child, _this, properties);
	    });
	  }
	
	  TreeChooserItem.prototype.getItem = function () {
	    return this.item;
	  };
	
	  TreeChooserItem.prototype.getChildren = function () {
	    return this.children;
	  };
	
	  TreeChooserItem.prototype.hasAChildPresent = function () {
	    return !!_.find(this.getChildren(), function (child) {
	      return child.isPresent();
	    });
	  };
	
	  TreeChooserItem.prototype.getPresentChildren = function () {
	    return _.filter(this.getChildren(), function (child) {
	      return child.isPresent();
	    });
	  };
	
	  TreeChooserItem.prototype.getId = function () {
	    return this.id;
	  };
	
	  TreeChooserItem.prototype.getLabel = function () {
	    return this.label;
	  };
	
	  TreeChooserItem.prototype.isActive = function () {
	    return this.active;
	  };
	
	  TreeChooserItem.prototype.isLeaf = function () {
	    return _.isEmpty(this.children);
	  };
	
	  TreeChooserItem.prototype.isShowing = function () {
	    return this.isPresent() && (!this.parent || this.parent.isExpanded());
	  };
	
	  TreeChooserItem.prototype.isPresent = function () {
	    return !this.excluded;
	  };
	
	  TreeChooserItem.prototype.isExpanded = function () {
	    return this.expanded;
	  };
	
	  TreeChooserItem.prototype.isSelected = function () {
	    return this.selected;
	  };
	
	  TreeChooserItem.prototype.setActive = function (value) {
	    this.active = value;
	  };
	
	  TreeChooserItem.prototype.setExcluded = function (value) {
	    this.excluded = value;
	  };
	
	  TreeChooserItem.prototype.setExpanded = function (value) {
	    this.expanded = value;
	  };
	
	  TreeChooserItem.prototype.setSelected = function (value) {
	    this.selected = value;
	  };
	
	  TreeChooserItem.prototype.toggleExpanded = function () {
	    this.expanded = !this.expanded;
	  };
	
	  return TreeChooserItem;
	}
	
	module.exports = TreeChooserItemFactory;

/***/ })
/******/ ]);
//# sourceMappingURL=tree-chooser.js.map
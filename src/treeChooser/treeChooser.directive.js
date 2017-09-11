'use strict';

/*@ngInject*/
function TreeChooser($timeout) {
  require('./treeChooser.css');

  var angular = require('angular');

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
      disableClick: '=?',

      /**
       * Show hierarchy list when input focused
       */
      showFocused: '=?'
    },
    template: require('./treeChooser.html'),
    link: function (scope, element) {
      var input = angular.element(element[0].querySelector('.treeChooser-input input'));
      input.on('click', function (event) {
        event.stopPropagation();
      });

      var list = angular.element(element[0].querySelector('.treeChooser-list'));
      list.on('click', function (event) {
        event.stopPropagation();
      });

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

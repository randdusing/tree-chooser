webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(298);


/***/ },

/***/ 298:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _angular = __webpack_require__(299);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(301);
	__webpack_require__(302);
	
	var _ = __webpack_require__(306);
	
	var app = _angular2.default.module('app', ['treeChooser']).controller('rdTreeChooserExample', function (rdTreeChooserExample) {
	  var vm = this;
	
	  vm.multiselect = true;
	  vm.selectsChildren = false;
	  vm.deselectsChildren = false;
	  vm.idProperty = 'id';
	  vm.labelProperty = 'description';
	  vm.childrenProperty = 'children';
	  vm.filterAutoShowLength = 3;
	  vm.enablePills = true;
	  vm.ngPlaceholder = 'Select a location...';
	  vm.ngRequired = true;
	
	  vm.model = [];
	  vm.treeData = rdTreeChooserExample.getSampleData();
	
	  vm.clone = _.cloneDeep(vm.treeData);
	
	  vm.resetItems = function () {
	    vm.treeData = _.cloneDeep(vm.clone);
	  };
	}).directive('rdTreeChooserExample', function () {
	  return {
	    bindToController: true,
	    controller: 'rdTreeChooserExample',
	    controllerAs: 'vm',
	    template: __webpack_require__(308)
	  };
	}).service('rdTreeChooserExample', function () {
	  this.getSampleData = function () {
	    return [{
	      id: 'AFc',
	      label: 'Africa',
	      children: [{
	        id: 'BW',
	        label: 'Botswana'
	      }, {
	        id: 'NA',
	        label: 'Namibia'
	      }, {
	        id: 'ZA',
	        label: 'South Africa',
	        children: [{
	          id: 'ZA-EC',
	          label: 'Eastern Cape'
	        }, {
	          id: 'ZA-NC',
	          label: 'Northern Cape'
	        }, {
	          id: 'ZA-WC',
	          label: 'Western Cape'
	        }]
	      }]
	    }, {
	      id: 'ANc',
	      label: 'Antarctica'
	    }, {
	      id: 'ASc',
	      label: 'Asia',
	      children: [{
	        id: 'JP',
	        label: 'Japan'
	      }, {
	        id: 'KR',
	        label: 'South Korea'
	      }, {
	        id: 'SG',
	        label: 'Singapore',
	        children: [{
	          id: 'SG-01',
	          label: 'Central Singapore'
	        }, {
	          id: 'SG-02',
	          label: 'North East'
	        }, {
	          id: 'SG-03',
	          label: 'North West'
	        }, {
	          id: 'SG-04',
	          label: 'South East'
	        }, {
	          id: 'SG-05',
	          label: 'South West'
	        }]
	      }]
	    }, {
	      id: 'EUc',
	      label: 'Europe',
	      children: [{
	        id: 'FR',
	        label: 'France',
	        children: [{
	          id: 'FR-A',
	          label: 'Alsace'
	        }, {
	          id: 'FR-P',
	          label: 'Basse-Normandie'
	        }, {
	          id: 'FR-H',
	          label: 'Corse'
	        }, {
	          id: 'FR-J',
	          label: 'Île-de-France'
	        }, {
	          id: 'FR-N',
	          label: 'Midi-Pyrénées'
	        }]
	      }, {
	        id: 'DE',
	        label: 'Germany'
	      }, {
	        id: 'GB',
	        label: 'United Kingdom'
	      }]
	    }, {
	      id: 'NAc',
	      label: 'North America',
	      children: [{
	        id: 'CA',
	        label: 'Canada'
	      }, {
	        id: 'MX',
	        label: 'Mexico'
	      }, {
	        id: 'US',
	        label: 'United States of America',
	        children: [{
	          id: 'US-CA',
	          label: 'California'
	        }, {
	          id: 'US-NY',
	          label: 'New York'
	        }, {
	          id: 'US-TX',
	          label: 'Texas'
	        }]
	      }]
	    }, {
	      id: 'OCc',
	      label: 'Oceania',
	      children: [{
	        id: 'AU',
	        label: 'Australia'
	      }, {
	        id: 'NZ',
	        label: 'New Zealand'
	      }]
	    }, {
	      id: 'SAc',
	      label: 'South America',
	      children: [{
	        id: 'AR',
	        label: 'Argentina'
	      }, {
	        id: 'BR',
	        label: 'Brazil'
	      }, {
	        id: 'CL',
	        label: 'Chile'
	      }]
	    }];
	  };
	}).controller('rdTree', function () {
	  var vm = this;
	  vm.remove = function (item) {
	    _.remove(vm.rdTree, item);
	  };
	}).directive('rdTree', function () {
	  return {
	    bindToController: true,
	    controller: 'rdTree',
	    controllerAs: 'vm',
	    scope: {
	      rdTree: '=?'
	    },
	    template: '<li ng-repeat="item in vm.rdTree"><span>{{item.label}}</span><span ng-click="vm.remove(item)"> x</span><ul ng-if="item.children.length" rd-tree="item.children"></ul></li>'
	  };
	});

/***/ },

/***/ 308:
/***/ function(module, exports) {

	module.exports = "<h1>treeChooser</h1>\n\n<div class=\"col-sm-5\">\n  <h2>Options</h2>\n  <div>\n    <label>\n      tree-chooser\n    </label>\n    <p>\n      A tree structure in the format shown to the right\n    </p>\n  </div>\n  <div>\n    <label>\n      id-property <input type=\"text\" ng-model=\"vm.idProperty\" style=\"display:inline-block;\">\n    </label>\n    <p>\n      The property used to get the node's unique ID. Every node in tree should have a unique key.\n    </p>\n  </div>\n  <div>\n    <label>\n      label-property <input type=\"text\" ng-model=\"vm.labelProperty\" style=\"display:inline-block;\">\n    </label>\n    <p>\n      The property used to show the node's label. Alternatively the template can be modified.\n    </p>\n  </div>\n  <div>\n    <label>\n      children-property <input type=\"text\" ng-model=\"vm.childrenProperty\" style=\"display:inline-block;\">\n    </label>\n    <p>\n      The property used to get the node's children.\n    </p>\n  </div>\n  <div>\n    <label>\n      filter-node\n    </label>\n    <p>\n      A function to filter results when typing. If a node matches, all of its ancestors will still appear. The default filter contains is a case insensitive contains on the label property.\n    </p>\n  </div>\n  <div>\n    <label>\n      filter-auto-show-length <input type=\"number\" ng-model=\"vm.filterAutoShowLength\" style=\"display:inline-block;\">\n    </label>\n    <p>\n      When should items automatically expand.\n    </p>\n  </div>\n  <div>\n    <label>\n      disable-node\n    </label>\n    <p>\n      A function to disable a node from selection. Accepts the original node as an input and expects a boolean value in return. True to disable, false to keep enabled.\n    </p>\n  </div>\n  <div>\n    <label>\n      multiselect <input type=\"checkbox\" ng-model=\"vm.multiselect\">\n    </label>\n    <p>\n      Allow selection of multiple items.\n    </p>\n  </div>\n  <div>\n    <label>\n      only-leaves <input type=\"checkbox\" ng-model=\"vm.onlyLeaves\">\n    </label>\n    <p>\n      Only allow selection of leaf nodes.\n    </p>\n  </div>\n  <div>\n    <label>\n      selects-children <input type=\"checkbox\" ng-model=\"vm.selectsChildren\">\n    </label>\n    <p>\n      When selecting parent, all children (descendants) are selected.\n    </p>\n  </div>\n  <div>\n    <label>\n      deselects-children <input type=\"checkbox\" ng-model=\"vm.deselectsChildren\">\n    </label>\n    <p>\n      When deselecting parent, all children (descendants) are deselected.\n    </p>\n  </div>\n  <div>\n    <label>\n      enable-pills <input type=\"checkbox\" ng-model=\"vm.enablePills\">\n    </label>\n    <p>\n      Show pills in text box\n    </p>\n  </div>\n  <div>\n    <label>\n      restrict-model <input type=\"checkbox\" ng-model=\"vm.restrictModel\">\n    </label>\n    <p>\n      Restrict model to values that exist in tree structure.\n    </p>\n  </div>\n  <div>\n    <label>\n      ng-disabled <input type=\"checkbox\" ng-model=\"vm.ngDisabled\">\n    </label>\n  </div>\n  <div>\n    <label>\n      ng-placeholder <input type=\"text\" ng-model=\"vm.ngPlaceholder\" style=\"display:inline-block;\">\n    </label>\n  </div>\n  <div>\n    <label>\n      ng-required <input type=\"checkbox\" ng-model=\"vm.ngRequired\">\n    </label>\n  </div>\n</div>\n<div class=\"col-sm-3\">\n  <h2>Directive</h2>\n  <div tree-chooser=\"vm.treeData\"\n       ng-model=\"vm.model\"\n       ng-model-options=\"{ debounce: 100 }\"\n       multiselect=\"vm.multiselect\"\n       only-leaves=\"vm.onlyLeaves\"\n       selects-children=\"vm.selectsChildren\"\n       deselects-children=\"vm.deselectsChildren\"\n       enable-pills=\"vm.enablePills\"\n       restrict-model=\"vm.restrictModel\"\n       filter-auto-show-length=\"vm.filterAutoShowLength\"\n       ng-disabled=\"vm.ngDisabled\"\n       ng-placeholder=\"vm.ngPlaceholder\"\n       ng-required=\"vm.ngRequired\">\n  </div>\n</div>\n<div class=\"col-sm-2\">\n  <h2>Model</h2>\n  <span ng-repeat=\"item in vm.model\">\n    {{item.label}},\n  </span>\n</div>\n<div class=\"col-sm-2\">\n  <h2>Tree</h2>\n  <button ng-click=\"vm.resetItems()\">Reset</button>\n  <ul rd-tree=\"vm.treeData\"></ul>\n</div>\n"

/***/ }

});
//# sourceMappingURL=app.bundle.js.map
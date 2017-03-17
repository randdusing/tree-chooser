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
	__webpack_require__(305);
	__webpack_require__(306);
	
	var _ = __webpack_require__(308);
	
	var app = _angular2.default.module('app', ['treeChooser']).controller('rdTreeChooserExample', function (rdTreeChooserExample) {
	  var vm = this;
	
	  vm.multiselect = true;
	  vm.selectsChildren = false;
	  vm.deselectsChildren = false;
	  vm.idProperty = 'id';
	  vm.labelProperty = 'description';
	  vm.childrenProperty = 'children';
	  vm.filterAutoShowLength = 2;
	  vm.enablePills = true;
	  vm.modelAsId = true;
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
	    template: __webpack_require__(310)
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
	        label: 'United States',
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

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(302);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(304)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./app.scss", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./app.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(303)();
	// imports
	
	
	// module
	exports.push([module.id, "body {\n  padding-top: 50px; }\n\n.navbar-nav > li > span {\n  display: inline-block;\n  padding: 15px 0; }\n\n.jumbotron {\n  background-color: #2c3e50;\n  color: #fff; }\n\npre {\n  max-height: 250px; }\n\n.row {\n  margin-bottom: 15px; }\n", ""]);
	
	// exports


/***/ },

/***/ 310:
/***/ function(module, exports) {

	module.exports = "<section id=\"documentation\">\n  <h2>Documentation</h2>\n\n  <div class=\"row\">\n    <div class=\"col-xs-6\">\n      <h4>\n        tree-chooser\n      </h4>\n      <p>\n        An tree data structure like the one to the right. Don't worry your data will not be modified in anyway. Want to structure yours slightly different? See the id, label and children properties below.\n      </p>\n      <div class=\"well well-sm\">\n        &lt;div tree-chooser=\"vm.items\"&gt;&lt;/div&gt;\n      </div>\n    </div>\n    <div class=\"col-xs-6\">\n      <pre>\n{\n  \"id\": \"NAc\",\n  \"label\": \"North America\",\n  \"children\": [\n    {\n      \"id\": \"CA\",\n      \"label\": \"Canada\"\n    },\n    {\n      \"id\": \"MX\",\n      \"label\": \"Mexico\"\n    },\n    {\n      \"id\": \"US\",\n      \"label\": \"United States\",\n      \"children\": [\n        {\n          \"id\": \"US-CA\",\n          \"label\": \"California\"\n        },\n        {\n          \"id\": \"US-NY\",\n          \"label\": \"New York\"\n        },\n        {\n          \"id\": \"US-TX\",\n          \"label\": \"Texas\"\n        }\n      ]\n    }\n  ]\n}\n      </pre>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-xs-4\">\n      <h4>\n        id-property\n      </h4>\n      <p>\n        The property used to uniquely identify the nodes. Each node must have a unique ID. Defaults to 'id'.\n      </p>\n    </div>\n    <div class=\"col-xs-4\">\n      <h4>\n        label-property\n      </h4>\n      <p>\n        The property used to show the node's label. Defaults to 'label'.\n      </p>\n    </div>\n    <div class=\"col-xs-4\">\n      <h4>\n        children-property\n      </h4>\n      <p>\n        The property used to obtain the node's children. Defaults to 'children'.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-xs-4\">\n      <h4>\n        filter-node\n      </h4>\n      <p>\n        A function to filter results when typing. If a node matches, all of its ancestors will still appear. Default filter is a case insensitive contains on the label property.\n      </p>\n    </div>\n    <div class=\"col-xs-4\">\n      <h4>\n        filter-auto-show-length\n      </h4>\n      <p>\n        The items will automatically open once the filter text length has reached this amount. Defaults to 2.\n        <input type=\"number\" ng-model=\"vm.filterAutoShowLength\">\n      </p>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-xs-4\">\n      <h4>\n        <input type=\"checkbox\" ng-model=\"vm.multiselect\"> multiselect\n      </h4>\n      <p>\n        Allow selection of multiple items. Defaults to <i>true</i>.\n      </p>\n    </div>\n    <div class=\"col-xs-4\">\n      <h4>\n        disable-node\n      </h4>\n      <p>\n        A function to disable a node from selection. Accepts the original node as an input and expects a boolean value in return. True to disable, false to keep enabled. Defaults to a function that returns false.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-xs-4\">\n      <h4>\n        <input type=\"checkbox\" ng-model=\"vm.onlyLeaves\"> only-leaves\n      </h4>\n      <p>\n        Only allow selection of leaf nodes. Defaults to <i>false</i>.\n      </p>\n    </div>\n    <div class=\"col-xs-4\">\n      <h4>\n        <input type=\"checkbox\" ng-model=\"vm.selectsChildren\"> selects-children\n      </h4>\n      <p>\n        When selecting parent, all children (descendants) are selected. Defaults to <i>false</i>.\n      </p>\n    </div>\n    <div class=\"col-xs-4\">\n      <h4>\n        <input type=\"checkbox\" ng-model=\"vm.deselectsChildren\"> deselects-children\n      </h4>\n      <p>\n        When deselecting parent, all children (descendants) are deselected. Defaults to <i>false</i>.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-xs-4\">\n      <h4>\n        <input type=\"checkbox\" ng-model=\"vm.enablePills\"> enable-pills\n      </h4>\n      <p>\n        Show pills in text box. Defaults to <i>true</i>.\n      </p>\n    </div>\n    <div class=\"col-xs-4\">\n      <h4>\n        <input type=\"checkbox\" ng-model=\"vm.modelAsId\"> model-as-id\n      </h4>\n      <p>\n        Use ID as model value.  Defaults to <i>true</i>.\n      </p>\n    </div>\n    <div class=\"col-xs-4\">\n      <h4>\n        <input type=\"checkbox\" ng-model=\"vm.restrictModel\"> restrict-model\n      </h4>\n      <p>\n        Restrict model to values that exist in tree structure. Defaults to <i>false</i>.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <h3>Supports</h3>\n    <div class=\"col-xs-4\">\n      <h4>\n        <input type=\"checkbox\" ng-model=\"vm.ngRequired\"> ng-required\n      </h4>\n    </div>\n    <div class=\"col-xs-4\">\n      <h4>\n        ng-disabled <input type=\"checkbox\" ng-model=\"vm.ngDisabled\">\n      </h4>\n    </div>\n    <div class=\"col-xs-4\">\n      <h4>\n        ng-placeholder\n      </h4>\n      <p>\n        <input type=\"text\" ng-model=\"vm.ngPlaceholder\">\n      </p>\n    </div>\n  </div>\n</section>\n\n<section id=\"example\">\n  <h2>Example</h2>\n\n  <div class=\"col-sm-4\">\n    <h2>Directive</h2>\n    <div tree-chooser=\"vm.treeData\"\n         ng-model=\"vm.model\"\n         ng-model-options=\"{ debounce: 100 }\"\n         multiselect=\"vm.multiselect\"\n         only-leaves=\"vm.onlyLeaves\"\n         selects-children=\"vm.selectsChildren\"\n         deselects-children=\"vm.deselectsChildren\"\n         enable-pills=\"vm.enablePills\"\n         restrict-model=\"vm.restrictModel\"\n         filter-auto-show-length=\"vm.filterAutoShowLength\"\n         model-as-id=\"vm.modelAsId\"\n         ng-disabled=\"vm.ngDisabled\"\n         ng-placeholder=\"vm.ngPlaceholder\"\n         ng-required=\"vm.ngRequired\">\n    </div>\n  </div>\n  <div class=\"col-sm-4\">\n    <h2>Model</h2>\n    <span ng-repeat=\"item in vm.model\">\n    {{vm.modelAsId ? item : item.label}},\n  </span>\n  </div>\n  <div class=\"col-sm-4\">\n    <h2>\n      Tree\n      <button class=\"btn btn-sm btn-primary\"\n              ng-click=\"vm.resetItems()\">\n        Reset\n      </button>\n    </h2>\n    <ul rd-tree=\"vm.treeData\"></ul>\n  </div>\n</section>\n"

/***/ }

});
//# sourceMappingURL=app.bundle.js.map
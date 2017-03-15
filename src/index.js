var angular = require('angular');

var treeChooser = angular.module('treeChooser', []);

require('./treeChooser')(treeChooser);
require('./treeChooserItem')(treeChooser);

module.exports = treeChooser;

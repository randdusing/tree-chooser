'use strict';

function TreeChooserItemFactory () {
  var _ = require('lodash');

  function TreeChooserItem(item, parent, properties) {
    this.item = item; // @todo use this for templates

    this.properties = properties;
    this.id = _.get(this.item, this.properties.id);
    this.label = _.get(this.item, this.properties.label);
    this.listLabel = _.get(this.item, this.properties.listLabel);

    this.parent = parent;

    this.active = false;
    this.excluded = false;
    this.expanded = false;
    this.selected = false;

    var children = _.get(item, properties.children);
    this.children = _.map(children, (child) => {
      return new TreeChooserItem(child, this, properties);
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

  TreeChooserItem.prototype.getListLabel = function () {
    return this.listLabel;
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

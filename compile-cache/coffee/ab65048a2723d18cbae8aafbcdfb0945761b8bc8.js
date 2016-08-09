(function() {
  var $, CssListView, SelectListView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), $ = _ref.$, SelectListView = _ref.SelectListView;

  CssListView = (function(_super) {
    __extends(CssListView, _super);

    function CssListView() {
      return CssListView.__super__.constructor.apply(this, arguments);
    }

    CssListView.prototype.initialize = function(items) {
      CssListView.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      this.setItems(items);
      atom.workspace.addModalPanel({
        item: this
      });
      this.focusFilterEditor();
      return this.storeFocusedElement();
    };

    CssListView.prototype.viewForItem = function(item) {
      var fn, li, radio;
      li = $("<li><span class='pp-markdown-css'>" + item + "</span></li>");
      radio = $("<span class='pp-default mega-octicon octicon-star'></span>");
      fn = (function(_this) {
        return function(e) {
          var _base;
          $(this ).closest('ol').find('span').removeClass('on');
          $(this ).addClass('on');
          atom.config.set('pp-markdown.cssURL', item);
          if (typeof (_base = atom.workspace.getActivePaneItem()).refresh === "function") {
            _base.refresh();
          }
          e.stopPropagation();
          return false;
        };
      })(this);
      radio.on('mouseover', fn);
      li.append(radio);
      return li;
    };

    CssListView.prototype.confirmed = function(item) {
      var _base;
      atom.config.set('pp-markdown.cssURL', item);
      if (typeof (_base = atom.workspace.getActivePaneItem()).refresh === "function") {
        _base.refresh();
      }
      return this.cancel();
    };

    CssListView.prototype.cancelled = function() {
      return this.parent().remove();
    };

    return CssListView;

  })(SelectListView);

  module.exports = CssListView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9wcC1tYXJrZG93bi9saWIvY3NzTGlzdFZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9DQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFxQixPQUFBLENBQVEsc0JBQVIsQ0FBckIsRUFBQyxTQUFBLENBQUQsRUFBRyxzQkFBQSxjQUFILENBQUE7O0FBQUEsRUFHTTtBQUVKLGtDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSwwQkFBQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7QUFDVixNQUFBLDZDQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLGtCQUFWLENBREEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxLQUFWLENBRkEsQ0FBQTtBQUFBLE1BR0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFmLENBQTZCO0FBQUEsUUFBQSxJQUFBLEVBQUssSUFBTDtPQUE3QixDQUhBLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxpQkFBRCxDQUFBLENBSkEsQ0FBQTthQUtBLElBQUMsQ0FBQSxtQkFBRCxDQUFBLEVBTlU7SUFBQSxDQUFaLENBQUE7O0FBQUEsMEJBU0EsV0FBQSxHQUFhLFNBQUMsSUFBRCxHQUFBO0FBQ1QsVUFBQSxhQUFBO0FBQUEsTUFBQSxFQUFBLEdBQUssQ0FBQSxDQUFHLG9DQUFBLEdBQW9DLElBQXBDLEdBQXlDLGNBQTVDLENBQUwsQ0FBQTtBQUFBLE1BQ0EsS0FBQSxHQUFRLENBQUEsQ0FBRSw0REFBRixDQURSLENBQUE7QUFBQSxNQUdBLEVBQUEsR0FBSyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxDQUFELEdBQUE7QUFDSCxjQUFBLEtBQUE7QUFBQSxVQUFBLENBQUEsQ0FBRSxLQUFGLENBQVUsQ0FBQyxPQUFYLENBQW1CLElBQW5CLENBQXdCLENBQUMsSUFBekIsQ0FBOEIsTUFBOUIsQ0FBcUMsQ0FBQyxXQUF0QyxDQUFrRCxJQUFsRCxDQUFBLENBQUE7QUFBQSxVQUNBLENBQUEsQ0FBRSxLQUFGLENBQVUsQ0FBQyxRQUFYLENBQW9CLElBQXBCLENBREEsQ0FBQTtBQUFBLFVBRUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLG9CQUFoQixFQUFxQyxJQUFyQyxDQUZBLENBQUE7O2lCQUdrQyxDQUFDO1dBSG5DO0FBQUEsVUFJQSxDQUFDLENBQUMsZUFBRixDQUFBLENBSkEsQ0FBQTtBQUtBLGlCQUFPLEtBQVAsQ0FORztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBSEwsQ0FBQTtBQUFBLE1BVUEsS0FBSyxDQUFDLEVBQU4sQ0FBUyxXQUFULEVBQXFCLEVBQXJCLENBVkEsQ0FBQTtBQUFBLE1BV0EsRUFBRSxDQUFDLE1BQUgsQ0FBVSxLQUFWLENBWEEsQ0FBQTtBQVlBLGFBQU8sRUFBUCxDQWJTO0lBQUEsQ0FUYixDQUFBOztBQUFBLDBCQXdCQSxTQUFBLEdBQVcsU0FBQyxJQUFELEdBQUE7QUFDVCxVQUFBLEtBQUE7QUFBQSxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixvQkFBaEIsRUFBcUMsSUFBckMsQ0FBQSxDQUFBOzthQUNrQyxDQUFDO09BRG5DO2FBRUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQUhTO0lBQUEsQ0F4QlgsQ0FBQTs7QUFBQSwwQkE2QkEsU0FBQSxHQUFXLFNBQUEsR0FBQTthQUNULElBQUMsQ0FBQSxNQUFELENBQUEsQ0FBUyxDQUFDLE1BQVYsQ0FBQSxFQURTO0lBQUEsQ0E3QlgsQ0FBQTs7dUJBQUE7O0tBRndCLGVBSDFCLENBQUE7O0FBQUEsRUFvQ0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsV0FwQ2pCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/benfallon/.atom/packages/pp-markdown/lib/cssListView.coffee

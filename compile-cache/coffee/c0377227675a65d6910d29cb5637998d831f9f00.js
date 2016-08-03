(function() {
  var SelectListView, SelectRendererView, renderers,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SelectListView = require('atom-space-pen-views').SelectListView;

  renderers = require('./renderer');

  module.exports = SelectRendererView = (function(_super) {
    __extends(SelectRendererView, _super);

    function SelectRendererView() {
      this.toggle = __bind(this.toggle, this);
      this.attach = __bind(this.attach, this);
      return SelectRendererView.__super__.constructor.apply(this, arguments);
    }

    SelectRendererView.prototype.initialize = function(previewView) {
      var grammars;
      this.previewView = previewView;
      SelectRendererView.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      grammars = Object.keys(renderers.grammars);
      this.setItems(grammars);
      return this.focusFilterEditor();
    };

    SelectRendererView.prototype.viewForItem = function(item) {
      return "<li>" + item + "</li>";
    };

    SelectRendererView.prototype.confirmed = function(item) {
      var e;
      this.previewView.renderPreviewWithRenderer(item);
      try {
        return this.detach();
      } catch (_error) {
        e = _error;
      }
    };

    SelectRendererView.prototype.attach = function() {
      return atom.workspace.addTopPanel({
        item: this
      });
    };

    SelectRendererView.prototype.toggle = function() {
      if (this.hasParent()) {
        return this.detach();
      } else {
        return this.attach();
      }
    };

    return SelectRendererView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9wcmV2aWV3L2xpYi9zZWxlY3QtcmVuZGVyZXItdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNkNBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQyxpQkFBa0IsT0FBQSxDQUFRLHNCQUFSLEVBQWxCLGNBQUQsQ0FBQTs7QUFBQSxFQUNBLFNBQUEsR0FBWSxPQUFBLENBQVEsWUFBUixDQURaLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0oseUNBQUEsQ0FBQTs7Ozs7O0tBQUE7O0FBQUEsaUNBQUEsVUFBQSxHQUFZLFNBQUUsV0FBRixHQUFBO0FBQ1YsVUFBQSxRQUFBO0FBQUEsTUFEVyxJQUFDLENBQUEsY0FBQSxXQUNaLENBQUE7QUFBQSxNQUFBLG9EQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLGtCQUFWLENBREEsQ0FBQTtBQUFBLE1BRUEsUUFBQSxHQUFXLE1BQU0sQ0FBQyxJQUFQLENBQVksU0FBUyxDQUFDLFFBQXRCLENBRlgsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxRQUFWLENBSEEsQ0FBQTthQUlBLElBQUMsQ0FBQSxpQkFBRCxDQUFBLEVBTFU7SUFBQSxDQUFaLENBQUE7O0FBQUEsaUNBT0EsV0FBQSxHQUFhLFNBQUMsSUFBRCxHQUFBO2FBQ1YsTUFBQSxHQUFNLElBQU4sR0FBVyxRQUREO0lBQUEsQ0FQYixDQUFBOztBQUFBLGlDQVVBLFNBQUEsR0FBVyxTQUFDLElBQUQsR0FBQTtBQUVULFVBQUEsQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyx5QkFBYixDQUF1QyxJQUF2QyxDQUFBLENBQUE7QUFFQTtlQUNFLElBQUMsQ0FBQSxNQUFELENBQUEsRUFERjtPQUFBLGNBQUE7QUFFTSxRQUFBLFVBQUEsQ0FGTjtPQUpTO0lBQUEsQ0FWWCxDQUFBOztBQUFBLGlDQWtCQSxNQUFBLEdBQVEsU0FBQSxHQUFBO2FBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFmLENBQTJCO0FBQUEsUUFBQyxJQUFBLEVBQU0sSUFBUDtPQUEzQixFQURNO0lBQUEsQ0FsQlIsQ0FBQTs7QUFBQSxpQ0FxQkEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLE1BQUEsSUFBRyxJQUFDLENBQUEsU0FBRCxDQUFBLENBQUg7ZUFDRSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBREY7T0FBQSxNQUFBO2VBR0UsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQUhGO09BRE07SUFBQSxDQXJCUixDQUFBOzs4QkFBQTs7S0FEK0IsZUFKakMsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/benfallon/.atom/packages/preview/lib/select-renderer-view.coffee

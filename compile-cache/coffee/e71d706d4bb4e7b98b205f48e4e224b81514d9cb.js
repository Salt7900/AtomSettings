(function() {
  var PreviewView, url;

  url = require('url');

  PreviewView = require('./preview-view');

  module.exports = {
    config: {
      updateOnTabChange: {
        type: 'boolean',
        "default": true
      },
      refreshDebouncePeriod: {
        type: 'integer',
        "default": 100
      },
      liveUpdate: {
        type: 'boolean',
        "default": true
      }
    },
    previewView: null,
    uri: "atom://atom-preview",

    /*
     * This required method is called when your package is activated. It is passed
     * the state data from the last time the window was serialized if your module
     * implements the serialize() method. Use this to do initialization work when
     * your package is started (like setting up DOM elements or binding events).
     */
    activate: function(state) {
      atom.commands.add('atom-workspace', {
        'preview:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this)
      });
      atom.commands.add('atom-workspace', {
        'preview:toggle-options': (function(_this) {
          return function() {
            return _this.toggleOptions();
          };
        })(this)
      });
      atom.commands.add('atom-workspace', {
        'preview:select-renderer': (function(_this) {
          return function() {
            return _this.selectRenderer();
          };
        })(this)
      });
      atom.workspace.addOpener((function(_this) {
        return function(uriToOpen) {
          if (uriToOpen !== _this.uri) {
            return;
          }
          return _this.previewView = new PreviewView();
        };
      })(this));
      if (state.isOpen) {
        return this.toggle;
      }
    },

    /*
     * This optional method is called when the window is shutting down, allowing
     * you to return JSON to represent the state of your component. When the
     * window is later restored, the data you returned is passed to your module's
     * activate method so you can restore your view to where the user left off.
     */
    serialize: function() {
      var previewPane;
      previewPane = atom.workspace.paneForURI(this.uri);
      return {
        isOpen: previewPane != null
      };
    },

    /*
     * This optional method is called when the window is shutting down. If your
     * package is watching any files or holding external resources in any other
     * way, release them here. If you're just subscribing to things on window, you
     * don't need to worry because that's getting torn down anyway.
     */
    deactivate: function() {
      var previewPane;
      previewPane = atom.workspace.paneForURI(this.uri);
      if (previewPane) {
        previewPane.destroyItem(previewPane.itemForURI(this.uri));
      }
    },
    toggle: function() {
      var editor, previewPane, previousActivePane;
      editor = atom.workspace.getActiveTextEditor();
      if (editor == null) {
        return;
      }
      previewPane = atom.workspace.paneForURI(this.uri);
      if (previewPane) {
        previewPane.destroyItem(previewPane.itemForURI(this.uri));
        return;
      }
      previousActivePane = atom.workspace.getActivePane();
      return atom.workspace.open(this.uri, {
        split: 'right',
        searchAllPanes: true
      }).done((function(_this) {
        return function(previewView) {
          if (previewView instanceof PreviewView) {
            return previewView.initialize();
          }
        };
      })(this));
    },
    toggleOptions: function() {
      if (this.previewView != null) {
        return this.previewView.toggleOptions();
      }
    },
    selectRenderer: function() {
      if (this.previewView != null) {
        return this.previewView.selectRenderer();
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9wcmV2aWV3L2xpYi9wcmV2aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnQkFBQTs7QUFBQSxFQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsS0FBUixDQUFOLENBQUE7O0FBQUEsRUFDQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBRGQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsaUJBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxJQURUO09BREY7QUFBQSxNQUdBLHFCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsR0FEVDtPQUpGO0FBQUEsTUFNQSxVQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtPQVBGO0tBREY7QUFBQSxJQVdBLFdBQUEsRUFBYSxJQVhiO0FBQUEsSUFZQSxHQUFBLEVBQUsscUJBWkw7QUFjQTtBQUFBOzs7OztPQWRBO0FBQUEsSUFvQkEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBSVIsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQ0U7QUFBQSxRQUFBLGdCQUFBLEVBQWtCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUMsQ0FBQSxNQUFELENBQUEsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxCO09BREYsQ0FBQSxDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdB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

//# sourceURL=/Users/benfallon/.atom/packages/preview/lib/preview.coffee

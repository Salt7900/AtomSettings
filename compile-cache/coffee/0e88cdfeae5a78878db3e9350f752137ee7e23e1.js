(function() {
  var CompositeDisposable, Point, createElementsForGuides, getGuides, styleGuide, _, _ref, _ref1;

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Point = _ref.Point;

  _ = require('lodash');

  _ref1 = require('./indent-guide-improved-element'), createElementsForGuides = _ref1.createElementsForGuides, styleGuide = _ref1.styleGuide;

  getGuides = require('./guides.coffee').getGuides;

  module.exports = {
    activate: function(state) {
      var handleEvents, msg, updateGuide;
      this.currentSubscriptions = [];
      atom.config.set('editor.showIndentGuide', false);
      if (atom.config.get('editor.useShadowDOM') === false) {
        msg = 'To use indent-guide-improved package, please check "Use Shadow DOM" in Settings.';
        atom.notifications.addError(msg, {
          dismissable: true
        });
        return;
      }
      updateGuide = function(editor, editorElement) {
        var basePixelPos, getIndent, guides, lineHeightPixel, scrollLeft, scrollTop, visibleRange, visibleScreenRange;
        visibleScreenRange = editorElement.getVisibleRowRange();
        if (!((visibleScreenRange != null) && (editorElement.component != null))) {
          return;
        }
        basePixelPos = editorElement.pixelPositionForScreenPosition(new Point(visibleScreenRange[0], 0)).top;
        visibleRange = visibleScreenRange.map(function(row) {
          return editor.bufferPositionForScreenPosition(new Point(row, 0)).row;
        });
        getIndent = function(row) {
          if (editor.lineTextForBufferRow(row).match(/^\s*$/)) {
            return null;
          } else {
            return editor.indentationForBufferRow(row);
          }
        };
        scrollTop = editorElement.getScrollTop();
        scrollLeft = editorElement.getScrollLeft();
        guides = getGuides(visibleRange[0], visibleRange[1], editor.getLastBufferRow(), editor.getCursorBufferPositions().map(function(point) {
          return point.row;
        }), getIndent);
        lineHeightPixel = editor.getLineHeightInPixels();
        return createElementsForGuides(editorElement, guides.map(function(g) {
          return function(el) {
            return styleGuide(el, g.point.translate(new Point(visibleRange[0], 0)), g.length, g.stack, g.active, editor, basePixelPos, lineHeightPixel, visibleScreenRange[0], scrollTop, scrollLeft);
          };
        }));
      };
      handleEvents = (function(_this) {
        return function(editor, editorElement) {
          var delayedUpdate, subscriptions, up, update;
          up = function() {
            return updateGuide(editor, editorElement);
          };
          delayedUpdate = function() {
            return setTimeout(up, 0);
          };
          update = _.throttle(up, 30);
          subscriptions = new CompositeDisposable;
          subscriptions.add(atom.workspace.onDidStopChangingActivePaneItem(function(item) {
            if (item === editor) {
              return delayedUpdate();
            }
          }));
          subscriptions.add(atom.config.onDidChange('editor.fontSize', delayedUpdate));
          subscriptions.add(atom.config.onDidChange('editor.fontFamily', delayedUpdate));
          subscriptions.add(atom.config.onDidChange('editor.lineHeight', delayedUpdate));
          subscriptions.add(editor.onDidChangeCursorPosition(update));
          subscriptions.add(editorElement.onDidChangeScrollTop(update));
          subscriptions.add(editorElement.onDidChangeScrollLeft(update));
          subscriptions.add(editor.onDidStopChanging(update));
          subscriptions.add(editor.onDidDestroy(function() {
            _this.currentSubscriptions.splice(_this.currentSubscriptions.indexOf(subscriptions), 1);
            return subscriptions.dispose();
          }));
          return _this.currentSubscriptions.push(subscriptions);
        };
      })(this);
      return atom.workspace.observeTextEditors(function(editor) {
        var editorElement;
        if (editor == null) {
          return;
        }
        editorElement = atom.views.getView(editor);
        if (editorElement == null) {
          return;
        }
        handleEvents(editor, editorElement);
        return updateGuide(editor, editorElement);
      });
    },
    deactivate: function() {
      this.currentSubscriptions.forEach(function(s) {
        return s.dispose();
      });
      return atom.workspace.getTextEditors().forEach(function(te) {
        var v;
        v = atom.views.getView(te);
        if (!v) {
          return;
        }
        return Array.prototype.forEach.call(v.querySelectorAll('.indent-guide-improved'), function(e) {
          return e.parentNode.removeChild(e);
        });
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9pbmRlbnQtZ3VpZGUtaW1wcm92ZWQvbGliL2luZGVudC1ndWlkZS1pbXByb3ZlZC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMEZBQUE7O0FBQUEsRUFBQSxPQUErQixPQUFBLENBQVEsTUFBUixDQUEvQixFQUFDLDJCQUFBLG1CQUFELEVBQXNCLGFBQUEsS0FBdEIsQ0FBQTs7QUFBQSxFQUNBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUixDQURKLENBQUE7O0FBQUEsRUFHQSxRQUF3QyxPQUFBLENBQVEsaUNBQVIsQ0FBeEMsRUFBQyxnQ0FBQSx1QkFBRCxFQUEwQixtQkFBQSxVQUgxQixDQUFBOztBQUFBLEVBSUMsWUFBYSxPQUFBLENBQVEsaUJBQVIsRUFBYixTQUpELENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixVQUFBLDhCQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsb0JBQUQsR0FBd0IsRUFBeEIsQ0FBQTtBQUFBLE1BR0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHdCQUFoQixFQUEwQyxLQUExQyxDQUhBLENBQUE7QUFLQSxNQUFBLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHFCQUFoQixDQUFBLEtBQTBDLEtBQTdDO0FBQ0UsUUFBQSxHQUFBLEdBQU0sa0ZBQU4sQ0FBQTtBQUFBLFFBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFuQixDQUE0QixHQUE1QixFQUFpQztBQUFBLFVBQUMsV0FBQSxFQUFhLElBQWQ7U0FBakMsQ0FEQSxDQUFBO0FBRUEsY0FBQSxDQUhGO09BTEE7QUFBQSxNQVVBLFdBQUEsR0FBYyxTQUFD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

//# sourceURL=/Users/benfallon/.atom/packages/indent-guide-improved/lib/indent-guide-improved.coffee

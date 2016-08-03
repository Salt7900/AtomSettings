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
      if (!atom.config.get('editor.useShadowDOM')) {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9pbmRlbnQtZ3VpZGUtaW1wcm92ZWQvbGliL2luZGVudC1ndWlkZS1pbXByb3ZlZC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMEZBQUE7O0FBQUEsRUFBQSxPQUErQixPQUFBLENBQVEsTUFBUixDQUEvQixFQUFDLDJCQUFBLG1CQUFELEVBQXNCLGFBQUEsS0FBdEIsQ0FBQTs7QUFBQSxFQUNBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUixDQURKLENBQUE7O0FBQUEsRUFHQSxRQUF3QyxPQUFBLENBQVEsaUNBQVIsQ0FBeEMsRUFBQyxnQ0FBQSx1QkFBRCxFQUEwQixtQkFBQSxVQUgxQixDQUFBOztBQUFBLEVBSUMsWUFBYSxPQUFBLENBQVEsaUJBQVIsRUFBYixTQUpELENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixVQUFBLDhCQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsb0JBQUQsR0FBd0IsRUFBeEIsQ0FBQTtBQUFBLE1BR0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHdCQUFoQixFQUEwQyxLQUExQyxDQUhBLENBQUE7QUFLQSxNQUFBLElBQUEsQ0FBQSxJQUFXLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IscUJBQWhCLENBQVA7QUFDRSxRQUFBLEdBQUEsR0FBTSxrRkFBTixDQUFBO0FBQUEsUUFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQW5CLENBQTRCLEdBQTVCLEVBQWlDO0FBQUEsVUFBQyxXQUFBLEVBQWEsSUFBZDtTQUFqQyxDQURBLENBQUE7QUFFQSxjQUFBLENBSEY7T0FMQTtBQUFBLE1BVUEsV0FBQSxHQUFjLFNBQUMsTUFBRCxF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

//# sourceURL=/Users/benfallon/.atom/packages/indent-guide-improved/lib/indent-guide-improved.coffee

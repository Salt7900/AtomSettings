(function() {
  var CompositeDisposable, Point, RowMap, createElementsForGuides, getGuides, styleGuide, _, _ref, _ref1;

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Point = _ref.Point;

  _ = require('lodash');

  _ref1 = require('./indent-guide-improved-element'), createElementsForGuides = _ref1.createElementsForGuides, styleGuide = _ref1.styleGuide;

  getGuides = require('./guides.coffee').getGuides;

  RowMap = require('./row-map.coffee');

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
        var basePixelPos, getIndent, guides, lineHeightPixel, rowMap, scrollLeft, scrollTop, visibleRange, visibleScreenRange;
        visibleScreenRange = editor.getVisibleRowRange();
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
        scrollTop = editor.getScrollTop();
        scrollLeft = editor.getScrollLeft();
        rowMap = new RowMap(editor.displayBuffer.rowMap.getRegions());
        guides = getGuides(visibleRange[0], visibleRange[1], editor.getLastBufferRow(), editor.getCursorBufferPositions().map(function(point) {
          return point.row;
        }), getIndent);
        lineHeightPixel = editor.getLineHeightInPixels();
        return createElementsForGuides(editorElement, guides.map(function(g) {
          return function(el) {
            return styleGuide(el, g.point.translate(new Point(visibleRange[0], 0)), g.length, g.stack, g.active, editor, rowMap, basePixelPos, lineHeightPixel, visibleScreenRange[0], scrollTop, scrollLeft);
          };
        }));
      };
      handleEvents = (function(_this) {
        return function(editor, editorElement) {
          var subscriptions, up, update;
          up = function() {
            return updateGuide(editor, editorElement);
          };
          update = _.throttle(up, 30);
          subscriptions = new CompositeDisposable;
          subscriptions.add(editor.onDidChangeCursorPosition(update));
          subscriptions.add(editor.onDidChangeScrollTop(update));
          subscriptions.add(editor.onDidChangeScrollLeft(update));
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
        editorElement = atom.views.getView(editor);
        return handleEvents(editor, editorElement);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9pbmRlbnQtZ3VpZGUtaW1wcm92ZWQvbGliL2luZGVudC1ndWlkZS1pbXByb3ZlZC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0dBQUE7O0FBQUEsRUFBQSxPQUErQixPQUFBLENBQVEsTUFBUixDQUEvQixFQUFDLDJCQUFBLG1CQUFELEVBQXNCLGFBQUEsS0FBdEIsQ0FBQTs7QUFBQSxFQUNBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUixDQURKLENBQUE7O0FBQUEsRUFHQSxRQUF3QyxPQUFBLENBQVEsaUNBQVIsQ0FBeEMsRUFBQyxnQ0FBQSx1QkFBRCxFQUEwQixtQkFBQSxVQUgxQixDQUFBOztBQUFBLEVBSUMsWUFBYSxPQUFBLENBQVEsaUJBQVIsRUFBYixTQUpELENBQUE7O0FBQUEsRUFLQSxNQUFBLEdBQVMsT0FBQSxDQUFRLGtCQUFSLENBTFQsQ0FBQTs7QUFBQSxFQU9BLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUNSLFVBQUEsOEJBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxvQkFBRCxHQUF3QixFQUF4QixDQUFBO0FBQUEsTUFHQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isd0JBQWhCLEVBQTBDLEtBQTFDLENBSEEsQ0FBQTtBQUtBLE1BQUEsSUFBQSxDQUFBLElBQVcsQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixxQkFBaEIsQ0FBUDtBQUNFLFFBQUEsR0FBQSxHQUFNLGtGQUFOLENBQUE7QUFBQSxRQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBbkIsQ0FBNEIsR0FBNUIsRUFBaUM7QUFBQSxVQUFDLFdBQUEsRUFBYSxJQUFkO1NBQWpDLENBREEsQ0FBQTtBQUVB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

//# sourceURL=/Users/benfallon/.atom/packages/indent-guide-improved/lib/indent-guide-improved.coffee

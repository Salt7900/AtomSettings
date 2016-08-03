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

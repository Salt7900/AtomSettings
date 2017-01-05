(function() {
  var CompositeDisposable, Point, _, createElementsForGuides, getGuides, ref, ref1, styleGuide;

  ref = require('atom'), CompositeDisposable = ref.CompositeDisposable, Point = ref.Point;

  _ = require('lodash');

  ref1 = require('./indent-guide-improved-element'), createElementsForGuides = ref1.createElementsForGuides, styleGuide = ref1.styleGuide;

  getGuides = require('./guides.coffee').getGuides;

  module.exports = {
    activate: function(state) {
      var handleEvents, updateGuide;
      this.currentSubscriptions = [];
      atom.config.set('editor.showIndentGuide', false);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9pbmRlbnQtZ3VpZGUtaW1wcm92ZWQvbGliL2luZGVudC1ndWlkZS1pbXByb3ZlZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLE1BQStCLE9BQUEsQ0FBUSxNQUFSLENBQS9CLEVBQUMsNkNBQUQsRUFBc0I7O0VBQ3RCLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7RUFFSixPQUF3QyxPQUFBLENBQVEsaUNBQVIsQ0FBeEMsRUFBQyxzREFBRCxFQUEwQjs7RUFDekIsWUFBYSxPQUFBLENBQVEsaUJBQVI7O0VBRWQsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLFFBQUEsRUFBVSxTQUFDLEtBQUQ7QUFDUixVQUFBO01BQUEsSUFBQyxDQUFBLG9CQUFELEdBQXdCO01BR3hCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix3QkFBaEIsRUFBMEMsS0FBMUM7TUFFQSxXQUFBLEdBQWMsU0FBQyxNQUFELEVBQVMsYUFBVDtBQUNaLFlBQUE7UUFBQSxrQkFBQSxHQUFxQixhQUFhLENBQUMsa0JBQWQsQ0FBQTtRQUNyQixJQUFBLENBQUEsQ0FBYyw0QkFBQSxJQUF3QixpQ0FBdEMsQ0FBQTtBQUFBLGlCQUFBOztRQUNBLFlBQUEsR0FBZSxhQUFhLENBQUMsOEJBQWQsQ0FBaUQsSUFBQSxLQUFBLENBQU0sa0JBQW1CLENBQUEsQ0FBQSxDQUF6QixFQUE2QixDQUE3QixDQUFqRCxDQUFpRixDQUFDO1FBQ2pHLFlBQUEsR0FBZSxrQkFBa0IsQ0FBQyxHQUFuQixDQUF1QixTQUFDLEdBQUQ7aUJBQ3BDLE1BQU0sQ0FBQywrQkFBUCxDQUEyQyxJQUFBLEtBQUEsQ0FBTSxHQUFOLEVBQVcsQ0FBWCxDQUEzQyxDQUF5RCxDQUFDO1FBRHRCLENBQXZCO1FBRWYsU0FBQSxHQUFZLFNBQUMsR0FBRDtVQUNWLElBQUcs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dH0gPSByZXF1aXJlICdhdG9tJ1xuXyA9IHJlcXVpcmUgJ2xvZGFzaCdcblxue2NyZWF0ZUVsZW1lbnRzRm9yR3VpZGVzLCBzdHlsZUd1aWRlfSA9IHJlcXVpcmUgJy4vaW5kZW50LWd1aWRlLWltcHJvdmVkLWVsZW1lbnQnXG57Z2V0R3VpZGVzfSA9IHJlcXVpcmUgJy4vZ3VpZGVzLmNvZmZlZSdcblxubW9kdWxlLmV4cG9ydHMgPVxuICBhY3RpdmF0ZTogKHN0YXRlKSAtPlxuICAgIEBjdXJyZW50U3Vic2NyaXB0aW9ucyA9IFtdXG5cbiAgICAjIFRoZSBvcmlnaW5hbCBpbmRlbnQgZ3VpZGVzIGludGVyZmVyZSB3aXRoIHRoaXMgcGFja2FnZS5cbiAgICBhdG9tLmNvbmZpZy5zZXQoJ2VkaXRvci5zaG93SW5kZW50R3VpZGUnLCBmYWxzZSlcblxuICAgIHVwZGF0ZUd1aWRlID0gKGVkaXRvciwgZWRpdG9yRWxlbWVudCkgLT5cbiAgICAgIHZpc2libGVTY3JlZW5SYW5nZSA9IGVkaXRvckVsZW1lbnQuZ2V0VmlzaWJsZVJvd1JhbmdlKClcbiAgICAgIHJldHVybiB1bmxlc3MgdmlzaWJsZVNjcmVlblJhbmdlPyBhbmQgZWRpdG9yRWxlbWVudC5jb21wb25lbnQ/XG4gICAgICBiYXNlUGl4ZWxQb3MgPSBlZGl0b3JFbGVtZW50LnBpeGVsUG9zaXRpb25Gb3JTY3JlZW5Qb3NpdGlvbihuZXcgUG9pbnQodmlzaWJsZVNjcmVlblJhbmdlWzBdLCAwKSkudG9wXG4gICAgICB2aXNpYmxlUmFuZ2UgPSB2aXNpYmxlU2NyZWVuUmFuZ2UubWFwIChyb3cpIC0+XG4gICAgICAgIGVkaXRvci5idWZmZXJQb3NpdGlvbkZvclNjcmVlblBvc2l0aW9uKG5ldyBQb2ludChyb3csIDApKS5yb3dcbiAgICAgIGdldEluZGVudCA9IChyb3cpIC0+XG4gICAgICAgIGlmIGVkaXRvci5saW5lVGV4dEZvckJ1ZmZlclJvdyhyb3cpLm1hdGNoKC9eXFxzKiQvKVxuICAgICAgICAgIG51bGxcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGVkaXRvci5pbmRlbnRhdGlvbkZvckJ1ZmZlclJvdyhyb3cpXG4gICAgICBzY3JvbGxUb3AgPSBlZGl0b3JFbGVtZW50LmdldFNjcm9sbFRvcCgpXG4gICAgICBzY3JvbGxMZWZ0ID0gZWRpdG9yRWxlbWVudC5nZXRTY3JvbGxMZWZ0KClcbiAgICAgIGd1aWRlcyA9IGdldEd1aWRlcyhcbiAgICAgICAgdmlzaWJsZVJhbmdlWzBdLFxuICAgICAgICB2aXNpYmxlUmFuZ2VbMV0sXG4gICAgICAgIGVkaXRvci5nZXRMYXN0QnVmZmVyUm93KCksXG4gICAgICAgIGVkaXRvci5nZXRDdXJzb3JCdWZmZXJQb3NpdGlvbnMoKS5tYXAoKHBvaW50KSAtPiBwb2ludC5yb3cpLFxuICAgICAgICBnZXRJbmRlbnQpXG4gICAgICBsaW5lSGVpZ2h0UGl4ZWwgPSBlZGl0b3IuZ2V0TGluZUhlaWdodEluUGl4ZWxzKClcbiAgICAgIGNyZWF0ZUVsZW1lbnRzRm9yR3VpZGVzKGVkaXRvckVsZW1lbnQsIGd1aWRlcy5tYXAgKGcpIC0+XG4gICAgICAgIChlbCkgLT4gc3R5bGVHdWlkZShcbiAgICAgICAgICBlbCxcbiAgICAgICAgICBnLnBvaW50LnRyYW5zbGF0ZShuZXcgUG9pbnQodmlzaWJsZVJhbmdlWzBdLCAwKSksXG4gICAgICAgICAgZy5sZW5ndGgsXG4gICAgICAgICAgZy5zdGFjayxcbiAgICAgICAgICBnLmFjdGl2ZSxcbiAgICAgICAgICBlZGl0b3IsXG4gICAgICAgICAgYmFzZVBpeGVsUG9zLFxuICAgICAgICAgIGxpbmVIZWlnaHRQaXhlbCxcbiAgICAgICAgICB2aXNpYmxlU2NyZWVuUmFuZ2VbMF0sXG4gICAgICAgICAgc2Nyb2xsVG9wLFxuICAgICAgICAgIHNjcm9sbExlZnQpKVxuXG5cbiAgICBoYW5kbGVFdmVudHMgPSAoZWRpdG9yLCBlZGl0b3JFbGVtZW50KSA9PlxuICAgICAgdXAgPSAoKSAtPlxuICAgICAgICB1cGRhdGVHdWlkZShlZGl0b3IsIGVkaXRvckVsZW1lbnQpXG5cbiAgICAgIGRlbGF5ZWRVcGRhdGUgPSAtPlxuICAgICAgICBzZXRUaW1lb3V0KHVwLCAwKVxuXG4gICAgICB1cGRhdGUgPSBfLnRocm90dGxlKHVwICwgMzApXG5cbiAgICAgIHN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAgICAgc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS53b3Jrc3BhY2Uub25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbSgoaXRlbSkgLT5cbiAgICAgICAgZGVsYXllZFVwZGF0ZSgpIGlmIGl0ZW0gPT0gZWRpdG9yXG4gICAgICApXG4gICAgICBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnZWRpdG9yLmZvbnRTaXplJywgZGVsYXllZFVwZGF0ZSlcbiAgICAgIHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKCdlZGl0b3IuZm9udEZhbWlseScsIGRlbGF5ZWRVcGRhdGUpXG4gICAgICBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnZWRpdG9yLmxpbmVIZWlnaHQnLCBkZWxheWVkVXBkYXRlKVxuICAgICAgc3Vic2NyaXB0aW9ucy5hZGQgZWRpdG9yLm9uRGlkQ2hhbmdlQ3Vyc29yUG9zaXRpb24odXBkYXRlKVxuICAgICAgc3Vic2NyaXB0aW9ucy5hZGQgZWRpdG9yRWxlbWVudC5vbkRpZENoYW5nZVNjcm9sbFRvcCh1cGRhdGUpXG4gICAgICBzdWJzY3JpcHRpb25zLmFkZCBlZGl0b3JFbGVtZW50Lm9uRGlkQ2hhbmdlU2Nyb2xsTGVmdCh1cGRhdGUpXG4gICAgICBzdWJzY3JpcHRpb25zLmFkZCBlZGl0b3Iub25EaWRTdG9wQ2hhbmdpbmcodXBkYXRlKVxuICAgICAgc3Vic2NyaXB0aW9ucy5hZGQgZWRpdG9yLm9uRGlkRGVzdHJveSA9PlxuICAgICAgICBAY3VycmVudFN1YnNjcmlwdGlvbnMuc3BsaWNlKEBjdXJyZW50U3Vic2NyaXB0aW9ucy5pbmRleE9mKHN1YnNjcmlwdGlvbnMpLCAxKVxuICAgICAgICBzdWJzY3JpcHRpb25zLmRpc3Bvc2UoKVxuICAgICAgQGN1cnJlbnRTdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9ucylcblxuICAgIGF0b20ud29ya3NwYWNlLm9ic2VydmVUZXh0RWRpdG9ycyAoZWRpdG9yKSAtPlxuICAgICAgcmV0dXJuIHVubGVzcyBlZGl0b3I/XG4gICAgICBlZGl0b3JFbGVtZW50ID0gYXRvbS52aWV3cy5nZXRWaWV3KGVkaXRvcilcbiAgICAgIHJldHVybiB1bmxlc3MgZWRpdG9yRWxlbWVudD9cbiAgICAgIGhhbmRsZUV2ZW50cyhlZGl0b3IsIGVkaXRvckVsZW1lbnQpXG4gICAgICB1cGRhdGVHdWlkZShlZGl0b3IsIGVkaXRvckVsZW1lbnQpXG5cbiAgZGVhY3RpdmF0ZTogKCkgLT5cbiAgICBAY3VycmVudFN1YnNjcmlwdGlvbnMuZm9yRWFjaCAocykgLT5cbiAgICAgIHMuZGlzcG9zZSgpXG4gICAgYXRvbS53b3Jrc3BhY2UuZ2V0VGV4dEVkaXRvcnMoKS5mb3JFYWNoICh0ZSkgLT5cbiAgICAgIHYgPSBhdG9tLnZpZXdzLmdldFZpZXcodGUpXG4gICAgICByZXR1cm4gdW5sZXNzIHZcbiAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodi5xdWVyeVNlbGVjdG9yQWxsKCcuaW5kZW50LWd1aWRlLWltcHJvdmVkJyksIChlKSAtPlxuICAgICAgICBlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZSlcbiAgICAgIClcbiJdfQ==

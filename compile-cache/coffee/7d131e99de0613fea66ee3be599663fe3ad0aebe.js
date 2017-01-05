(function() {
  var $, CompositeDisposable, CoveringView, View, _, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CompositeDisposable = require('atom').CompositeDisposable;

  ref = require('space-pen'), View = ref.View, $ = ref.$;

  _ = require('underscore-plus');

  CoveringView = (function(superClass) {
    extend(CoveringView, superClass);

    function CoveringView() {
      return CoveringView.__super__.constructor.apply(this, arguments);
    }

    CoveringView.prototype.initialize = function(editor) {
      this.editor = editor;
      this.coverSubs = new CompositeDisposable;
      this.overlay = this.editor.decorateMarker(this.cover(), {
        type: 'overlay',
        item: this,
        position: 'tail'
      });
      return this.coverSubs.add(this.editor.onDidDestroy((function(_this) {
        return function() {
          return _this.cleanup();
        };
      })(this)));
    };

    CoveringView.prototype.attached = function() {
      var view;
      view = atom.views.getView(this.editor);
      this.parent().css({
        right: view.getVerticalScrollbarWidth()
      });
      this.css({
        'margin-top': -this.editor.getLineHeightInPixels()
      });
      return this.height(this.editor.getLineHeightInPixels());
    };

    CoveringView.prototype.cleanup = function() {
      var ref1;
      this.coverSubs.dispose();
      if ((ref1 = this.overlay) != null) {
        ref1.destroy();
      }
      return this.overlay = null;
    };

    CoveringView.prototype.cover = function() {
      return null;
    };

    CoveringView.prototype.conflict = function() {
      return null;
    };

    CoveringView.prototype.isDirty = function() {
      return false;
    };

    CoveringView.prototype.detectDirty = function() {
      return null;
    };

    CoveringView.prototype.decorate = function() {
      return null;
    };

    CoveringView.prototype.getModel = function() {
      return null;
    };

    CoveringView.prototype.buffer = function() {
      return this.editor.getBuffer();
    };

    CoveringView.prototype.includesCursor = function(cursor) {
      return false;
    };

    CoveringView.prototype.deleteMarker = function(marker) {
      this.buffer()["delete"](marker.getBufferRange());
      return marker.destroy();
    };

    CoveringView.prototype.scrollTo = function(positionOrNull) {
      if (positionOrNull != null) {
        return this.editor.setCursorBufferPosition(positionOrNull);
      }
    };

    CoveringView.prototype.prependKeystroke = function(eventName, element) {
      var bindings, e, i, len, original, results;
      bindings = atom.keymaps.findKeyBindings({
        command: eventName
      });
      results = [];
      for (i = 0, len = bindings.length; i < len; i++) {
        e = bindings[i];
        original = element.text();
        results.push(element.text(_.humanizeKeystroke(e.keystrokes) + (" " + original)));
      }
      return results;
    };

    return CoveringView;

  })(View);

  module.exports = {
    CoveringView: CoveringView
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9tZXJnZS1jb25mbGljdHMvbGliL3ZpZXcvY292ZXJpbmctdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLGtEQUFBO0lBQUE7OztFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUjs7RUFDeEIsTUFBWSxPQUFBLENBQVEsV0FBUixDQUFaLEVBQUMsZUFBRCxFQUFPOztFQUNQLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVI7O0VBR0U7Ozs7Ozs7MkJBRUosVUFBQSxHQUFZLFNBQUMsTUFBRDtNQUFDLElBQUMsQ0FBQSxTQUFEO01BQ1gsSUFBQyxDQUFBLFNBQUQsR0FBYSxJQUFJO01BQ2pCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxjQUFSLENBQXVCLElBQUMsQ0FBQSxLQUFELENBQUEsQ0FBdkIsRUFDVDtRQUFBLElBQUEsRUFBTSxTQUFOO1FBQ0EsSUFBQSxFQUFNLElBRE47UUFFQSxRQUFBLEVBQVUsTUFGVjtPQURTO2FBS1gsSUFBQyxDQUFBLFNBQVMsQ0FBQyxHQUFYLENBQWUsSUFBQyxDQUFBLE1BQU0sQ0FBQyxZQUFSLENBQXFCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtpQkFBRyxLQUFDLENBQUEsT0FBRCxDQUFBO1FBQUg7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXJCLENBQWY7SUFQVTs7MkJBU1osUUFBQSxHQUFVLFNBQUE7QUFDUixVQUFBO01BQUEsSUFBQSxHQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixJQUFDLENBQUEsTUFBcEI7TUFDUCxJQUFDLENBQUEsTUFBRCxDQUFBLENBQVMsQ0FBQyxHQUFWLENBQWM7UUFBQSxLQUFBLEVBQU8sSUFBSSxDQUFDLHlCQUFMLENBQUEsQ0FBUDtPQUFkO01BRUEsSUFBQyxDQUFBLEdBQUQsQ0FBSztRQUFBLFlBQUEsRUFBYyxDQUFDLElBQUMsQ0FBQSxNQUFNLENBQUMscUJBQVIsQ0FBQSxDQUFmO09BQUw7YUFDQSxJQUFDLENBQUEsTUFBRCxDQUFRLElBQUMsQ0FBQSxNQUFNLENBQUMscUJBQVIsQ0FBQSxDQUFSO0lBTFE7OzJCQU9WLE9BQUEsR0FBUyxTQUFBO0FBQ1AsVUFBQTtNQUFBLElBQUMsQ0FBQSxTQUFTLENBQUMsT0FBWCxDQUFBOztZQUVRLENBQUUsT0FBVixDQUFBOzthQUNBLElBQUMsQ0FBQSxPQUFELEdBQVc7SUFKSjs7MkJBT1QsS0FBQSxHQUFPLFNBQUE7YUFBRztJQUFIOzsyQkFHUCxRQUFBLEdBQVUsU0FBQTthQUFHO0lBQUg7OzJCQUVWLE9BQUEsR0FBUyxTQUFBO2FBQUc7SUFBSDs7MkJBR1QsV0FBQSxHQUFhLFNBQUE7YUFBRztJQUFIOzsyQkFHYixRQUFBLEdBQVUsU0FBQTthQUFHO0lBQUg7OzJCQUVWLFFBQUEsR0FBVSxTQUFBO2FBQUc7SUFBSDs7MkJBRVYsTUFBQSxHQUFRLFNBQUE7YUFBRyxJQUFDLENBQUEsTUFBTSxDQUFDLFNBQVIsQ0FBQTtJQUFIOzsyQkFFUixjQUFBLEdBQWdCLFNBQUMsTUFBRDthQUFZO0lBQVo7OzJCQUVoQixZQUFBLEdBQWMsU0FBQyxNQUFEO01BQ1osSUFBQyxDQUFBLE1BQUQsQ0FBQSxDQUFTLEVBQUMsTUFBRCxFQUFULENBQWlCLE1BQU0sQ0FBQyxjQUFQLENBQUEsQ0FBakI7YUFDQSxNQUFNLENBQUMsT0FBUCxDQUFBO0lBRlk7OzJCQUlkLFFBQUEsR0FBVSxTQUFDLGNBQUQ7TUFDUixJQUFrRCxzQkFBbEQ7ZUFBQSxJQUFDLENBQUEsTUFBTSxDQUFDLHVCQUFSLENBQWdDLGNBQWhDLEVBQUE7O0lBRFE7OzJCQUdWLGdCQUFBLEdBQWtCLFNBQUMsU0FBRCxFQUFZLE9BQVo7QUFDaEIsVUFBQTtNQUFBLFFBQUEsR0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWIsQ0FBNkI7UUFBQSxPQUFBLEVBQVMsU0FBVDtPQUE3QjtBQUVYO1dBQUEsMENBQUE7O1FBQ0UsUUFBQSxHQUFXLE9BQU8sQ0FBQyxJQUFSLENBQUE7cUJBQ1gsT0FBTyxDQUFDLElBQVIsQ0FBYSxDQUFDLENBQUMsaUJBQUYsQ0FBb0IsQ0FBQyxDQUFDLFVBQXRCLENBQUEsR0FBb0MsQ0FBQSxHQUFBLEdBQUksUUFBSixDQUFqRDtBQUZGOztJQUhnQjs7OztLQW5ETzs7RUEwRDNCLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7SUFBQSxZQUFBLEVBQWMsWUFBZDs7QUFoRUYiLCJzb3VyY2VzQ29udGVudCI6WyJ7Q29tcG9zaXRlRGlzcG9zYWJsZX0gPSByZXF1aXJlICdhdG9tJ1xue1ZpZXcsICR9ID0gcmVxdWlyZSAnc3BhY2UtcGVuJ1xuXyA9IHJlcXVpcmUgJ3VuZGVyc2NvcmUtcGx1cydcblxuXG5jbGFzcyBDb3ZlcmluZ1ZpZXcgZXh0ZW5kcyBWaWV3XG5cbiAgaW5pdGlhbGl6ZTogKEBlZGl0b3IpIC0+XG4gICAgQGNvdmVyU3VicyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlXG4gICAgQG92ZXJsYXkgPSBAZWRpdG9yLmRlY29yYXRlTWFya2VyIEBjb3ZlcigpLFxuICAgICAgdHlwZTogJ292ZXJsYXknLFxuICAgICAgaXRlbTogdGhpcyxcbiAgICAgIHBvc2l0aW9uOiAndGFpbCdcblxuICAgIEBjb3ZlclN1YnMuYWRkIEBlZGl0b3Iub25EaWREZXN0cm95ID0+IEBjbGVhbnVwKClcblxuICBhdHRhY2hlZDogLT5cbiAgICB2aWV3ID0gYXRvbS52aWV3cy5nZXRWaWV3KEBlZGl0b3IpXG4gICAgQHBhcmVudCgpLmNzcyByaWdodDogdmlldy5nZXRWZXJ0aWNhbFNjcm9sbGJhcldpZHRoKClcblxuICAgIEBjc3MgJ21hcmdpbi10b3AnOiAtQGVkaXRvci5nZXRMaW5lSGVpZ2h0SW5QaXhlbHMoKVxuICAgIEBoZWlnaHQgQGVkaXRvci5nZXRMaW5lSGVpZ2h0SW5QaXhlbHMoKVxuXG4gIGNsZWFudXA6IC0+XG4gICAgQGNvdmVyU3Vicy5kaXNwb3NlKClcblxuICAgIEBvdmVybGF5Py5kZXN0cm95KClcbiAgICBAb3ZlcmxheSA9IG51bGxcblxuICAjIE92ZXJyaWRlIHRvIHNwZWNpZnkgdGhlIG1hcmtlciBvZiB0aGUgZmlyc3QgbGluZSB0aGF0IHNob3VsZCBiZSBjb3ZlcmVkLlxuICBjb3ZlcjogLT4gbnVsbFxuXG4gICMgT3ZlcnJpZGUgdG8gcmV0dXJuIHRoZSBDb25mbGljdCB0aGF0IHRoaXMgdmlldyBpcyByZXNwb25zaWJsZSBmb3IuXG4gIGNvbmZsaWN0OiAtPiBudWxsXG5cbiAgaXNEaXJ0eTogLT4gZmFsc2VcblxuICAjIE92ZXJyaWRlIHRvIGRldGVybWluZSBpZiB0aGUgY29udGVudCBvZiB0aGlzIFNpZGUgaGFzIGJlZW4gbW9kaWZpZWQuXG4gIGRldGVjdERpcnR5OiAtPiBudWxsXG5cbiAgIyBPdmVycmlkZSB0byBhcHBseSBhIGRlY29yYXRpb24gdG8gYSBtYXJrZXIgYXMgYXBwcm9wcmlhdGUuXG4gIGRlY29yYXRlOiAtPiBudWxsXG5cbiAgZ2V0TW9kZWw6IC0+IG51bGxcblxuICBidWZmZXI6IC0+IEBlZGl0b3IuZ2V0QnVmZmVyKClcblxuICBpbmNsdWRlc0N1cnNvcjogKGN1cnNvcikgLT4gZmFsc2VcblxuICBkZWxldGVNYXJrZXI6IChtYXJrZXIpIC0+XG4gICAgQGJ1ZmZlcigpLmRlbGV0ZSBtYXJrZXIuZ2V0QnVmZmVyUmFuZ2UoKVxuICAgIG1hcmtlci5kZXN0cm95KClcblxuICBzY3JvbGxUbzogKHBvc2l0aW9uT3JOdWxsKSAtPlxuICAgIEBlZGl0b3Iuc2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24gcG9zaXRpb25Pck51bGwgaWYgcG9zaXRpb25Pck51bGw/XG5cbiAgcHJlcGVuZEtleXN0cm9rZTogKGV2ZW50TmFtZSwgZWxlbWVudCkgLT5cbiAgICBiaW5kaW5ncyA9IGF0b20ua2V5bWFwcy5maW5kS2V5QmluZGluZ3MgY29tbWFuZDogZXZlbnROYW1lXG5cbiAgICBmb3IgZSBpbiBiaW5kaW5nc1xuICAgICAgb3JpZ2luYWwgPSBlbGVtZW50LnRleHQoKVxuICAgICAgZWxlbWVudC50ZXh0KF8uaHVtYW5pemVLZXlzdHJva2UoZS5rZXlzdHJva2VzKSArIFwiICN7b3JpZ2luYWx9XCIpXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgQ292ZXJpbmdWaWV3OiBDb3ZlcmluZ1ZpZXdcbiJdfQ==

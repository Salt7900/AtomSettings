(function() {
  var CompositeDisposable, CoveringView, NavigationView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CompositeDisposable = require('atom').CompositeDisposable;

  CoveringView = require('./covering-view').CoveringView;

  NavigationView = (function(superClass) {
    extend(NavigationView, superClass);

    function NavigationView() {
      return NavigationView.__super__.constructor.apply(this, arguments);
    }

    NavigationView.content = function(navigator, editor) {
      return this.div({
        "class": 'controls navigation'
      }, (function(_this) {
        return function() {
          _this.text(' ');
          return _this.span({
            "class": 'pull-right'
          }, function() {
            _this.button({
              "class": 'btn btn-xs',
              click: 'up',
              outlet: 'prevBtn'
            }, 'prev');
            return _this.button({
              "class": 'btn btn-xs',
              click: 'down',
              outlet: 'nextBtn'
            }, 'next');
          });
        };
      })(this));
    };

    NavigationView.prototype.initialize = function(navigator1, editor) {
      this.navigator = navigator1;
      this.subs = new CompositeDisposable;
      NavigationView.__super__.initialize.call(this, editor);
      this.prependKeystroke('merge-conflicts:previous-unresolved', this.prevBtn);
      this.prependKeystroke('merge-conflicts:next-unresolved', this.nextBtn);
      return this.subs.add(this.navigator.conflict.onDidResolveConflict((function(_this) {
        return function() {
          _this.deleteMarker(_this.cover());
          _this.remove();
          return _this.cleanup();
        };
      })(this)));
    };

    NavigationView.prototype.cleanup = function() {
      NavigationView.__super__.cleanup.apply(this, arguments);
      return this.subs.dispose();
    };

    NavigationView.prototype.cover = function() {
      return this.navigator.separatorMarker;
    };

    NavigationView.prototype.up = function() {
      var ref;
      return this.scrollTo((ref = this.navigator.previousUnresolved()) != null ? ref.scrollTarget() : void 0);
    };

    NavigationView.prototype.down = function() {
      var ref;
      return this.scrollTo((ref = this.navigator.nextUnresolved()) != null ? ref.scrollTarget() : void 0);
    };

    NavigationView.prototype.conflict = function() {
      return this.navigator.conflict;
    };

    NavigationView.prototype.toString = function() {
      return "{NavView of: " + (this.conflict()) + "}";
    };

    return NavigationView;

  })(CoveringView);

  module.exports = {
    NavigationView: NavigationView
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9tZXJnZS1jb25mbGljdHMvbGliL3ZpZXcvbmF2aWdhdGlvbi12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsaURBQUE7SUFBQTs7O0VBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSOztFQUN2QixlQUFnQixPQUFBLENBQVEsaUJBQVI7O0VBRVg7Ozs7Ozs7SUFFSixjQUFDLENBQUEsT0FBRCxHQUFVLFNBQUMsU0FBRCxFQUFZLE1BQVo7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO1FBQUEsQ0FBQSxLQUFBLENBQUEsRUFBTyxxQkFBUDtPQUFMLEVBQW1DLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNqQyxLQUFDLENBQUEsSUFBRCxDQUFNLEdBQU47aUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTTtZQUFBLENBQUEsS0FBQSxDQUFBLEVBQU8sWUFBUDtXQUFOLEVBQTJCLFNBQUE7WUFDekIsS0FBQyxDQUFBLE1BQUQsQ0FBUTtjQUFBLENBQUEsS0FBQSxDQUFBLEVBQU8sWUFBUDtjQUFxQixLQUFBLEVBQU8sSUFBNUI7Y0FBa0MsTUFBQSxFQUFRLFNBQTFDO2FBQVIsRUFBNkQsTUFBN0Q7bUJBQ0EsS0FBQyxDQUFBLE1BQUQsQ0FBUTtjQUFBLENBQUEsS0FBQSxDQUFBLEVBQU8sWUFBUDtjQUFxQixLQUFBLEVBQU8sTUFBNUI7Y0FBb0MsTUFBQSxFQUFRLFNBQTVDO2FBQVIsRUFBK0QsTUFBL0Q7VUFGeUIsQ0FBM0I7UUFGaUM7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5DO0lBRFE7OzZCQU9WLFVBQUEsR0FBWSxTQUFDLFVBQUQsRUFBYSxNQUFiO01BQUMsSUFBQyxDQUFBLFlBQUQ7TUFDWCxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUk7TUFFWiwrQ0FBTSxNQUFOO01BRUEsSUFBQyxDQUFBLGdCQUFELENBQWtCLHFDQUFsQixFQUF5RCxJQUFDLENBQUEsT0FBMUQ7TUFDQSxJQUFDLENBQUEsZ0JBQUQsQ0FBa0IsaUNBQWxCLEVBQXFELElBQUMsQ0FBQSxPQUF0RDthQUVBLElBQUMsQ0FBQSxJQUFJLENBQUMsR0FBTixDQUFVLElBQUMsQ0FBQSxTQUFTLENBQUMsUUFBUSxDQUFDLG9CQUFwQixDQUF5QyxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7VUFDakQsS0FBQyxDQUFBLFlBQUQsQ0FBYyxLQUFDLENBQUEsS0FBRCxDQUFBLENBQWQ7VUFDQSxLQUFDLENBQUEsTUFBRCxDQUFBO2lCQUNBLEtBQUMsQ0FBQSxPQUFELENBQUE7UUFIaUQ7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXpDLENBQVY7SUFSVTs7NkJBYVosT0FBQSxHQUFTLFNBQUE7TUFDUCw2Q0FBQSxTQUFBO2FBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLENBQUE7SUFGTzs7NkJBSVQsS0FBQSxHQUFPLFNBQUE7YUFBRyxJQUFDLENBQUEsU0FBUyxDQUFDO0lBQWQ7OzZCQUVQLEVBQUEsR0FBSSxTQUFBO0FBQUcsVUFBQTthQUFBLElBQUMsQ0FBQSxRQUFELDBEQUF5QyxDQUFFLFlBQWpDLENBQUEsVUFBVjtJQUFIOzs2QkFFSixJQUFBLEdBQU0sU0FBQTtBQUFHLFVBQUE7YUFBQSxJQUFDLENBQUEsUUFBRCxzREFBcUMsQ0FBRSxZQUE3QixDQUFBLFVBQVY7SUFBSDs7NkJBRU4sUUFBQSxHQUFVLFNBQUE7YUFBRyxJQUFDLENBQUEsU0FBUyxDQUFDO0lBQWQ7OzZCQUVWLFFBQUEsR0FBVSxTQUFBO2FBQUcsZUFBQSxHQUFlLENBQUMsSUFBQyxDQUFBLFFBQUQsQ0FBQSxDQUFELENBQWYsR0FBNEI7SUFBL0I7Ozs7S0FsQ2lCOztFQW9DN0IsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLGNBQUEsRUFBZ0IsY0FBaEI7O0FBeENGIiwic291cmNlc0NvbnRlbnQiOlsie0NvbXBvc2l0ZURpc3Bvc2FibGV9ID0gcmVxdWlyZSAnYXRvbSdcbntDb3ZlcmluZ1ZpZXd9ID0gcmVxdWlyZSAnLi9jb3ZlcmluZy12aWV3J1xuXG5jbGFzcyBOYXZpZ2F0aW9uVmlldyBleHRlbmRzIENvdmVyaW5nVmlld1xuXG4gIEBjb250ZW50OiAobmF2aWdhdG9yLCBlZGl0b3IpIC0+XG4gICAgQGRpdiBjbGFzczogJ2NvbnRyb2xzIG5hdmlnYXRpb24nLCA9PlxuICAgICAgQHRleHQgJyAnXG4gICAgICBAc3BhbiBjbGFzczogJ3B1bGwtcmlnaHQnLCA9PlxuICAgICAgICBAYnV0dG9uIGNsYXNzOiAnYnRuIGJ0bi14cycsIGNsaWNrOiAndXAnLCBvdXRsZXQ6ICdwcmV2QnRuJywgJ3ByZXYnXG4gICAgICAgIEBidXR0b24gY2xhc3M6ICdidG4gYnRuLXhzJywgY2xpY2s6ICdkb3duJywgb3V0bGV0OiAnbmV4dEJ0bicsICduZXh0J1xuXG4gIGluaXRpYWxpemU6IChAbmF2aWdhdG9yLCBlZGl0b3IpIC0+XG4gICAgQHN1YnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZVxuXG4gICAgc3VwZXIgZWRpdG9yXG5cbiAgICBAcHJlcGVuZEtleXN0cm9rZSAnbWVyZ2UtY29uZmxpY3RzOnByZXZpb3VzLXVucmVzb2x2ZWQnLCBAcHJldkJ0blxuICAgIEBwcmVwZW5kS2V5c3Ryb2tlICdtZXJnZS1jb25mbGljdHM6bmV4dC11bnJlc29sdmVkJywgQG5leHRCdG5cblxuICAgIEBzdWJzLmFkZCBAbmF2aWdhdG9yLmNvbmZsaWN0Lm9uRGlkUmVzb2x2ZUNvbmZsaWN0ID0+XG4gICAgICBAZGVsZXRlTWFya2VyIEBjb3ZlcigpXG4gICAgICBAcmVtb3ZlKClcbiAgICAgIEBjbGVhbnVwKClcblxuICBjbGVhbnVwOiAtPlxuICAgIHN1cGVyXG4gICAgQHN1YnMuZGlzcG9zZSgpXG5cbiAgY292ZXI6IC0+IEBuYXZpZ2F0b3Iuc2VwYXJhdG9yTWFya2VyXG5cbiAgdXA6IC0+IEBzY3JvbGxUbyBAbmF2aWdhdG9yLnByZXZpb3VzVW5yZXNvbHZlZCgpPy5zY3JvbGxUYXJnZXQoKVxuXG4gIGRvd246IC0+IEBzY3JvbGxUbyBAbmF2aWdhdG9yLm5leHRVbnJlc29sdmVkKCk/LnNjcm9sbFRhcmdldCgpXG5cbiAgY29uZmxpY3Q6IC0+IEBuYXZpZ2F0b3IuY29uZmxpY3RcblxuICB0b1N0cmluZzogLT4gXCJ7TmF2VmlldyBvZjogI3tAY29uZmxpY3QoKX19XCJcblxubW9kdWxlLmV4cG9ydHMgPVxuICBOYXZpZ2F0aW9uVmlldzogTmF2aWdhdGlvblZpZXdcbiJdfQ==

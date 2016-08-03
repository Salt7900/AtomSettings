(function() {
  var OptionsView, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  module.exports = OptionsView = (function(_super) {
    __extends(OptionsView, _super);

    function OptionsView() {
      this.selectRenderer = __bind(this.selectRenderer, this);
      this.close = __bind(this.close, this);
      this.toggle = __bind(this.toggle, this);
      this.attach = __bind(this.attach, this);
      return OptionsView.__super__.constructor.apply(this, arguments);
    }

    OptionsView.content = function() {
      return this.div((function(_this) {
        return function() {
          return _this.div({
            "class": 'overlay from-top'
          }, function() {
            return _this.div({
              "class": "tool-panel panel-bottom"
            }, function() {
              return _this.div({
                "class": "inset-panel"
              }, function() {
                _this.div({
                  "class": "panel-heading"
                }, function() {
                  _this.div({
                    "class": 'btn-toolbar pull-right'
                  }, function() {
                    return _this.button({
                      "class": 'btn',
                      click: 'close'
                    }, 'Close');
                  });
                  return _this.span('Preview Options');
                });
                return _this.div({
                  "class": "panel-body padded"
                }, function() {
                  return _this.button({
                    "class": 'btn btn-primary inline-block-tight',
                    click: 'selectRenderer'
                  }, 'Select Renderer');
                });
              });
            });
          });
        };
      })(this));
    };

    OptionsView.prototype.initialize = function(previewView) {
      this.previewView = previewView;
    };

    OptionsView.prototype.attach = function() {
      this.previewView.self.append(this);
      return this.previewView.hideMessage();
    };

    OptionsView.prototype.toggle = function() {
      if (this.hasParent()) {
        return this.detach();
      } else {
        return this.attach();
      }
    };

    OptionsView.prototype.close = function(event, element) {
      return this.detach();
    };

    OptionsView.prototype.selectRenderer = function() {
      return this.previewView.selectRenderer();
    };

    return OptionsView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9wcmV2aWV3L2xpYi9vcHRpb25zLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlCQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUMsT0FBUSxPQUFBLENBQVEsc0JBQVIsRUFBUixJQUFELENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osa0NBQUEsQ0FBQTs7Ozs7Ozs7S0FBQTs7QUFBQSxJQUFBLFdBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNILEtBQUMsQ0FBQSxHQUFELENBQ0U7QUFBQSxZQUFBLE9BQUEsRUFBTyxrQkFBUDtXQURGLEVBRUUsU0FBQSxHQUFBO21CQUNFLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTyx5QkFBUDthQUFMLEVBQXVDLFNBQUEsR0FBQTtxQkFDckMsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGdCQUFBLE9BQUEsRUFBTyxhQUFQO2VBQUwsRUFBMkIsU0FBQSxHQUFBO0FBQ3pCLGdCQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxrQkFBQSxPQUFBLEVBQU8sZUFBUDtpQkFBTCxFQUE2QixTQUFBLEdBQUE7QUFDM0Isa0JBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLG9CQUFBLE9BQUEsRUFBTyx3QkFBUDttQkFBTCxFQUFzQyxTQUFBLEdBQUE7MkJBQ3BDLEtBQUMsQ0FBQSxNQUFELENBQ0U7QUFBQSxzQkFBQSxPQUFBLEVBQU8sS0FBUDtBQUFBLHNCQUNBLEtBQUEsRUFBTyxPQURQO3FCQURGLEVBR0UsT0FIRixFQURvQztrQkFBQSxDQUF0QyxDQUFBLENBQUE7eUJBS0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxpQkFBTixFQU4yQjtnQkFBQSxDQUE3QixDQUFBLENBQUE7dUJBT0EsS0FBQyxDQUFBLEdBQUQsQ0FDRTtBQUFBLGtCQUFBLE9BQUEsRUFBTyxtQkFBUDtpQkFERixFQUVFLFNBQUEsR0FBQTt5QkFDRSxLQUFDLENBQUEsTUFBRCxDQUNFO0FBQUEsb0JBQUEsT0FBQSxFQUFPLG9DQUFQO0FBQUEsb0JBQ0EsS0FBQSxFQUFPLGdCQURQO21CQURGLEVBR0UsaUJBSEYsRUFERjtnQkFBQSxDQUZGLEVBUnlCO2NBQUEsQ0FBM0IsRUFEcUM7WUFBQSxDQUF2QyxFQURGO1VBQUEsQ0FGRixFQURHO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBTCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDBCQXVCQSxVQUFBLEdBQVksU0FBRSxXQUFGLEdBQUE7QUFBZ0IsTUFBZixJQUFDLENBQUEsY0FBQSxXQUFjLENBQWhCO0lBQUEsQ0F2QlosQ0FBQTs7QUFBQSwwQkF5QkEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLE1BQUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBbEIsQ0FBeUIsSUFBekIsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxXQUFiLENBQUEsRUFGTTtJQUFBLENBekJSLENBQUE7O0FBQUEsMEJBNEJBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLElBQUcsSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQUFIO2VBQ0UsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURGO09BQUEsTUFBQTtlQUdFLElBQUMsQ0FBQSxNQUFELENBQUEsRUFIRjtPQURNO0lBQUEsQ0E1QlIsQ0FBQTs7QUFBQSwwQkFpQ0EsS0FBQSxHQUFPLFNBQUMsS0FBRCxFQUFRLE9BQVIsR0FBQTthQUNMLElBQUMsQ0FBQSxNQUFELENBQUEsRUFESztJQUFBLENBakNQLENBQUE7O0FBQUEsMEJBb0NBLGNBQUEsR0FBZ0IsU0FBQSxHQUFBO2FBRWQsSUFBQyxDQUFBLFdBQVcsQ0FBQyxjQUFiLENBQUEsRUFGYztJQUFBLENBcENoQixDQUFBOzt1QkFBQTs7S0FEd0IsS0FIMUIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/benfallon/.atom/packages/preview/lib/options-view.coffee

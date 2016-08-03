(function() {
  var PreviewMessageView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  module.exports = PreviewMessageView = (function(_super) {
    __extends(PreviewMessageView, _super);

    function PreviewMessageView() {
      return PreviewMessageView.__super__.constructor.apply(this, arguments);
    }

    PreviewMessageView.content = function() {
      return this.div((function(_this) {
        return function() {
          return _this.div({
            "class": 'overlay preview-overlay-full from-top',
            outlet: 'message'
          });
        };
      })(this));
    };

    return PreviewMessageView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9wcmV2aWV3L2xpYi9wcmV2aWV3LW1lc3NhZ2Utdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsd0JBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLE9BQVEsT0FBQSxDQUFRLHNCQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0EsTUFBTSxDQUFDLE9BQVAsR0FBdUI7QUFDckIseUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsa0JBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNILEtBQUMsQ0FBQSxHQUFELENBQ0U7QUFBQSxZQUFBLE9BQUEsRUFBTyx1Q0FBUDtBQUFBLFlBQ0EsTUFBQSxFQUFRLFNBRFI7V0FERixFQURHO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBTCxFQURRO0lBQUEsQ0FBVixDQUFBOzs4QkFBQTs7S0FEZ0QsS0FEbEQsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/benfallon/.atom/packages/preview/lib/preview-message-view.coffee

(function() {
  var CompositeDisposable;

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = {
    subscriptions: null,
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(atom.commands.add('atom-workspace', {
        'erb-helper:output': (function(_this) {
          return function() {
            return _this.output();
          };
        })(this),
        'erb-helper:eval': (function(_this) {
          return function() {
            return _this["eval"]();
          };
        })(this),
        'erb-helper:comment': (function(_this) {
          return function() {
            return _this.comment();
          };
        })(this)
      }));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    output: function() {
      return this.insertTag('<%=  %>');
    },
    "eval": function() {
      return this.insertTag('<%  %>');
    },
    comment: function() {
      return this.insertTag('<%#  %>');
    },
    insertTag: function(tag) {
      var closeTag, editor, openTag, selection, _ref;
      editor = atom.workspace.getActiveTextEditor();
      selection = editor.getSelectedText();
      _ref = tag.split(" "), openTag = _ref[0], closeTag = _ref[_ref.length - 1];
      if (selection) {
        return editor.insertText(openTag + (" " + selection + " ") + closeTag);
      } else {
        editor.insertText(tag);
        return editor.moveLeft(3);
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9lcmItaGVscGVyL2xpYi9lcmItaGVscGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxtQkFBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsYUFBQSxFQUFlLElBQWY7QUFBQSxJQUVBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFBakIsQ0FBQTthQUNBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQW9DO0FBQUEsUUFDckQsbUJBQUEsRUFBdUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7bUJBQUcsS0FBQyxDQUFBLE1BQUQsQ0FBQSxFQUFIO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FEOEI7QUFBQSxRQUVyRCxpQkFBQSxFQUF1QixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsTUFBQSxDQUFELENBQUEsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRjhCO0FBQUEsUUFHckQsb0JBQUEsRUFBdUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7bUJBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBQSxFQUFIO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FIOEI7T0FBcEMsQ0FBbkIsRUFGUTtJQUFBLENBRlY7QUFBQSxJQVVBLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsYUFBYSxDQUFDLE9BQWYsQ0FBQSxFQURVO0lBQUEsQ0FWWjtBQUFBLElBYUEsTUFBQSxFQUFRLFNBQUEsR0FBQTthQUNOLElBQUMsQ0FBQSxTQUFELENBQVcsU0FBWCxFQURNO0lBQUEsQ0FiUjtBQUFBLElBZ0JBLE1BQUEsRUFBTSxTQUFBLEdBQUE7YUFDSixJQUFDLENBQUEsU0FBRCxDQUFXLFFBQVgsRUFESTtJQUFBLENBaEJOO0FBQUEsSUFtQkEsT0FBQSxFQUFTLFNBQUEsR0FBQTthQUNQLElBQUMsQ0FBQSxTQUFELENBQVcsU0FBWCxFQURPO0lBQUEsQ0FuQlQ7QUFBQSxJQXNCQSxTQUFBLEVBQVcsU0FBQyxHQUFELEdBQUE7QUFDVCxVQUFBLDBDQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBLENBQVQsQ0FBQTtBQUFBLE1BQ0EsU0FBQSxHQUFZLE1BQU0sQ0FBQyxlQUFQLENBQUEsQ0FEWixDQUFBO0FBQUEsTUFFQSxPQUEyQixHQUFHLENBQUMsS0FBSixDQUFVLEdBQVYsQ0FBM0IsRUFBQyxpQkFBRCxFQUFlLGdDQUZmLENBQUE7QUFJQSxNQUFBLElBQUcsU0FBSDtlQUNFLE1BQU0sQ0FBQyxVQUFQLENBQWtCLE9BQUEsR0FBVSxDQUFDLEdBQUEsR0FBRyxTQUFILEdBQWEsR0FBZCxDQUFWLEdBQTZCLFFBQS9DLEVBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxNQUFNLENBQUMsVUFBUCxDQUFrQixHQUFsQixDQUFBLENBQUE7ZUFDQSxNQUFNLENBQUMsUUFBUCxDQUFnQixDQUFoQixFQUpGO09BTFM7SUFBQSxDQXRCWDtHQUhGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/benfallon/.atom/packages/erb-helper/lib/erb-helper.coffee

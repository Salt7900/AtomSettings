(function() {
  var PpMarkdown;

  PpMarkdown = require('../lib/pp-markdown');

  describe("PpMarkdown", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('pp-markdown');
    });
    return describe("when the pp-markdown:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.pp-markdown')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'pp-markdown:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var ppMarkdownElement, ppMarkdownPanel;
          expect(workspaceElement.querySelector('.pp-markdown')).toExist();
          ppMarkdownElement = workspaceElement.querySelector('.pp-markdown');
          expect(ppMarkdownElement).toExist();
          ppMarkdownPanel = atom.workspace.panelForItem(ppMarkdownElement);
          expect(ppMarkdownPanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'pp-markdown:toggle');
          return expect(ppMarkdownPanel.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.pp-markdown')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'pp-markdown:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var ppMarkdownElement;
          ppMarkdownElement = workspaceElement.querySelector('.pp-markdown');
          expect(ppMarkdownElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'pp-markdown:toggle');
          return expect(ppMarkdownElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9wcC1tYXJrZG93bi9zcGVjL3BwLW1hcmtkb3duLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFVBQUE7O0FBQUEsRUFBQSxVQUFBLEdBQWEsT0FBQSxDQUFRLG9CQUFSLENBQWIsQ0FBQTs7QUFBQSxFQU9BLFFBQUEsQ0FBUyxZQUFULEVBQXVCLFNBQUEsR0FBQTtBQUNyQixRQUFBLHlDQUFBO0FBQUEsSUFBQSxPQUF3QyxFQUF4QyxFQUFDLDBCQUFELEVBQW1CLDJCQUFuQixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxnQkFBQSxHQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCLENBQW5CLENBQUE7YUFDQSxpQkFBQSxHQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsYUFBOUIsRUFGWDtJQUFBLENBQVgsQ0FGQSxDQUFBO1dBTUEsUUFBQSxDQUFTLGdEQUFULEVBQTJELFNBQUEsR0FBQTtBQUN6RCxNQUFBLEVBQUEsQ0FBRyxpQ0FBSCxFQUFzQyxTQUFBLEdBQUE7QUFHcEMsUUFBQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsY0FBL0IsQ0FBUCxDQUFzRCxDQUFDLEdBQUcsQ0FBQyxPQUEzRCxDQUFBLENBQUEsQ0FBQTtBQUFBLFFBSUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QyxvQkFBekMsQ0FKQSxDQUFBO0FBQUEsUUFNQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBTkEsQ0FBQTtlQVNBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxjQUFBLGtDQUFBO0FBQUEsVUFBQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsY0FBL0IsQ0FBUCxDQUFzRCxDQUFDLE9BQXZELENBQUEsQ0FBQSxDQUFBO0FBQUEsVUFFQSxpQkFBQSxHQUFvQixnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixjQUEvQixDQUZwQixDQUFBO0FBQUEsVUFHQSxNQUFBLENBQU8saUJBQVAsQ0FBeUIsQ0FBQyxPQUExQixDQUFBLENBSEEsQ0FBQTtBQUFBLFVBS0EsZUFBQSxHQUFrQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWYsQ0FBNEIsaUJBQTVCLENBTGxCLENBQUE7QUFBQSxVQU1BLE1BQUEsQ0FBTyxlQUFlLENBQUMsU0FBaEIsQ0FBQSxDQUFQLENBQW1DLENBQUMsSUFBcEMsQ0FBeUMsSUFBekMsQ0FOQSxDQUFBO0FBQUEsVUFPQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLG9CQUF6QyxDQVBBLENBQUE7aUJBUUEsTUFBQSxDQUFPLGVBQWUsQ0FBQyxTQUFoQixDQUFBLENBQVAsQ0FBbUMsQ0FBQyxJQUFwQyxDQUF5QyxLQUF6QyxFQVRHO1FBQUEsQ0FBTCxFQVpvQztNQUFBLENBQXRDLENBQUEsQ0FBQTthQXVCQSxFQUFBLENBQUcsMEJBQUgsRUFBK0IsU0FBQSxHQUFBO0FBTzdCLFFBQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsZ0JBQXBCLENBQUEsQ0FBQTtBQUFBLFFBRUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLGNBQS9CLENBQVAsQ0FBc0QsQ0FBQyxHQUFHLENBQUMsT0FBM0QsQ0FBQSxDQUZBLENBQUE7QUFBQSxRQU1BLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsb0JBQXpDLENBTkEsQ0FBQTtBQUFBLFFBUUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7aUJBQ2Qsa0JBRGM7UUFBQSxDQUFoQixDQVJBLENBQUE7ZUFXQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBRUgsY0FBQSxpQkFBQTtBQUFBLFVBQUEsaUJBQUEsR0FBb0IsZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsY0FBL0IsQ0FBcEIsQ0FBQTtBQUFBLFVBQ0EsTUFBQSxDQUFPLGlCQUFQLENBQXlCLENBQUMsV0FBMUIsQ0FBQSxDQURBLENBQUE7QUFBQSxVQUVBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsb0JBQXpDLENBRkEsQ0FBQTtpQkFHQSxNQUFBLENBQU8saUJBQVAsQ0FBeUIsQ0FBQyxHQUFHLENBQUMsV0FBOUIsQ0FBQSxFQUxHO1FBQUEsQ0FBTCxFQWxCNkI7TUFBQSxDQUEvQixFQXhCeUQ7SUFBQSxDQUEzRCxFQVBxQjtFQUFBLENBQXZCLENBUEEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/benfallon/.atom/packages/pp-markdown/spec/pp-markdown-spec.coffee

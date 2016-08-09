(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  atom.workspaceView.command('my:comment-jsx', function() {
    var cursor, editor, text;
    editor = atom.workspaceView.getActiveView().getEditor();
    if (!(editor.selections.length && editor.cursors.length)) {
      return;
    }
    cursor = editor.cursors[0];
    if (__indexOf.call(cursor.getScopes(), 'source.js.jsx') < 0) {
      return;
    }
    text = editor.selections[0].getText();
    return editor.insertText("{/*" + text + "*/}");
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9pbml0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQWFBO0FBQUEsTUFBQSxxSkFBQTs7QUFBQSxFQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsZ0JBQTNCLEVBQTZDLFNBQUEsR0FBQTtBQUMzQyxRQUFBLG9CQUFBO0FBQUEsSUFBQSxNQUFBLEdBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFuQixDQUFBLENBQWtDLENBQUMsU0FBbkMsQ0FBQSxDQUFSLENBQUE7QUFDQSxJQUFBLElBQUEsQ0FBQSxDQUFjLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBbEIsSUFBNkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUExRCxDQUFBO0FBQUEsWUFBQSxDQUFBO0tBREE7QUFBQSxJQUVBLE1BQUEsR0FBUSxNQUFNLENBQUMsT0FBUSxDQUFBLENBQUEsQ0FGdkIsQ0FBQTtBQUdBLElBQUEsSUFBYyxlQUFtQixNQUFNLENBQUMsU0FBUCxDQUFBLENBQW5CLEVBQUEsZUFBQSxLQUFkO0FBQUEsWUFBQSxDQUFBO0tBSEE7QUFBQSxJQUlBLElBQUEsR0FBTSxNQUFNLENBQUMsVUFBVyxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQXJCLENBQUEsQ0FKTixDQUFBO1dBS0EsTUFBTSxDQUFDLFVBQVAsQ0FBb0IsS0FBQSxHQUFyQixJQUFxQixHQUFZLEtBQWhDLEVBTjJDO0VBQUEsQ0FBN0MsQ0FBQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/benfallon/.atom/init.coffee

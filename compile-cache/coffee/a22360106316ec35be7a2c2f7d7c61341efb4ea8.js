(function() {
  atom.commands.add('atom-workspace', 'comment-jsx', function() {
    var selection, _i, _len, _ref;
    atom.config.set('editor.commentStart', '{/*', {
      scopeSelector: '.source.js.jsx'
    });
    atom.config.set('editor.commentEnd', '*/}', {
      scopeSelector: '.source.js.jsx'
    });
    _ref = atom.workspace.getActiveTextEditor().selections;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      selection = _ref[_i];
      selection.toggleLineComments();
    }
    atom.config.unset('editor.commentStart', {
      scopeSelector: '.source.js.jsx'
    });
    return atom.config.unset('editor.commentEnd', {
      scopeSelector: '.source.js.jsx'
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9pbml0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQVlBO0FBQUEsRUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQW9DLGFBQXBDLEVBQW1ELFNBQUEsR0FBQTtBQUNqRCxRQUFBLHlCQUFBO0FBQUEsSUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IscUJBQWhCLEVBQXVDLEtBQXZDLEVBQThDO0FBQUEsTUFBQyxhQUFBLEVBQWUsZ0JBQWhCO0tBQTlDLENBQUEsQ0FBQTtBQUFBLElBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLG1CQUFoQixFQUFxQyxLQUFyQyxFQUE0QztBQUFBLE1BQUMsYUFBQSxFQUFlLGdCQUFoQjtLQUE1QyxDQURBLENBQUE7QUFFQTtBQUFBLFNBQUEsMkNBQUE7MkJBQUE7QUFDRSxNQUFBLFNBQVMsQ0FBQyxrQkFBVixDQUFBLENBQUEsQ0FERjtBQUFBLEtBRkE7QUFBQSxJQUlBLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBWixDQUFrQixxQkFBbEIsRUFBeUM7QUFBQSxNQUFDLGFBQUEsRUFBZSxnQkFBaEI7S0FBekMsQ0FKQSxDQUFBO1dBS0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFaLENBQWtCLG1CQUFsQixFQUF1QztBQUFBLE1BQUMsYUFBQSxFQUFlLGdCQUFoQjtLQUF2QyxFQU5pRDtFQUFBLENBQW5ELENBQUEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/benfallon/.atom/init.coffee

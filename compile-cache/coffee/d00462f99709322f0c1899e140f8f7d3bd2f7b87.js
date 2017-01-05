(function() {
  var Navigator;

  Navigator = (function() {
    function Navigator(separatorMarker) {
      var ref;
      this.separatorMarker = separatorMarker;
      ref = [null, null, null], this.conflict = ref[0], this.previous = ref[1], this.next = ref[2];
    }

    Navigator.prototype.linkToPrevious = function(c) {
      this.previous = c;
      if (c != null) {
        return c.navigator.next = this.conflict;
      }
    };

    Navigator.prototype.nextUnresolved = function() {
      var current;
      current = this.next;
      while ((current != null) && current.isResolved()) {
        current = current.navigator.next;
      }
      return current;
    };

    Navigator.prototype.previousUnresolved = function() {
      var current;
      current = this.previous;
      while ((current != null) && current.isResolved()) {
        current = current.navigator.previous;
      }
      return current;
    };

    Navigator.prototype.markers = function() {
      return [this.separatorMarker];
    };

    return Navigator;

  })();

  module.exports = {
    Navigator: Navigator
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9tZXJnZS1jb25mbGljdHMvbGliL25hdmlnYXRvci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFNO0lBRVMsbUJBQUMsZUFBRDtBQUNYLFVBQUE7TUFEWSxJQUFDLENBQUEsa0JBQUQ7TUFDWixNQUFnQyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixDQUFoQyxFQUFDLElBQUMsQ0FBQSxpQkFBRixFQUFZLElBQUMsQ0FBQSxpQkFBYixFQUF1QixJQUFDLENBQUE7SUFEYjs7d0JBR2IsY0FBQSxHQUFnQixTQUFDLENBQUQ7TUFDZCxJQUFDLENBQUEsUUFBRCxHQUFZO01BQ1osSUFBZ0MsU0FBaEM7ZUFBQSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQVosR0FBbUIsSUFBQyxDQUFBLFNBQXBCOztJQUZjOzt3QkFJaEIsY0FBQSxHQUFnQixTQUFBO0FBQ2QsVUFBQTtNQUFBLE9BQUEsR0FBVSxJQUFDLENBQUE7QUFDWCxhQUFNLGlCQUFBLElBQWEsT0FBTyxDQUFDLFVBQVIsQ0FBQSxDQUFuQjtRQUNFLE9BQUEsR0FBVSxPQUFPLENBQUMsU0FBUyxDQUFDO01BRDlCO2FBRUE7SUFKYzs7d0JBTWhCLGtCQUFBLEdBQW9CLFNBQUE7QUFDbEIsVUFBQTtNQUFBLE9BQUEsR0FBVSxJQUFDLENBQUE7QUFDWCxhQUFNLGlCQUFBLElBQWEsT0FBTyxDQUFDLFVBQVIsQ0FBQSxDQUFuQjtRQUNFLE9BQUEsR0FBVSxPQUFPLENBQUMsU0FBUyxDQUFDO01BRDlCO2FBRUE7SUFKa0I7O3dCQU1wQixPQUFBLEdBQVMsU0FBQTthQUFHLENBQUMsSUFBQyxDQUFBLGVBQUY7SUFBSDs7Ozs7O0VBRVgsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLFNBQUEsRUFBVyxTQUFYOztBQXhCRiIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE5hdmlnYXRvclxuXG4gIGNvbnN0cnVjdG9yOiAoQHNlcGFyYXRvck1hcmtlcikgLT5cbiAgICBbQGNvbmZsaWN0LCBAcHJldmlvdXMsIEBuZXh0XSA9IFtudWxsLCBudWxsLCBudWxsXVxuXG4gIGxpbmtUb1ByZXZpb3VzOiAoYykgLT5cbiAgICBAcHJldmlvdXMgPSBjXG4gICAgYy5uYXZpZ2F0b3IubmV4dCA9IEBjb25mbGljdCBpZiBjP1xuXG4gIG5leHRVbnJlc29sdmVkOiAtPlxuICAgIGN1cnJlbnQgPSBAbmV4dFxuICAgIHdoaWxlIGN1cnJlbnQ/IGFuZCBjdXJyZW50LmlzUmVzb2x2ZWQoKVxuICAgICAgY3VycmVudCA9IGN1cnJlbnQubmF2aWdhdG9yLm5leHRcbiAgICBjdXJyZW50XG5cbiAgcHJldmlvdXNVbnJlc29sdmVkOiAtPlxuICAgIGN1cnJlbnQgPSBAcHJldmlvdXNcbiAgICB3aGlsZSBjdXJyZW50PyBhbmQgY3VycmVudC5pc1Jlc29sdmVkKClcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5hdmlnYXRvci5wcmV2aW91c1xuICAgIGN1cnJlbnRcblxuICBtYXJrZXJzOiAtPiBbQHNlcGFyYXRvck1hcmtlcl1cblxubW9kdWxlLmV4cG9ydHMgPVxuICBOYXZpZ2F0b3I6IE5hdmlnYXRvclxuIl19

(function() {
  var Greet, Home,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Greet = (function(_super) {
    __extends(Greet, _super);

    function Greet($log) {
      this.sayHello = function(name) {
        return $log.info("Hello " + name + "!");
      };
    }

    return Greet;

  })(Service);

  Home = (function(_super) {
    __extends(Home, _super);

    function Home(greetService) {
      greetService.sayHello('Luke Skywalker');
    }

    return Home;

  })(Controller);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9wcmV2aWV3L3NwZWMvc2FtcGxlcy9uZy1jbGFzc2lmeS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsV0FBQTtJQUFBO21TQUFBOztBQUFBLEVBQU07QUFDSiw0QkFBQSxDQUFBOztBQUFhLElBQUEsZUFBQyxJQUFELEdBQUE7QUFDWCxNQUFBLElBQUMsQ0FBQSxRQUFELEdBQVksU0FBQyxJQUFELEdBQUE7ZUFDVixJQUFJLENBQUMsSUFBTCxDQUFXLFFBQUEsR0FBUSxJQUFSLEdBQWEsR0FBeEIsRUFEVTtNQUFBLENBQVosQ0FEVztJQUFBLENBQWI7O2lCQUFBOztLQURrQixRQUFwQixDQUFBOztBQUFBLEVBS007QUFDSiwyQkFBQSxDQUFBOztBQUFhLElBQUEsY0FBQyxZQUFELEdBQUE7QUFDWCxNQUFBLFlBQVksQ0FBQyxRQUFiLENBQXNCLGdCQUF0QixDQUFBLENBRFc7SUFBQSxDQUFiOztnQkFBQTs7S0FEaUIsV0FMbkIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/benfallon/.atom/packages/preview/spec/samples/ng-classify.coffee

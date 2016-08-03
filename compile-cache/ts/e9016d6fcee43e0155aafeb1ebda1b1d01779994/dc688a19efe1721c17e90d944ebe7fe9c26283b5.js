var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Animal = (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.move = function (meters) {
        alert(this.name + " moved " + meters + "m.");
    };
    return Animal;
})();
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        _super.call(this, name);
    }
    Snake.prototype.move = function () {
        alert("Slithering...");
        _super.prototype.move.call(this, 5);
    };
    return Snake;
})(Animal);
var Horse = (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        _super.call(this, name);
    }
    Horse.prototype.move = function () {
        alert("Galloping...");
        _super.prototype.move.call(this, 45);
    };
    return Horse;
})(Animal);
var sam = new Snake("Sammy the Python");
var tom = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9wcmV2aWV3L3NwZWMvc2FtcGxlcy9zaW1wbGVfaW5oZXJpdGFuY2UudHMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5mYWxsb24vLmF0b20vcGFja2FnZXMvcHJldmlldy9zcGVjL3NhbXBsZXMvc2ltcGxlX2luaGVyaXRhbmNlLnRzIl0sIm5hbWVzIjpbIkFuaW1hbCIsIkFuaW1hbC5jb25zdHJ1Y3RvciIsIkFuaW1hbC5tb3ZlIiwiU25ha2UiLCJTbmFrZS5jb25zdHJ1Y3RvciIsIlNuYWtlLm1vdmUiLCJIb3JzZSIsIkhvcnNlLmNvbnN0cnVjdG9yIiwiSG9yc2UubW92ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTSxNQUFNO0lBQ1JBLFNBREVBLE1BQU1BLENBQ1dBLElBQVlBO1FBQVpDLFNBQUlBLEdBQUpBLElBQUlBLENBQVFBO0lBQUlBLENBQUNBO0lBQ3BDRCxxQkFBSUEsR0FBSkEsVUFBS0EsTUFBY0E7UUFDZkUsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsU0FBU0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDakRBLENBQUNBO0lBQ0xGLGFBQUNBO0FBQURBLENBQUNBLEFBTEQsSUFLQztBQUVELElBQU0sS0FBSztJQUFTRyxVQUFkQSxLQUFLQSxVQUFlQTtJQUN0QkEsU0FERUEsS0FBS0EsQ0FDS0EsSUFBWUE7UUFBSUMsa0JBQU1BLElBQUlBLENBQUNBLENBQUNBO0lBQUNBLENBQUNBO0lBQzFDRCxvQkFBSUEsR0FBSkE7UUFDSUUsS0FBS0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7UUFDdkJBLGdCQUFLQSxDQUFDQSxJQUFJQSxZQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNsQkEsQ0FBQ0E7SUFDTEYsWUFBQ0E7QUFBREEsQ0FBQ0EsQUFORCxFQUFvQixNQUFNLEVBTXpCO0FBRUQsSUFBTSxLQUFLO0lBQVNHLFVBQWRBLEtBQUtBLFVBQWVBO0lBQ3RCQSxTQURFQSxLQUFLQSxDQUNLQSxJQUFZQTtRQUFJQyxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFBQ0EsQ0FBQ0E7SUFDMUNELG9CQUFJQSxHQUFKQTtRQUNJRSxLQUFLQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQTtRQUN0QkEsZ0JBQUtBLENBQUNBLElBQUlBLFlBQUNBLEVBQUVBLENBQUNBLENBQUNBO0lBQ25CQSxDQUFDQTtJQUNMRixZQUFDQTtBQUFEQSxDQUFDQSxBQU5ELEVBQW9CLE1BQU0sRUFNekI7QUFFRCxJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3hDLElBQUksR0FBRyxHQUFXLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFbEQsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFuaW1hbCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykgeyB9XG4gICAgbW92ZShtZXRlcnM6IG51bWJlcikge1xuICAgICAgICBhbGVydCh0aGlzLm5hbWUgKyBcIiBtb3ZlZCBcIiArIG1ldGVycyArIFwibS5cIik7XG4gICAgfVxufVxuXG5jbGFzcyBTbmFrZSBleHRlbmRzIEFuaW1hbCB7XG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7IHN1cGVyKG5hbWUpOyB9XG4gICAgbW92ZSgpIHtcbiAgICAgICAgYWxlcnQoXCJTbGl0aGVyaW5nLi4uXCIpO1xuICAgICAgICBzdXBlci5tb3ZlKDUpO1xuICAgIH1cbn1cblxuY2xhc3MgSG9yc2UgZXh0ZW5kcyBBbmltYWwge1xuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykgeyBzdXBlcihuYW1lKTsgfVxuICAgIG1vdmUoKSB7XG4gICAgICAgIGFsZXJ0KFwiR2FsbG9waW5nLi4uXCIpO1xuICAgICAgICBzdXBlci5tb3ZlKDQ1KTtcbiAgICB9XG59XG5cbnZhciBzYW0gPSBuZXcgU25ha2UoXCJTYW1teSB0aGUgUHl0aG9uXCIpO1xudmFyIHRvbTogQW5pbWFsID0gbmV3IEhvcnNlKFwiVG9tbXkgdGhlIFBhbG9taW5vXCIpO1xuXG5zYW0ubW92ZSgpO1xudG9tLm1vdmUoMzQpO1xuIl19
//# sourceURL=/Users/benfallon/.atom/packages/preview/spec/samples/simple_inheritance.ts

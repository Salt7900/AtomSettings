(function() {
  var Point, RowMap;

  Point = require('atom').Point;

  RowMap = (function() {
    function RowMap(regions) {
      this.regions = regions;
    }

    RowMap.prototype.firstScreenRowForBufferRow = function(row) {
      var bufAcc, diff, reg, scrAcc, _i, _len, _ref;
      bufAcc = -1;
      scrAcc = -1;
      _ref = this.regions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        reg = _ref[_i];
        if (reg.bufferRows === 1 || reg.screenRows === 1) {
          bufAcc += reg.bufferRows;
          scrAcc += reg.screenRows;
          if (row <= bufAcc) {
            break;
          }
          continue;
        }
        if (reg.bufferRows === reg.screenRows) {
          if (row <= bufAcc + reg.bufferRows) {
            diff = row - bufAcc;
            bufAcc += diff;
            scrAcc += diff;
            break;
          }
          bufAcc += reg.bufferRows;
          scrAcc += reg.screenRows;
          continue;
        }
        throw "illegal state";
      }
      return scrAcc;
    };

    return RowMap;

  })();

  module.exports = RowMap;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9pbmRlbnQtZ3VpZGUtaW1wcm92ZWQvbGliL3Jvdy1tYXAuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGFBQUE7O0FBQUEsRUFBQyxRQUFTLE9BQUEsQ0FBUSxNQUFSLEVBQVQsS0FBRCxDQUFBOztBQUFBLEVBRU07QUFDUyxJQUFBLGdCQUFDLE9BQUQsR0FBQTtBQUNYLE1BQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxPQUFYLENBRFc7SUFBQSxDQUFiOztBQUFBLHFCQUdBLDBCQUFBLEdBQTRCLFNBQUMsR0FBRCxHQUFBO0FBQzFCLFVBQUEseUNBQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxDQUFBLENBQVQsQ0FBQTtBQUFBLE1BQ0EsTUFBQSxHQUFTLENBQUEsQ0FEVCxDQUFBO0FBRUE7QUFBQSxXQUFBLDJDQUFBO3VCQUFBO0FBQ0UsUUFBQSxJQUFHLEdBQUcsQ0FBQyxVQUFKLEtBQWtCLENBQWxCLElBQXVCLEdBQUcsQ0FBQyxVQUFKLEtBQWtCLENBQTVDO0FBQ0UsVUFBQSxNQUFBLElBQVUsR0FBRyxDQUFDLFVBQWQsQ0FBQTtBQUFBLFVBQ0EsTUFBQSxJQUFVLEdBQUcsQ0FBQyxVQURkLENBQUE7QUFFQSxVQUFBLElBQUcsR0FBQSxJQUFPLE1BQVY7QUFDRSxrQkFERjtXQUZBO0FBSUEsbUJBTEY7U0FBQTtBQU1BLFFBQUEsSUFBRyxHQUFHLENBQUMsVUFBSixLQUFrQixHQUFHLENBQUMsVUFBekI7QUFDRSxVQUFBLElBQUcsR0FBQSxJQUFPLE1BQUEsR0FBUyxHQUFHLENBQUMsVUFBdkI7QUFDRSxZQUFBLElBQUEsR0FBTyxHQUFBLEdBQU0sTUFBYixDQUFBO0FBQUEsWUFDQSxNQUFBLElBQVUsSUFEVixDQUFBO0FBQUEsWUFFQSxNQUFBLElBQVUsSUFGVixDQUFBO0FBR0Esa0JBSkY7V0FBQTtBQUFBLFVBS0EsTUFBQSxJQUFVLEdBQUcsQ0FBQyxVQUxkLENBQUE7QUFBQSxVQU1BLE1BQUEsSUFBVSxHQUFHLENBQUMsVUFOZCxDQUFBO0FBT0EsbUJBUkY7U0FOQTtBQWVBLGNBQU0sZUFBTixDQWhCRjtBQUFBLE9BRkE7YUFvQkEsT0FyQjBCO0lBQUEsQ0FINUIsQ0FBQTs7a0JBQUE7O01BSEYsQ0FBQTs7QUFBQSxFQTZCQSxNQUFNLENBQUMsT0FBUCxHQUFpQixNQTdCakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/benfallon/.atom/packages/indent-guide-improved/lib/row-map.coffee

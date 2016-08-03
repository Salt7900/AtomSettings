(function() {
  var RowMap, its;

  RowMap = require('../lib/row-map');

  its = function(f) {
    return it(f.toString(), f);
  };

  describe("RowMap", function() {
    var rowMap, setRowMap;
    rowMap = null;
    setRowMap = function() {
      return rowMap = new RowMap(Array.prototype.slice.call(arguments).map(function(item) {
        return {
          bufferRows: item[0],
          screenRows: item[1]
        };
      }));
    };
    return describe("firstBufferRowForBufferRow", function() {
      return describe("simplest", function() {
        beforeEach(function() {
          return setRowMap([3, 3], [1, 3], [3, 1], [2, 2]);
        });
        its(function() {
          return expect(rowMap.firstScreenRowForBufferRow(0)).toBe(0);
        });
        its(function() {
          return expect(rowMap.firstScreenRowForBufferRow(1)).toBe(1);
        });
        its(function() {
          return expect(rowMap.firstScreenRowForBufferRow(2)).toBe(2);
        });
        its(function() {
          return expect(rowMap.firstScreenRowForBufferRow(3)).toBe(5);
        });
        its(function() {
          return expect(rowMap.firstScreenRowForBufferRow(4)).toBe(6);
        });
        its(function() {
          return expect(rowMap.firstScreenRowForBufferRow(5)).toBe(6);
        });
        its(function() {
          return expect(rowMap.firstScreenRowForBufferRow(6)).toBe(6);
        });
        its(function() {
          return expect(rowMap.firstScreenRowForBufferRow(7)).toBe(7);
        });
        its(function() {
          return expect(rowMap.firstScreenRowForBufferRow(8)).toBe(8);
        });
        its(function() {
          return expect(rowMap.firstScreenRowForBufferRow(9)).toBe(8);
        });
        return its(function() {
          return expect(rowMap.firstScreenRowForBufferRow(10)).toBe(8);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9pbmRlbnQtZ3VpZGUtaW1wcm92ZWQvc3BlYy9yb3ctbWFwLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLGdCQUFSLENBQVQsQ0FBQTs7QUFBQSxFQUVBLEdBQUEsR0FBTSxTQUFDLENBQUQsR0FBQTtXQUNKLEVBQUEsQ0FBRyxDQUFDLENBQUMsUUFBRixDQUFBLENBQUgsRUFBaUIsQ0FBakIsRUFESTtFQUFBLENBRk4sQ0FBQTs7QUFBQSxFQUtBLFFBQUEsQ0FBUyxRQUFULEVBQW1CLFNBQUEsR0FBQTtBQUNqQixRQUFBLGlCQUFBO0FBQUEsSUFBQSxNQUFBLEdBQVMsSUFBVCxDQUFBO0FBQUEsSUFDQSxTQUFBLEdBQVksU0FBQSxHQUFBO2FBQ1YsTUFBQSxHQUFhLElBQUEsTUFBQSxDQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQXRCLENBQTJCLFNBQTNCLENBQXFDLENBQUMsR0FBdEMsQ0FBMEMsU0FBQyxJQUFELEdBQUE7ZUFDNUQ7QUFBQSxVQUFBLFVBQUEsRUFBWSxJQUFLLENBQUEsQ0FBQSxDQUFqQjtBQUFBLFVBQ0EsVUFBQSxFQUFZLElBQUssQ0FBQSxDQUFBLENBRGpCO1VBRDREO01BQUEsQ0FBMUMsQ0FBUCxFQURIO0lBQUEsQ0FEWixDQUFBO1dBTUEsUUFBQSxDQUFTLDRCQUFULEVBQXVDLFNBQUEsR0FBQTthQUNyQyxRQUFBLENBQVMsVUFBVCxFQUFxQixTQUFBLEdBQUE7QUFDbkIsUUFBQSxVQUFBLENBQVcsU0FBQSxHQUFBO2lCQUNULFNBQUEsQ0FBVSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQVYsRUFBa0IsQ0FBQyxDQUFELEVBQUksQ0FBSixD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

//# sourceURL=/Users/benfallon/.atom/packages/indent-guide-improved/spec/row-map-spec.coffee
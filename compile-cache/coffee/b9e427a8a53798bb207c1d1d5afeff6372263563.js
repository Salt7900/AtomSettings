(function() {
  var Point, fits, getGuides, gs, its, statesAboveVisible, statesBelowVisible, toGuides, uniq;

  gs = require('../lib/guides');

  toGuides = gs.toGuides, uniq = gs.uniq, statesAboveVisible = gs.statesAboveVisible, statesBelowVisible = gs.statesBelowVisible, getGuides = gs.getGuides;

  Point = require('atom').Point;

  its = function(f) {
    return it(f.toString(), f);
  };

  fits = function(f) {
    return fit(f.toString(), f);
  };

  describe("toGuides", function() {
    var guides;
    guides = null;
    describe("step-by-step indent", function() {
      beforeEach(function() {
        return guides = toGuides([0, 1, 2, 2, 1, 2, 1, 0], []);
      });
      its(function() {
        return expect(guides.length).toBe(3);
      });
      its(function() {
        return expect(guides[0].length).toBe(6);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(1, 0));
      });
      its(function() {
        return expect(guides[1].length).toBe(2);
      });
      its(function() {
        return expect(guides[1].point).toEqual(new Point(2, 1));
      });
      its(function() {
        return expect(guides[2].length).toBe(1);
      });
      return its(function() {
        return expect(guides[2].point).toEqual(new Point(5, 1));
      });
    });
    describe("steep indent", function() {
      beforeEach(function() {
        return guides = toGuides([0, 3, 2, 1, 0], []);
      });
      its(function() {
        return expect(guides.length).toBe(3);
      });
      its(function() {
        return expect(guides[0].length).toBe(3);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(1, 0));
      });
      its(function() {
        return expect(guides[1].length).toBe(2);
      });
      its(function() {
        return expect(guides[1].point).toEqual(new Point(1, 1));
      });
      its(function() {
        return expect(guides[2].length).toBe(1);
      });
      return its(function() {
        return expect(guides[2].point).toEqual(new Point(1, 2));
      });
    });
    describe("steep dedent", function() {
      guides = null;
      beforeEach(function() {
        return guides = toGuides([0, 1, 2, 3, 0], []);
      });
      its(function() {
        return expect(guides.length).toBe(3);
      });
      its(function() {
        return expect(guides[0].length).toBe(3);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(1, 0));
      });
      its(function() {
        return expect(guides[1].length).toBe(2);
      });
      its(function() {
        return expect(guides[1].point).toEqual(new Point(2, 1));
      });
      its(function() {
        return expect(guides[2].length).toBe(1);
      });
      return its(function() {
        return expect(guides[2].point).toEqual(new Point(3, 2));
      });
    });
    describe("recurring indent", function() {
      guides = null;
      beforeEach(function() {
        return guides = toGuides([0, 1, 1, 0, 1, 0], []);
      });
      its(function() {
        return expect(guides.length).toBe(2);
      });
      its(function() {
        return expect(guides[0].length).toBe(2);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(1, 0));
      });
      its(function() {
        return expect(guides[1].length).toBe(1);
      });
      return its(function() {
        return expect(guides[1].point).toEqual(new Point(4, 0));
      });
    });
    describe("no indent", function() {
      guides = null;
      beforeEach(function() {
        return guides = toGuides([0, 0, 0], []);
      });
      return its(function() {
        return expect(guides.length).toBe(0);
      });
    });
    describe("same indent", function() {
      guides = null;
      beforeEach(function() {
        return guides = toGuides([1, 1, 1], []);
      });
      its(function() {
        return expect(guides.length).toBe(1);
      });
      its(function() {
        return expect(guides[0].length).toBe(3);
      });
      return its(function() {
        return expect(guides[0].point).toEqual(new Point(0, 0));
      });
    });
    describe("stack and active", function() {
      describe("simple", function() {
        beforeEach(function() {
          return guides = toGuides([1, 2, 2, 1, 2, 1, 0], [2]);
        });
        its(function() {
          return expect(guides[0].stack).toBe(true);
        });
        its(function() {
          return expect(guides[0].active).toBe(false);
        });
        its(function() {
          return expect(guides[1].stack).toBe(true);
        });
        its(function() {
          return expect(guides[1].active).toBe(true);
        });
        its(function() {
          return expect(guides[2].stack).toBe(false);
        });
        return its(function() {
          return expect(guides[2].active).toBe(false);
        });
      });
      describe("cursor not on deepest", function() {
        beforeEach(function() {
          return guides = toGuides([1, 2, 1], [0]);
        });
        its(function() {
          return expect(guides[0].stack).toBe(true);
        });
        its(function() {
          return expect(guides[0].active).toBe(true);
        });
        its(function() {
          return expect(guides[1].stack).toBe(false);
        });
        return its(function() {
          return expect(guides[1].active).toBe(false);
        });
      });
      describe("no cursor", function() {
        beforeEach(function() {
          return guides = toGuides([1, 2, 1], []);
        });
        its(function() {
          return expect(guides[0].stack).toBe(false);
        });
        its(function() {
          return expect(guides[0].active).toBe(false);
        });
        its(function() {
          return expect(guides[1].stack).toBe(false);
        });
        return its(function() {
          return expect(guides[1].active).toBe(false);
        });
      });
      return describe("multiple cursors", function() {
        beforeEach(function() {
          return guides = toGuides([1, 2, 1, 2, 0, 1], [1, 2]);
        });
        its(function() {
          return expect(guides[0].stack).toBe(true);
        });
        its(function() {
          return expect(guides[0].active).toBe(true);
        });
        its(function() {
          return expect(guides[1].stack).toBe(true);
        });
        its(function() {
          return expect(guides[1].active).toBe(true);
        });
        its(function() {
          return expect(guides[2].stack).toBe(false);
        });
        its(function() {
          return expect(guides[2].active).toBe(false);
        });
        its(function() {
          return expect(guides[3].stack).toBe(false);
        });
        return its(function() {
          return expect(guides[3].active).toBe(false);
        });
      });
    });
    describe("empty lines", function() {
      describe("between the same indents", function() {
        beforeEach(function() {
          return guides = toGuides([1, null, 1], []);
        });
        its(function() {
          return expect(guides.length).toBe(1);
        });
        its(function() {
          return expect(guides[0].length).toBe(3);
        });
        return its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
      });
      describe("starts with a null", function() {
        beforeEach(function() {
          return guides = toGuides([null, 1], []);
        });
        its(function() {
          return expect(guides.length).toBe(1);
        });
        its(function() {
          return expect(guides[0].length).toBe(2);
        });
        return its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
      });
      describe("starts with nulls", function() {
        beforeEach(function() {
          return guides = toGuides([null, null, 1], []);
        });
        its(function() {
          return expect(guides.length).toBe(1);
        });
        its(function() {
          return expect(guides[0].length).toBe(3);
        });
        return its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
      });
      describe("ends with a null", function() {
        beforeEach(function() {
          return guides = toGuides([1, null], []);
        });
        its(function() {
          return expect(guides.length).toBe(1);
        });
        its(function() {
          return expect(guides[0].length).toBe(1);
        });
        return its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
      });
      describe("ends with nulls", function() {
        beforeEach(function() {
          return guides = toGuides([1, null, null], []);
        });
        its(function() {
          return expect(guides.length).toBe(1);
        });
        its(function() {
          return expect(guides[0].length).toBe(1);
        });
        return its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
      });
      describe("large to small", function() {
        beforeEach(function() {
          return guides = toGuides([2, null, 1], []);
        });
        its(function() {
          return expect(guides.length).toBe(2);
        });
        its(function() {
          return expect(guides[0].length).toBe(3);
        });
        its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
        its(function() {
          return expect(guides[1].length).toBe(1);
        });
        return its(function() {
          return expect(guides[1].point).toEqual(new Point(0, 1));
        });
      });
      describe("small to large", function() {
        beforeEach(function() {
          return guides = toGuides([1, null, 2], []);
        });
        its(function() {
          return expect(guides.length).toBe(2);
        });
        its(function() {
          return expect(guides[0].length).toBe(3);
        });
        its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
        its(function() {
          return expect(guides[1].length).toBe(2);
        });
        return its(function() {
          return expect(guides[1].point).toEqual(new Point(1, 1));
        });
      });
      return describe("continuous", function() {
        beforeEach(function() {
          return guides = toGuides([1, null, null, 1], []);
        });
        its(function() {
          return expect(guides.length).toBe(1);
        });
        its(function() {
          return expect(guides[0].length).toBe(4);
        });
        return its(function() {
          return expect(guides[0].point).toEqual(new Point(0, 0));
        });
      });
    });
    return describe("incomplete indent", function() {
      guides = null;
      beforeEach(function() {
        return guides = toGuides([1, 1.5, 1], []);
      });
      its(function() {
        return expect(guides.length).toBe(1);
      });
      its(function() {
        return expect(guides[0].length).toBe(3);
      });
      return its(function() {
        return expect(guides[0].point).toEqual(new Point(0, 0));
      });
    });
  });

  describe("uniq", function() {
    its(function() {
      return expect(uniq([1, 1, 1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
    });
    its(function() {
      return expect(uniq([1, 1, 2])).toEqual([1, 2]);
    });
    its(function() {
      return expect(uniq([1, 2])).toEqual([1, 2]);
    });
    its(function() {
      return expect(uniq([1, 1])).toEqual([1]);
    });
    its(function() {
      return expect(uniq([1])).toEqual([1]);
    });
    return its(function() {
      return expect(uniq([])).toEqual([]);
    });
  });

  describe("statesAboveVisible", function() {
    var getLastRow, getRowIndents, guides, rowIndents, run;
    run = statesAboveVisible;
    guides = null;
    rowIndents = null;
    getRowIndents = function(r) {
      return rowIndents[r];
    };
    getLastRow = function() {
      return rowIndents.length - 1;
    };
    describe("only stack", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 3, 2, 3];
        return guides = run([3], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("active and stack", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 2, 2, 3];
        return guides = run([3], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
    describe("cursor on null row", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, null, 2, 3];
        return guides = run([3], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
    describe("continuous nulls", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, null, null, 3];
        return guides = run([3], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1, 2]);
      });
      return its(function() {
        return expect(guides.active).toEqual([2]);
      });
    });
    describe("no effect", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 0, 1, 3];
        return guides = run([2], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("no rows", function() {
      beforeEach(function() {
        rowIndents = [];
        return guides = run([], -1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("no rows above", function() {
      beforeEach(function() {
        rowIndents = [0];
        return guides = run([], -1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("multiple cursors", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 3, 2, 3];
        return guides = run([2, 3], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
    describe("multiple cursors 2", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 3, 2, 3];
        return guides = run([1, 2], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([0, 1]);
      });
    });
    return describe("multiple cursors on the same level", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 3, 2, 3];
        return guides = run([2, 4], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
  });

  describe("statesBelowVisible", function() {
    var getLastRow, getRowIndents, guides, rowIndents, run;
    run = statesBelowVisible;
    guides = null;
    rowIndents = null;
    getRowIndents = function(r) {
      return rowIndents[r];
    };
    getLastRow = function() {
      return rowIndents.length - 1;
    };
    describe("only stack", function() {
      beforeEach(function() {
        rowIndents = [3, 2, 3, 2, 1, 0];
        return guides = run([2], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("active and stack", function() {
      beforeEach(function() {
        rowIndents = [3, 2, 2, 2, 1, 0];
        return guides = run([2], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
    describe("cursor on null row", function() {
      beforeEach(function() {
        rowIndents = [3, 2, null, 2, 1, 0];
        return guides = run([2], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
    describe("continuous nulls", function() {
      beforeEach(function() {
        rowIndents = [3, null, null, 2];
        return guides = run([1], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
    describe("no effect", function() {
      beforeEach(function() {
        rowIndents = [3, 0, 1, 0];
        return guides = run([3], 4, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("no rows", function() {
      beforeEach(function() {
        rowIndents = [];
        return guides = run([], -1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("no rows below", function() {
      beforeEach(function() {
        rowIndents = [0];
        return guides = run([], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([]);
      });
      return its(function() {
        return expect(guides.active).toEqual([]);
      });
    });
    describe("multiple cursors", function() {
      beforeEach(function() {
        rowIndents = [3, 2, 3, 2, 1, 0];
        return guides = run([2, 3], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
    describe("multiple cursors 2", function() {
      beforeEach(function() {
        rowIndents = [3, 2, 3, 2, 1, 0];
        return guides = run([3, 4], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([0, 1]);
      });
    });
    return describe("multiple cursors on the same level", function() {
      beforeEach(function() {
        rowIndents = [3, 2, 3, 2, 1, 0];
        return guides = run([1, 3], 1, getRowIndents, getLastRow());
      });
      its(function() {
        return expect(guides.stack).toEqual([0, 1]);
      });
      return its(function() {
        return expect(guides.active).toEqual([1]);
      });
    });
  });

  describe("getGuides", function() {
    var getLastRow, getRowIndents, guides, rowIndents, run;
    run = getGuides;
    guides = null;
    rowIndents = null;
    getRowIndents = function(r) {
      return rowIndents[r];
    };
    getLastRow = function() {
      return rowIndents.length - 1;
    };
    describe("typical", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 2, 3, 0, 1, 2, 0, 1, 1, 0];
        return guides = run(3, 9, getLastRow(), [2, 6, 10], getRowIndents);
      });
      its(function() {
        return expect(guides.length).toBe(6);
      });
      its(function() {
        return expect(guides[0].length).toBe(2);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(0, 0));
      });
      its(function() {
        return expect(guides[0].active).toBe(false);
      });
      its(function() {
        return expect(guides[0].stack).toBe(true);
      });
      its(function() {
        return expect(guides[1].length).toBe(2);
      });
      its(function() {
        return expect(guides[1].point).toEqual(new Point(0, 1));
      });
      its(function() {
        return expect(guides[1].active).toBe(true);
      });
      its(function() {
        return expect(guides[1].stack).toBe(true);
      });
      its(function() {
        return expect(guides[2].length).toBe(1);
      });
      its(function() {
        return expect(guides[2].point).toEqual(new Point(1, 2));
      });
      its(function() {
        return expect(guides[2].active).toBe(false);
      });
      its(function() {
        return expect(guides[2].stack).toBe(false);
      });
      its(function() {
        return expect(guides[3].length).toBe(2);
      });
      its(function() {
        return expect(guides[3].point).toEqual(new Point(3, 0));
      });
      its(function() {
        return expect(guides[3].active).toBe(true);
      });
      its(function() {
        return expect(guides[3].stack).toBe(true);
      });
      its(function() {
        return expect(guides[4].length).toBe(1);
      });
      its(function() {
        return expect(guides[4].point).toEqual(new Point(4, 1));
      });
      its(function() {
        return expect(guides[4].active).toBe(false);
      });
      its(function() {
        return expect(guides[4].stack).toBe(false);
      });
      its(function() {
        return expect(guides[5].length).toBe(1);
      });
      its(function() {
        return expect(guides[5].point).toEqual(new Point(6, 0));
      });
      its(function() {
        return expect(guides[5].active).toBe(true);
      });
      return its(function() {
        return expect(guides[5].stack).toBe(true);
      });
    });
    describe("when last line is null", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 2, 2, null, 2, 0];
        return guides = run(3, 5, getLastRow(), [6], getRowIndents);
      });
      its(function() {
        return expect(guides.length).toBe(2);
      });
      its(function() {
        return expect(guides[0].length).toBe(4);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(0, 0));
      });
      its(function() {
        return expect(guides[0].active).toBe(false);
      });
      its(function() {
        return expect(guides[0].stack).toBe(true);
      });
      its(function() {
        return expect(guides[1].length).toBe(4);
      });
      its(function() {
        return expect(guides[1].point).toEqual(new Point(0, 1));
      });
      its(function() {
        return expect(guides[1].active).toBe(true);
      });
      return its(function() {
        return expect(guides[1].stack).toBe(true);
      });
    });
    describe("when last line is null and the following line is also null", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 2, 2, null, null, 2, 0];
        return guides = run(3, 5, getLastRow(), [7], getRowIndents);
      });
      its(function() {
        return expect(guides.length).toBe(2);
      });
      its(function() {
        return expect(guides[0].length).toBe(5);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(0, 0));
      });
      its(function() {
        return expect(guides[0].active).toBe(false);
      });
      its(function() {
        return expect(guides[0].stack).toBe(true);
      });
      its(function() {
        return expect(guides[1].length).toBe(5);
      });
      its(function() {
        return expect(guides[1].point).toEqual(new Point(0, 1));
      });
      its(function() {
        return expect(guides[1].active).toBe(true);
      });
      return its(function() {
        return expect(guides[1].stack).toBe(true);
      });
    });
    return describe("when last line is null and the cursor doesnt follow", function() {
      beforeEach(function() {
        rowIndents = [0, 1, 2, 2, 2, null, null, 2, 1, 0];
        return guides = run(3, 5, getLastRow(), [8], getRowIndents);
      });
      its(function() {
        return expect(guides.length).toBe(2);
      });
      its(function() {
        return expect(guides[0].length).toBe(5);
      });
      its(function() {
        return expect(guides[0].point).toEqual(new Point(0, 0));
      });
      its(function() {
        return expect(guides[0].active).toBe(true);
      });
      its(function() {
        return expect(guides[0].stack).toBe(true);
      });
      its(function() {
        return expect(guides[1].length).toBe(5);
      });
      its(function() {
        return expect(guides[1].point).toEqual(new Point(0, 1));
      });
      its(function() {
        return expect(guides[1].active).toBe(false);
      });
      return its(function() {
        return expect(guides[1].stack).toBe(false);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9pbmRlbnQtZ3VpZGUtaW1wcm92ZWQvc3BlYy9ndWlkZXMtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsdUZBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLGVBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0MsY0FBQSxRQUFELEVBQVcsVUFBQSxJQUFYLEVBQWlCLHdCQUFBLGtCQUFqQixFQUFxQyx3QkFBQSxrQkFBckMsRUFBeUQsZUFBQSxTQUR6RCxDQUFBOztBQUFBLEVBRUMsUUFBUyxPQUFBLENBQVEsTUFBUixFQUFULEtBRkQsQ0FBQTs7QUFBQSxFQUtBLEdBQUEsR0FBTSxTQUFDLENBQUQsR0FBQTtXQUNKLEVBQUEsQ0FBRyxDQUFDLENBQUMsUUFBRixDQUFBLENBQUgsRUFBaUIsQ0FBakIsRUFESTtFQUFBLENBTE4sQ0FBQTs7QUFBQSxFQVFBLElBQUEsR0FBTyxTQUFDLENBQUQsR0FBQTtXQUNMLEdBQUEsQ0FBSSxDQUFDLENBQUMsUUFBRixDQUFBLENBQUosRUFBa0IsQ0FBbEIsRUFESztFQUFBLENBUlAsQ0FBQTs7QUFBQSxFQVdBLFFBQUEsQ0FBUyxVQUFULEVBQXFCLFNBQUEsR0FBQTtBQUNuQixRQUFBLE1BQUE7QUFBQSxJQUFBLE1BQUEsR0FBUyxJQUFULENBQUE7QUFBQSxJQUNBLFFBQUEsQ0FBUyxxQkFBVCxFQUFnQyxTQUFBLEdBQUE7QUFDOUIsTUFBQSxVQUFBLENBQVcsU0FBQSxHQUFBO2VBQ1QsTUFBQSxHQUFTLFFBQUEsQ0FBUyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLENBQVQsRUFBbUMsRUFBbkMs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

//# sourceURL=/Users/benfallon/.atom/packages/indent-guide-improved/spec/guides-spec.coffee

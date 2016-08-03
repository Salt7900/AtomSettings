(function() {
  var Point, fillInNulls, getGuides, getVirtualIndent, mergeCropped, statesAboveVisible, statesBelowVisible, statesInvisible, supportingIndents, toG, toGuides, uniq,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Point = require('atom').Point;

  toG = function(indents, begin, depth, cursorRows) {
    var gs, isActive, isStack, ptr, r, _ref;
    ptr = begin;
    isActive = false;
    isStack = false;
    gs = [];
    while (ptr < indents.length && depth <= indents[ptr]) {
      if (depth < indents[ptr]) {
        r = toG(indents, ptr, depth + 1, cursorRows);
        if ((_ref = r.guides[0]) != null ? _ref.stack : void 0) {
          isStack = true;
        }
        Array.prototype.push.apply(gs, r.guides);
        ptr = r.ptr;
      } else {
        if (__indexOf.call(cursorRows, ptr) >= 0) {
          isActive = true;
          isStack = true;
        }
        ptr++;
      }
    }
    if (depth !== 0) {
      gs.unshift({
        length: ptr - begin,
        point: new Point(begin, depth - 1),
        active: isActive,
        stack: isStack
      });
    }
    return {
      guides: gs,
      ptr: ptr
    };
  };

  fillInNulls = function(indents) {
    var res;
    res = indents.reduceRight(function(acc, cur) {
      if (cur === null) {
        acc.r.unshift(acc.i);
        return {
          r: acc.r,
          i: acc.i
        };
      } else {
        acc.r.unshift(cur);
        return {
          r: acc.r,
          i: cur
        };
      }
    }, {
      r: [],
      i: 0
    });
    return res.r;
  };

  toGuides = function(indents, cursorRows) {
    var ind;
    ind = fillInNulls(indents.map(function(i) {
      if (i === null) {
        return null;
      } else {
        return Math.floor(i);
      }
    }));
    return toG(ind, 0, 0, cursorRows).guides;
  };

  getVirtualIndent = function(getIndentFn, row, lastRow) {
    var i, ind, _i;
    for (i = _i = row; row <= lastRow ? _i <= lastRow : _i >= lastRow; i = row <= lastRow ? ++_i : --_i) {
      ind = getIndentFn(i);
      if (ind != null) {
        return ind;
      }
    }
    return 0;
  };

  uniq = function(values) {
    var last, newVals, v, _i, _len;
    newVals = [];
    last = null;
    for (_i = 0, _len = values.length; _i < _len; _i++) {
      v = values[_i];
      if (newVals.length === 0 || last !== v) {
        newVals.push(v);
      }
      last = v;
    }
    return newVals;
  };

  mergeCropped = function(guides, above, below, height) {
    guides.forEach(function(g) {
      var _ref, _ref1, _ref2, _ref3;
      if (g.point.row === 0) {
        if (_ref = g.point.column, __indexOf.call(above.active, _ref) >= 0) {
          g.active = true;
        }
        if (_ref1 = g.point.column, __indexOf.call(above.stack, _ref1) >= 0) {
          g.stack = true;
        }
      }
      if (height < g.point.row + g.length) {
        if (_ref2 = g.point.column, __indexOf.call(below.active, _ref2) >= 0) {
          g.active = true;
        }
        if (_ref3 = g.point.column, __indexOf.call(below.stack, _ref3) >= 0) {
          return g.stack = true;
        }
      }
    });
    return guides;
  };

  supportingIndents = function(visibleLast, lastRow, getIndentFn) {
    var count, indent, indents;
    if (getIndentFn(visibleLast) != null) {
      return [];
    }
    indents = [];
    count = visibleLast + 1;
    while (count <= lastRow) {
      indent = getIndentFn(count);
      indents.push(indent);
      if (indent != null) {
        break;
      }
      count++;
    }
    return indents;
  };

  getGuides = function(visibleFrom, visibleTo, lastRow, cursorRows, getIndentFn) {
    var above, below, guides, support, visibleIndents, visibleLast, _i, _results;
    visibleLast = Math.min(visibleTo, lastRow);
    visibleIndents = (function() {
      _results = [];
      for (var _i = visibleFrom; visibleFrom <= visibleLast ? _i <= visibleLast : _i >= visibleLast; visibleFrom <= visibleLast ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this).map(getIndentFn);
    support = supportingIndents(visibleLast, lastRow, getIndentFn);
    guides = toGuides(visibleIndents.concat(support), cursorRows.map(function(c) {
      return c - visibleFrom;
    }));
    above = statesAboveVisible(cursorRows, visibleFrom - 1, getIndentFn, lastRow);
    below = statesBelowVisible(cursorRows, visibleLast + 1, getIndentFn, lastRow);
    return mergeCropped(guides, above, below, visibleLast - visibleFrom);
  };

  statesInvisible = function(cursorRows, start, getIndentFn, lastRow, isAbove) {
    var active, cursors, i, ind, minIndent, stack, vind, _i, _j, _k, _l, _len, _ref, _ref1, _results, _results1, _results2;
    if ((isAbove ? start < 0 : lastRow < start)) {
      return {
        stack: [],
        active: []
      };
    }
    cursors = isAbove ? uniq(cursorRows.filter(function(r) {
      return r <= start;
    }).sort(), true).reverse() : uniq(cursorRows.filter(function(r) {
      return start <= r;
    }).sort(), true);
    active = [];
    stack = [];
    minIndent = Number.MAX_VALUE;
    _ref = (isAbove ? (function() {
      _results = [];
      for (var _j = start; start <= 0 ? _j <= 0 : _j >= 0; start <= 0 ? _j++ : _j--){ _results.push(_j); }
      return _results;
    }).apply(this) : (function() {
      _results1 = [];
      for (var _k = start; start <= lastRow ? _k <= lastRow : _k >= lastRow; start <= lastRow ? _k++ : _k--){ _results1.push(_k); }
      return _results1;
    }).apply(this));
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      ind = getIndentFn(i);
      if (ind != null) {
        minIndent = Math.min(minIndent, ind);
      }
      if (cursors.length === 0 || minIndent === 0) {
        break;
      }
      if (cursors[0] === i) {
        cursors.shift();
        vind = getVirtualIndent(getIndentFn, i, lastRow);
        minIndent = Math.min(minIndent, vind);
        if (vind === minIndent) {
          active.push(vind - 1);
        }
        if (stack.length === 0) {
          stack = (function() {
            _results2 = [];
            for (var _l = 0, _ref1 = minIndent - 1; 0 <= _ref1 ? _l <= _ref1 : _l >= _ref1; 0 <= _ref1 ? _l++ : _l--){ _results2.push(_l); }
            return _results2;
          }).apply(this);
        }
      }
    }
    return {
      stack: uniq(stack.sort()),
      active: uniq(active.sort())
    };
  };

  statesAboveVisible = function(cursorRows, start, getIndentFn, lastRow) {
    return statesInvisible(cursorRows, start, getIndentFn, lastRow, true);
  };

  statesBelowVisible = function(cursorRows, start, getIndentFn, lastRow) {
    return statesInvisible(cursorRows, start, getIndentFn, lastRow, false);
  };

  module.exports = {
    toGuides: toGuides,
    getGuides: getGuides,
    uniq: uniq,
    statesAboveVisible: statesAboveVisible,
    statesBelowVisible: statesBelowVisible
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9pbmRlbnQtZ3VpZGUtaW1wcm92ZWQvbGliL2d1aWRlcy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsOEpBQUE7SUFBQSxxSkFBQTs7QUFBQSxFQUFDLFFBQVMsT0FBQSxDQUFRLE1BQVIsRUFBVCxLQUFELENBQUE7O0FBQUEsRUFFQSxHQUFBLEdBQU0sU0FBQyxPQUFELEVBQVUsS0FBVixFQUFpQixLQUFqQixFQUF3QixVQUF4QixHQUFBO0FBQ0osUUFBQSxtQ0FBQTtBQUFBLElBQUEsR0FBQSxHQUFNLEtBQU4sQ0FBQTtBQUFBLElBQ0EsUUFBQSxHQUFXLEtBRFgsQ0FBQTtBQUFBLElBRUEsT0FBQSxHQUFVLEtBRlYsQ0FBQTtBQUFBLElBSUEsRUFBQSxHQUFLLEVBSkwsQ0FBQTtBQUtBLFdBQU0sR0FBQSxHQUFNLE9BQU8sQ0FBQyxNQUFkLElBQXdCLEtBQUEsSUFBUyxPQUFRLENBQUEsR0FBQSxDQUEvQyxHQUFBO0FBQ0UsTUFBQSxJQUFHLEtBQUEsR0FBUSxPQUFRLENBQUEsR0FBQSxDQUFuQjtBQUNFLFFBQUEsQ0FBQSxHQUFJLEdBQUEsQ0FBSSxPQUFKLEVBQWEsR0FBYixFQUFrQixLQUFBLEdBQVEsQ0FBMUIsRUFBNkIsVUFBN0IsQ0FBSixDQUFBO0FBQ0EsUUFBQSx1Q0FBYyxDQUFFLGNBQWhCO0FBQ0UsVUFBQSxPQUFBLEdBQVUsSUFBVixDQURGO1NBREE7QUFBQSxRQUdBLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQXJCLENBQTJCLEVBQTNCLEVBQStCLENBQUMsQ0FBQyxNQUFqQyxDQUhBLENBQUE7QUFBQSxRQUlBLEdBQUEsR0FBTSxDQUFDLENBQUMsR0FKUixDQURGO09BQUEsTUFBQTtBQU9FLFFBQUEsSUFBRyxlQUFPLFVB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

//# sourceURL=/Users/benfallon/.atom/packages/indent-guide-improved/lib/guides.coffee

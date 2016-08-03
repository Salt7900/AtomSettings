(function() {
  var IndentGuideImprovedElement, Point, createElementsForGuides, realLength, styleGuide;

  Point = require('atom').Point;

  styleGuide = function(element, point, length, stack, active, editor, basePixelPos, lineHeightPixel, baseScreenRow, scrollTop, scrollLeft) {
    var indentSize, left, row, top;
    element.classList.add('indent-guide-improved');
    element.classList[stack ? 'add' : 'remove']('indent-guide-stack');
    element.classList[active ? 'add' : 'remove']('indent-guide-active');
    if (editor.isFoldedAtBufferRow(Math.max(point.row - 1, 0))) {
      element.style.height = '0px';
      return;
    }
    row = editor.screenRowForBufferRow(point.row);
    indentSize = editor.getTabLength();
    left = point.column * indentSize * editor.getDefaultCharWidth() - scrollLeft;
    top = basePixelPos + lineHeightPixel * (row - baseScreenRow) - scrollTop;
    element.style.left = "" + left + "px";
    element.style.top = "" + top + "px";
    element.style.height = "" + (editor.getLineHeightInPixels() * realLength(point.row, length, editor)) + "px";
    element.style.display = 'block';
    return element.style['z-index'] = 0;
  };

  realLength = function(row, length, editor) {
    var row1, row2;
    row1 = editor.screenRowForBufferRow(row);
    row2 = editor.screenRowForBufferRow(row + length);
    return row2 - row1;
  };

  IndentGuideImprovedElement = document.registerElement('indent-guide-improved');

  createElementsForGuides = function(editorElement, fns) {
    var count, createNum, existNum, items, neededNum, recycleNum, _i, _j, _results, _results1;
    items = editorElement.querySelectorAll('.indent-guide-improved');
    existNum = items.length;
    neededNum = fns.length;
    createNum = Math.max(neededNum - existNum, 0);
    recycleNum = Math.min(neededNum, existNum);
    count = 0;
    (function() {
      _results = [];
      for (var _i = 0; 0 <= existNum ? _i < existNum : _i > existNum; 0 <= existNum ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this).forEach(function(i) {
      var node;
      node = items.item(i);
      if (i < recycleNum) {
        return fns[count++](node);
      } else {
        return node.parentNode.removeChild(node);
      }
    });
    (function() {
      _results1 = [];
      for (var _j = 0; 0 <= createNum ? _j < createNum : _j > createNum; 0 <= createNum ? _j++ : _j--){ _results1.push(_j); }
      return _results1;
    }).apply(this).forEach(function(i) {
      var newNode;
      newNode = new IndentGuideImprovedElement();
      newNode.classList.add('overlayer');
      fns[count++](newNode);
      return editorElement.appendChild(newNode);
    });
    if (count !== neededNum) {
      throw 'System Error';
    }
  };

  module.exports = {
    createElementsForGuides: createElementsForGuides,
    styleGuide: styleGuide
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9pbmRlbnQtZ3VpZGUtaW1wcm92ZWQvbGliL2luZGVudC1ndWlkZS1pbXByb3ZlZC1lbGVtZW50LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxrRkFBQTs7QUFBQSxFQUFDLFFBQVMsT0FBQSxDQUFRLE1BQVIsRUFBVCxLQUFELENBQUE7O0FBQUEsRUFFQSxVQUFBLEdBQWEsU0FBQyxPQUFELEVBQVUsS0FBVixFQUFpQixNQUFqQixFQUF5QixLQUF6QixFQUFnQyxNQUFoQyxFQUF3QyxNQUF4QyxFQUFnRCxZQUFoRCxFQUE4RCxlQUE5RCxFQUErRSxhQUEvRSxFQUE4RixTQUE5RixFQUF5RyxVQUF6RyxHQUFBO0FBQ1gsUUFBQSwwQkFBQTtBQUFBLElBQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFsQixDQUFzQix1QkFBdEIsQ0FBQSxDQUFBO0FBQUEsSUFDQSxPQUFPLENBQUMsU0FBVSxDQUFHLEtBQUgsR0FBYyxLQUFkLEdBQXlCLFFBQXpCLENBQWxCLENBQXFELG9CQUFyRCxDQURBLENBQUE7QUFBQSxJQUVBLE9BQU8sQ0FBQyxTQUFVLENBQUcsTUFBSCxHQUFlLEtBQWYsR0FBMEIsUUFBMUIsQ0FBbEIsQ0FBc0QscUJBQXRELENBRkEsQ0FBQTtBQUlBLElBQUEsSUFBRyxNQUFNLENBQUMsbUJBQVAsQ0FBMkIsSUFBSSxDQUFDLEdBQUwsQ0FBUyxLQUFLLENBQUMsR0FBTixHQUFZLENBQXJCLEVBQXdCLENBQXhCLENBQTNCLENBQUg7QUFDRSxNQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBZCxHQUF1QixLQUF2QixDQUFBO0FBQ0EsWUFBQSxDQUZGO0tBSkE7QUFBQSxJQVFBLEdBQUEsR0FBTSxNQUFNLENBQUMscUJBQVAsQ0FBNkIsS0FBSyxDQUFD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

//# sourceURL=/Users/benfallon/.atom/packages/indent-guide-improved/lib/indent-guide-improved-element.coffee

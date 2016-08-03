
/*
 * Atom uses the Jasmine JavaScript testing framework.
 * More information here: http://jasmine.github.io/
 *
 * To directly run the tests in this directory from Atom, press `cmd-alt-ctrl-p`.
 *
 * For more information:
 *   - https://atom.io/docs/latest/creating-a-package#writing-tests
 *   - https://atom.io/docs/latest/creating-a-package#running-tests
 */

(function() {
  'use strict';
  var Preview;

  Preview = require('../lib/preview');

  describe('Preview', function() {
    return describe('A suite', function() {
      return it('should spec with an expectation', function() {
        return expect(Preview).not.toBeNull();
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9wcmV2aWV3L3NwZWMvcHJldmlldy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUE7Ozs7Ozs7OztHQUFBO0FBQUE7QUFBQTtBQUFBLEVBV0EsWUFYQSxDQUFBO0FBQUEsTUFBQSxPQUFBOztBQUFBLEVBYUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxnQkFBUixDQWJWLENBQUE7O0FBQUEsRUFlQSxRQUFBLENBQVMsU0FBVCxFQUFvQixTQUFBLEdBQUE7V0FDbEIsUUFBQSxDQUFTLFNBQVQsRUFBb0IsU0FBQSxHQUFBO2FBQ2xCLEVBQUEsQ0FBRyxpQ0FBSCxFQUFzQyxTQUFBLEdBQUE7ZUFDcEMsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLEdBQUcsQ0FBQyxRQUFwQixDQUFBLEVBRG9DO01BQUEsQ0FBdEMsRUFEa0I7SUFBQSxDQUFwQixFQURrQjtFQUFBLENBQXBCLENBZkEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/benfallon/.atom/packages/preview/spec/preview-spec.coffee

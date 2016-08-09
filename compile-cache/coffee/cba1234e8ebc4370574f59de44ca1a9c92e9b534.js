(function() {
  var TextEditor, buildTextEditor;

  TextEditor = null;

  buildTextEditor = function(params) {
    if (atom.workspace.buildTextEditor != null) {
      return atom.workspace.buildTextEditor(params);
    } else {
      if (TextEditor == null) {
        TextEditor = require('atom').TextEditor;
      }
      return new TextEditor(params);
    }
  };

  describe("React grammar", function() {
    var grammar;
    grammar = null;
    beforeEach(function() {
      waitsForPromise(function() {
        return atom.packages.activatePackage("language-javascript");
      });
      waitsForPromise(function() {
        return atom.packages.activatePackage("react");
      });
      afterEach(function() {
        atom.packages.deactivatePackages();
        return atom.packages.unloadPackages();
      });
      return runs(function() {
        return grammar = atom.grammars.grammarForScopeName("source.js.jsx");
      });
    });
    it("parses the grammar", function() {
      expect(grammar).toBeTruthy();
      return expect(grammar.scopeName).toBe("source.js.jsx");
    });
    describe("strings", function() {
      return it("tokenizes single-line strings", function() {
        var delim, delimsByScope, scope, tokens, _results;
        delimsByScope = {
          "string.quoted.double.js": '"',
          "string.quoted.single.js": "'"
        };
        _results = [];
        for (scope in delimsByScope) {
          delim = delimsByScope[scope];
          tokens = grammar.tokenizeLine(delim + "x" + delim).tokens;
          expect(tokens[0].value).toEqual(delim);
          expect(tokens[0].scopes).toEqual(["source.js.jsx", scope, "punctuation.definition.string.begin.js"]);
          expect(tokens[1].value).toEqual("x");
          expect(tokens[1].scopes).toEqual(["source.js.jsx", scope]);
          expect(tokens[2].value).toEqual(delim);
          _results.push(expect(tokens[2].scopes).toEqual(["source.js.jsx", scope, "punctuation.definition.string.end.js"]));
        }
        return _results;
      });
    });
    describe("keywords", function() {
      return it("tokenizes with as a keyword", function() {
        var tokens;
        tokens = grammar.tokenizeLine('with').tokens;
        return expect(tokens[0]).toEqual({
          value: 'with',
          scopes: ['source.js.jsx', 'keyword.control.js']
        });
      });
    });
    describe("regular expressions", function() {
      it("tokenizes regular expressions", function() {
        var tokens;
        tokens = grammar.tokenizeLine('/test/').tokens;
        expect(tokens[0]).toEqual({
          value: '/',
          scopes: ['source.js.jsx', 'string.regexp.js', 'punctuation.definition.string.begin.js']
        });
        expect(tokens[1]).toEqual({
          value: 'test',
          scopes: ['source.js.jsx', 'string.regexp.js']
        });
        expect(tokens[2]).toEqual({
          value: '/',
          scopes: ['source.js.jsx', 'string.regexp.js', 'punctuation.definition.string.end.js']
        });
        tokens = grammar.tokenizeLine('foo + /test/').tokens;
        expect(tokens[0]).toEqual({
          value: 'foo ',
          scopes: ['source.js.jsx']
        });
        expect(tokens[1]).toEqual({
          value: '+',
          scopes: ['source.js.jsx', 'keyword.operator.js']
        });
        expect(tokens[2]).toEqual({
          value: ' ',
          scopes: ['source.js.jsx', 'string.regexp.js']
        });
        expect(tokens[3]).toEqual({
          value: '/',
          scopes: ['source.js.jsx', 'string.regexp.js', 'punctuation.definition.string.begin.js']
        });
        expect(tokens[4]).toEqual({
          value: 'test',
          scopes: ['source.js.jsx', 'string.regexp.js']
        });
        return expect(tokens[5]).toEqual({
          value: '/',
          scopes: ['source.js.jsx', 'string.regexp.js', 'punctuation.definition.string.end.js']
        });
      });
      return it("tokenizes regular expressions inside arrays", function() {
        var tokens;
        tokens = grammar.tokenizeLine('[/test/]').tokens;
        expect(tokens[0]).toEqual({
          value: '[',
          scopes: ['source.js.jsx', 'meta.brace.square.js']
        });
        expect(tokens[1]).toEqual({
          value: '/',
          scopes: ['source.js.jsx', 'string.regexp.js', 'punctuation.definition.string.begin.js']
        });
        expect(tokens[2]).toEqual({
          value: 'test',
          scopes: ['source.js.jsx', 'string.regexp.js']
        });
        expect(tokens[3]).toEqual({
          value: '/',
          scopes: ['source.js.jsx', 'string.regexp.js', 'punctuation.definition.string.end.js']
        });
        expect(tokens[4]).toEqual({
          value: ']',
          scopes: ['source.js.jsx', 'meta.brace.square.js']
        });
        tokens = grammar.tokenizeLine('[1, /test/]').tokens;
        expect(tokens[0]).toEqual({
          value: '[',
          scopes: ['source.js.jsx', 'meta.brace.square.js']
        });
        expect(tokens[1]).toEqual({
          value: '1',
          scopes: ['source.js.jsx', 'constant.numeric.decimal.js']
        });
        expect(tokens[2]).toEqual({
          value: ',',
          scopes: ['source.js.jsx', 'meta.delimiter.object.comma.js']
        });
        expect(tokens[3]).toEqual({
          value: ' ',
          scopes: ['source.js.jsx', 'string.regexp.js']
        });
        expect(tokens[4]).toEqual({
          value: '/',
          scopes: ['source.js.jsx', 'string.regexp.js', 'punctuation.definition.string.begin.js']
        });
        expect(tokens[5]).toEqual({
          value: 'test',
          scopes: ['source.js.jsx', 'string.regexp.js']
        });
        expect(tokens[6]).toEqual({
          value: '/',
          scopes: ['source.js.jsx', 'string.regexp.js', 'punctuation.definition.string.end.js']
        });
        expect(tokens[7]).toEqual({
          value: ']',
          scopes: ['source.js.jsx', 'meta.brace.square.js']
        });
        tokens = grammar.tokenizeLine('0x1D306').tokens;
        expect(tokens[0]).toEqual({
          value: '0x1D306',
          scopes: ['source.js.jsx', 'constant.numeric.hex.js']
        });
        tokens = grammar.tokenizeLine('0X1D306').tokens;
        expect(tokens[0]).toEqual({
          value: '0X1D306',
          scopes: ['source.js.jsx', 'constant.numeric.hex.js']
        });
        tokens = grammar.tokenizeLine('0b011101110111010001100110').tokens;
        expect(tokens[0]).toEqual({
          value: '0b011101110111010001100110',
          scopes: ['source.js.jsx', 'constant.numeric.binary.js']
        });
        tokens = grammar.tokenizeLine('0B011101110111010001100110').tokens;
        expect(tokens[0]).toEqual({
          value: '0B011101110111010001100110',
          scopes: ['source.js.jsx', 'constant.numeric.binary.js']
        });
        tokens = grammar.tokenizeLine('0o1411').tokens;
        expect(tokens[0]).toEqual({
          value: '0o1411',
          scopes: ['source.js.jsx', 'constant.numeric.octal.js']
        });
        tokens = grammar.tokenizeLine('0O1411').tokens;
        return expect(tokens[0]).toEqual({
          value: '0O1411',
          scopes: ['source.js.jsx', 'constant.numeric.octal.js']
        });
      });
    });
    describe("operators", function() {
      it("tokenizes void correctly", function() {
        var tokens;
        tokens = grammar.tokenizeLine('void').tokens;
        return expect(tokens[0]).toEqual({
          value: 'void',
          scopes: ['source.js.jsx', 'keyword.operator.void.js']
        });
      });
      return it("tokenizes the / arithmetic operator when separated by newlines", function() {
        var lines;
        lines = grammar.tokenizeLines("1\n/ 2");
        expect(lines[0][0]).toEqual({
          value: '1',
          scopes: ['source.js.jsx', 'constant.numeric.decimal.js']
        });
        expect(lines[1][0]).toEqual({
          value: '/',
          scopes: ['source.js.jsx', 'keyword.operator.js']
        });
        expect(lines[1][1]).toEqual({
          value: ' ',
          scopes: ['source.js.jsx']
        });
        return expect(lines[1][2]).toEqual({
          value: '2',
          scopes: ['source.js.jsx', 'constant.numeric.decimal.js']
        });
      });
    });
    describe("ES6 string templates", function() {
      return it("tokenizes them as strings", function() {
        var tokens;
        tokens = grammar.tokenizeLine('`hey ${name}`').tokens;
        expect(tokens[0]).toEqual({
          value: '`',
          scopes: ['source.js.jsx', 'string.quoted.template.js', 'punctuation.definition.string.begin.js']
        });
        expect(tokens[1]).toEqual({
          value: 'hey ',
          scopes: ['source.js.jsx', 'string.quoted.template.js']
        });
        expect(tokens[2]).toEqual({
          value: '${',
          scopes: ['source.js.jsx', 'string.quoted.template.js', 'source.js.embedded.source', 'punctuation.section.embedded.js']
        });
        expect(tokens[3]).toEqual({
          value: 'name',
          scopes: ['source.js.jsx', 'string.quoted.template.js', 'source.js.embedded.source']
        });
        expect(tokens[4]).toEqual({
          value: '}',
          scopes: ['source.js.jsx', 'string.quoted.template.js', 'source.js.embedded.source', 'punctuation.section.embedded.js']
        });
        return expect(tokens[5]).toEqual({
          value: '`',
          scopes: ['source.js.jsx', 'string.quoted.template.js', 'punctuation.definition.string.end.js']
        });
      });
    });
    describe("default: in a switch statement", function() {
      return it("tokenizes it as a keyword", function() {
        var tokens;
        tokens = grammar.tokenizeLine('default: ').tokens;
        return expect(tokens[0]).toEqual({
          value: 'default',
          scopes: ['source.js.jsx', 'keyword.control.js']
        });
      });
    });
    it("tokenizes comments in function params", function() {
      var tokens;
      tokens = grammar.tokenizeLine('foo: function (/**Bar*/bar){').tokens;
      expect(tokens[5]).toEqual({
        value: '(',
        scopes: ['source.js.jsx', 'meta.function.json.js', 'meta.parameters.js', 'punctuation.definition.parameters.begin.bracket.round.js']
      });
      expect(tokens[6]).toEqual({
        value: '/**',
        scopes: ['source.js.jsx', 'meta.function.json.js', 'meta.parameters.js', 'comment.block.documentation.js', 'punctuation.definition.comment.js']
      });
      expect(tokens[7]).toEqual({
        value: 'Bar',
        scopes: ['source.js.jsx', 'meta.function.json.js', 'meta.parameters.js', 'comment.block.documentation.js']
      });
      expect(tokens[8]).toEqual({
        value: '*/',
        scopes: ['source.js.jsx', 'meta.function.json.js', 'meta.parameters.js', 'comment.block.documentation.js', 'punctuation.definition.comment.js']
      });
      return expect(tokens[9]).toEqual({
        value: 'bar',
        scopes: ['source.js.jsx', 'meta.function.json.js', 'meta.parameters.js', 'variable.parameter.function.js']
      });
    });
    it("tokenizes /* */ comments", function() {
      var tokens;
      tokens = grammar.tokenizeLine('/**/').tokens;
      expect(tokens[0]).toEqual({
        value: '/*',
        scopes: ['source.js.jsx', 'comment.block.js', 'punctuation.definition.comment.js']
      });
      expect(tokens[1]).toEqual({
        value: '*/',
        scopes: ['source.js.jsx', 'comment.block.js', 'punctuation.definition.comment.js']
      });
      tokens = grammar.tokenizeLine('/* foo */').tokens;
      expect(tokens[0]).toEqual({
        value: '/*',
        scopes: ['source.js.jsx', 'comment.block.js', 'punctuation.definition.comment.js']
      });
      expect(tokens[1]).toEqual({
        value: ' foo ',
        scopes: ['source.js.jsx', 'comment.block.js']
      });
      return expect(tokens[2]).toEqual({
        value: '*/',
        scopes: ['source.js.jsx', 'comment.block.js', 'punctuation.definition.comment.js']
      });
    });
    it("tokenizes /** */ comments", function() {
      var tokens;
      tokens = grammar.tokenizeLine('/***/').tokens;
      expect(tokens[0]).toEqual({
        value: '/**',
        scopes: ['source.js.jsx', 'comment.block.documentation.js', 'punctuation.definition.comment.js']
      });
      expect(tokens[1]).toEqual({
        value: '*/',
        scopes: ['source.js.jsx', 'comment.block.documentation.js', 'punctuation.definition.comment.js']
      });
      tokens = grammar.tokenizeLine('/** foo */').tokens;
      expect(tokens[0]).toEqual({
        value: '/**',
        scopes: ['source.js.jsx', 'comment.block.documentation.js', 'punctuation.definition.comment.js']
      });
      expect(tokens[1]).toEqual({
        value: ' foo ',
        scopes: ['source.js.jsx', 'comment.block.documentation.js']
      });
      return expect(tokens[2]).toEqual({
        value: '*/',
        scopes: ['source.js.jsx', 'comment.block.documentation.js', 'punctuation.definition.comment.js']
      });
    });
    it("tokenizes jsx tags", function() {
      var tokens;
      tokens = grammar.tokenizeLine('<tag></tag>').tokens;
      expect(tokens[0]).toEqual({
        value: '<',
        scopes: ["source.js.jsx", "tag.open.js", "punctuation.definition.tag.begin.js"]
      });
      expect(tokens[1]).toEqual({
        value: 'tag',
        scopes: ["source.js.jsx", "tag.open.js", "entity.name.tag.js"]
      });
      expect(tokens[2]).toEqual({
        value: '>',
        scopes: ["source.js.jsx", "tag.open.js", "punctuation.definition.tag.end.js"]
      });
      expect(tokens[3]).toEqual({
        value: '</',
        scopes: ["source.js.jsx", "tag.closed.js", "punctuation.definition.tag.begin.js"]
      });
      expect(tokens[4]).toEqual({
        value: 'tag',
        scopes: ["source.js.jsx", "tag.closed.js", "entity.name.tag.js"]
      });
      return expect(tokens[5]).toEqual({
        value: '>',
        scopes: ["source.js.jsx", "tag.closed.js", "punctuation.definition.tag.end.js"]
      });
    });
    it("tokenizes jsx inside parenthesis", function() {
      var tokens;
      tokens = grammar.tokenizeLine('return (<tag></tag>)').tokens;
      expect(tokens[3]).toEqual({
        value: '<',
        scopes: ["source.js.jsx", "tag.open.js", "punctuation.definition.tag.begin.js"]
      });
      expect(tokens[4]).toEqual({
        value: 'tag',
        scopes: ["source.js.jsx", "tag.open.js", "entity.name.tag.js"]
      });
      expect(tokens[5]).toEqual({
        value: '>',
        scopes: ["source.js.jsx", "tag.open.js", "punctuation.definition.tag.end.js"]
      });
      expect(tokens[6]).toEqual({
        value: '</',
        scopes: ["source.js.jsx", "tag.closed.js", "punctuation.definition.tag.begin.js"]
      });
      expect(tokens[7]).toEqual({
        value: 'tag',
        scopes: ["source.js.jsx", "tag.closed.js", "entity.name.tag.js"]
      });
      return expect(tokens[8]).toEqual({
        value: '>',
        scopes: ["source.js.jsx", "tag.closed.js", "punctuation.definition.tag.end.js"]
      });
    });
    it("tokenizes jsx inside function body", function() {
      var tokens;
      tokens = grammar.tokenizeLine('function () { return (<tag></tag>) }').tokens;
      expect(tokens[10]).toEqual({
        value: '<',
        scopes: ["source.js.jsx", "tag.open.js", "punctuation.definition.tag.begin.js"]
      });
      expect(tokens[11]).toEqual({
        value: 'tag',
        scopes: ["source.js.jsx", "tag.open.js", "entity.name.tag.js"]
      });
      expect(tokens[12]).toEqual({
        value: '>',
        scopes: ["source.js.jsx", "tag.open.js", "punctuation.definition.tag.end.js"]
      });
      expect(tokens[13]).toEqual({
        value: '</',
        scopes: ["source.js.jsx", "tag.closed.js", "punctuation.definition.tag.begin.js"]
      });
      expect(tokens[14]).toEqual({
        value: 'tag',
        scopes: ["source.js.jsx", "tag.closed.js", "entity.name.tag.js"]
      });
      return expect(tokens[15]).toEqual({
        value: '>',
        scopes: ["source.js.jsx", "tag.closed.js", "punctuation.definition.tag.end.js"]
      });
    });
    it("tokenizes jsx inside function body in an object", function() {
      var tokens;
      tokens = grammar.tokenizeLine('{foo:function () { return (<tag></tag>) }}').tokens;
      expect(tokens[13]).toEqual({
        value: '<',
        scopes: ["source.js.jsx", "tag.open.js", "punctuation.definition.tag.begin.js"]
      });
      expect(tokens[14]).toEqual({
        value: 'tag',
        scopes: ["source.js.jsx", "tag.open.js", "entity.name.tag.js"]
      });
      expect(tokens[15]).toEqual({
        value: '>',
        scopes: ["source.js.jsx", "tag.open.js", "punctuation.definition.tag.end.js"]
      });
      expect(tokens[16]).toEqual({
        value: '</',
        scopes: ["source.js.jsx", "tag.closed.js", "punctuation.definition.tag.begin.js"]
      });
      expect(tokens[17]).toEqual({
        value: 'tag',
        scopes: ["source.js.jsx", "tag.closed.js", "entity.name.tag.js"]
      });
      return expect(tokens[18]).toEqual({
        value: '>',
        scopes: ["source.js.jsx", "tag.closed.js", "punctuation.definition.tag.end.js"]
      });
    });
    it("tokenizes jsx inside function call", function() {
      var tokens;
      tokens = grammar.tokenizeLine('foo(<tag></tag>)').tokens;
      expect(tokens[2]).toEqual({
        value: '<',
        scopes: ["source.js.jsx", "meta.function-call.js", "tag.open.js", "punctuation.definition.tag.begin.js"]
      });
      expect(tokens[3]).toEqual({
        value: 'tag',
        scopes: ["source.js.jsx", "meta.function-call.js", "tag.open.js", "entity.name.tag.js"]
      });
      expect(tokens[4]).toEqual({
        value: '>',
        scopes: ["source.js.jsx", "meta.function-call.js", "tag.open.js", "punctuation.definition.tag.end.js"]
      });
      expect(tokens[5]).toEqual({
        value: '</',
        scopes: ["source.js.jsx", "meta.function-call.js", "tag.closed.js", "punctuation.definition.tag.begin.js"]
      });
      expect(tokens[6]).toEqual({
        value: 'tag',
        scopes: ["source.js.jsx", "meta.function-call.js", "tag.closed.js", "entity.name.tag.js"]
      });
      return expect(tokens[7]).toEqual({
        value: '>',
        scopes: ["source.js.jsx", "meta.function-call.js", "tag.closed.js", "punctuation.definition.tag.end.js"]
      });
    });
    it("tokenizes jsx inside method call", function() {
      var tokens;
      tokens = grammar.tokenizeLine('bar.foo(<tag></tag>)').tokens;
      expect(tokens[4]).toEqual({
        value: '<',
        scopes: ["source.js.jsx", "meta.method-call.js", "tag.open.js", "punctuation.definition.tag.begin.js"]
      });
      expect(tokens[5]).toEqual({
        value: 'tag',
        scopes: ["source.js.jsx", "meta.method-call.js", "tag.open.js", "entity.name.tag.js"]
      });
      expect(tokens[6]).toEqual({
        value: '>',
        scopes: ["source.js.jsx", "meta.method-call.js", "tag.open.js", "punctuation.definition.tag.end.js"]
      });
      expect(tokens[7]).toEqual({
        value: '</',
        scopes: ["source.js.jsx", "meta.method-call.js", "tag.closed.js", "punctuation.definition.tag.begin.js"]
      });
      expect(tokens[8]).toEqual({
        value: 'tag',
        scopes: ["source.js.jsx", "meta.method-call.js", "tag.closed.js", "entity.name.tag.js"]
      });
      return expect(tokens[9]).toEqual({
        value: '>',
        scopes: ["source.js.jsx", "meta.method-call.js", "tag.closed.js", "punctuation.definition.tag.end.js"]
      });
    });
    it("tokenizes ' as string inside jsx", function() {
      var tokens;
      tokens = grammar.tokenizeLine('<tag>fo\'o</tag>').tokens;
      expect(tokens[0]).toEqual({
        value: '<',
        scopes: ["source.js.jsx", "tag.open.js", "punctuation.definition.tag.begin.js"]
      });
      expect(tokens[1]).toEqual({
        value: 'tag',
        scopes: ["source.js.jsx", "tag.open.js", "entity.name.tag.js"]
      });
      expect(tokens[2]).toEqual({
        value: '>',
        scopes: ["source.js.jsx", "tag.open.js", "punctuation.definition.tag.end.js"]
      });
      expect(tokens[3]).toEqual({
        value: 'fo\'o',
        scopes: ["source.js.jsx", "meta.other.pcdata.js"]
      });
      expect(tokens[4]).toEqual({
        value: '</',
        scopes: ["source.js.jsx", "tag.closed.js", "punctuation.definition.tag.begin.js"]
      });
      expect(tokens[5]).toEqual({
        value: 'tag',
        scopes: ["source.js.jsx", "tag.closed.js", "entity.name.tag.js"]
      });
      return expect(tokens[6]).toEqual({
        value: '>',
        scopes: ["source.js.jsx", "tag.closed.js", "punctuation.definition.tag.end.js"]
      });
    });
    return describe("indentation", function() {
      var editor, expectPreservedIndentation;
      editor = null;
      beforeEach(function() {
        editor = buildTextEditor();
        return editor.setGrammar(grammar);
      });
      expectPreservedIndentation = function(text) {
        editor.setText(text);
        editor.autoIndentBufferRows(0, text.split("\n").length - 1);
        return expect(editor.getText()).toBe(text);
      };
      it("indents allman-style curly braces", function() {
        return expectPreservedIndentation("if (true)\n{\n  for (;;)\n  {\n    while (true)\n    {\n      x();\n    }\n  }\n}\n\nelse\n{\n  do\n  {\n    y();\n  } while (true);\n}");
      });
      return it("indents non-allman-style curly braces", function() {
        return expectPreservedIndentation("if (true) {\n  for (;;) {\n    while (true) {\n      x();\n    }\n  }\n} else {\n  do {\n    y();\n  } while (true);\n}");
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9yZWFjdC9zcGVjL3JlYWN0LWdyYW1tYXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMkJBQUE7O0FBQUEsRUFBQSxVQUFBLEdBQWEsSUFBYixDQUFBOztBQUFBLEVBQ0EsZUFBQSxHQUFrQixTQUFDLE1BQUQsR0FBQTtBQUNoQixJQUFBLElBQUcsc0NBQUg7YUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWYsQ0FBK0IsTUFBL0IsRUFERjtLQUFBLE1BQUE7O1FBR0UsYUFBYyxPQUFBLENBQVEsTUFBUixDQUFlLENBQUM7T0FBOUI7YUFDSSxJQUFBLFVBQUEsQ0FBVyxNQUFYLEVBSk47S0FEZ0I7RUFBQSxDQURsQixDQUFBOztBQUFBLEVBUUEsUUFBQSxDQUFTLGVBQVQsRUFBMEIsU0FBQSxHQUFBO0FBQ3hCLFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQVYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIscUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUFBLENBQUE7QUFBQSxNQUdBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLE9BQTlCLEVBRGM7TUFBQSxDQUFoQixDQUhBLENBQUE7QUFBQSxNQU1BLFNBQUEsQ0FBVSxTQUFBLEdBQUE7QUFDUixRQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWQsQ0FBQSxDQUFBLENBQUE7ZUFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWQsQ0FBQSxFQUZRO01BQUEsQ0FBVixDQU5BLENBQUE7YUFV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

//# sourceURL=/Users/benfallon/.atom/packages/react/spec/react-grammar-spec.coffee

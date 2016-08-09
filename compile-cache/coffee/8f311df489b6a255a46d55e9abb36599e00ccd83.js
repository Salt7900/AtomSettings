(function() {
  var AtomReact, CompositeDisposable, Disposable, autoCompleteTagCloseRegex, autoCompleteTagStartRegex, contentCheckRegex, decreaseIndentForNextLinePattern, defaultDetectReactFilePattern, jsxComplexAttributePattern, jsxTagStartPattern, _ref;

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Disposable = _ref.Disposable;

  contentCheckRegex = null;

  defaultDetectReactFilePattern = '/((require\\([\'"]react(?:(-native|\\/addons))?[\'"]\\)))|(import\\s+[\\w{},\\s]+\\s+from\\s+[\'"]react(?:(-native|\\/addons))?[\'"])/';

  autoCompleteTagStartRegex = /(<)([a-zA-Z0-9\.:$_]+)/g;

  autoCompleteTagCloseRegex = /(<\/)([^>]+)(>)/g;

  jsxTagStartPattern = '(?x)((^|=|return)\\s*<([^!/?](?!.+?(</.+?>))))';

  jsxComplexAttributePattern = '(?x)\\{ [^}"\']* $|\\( [^)"\']* $';

  decreaseIndentForNextLinePattern = '(?x) />\\s*(,|;)?\\s*$ | ^\\s*\\S+.*</[-_\\.A-Za-z0-9]+>$';

  AtomReact = (function() {
    AtomReact.prototype.config = {
      enabledForAllJavascriptFiles: {
        type: 'boolean',
        "default": false,
        description: 'Enable grammar, snippets and other features automatically for all .js files.'
      },
      disableAutoClose: {
        type: 'boolean',
        "default": false,
        description: 'Disabled tag autocompletion'
      },
      detectReactFilePattern: {
        type: 'string',
        "default": defaultDetectReactFilePattern
      },
      jsxTagStartPattern: {
        type: 'string',
        "default": jsxTagStartPattern
      },
      jsxComplexAttributePattern: {
        type: 'string',
        "default": jsxComplexAttributePattern
      },
      decreaseIndentForNextLinePattern: {
        type: 'string',
        "default": decreaseIndentForNextLinePattern
      }
    };

    function AtomReact() {}

    AtomReact.prototype.patchEditorLangModeAutoDecreaseIndentForBufferRow = function(editor) {
      var fn, self;
      self = this;
      fn = editor.languageMode.autoDecreaseIndentForBufferRow;
      if (fn.jsxPatch) {
        return;
      }
      return editor.languageMode.autoDecreaseIndentForBufferRow = function(bufferRow, options) {
        var currentIndentLevel, decreaseIndentRegex, decreaseNextLineIndentRegex, desiredIndentLevel, increaseIndentRegex, line, precedingLine, precedingRow, scopeDescriptor;
        if (editor.getGrammar().scopeName !== "source.js.jsx") {
          return fn.call(editor.languageMode, bufferRow, options);
        }
        scopeDescriptor = this.editor.scopeDescriptorForBufferPosition([bufferRow, 0]);
        decreaseNextLineIndentRegex = this.getRegexForProperty(scopeDescriptor, 'react.decreaseIndentForNextLinePattern');
        decreaseIndentRegex = this.decreaseIndentRegexForScopeDescriptor(scopeDescriptor);
        increaseIndentRegex = this.increaseIndentRegexForScopeDescriptor(scopeDescriptor);
        precedingRow = this.buffer.previousNonBlankRow(bufferRow);
        if (precedingRow < 0) {
          return;
        }
        precedingLine = this.buffer.lineForRow(precedingRow);
        line = this.buffer.lineForRow(bufferRow);
        if (precedingLine && decreaseNextLineIndentRegex.testSync(precedingLine) && !(increaseIndentRegex && increaseIndentRegex.testSync(precedingLine)) && !this.editor.isBufferRowCommented(precedingRow)) {
          currentIndentLevel = this.editor.indentationForBufferRow(precedingRow);
          if (decreaseIndentRegex && decreaseIndentRegex.testSync(line)) {
            currentIndentLevel -= 1;
          }
          desiredIndentLevel = currentIndentLevel - 1;
          if (desiredIndentLevel >= 0 && desiredIndentLevel < currentIndentLevel) {
            return this.editor.setIndentationForBufferRow(bufferRow, desiredIndentLevel);
          }
        } else if (!this.editor.isBufferRowCommented(bufferRow)) {
          return fn.call(editor.languageMode, bufferRow, options);
        }
      };
    };

    AtomReact.prototype.patchEditorLangModeSuggestedIndentForBufferRow = function(editor) {
      var fn, self;
      self = this;
      fn = editor.languageMode.suggestedIndentForBufferRow;
      if (fn.jsxPatch) {
        return;
      }
      return editor.languageMode.suggestedIndentForBufferRow = function(bufferRow, options) {
        var complexAttributeRegex, decreaseIndentRegex, decreaseIndentTest, decreaseNextLineIndentRegex, increaseIndentRegex, indent, precedingLine, precedingRow, scopeDescriptor, tagStartRegex, tagStartTest;
        indent = fn.call(editor.languageMode, bufferRow, options);
        if (!(editor.getGrammar().scopeName === "source.js.jsx" && bufferRow > 1)) {
          return indent;
        }
        scopeDescriptor = this.editor.scopeDescriptorForBufferPosition([bufferRow, 0]);
        decreaseNextLineIndentRegex = this.getRegexForProperty(scopeDescriptor, 'react.decreaseIndentForNextLinePattern');
        increaseIndentRegex = this.increaseIndentRegexForScopeDescriptor(scopeDescriptor);
        decreaseIndentRegex = this.decreaseIndentRegexForScopeDescriptor(scopeDescriptor);
        tagStartRegex = this.getRegexForProperty(scopeDescriptor, 'react.jsxTagStartPattern');
        complexAttributeRegex = this.getRegexForProperty(scopeDescriptor, 'react.jsxComplexAttributePattern');
        precedingRow = this.buffer.previousNonBlankRow(bufferRow);
        if (precedingRow < 0) {
          return indent;
        }
        precedingLine = this.buffer.lineForRow(precedingRow);
        if (precedingLine == null) {
          return indent;
        }
        if (this.editor.isBufferRowCommented(bufferRow) && this.editor.isBufferRowCommented(precedingRow)) {
          return this.editor.indentationForBufferRow(precedingRow);
        }
        tagStartTest = tagStartRegex.testSync(precedingLine);
        decreaseIndentTest = decreaseIndentRegex.testSync(precedingLine);
        if (tagStartTest && complexAttributeRegex.testSync(precedingLine) && !this.editor.isBufferRowCommented(precedingRow)) {
          indent += 1;
        }
        if (precedingLine && !decreaseIndentTest && decreaseNextLineIndentRegex.testSync(precedingLine) && !this.editor.isBufferRowCommented(precedingRow)) {
          indent -= 1;
        }
        return Math.max(indent, 0);
      };
    };

    AtomReact.prototype.patchEditorLangMode = function(editor) {
      var _ref1, _ref2;
      if ((_ref1 = this.patchEditorLangModeSuggestedIndentForBufferRow(editor)) != null) {
        _ref1.jsxPatch = true;
      }
      return (_ref2 = this.patchEditorLangModeAutoDecreaseIndentForBufferRow(editor)) != null ? _ref2.jsxPatch = true : void 0;
    };

    AtomReact.prototype.isReact = function(text) {
      var match;
      if (atom.config.get('react.enabledForAllJavascriptFiles')) {
        return true;
      }
      if (contentCheckRegex == null) {
        match = (atom.config.get('react.detectReactFilePattern') || defaultDetectReactFilePattern).match(new RegExp('^/(.*?)/([gimy]*)$'));
        contentCheckRegex = new RegExp(match[1], match[2]);
      }
      return text.match(contentCheckRegex) != null;
    };

    AtomReact.prototype.isReactEnabledForEditor = function(editor) {
      var _ref1;
      return (editor != null) && ((_ref1 = editor.getGrammar().scopeName) === "source.js.jsx" || _ref1 === "source.coffee.jsx");
    };

    AtomReact.prototype.autoSetGrammar = function(editor) {
      var extName, jsxGrammar, path;
      if (this.isReactEnabledForEditor(editor)) {
        return;
      }
      path = require('path');
      extName = path.extname(editor.getPath());
      if (extName === ".jsx" || ((extName === ".js" || extName === ".es6") && this.isReact(editor.getText()))) {
        jsxGrammar = atom.grammars.grammarsByScopeName["source.js.jsx"];
        if (jsxGrammar) {
          return editor.setGrammar(jsxGrammar);
        }
      }
    };

    AtomReact.prototype.onHTMLToJSX = function() {
      var HTMLtoJSX, converter, editor, jsxformat, selections;
      jsxformat = require('jsxformat');
      HTMLtoJSX = require('./htmltojsx');
      converter = new HTMLtoJSX({
        createClass: false
      });
      editor = atom.workspace.getActiveTextEditor();
      if (!this.isReactEnabledForEditor(editor)) {
        return;
      }
      selections = editor.getSelections();
      return editor.transact((function(_this) {
        return function() {
          var jsxOutput, range, selection, selectionText, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = selections.length; _i < _len; _i++) {
            selection = selections[_i];
            try {
              selectionText = selection.getText();
              jsxOutput = converter.convert(selectionText);
              try {
                jsxformat.setOptions({});
                jsxOutput = jsxformat.format(jsxOutput);
              } catch (_error) {}
              selection.insertText(jsxOutput);
              range = selection.getBufferRange();
              _results.push(editor.autoIndentBufferRows(range.start.row, range.end.row));
            } catch (_error) {}
          }
          return _results;
        };
      })(this));
    };

    AtomReact.prototype.onReformat = function() {
      var editor, jsxformat, selections, _;
      jsxformat = require('jsxformat');
      _ = require('lodash');
      editor = atom.workspace.getActiveTextEditor();
      if (!this.isReactEnabledForEditor(editor)) {
        return;
      }
      selections = editor.getSelections();
      return editor.transact((function(_this) {
        return function() {
          var bufEnd, bufStart, err, firstChangedLine, lastChangedLine, newLineCount, original, originalLineCount, range, result, selection, serializedRange, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = selections.length; _i < _len; _i++) {
            selection = selections[_i];
            try {
              range = selection.getBufferRange();
              serializedRange = range.serialize();
              bufStart = serializedRange[0];
              bufEnd = serializedRange[1];
              jsxformat.setOptions({});
              result = jsxformat.format(selection.getText());
              originalLineCount = editor.getLineCount();
              selection.insertText(result);
              newLineCount = editor.getLineCount();
              editor.autoIndentBufferRows(bufStart[0], bufEnd[0] + (newLineCount - originalLineCount));
              _results.push(editor.setCursorBufferPosition(bufStart));
            } catch (_error) {
              err = _error;
              range = selection.getBufferRange().serialize();
              range[0][0]++;
              range[1][0]++;
              jsxformat.setOptions({
                range: range
              });
              original = editor.getText();
              try {
                result = jsxformat.format(original);
                selection.clear();
                originalLineCount = editor.getLineCount();
                editor.setText(result);
                newLineCount = editor.getLineCount();
                firstChangedLine = range[0][0] - 1;
                lastChangedLine = range[1][0] - 1 + (newLineCount - originalLineCount);
                editor.autoIndentBufferRows(firstChangedLine, lastChangedLine);
                _results.push(editor.setCursorBufferPosition([firstChangedLine, range[0][1]]));
              } catch (_error) {}
            }
          }
          return _results;
        };
      })(this));
    };

    AtomReact.prototype.autoCloseTag = function(eventObj, editor) {
      var fullLine, lastLine, lastLineSpaces, line, lines, match, rest, row, serializedEndPoint, tagName, token, tokenizedLine, _ref1, _ref2;
      if (atom.config.get('react.disableAutoClose')) {
        return;
      }
      if (!this.isReactEnabledForEditor(editor) || editor !== atom.workspace.getActiveTextEditor()) {
        return;
      }
      if ((eventObj != null ? eventObj.newText : void 0) === '>' && !eventObj.oldText) {
        if (editor.getCursorBufferPositions().length > 1) {
          return;
        }
        tokenizedLine = (_ref1 = editor.tokenizedBuffer) != null ? _ref1.tokenizedLineForRow(eventObj.newRange.end.row) : void 0;
        if (tokenizedLine == null) {
          return;
        }
        token = tokenizedLine.tokenAtBufferColumn(eventObj.newRange.end.column - 1);
        if ((token == null) || token.scopes.indexOf('tag.open.js') === -1 || token.scopes.indexOf('punctuation.definition.tag.end.js') === -1) {
          return;
        }
        lines = editor.buffer.getLines();
        row = eventObj.newRange.end.row;
        line = lines[row];
        line = line.substr(0, eventObj.newRange.end.column);
        if (line.substr(line.length - 2, 1) === '/') {
          return;
        }
        tagName = null;
        while ((line != null) && (tagName == null)) {
          match = line.match(autoCompleteTagStartRegex);
          if ((match != null) && match.length > 0) {
            tagName = match.pop().substr(1);
          }
          row--;
          line = lines[row];
        }
        if (tagName != null) {
          editor.insertText('</' + tagName + '>', {
            undo: 'skip'
          });
          return editor.setCursorBufferPosition(eventObj.newRange.end);
        }
      } else if ((eventObj != null ? eventObj.oldText : void 0) === '>' && (eventObj != null ? eventObj.newText : void 0) === '') {
        lines = editor.buffer.getLines();
        row = eventObj.newRange.end.row;
        fullLine = lines[row];
        tokenizedLine = (_ref2 = editor.tokenizedBuffer) != null ? _ref2.tokenizedLineForRow(eventObj.newRange.end.row) : void 0;
        if (tokenizedLine == null) {
          return;
        }
        token = tokenizedLine.tokenAtBufferColumn(eventObj.newRange.end.column - 1);
        if ((token == null) || token.scopes.indexOf('tag.open.js') === -1) {
          return;
        }
        line = fullLine.substr(0, eventObj.newRange.end.column);
        if (line.substr(line.length - 1, 1) === '/') {
          return;
        }
        tagName = null;
        while ((line != null) && (tagName == null)) {
          match = line.match(autoCompleteTagStartRegex);
          if ((match != null) && match.length > 0) {
            tagName = match.pop().substr(1);
          }
          row--;
          line = lines[row];
        }
        if (tagName != null) {
          rest = fullLine.substr(eventObj.newRange.end.column);
          if (rest.indexOf('</' + tagName + '>') === 0) {
            serializedEndPoint = [eventObj.newRange.end.row, eventObj.newRange.end.column];
            return editor.setTextInBufferRange([serializedEndPoint, [serializedEndPoint[0], serializedEndPoint[1] + tagName.length + 3]], '', {
              undo: 'skip'
            });
          }
        }
      } else if ((eventObj != null ? eventObj.newText : void 0) === '\n') {
        lines = editor.buffer.getLines();
        row = eventObj.newRange.end.row;
        lastLine = lines[row - 1];
        fullLine = lines[row];
        if (/>$/.test(lastLine) && fullLine.search(autoCompleteTagCloseRegex) === 0) {
          while (lastLine != null) {
            match = lastLine.match(autoCompleteTagStartRegex);
            if ((match != null) && match.length > 0) {
              break;
            }
            row--;
            lastLine = lines[row];
          }
          lastLineSpaces = lastLine.match(/^\s*/);
          lastLineSpaces = lastLineSpaces != null ? lastLineSpaces[0] : '';
          editor.insertText('\n' + lastLineSpaces);
          return editor.setCursorBufferPosition(eventObj.newRange.end);
        }
      }
    };

    AtomReact.prototype.processEditor = function(editor) {
      var disposableBufferEvent;
      this.patchEditorLangMode(editor);
      this.autoSetGrammar(editor);
      disposableBufferEvent = editor.buffer.onDidChange((function(_this) {
        return function(e) {
          return _this.autoCloseTag(e, editor);
        };
      })(this));
      this.disposables.add(editor.onDidDestroy((function(_this) {
        return function() {
          return disposableBufferEvent.dispose();
        };
      })(this)));
      return this.disposables.add(disposableBufferEvent);
    };

    AtomReact.prototype.deactivate = function() {
      return this.disposables.dispose();
    };

    AtomReact.prototype.activate = function() {
      var disposableConfigListener, disposableHTMLTOJSX, disposableProcessEditor, disposableReformat;
      this.disposables = new CompositeDisposable();
      jsxTagStartPattern = '(?x)((^|=|return)\\s*<([^!/?](?!.+?(</.+?>))))';
      jsxComplexAttributePattern = '(?x)\\{ [^}"\']* $|\\( [^)"\']* $';
      decreaseIndentForNextLinePattern = '(?x) />\\s*(,|;)?\\s*$ | ^\\s*\\S+.*</[-_\\.A-Za-z0-9]+>$';
      atom.config.set("react.jsxTagStartPattern", jsxTagStartPattern);
      atom.config.set("react.jsxComplexAttributePattern", jsxComplexAttributePattern);
      atom.config.set("react.decreaseIndentForNextLinePattern", decreaseIndentForNextLinePattern);
      disposableConfigListener = atom.config.observe('react.detectReactFilePattern', function(newValue) {
        return contentCheckRegex = null;
      });
      disposableReformat = atom.commands.add('atom-workspace', 'react:reformat-JSX', (function(_this) {
        return function() {
          return _this.onReformat();
        };
      })(this));
      disposableHTMLTOJSX = atom.commands.add('atom-workspace', 'react:HTML-to-JSX', (function(_this) {
        return function() {
          return _this.onHTMLToJSX();
        };
      })(this));
      disposableProcessEditor = atom.workspace.observeTextEditors(this.processEditor.bind(this));
      this.disposables.add(disposableConfigListener);
      this.disposables.add(disposableReformat);
      this.disposables.add(disposableHTMLTOJSX);
      return this.disposables.add(disposableProcessEditor);
    };

    return AtomReact;

  })();

  module.exports = AtomReact;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9yZWFjdC9saWIvYXRvbS1yZWFjdC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsME9BQUE7O0FBQUEsRUFBQSxPQUFvQyxPQUFBLENBQVEsTUFBUixDQUFwQyxFQUFDLDJCQUFBLG1CQUFELEVBQXNCLGtCQUFBLFVBQXRCLENBQUE7O0FBQUEsRUFFQSxpQkFBQSxHQUFvQixJQUZwQixDQUFBOztBQUFBLEVBR0EsNkJBQUEsR0FBZ0Msd0lBSGhDLENBQUE7O0FBQUEsRUFJQSx5QkFBQSxHQUE0Qix5QkFKNUIsQ0FBQTs7QUFBQSxFQUtBLHlCQUFBLEdBQTRCLGtCQUw1QixDQUFBOztBQUFBLEVBT0Esa0JBQUEsR0FBcUIsZ0RBUHJCLENBQUE7O0FBQUEsRUFRQSwwQkFBQSxHQUE2QixtQ0FSN0IsQ0FBQTs7QUFBQSxFQVNBLGdDQUFBLEdBQW1DLDJEQVRuQyxDQUFBOztBQUFBLEVBYU07QUFDSix3QkFBQSxNQUFBLEdBQ0U7QUFBQSxNQUFBLDRCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsS0FEVDtBQUFBLFFBRUEsV0FBQSxFQUFhLDhFQUZiO09BREY7QUFBQSxNQUlBLGdCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsS0FEVDtBQUFBLFFBRUEsV0FBQSxFQUFhLDZCQUZiO09BTEY7QUFBQSxNQVFBLHNCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsNkJBRFQ7T0FURjtBQUFBLE1BV0Esa0JBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxrQkFEVDtPQVpG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

//# sourceURL=/Users/benfallon/.atom/packages/react/lib/atom-react.coffee

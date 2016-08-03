(function() {
  var $, $$, $$$, CompositeDisposable, Disposable, Emitter, OptionsView, PreviewMessageView, PreviewView, ScrollView, SelectRendererView, TextEditor, TextEditorView, View, allowUnsafeEval, analyticsWriteKey, path, pkg, renderers, util, version, _, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), Emitter = _ref.Emitter, Disposable = _ref.Disposable, CompositeDisposable = _ref.CompositeDisposable, TextEditor = _ref.TextEditor;

  _ref1 = require('atom-space-pen-views'), $ = _ref1.$, $$ = _ref1.$$, $$$ = _ref1.$$$, View = _ref1.View, ScrollView = _ref1.ScrollView, TextEditorView = _ref1.TextEditorView;

  util = require('util');

  path = require('path');

  _ = require('underscore-plus');

  renderers = require('./renderer');

  PreviewMessageView = require('./preview-message-view');

  OptionsView = require('./options-view');

  SelectRendererView = require('./select-renderer-view.coffee');

  allowUnsafeEval = require('loophole').allowUnsafeEval;

  analyticsWriteKey = "bp0dj6lufc";

  pkg = require("../package");

  version = pkg.version;

  PreviewView = (function(_super) {
    var htmlPreviewContainer, messageView, optionsView, selectRendererView;

    __extends(PreviewView, _super);

    function PreviewView() {
      this.renderPreviewWithRenderer = __bind(this.renderPreviewWithRenderer, this);
      this.renderPreview = __bind(this.renderPreview, this);
      this.hideViewPreview = __bind(this.hideViewPreview, this);
      this.renderViewForPreview = __bind(this.renderViewForPreview, this);
      this.handleTabChanges = __bind(this.handleTabChanges, this);
      this.changeHandler = __bind(this.changeHandler, this);
      return PreviewView.__super__.constructor.apply(this, arguments);
    }

    PreviewView.prototype.textEditor = document.createElement('atom-text-editor');

    messageView = null;

    optionsView = null;

    selectRendererView = null;

    htmlPreviewContainer = null;

    PreviewView.prototype.lastEditor = null;

    PreviewView.prototype.lastRendererName = null;

    PreviewView.prototype.matchedRenderersCache = {};

    PreviewView.prototype.emitter = new Emitter;

    PreviewView.prototype.disposables = new CompositeDisposable;

    PreviewView.prototype.initialize = function() {
      var Analytics, uuid;
      this.classList.add('atom-preview-container');
      this.activeItemSubscription = atom.workspace.onDidChangeActivePaneItem((function(_this) {
        return function() {
          return _this.handleTabChanges();
        };
      })(this));
      atom.config.observe('preview.refreshDebouncePeriod', (function(_this) {
        return function(wait) {
          return _this.debouncedRenderPreview = _.debounce(_this.renderPreview.bind(_this), wait);
        };
      })(this));
      this.self = $(this);
      this.editorContents = $(this.textEditor);
      this.appendChild(this.textEditor);
      this.htmlPreviewContainer = $$(function() {
        return this.div((function(_this) {
          return function() {
            return _this.div("Empty HTML Preview...");
          };
        })(this));
      });
      this.self.append(this.htmlPreviewContainer);
      this.htmlPreviewContainer.hide();
      this.messageView = new PreviewMessageView();
      this.self.append(this.messageView);
      this.optionsView = new OptionsView(this);
      this.selectRendererView = new SelectRendererView(this);
      this.showLoading();
      Analytics = null;
      allowUnsafeEval(function() {
        return Analytics = require('analytics-node');
      });
      this.analytics = new Analytics(analyticsWriteKey);
      if (!atom.config.get('preview._analyticsUserId')) {
        uuid = require('node-uuid');
        atom.config.set('preview._analyticsUserId', uuid.v4());
      }
      atom.config.observe('preview._analyticsUserId', {}, (function(_this) {
        return function(userId) {
          return _this.analytics.identify({
            userId: userId
          });
        };
      })(this));
      this.renderPreview();
      return this;
    };

    PreviewView.prototype.changeHandler = function() {
      return this.debouncedRenderPreview();
    };

    PreviewView.prototype.onDidChangeTitle = function(callback) {
      return this.emitter.on('did-change-title', callback);
    };

    PreviewView.prototype.handleEvents = function() {
      var currEditor;
      currEditor = atom.workspace.getActiveTextEditor();
      if (currEditor != null) {
        this.disposables.add(currEditor.getBuffer().onDidStopChanging((function(_this) {
          return function() {
            if (atom.config.get('preview.liveUpdate')) {
              return _this.changeHandler();
            }
          };
        })(this)));
        this.disposables.add(currEditor.onDidChangePath((function(_this) {
          return function() {
            return _this.emitter.emit('did-change-title');
          };
        })(this)));
        this.disposables.add(currEditor.getBuffer().onDidSave((function(_this) {
          return function() {
            if (!atom.config.get('preview.liveUpdate')) {
              return _this.changeHandler();
            }
          };
        })(this)));
        return this.disposables.add(currEditor.getBuffer().onDidReload((function(_this) {
          return function() {
            if (!atom.config.get('preview.liveUpdate')) {
              return _this.changeHandler();
            }
          };
        })(this)));
      }
    };

    PreviewView.prototype.handleTabChanges = function() {
      var currEditor, updateOnTabChange;
      updateOnTabChange = atom.config.get('preview.updateOnTabChange');
      if (updateOnTabChange) {
        currEditor = atom.workspace.getActiveTextEditor();
        if (currEditor != null) {
          this.disposables.dispose();
          this.handleEvents();
          return this.changeHandler();
        }
      }
    };

    PreviewView.prototype.toggleOptions = function() {
      return this.optionsView.toggle();
    };

    PreviewView.prototype.selectRenderer = function() {
      return this.selectRendererView.attach();
    };

    PreviewView.prototype.showError = function(result) {
      var failureMessage, stackDump;
      failureMessage = result && result.message ? '<div class="text-error preview-text-error">' + result.message.replace(/\n/g, '<br/>') + '</div>' : "";
      stackDump = result && result.stack ? '<div class="text-warning preview-text-warning">' + result.stack.replace(/\n/g, '<br/>') + '</div>' : "";
      this.showMessage();
      return this.messageView.message.html($$$(function() {
        return this.div({
          "class": 'preview-spinner',
          style: 'text-align: center'
        }, (function(_this) {
          return function() {
            _this.span({
              "class": 'loading loading-spinner-large inline-block'
            });
            _this.div({
              "class": 'text-highlight preview-text-highlight'
            }, 'Previewing Failed\u2026');
            if (failureMessage != null) {
              _this.raw(failureMessage);
            }
            if (stackDump != null) {
              return _this.raw(stackDump);
            }
          };
        })(this));
      }));
    };

    PreviewView.prototype.showLoading = function() {
      this.showMessage();
      return this.messageView.message.html($$$(function() {
        return this.div({
          "class": 'preview-spinner',
          style: 'text-align: center'
        }, (function(_this) {
          return function() {
            _this.span({
              "class": 'loading loading-spinner-large inline-block'
            });
            return _this.div({
              "class": 'text-highlight preview-text-highlight'
            }, 'Loading Preview\u2026');
          };
        })(this));
      }));
    };

    PreviewView.prototype.showMessage = function() {
      if (!this.messageView.hasParent()) {
        return this.self.append(this.messageView);
      }
    };

    PreviewView.prototype.hideMessage = function() {
      if (this.messageView.hasParent()) {
        return this.messageView.detach();
      }
    };

    PreviewView.prototype.renderViewForPreview = function(view) {
      this.editorContents.hide();
      this.htmlPreviewContainer.show();
      return this.htmlPreviewContainer.html(view);
    };

    PreviewView.prototype.hideViewPreview = function() {
      this.htmlPreviewContainer.hide();
      return this.editorContents.show();
    };

    PreviewView.prototype.getTitle = function() {
      return "Atom Preview";
    };

    PreviewView.prototype.getEditor = function() {
      return this.textEditor.getModel();
    };

    PreviewView.prototype.getPath = function() {
      if (this.getEditor() != null) {
        return this.getEditor().getPath();
      }
    };

    PreviewView.prototype.getURI = function() {
      return "atom://atom-preview";
    };

    PreviewView.prototype.focus = function() {
      return false;
    };

    PreviewView.prototype.destroy = function() {
      this.messageView.detach();
      this.activeItemSubscription.dispose();
      return this.disposables.dispose();
    };

    PreviewView.prototype.renderPreview = function() {
      return this.renderPreviewWithRenderer("Default");
    };

    PreviewView.prototype.renderPreviewWithRenderer = function(rendererName) {
      var cEditor, callback, e, editor, extension, filePath, grammar, renderer, spos, text;
      this.emitter.emit('did-change-title');
      cEditor = atom.workspace.getActiveTextEditor();
      editor = this.getEditor();
      if ((cEditor != null) && cEditor !== editor && cEditor instanceof TextEditor) {
        this.lastEditor = cEditor;
      } else {
        cEditor = this.lastEditor;
      }
      if (cEditor == null) {
        return this.showError({
          message: "Please select your Text Editor view to render a preview of your code"
        });
      } else {
        text = cEditor.getText();
        spos = editor.getScrollTop();
        this.showLoading();
        this.emitter.emit('did-change-title');
        callback = (function(_this) {
          return function(error, result) {
            var focusOnEditor, grammar, outLang;
            _this.hideMessage();
            focusOnEditor = function() {};
            if (error != null) {
              focusOnEditor();
              return _this.showError(error);
            }
            if (typeof result === "string") {
              outLang = renderer.lang();
              grammar = atom.grammars.selectGrammar("source." + outLang, result);
              editor.setGrammar(grammar);
              editor.setText(result);
              editor.setScrollTop(spos);
              _this.hideViewPreview();
              return focusOnEditor();
            } else if (result instanceof View) {
              _this.renderViewForPreview(result);
              return focusOnEditor();
            } else {
              _this.hideViewPreview();
              focusOnEditor();
              console.log('unsupported result', result);
              return _this.showError(new Error("Unsupported result type."));
            }
          };
        })(this);
        try {
          grammar = cEditor.getGrammar().name;
          filePath = cEditor.getPath();
          extension = path.extname(filePath);
          renderer = null;
          if (rendererName === "Default") {
            renderer = this.matchedRenderersCache[filePath];
            if (renderer == null) {
              renderer = renderers.findRenderer(grammar, extension);
            }
          } else {
            renderer = renderers.grammars[rendererName];
          }
          this.matchedRenderersCache[filePath] = renderer;
          if (text == null) {
            this.analytics.track({
              userId: atom.config.get('preview._analyticsUserId'),
              event: 'Nothing to render',
              properties: {
                grammar: grammar,
                extension: extension,
                version: version,
                label: "" + grammar + "|" + extension
              }
            });
            return this.showError(new Error("Nothing to render."));
          }
          if (renderer != null) {
            this.analytics.track({
              userId: atom.config.get('preview._analyticsUserId'),
              event: 'Preview',
              properties: {
                grammar: grammar,
                extension: extension,
                version: version,
                label: "" + grammar + "|" + extension,
                category: version
              }
            });
            return renderer.render(text, filePath, callback);
          } else {
            this.analytics.track({
              userId: atom.config.get('preview._analyticsUserId'),
              event: 'Renderer not found',
              properties: {
                grammar: grammar,
                extension: extension,
                version: version,
                label: "" + grammar + "|" + extension,
                category: version
              }
            });
            return this.showError(new Error("Can not find renderer for grammar " + grammar + "."));
          }
        } catch (_error) {
          e = _error;
          this.analytics.track({
            userId: atom.config.get('preview._analyticsUserId'),
            event: 'Error',
            properties: {
              error: e,
              vesion: version,
              label: "" + grammar + "|" + extension,
              category: version
            }
          });
          return this.showError(e);
        }
      }
    };

    return PreviewView;

  })(HTMLElement);

  module.exports = document.registerElement('atom-preview-editor', {
    prototype: PreviewView.prototype
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9wcmV2aWV3L2xpYi9wcmV2aWV3LXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDZQQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBeUQsT0FBQSxDQUFRLE1BQVIsQ0FBekQsRUFBQyxlQUFBLE9BQUQsRUFBVSxrQkFBQSxVQUFWLEVBQXNCLDJCQUFBLG1CQUF0QixFQUEyQyxrQkFBQSxVQUEzQyxDQUFBOztBQUFBLEVBQ0EsUUFBaUQsT0FBQSxDQUFRLHNCQUFSLENBQWpELEVBQUMsVUFBQSxDQUFELEVBQUksV0FBQSxFQUFKLEVBQVEsWUFBQSxHQUFSLEVBQWEsYUFBQSxJQUFiLEVBQW1CLG1CQUFBLFVBQW5CLEVBQStCLHVCQUFBLGNBRC9CLENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FGUCxDQUFBOztBQUFBLEVBR0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBSFAsQ0FBQTs7QUFBQSxFQUlBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FKSixDQUFBOztBQUFBLEVBS0EsU0FBQSxHQUFZLE9BQUEsQ0FBUSxZQUFSLENBTFosQ0FBQTs7QUFBQSxFQU1BLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSx3QkFBUixDQU5yQixDQUFBOztBQUFBLEVBT0EsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQVBkLENBQUE7O0FBQUEsRUFRQSxrQkFBQSxHQUFxQixPQUFBLENBQVEsK0JBQVIsQ0FSckIsQ0FBQTs7QUFBQSxFQVNDLGtCQUFtQixPQUFBLENBQVEsVUFBUixFQUFuQixlQVRELENBQUE7O0FBQUEsRUFVQSxpQkFBQSxHQUFvQixZQVZwQixDQUFBOztBQUFBLEVBV0EsR0FBQSxHQUFNLE9BQUEsQ0FB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

//# sourceURL=/Users/benfallon/.atom/packages/preview/lib/preview-view.coffee

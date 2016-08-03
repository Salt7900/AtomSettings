(function() {
  var $, View, allowUnsafeEval, allowUnsafeNewFunction, fs, path, rCache, temp, _, _ref, _ref1;

  _ref = require('atom-space-pen-views'), $ = _ref.$, View = _ref.View;

  path = require('path');

  temp = require("temp").track();

  fs = require('fs');

  _ref1 = require('loophole'), allowUnsafeEval = _ref1.allowUnsafeEval, allowUnsafeNewFunction = _ref1.allowUnsafeNewFunction;

  _ = require('underscore-plus');

  rCache = {};

  module.exports = {
    allRenderers: function() {
      var gs, r;
      gs = [];
      for (r in this.grammars) {
        gs.push(this.grammars[r]);
      }
      return gs;
    },
    findByGrammar: function(grammar) {
      return this.grammars[grammar];
    },
    findAllByExtention: function(extension) {
      var gs;
      gs = this.allRenderers();
      return _.filter(gs, function(renderer) {
        var exts;
        exts = renderer.exts;
        if (exts == null) {
          return false;
        } else {
          return exts.test(extension);
        }
      });
    },
    findRenderer: function(grammar, extension) {
      var renderer, renderers;
      renderer = this.findByGrammar(grammar);
      if (renderer == null) {
        renderers = this.findAllByExtention(extension);
        if (renderers.length > 0) {
          return renderers[0];
        } else {
          return null;
        }
      } else {
        return renderer;
      }
    },
    grammars: {
      'CoffeeScript': {
        render: function(text, filepath, cb) {
          var coffeescript, result;
          coffeescript = require('coffee-script');
          result = coffeescript.compile(text);
          return cb(null, result);
        },
        exts: /\.(coffee)$/i,
        lang: function() {
          return 'js';
        }
      },
      'CoffeeScript (Literate)': {
        render: function(text, filepath, cb) {
          var coffeescript, result;
          coffeescript = require('coffee-script');
          result = coffeescript.compile(text, {
            literate: true
          });
          return cb(null, result);
        },
        exts: /\.(litcoffee)$/i,
        lang: function() {
          return 'js';
        }
      },
      'CoffeeScript (JSX)': {
        render: function(text, filepath, cb) {
          var react, result;
          react = require('coffee-react');
          result = react.compile(text);
          return cb(null, result);
        },
        exts: /\.(cjsx)$/i,
        lang: function() {
          return 'js';
        }
      },
      'CoffeeScript (CJSX)': {
        render: function(text, filepath, cb) {
          var react, result;
          react = require('coffee-react');
          result = react.compile(text);
          return cb(null, result);
        },
        exts: /\.(cjsx)$/i,
        lang: function() {
          return 'js';
        }
      },
      'TypeScript': {
        render: function(text, filepath, cb) {
          var result, ts;
          ts = allowUnsafeNewFunction(function() {
            return allowUnsafeEval(function() {
              return require('typestring');
            });
          });
          result = allowUnsafeEval(function() {
            return ts.compile(text);
          });
          return cb(null, result);
        },
        lang: function() {
          return 'js';
        },
        exts: /\.(ts)$/i
      },
      'LESS': {
        render: function(text, filepath, cb) {
          var atomVariablesPath, less, options, resourcePath;
          less = require('less');
          resourcePath = atom.themes.resourcePath;
          atomVariablesPath = path.resolve(resourcePath, 'static', 'variables');
          options = {
            paths: ['.', atomVariablesPath]
          };
          return less.render(text, options).then(function(output) {
            return cb(null, output.css);
          })["catch"](function(error) {
            return cb(error);
          });
        },
        lang: function() {
          return 'css';
        },
        exts: /\.(less)$/i
      },
      'Jade': {
        render: function(text, filepath, cb) {
          var fn, jade, options, result;
          jade = allowUnsafeNewFunction(function() {
            return allowUnsafeEval(function() {
              return require('jade');
            });
          });
          options = {
            filename: filepath,
            pretty: true
          };
          fn = allowUnsafeNewFunction(function() {
            return allowUnsafeEval(function() {
              return jade.compile(text, options);
            });
          });
          result = allowUnsafeNewFunction(function() {
            return allowUnsafeEval(function() {
              return fn();
            });
          });
          return cb(null, result);
        },
        lang: function() {
          return 'html';
        },
        exts: /\.(jade)$/i
      },
      'Pug': {
        render: function(text, filepath, cb) {
          var fn, options, pug, result;
          pug = allowUnsafeNewFunction(function() {
            return allowUnsafeEval(function() {
              return require('pug');
            });
          });
          options = {
            filename: filepath,
            pretty: true
          };
          fn = allowUnsafeNewFunction(function() {
            return allowUnsafeEval(function() {
              return pug.compile(text, options);
            });
          });
          result = allowUnsafeNewFunction(function() {
            return allowUnsafeEval(function() {
              return fn();
            });
          });
          return cb(null, result);
        },
        lang: function() {
          return 'html';
        },
        exts: /\.(pug)$/i
      },
      'Dogescript': {
        render: function(text, filepath, cb) {
          var beautify, dogescript, result;
          dogescript = require("dogescript");
          beautify = true;
          result = dogescript(text, beautify);
          return cb(null, result);
        },
        exts: /\.(djs)$/i,
        lang: function() {
          return 'js';
        }
      },
      'DSON': {
        render: function(text, filepath, cb) {
          var DSON, d, e, result;
          DSON = require("dogeon");
          try {
            d = DSON.parse(text);
            result = JSON.stringify(d);
            return cb(null, result);
          } catch (_error) {
            e = _error;
            return cb(e, null);
          }
        },
        exts: /\.(dson)$/i,
        lang: function() {
          return 'json';
        }
      },
      'Stylus': {
        render: function(text, filepath, cb) {
          var stylus;
          stylus = require("stylus");
          return stylus(text).set('filename', filepath).render(function(err, css) {
            return cb(err, css);
          });
        },
        exts: /\.(styl)$/i,
        lang: function() {
          return 'css';
        }
      },
      'Babel ES6 JavaScript': {
        render: function(text, filepath, cb) {
          var babel, options, result;
          babel = require('babel-core');
          options = {
            presets: [require('babel-preset-es2015'), require('babel-preset-react'), require('babel-preset-stage-0'), require('babel-preset-stage-1'), require('babel-preset-stage-2'), require('babel-preset-stage-3')]
          };
          result = babel.transform(text, options);
          return cb(null, result.code);
        },
        exts: /\.(js|jsx|es6|es)$/i,
        lang: function() {
          return 'js';
        }
      },
      'EmberScript': {
        render: function(text, filepath, cb) {
          var csAst, em, jsAst, jsContent, options;
          em = require('ember-script');
          options = {
            bare: false,
            raw: false,
            sourceMap: false
          };
          csAst = em.parse(text, {
            bare: options.bare,
            raw: options.raw || options.sourceMap
          });
          jsAst = em.compile(csAst, {
            bare: options.bare
          });
          jsContent = em.js(jsAst);
          return cb(null, jsContent);
        },
        exts: /\.(em)$/i,
        lang: function() {
          return 'js';
        }
      },
      'SpacePen': {
        render: function(text, filepath, cb) {
          var e, generateFilepath;
          try {
            generateFilepath = function(filepath, cb) {
              var cd, extension, newFilename, newFilepath;
              extension = path.extname(filepath);
              cd = path.dirname(filepath);
              newFilename = "preview-temp-file-" + (+new Date()) + extension;
              newFilepath = path.resolve(cd, newFilename);
              return cb(null, newFilepath);
            };
            return generateFilepath(filepath, function(err, fp) {
              if (err != null) {
                return cb(err, null);
              }
              return fs.writeFile(fp, text || "", function(err) {
                var e, view;
                if (err != null) {
                  return cb(err, null);
                }
                try {
                  View = require(fp);
                  view = new View();
                  if (view instanceof View) {
                    cb(null, view);
                  } else {
                    cb(new Error("Is not a SpacePen View"), null);
                  }
                  fs.unlink(fp);
                } catch (_error) {
                  e = _error;
                  cb(e, null);
                  fs.unlink(fp);
                }
              });
            });
          } catch (_error) {
            e = _error;
            return cb(e, null);
          }
        },
        exts: /\.(coffee|js)$/i
      },
      'LiveScript': {
        render: function(text, filepath, cb) {
          var livescript, options, result;
          livescript = require('livescript');
          options = {
            filename: filepath,
            bare: true
          };
          result = allowUnsafeNewFunction(function() {
            return livescript.compile(text, options);
          });
          return cb(null, result);
        },
        exts: /\.(ls)$/i,
        lang: function() {
          return 'js';
        }
      },
      'ng-classify (coffee)': {
        render: function(text, filepath, cb) {
          var ngClassify, result;
          ngClassify = require('ng-classify');
          result = ngClassify(text) + '\n';
          return cb(null, result);
        },
        exts: /\.(coffee)$/i,
        lang: function() {
          return 'coffee';
        }
      },
      'ng-classify (js)': {
        render: function(text, filepath, cb) {
          var coffeescript, ngClassify, result;
          ngClassify = require('ng-classify');
          result = ngClassify(text);
          coffeescript = require('coffee-script');
          result = coffeescript.compile(result);
          return cb(null, result);
        },
        exts: /\.(coffee)$/i,
        lang: function() {
          return 'js';
        }
      },
      'YAML': {
        render: function(text, filepath, cb) {
          var e, json, jsyaml;
          jsyaml = require('js-yaml');
          try {
            json = jsyaml.safeLoad(text);
            return cb(null, JSON.stringify(json, null, 2));
          } catch (_error) {
            e = _error;
            return cb(null, e.message);
          }
        },
        exts: /\.(yaml)$/i,
        lang: function() {
          return 'json';
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9wcmV2aWV3L2xpYi9yZW5kZXJlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsd0ZBQUE7O0FBQUEsRUFBQSxPQUFZLE9BQUEsQ0FBUSxzQkFBUixDQUFaLEVBQUMsU0FBQSxDQUFELEVBQUksWUFBQSxJQUFKLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FEUCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQWUsQ0FBQyxLQUFoQixDQUFBLENBRlAsQ0FBQTs7QUFBQSxFQUdBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUhMLENBQUE7O0FBQUEsRUFJQSxRQUE0QyxPQUFBLENBQVEsVUFBUixDQUE1QyxFQUFDLHdCQUFBLGVBQUQsRUFBa0IsK0JBQUEsc0JBSmxCLENBQUE7O0FBQUEsRUFLQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBTEosQ0FBQTs7QUFBQSxFQU9BLE1BQUEsR0FBUyxFQVBULENBQUE7O0FBQUEsRUFTQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxZQUFBLEVBQWMsU0FBQSxHQUFBO0FBQ1osVUFBQSxLQUFBO0FBQUEsTUFBQSxFQUFBLEdBQUssRUFBTCxDQUFBO0FBRUEsV0FBQSxrQkFBQSxHQUFBO0FBQ0UsUUFBQSxFQUFFLENBQUMsSUFBSCxDQUFRLElBQUMsQ0FBQSxRQUFTLENBQUEsQ0FBQSxDQUFsQixDQUFBLENBREY7QUFBQSxPQUZBO0FBSUEsYUFBTyxFQUFQLENBTFk7SUFBQSxDQUFkO0FBQUEsSUFNQSxhQUFBLEVBQWUsU0FBQyxPQUFELEdBQUE7YUFDYixJQUFDLENBQUEsUUFBUyxDQUFBLE9BQUEsRUFERztJQUFBLENBTmY7QUFBQSxJ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

//# sourceURL=/Users/benfallon/.atom/packages/preview/lib/renderer.coffee

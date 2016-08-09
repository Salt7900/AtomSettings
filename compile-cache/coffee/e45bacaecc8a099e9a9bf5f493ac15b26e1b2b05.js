(function() {
  var CompositeDisposable, cssListView, fs, marked;

  CompositeDisposable = require('atom').CompositeDisposable;

  marked = require('marked');

  cssListView = require('./cssListView');

  fs = require('fs');

  module.exports = {
    subscriptions: null,
    config: {
      requires: {
        title: 'NPM/Require',
        type: 'array',
        "default": []
      },
      types: {
        title: 'Markdown File Types',
        type: 'array',
        "default": []
      },
      filepaths: {
        title: 'Require filepath for markdown themes',
        type: 'string',
        "default": './sample-md-filepath.coffee'
      },
      cssURL: {
        title: 'Choose CSS URL',
        type: 'string',
        enums: ['markdown.css'],
        "default": 'markdown.css'
      }
    },
    activate: function(state) {
      var key, requires, val, _ref, _results;
      this.subscriptions = new CompositeDisposable;
      this.cssList = [];
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'pp-markdown:css': (function(_this) {
          return function() {
            return _this.selectCSS();
          };
        })(this)
      }));
      if (requires = atom.config.get('pp-markdown.filepaths')) {
        this.filePaths = require(requires);
      }
      _ref = this.filePaths;
      _results = [];
      for (key in _ref) {
        val = _ref[key];
        atom.config.getSchema('pp-markdown').properties.cssURL.enums.push(key);
        _results.push(this.cssList.push(key));
      }
      return _results;
    },
    toggle: function() {},
    selectCSS: function() {
      var _base;
      new cssListView(this.cssList);
      if (atom.workspace.getActivePaneItem().constructor.name === "HTMLEditor") {
        return typeof (_base = atom.workspace.getActivePaneItem()).refresh === "function" ? _base.refresh() : void 0;
      }
    },
    compile: function(src, options, data, fileName, quickPreview, hyperLive, editor, view) {
      var markedSrc;
      marked.setOptions(options);
      markedSrc = '';
      if (quickPreview || hyperLive || fileName.startsWith('browserplus~')) {
        markedSrc = src;
      } else {
        markedSrc = fs.readFileSync(fileName, 'utf-8').toString();
      }
      return {
        text: marked(markedSrc)
      };
    },
    consumeAddPreview: function(preview) {
      var requires;
      this.preview = preview;
      requires = {
        pkgName: 'markdown',
        fileTypes: (function() {
          var types;
          types = atom.config.get('pp.markdown-types') || [];
          return types.concat(['md', 'markdown']);
        })(),
        html: {
          ext: 'html',
          hyperLive: true,
          quickPreview: true,
          exe: this.compile
        },
        browser: {
          hyperLive: true,
          quickPreview: true,
          noPreview: true,
          exe: (function(_this) {
            return function(src, options, data, fileName, quickPreview, hyperLive, editor, view) {
              var cssURL, result, _ref;
              if (!(cssURL = _this.filePaths[atom.config.get('pp-markdown.cssURL')])) {
                cssURL = "file:///" + (atom.packages.getActivePackage('pp-markdown').path) + "/resources/markdown.css";
              }
              result = _this.compile(src, options, data, fileName, quickPreview, hyperLive, editor, view);
              return {
                html: (_ref = atom.packages.getActivePackage('pp')) != null ? _ref.mainModule.makeHTML({
                  html: result.text,
                  css: [cssURL]
                }) : void 0
              };
            };
          })(this)
        }
      };
      return this.ids = this.preview(requires);
    },
    deactivate: function() {
      return preview({
        deactivate: this.ids
      });
    },
    serialize: function() {}
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2JlbmZhbGxvbi8uYXRvbS9wYWNrYWdlcy9wcC1tYXJrZG93bi9saWIvcHAtbWFya2Rvd24uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRDQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FEVCxDQUFBOztBQUFBLEVBRUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxlQUFSLENBRmQsQ0FBQTs7QUFBQSxFQUdBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUhMLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxhQUFBLEVBQWUsSUFBZjtBQUFBLElBQ0EsTUFBQSxFQUNFO0FBQUEsTUFBQSxRQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxhQUFQO0FBQUEsUUFDQSxJQUFBLEVBQU0sT0FETjtBQUFBLFFBRUEsU0FBQSxFQUFRLEVBRlI7T0FERjtBQUFBLE1BS0EsS0FBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8scUJBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxPQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsRUFGVDtPQU5GO0FBQUEsTUFVQSxTQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxzQ0FBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyw2QkFGVDtPQVhGO0FBQUEsTUFlQSxNQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxnQkFBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLEtBQUEsRUFBTSxDQUFDLGNBQUQsQ0FGTjtBQUFBLFFBR0EsU0FBQSxFQUFTLGNBSFQ7T0FoQkY7S0FGRjtBQUFBLElBdUJBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUNSLFVBQUEsa0NBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFBakIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxFQURYLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQW9DO0FBQUEsUUFBQSxpQkFBQSxFQUFtQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsU0FBRCxDQUFBLEVBQUg7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQjtPQUFwQyxDQUFuQixDQUZBLENBQUE7QUFHQSxNQUFBLElBQWlDLFFBQUEsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsdUJBQWhCLENBQTVDO0FBQUEsUUFBQSxJQUFDLENBQUEsU0FBRCxHQUFhLE9BQUEsQ0FBUSxRQUFSLENBQWIsQ0FBQTtPQUhBO0FBSUE7QUFBQTtXQUFBLFdBQUE7d0JBQUE7QUFDRSxRQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBWixDQUFzQixhQUF0QixDQUFvQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQTdELENBQWtFLEdBQWxFLENBQUEsQ0FBQTtBQUFBLHNCQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLEdBQWQsRUFEQSxDQURGO0FBQUE7c0JBTFE7SUFBQSxDQXZCVjtBQUFBLElBZ0NBLE1BQUEsRUFBUSxTQUFBLEdBQUEsQ0FoQ1I7QUFBQSxJQWtDQSxTQUFBLEVBQVcsU0FBQSxHQUFBO0FBQ1QsVUFBQSxLQUFBO0FBQUEsTUFBSSxJQUFBLFdBQUEsQ0FBWSxJQUFDLENBQUEsT0FBYixDQUFKLENBQUE7QUFFQSxNQUFBLElBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBZixDQUFBLENBQWtDLENBQUMsV0FBVyxDQUFDLElBQS9DLEtBQXVELFlBQTFEO2lHQUNvQyxDQUFDLG1CQURyQztPQUhTO0lBQUEsQ0FsQ1g7QUFBQSxJQXdDQSxPQUFBLEVBQVMsU0FBQyxHQUFELEVBQUssT0FBTCxFQUFhLElBQWIsRUFBa0IsUUFBbEIsRUFBMkIsWUFBM0IsRUFBd0MsU0FBeEMsRUFBa0QsTUFBbEQsRUFBeUQsSUFBekQsR0FBQTtBQUNQLFVBQUEsU0FBQTtBQUFBLE1BQUEsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsT0FBbEIsQ0FBQSxDQUFBO0FBQUEsTUFTQSxTQUFBLEdBQVksRUFUWixDQUFBO0FBVUEsTUFBQSxJQUFHLFlBQUEsSUFBZ0IsU0FBaEIsSUFBNkIsUUFBUSxDQUFDLFVBQVQsQ0FBb0IsY0FBcEIsQ0FBaEM7QUFDRSxRQUFBLFNBQUEsR0FBWSxHQUFaLENBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxTQUFBLEdBQVksRUFBRSxDQUFDLFlBQUgsQ0FBZ0IsUUFBaEIsRUFBeUIsT0FBekIsQ0FBaUMsQ0FBQyxRQUFsQyxDQUFBLENBQVosQ0FIRjtPQVZBO2FBZUE7QUFBQSxRQUFBLElBQUEsRUFBTyxNQUFBLENBQU8sU0FBUCxDQUFQO1FBaEJPO0lBQUEsQ0F4Q1Q7QUFBQSxJQTBEQSxpQkFBQSxFQUFtQixTQUFFLE9BQUYsR0FBQTtBQUNqQixVQUFBLFFBQUE7QUFBQSxNQURrQixJQUFDLENBQUEsVUFBQSxPQUNuQixDQUFBO0FBQUEsTUFBQSxRQUFBLEdBQ0U7QUFBQSxRQUFBLE9BQUEsRUFBUyxVQUFUO0FBQUEsUUFDQSxTQUFBLEVBQWMsQ0FBQSxTQUFBLEdBQUE7QUFDWixjQUFBLEtBQUE7QUFBQSxVQUFBLEtBQUEsR0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsbUJBQWhCLENBQUEsSUFBd0MsRUFBaEQsQ0FBQTtpQkFDQSxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsSUFBRCxFQUFNLFVBQU4sQ0FBYixFQUZZO1FBQUEsQ0FBQSxDQUFILENBQUEsQ0FEWDtBQUFBLFFBWUEsSUFBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQUssTUFBTDtBQUFBLFVBQ0EsU0FBQSxFQUFXLElBRFg7QUFBQSxVQUVBLFlBQUEsRUFBYyxJQUZkO0FBQUEsVUFHQSxHQUFBLEVBQUssSUFBQyxDQUFBLE9BSE47U0FiRjtBQUFBLFFBa0JBLE9BQUEsRUFDRTtBQUFBLFVBQUEsU0FBQSxFQUFXLElBQVg7QUFBQSxVQUNBLFlBQUEsRUFBYyxJQURkO0FBQUEsVUFFQSxTQUFBLEVBQVcsSUFGWDtBQUFBLFVBR0EsR0FBQSxFQUFLLENBQUEsU0FBQSxLQUFBLEdBQUE7bUJBQUEsU0FBQyxHQUFELEVBQUssT0FBTCxFQUFhLElBQWIsRUFBa0IsUUFBbEIsRUFBMkIsWUFBM0IsRUFBd0MsU0FBeEMsRUFBa0QsTUFBbEQsRUFBeUQsSUFBekQsR0FBQTtBQUNILGtCQUFBLG9CQUFBO0FBQUEsY0FBQSxJQUFBLENBQUEsQ0FBTyxNQUFBLEdBQVMsS0FBQyxDQUFBLFNBQVUsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isb0JBQWhCLENBQUEsQ0FBcEIsQ0FBUDtBQUNFLGdCQUFBLE1BQUEsR0FBVSxVQUFBLEdBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFkLENBQStCLGFBQS9CLENBQTZDLENBQUMsSUFBL0MsQ0FBVCxHQUE2RCx5QkFBdkUsQ0FERjtlQUFBO0FBQUEsY0FFQSxNQUFBLEdBQVMsS0FBQyxDQUFBLE9BQUQsQ0FBUyxHQUFULEVBQWEsT0FBYixFQUFxQixJQUFyQixFQUEwQixRQUExQixFQUFtQyxZQUFuQyxFQUFnRCxTQUFoRCxFQUEwRCxNQUExRCxFQUFpRSxJQUFqRSxDQUZULENBQUE7cUJBR0E7QUFBQSxnQkFBQSxJQUFBLDhEQUEwQyxDQUFFLFVBQVUsQ0FBQyxRQUFqRCxDQUNKO0FBQUEsa0JBQUEsSUFBQSxFQUFNLE1BQU0sQ0FBQyxJQUFiO0FBQUEsa0JBQ0EsR0FBQSxFQUFLLENBQUMsTUFBRCxDQURMO2lCQURJLFVBQU47Z0JBSkc7WUFBQSxFQUFBO1VBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUhMO1NBbkJGO09BREYsQ0FBQTthQStCQSxJQUFDLENBQUEsR0FBRCxHQUFPLElBQUMsQ0FBQSxPQUFELENBQVMsUUFBVCxFQWhDVTtJQUFBLENBMURuQjtBQUFBLElBNEZBLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixPQUFBLENBQVE7QUFBQSxRQUFBLFVBQUEsRUFBWSxJQUFDLENBQUEsR0FBYjtPQUFSLEVBRFU7SUFBQSxDQTVGWjtBQUFBLElBK0ZBLFNBQUEsRUFBVyxTQUFBLEdBQUEsQ0EvRlg7R0FORixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/benfallon/.atom/packages/pp-markdown/lib/pp-markdown.coffee

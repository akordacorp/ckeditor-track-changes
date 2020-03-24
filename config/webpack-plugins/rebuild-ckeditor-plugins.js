/**
 * This WebPack plugin ensures rebuilding of the typescript-based ckeditor plugins if the code changes
 *
 * We run webpack for each typescript plugin in order to create individual plugin.js files. This allows us to use
 * modern JS/Typescript features in the plugin, such as imports and libraries.
 *
 * If we modify a typescript plugin.ts file, this will trigger the webpack dev server watcher, and this class taps into
 * that event and checks if there are any files that are NOT emitted plugin.js files resulting from the build.
 * In which case, we force a rebuild of the ckeditor plugins.
 *
 * But we need to be careful not to send WebPack Dev Server into an infinite loop.
 * What we're trying to avoid is that we trigger a rebuild based on the emitted plugin.js files, because then
 * this would cause the plugin.js files to change again, which triggers a rebuild, which cause the plugin.js
 * files to change, which triggers a rebuild...ad infinitum.
 *
 * So in this case, we only trigger the rebuild if there are any files that are not emitted plugin.js bundles
 */

const buildPlugins = require('../../scripts/plugins');

// Regex that will match the *js* files emitted from webpack build of ckeditor typescript plugin
const pluginRegex = /.*src\/plugins\/.*plugin\.js$/;
// Function that will return if the file provided does NOT match the regex (i.e., is not an emitted file)
const isNotCKEditorPluginJS = file => {
  return !pluginRegex.test(file);
};

class BuildCKEditorPlugins {
  apply(compiler) {
    // Used for dev server
    compiler.hooks.watchRun.tapAsync('Build CKEditor Plugins', (comp, callback) => {
      // Find the files changed on this watch
      const changedTimes = comp.watchFileSystem.watcher.mtimes;
      // If any are not the emitted plugin.js files, rebuild
      const rebuild = Object.keys(changedTimes).some(isNotCKEditorPluginJS);

      if (rebuild) {
        buildPlugins('development').then(callback);
      } else {
        callback();
      }
    });

    // Used for production build to ensure that CKEditor plugins are built.
    // This hook and the one above (for watch) are mutually exclusive.
    compiler.hooks.beforeRun.tapAsync('Build CKEditor Plugins', (comp, callback) => {
      buildPlugins().then(callback);
    });
  }
}

module.exports = BuildCKEditorPlugins;

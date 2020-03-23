/**
 * This is a simple executor of the plugins script, which builds the typescript ckeditor plugins
 * Note: the `buildPlugins` function returns a promise
 */
const chalk = require('react-dev-utils/chalk');
const buildPlugins = require('./plugins');

buildPlugins()
  .then(() => console.log(chalk.green('Successfully completed build of CKEditor Plugins')))
  .catch(() => {
    console.log(chalk.red('There was a problem building the CKEditor plugins.'));
  });

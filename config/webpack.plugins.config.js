const path = require('path');
const find = require('find');
const paths = require('../config/paths');
const chalk = require('react-dev-utils/chalk');

const pluginConfigs = [];

function createPluginConfig(pluginFile, mode = 'production') {
  return {
    entry: pluginFile,
    output: {
      path: pluginFile.replace('/plugin.ts', ''),
      filename: 'plugin.js',
    },
    mode,
    resolve: {
      // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
      extensions: ['.ts', '.js'],
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          oneOf: [
            {
              test: /\.(ts)$/,
              include: path.resolve(__dirname, '../src'),
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      forceAllTransforms: false, // for UglifyJS
                      modules: false,
                      useBuiltIns: 'usage',
                      corejs: 3,
                      debug: false,
                    },
                  ],
                  '@babel/preset-typescript',
                ],
                plugins: ['@babel/plugin-proposal-class-properties'],
                cacheDirectory: true,
                cacheCompression: false,
              },
            },
          ],
        },
      ],
    },
  };
}

module.exports = (mode = 'production') => {
  return new Promise(resolve => {
    // find all of the typescript CKEditor plugins and build them
    find.file(/plugin\.ts$/, paths.plugins, function(files) {
      files.forEach(file => {
        console.log(chalk.white.italic('Creating webpack config for building plugin:', file));
        const config = createPluginConfig(file, mode);
        pluginConfigs.push(config);
      });
      resolve(pluginConfigs);
    });
  });
};

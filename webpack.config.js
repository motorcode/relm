const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

if (process.env.NODE_ENV === 'production') {
  module.exports = [
    production(distEntries),
    production(examplesEntries),
  ];
} else {
  module.exports = development(examplesEntries);

  module.exports.devServer = {
    contentBase: 'examples/',
    inline: true,
  };
}

function common (tx) {
  return tx({
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },
    module: {
      loaders: [{
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: [
          /(node_modules)/,                         // Skip node modules
          path.resolve(__dirname, 'inferno.js'),    // Don't process compiled versions
          path.resolve(__dirname, 'main.js'),       // (for instance when required from the examples)
        ]
      }, {
        test: /\.json$/,
        loader: 'json'
      }]
    },
    externals: [
      /^babel.+$/,
    ]
  });
}

function development (tx) {
  return tx(common(function devTx (config) {
    config.devtool = '#eval';

    return config;
  }));
}

function production (tx) {
  return tx(common(function productionTx (config) {
    config.plugins = [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false, screw_ie8: true }
      })
    ];

    return config;
  }));
}

function distEntries (config) {
  config.name = 'dist';

  function readDir (dir, ext, f) {
    return _.reduce(fs.readdirSync(dir), function checkExtensionFirst (entries, filename) {
      if (filename.indexOf(ext) === -1) return entries;
      return f(entries, filename.replace(ext, ''));
    }, {});
  }

  config.entry = Object.assign.apply(Object, [
    {
      relm: './src/relm.js',
      list: './src/list.js',
      router: './src/router.js',
    },
    readDir('./src/plugins', '.js', function readPlugins (entries, filename) {
      entries[filename] = `./src/plugins/${filename}.js`;
      return entries;
    }),
    readDir('./src/ui', '.js', function readPlugins (entries, filename) {
      entries[`ui/${filename}`] = `./src/ui/${filename}.js`;
      return entries;
    }),
  ]);

  config.devtool = 'source-map';

  config.output = {
    filename: '[name].js',
    path: path.resolve('./dist'),
    sourceMapFilename: '[name].map',
    libraryTarget: 'umd',
  };

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'lodash',
      filename: 'lodash.js',
      minChunks (module, count) {
        return module.resource && module.resource.indexOf('lodash') !== -1 && count > 1;
      }
    })
  );

  return config;
}

function examplesEntries (config) {
  config.name = 'example';

  config.entry = {
    // todo: './examples/todo/app.js',
    starwars: './examples/starwars/app.js',
    http: './examples/http/app.js',
    quiz: './examples/quiz/app.js',
  };

  config.output = {
    filename: './[name]/app.dist.js',
    path: path.resolve(__dirname, './examples'),
    library: '[name]',
    libraryTarget: 'umd'
  };

  return config;
}

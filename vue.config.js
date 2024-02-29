const CompressionPlugin = require('compression-webpack-plugin');
const { defineConfig } = require('@vue/cli-service');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      const env = args[0];
      env['process.env'] = {
        ...env['process.env'],
        ...require(`./config.${process.env.NODE_ENV}.js`),
      };
      return args;
    });

    // Anpassung der Dateinamen für JavaScript-Dateien
    config.output.filename('js/app[id].js').chunkFilename('js/cf[id].js');
    /*     // optimization = {
        //   usedExports: true
        // }; */
    // Anpassung der Dateinamen für CSS-Dateien
    config.plugin('extract-css').tap(args => {
      args[0].filename = 'css/app[id].css';
      args[0].chunkFilename = 'css/cf[id].css';
      return args;
    });

    // Konfiguration für MiniCssExtractPlugin
    config.plugin('extract-css').use(MiniCssExtractPlugin, [{
      filename: 'css/app[id].css',
      chunkFilename: 'css/cf[id].css',
    }]);

    config.plugins.delete('prefetch');
    config.plugin('CompressionPlugin').use(CompressionPlugin, [{
      test: /\.(js|css|svg|html|json)(\?.*)?$/i,
      exclude: [/index\.html$/],
      deleteOriginalAssets: true,
      algorithm: 'gzip',
    }]);
    config.plugins.delete('brotli-compression');


  },

  // Konfiguration für das compression-webpack-plugin
  // configureWebpack: {
  //   plugins: [
  //     new CompressionPlugin({
  //       filename: '[path][base].gz',
  //       algorithm: 'gzip',
  //       test: /\.(js|css|html|svg|json)(\?.*)?$/i,
  //       minRatio: 0.8,
  //     }),
  //   ],
  // },



});


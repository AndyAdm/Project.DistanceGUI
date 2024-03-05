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

    if (process.env.NODE_ENV === 'production') {

      // Anpassung der Dateinamen für JavaScript-Dateien
      config.output.filename('js/app[id].js').chunkFilename('js/cf[id].js');
      /*     // optimization = {
          //   usedExports: true
          // }; */


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
    };

  },


});


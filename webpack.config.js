const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
  bundleEntry: path.join(__dirname, 'src/main.js'),
  bundleOutputPath: path.join(__dirname, 'dist'),
  bundleOutputFilename: 'main.js',
  htmlTemplateEntry: path.join(__dirname, 'src', 'index.html'),
  htmlTemplateOutput: path.join(__dirname, 'dist', 'index.html'),
  cssFilename: 'main.css'
}

function createWebpackConfig(environment) {
  const env = environment.dev ? 'dev' : 'prod';

  return {
    mode: getMode(env),
    devtool: getDevtool(env),
    entry: paths.bundleEntry,
    output: {
      path: paths.bundleOutputPath,
      filename: paths.bundleOutputFilename
    },
    module: {
      rules:[
        vueLoaderRule(),
        babelLoaderRule(),
        styleLoaderRule(env)
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['.js', '.vue', '.json']
    },
    plugins: getPlugins(env)
  };
};

function getMode(env) {
  return env === 'prod' ? 'production' : 'development';
}

function getDevtool(env) {
  return env === 'dev' ? 'inline-source-map' : '';
}

function vueLoaderRule(env) {
  return {
    test: /\.vue$/,
    loader: 'vue-loader'
  };
}

function babelLoaderRule(env) {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  };
}

function styleLoaderRule(env) {
  return {
    test: /\.s?[ac]ss/,
    use: [
      env === 'dev' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader'
    ]
  };
}

function getPlugins(env) {
  const vueLoaderPlugin = new VueLoaderPlugin();
  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: paths.cssFilename
  });
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    filename: paths.htmlTemplateOutput,
    template: paths.htmlTemplateEntry
  });

  return env === 'prod'
    ? [vueLoaderPlugin, miniCssExtractPlugin, htmlWebpackPlugin]
    : [vueLoaderPlugin, htmlWebpackPlugin];
}

module.exports = createWebpackConfig;
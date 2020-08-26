const { dirname, join, resolve } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CnameWebpackPlugin = require('cname-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const DotEnvPlugin = require('dotenv-webpack');
const EnvironmentPlugin = require('webpack/lib/EnvironmentPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const sass = require('sass')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const rootDir = __dirname;

console.log("process.env.GEOBADGES_API_ENDPOINT:", process.env.GEOBADGES_API_ENDPOINT);
console.log("process.env.GEOBADGES_FUNCTIONS_ENDPOINT:", process.env.GEOBADGES_FUNCTIONS_ENDPOINT);


// https://webpack.js.org/guides/public-path/
let PUBLIC_PATH = process.env.BASEURL || process.env.PUBLIC_PATH || '/';
console.log("PUBLIC_PATH:", PUBLIC_PATH);

const OUTPUT_PATH = resolve(__dirname, './dist');
console.log("OUTPUT_PATH:", OUTPUT_PATH);

// for (let key in process.env) console.log(key, ":", process.env[key]);

const entry = {
  index: ['@babel/polyfill', './src/index.js']
};

const patterns = [
  {
    from: './src/images',
    to: join(OUTPUT_PATH, '/static/images')
  },
  {
    from: './src/404.html',
    to: join(OUTPUT_PATH, '404.html')
  },
  {
    from: 'node_modules/url-search-params-polyfill/index.js',
    to: join(OUTPUT_PATH, '/static/js/polyfills/url-search-params.js')
  },
  {
    from: 'node_modules/jszip/dist/jszip.min.js',
    to: join(OUTPUT_PATH, '/static/js/jszip.min.js')
  },
  {
    from: 'node_modules/file-saver/dist/FileSaver.min.js',
    to: join(OUTPUT_PATH, '/static/js/FileSaver.min.js')
  },
  {
    from: 'node_modules/file-saver/dist/FileSaver.min.js.map',
    to: join(OUTPUT_PATH, '/static/js/FileSaver.min.js.map')
  }  
];

const plugins = [
  new CleanWebpackPlugin(),
  new DotEnvPlugin(),
  new DefinePlugin({
    PUBLIC_PATH: JSON.stringify(PUBLIC_PATH)
  }),
  new EnvironmentPlugin([
    'CNAME',
    'GEOBADGES_API_ENDPOINT',
    'GEOBADGES_FUNCTIONS_ENDPOINT'
  ]),
  new CopyWebpackPlugin(patterns),
  new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
  new HtmlWebpackPlugin({
    hash: true,
    template: './src/index.html',
    templateParameters: {
      PUBLIC_PATH
    },
    title: 'geobadges.org',
    minify: {
      removeScriptTypeAttributes: true
    }
  })
];

console.log("process.env.CNAME:", process.env.CNAME);
if (process.env.CNAME) {
  plugins.push(new CnameWebpackPlugin({
    domain: process.env.CNAME
  }));
}

// create sitemap
module.exports = {
  output: {
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
    path: OUTPUT_PATH,
    publicPath: PUBLIC_PATH
  },
  entry,
  resolve: {
    modules: ['node_modules', 'src', 'config'],
    extensions: ['.js', '.json', '.md']
  },
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        // use: ['@svgr/webpack']
        loader: 'svg-inline-loader'
      },
      // {
      //   test: /\.(png)$/,
      //   loader: 'file-loader',
      //   options: {
      //     outputPath: 'images'
      //   }
      // },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: 'style-loader'
             // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              implementation: sass,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-arrow-functions',
              '@babel/plugin-transform-classes',
              '@babel/plugin-syntax-dynamic-import',
              'babel-plugin-dynamic-import-node',
              '@babel/plugin-transform-regenerator'
            ],
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader',
            options: {
              /* your options here */
            }
          }
        ]
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      }      
    ]
  },
  plugins,
  watchOptions: {
    ignored: ['plugins']
  }
}
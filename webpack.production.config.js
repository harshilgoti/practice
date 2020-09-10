const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const { styles } = require("@ckeditor/ckeditor5-dev-utils")

// For FUTURE ref
// const MediaQuerySplittingPlugin = require("media-query-splitting-plugin")

// Hide deprication warning
// You can remove whenever you want, it just show text message
process.noDeprecation = true

const config = {
  entry: { main: "./src/index.js" },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  output: {
    filename: "static/js/[name].bundle.js",
    chunkFilename: "static/js/[name].chunk.bundle.js",
    path: path.resolve(__dirname, "./build/"),
    publicPath: "/"
  },
  mode: "production",
  node: {
    fs: "empty",
    module: "empty"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: __dirname,
        exclude: ["/node_modules/"],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true
                  }
                }
              ],
              "@babel/react"
            ],
            plugins: [
              "@babel/proposal-object-rest-spread",
              // "@babel/plugin-transform-runtime"
              "@babel/proposal-class-properties",
              "@babel/syntax-dynamic-import",
              "preval"
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: [/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|eot|ttf|dtd)$/,
        loader: "file-loader",
        exclude: [
          "/node_modules/",
          /\.(js|mjs|jsx|ts|tsx)$/,
          /\.html$/,
          /\.json$/,
          /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/
        ],

        options: {
          name: "[name].[ext]",
          outputPath: "static/fonts"
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        loader: "file-loader",

        exclude: [
          "/src/assets/icons/favicon.ico",
          /\.(js|mjs|jsx|ts|tsx)$/,
          /\.html$/,
          /\.json$/,
          /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/
        ],
        options: {
          name: "[name].[ext]",
          outputPath: "static/images"
        }
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ["raw-loader"]
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/,
        use: [
          {
            loader: "style-loader"
            // options: {
            //   singleton: true
            // }
          },
          {
            loader: "postcss-loader",
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve("@ckeditor/ckeditor5-theme-lark")
              },
              minify: true
            })
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 10000,
      automaticNameDelimiter: "_"
    },
    minimizer: [
      new TerserPlugin({
        // find more options on https://webpack.docschina.org/plugins/terser-webpack-plugin/
        parallel: true,
        extractComments: true,
        terserOptions: {}
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'Zero To Career',
      template: "src/template-index.html",
      // description:
      //   "Learn and practice for the job you want. And we'll make sure you get there.",
      filename: "index.html",
      favicon: "./src/assets/icons/favicon.ico",
      manifest: "./src/assets/manifest.json"
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name]_[hash].css",
      chunkFilename: "static/css/[name]_chunk_[hash].css"
    }),
    // new MediaQuerySplittingPlugin({
    //   media: {
    //     mobileEnd: 568,
    //     tabletPortraitEnd: 768,
    //     tabletLandscapeEnd: 1024
    //   },
    //   splitTablet: true,
    //   minify: true,
    //   units: "px"
    // }),
    new CopyPlugin([
      { from: "src/assets/manifest.json", to: "manifest.json" },
      {
        from: "src/assets/icons/logomark-192x192.png",
        to: "logomark-192x192.png"
      },
      {
        from: "src/assets/icons/logomark-512x512.png",
        to: "logomark-512x512.png"
      }
    ]),
    new CleanWebpackPlugin(),
    new Dotenv({ path: "./.env", defaults: false }),
    new CompressionPlugin({
      cache: true,
      deleteOriginalAssets: false
    })
  ]
}

module.exports = config

"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const writeFilePlugin = require('write-file-webpack-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const sass = require('sass');

const devServer = {
    contentBase: path.resolve("dist"),
    hot: true,
    host: process.env.host || "localhost",
    port: process.env.PORT || 5000,
    proxy: [{
        context: [
            '/api',
            '/proxy',
            '/api-docs'
        ],
        target: 'http://127.0.0.1:8400',
        secure: false,
        changeOrigin: false,
        headers: { host: 'localhost:5000' }
    }]
};

const staticDir = path.resolve('./src/main/resources/static');
const staticJsDir = path.join(staticDir, 'js');
const staticNodeModules = path.join(staticDir, 'node_modules');
const staticJsVendorDir = path.join(staticJsDir, 'vendor');

const webpackConfig = (env) => {
    const config = {
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [
                path.resolve(__dirname, 'src/main/resources/static/js/vendor'),
                path.resolve(__dirname, 'src/main/resources/static/node_modules'),
                path.resolve(__dirname, 'node_modules')
            ],
            alias: {
                'routes': path.join(staticJsDir, 'routes'),
                'app': path.join(staticJsDir, 'app'),
                'kylo-common': path.join(staticJsDir, 'common/module-require'),
                'kylo-common-module': path.join(staticJsDir, 'common/module'),
                'kylo-services': path.join(staticJsDir, 'services/module-require'),
                'kylo-services-module': path.join(staticJsDir, 'services/module'),
                'kylo-side-nav': path.join(staticJsDir, 'side-nav/module-require'),
                'kylo-feedmgr': path.join(staticJsDir, 'feed-mgr/module-require'),
                'codemirror-require/module': path.join(staticJsDir, 'codemirror-require/module'),
                'feed-mgr/catalog/catalog.module': path.join(staticJsDir, 'feed-mgr/catalog/catalog.module'),
                'dirPagination.tpl.html': path.join(staticJsDir, 'common/dir-pagination/dirPagination.tpl.html'),

                'angular-cookies': path.join(staticNodeModules, 'angular-cookies/angular-cookies.min.js'),
                'angular-material-data-table': path.join(staticNodeModules, 'angular-material-data-table/dist/md-data-table.min'),
                'angular-material-expansion-panel': path.join(staticNodeModules, 'angular-material-expansion-panel/dist/md-expansion-panel.min'),
                'angular-sanitize': path.join(staticNodeModules, 'angular-sanitize/angular-sanitize.min'),
                'angular-translate-handler-log': path.join(staticNodeModules, 'angular-translate-handler-log/angular-translate-handler-log.min.js'),
                'angular-translate-loader-static-files': path.join(staticNodeModules, 'angular-translate-loader-static-files/angular-translate-loader-static-files.min.js'),
                'angular-translate-storage-cookie': path.join(staticNodeModules, 'angular-translate-storage-cookie/angular-translate-storage-cookie.min.js'),
                'angular-translate-storage-local': path.join(staticNodeModules, 'angular-translate-storage-local/angular-translate-storage-local.min.js'),
                'angular-ui-grid': path.join(staticNodeModules, 'angular-ui-grid/ui-grid.min'),
                'angularAnimate': path.join(staticNodeModules, 'angular-animate/angular-animate.min'),
                'angularAria': path.join(staticNodeModules, 'angular-aria/angular-aria.min'),
                'angularMaterial': path.join(staticNodeModules, 'angular-material/angular-material.min'),
                'angularMessages': path.join(staticNodeModules, 'angular-messages/angular-messages.min'),
                'jquery': path.join(staticNodeModules, 'jquery/dist/jquery.min'),
                'ng-fx': path.join(staticNodeModules, 'ngFx/dist/ngFx.min'),
                // 'ocLazyLoad': path.join(staticNodeModules, 'oclazyload/dist/ocLazyLoad.require'),
                'pascalprecht.translate': path.join(staticNodeModules, 'angular-translate/angular-translate'),
                'tmh.dynamicLocale': path.join(staticNodeModules, 'angular-dynamic-locale/dist/tmhDynamicLocale.min'),
                'underscore': path.join(staticNodeModules, 'underscore/underscore-min'),
                'angular-drag-and-drop-lists': path.join(staticNodeModules, 'angular-drag-and-drop-lists/angular-drag-and-drop-lists.min'),
                'fattable': path.join(staticNodeModules, 'fattable/fattable'),
                'd3': path.join(staticNodeModules, 'd3/d3.min'),
                'nvd3': path.join(staticNodeModules, 'nvd3/build/nv.d3.min'),
                'angular-nvd3': path.join(staticNodeModules, 'angular-nvd3/dist/angular-nvd3.min'),
                'ng2-nvd3': path.join(staticNodeModules, 'ng2-nvd3/build/index'),
                'gsap': path.join(staticNodeModules, 'gsap/src/uncompressed/TweenMax'),
                // 'moment': path.join(staticNodeModules, 'moment/min/moment.min'), //loaded from root node_modules
                'SVGMorpheus': path.join(staticNodeModules, 'svg-morpheus/compile/minified/svg-morpheus'),

                'angular-material-icons': path.join(staticJsVendorDir, 'angular-material-icons/angular-material-icons'),
                'dirPagination': path.join(staticJsVendorDir, 'dirPagination/dirPagination'),
                'ng-text-truncate': path.join(staticJsVendorDir, 'ng-text-truncate/ng-text-truncate'),
            }
        },
        entry: {
            entryPolyfills: path.resolve('./src/main/resources/static/js/polyfills'),
            app: path.resolve('./src/main/resources/static/js/main.ts'),
            global: path.resolve('./src/main/resources/static/assets/global.scss'),
        },
        output: {
            filename: '[name].bundle.js',
            chunkFilename: '[name].chunk.js',
            path: path.join(__dirname, "dist")
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /(node_modules|vendor)/
                },
                {
                    test: /\.ts$/,
                    use: [
                        'angular2-template-loader',
                        {
                            loader: 'cache-loader',
                            options: {
                                cacheDirectory: path.resolve('target/cache-loader')
                            }
                        },
                        {
                            loader: 'thread-loader',
                            options: {
                                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                                workers: require('os').cpus().length - 1
                            }
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                happyPackMode: true
                            }
                        },
                        'angular-router-loader'
                    ],
                    exclude: ['node_modules', 'src/main/resources/static/node_modules', 'src/main/resources/static/js/vendor']
                },
                {
                    test: /\.html$/,
                    loader: "raw-loader",
                    exclude: path.resolve("./src/main/resources/static/js/index.html")
                },
                {
                    test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
                    loader: 'file-loader',
                    options: {
                        context: './src/main/resources/static',
                        name: '[path][name].[ext]'
                    }
                },
                {
                    test: /\.scss$/,
                    use: ['to-string-loader', 'css-loader', {
                        loader: 'sass-loader',
                        options: { implementation: sass }
                    }],
                    exclude: /(theme\.scss|global\.scss)/
                },
                {
                    test: /(theme\.scss|global\.scss)/,
                    use: ['style-loader', 'css-loader', 'postcss-loader', {
                        loader: 'sass-loader',
                        options: { implementation: sass }
                    }]
                },
                {
                    test: /\.css$/,
                    use: ['to-string-loader', 'css-loader']
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: './src/main/resources/static/assets/images/favicons', to: 'assets/images/favicons' },
                { from: './src/main/resources/static/locales/', to: 'locales' },
                {
                    context: './src/main/resources/static',
                    from: 'js/common/dir-pagination/**/*.html',
                    to: '[path][name].[ext]'
                }

            ]),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.resolve("./src/main/resources/static/index.html"),
                chunks: ['common','entryPolyfills','global','app'],
                chunksSortMode: 'manual',
                inject: 'body'
            }),

            new webpack.optimize.CommonsChunkPlugin({
                name: "common",
                filename: "common.js",
                minChunks: (module) => {
                    // this assumes your vendor imports exist in the node_modules directory
                    return module.context && module.context.indexOf("node_modules") !== -1  && module.context.indexOf("vendor") !== -1;
                }
            }),

            new CleanWebpackPlugin(["dist"]),

            new webpack.ContextReplacementPlugin(
                //https://github.com/angular/angular/issues/20357
                /angular(\\|\/)core(\\|\/)/,
                path.resolve(__dirname, './src/main/resources/static')
            ),


            new webpack.ProvidePlugin({
                "window.jQuery": "jquery", //https://webpack.js.org/plugins/provide-plugin/#usage-jquery-with-angular-1
                "d3": "d3",
                // "window.moment": "moment", //Can't resolve './locale' in '.../ui-app/src/main/resources/static/node_modules/moment/min'
                // "window.SVGMorpheus": "SVGMorpheus",
            }),

            new writeFilePlugin(),

            // new BundleAnalyzerPlugin()
        ]
    }

    if (env && env.dev) {
        config.devServer = devServer;
        config.plugins.push(
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        );
    }

    if (env && env.production) {
        config.devtool = "source-map";
        config.plugins.push(
            new UglifyJSPlugin({
                uglifyOptions: {
                    warnings: true
                },
                sourceMap: true
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify("production")
            })
        );
    }

    return config;
};

module.exports = webpackConfig;

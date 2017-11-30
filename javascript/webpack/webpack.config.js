var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    //插件项
    //commonsPlugin 用于提取多个入口文件的公共脚本部分，然后生成一个common.js来方便多页面之间进行复用
    plugins: [commonsPlugin],
    //页面入口文件配置
    //最终 会输出到  ./dist/js/page/index.bundle.js
    //./dist/js/page/page2.bundle.js
    // ./dist/js/page/page3.bundle.js
    entry: {
        index : './src/js/page/index',
        page2 : './page2',
        ////支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        page3 : ['./entry1', './entry2']
    },
    //入口文件输出配置
    output: {
        path: 'dist/js/page',
        filename: '[name].bundle.js'
    },
    module: {
        //加载器配置 关键性配置
        //test 去判断是否为.coffee的文件,是的话就是进行coffee编译
        // 用!去链式调用loader
        //所有的loader都要用 npm install url-loader --save-dev
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            { test: require.resolve("./src/js/tool/swipe.js"),  loader: "exports?swipe"}
            // shimming
            // require('./tool/swipe.js');
            // swipe();
        ]
    },
    //用来配置要被打包的模块的解析
    resolve: {
        root: 'd:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
        //fallback: path.join(__dirname, "node_modules")
    },
    //用来配置loader模块的解析
    resolveLoader: {
        //fallback: path.join(__dirname, "node_modules")
    }
};
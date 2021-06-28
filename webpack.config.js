const path = require('path');

module.exports = {
    // 基础目录，绝对路径，用于从配置中解析入口点（entry point）和加载器（loader）
    // 默认使用当前目录，但是推荐在配置中传一个值，这使得配置独立于CWD(current working directory)
    context: path.resolve(__dirname, 'app'),
    // entry 指示webpack应该是使用哪个模块，来构建其内在的依赖图。进入入口后，webpack会找出哪些模块和库是入口的起点（直接和间接的）依赖的。
    entry :{
        app: './app.js',
        dev: './dev.js'
    },
    // output属性告诉webpack在哪里输出它创建的bundle，以及如何命名这些文件，主要输出文件的默认值是 ./dist/main.js,其他文件默认放在 ./dist文件夹中
    output: {
        path: path.resolve(__dirname, 'dist'),  //生成的位置。
        filename: 'myapp.js'  //文件名
    }, 
    // webpack只能识别JavaScript和Json文件，而使用loader，可以让webpack能够处理其他类型的文件，并将它们转化成有效的模块。
    //举个例子：可以使用webpack加载CSS文件，或者将Typescript转为JavaScript。所以得安装相应的loader
    // npm install --save-dev css-loader ts-loader
    // 然后指示webpack对每个css使用loader
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },  //test 识别哪些文件被转换
            { test: /\.ts$/, use: 'ts-loader'}      //use 定义转换时用哪个loader
        ]
    },
    //loader用于转换某些类型的模块，而插件可以执行更广的任务，包括，打包优化，资源管理，注入环境变量。
    // 插件是 webpack 生态的关键部分.webpack自身也是构建于在webpack中用到的相同的插件系统之上。主要用来解决loader无法实现的其他事情上。
    // 用法，向plugins属性传入一个new实例，取决于webpack的用法。

    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({templete: '.src/index.html'}),   // 将生成一个html文件，然后使用script引入了一个在上面output设置文件名的js文件。
    ], 
    // 模式 mode
    //  通过选择development，production，或none之中的一个，来设置mode参数，可以启动webpack内置在相应环境下的优化。默认值是production
    mode:'development',
    /**
     * if(argv.mode === 'development'){
     *  config.devtool = 'source-map';
     * }
     * if(argv.mode === 'production'）{
     *  .....
     * }
     * return config;
     */

    // 此时就是用webpack配置服务端代码。
    // 将target设置为node，webpakc将在类Node.js环境编译代码。
    // 而每个target都包含各种deployment(部署)/environment(环境) 特定的附加项。
    // 如果target列表target不符合需求，可以设置target为false，这将告诉webpack不使用任何插件。或者使用plugins指定插件。
    target: 'node',
    node :{
        // true 会提供polyfill，false，不提供任何polyfill，代码可能会出现ReferenceError的崩溃
        global : true,
        // true :输入文件的文件名。相对于context选项。false：webpack不会更改__filename的代码，mock value填充为 index.JS
        __filename: true,

        __dirname: true,
    }
}
const path = require('path');

module.exports = {
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
    // 插件是 webpack 生态的关键部分， 它为社区用户提供了一种强有力的方式来直接触及 webpack 的编译过程(compilation process)。 
    // 插件能够 hook 到每一个编译(compilation)中发出的关键事件中。
    //  在编译的每个阶段中，插件都拥有对 compiler 对象的完全访问能力， 并且在合适的时机，还可以访问当前的 compilation 对象。

}
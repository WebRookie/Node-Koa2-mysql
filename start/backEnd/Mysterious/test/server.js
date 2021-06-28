const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`主线程${process.pid} 正在运行`);

  //衍生工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (work, code, signal) => {
    console.log(`工作进程 ${work.process.pid} 已退出`);
  });
} else {
    // 工作进程可以共享任何TCP连接
    //在本例子中，共享的是一个HTTP服务器
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('你好世界\n')
    }).listen(8000);
    console.log(`工作进程 ${process.pid}已启动`)
}

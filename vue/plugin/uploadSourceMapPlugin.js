const glob = require('glob')
const path = require('path')
const fs = require('fs')
let https = require('https')



const pluginName = 'upload-sourcemap-pluge';

class UploadSourceMapPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    //打包完成时执行
    if (process.env.NODE_ENV === "development") return;
    compiler.hooks.done.tap(pluginName, async status => {
      //拼接路径获取文件
      const list = glob.sync(path.join(status.compilation.outputOptions.path, `./**/*.{js.map,}`))
      for (let filename of list) {
        //上传
        await this.upload(this.options.uploadUrl, filename)
      }
    });
  }
  upload(url, file) {
    console.log('开始上传sourcemap文件:', file);
    return new Promise(resolve => {
      const req = https.request(`${url}?name=${path.basename(file)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          connection: 'keep-alive',
          "Transfer-Encoding": "chunked"
        }
      })

      fs.createReadStream(file).on("data", chunk => {
        req.write(chunk);
      }).on("end", () => {
        req.end();
        console.log('sourcemap文件上传结束',file)
        resolve()
      })
    })

  }
}

module.exports = UploadSourceMapPlugin;
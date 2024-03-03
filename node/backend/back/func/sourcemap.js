 const {SourceMapConsumer} = require ('source-map-js')
const fs = require('fs');

const findCodeBySourceMap = async function (filename, line, column) {
    let sourceData = await loadSourceMap(filename);
    
    let {
        sourcesContent,
        sources
    } = sourceData;
    // console.log(sourcesContent,sources)
    let consumer = await new SourceMapConsumer(sourceData);
    let result = consumer.originalPositionFor({
        line: Number(line),
        column: Number(column)
    });

    let code = sourcesContent[sources.indexOf(result.source)]
    console.log(result,code)
}

const loadSourceMap = function (filename) {
    // 指定要读取的 .map 文件路径
    const filePath = filename // 将 "path/to/" 替换为实际的文件路径
    try {
        const data = fs.readFileSync(filePath);
        
        console.log(`成功读取到 .map 文件内容:`);
        return JSON.parse(data.toString("utf8"))
    } catch (error) {
        console.error(`无法读取 .map 文件: ${error}`);
    }

}
findCodeBySourceMap('../sourceMap/app.5ff83c2d.js.map', 1, 23063)
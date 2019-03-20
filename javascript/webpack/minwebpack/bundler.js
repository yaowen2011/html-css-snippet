const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const babel = require('babel-core')

let ID = 0;
function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8')
  const ast = babylon.parse(content, {
    sourceType: "module"
  })
  // console.log(ast)

  const dependencies = []
  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value)
    }
  })
  // console.log(dependencies)
  const id = ID++;
  const {code} = babel.transformFromAst(ast, null, {
    presets: ['env']
  })
  return {
    id,
    filename,
    dependencies,
    code
  }
}

function createGraph(entry) {
  const mainAsset = createAsset(entry)

  // 所有的依赖 以及依赖的依赖
  const queue = [mainAsset]
  for (const asset of queue) {
    const dirname = path.dirname(asset.filename)
    
    asset.mapping = {}

    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.join(dirname, relativePath)
      const child = createAsset(absolutePath)

      asset.mapping[relativePath] = child.id
      queue.push(child)
    })
  }

  return queue
}

function bundle(graph) {
  let modules = ''
  graph.forEach(modInfo => {
    modules += `${modInfo.id}: [
      function(require, module, exports) { ${modInfo.code}},
      ${JSON.stringify(modInfo.mapping)}
    ],`
  })
  // require方法的最后一行是核心
  // 最终将所有依赖的模块的exports 全部导入主模块中
  // 主模块可以使用其他模块导出的方法 常量 等
  const result = `
    (function(arg) {
      function require(id) {
        const [fn, mapping] = arg[id]

        function localRequire(relativePath) {
          return require(mapping[relativePath])
        }

        const module = { exports: {}}

        fn(localRequire, module, module.exports);
        console.log(module.exports, '------')
        return module.exports;
      }

      require(0)// require(1) require(2)
    })({${modules}})
  `
  return result
}

// const mainAsset = createAsset('./example/entry.js')
// console.log(mainAsset)
const graph = createGraph('./example/entry.js')
// console.log(graph)
const result = bundle(graph)
console.log(result)
## 循环中使用async，
``````javascript
// 并发操作
async function printFiles () {
  const files = await getFilePaths();

  await Promise.all(files.map(async (file) => {
    //耗时操作
    const contents = await fs.readFile(file, 'utf8')
    console.log(contents)
  }));
}
// 序列执行异步
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}
// 参考 https://www.cnblogs.com/demonrain/p/8486847.html
``````
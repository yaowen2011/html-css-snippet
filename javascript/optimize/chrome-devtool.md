## chrome timeline工具
  - http://www.cnblogs.com/beidan/p/6375234.html
  - 
  - 浏览器渲染的流程如下：
  - ->渲染机制
    - JavaScript -> Style -> Layout -> Paint -> Composite
  - 
  获取 DOM 并将其分割为多个层(RenderLayer)
  将每个层栅格化，并独立的绘制进位图中
  将这些位图作为纹理上传至 GPU
  复合多个层来生成最终的屏幕图像(终极layer)。
  从上面图中可以看出，如果只是改变composite（渲染层合并），那效率就会大大提高。
 
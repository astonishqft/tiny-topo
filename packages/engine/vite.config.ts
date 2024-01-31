import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts({
    insertTypesEntry: true,
    outDir: 'dist' // 设置生成文件的目录为dist
  })],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'), // TS库入口文件
      name: 'tiny-topo-flow', // 挂载到全局的变量名，CDN导入的时候可以直接使用Counter变量
      fileName: 'index' // 输出的文件名
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下,全局模式下为这些外部化的依赖提供一个全局变量
        globals: {
          tinyTopoFlow: 'tiny-topo-flow'
        }
      }
    }
  }
})

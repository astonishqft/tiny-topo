# 使用pnpm进行项目管理

本项目将采用 `monorepo` 的方式来管理代码仓库，并使用 `pnpm` 作为包管理工具。使用 `monorepo` 管理项目可以对项目进行拆分，将庞大的项目分解成一个个子模块进行开发，子模块之间可以相互引用、代码互相调试和共享代码规范，每个子模块最终会作为 `npm` 包的形式进行打包并发布到 `npm` 官网。

## pnpm

[pnpm](https://pnpm.io/zh/motivation) 是新一代的包管理器，通过 `pnpm` 安装 `npm` 包可以节省磁盘空间并提升安装速度和创建非扁平化的 `node_modules` 文件夹，pnpm 提出了 `workspace` 的概念，内置了对 `monorepo` 的支持。

全局安装 pnpm：

```
$ npm install -g pnpm
```

> ⚠️*需要注意的是，pnpm 安装使用nodejs版本至少大于 `v14.19.0`，安装之前需要检查nodejs版本号。*

## 工程初始化

项目的名称叫做 `tiny-topo`，因此新建一个名为 `tiny-topo` 的目录，然后执行 `npm` 初始化。

```bash
$ mkdir tiny-topo
$ cd tiny-topo
$ npm init
```
填写完项目的基本信息后会在根目录下生成一个 `package.json` 文件，将 `private` 字段修改为 `true`，防止根目录被作为 `npm` 包发布出去。

```json
{
  "name": "tiny-topo",
  "private": true,
  "version": "1.0.0",
  "description": "tiny topo",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/astonishqft/tiny-topo.git"
  },
  "author": "qi.futao",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/astonishqft/tiny-topo/issues"
  },
  "homepage": "https://github.com/astonishqft/tiny-topo#readme"
}
```

在 `tiny-topo` 根目录下创建 `packages` 和 `examples` 目录，分别作为源码目录和示例工程目录。

```bash
$ mkdir packages
$ mkdir examles
```

为了能在 `packages` 目录之间 以及 `packages` 目录和 `examples` 目录之间进行包的相互引用，需要借助于 `pnpm` 的 `workspace` 功能，方式很简单，只需要在根目录下创建 `pnpm-workspace.yaml` 文件，并指定依赖目录：

```yaml
packages:
  - 'packages/*'
  - 'playground/*'
```

在 `packages` 目录下创建一个名为 `tiny-topo-core` 目录，在此目录下创建一个 `src` 目录作为存放源文件的目录，在 `src` 目录下再创建一个 `index.ts` 文件作为包的入口。

```bash
$ cd packages
$ mkdir tiny-topo-core
$ cd tiny-topo-core
$ mkdir src
$ cd src
$ touch index.ts
$ npm init
```

index.js:

```ts
interface Iopts {
  name: string;
}
const hello = (opts: Iopts) => {
  console.log(`hello:${opts.name}`);
};

hello({ name: 'qifutao' });
```

## 使用vite进行打包

本工程的所有源代码都是使用 `typescript` 进行编写的，在发布之前需要将 `typescript` 文件编译成 `js` 文件，本工程选择使用 `vite` 对 `ts` 文件进行编译。

在子工程目录下新增 `tsconfig.json` 配置文件：

```json
{
  "include": ["src", "types", "test"],
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "lib": ["dom", "esnext"],
    "importHelpers": true,
    "declaration": true,
    "declarationDir": "dist", // 声明文件输出的目录
    "emitDeclarationOnly": true, // 只输出声明文件，不转译ts文件
    "sourceMap": true,
    "rootDir": "./",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "*": ["src/*", "node_modules/*"]
    },
    "jsx": "react",
    "esModuleInterop": true
  }
}
```

新增 `vite.config.ts` 配置文件，指定 `vite` 打包所需的配置信息：

```ts
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'tiny-topo-core', // 挂载到全局的变量名
      fileName: 'index' // 输出的文件名
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下,全局模式下为这些外部化的依赖提供一个全局变量
        globals: {
          liteMove: 'tiny-topo-core'
        }
      }
    }
  }
});
```

通过上述配置，打包之后会生成 `umd` 和 `mjs` 两种格式的代码。

**全局安装 vite**。

`pnpm` 提供了 `-w, --workspace-root` 参数，可以将依赖包安装到工程的根目录下，作为所有 `package` 的公共依赖。

执行下面命令会将vite作为开发依赖(devDependencies)安装到项目根目录下的 `node_modules` 中，各个子目录可以共享此包。

```bash
$ pnpm install vite -wD
```

为了支持 `typescript` 打包，还需要安装 `typescript`：

```bash
$ pnpm install typescript -wD
```

在 tiny-topo-core 目录下的 package.json 中的 script 字段增加如下命令：

```json
"scripts": {
  "build": "vite build",
  "dev": "vite dev"
}
```

在 `tiny-topo-core` 下执行如下命令就可以对 `ts` 文件进行打包，打包后产物输出到 `dist` 目录下。

```bash
$ pnpm build --filter @qftjs/tiny-topo-core
```

`pnpm` 提供了 `--filter` 参数，可以用来对特定的 `package` 进行某些操作。

## 生成声明文件

在上一步中打包结果中，`dist` 下输出的资源文件缺少 `dts` 声明文件，为了能自动生成声明文件，需要借助于 `vite-plugin-dts` 插件。

全局安装 `vite-plugin-dts` 插件：

```bash
$ pnpm install vite-plugin-dts -wD
```

在 `vite.config.ts` 中增加插件的引用：

```ts
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
});
```

此时再执行打包命令，就会在 `dist/src` 目录下生成声明文件。

> ⚠️ 注意：此时在打包的时候可能会报错，最新版的 `vite-plugin-dts` 需要 nodejs 版本>16,升级 node版本为 16.14.2+，然后删除原来的 `node_modules` 文件夹和 `pnpm-lock.yaml` 文件，重新安装依赖即可解决报错问题。

使用 `vite-plugin-dts` 插件打包的时候生成的声明文件生成在了 `dist/src` 下面，那么怎么才能让声明文件直接输出到 `dist` 目录下呢？ 

`vite-plugin-dts` 提供了额外的配置项可以解决此问题：

```ts
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({
    insertTypesEntry: true,
    outDir: 'dist'
  })],
});
```

## 修改 package.json 文件，为发布包做准备

在将我们的包发布到 `npm` 上之前，还需要对子工程的package.json进行配置。

- name: 用来指定包发布到 `npm` 上之后的报名，必须要做到全网唯一，一般 `monorepo` 类型的工程，都会有一个组织名(可以在npm上新增一个Organization)，后续所有的子报名都以@xxx开头。比如本子项目名就叫做 `@qftjs/tiny-topo-core`，其中 `@qftjs` 是组织名，`tiny-topo-core` 是目录名。
- typings: 指定声明文件的路径。
- files: 指定哪些文件要发布到 `npm` 上，一般指定为构建输出目录，如 `dist`。另外，根目录下的 `package.json`、`README.md` 等文件名无需指定，发布时也会自动带上。
- version: 指定当前库的版本
- main: 是最为基础且古老的入口字段，由 `node` 与 `npm` 定义。当 `main` 字段都不存在时，通常会使用 `index.js` 作为入口。
- module: 提供符合 ESM 规范的模块入口.

完整的 `pacakge.json` 信息如下：

```json
{
  "name": "@qftjs/tiny-topo-core",
  "version": "1.0.0",
  "description": "tiny-topo-core",
  "main": "dist/index.umd.js",
  "module": "dist/index.mjs",
  "typings": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "vite build",
    "dev": "vite dev"
  },
  "author": "qi.futao",
  "license": "ISC"
}
```

## 增加eslint代码检测工具

为了确保统一的代码编写风格以及尽量避免低级错误问题的发生，还需要配置 eslint 对项目代码进行统一校验。

安装eslint相关依赖包：

```bash
$ pnpm install -wD eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

在工程根目录下添加 .eslintrc 配置文件:

```js
module.exports = {
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint'],
  'rules': {
    'no-var': 'error',// 不能使用var声明变量
    'no-extra-semi': 'error',
    '@typescript-eslint/indent': ['error', 2],
    'import/extensions': 'off',
    'linebreak-style': [0, 'error', 'windows'],
    'indent': ['error', 2, { SwitchCase: 1 }], // error类型，缩进2个空格
    'space-before-function-paren': 0, // 在函数左括号的前面是否有空格
    'eol-last': 0, // 不检测新文件末尾是否有空行
    'semi': ['error', 'always'], // 在语句后面加分号
    'quotes': ['error', 'single'],// 字符串使用单双引号,double,single
    'no-console': ['error', { allow: ['log', 'warn'] }],// 允许使用console.log()
    'arrow-parens': 0,
    'no-new': 0,//允许使用 new 关键字
    'comma-dangle': [2, 'never'], // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，always-multiline多行模式必须带逗号，单行模式不能带逗号
    'no-undef': 0
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'modules': true
    }
  }
};
```

## 如何使用


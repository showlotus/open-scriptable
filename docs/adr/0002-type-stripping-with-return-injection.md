# 0002 - 类型擦除 + 前置 return，而不是完整编译

组件源码用 TypeScript（享受类型检查与 Scriptable 全局声明），但 Scriptable 只能执行 JavaScript，且交付机制是 `new Function(code)()`——代码必须"返回"入口函数。决定不做完整编译，而是由 `plugins/remove-types.ts` 在 dev（serve 时）和 build（bundle 后）用 TypeScript compiler API 只擦除类型注解、删除所有 export 语句，并在模块体最前面插入 `return`，使 `new Function(code)()` 的返回值恰好是 render 函数。

这样产物与源码结构几乎一致、行为可预测，不需要引入任何 loader 运行时。

**Considered Options**:

- IIFE 包裹 + 显式 return：需要改写代码结构，产物与源码差异大
- 输出 ESM + 自写 loader：Scriptable 环境没有模块加载器，成本不成比例

**Consequences**（刻意约束，不要"修复"）:

- render 必须是类型擦除后的第一个声明：前面只能放 interface / 类型（会被擦除），顶层 `const` 或其他语句会导致生成代码语法错误或返回错误的函数
- dev 模式不做打包，跨文件 import 只在 build 时被内联，dev 下组件必须是单文件
- 组件代码依赖 Scriptable 全局（`scriptable.d.ts` 声明），而不是 import

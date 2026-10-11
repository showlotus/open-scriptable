# AGENTS.md

Scriptable iOS 小组件脚本仓库。每个 `src/*.ts` 是一个独立小组件，构建为 `dist/<name>.js`，以 npm 包 `@showlotus/open-scriptable` 发布，iOS 端通过 jsDelivr CDN 加载并用 `new Function(code)()` 执行。

## 常用命令

```bash
pnpm install                      # pnpm 8（Node >=20.19 或 >=22.12）
pnpm dev                          # Vite 开发服务器，端口 3000，监听局域网
pnpm build                        # 构建所有 src/*.ts -> dist/<name>.js
npx tsc                           # 类型检查（tsconfig 已 noEmit；没有 typecheck script）
pnpm release [major|minor|patch]  # 发版：bump 版本 + commit + tag + push（默认 patch）
```

- 无测试、无 ESLint；格式化靠 Prettier（husky + lint-staged 在 commit 时执行，printWidth 120 / 单引号 / 分号）。
- 验证方式：`npx tsc && pnpm build`；真机效果只能在 iPhone 的 Scriptable 里手动确认。

## 真机调试流程

1. `pnpm dev` 后，在 iPhone 的 Scriptable 中运行 `src/dev.ts`：它请求 `http://<局域网IP>:3000/src/<widget>.ts` 并 eval。
2. `src/dev.ts` 里的 IP 是硬编码的（当前 `192.168.5.2:3000`），换网络需改成开发机 IP（README 示例用的是另一台机器的地址）。

## 关键约定

- **入口自动注册**：`vite.config.ts` 扫描 `src/*.ts` 作为 Rollup input，新建组件零配置，文件名即产物名。
- **render 约定**：每个组件定义 `render` 函数并以 `export { render }` 结尾。`plugins/remove-types.ts` 会移除类型注解、删掉所有 export 语句，并在模块体最前面插入 `return`，使 `new Function(code)()` 返回 render 函数。因此 `render` 必须是类型擦除后的第一个声明（前面放 interface 可以，放顶层 `const` 或其他语句会产出语法错误或返回错误函数）。
- **dev 模式不打包**：dev 中间件直接返回转译后的单文件源码；跨文件 import 只在 build 时被 Rollup 内联，Scriptable 的 `new Function` 无法解析 import 语句。
- **Scriptable API 是全局**：`ListWidget`、`Color`、`Font`、`config`、`args`、`Script`、`Request`、`Timer` 等由根目录 `scriptable.d.ts`（手工维护，含中文 JSDoc）声明，直接使用，不要 import。全局常量 `__IS_DEV__` 定义在 `globalconfig.d.ts`（dev 中间件替换为 `true`，build 由 vite define 注入 `false`）。
- 注释用中文，与现有文件保持一致。
- 领域术语见 `GLOSSARY.md`（Options 是用户配置，config 是 Scriptable 运行时全局，勿混用）；架构决策见 `docs/adr/`。

## 新增组件检查清单

1. 新建 `src/<name>.ts`，按上述 render 约定编写。
2. README「组件列表」添加用法示例，CDN 路径为 `dist/<name>.js`。
3. 浅色/深色截图放 `res/<name>/` 并嵌入 README。

## 发布

- `pnpm release` 要求工作区干净；它更新 `package.json` 版本、commit、打 `v*` tag 并 push。
- 真正的 publish 只在 GitHub Actions（`.github/workflows/release.yml`，tag push 触发）执行：build → changelogithub → `pnpm publish` → `postpublish` 轮询等待 jsDelivr 同步并清缓存。不要在本地 publish。
- husky pre-push 中的 `scripts/check-version.js` 只在分支名为 `_master` 时自动 bump patch；当前主分支是 `master`，该逻辑实际不会触发——版本更新一律走 `pnpm release`。

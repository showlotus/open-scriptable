# 0001 - 通过 npm + jsDelivr CDN 分发，用 new Function 执行

组件要跑在 iPhone 的 Scriptable App 里：App 无法安装依赖、没有模块加载器，用户也不可能为每次更新重新粘贴全部源码。决定将每个组件构建为单文件脚本，发布到 npm 包 `@showlotus/open-scriptable`；用户在 Scriptable 中用几行固定代码从 jsDelivr CDN（`@latest`）拉取源码字符串，以 `new Function(code)()` 执行得到 render 函数并调用。

**Considered Options**:

- 自托管静态文件：无版本管理、无发布流程
- 用户直接粘贴完整源码：更新成本高，无法沉淀版本历史

选 npm 是因为它提供版本管理与 tag 触发的 CI 发布；选 jsDelivr 是因为它免安装、有 CDN 缓存，且支持 `@latest` 固定指向。

**Consequences**:

- README 中的 CDN URL 是公开契约，`dist/<name>.js` 路径不可随意更改
- 组件必须能以单文件形态运行，不能依赖模块系统
- `@latest` 依赖 CDN 缓存，发版后需主动清缓存（`scripts/post-publish.js` 轮询同步并 purge）

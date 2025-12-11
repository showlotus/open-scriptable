# Open-source Scriptable scripts for iOS Widgets

## 使用示例

```javascript
// 配置
const config = {
  name: 'World',
};
// 加载脚本
const url = 'https://cdn.jsdelivr.net/npm/@showlotus/open-scriptable@latest/dist/hello-world.js';
const code = await new Request(url).loadString();
// 执行脚本
const render = new Function(code)();
await render(config);
```

<div>
  <img src="./res/hello-world/light.png" alt="light" width="300">
  <img src="./res/hello-world/dark.jpeg" alt="dark" width="300">
</div>

## 组件列表

### 倒计时组件

```js
const url = 'https://cdn.jsdelivr.net/npm/@showlotus/open-scriptable@latest/dist/count-down.js';
const code = await new Request(url).loadString();
const render = new Function(code)();
await render();
```

<!-- <div>
  <img src="./res/count-down/light.jpeg" alt="light" width="300">
  <img src="./res/count-down/dark.jpeg" alt="dark" width="300">
</div> -->

<div>
  <img src="./res/count-down/light-v2.jpeg" alt="light" width="300">
  <img src="./res/count-down/dark-v2.jpeg" alt="dark" width="300">
</div>

<!-- ### 月度消费组件 -->

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

在 Scriptable 中加载 `http://192.168.5.6:3000/src/hello-world.ts` 脚本，即可看到效果。

```js
// 加载脚本
const url = 'http://192.168.5.6:3000/src/hello-world.ts';
const code = await new Request(url).loadString();
// 执行脚本
const render = new Function(code);
await render();
```

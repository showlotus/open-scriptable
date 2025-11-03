# Open-source Scriptable scripts for iOS Widgets

## 使用示例

```javascript
// 全局配置
const globalConfig = {
  name: 'World',
};
// 加载脚本
const url = 'https://cdn.jsdelivr.net/npm/@showlotus/open-scriptable@latest/dist/hello-world.js';
const code = await new Request(url).loadString();
// 执行脚本
eval(code);
```

<img src="./res/hello-world.png" alt="small" width="300">

## 组件列表

### 倒计时组件

```js
// 全局配置
const globalConfig = {
  days: [
    {
      name: '生日',
      date: '2025-12-23',
    },
    {
      name: '元旦',
      date: '2026-01-01',
    },
    {
      name: '除夕',
      date: '2026-02-16',
    },
  ],
};

const url = 'https://cdn.jsdelivr.net/npm/@showlotus/open-scriptable@latest/dist/count-down.js';
const code = await new Request(url).loadString();
eval(code);
```

<div>
  <img src="./res/count-down/light.png" alt="light" width="300">
  <img src="./res/count-down/dark.png" alt="dark" width="300">
</div>

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
eval(code);
```

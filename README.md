# Open-source Scriptable scripts for iOS

## 使用示例

```javascript
// 全局配置
const globalConfig = {
  name: 'World',
};
// 加载脚本
const url = 'https://cdn.jsdelivr.net/npm/@showlotus/open-scriptable@0.1.0/dist/hello-world.js';
const code = await new Request(url).loadString();
// 执行脚本
eval(code);
```

<!-- ![demo.png](./res/demo.png) -->

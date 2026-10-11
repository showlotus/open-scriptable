# Scriptable 组件

开源 Scriptable iOS 小组件脚本集合。每个组件是一个独立分发、独立配置的 Widget 脚本，用户在 iPhone 的 Scriptable App 中加载并渲染。

## Language

**组件 Widget**：
一个独立的小组件脚本，一个源文件对应一个组件，文件名即组件名。
_Avoid_: 脚本（太泛）、插件

**render**：
组件的唯一入口函数，加载方取得它并调用以渲染组件。
_Avoid_: main、entry

**Options（组件配置）**：
调用方传给 render 的参数，决定组件展示的内容与外观。
_Avoid_: config、params

**config（Scriptable 运行时）**：
Scriptable 注入的全局对象，描述当前运行环境（是否在小组件中运行、组件尺寸等）。
_Avoid_: 用 config 指代调用方传入的配置（那是 Options）

**组件尺寸**：
Widget 的规格：small / medium / large / extraLarge，决定布局与内容量。
_Avoid_: 大小、size（口语混用）

**主题 Theme**：
一组命名的颜色定义（背景、文本、分割线等）。
_Avoid_: 皮肤、配色

**theme**：
从预设 Theme 中选择的字符串；与 Theme 是选择器与被选物的关系。
_Avoid_: themeName（指 Theme 预设的键名时除外）

**DEV 模式**：
组件从开发服务器实时加载源码运行的调试方式，与之相对的是从 CDN 加载已发布版本。
_Avoid_: debug 模式

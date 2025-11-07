export {};

let widgetSize: string;
// 获取当前小组件的尺寸
if (config.runsInWidget) {
  widgetSize = config.widgetFamily || 'small';
} else {
  // DEBUG
  widgetSize = 'small';
}

const widget = new ListWidget();

// 创建线性渐变对象
const gradient = new LinearGradient();
// 设置渐变颜色（从上到下）
gradient.colors = [new Color('#ffcb8e'), new Color('#6e35ff')];
gradient.locations = [0.0, 1.0];
gradient.startPoint = new Point(0, 0);
gradient.endPoint = new Point(1, 1);
widget.backgroundGradient = gradient;

const text = widget.addText(`Hello, ${__GLOBAL_CONFIG__.name || 'World'}`);
text.font = Font.boldSystemFont(16);
text.textColor = Color.dynamic(new Color('#FFFFFF'), new Color('#000000'));
text.centerAlignText();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  // 在应用中运行
  if (widgetSize === 'small') {
    widget.presentSmall();
  } else if (widgetSize === 'medium') {
    widget.presentMedium();
  } else if (widgetSize === 'large') {
    widget.presentLarge();
  }
}

Script.complete();

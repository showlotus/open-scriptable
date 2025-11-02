export {};

const widget = new ListWidget();

// 创建线性渐变对象
const gradient = new LinearGradient();
// 设置渐变颜色（从上到下）
gradient.colors = [new Color('#ffcb8e'), new Color('#6e35ff')];
gradient.locations = [0.0, 1.0];
gradient.startPoint = new Point(0, 0); // 左上角
gradient.endPoint = new Point(1, 1); // 右下角
widget.backgroundGradient = gradient;

const text = widget.addText(`Hello, ${globalConfig.name || 'World'}`);
text.font = Font.boldSystemFont(16);
text.centerAlignText();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  switch (args.widgetParameter) {
    case 'medium':
      widget.presentMedium();
      break;
    case 'large':
      widget.presentLarge();
      break;
    default:
      widget.presentSmall();
  }
}

Script.complete();

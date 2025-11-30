export {};

function getConfig(prop: string, defaultValue: any = '') {
  try {
    return __GLOBAL_CONFIG__[prop];
  } catch (error) {
    return defaultValue;
  }
}

function render() {
  let widgetSize: string;
  // 获取当前小组件的尺寸
  if (config.runsInWidget) {
    widgetSize = config.widgetFamily || 'small';
  } else {
    // DEBUG
    widgetSize = 'small';
  }

  const widget = new ListWidget();
  widget.backgroundColor = Color.dynamic(new Color('#FFFFFF'), new Color('#1c1c1c'));

  const text = widget.addText(`Hello, ${getConfig('name', 'World')}`);
  text.textColor = Color.dynamic(new Color('#000000'), new Color('#FFFFFF'));
  text.font = Font.boldSystemFont(16);
  text.centerAlignText();

  console.log('config:');
  console.log(JSON.stringify(config, null, 2));

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
}

render();

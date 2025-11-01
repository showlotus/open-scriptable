const widget = new ListWidget();

const text = widget.addText(`Hello, ${globalConfig.name || 'World'}!`);
text.centerAlignText();

widget.setPadding(16, 16, 16, 16);
widget.backgroundColor = Color.dynamic(new Color('#FFFFFF'), new Color('#1f1f23'));

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

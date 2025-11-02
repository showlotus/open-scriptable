export {};

// 获取当前小组件的尺寸
const widgetSize = config.widgetFamily || 'small';

// 不同尺寸的要展示的数量
const sizeConfig: Record<string, number> = {
  small: 3,
  medium: 3,
  large: 7,
};

const displayCount: number = sizeConfig[widgetSize as string] || 3;

// 计算距离目标日期的天数
function getDaysUntilTargetDate(targetDate: Date): number {
  const today = new Date();

  // 如果今年的目标日期已过，使用明年的目标日期
  if (targetDate < today) {
    const diffTime = today.getTime() - targetDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return -diffDays;
  }

  // 计算天数差
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

// 格式化日期显示
function formatDate(date: Date): string {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const dayName = days[date.getDay()];
  const monthName = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${year}/${monthName}/${day}${widgetSize === 'small' ? '' : `, ${dayName}`}`;
}

// 获取目标日期
function getTargetDate(dateStr: string): Date | null {
  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) {
    return null;
  }
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

// 创建小组件
const widget = new ListWidget();
// widget.useDefaultPadding();
// 设置内边距
// widget.setPadding(10, 10, 10, 10);
// 设置背景颜色（深色背景）
widget.backgroundColor = Color.dynamic(new Color('#FFFFFF'), new Color('#000000'));
// 设置间距
widget.spacing = 10;

// 示例生日数据
const days = [
  {
    name: '2026 元旦',
    date: '2026-01-01',
  },
  {
    name: '除夕',
    date: '2026-02-16',
  },
];

// 限制显示数量
const displayDays = (globalConfig.days || [])
  .sort((a: any, b: any) => (a.date > b.date ? 1 : -1))
  .slice(0, displayCount) as any[];

if (displayDays.length < displayCount) {
  for (let i = displayDays.length; i < displayCount; i++) {
    displayDays.push({
      name: ' ',
      date: '',
    });
  }
}

// 创建每个生日条目
displayDays.forEach(day => {
  // 创建行容器（水平布局）
  const row = widget.addStack();
  row.layoutHorizontally();
  row.spacing = 10;

  // 左侧内容区域（垂直布局）
  const leftContent = row.addStack();
  leftContent.layoutVertically();
  leftContent.spacing = 4;

  // 第一行：名称
  const titleRow = leftContent.addStack();
  titleRow.layoutHorizontally();
  titleRow.spacing = 6;

  // 名称
  const titleText = titleRow.addText(day.name);
  titleText.font = Font.systemFont(16);
  titleText.textColor = Color.dynamic(new Color('#000000'), new Color('#FFFFFF'));

  // 第二行：日期
  const dateRow = leftContent.addStack();
  dateRow.layoutHorizontally();
  dateRow.spacing = 8;

  // 日期文本
  const targetDate = getTargetDate(day.date);
  const dateText = dateRow.addText(targetDate ? formatDate(targetDate) : ' ');
  dateText.font = Font.systemFont(9);
  dateText.textColor = Color.dynamic(new Color('#000000'), new Color('#FFFFFF'));

  // 添加弹性间隔，将右侧内容推到右边
  row.addSpacer();

  // 右侧天数倒计时区域（垂直布局）
  const rightContent = row.addStack();
  rightContent.layoutVertically();
  rightContent.spacing = 2;

  // 计算天数
  const daysLeft = targetDate ? getDaysUntilTargetDate(targetDate) : ' ';

  // 天数数字（大号加粗）
  const daysText = rightContent.addText(daysLeft.toString());
  daysText.font = Font.boldSystemFont(24);
  daysText.textColor = Color.dynamic(new Color('#000000'), new Color('#FFFFFF'));
  daysText.rightAlignText();
});

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  switch (args.widgetParameter) {
    case 'large':
      widget.presentLarge();
      break;
    case 'medium':
      widget.presentMedium();
      break;
    default:
      widget.presentSmall();
  }
}

Script.complete();

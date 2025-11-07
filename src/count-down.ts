export {};

let widgetSize: string;
// 获取当前小组件的尺寸
if (config.runsInWidget) {
  widgetSize = config.widgetFamily || 'small';
} else {
  // DEBUG
  widgetSize = 'large';
}

// 不同尺寸的要展示的数量
const sizeConfig: Record<string, number> = {
  small: 3,
  medium: 3,
  large: 7,
};

const displayCount: number = sizeConfig[widgetSize];

// 计算距离目标日期的天数
function getDaysUntilTargetDate(targetDate: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 计算天数差
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

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
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  } catch (error) {
    return null;
  }
}

// 创建小组件
const widget = new ListWidget();
// 使用默认内边距
widget.useDefaultPadding();
// 设置背景颜色
widget.backgroundColor = Color.dynamic(new Color('#FFFFFF'), new Color('#1c1c1c'));
// 设置间距
widget.spacing = 8;

// 示例生日数据
const DEBUG_DAYS = {
  昨天: '2025-11-06',
  今天: '2025-11-07',
  元旦: '2026-01-01',
  春节: '2026-02-17',
  清明节: '2026-04-04',
  劳动节: '2026-05-01',
  端午节: '2026-06-19',
  国庆节: '2026-10-01',
  中秋节: '2026-10-06',
};

// 限制显示数量
const displayDays: { name: string; date: string; isEmpty?: boolean }[] = (
  Object.entries(__IS_DEV__ ? DEBUG_DAYS : __GLOBAL_CONFIG__.days || {}) as [string, string][]
)
  .map(([name, date]) => ({
    name,
    date,
  }))
  .sort((a, b) => (a.date > b.date ? 1 : -1))
  .filter(v => {
    // 移除当前日期之前的日期
    const [year, month, day] = v.date.split('-').map(Number);
    const today = new Date();
    if (year > today.getFullYear()) {
      return true;
    } else if (year === today.getFullYear()) {
      return month > today.getMonth() + 1 || (month === today.getMonth() + 1 && day >= today.getDate());
    }
    return false;
  })
  .slice(0, displayCount);

if (displayDays.length < displayCount) {
  for (let i = displayDays.length; i < displayCount; i++) {
    displayDays.push({
      name: '',
      date: '',
      isEmpty: true,
    });
  }
}

// 创建每个日期条目
displayDays.forEach((day, index) => {
  // 创建行容器（水平布局）
  const row = widget.addStack();
  row.layoutHorizontally();

  // 左侧内容区域（垂直布局）
  const leftContent = row.addStack();
  leftContent.layoutVertically();
  leftContent.spacing = 1;

  // 标题行
  const titleRow = leftContent.addStack();
  titleRow.layoutHorizontally();
  titleRow.spacing = 2;

  // 日期名称
  const titleText = titleRow.addText(day.name);
  titleText.font = Font.systemFont(16);
  titleText.textColor = Color.dynamic(new Color('#000000'), new Color('#FFFFFF'));

  // 日期行
  const dateRow = leftContent.addStack();
  dateRow.layoutHorizontally();
  dateRow.spacing = 2;

  // 日期文本
  const targetDate = day.isEmpty ? null : getTargetDate(day.date);
  const dateText = dateRow.addText(day.isEmpty ? ' ' : formatDate(targetDate!));
  dateText.font = Font.regularRoundedSystemFont(9);
  dateText.textColor = Color.dynamic(new Color('#979797'), new Color('#8e8e8e'));

  // 添加弹性间隔，将右侧内容推到右边
  row.addSpacer();

  // 右侧天数倒计时区域
  const rightContent = row.addStack();
  rightContent.layoutHorizontally();
  rightContent.bottomAlignContent();
  rightContent.spacing = 2;

  // 计算天数
  const daysLeft = day.isEmpty ? ' ' : getDaysUntilTargetDate(targetDate!);
  // 天数数字
  const daysStack = rightContent.addStack();
  daysStack.spacing = 2;
  daysStack.topAlignContent();

  const daysText = daysStack.addText(daysLeft.toString());
  daysText.font = Font.boldRoundedSystemFont(22);
  daysText.textColor = Color.dynamic(new Color('#000000'), new Color('#FFFFFF'));
  daysText.rightAlignText();

  const dayStack = rightContent.addStack();
  dayStack.setPadding(0, 0, 4, 0);

  if (!day.isEmpty) {
    const dayText = dayStack.addText('天');
    dayText.font = Font.boldRoundedSystemFont(10);
    dayText.textColor = Color.dynamic(new Color('#979797'), new Color('#8e8e8e'));
    dayText.rightAlignText();
  }

  if (index < displayDays.length - 1) {
    const splitLineStack = widget.addStack();
    splitLineStack.layoutHorizontally();
    splitLineStack.setPadding(0, 0, 0, 0);
    splitLineStack.size = new Size(widgetSize === 'small' ? 126 : 306, 1);
    splitLineStack.borderWidth = 1;
    splitLineStack.borderColor = day.isEmpty
      ? new Color('#FFFFFF', 0)
      : Color.dynamic(new Color('#E5E5E5'), new Color('#333333'));
    splitLineStack.cornerRadius = 1;
  }
});

if (config.runsInWidget) {
  // 在小组件中运行
  Script.setWidget(widget);
} else if (config.runsInApp) {
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

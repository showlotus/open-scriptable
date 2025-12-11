interface Options {
  /**
   * 主题
   */
  theme?: string;
  /**
   * 日期列表
   */
  days?: Record<string, string>;
  /**
   * 日历是否启用
   */
  calendarEnabled?: boolean;
}

interface Theme {
  /**
   * 小组件背景颜色
   */
  backgroundColor: Color;
  /**
   * 日期标题颜色
   */
  dateTitleTextColor: Color;
  /**
   * 日期描述颜色
   */
  dateDescriptionTextColor: Color;
  /**
   * 天数文本颜色
   */
  daysTextColor: Color;
  /**
   * 天数单位文本颜色
   */
  daysUnitTextColor: Color;
  /**
   * 分割线颜色
   */
  lineColor: Color;
  /**
   * 空分割线颜色
   */
  emptyLineColor: Color;
}

async function render(options: Options) {
  // 不同尺寸的要展示的数量
  const sizeConfig: Record<string, number> = {
    small: 3,
    medium: 3,
    large: 7,
  };

  let widgetSize: string;
  // 获取当前小组件的尺寸
  if (config.runsInWidget) {
    widgetSize = config.widgetFamily || 'small';
  } else {
    // DEBUG
    widgetSize = 'large';
  }

  const displayCount: number = sizeConfig[widgetSize];

  const parameters = args.widgetParameter?.trim();
  const [calendarTypes = '', theme = 'default'] = parameters?.split(',') || [];

  const themes: Record<string, Theme> = {
    default: {
      backgroundColor: Color.dynamic(new Color('#FFFFFF'), new Color('#1c1c1c')),
      dateTitleTextColor: Color.dynamic(new Color('#000000'), new Color('#FFFFFF')),
      dateDescriptionTextColor: Color.dynamic(new Color('#979797'), new Color('#8e8e8e')),
      daysTextColor: Color.dynamic(new Color('#000000'), new Color('#FFFFFF')),
      daysUnitTextColor: Color.dynamic(new Color('#979797'), new Color('#8e8e8e')),
      lineColor: new Color('#8C8C8C', 0.2),
      emptyLineColor: new Color('#ffffff', 0),
    },
  };

  const themeName = getConfig('theme', 'default')!;
  const currentTheme = themes[themeName] || themes.default;

  function getConfig<K extends keyof Options>(prop: K, defaultValue: Options[K]) {
    return options[prop] || defaultValue;
  }

  // 格式化日期
  function formatDate(date: Date, format: string): string {
    const formatter = new DateFormatter();
    formatter.dateFormat = format;
    return formatter.string(date);
  }

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
  function formatDateToWeekDay(date: Date): string {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const dayName = days[date.getDay()];
    const monthName = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const format = `yyyy/MM/dd${widgetSize === 'small' ? '' : ', EEEE'}`;
    return formatDate(date, format);
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

  // 绘制线段
  function drawLine(width: number, height: number, color: Color) {
    const context = new DrawContext();
    context.size = new Size(width, height);
    context.opaque = false;
    context.respectScreenScale = true;
    context.setFillColor(color);

    const backgroundPath = new Path();
    backgroundPath.addRoundedRect(new Rect(0, 0, width, height), height / 2, height / 2);
    context.addPath(backgroundPath);
    context.fillPath();

    return context.getImage();
  }

  function groupBy(data: any[], key: string) {
    return data.reduce((acc, item) => {
      acc[item[key]] = acc[item[key]] || [];
      acc[item[key]].push(item);
      return acc;
    }, {});
  }

  async function getCalendarData() {
    const calendars = await Calendar.forEvents();

    // 获取当前日期后 6 个月内的数据
    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 6);

    const events = await CalendarEvent.between(start, end, calendars);
    const data = events
      .map(event => {
        const dateStr = formatDate(
          event.startDate,
          `yyyy/MM/dd${event.isAllDay ? '' : ' HH:mm'}${widgetSize === 'small' ? '' : ', EEEE'}`,
        );
        return {
          name: event.title,
          date: event.startDate,
          dateStr,
          isEmpty: false,
          type: event.calendar.title,
          color: '#' + event.calendar.color.hex,
        };
      })
      .filter(v => {
        // 过滤掉特殊节假日日期，节日名中含有中文括号的
        if (v.type === '中国大陆节假日' && /（|）/.test(v.name)) {
          return false;
        }
        return true;
      })
      .filter(v => {
        // 过滤出指定类型的日历事件
        if (calendarTypes.trim().length > 0) {
          const types = calendarTypes.split('/');
          return types.includes(v.type);
        }
        return true;
      });
    return data;
  }

  const calendarData = await getCalendarData();

  // 创建小组件
  const widget = new ListWidget();
  // 使用默认内边距
  // widget.useDefaultPadding();
  // 设置背景颜色
  widget.backgroundColor = currentTheme.backgroundColor;
  // 设置间距
  widget.spacing = 8;

  // 示例日期
  const MOCK_DAYS = {
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
  const displayDays: { name: string; date: string; isEmpty: boolean }[] = (
    Object.entries((__IS_DEV__ ? MOCK_DAYS : getConfig('days', {})) || {}) as [string, string][]
  )
    .map(([name, date]) => ({
      name,
      date,
      isEmpty: false,
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

  for (let i = 0; i < displayCount; i++) {
    const day = calendarData[i] || { name: '', date: '', isEmpty: true };
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
    titleText.font = Font.mediumRoundedSystemFont(14);
    titleText.textColor = day.color ? new Color(day.color) : currentTheme.dateTitleTextColor;

    // 日期行
    const dateRow = leftContent.addStack();
    dateRow.layoutHorizontally();
    dateRow.spacing = 2;

    // 日期文本
    const dateText = dateRow.addText(day.isEmpty ? ' ' : day.dateStr);
    dateText.font = Font.mediumRoundedSystemFont(10);
    dateText.textColor = currentTheme.dateDescriptionTextColor;

    // 添加弹性间隔，将右侧内容推到右边
    row.addSpacer();

    // 右侧天数倒计时区域
    const rightContent = row.addStack();
    rightContent.layoutHorizontally();
    rightContent.bottomAlignContent();
    rightContent.spacing = 2;

    // 计算天数
    const daysLeft = day.isEmpty ? ' ' : getDaysUntilTargetDate(day.date);
    // 天数数字
    const daysStack = rightContent.addStack();
    daysStack.spacing = 2;
    daysStack.topAlignContent();

    const daysText = daysStack.addText(daysLeft.toString());
    daysText.font = Font.mediumRoundedSystemFont(24);
    daysText.textColor = day.color ? new Color(day.color) : currentTheme.daysTextColor;
    daysText.rightAlignText();

    const dayStack = rightContent.addStack();
    dayStack.setPadding(0, 0, 4, 0);

    if (!day.isEmpty) {
      const dayText = dayStack.addText('天');
      dayText.font = Font.mediumRoundedSystemFont(10);
      dayText.textColor = currentTheme.daysUnitTextColor;
      dayText.rightAlignText();
    }

    // 绘制分割线
    if (i < displayCount - 1) {
      const splitLineStack = widget.addStack();
      splitLineStack.layoutHorizontally();
      splitLineStack.centerAlignContent();

      const width = widgetSize === 'small' ? 126 : 305;
      const height = 1;
      let color = currentTheme.lineColor;
      if (day.isEmpty) {
        color = currentTheme.emptyLineColor;
      }

      const splitLineImage = splitLineStack.addImage(drawLine(width, height, color));
      splitLineImage.centerAlignImage();
    }
  }

  if (config.runsInWidget) {
    // 在小组件中运行
    Script.setWidget(widget);
  } else if (config.runsInApp) {
    // 在 Scriptable 应用中运行
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

export { render };

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
  /**
   * 布局模式：single 单列 / double 双列（仅中号、大号生效）
   */
  layout?: 'single' | 'double';
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

async function render(options: Options = {}) {
  let widgetSize: string;
  // 获取当前小组件的尺寸
  if (config.runsInWidget) {
    widgetSize = config.widgetFamily || 'small';
  } else {
    // DEBUG
    widgetSize = 'large';
  }

  // 小部件参数：日历类型,布局（single/double），中英文逗号均可
  const parameters = args.widgetParameter?.trim();
  const segments = parameters?.split(/,|，/).map(segment => segment.trim()) || [];
  const [firstSegment = '', secondSegment = ''] = segments;

  // 只传一段且是布局关键词时，视为布局而非日历类型
  const onlyLayout = !secondSegment && ['single', 'double'].includes(firstSegment.toLowerCase());
  const calendarTypes = onlyLayout ? '' : firstSegment;
  const layoutParam = onlyLayout ? firstSegment : secondSegment;

  // 布局模式：options 优先，其次小部件参数，默认单列
  const layout: 'single' | 'double' =
    getConfig('layout', layoutParam.toLowerCase() === 'double' ? 'double' : 'single') ?? 'single';

  // 双列布局仅中号、大号生效，小号保持单列
  const isDoubleLayout = layout === 'double' && widgetSize !== 'small';

  // 不同尺寸的要展示的数量
  const sizeConfig: Record<string, number> = isDoubleLayout
    ? { small: 3, medium: 6, large: 14 }
    : { small: 3, medium: 3, large: 7 };

  const displayCount: number = sizeConfig[widgetSize];

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

  function groupBy(data: any[], key: string) {
    return data.reduce((acc, item) => {
      acc[item[key]] = acc[item[key]] || [];
      acc[item[key]].push(item);
      return acc;
    }, {});
  }

  function getCalshowUrl(date: Date) {
    const now = Math.floor(date.getTime() / 1000);
    // 2001-01-01 00:00:00
    const start = 978307200;
    return `calshow:${now - start}`;
  }

  async function getCalendarData() {
    const calendars = await Calendar.forEvents();

    // 获取当前日期后 12 个月内的数据
    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 12);

    const events = await CalendarEvent.between(start, end, calendars);
    const data = events
      .map(event => {
        // 小号只显示年月日，双列显示到星期，单列中/大号按「日期 星期 时间」显示
        const dateFormat =
          widgetSize === 'small'
            ? 'yyyy/MM/dd'
            : isDoubleLayout
              ? 'yyyy/MM/dd EEEE'
              : `yyyy/MM/dd EEEE${event.isAllDay ? '' : ' HH:mm'}`;
        const dateStr = formatDate(event.startDate, dateFormat);
        return {
          name: event.title,
          date: event.startDate,
          dateStr,
          isEmpty: false,
          type: event.calendar.title,
          color: '#' + event.calendar.color.hex,
          // 定位到事件
          eventUrl: `x-apple-calevent://${event.identifier.replace(/:/g, '/')}`,
          // 定位到天
          calshowUrl: getCalshowUrl(event.startDate),
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

  // 获取指定位置的日期数据，不足时补空
  function getDayItem(index: number) {
    return calendarData[index] || { name: '', date: '', isEmpty: true, eventUrl: '', calshowUrl: '' };
  }

  type DayItem = ReturnType<typeof getDayItem>;

  // 渲染单个倒计时项：左侧标题和日期，右侧天数
  function renderItem(parent: WidgetStack, day: DayItem) {
    // 左侧内容区域（垂直布局）
    const leftContent = parent.addStack();
    leftContent.layoutVertically();
    leftContent.spacing = 1;
    // 打开日历事件
    if (day.eventUrl) {
      leftContent.url = day.eventUrl;
    }

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
    parent.addSpacer();

    // 右侧天数倒计时区域
    const rightContent = parent.addStack();
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
  }

  // 绘制分割线：弹性撑满整列宽度，用背景色代替图片；格子为空时使用透明分割线
  function renderDivider(parent: ListWidget | WidgetStack, day: DayItem) {
    const splitLineStack = parent.addStack();
    splitLineStack.layoutHorizontally();
    splitLineStack.addSpacer();
    splitLineStack.backgroundColor = day.isEmpty ? currentTheme.emptyLineColor : currentTheme.lineColor;
    splitLineStack.setPadding(0.5, 0, 0.5, 0);
  }

  if (isDoubleLayout) {
    // 两列布局：从左到右、从上到下排列
    // 两列之间的间距
    const columnGap = 12;
    const rows = displayCount / 2;
    for (let row = 0; row < rows; row++) {
      // 创建行容器（水平布局）
      const gridRow = widget.addStack();
      gridRow.layoutHorizontally();

      const leftDay = getDayItem(row * 2);
      const rightDay = getDayItem(row * 2 + 1);

      // 左列格子（垂直布局：内容 + 独立分割线）
      const leftCell = gridRow.addStack();
      leftCell.layoutVertically();
      leftCell.spacing = 8;

      const leftItem = leftCell.addStack();
      leftItem.layoutHorizontally();
      renderItem(leftItem, leftDay);

      // 绘制分割线
      if (row < rows - 1) {
        renderDivider(leftCell, leftDay);
      }

      // 两列之间的固定间距
      gridRow.addSpacer(columnGap);

      // 右列格子（垂直布局：内容 + 独立分割线）
      const rightCell = gridRow.addStack();
      rightCell.layoutVertically();
      rightCell.spacing = 8;

      const rightItem = rightCell.addStack();
      rightItem.layoutHorizontally();
      renderItem(rightItem, rightDay);

      // 绘制分割线
      if (row < rows - 1) {
        renderDivider(rightCell, rightDay);
      }
    }
  } else {
    for (let i = 0; i < displayCount; i++) {
      const day = getDayItem(i);
      // 创建行容器（水平布局）
      const row = widget.addStack();
      row.layoutHorizontally();
      renderItem(row, day);

      // 绘制分割线
      if (i < displayCount - 1) {
        renderDivider(widget, day);
      }
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

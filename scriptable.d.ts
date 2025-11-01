export {};

declare global {
  // ==================== 基础类型和几何类 ====================

  /**
   * 字体类
   */
  class Font {
    /** 粗体系统字体 */
    static boldSystemFont(size: number): Font;
    /** 斜体系统字体 */
    static italicSystemFont(size: number): Font;
    /** 细体系统字体 */
    static lightSystemFont(size: number): Font;
    /** 中等系统字体 */
    static mediumSystemFont(size: number): Font;
    /** 常规系统字体 */
    static regularSystemFont(size: number): Font;
    /** 半粗体系统字体 */
    static semiboldSystemFont(size: number): Font;
    /** 系统字体 */
    static systemFont(size: number): Font;
    /** 超细系统字体 */
    static ultraLightSystemFont(size: number): Font;
    /** 极细系统字体 */
    static thinSystemFont(size: number): Font;
    /** 重磅系统字体 */
    static heavySystemFont(size: number): Font;
    /** 黑色系统字体 */
    static blackSystemFont(size: number): Font;
    /** 等宽系统字体 */
    static monospacedSystemFont(size: number, weight: number): Font;
    /** 等宽数字系统字体 */
    static monospacedDigitSystemFont(size: number, weight: number): Font;
    /** 圆角系统字体 */
    static roundedSystemFont(size: number, weight: number): Font;
    /** 自定义字体 */
    static custom(name: string, size: number): Font;
    /** 大标题字体 */
    static largeTitle(): Font;
    /** 标题 1 字体 */
    static title1(): Font;
    /** 标题 2 字体 */
    static title2(): Font;
    /** 标题 3 字体 */
    static title3(): Font;
    /** 标题字体 */
    static headline(): Font;
    /** 副标题字体 */
    static subheadline(): Font;
    /** 正文字体 */
    static body(): Font;
    /** 标注字体 */
    static callout(): Font;
    /** 脚注字体 */
    static footnote(): Font;
    /** 说明字体 */
    static caption1(): Font;
    /** 说明 2 字体 */
    static caption2(): Font;
  }

  /**
   * 尺寸类
   */
  class Size {
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;

    constructor(width: number, height: number);
  }

  /**
   * 点类
   */
  class Point {
    /** x 坐标 */
    x: number;
    /** y 坐标 */
    y: number;

    constructor(x: number, y: number);
  }

  /**
   * 矩形类
   */
  class Rect {
    /** x 坐标 */
    x: number;
    /** y 坐标 */
    y: number;
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;
    /** 最小 x 坐标 */
    readonly minX: number;
    /** 最小 y 坐标 */
    readonly minY: number;
    /** 最大 x 坐标 */
    readonly maxX: number;
    /** 最大 y 坐标 */
    readonly maxY: number;
    /** 原点 */
    readonly origin: Point;
    /** 尺寸 */
    readonly size: Size;

    constructor(x: number, y: number, width: number, height: number);
  }

  /**
   * 路径类
   */
  class Path {
    /** 移动到点 */
    move(point: Point): void;
    /** 添加线条到点 */
    addLine(point: Point): void;
    /** 添加矩形 */
    addRect(rect: Rect): void;
    /** 添加椭圆 */
    addEllipse(rect: Rect): void;
    /** 添加圆角矩形 */
    addRoundedRect(rect: Rect, cornerWidth: number, cornerHeight: number): void;
    /** 添加曲线 */
    addCurve(point: Point, control1: Point, control2: Point): void;
    /** 添加二次曲线 */
    addQuadCurve(point: Point, control: Point): void;
    /** 添加多条线 */
    addLines(points: Point[]): void;
    /** 添加多个矩形 */
    addRects(rects: Rect[]): void;
    /** 关闭子路径 */
    closeSubpath(): void;
  }

  /**
   * 数据类
   */
  class Data {
    /** 从字符串创建数据 */
    static fromString(string: string): Data;
    /** 从文件创建数据 */
    static fromFile(filePath: string): Data;
    /** 从 Base64 字符串创建数据 */
    static fromBase64String(base64String: string): Data;
    /** 从 JPEG 图像创建数据 */
    static fromJPEG(image: Image): Data;
    /** 从 PNG 图像创建数据 */
    static fromPNG(image: Image): Data;
    /** 从字节数组创建数据 */
    static fromBytes(bytes: number[]): Data;
    /** 转换为原始字符串 */
    toRawString(): string;
    /** 转换为 Base64 字符串 */
    toBase64String(): string;
    /** 获取字节数组 */
    getBytes(): number[];
  }

  // ==================== 小组件相关类 ====================

  /**
   * 小组件文本类
   */
  class WidgetText {
    /** 文本内容 */
    text: string;
    /** 文本颜色 */
    textColor: Color;
    /** 字体 */
    font: Font;
    /** 文本透明度 */
    textOpacity: number;
    /** 行数限制 */
    lineLimit: number;
    /** 最小缩放因子 */
    minimumScaleFactor: number;
    /** 阴影颜色 */
    shadowColor: Color;
    /** 阴影半径 */
    shadowRadius: number;
    /** 阴影偏移 */
    shadowOffset: Point;
    /** 点击 URL */
    url: string;

    /** 文本居中对齐 */
    centerAlignText(): void;
    /** 文本左对齐 */
    leftAlignText(): void;
    /** 文本右对齐 */
    rightAlignText(): void;
  }

  /**
   * 小组件图像类
   */
  class WidgetImage {
    /** 图像 */
    image: Image;
    /** 图像尺寸 */
    imageSize: Size;
    /** 图像透明度 */
    imageOpacity: number;
    /** 圆角半径 */
    cornerRadius: number;
    /** 边框宽度 */
    borderWidth: number;
    /** 边框颜色 */
    borderColor: Color;
    /** 容器相对形状 */
    containerRelativeShape: boolean;
    /** 色调 */
    tintColor: Color;
    /** 点击 URL */
    url: string;
    /** 可调整大小 */
    resizable: boolean;
    /** 图像对齐方式 */
    imageAlignment: number;

    /** 左对齐图像 */
    leftAlignImage(): void;
    /** 居中对齐图像 */
    centerAlignImage(): void;
    /** 右对齐图像 */
    rightAlignImage(): void;
    /** 应用过滤色 */
    applyFillingContentMode(): void;
    /** 应用适配内容模式 */
    applyFittingContentMode(): void;
  }

  /**
   * 小组件日期类
   */
  class WidgetDate {
    /** 日期 */
    date: Date;
    /** 文本颜色 */
    textColor: Color;
    /** 字体 */
    font: Font;
    /** 文本透明度 */
    textOpacity: number;
    /** 行数限制 */
    lineLimit: number;
    /** 最小缩放因子 */
    minimumScaleFactor: number;
    /** 阴影颜色 */
    shadowColor: Color;
    /** 阴影半径 */
    shadowRadius: number;
    /** 阴影偏移 */
    shadowOffset: Point;
    /** 点击 URL */
    url: string;

    /** 左对齐文本 */
    leftAlignText(): void;
    /** 居中对齐文本 */
    centerAlignText(): void;
    /** 右对齐文本 */
    rightAlignText(): void;
    /** 应用时间样式 */
    applyTimeStyle(): void;
    /** 应用日期样式 */
    applyDateStyle(): void;
    /** 应用相对样式 */
    applyRelativeStyle(): void;
    /** 应用偏移样式 */
    applyOffsetStyle(): void;
    /** 应用计时器样式 */
    applyTimerStyle(): void;
  }

  /**
   * 小组件间隔类
   */
  class WidgetSpacer {
    /** 间隔长度 */
    length: number;
  }

  /**
   * 小组件堆栈类
   */
  class WidgetStack {
    /** 背景颜色 */
    backgroundColor: Color;
    /** 背景图像 */
    backgroundImage: Image;
    /** 背景渐变 */
    backgroundGradient: LinearGradient;
    /** 间距 */
    spacing: number;
    /** 尺寸 */
    size: Size;
    /** 圆角半径 */
    cornerRadius: number;
    /** 边框宽度 */
    borderWidth: number;
    /** 边框颜色 */
    borderColor: Color;
    /** 点击 URL */
    url: string;

    /** 添加文本 */
    addText(text: string): WidgetText;
    /** 添加日期 */
    addDate(date: Date): WidgetDate;
    /** 添加图像 */
    addImage(image: Image): WidgetImage;
    /** 添加间隔 */
    addSpacer(length?: number | null): WidgetSpacer;
    /** 添加堆栈 */
    addStack(): WidgetStack;
    /** 设置内边距 */
    setPadding(top: number, leading: number, bottom: number, trailing: number): void;
    /** 使用默认内边距 */
    useDefaultPadding(): void;
    /** 顶部对齐内容 */
    topAlignContent(): void;
    /** 居中对齐内容 */
    centerAlignContent(): void;
    /** 底部对齐内容 */
    bottomAlignContent(): void;
    /** 水平布局 */
    layoutHorizontally(): void;
    /** 垂直布局 */
    layoutVertically(): void;
  }

  /**
   * 线性渐变类
   */
  class LinearGradient {
    /** 渐变颜色 */
    colors: Color[];
    /** 渐变位置 */
    locations: number[];
    /** 起始点 */
    startPoint: Point;
    /** 结束点 */
    endPoint: Point;

    constructor();
  }

  /**
   * 颜色类
   */
  class Color {
    constructor(hex: string, alpha?: number);
    /** 创建动态颜色（支持亮色和暗色模式） */
    static dynamic(lightColor: Color, darkColor: Color): Color;
    static black(): Color;
    static white(): Color;
    static red(): Color;
    static green(): Color;
    static blue(): Color;
  }

  /**
   * 列表小组件类
   */
  class ListWidget {
    /** 背景颜色 */
    backgroundColor: Color;
    /** 背景图像 */
    backgroundImage: Image;
    /** 背景渐变 */
    backgroundGradient: LinearGradient;
    /** 间距 */
    spacing: number;
    /** 点击 URL */
    url: string;
    /** 刷新时间 */
    refreshAfterDate: Date;
    /** 添加辅助小组件背景 */
    addAccessoryWidgetBackground: boolean;

    /** 添加文本 */
    addText(text: string): WidgetText;
    /** 添加日期 */
    addDate(date: Date): WidgetDate;
    /** 添加图像 */
    addImage(image: Image): WidgetImage;
    /** 添加间隔 */
    addSpacer(length?: number | null): WidgetSpacer;
    /** 添加堆栈 */
    addStack(): WidgetStack;
    /** 设置内边距 */
    setPadding(top: number, leading: number, bottom: number, trailing: number): void;
    /** 使用默认内边距 */
    useDefaultPadding(): void;
    /** 以小尺寸展示小组件 */
    presentSmall(): Promise<void>;
    /** 以中尺寸展示小组件 */
    presentMedium(): Promise<void>;
    /** 以大尺寸展示小组件 */
    presentLarge(): Promise<void>;
    /** 以超大尺寸展示小组件 */
    presentExtraLarge(): Promise<void>;
    /** 展示辅助内联小组件 */
    presentAccessoryInline(): Promise<void>;
    /** 展示辅助圆形小组件 */
    presentAccessoryCircular(): Promise<void>;
    /** 展示辅助矩形小组件 */
    presentAccessoryRectangular(): Promise<void>;
  }

  /**
   * 脚本类
   */
  class Script {
    /** 脚本名称 */
    static name(): string;
    /** 设置小组件 */
    static setWidget(widget: ListWidget): void;
    /** 设置快捷指令输出 */
    static setShortcutOutput(value: any): void;
    /** 完成脚本执行 */
    static complete(): void;
  }

  // ==================== UI 交互类 ====================

  /**
   * 警告弹窗类
   */
  class Alert {
    /** 标题 */
    title: string;
    /** 消息内容 */
    message: string;

    constructor();

    /** 添加操作按钮 */
    addAction(title: string): void;
    /** 添加取消按钮 */
    addCancelAction(title: string): void;
    /** 添加破坏性操作按钮 */
    addDestructiveAction(title: string): void;
    /** 添加文本输入框 */
    addTextField(placeholder?: string, text?: string): TextField;
    /** 添加安全文本输入框 */
    addSecureTextField(placeholder?: string, text?: string): TextField;
    /** 获取文本输入框 */
    textFieldValue(index: number): string;
    /** 展示为弹窗 */
    present(): Promise<number>;
    /** 展示为操作表单 */
    presentSheet(): Promise<number>;
    /** 展示为警告 */
    presentAlert(): Promise<number>;
  }

  /**
   * 文本输入框类
   */
  class TextField {
    /** 文本内容 */
    text: string;
    /** 占位符 */
    placeholder: string;
    /** 是否安全输入 */
    isSecure: boolean;
    /** 文本颜色 */
    textColor: Color;
    /** 字体 */
    font: Font;
    /** 左对齐文本 */
    leftAlignText(): void;
    /** 居中对齐文本 */
    centerAlignText(): void;
    /** 右对齐文本 */
    rightAlignText(): void;
    /** 设置小数键盘 */
    setDecimalPadKeyboard(): void;
    /** 设置默认键盘 */
    setDefaultKeyboard(): void;
    /** 设置邮箱键盘 */
    setEmailAddressKeyboard(): void;
    /** 设置数字键盘 */
    setNumberPadKeyboard(): void;
    /** 设置数字和标点键盘 */
    setNumbersAndPunctuationKeyboard(): void;
    /** 设置电话键盘 */
    setPhonePadKeyboard(): void;
    /** 设置 Twitter 键盘 */
    setTwitterKeyboard(): void;
    /** 设置 URL 键盘 */
    setURLKeyboard(): void;
    /** 设置 Web 搜索键盘 */
    setWebSearchKeyboard(): void;
  }

  /**
   * UI 表格类
   */
  class UITable {
    /** 是否显示分隔符 */
    showSeparators: boolean;

    constructor();

    /** 添加行 */
    addRow(row: UITableRow): void;
    /** 移除行 */
    removeRow(row: UITableRow): void;
    /** 移除所有行 */
    removeAllRows(): void;
    /** 重新加载 */
    reload(): void;
    /** 展示表格 */
    present(fullscreen?: boolean): Promise<number>;
  }

  /**
   * UI 表格行类
   */
  class UITableRow {
    /** 是否可取消选中 */
    isHeader: boolean;
    /** 是否可取消 */
    dismissOnSelect: boolean;
    /** 行高度 */
    height: number;
    /** 背景颜色 */
    backgroundColor: Color;
    /** 点击回调 */
    onSelect: () => void;

    constructor();

    /** 添加单元格 */
    addCell(cell: UITableCell): void;
    /** 添加文本 */
    addText(title: string, subtitle?: string): UITableCell;
    /** 添加图像 */
    addImage(image: Image): UITableCell;
    /** 添加图像并附带文本 */
    addImageAtURL(url: string): UITableCell;
    /** 添加按钮 */
    addButton(title: string): UITableCell;
  }

  /**
   * UI 表格单元格类
   */
  class UITableCell {
    /** 标题文本 */
    title: string;
    /** 副标题文本 */
    subtitle: string;
    /** 标题颜色 */
    titleColor: Color;
    /** 副标题颜色 */
    subtitleColor: Color;
    /** 标题字体 */
    titleFont: Font;
    /** 副标题字体 */
    subtitleFont: Font;
    /** 左对齐 */
    leftAligned(): void;
    /** 居中对齐 */
    centerAligned(): void;
    /** 右对齐 */
    rightAligned(): void;
  }

  /**
   * WebView 网页视图类
   */
  class WebView {
    constructor();

    /** 加载 HTML */
    loadHTML(html: string, baseURL?: string): Promise<void>;
    /** 加载 URL */
    loadURL(url: string): Promise<void>;
    /** 加载请求 */
    loadRequest(request: Request): Promise<void>;
    /** 执行 JavaScript */
    evaluateJavaScript(script: string, useCallback?: boolean): Promise<any>;
    /** 获取 HTML */
    getHTML(): Promise<string>;
    /** 展示 */
    present(fullscreen?: boolean): Promise<void>;
    /** 等待加载完成 */
    waitForLoad(): Promise<void>;
  }

  /**
   * QuickLook 快速查看类
   */
  class QuickLook {
    /** 预览文件 */
    static present(item: any, fullscreen?: boolean): Promise<void>;
  }

  /**
   * Safari 浏览器类
   */
  class Safari {
    /** 打开 URL */
    static open(url: string): void;
    /** 打开并等待完成 */
    static openInApp(url: string, fullscreen?: boolean): Promise<void>;
  }

  // ==================== 文件和媒体类 ====================

  /**
   * 文件管理器类
   */
  class FileManager {
    /** 获取本地文件管理器 */
    static local(): FileManager;
    /** 获取 iCloud 文件管理器 */
    static iCloud(): FileManager;

    /** 读取文件 */
    read(filePath: string): Data;
    /** 读取文本文件为字符串 */
    readString(filePath: string): string;
    /** 读取图像文件 */
    readImage(filePath: string): Image;
    /** 写入文件 */
    write(filePath: string, content: Data): void;
    /** 写入字符串到文件 */
    writeString(filePath: string, content: string): void;
    /** 写入图像到文件 */
    writeImage(filePath: string, image: Image): void;
    /** 删除文件 */
    remove(filePath: string): void;
    /** 移动文件 */
    move(sourceFilePath: string, destinationFilePath: string): void;
    /** 复制文件 */
    copy(sourceFilePath: string, destinationFilePath: string): void;
    /** 文件是否存在 */
    fileExists(filePath: string): boolean;
    /** 是否为目录 */
    isDirectory(path: string): boolean;
    /** 创建目录 */
    createDirectory(path: string, intermediateDirectories?: boolean): void;
    /** 临时目录路径 */
    temporaryDirectory(): string;
    /** 缓存目录路径 */
    cacheDirectory(): string;
    /** 文档目录路径 */
    documentsDirectory(): string;
    /** 库目录路径 */
    libraryDirectory(): string;
    /** 列出目录内容 */
    listContents(directoryPath: string): string[];
    /** 获取文件名 */
    fileName(filePath: string, includeFileExtension?: boolean): string;
    /** 获取文件扩展名 */
    fileExtension(filePath: string): string;
    /** 获取所有文件标签 */
    allTags(filePath: string): string[];
    /** 添加文件标签 */
    addTag(filePath: string, tag: string): void;
    /** 移除文件标签 */
    removeTag(filePath: string, tag: string): void;
    /** 读取扩展属性 */
    readExtendedAttribute(filePath: string, name: string): string;
    /** 写入扩展属性 */
    writeExtendedAttribute(filePath: string, value: string, name: string): void;
    /** 移除扩展属性 */
    removeExtendedAttribute(filePath: string, name: string): void;
    /** 获取所有扩展属性 */
    allExtendedAttributes(filePath: string): string[];
    /** 获取 UTI */
    getUTI(filePath: string): string;
    /** 获取文件大小 */
    fileSize(filePath: string): number;
    /** 获取创建时间 */
    creationDate(filePath: string): Date;
    /** 获取修改时间 */
    modificationDate(filePath: string): Date;
    /** 设置修改时间 */
    setModificationDate(filePath: string, date: Date): void;
    /** 获取所有文件书签 */
    allFileBookmarks(): string[];
    /** 是否已下载 */
    isFileDownloaded(filePath: string): boolean;
    /** 下载文件 */
    downloadFileFromiCloud(filePath: string): Promise<void>;
    /** 是否已存储在 iCloud */
    isFileStoredIniCloud(filePath: string): boolean;
    /** 连接文件路径 */
    joinPath(lhsPath: string, rhsPath: string): string;
    /** 获取书签路径 */
    bookmarkedPath(name: string): string;
    /** 添加书签 */
    bookmarkPath(path: string, name: string): void;
  }

  /**
   * 图像类
   */
  class Image {
    /** 从文件加载图像 */
    static fromFile(filePath: string): Image;
    /** 从数据加载图像 */
    static fromData(data: Data): Image;

    /** 图像尺寸 */
    size: Size;

    /** 获取像素颜色 */
    getPixelColor(point: Point): Color;
  }

  /**
   * 照片类
   */
  class Photos {
    /** 从相册中选择照片 */
    static fromLibrary(): Promise<Image>;
    /** 从相机拍摄照片 */
    static fromCamera(): Promise<Image>;
    /** 移除最近的屏幕截图 */
    static removeLatestScreenshots(count?: number): Promise<void>;
    /** 获取最近的照片 */
    static latestPhoto(): Promise<Image>;
    /** 获取最近的照片列表 */
    static latestPhotos(count: number): Promise<Image[]>;
    /** 获取最近的屏幕截图 */
    static latestScreenshot(): Promise<Image>;
    /** 获取最近的屏幕截图列表 */
    static latestScreenshots(count: number): Promise<Image[]>;
    /** 保存到相册 */
    static save(image: Image): Promise<void>;
  }

  /**
   * 文档选择器类
   */
  class DocumentPicker {
    /** 打开文件 */
    static open(types?: string[]): Promise<string[]>;
    /** 打开单个文件 */
    static openFile(): Promise<string>;
    /** 打开多个文件 */
    static openMultiple(types?: string[]): Promise<string[]>;
    /** 导出文件 */
    static export(filePath: string): Promise<string[]>;
    /** 导出字符串 */
    static exportString(content: string, name?: string): Promise<string[]>;
    /** 导出图像 */
    static exportImage(image: Image, name?: string): Promise<string[]>;
    /** 导出数据 */
    static exportData(data: Data, name?: string): Promise<string[]>;
  }

  /**
   * 剪贴板类
   */
  class Pasteboard {
    /** 复制文本 */
    static copy(text: string): void;
    /** 复制图像 */
    static copyImage(image: Image): void;
    /** 粘贴文本 */
    static paste(): string;
    /** 粘贴图像 */
    static pasteImage(): Image;
  }

  /**
   * 钥匙串类
   */
  class Keychain {
    /** 设置值 */
    static set(key: string, value: string): void;
    /** 获取值 */
    static get(key: string): string;
    /** 是否包含键 */
    static contains(key: string): boolean;
    /** 删除键 */
    static remove(key: string): void;
  }

  /**
   * 绘图上下文类
   */
  class DrawContext {
    /** 尺寸 */
    size: Size;
    /** 是否不透明 */
    opaque: boolean;
    /** 缩放因子 */
    respectScreenScale: boolean;

    constructor(size: Size);

    /** 获取图像 */
    getImage(): Image;
    /** 绘制图像 */
    drawImageInRect(image: Image, rect: Rect): void;
    /** 绘制图像并指定点 */
    drawImageAtPoint(image: Image, point: Point): void;
    /** 设置填充颜色 */
    setFillColor(color: Color): void;
    /** 设置描边颜色 */
    setStrokeColor(color: Color): void;
    /** 设置线宽 */
    setLineWidth(width: number): void;
    /** 填充矩形 */
    fill(rect: Rect): void;
    /** 填充椭圆 */
    fillEllipse(rect: Rect): void;
    /** 描边矩形 */
    stroke(rect: Rect): void;
    /** 描边椭圆 */
    strokeEllipse(rect: Rect): void;
    /** 添加路径 */
    addPath(path: Path): void;
    /** 绘制路径 */
    strokePath(): void;
    /** 填充路径 */
    fillPath(): void;
    /** 绘制文本 */
    drawText(text: string, pos: Point): void;
    /** 绘制文本到矩形 */
    drawTextInRect(text: string, rect: Rect): void;
    /** 设置文本颜色 */
    setTextColor(color: Color): void;
    /** 设置字体 */
    setFont(font: Font): void;
    /** 设置文本对齐方式 */
    setTextAlignedLeft(): void;
    /** 设置文本居中对齐 */
    setTextAlignedCenter(): void;
    /** 设置文本右对齐 */
    setTextAlignedRight(): void;
  }

  // ==================== 网络和请求类 ====================

  /**
   * HTTP 请求类
   */
  class Request {
    /** 请求 URL */
    url: string;
    /** 请求方法 */
    method: string;
    /** 请求头 */
    headers: Record<string, string>;
    /** 请求体 */
    body: Data | string;
    /** 超时时间 */
    timeoutInterval: number;
    /** 重定向回调 */
    onRedirect: (request: Request) => Request | null;
    /** 响应 */
    response: {
      /** 响应 URL */
      url: string;
      /** 状态码 */
      statusCode: number;
      /** MIME 类型 */
      mimeType: string;
      /** 文本编码 */
      textEncodingName: string;
      /** 响应头 */
      headers: Record<string, string>;
      /** Cookie 列表 */
      cookies: Array<{
        domain: string;
        path: string;
        name: string;
        value: string;
        sessionOnly: boolean;
        httpOnly: boolean;
      }>;
    };
    /** 是否允许不安全的请求 */
    allowInsecureRequest: boolean;

    constructor(url: string);

    /** 加载数据 */
    load(): Promise<Data>;
    /** 加载字符串 */
    loadString(encoding?: string): Promise<string>;
    /** 加载 JSON */
    loadJSON(): Promise<any>;
    /** 加载图像 */
    loadImage(): Promise<Image>;
    /** 添加参数到多部分表单 */
    addParameterToMultipart(name: string, value: string): void;
    /** 添加文件数据到多部分表单 */
    addFileDataToMultipart(data: Data, mimeType: string, name: string, filename: string): void;
    /** 添加图像到多部分表单 */
    addImageToMultipart(image: Image, name: string, filename: string): void;
    /** 添加文件到多部分表单 */
    addFileToMultipart(filePath: string, name: string, filename: string): void;
  }

  /**
   * 回调 URL 类
   */
  class CallbackURL {
    /** URL */
    url: string;

    constructor(baseURL: string);

    /** 添加参数 */
    addParameter(name: string, value: string): void;
    /** 获取 URL */
    getURL(): string;
    /** 打开 URL */
    open(): Promise<void>;
  }

  /**
   * URL Scheme 类
   */
  class URLScheme {
    /** 获取所有参数 */
    static allParameters(): Record<string, string>;
    /** 获取参数 */
    static parameter(name: string): string;
    /** 强制完成 */
    static forceComplete(): void;
  }

  // ==================== 日历和提醒类 ====================

  /**
   * 日历类
   */
  class Calendar {
    /** 默认日历 */
    static defaultForEvents(): Calendar;
    /** 默认提醒日历 */
    static defaultForReminders(): Calendar;
    /** 获取所有事件日历 */
    static forEvents(): Promise<Calendar[]>;
    /** 获取所有提醒日历 */
    static forReminders(): Promise<Calendar[]>;
    /** 查找或创建日历 */
    static findOrCreateCalendar(title: string): Calendar;
    /** 通过标题查找日历 */
    static findCalendar(title: string): Calendar;
    /** 创建事件日历 */
    static createForEvents(title: string): Calendar;
    /** 创建提醒日历 */
    static createForReminders(title: string): Calendar;
    /** 通过标识符查找日历 */
    static forEventByIdentifier(identifier: string): Promise<Calendar>;
    /** 通过标识符查找提醒日历 */
    static forReminderByIdentifier(identifier: string): Promise<Calendar>;

    /** 日历标识符 */
    identifier: string;
    /** 日历标题 */
    title: string;
    /** 是否为订阅日历 */
    isSubscribed: boolean;
    /** 是否允许内容修改 */
    allowsContentModifications: boolean;
    /** 日历颜色 */
    color: Color;

    /** 保存日历 */
    save(): void;
    /** 删除日历 */
    remove(): void;
    /** 获取所有事件 */
    presentPicker(): Promise<Calendar>;
  }

  /**
   * 日历事件类
   */
  class CalendarEvent {
    /** 获取今天的事件 */
    static today(calendars?: Calendar[]): Promise<CalendarEvent[]>;
    /** 获取明天的事件 */
    static tomorrow(calendars?: Calendar[]): Promise<CalendarEvent[]>;
    /** 获取昨天的事件 */
    static yesterday(calendars?: Calendar[]): Promise<CalendarEvent[]>;
    /** 获取本周的事件 */
    static thisWeek(calendars?: Calendar[]): Promise<CalendarEvent[]>;
    /** 获取下周的事件 */
    static nextWeek(calendars?: Calendar[]): Promise<CalendarEvent[]>;
    /** 获取上周的事件 */
    static lastWeek(calendars?: Calendar[]): Promise<CalendarEvent[]>;
    /** 获取指定日期范围的事件 */
    static between(startDate: Date, endDate: Date, calendars?: Calendar[]): Promise<CalendarEvent[]>;
    /** 通过标识符查找事件 */
    static presentCreate(): Promise<CalendarEvent>;

    /** 事件标识符 */
    identifier: string;
    /** 事件标题 */
    title: string;
    /** 事件位置 */
    location: string;
    /** 备注 */
    notes: string;
    /** 开始日期 */
    startDate: Date;
    /** 结束日期 */
    endDate: Date;
    /** 是否全天事件 */
    isAllDay: boolean;
    /** 所属日历 */
    calendar: Calendar;
    /** URL */
    url: string;
    /** 参与者 */
    attendees: Array<{ name: string; emailAddress: string; isCurrentUser: boolean }>;
    /** 可用性 */
    availability: string;
    /** 事件时区 */
    timeZone: string;

    /** 保存事件 */
    save(): void;
    /** 删除事件 */
    remove(): void;
    /** 添加提醒 */
    addRecurrenceRule(recurrenceRule: RecurrenceRule): void;
    /** 移除所有重复规则 */
    removeAllRecurrenceRules(): void;
    /** 展示创建事件 */
    presentCreate(): Promise<CalendarEvent>;
    /** 展示编辑事件 */
    presentEdit(): Promise<CalendarEvent>;
  }

  /**
   * 提醒类
   */
  class Reminder {
    /** 获取所有未完成的提醒 */
    static all(calendars?: Calendar[]): Promise<Reminder[]>;
    /** 获取所有已完成的提醒 */
    static allCompleted(calendars?: Calendar[]): Promise<Reminder[]>;
    /** 获取所有未完成的提醒（今天到期） */
    static allDueToday(calendars?: Calendar[]): Promise<Reminder[]>;
    /** 获取所有已完成的提醒（今天完成） */
    static completedToday(calendars?: Calendar[]): Promise<Reminder[]>;
    /** 获取所有未完成的提醒（明天到期） */
    static allDueTomorrow(calendars?: Calendar[]): Promise<Reminder[]>;
    /** 获取所有已完成的提醒（明天完成） */
    static completedTomorrow(calendars?: Calendar[]): Promise<Reminder[]>;
    /** 获取所有未完成的提醒（昨天到期） */
    static allDueYesterday(calendars?: Calendar[]): Promise<Reminder[]>;
    /** 获取所有已完成的提醒（昨天完成） */
    static completedYesterday(calendars?: Calendar[]): Promise<Reminder[]>;
    /** 获取所有未完成的提醒（本周到期） */
    static allDueThisWeek(calendars?: Calendar[]): Promise<Reminder[]>;
    /** 获取所有已完成的提醒（本周完成） */
    static completedThisWeek(calendars?: Calendar[]): Promise<Reminder[]>;
    /** 获取所有未完成的提醒（下周到期） */
    static allDueNextWeek(calendars?: Calendar[]): Promise<Reminder[]>;
    /** 获取所有未完成的提醒（上周到期） */
    static allDueLastWeek(calendars?: Calendar[]): Promise<Reminder[]>;
    /** 获取所有已完成的提醒（上周完成） */
    static completedLastWeek(calendars?: Calendar[]): Promise<Reminder[]>;
    /** 获取所有未完成的提醒（指定日期范围） */
    static allDueBetween(startDate: Date, endDate: Date, calendars?: Calendar[]): Promise<Reminder[]>;
    /** 获取所有已完成的提醒（指定日期范围） */
    static completedBetween(startDate: Date, endDate: Date, calendars?: Calendar[]): Promise<Reminder[]>;
    /** 计划提醒 */
    static scheduled(calendars?: Calendar[]): Promise<Reminder[]>;

    /** 提醒标识符 */
    identifier: string;
    /** 提醒标题 */
    title: string;
    /** 备注 */
    notes: string;
    /** 是否已完成 */
    isCompleted: boolean;
    /** 完成日期 */
    completionDate: Date;
    /** 创建日期 */
    creationDate: Date;
    /** 截止日期 */
    dueDate: Date;
    /** 是否有截止日期 */
    dueDateIncludesTime: boolean;
    /** 优先级 */
    priority: number;
    /** 所属日历 */
    calendar: Calendar;

    /** 保存提醒 */
    save(): void;
    /** 删除提醒 */
    remove(): void;
    /** 添加重复规则 */
    addRecurrenceRule(recurrenceRule: RecurrenceRule): void;
    /** 移除所有重复规则 */
    removeAllRecurrenceRules(): void;
  }

  /**
   * 重复规则类
   */
  class RecurrenceRule {
    /** 创建每日重复规则 */
    static daily(interval?: number): RecurrenceRule;
    /** 创建每周重复规则 */
    static weekly(interval?: number): RecurrenceRule;
    /** 创建每月重复规则 */
    static monthly(interval?: number): RecurrenceRule;
    /** 创建每年重复规则 */
    static yearly(interval?: number): RecurrenceRule;
    /** 创建每周的特定天重复规则 */
    static weeklyOnDays(daysOfTheWeek: number[], interval?: number): RecurrenceRule;
    /** 创建复杂重复规则 */
    static complexWeekly(interval: number, daysOfTheWeek: number[], setPositions: number[]): RecurrenceRule;
    /** 创建复杂每月重复规则 */
    static complexMonthly(
      interval: number,
      daysOfTheWeek: number[],
      daysOfTheMonth: number[],
      setPositions: number[],
    ): RecurrenceRule;
    /** 创建复杂每年重复规则 */
    static complexYearly(
      interval: number,
      daysOfTheWeek: number[],
      daysOfTheMonth: number[],
      monthsOfTheYear: number[],
      weeksOfTheYear: number[],
      daysOfTheYear: number[],
      setPositions: number[],
    ): RecurrenceRule;
  }

  // ==================== 系统和设备类 ====================

  /**
   * 设备类
   */
  class Device {
    /** 设备名称 */
    static name(): string;
    /** 系统名称 */
    static systemName(): string;
    /** 系统版本 */
    static systemVersion(): string;
    /** 设备型号 */
    static model(): string;
    /** 是否为 iPhone */
    static isPhone(): boolean;
    /** 是否为 iPad */
    static isPad(): boolean;
    /** 是否为 Mac */
    static isMac(): boolean;
    /** 屏幕尺寸 */
    static screenSize(): Size;
    /** 屏幕分辨率 */
    static screenResolution(): Size;
    /** 屏幕缩放比例 */
    static screenScale(): number;
    /** 屏幕亮度 */
    static screenBrightness(): number;
    /** 是否竖屏 */
    static isInPortrait(): boolean;
    /** 是否倒置竖屏 */
    static isInPortraitUpsideDown(): boolean;
    /** 是否横屏向左 */
    static isInLandscapeLeft(): boolean;
    /** 是否横屏向右 */
    static isInLandscapeRight(): boolean;
    /** 是否正面朝上 */
    static isFaceUp(): boolean;
    /** 是否正面朝下 */
    static isFaceDown(): boolean;
    /** 电池电量 */
    static batteryLevel(): number;
    /** 是否正在放电 */
    static isDischarging(): boolean;
    /** 是否正在充电 */
    static isCharging(): boolean;
    /** 是否充满电 */
    static isFullyCharged(): boolean;
    /** 首选语言列表 */
    static preferredLanguages(): string[];
    /** 区域设置 */
    static locale(): string;
    /** 语言 */
    static language(): string;
    /** 是否使用深色外观 */
    static isUsingDarkAppearance(): boolean;
    /** 音量 */
    static volume(): number;
    /** 设置屏幕亮度 */
    static setScreenBrightness(percentage: number): void;
  }

  /**
   * 通知类
   */
  class Notification {
    /** 获取所有待处理通知 */
    static allPending(): Promise<Notification[]>;
    /** 获取所有已发送通知 */
    static allDelivered(): Promise<Notification[]>;
    /** 移除所有待处理通知 */
    static removeAllPending(): Promise<void>;
    /** 移除所有已发送通知 */
    static removeAllDelivered(): Promise<void>;
    /** 移除待处理通知 */
    static removePending(identifiers: string[]): Promise<void>;
    /** 移除已发送通知 */
    static removeDelivered(identifiers: string[]): Promise<void>;
    /** 重置应用图标角标数字 */
    static resetCurrent(): void;

    /** 通知标识符 */
    identifier: string;
    /** 通知标题 */
    title: string;
    /** 副标题 */
    subtitle: string;
    /** 通知正文 */
    body: string;
    /** 角标数字 */
    badge: number;
    /** 声音 */
    sound: string;
    /** 启动 URL */
    launchURL: string;
    /** 用户信息 */
    userInfo: Record<string, any>;
    /** 附件 */
    attachments: Array<{ identifier: string; url: string; type: string }>;
    /** 首选内容高度 */
    preferredContentHeight: number;
    /** 线程标识符 */
    threadIdentifier: string;
    /** 目标内容标识符 */
    targetContentIdentifier: string;
    /** 触发日期 */
    nextTriggerDate: Date;
    /** 发送日期 */
    deliveryDate: Date;
    /** 脚本名称 */
    scriptName: string;

    constructor();

    /** 设置每日触发器 */
    setDailyTrigger(hour: number, minute: number, repeats?: boolean): void;
    /** 设置每周触发器 */
    setWeeklyTrigger(weekday: number, hour: number, minute: number, repeats?: boolean): void;
    /** 设置日期触发器 */
    setTriggerDate(date: Date): void;
    /** 添加动作 */
    addAction(title: string, url: string, destructive?: boolean): void;
    /** 计划通知 */
    schedule(): Promise<void>;
    /** 移除通知 */
    remove(): Promise<void>;
  }

  /**
   * 控制台对象
   */
  const console: {
    /** 输出日志 */
    log(message: any): void;
    /** 输出警告 */
    warn(message: any): void;
    /** 输出错误 */
    error(message: any): void;
  };

  /**
   * 模块对象
   */
  const module: {
    /** 模块文件名 */
    filename: string;
    /** 导出对象 */
    exports: any;
  };

  /**
   * 导入模块函数
   * 从文件系统导入 JavaScript 模块
   */
  function importModule(name: string): any;

  // ==================== 联系人和通讯类 ====================

  /**
   * 联系人类
   */
  class Contact {
    /** 获取所有联系人 */
    static all(): Promise<Contact[]>;
    /** 在所有容器中查找联系人 */
    static inGroups(groups: ContactsGroup[]): Promise<Contact[]>;

    /** 联系人标识符 */
    identifier: string;
    /** 姓名前缀 */
    namePrefix: string;
    /** 名字 */
    givenName: string;
    /** 中间名 */
    middleName: string;
    /** 姓氏 */
    familyName: string;
    /** 昵称 */
    nickname: string;
    /** 姓名后缀 */
    nameSuffix: string;
    /** 组织名称 */
    organizationName: string;
    /** 部门名称 */
    departmentName: string;
    /** 职位 */
    jobTitle: string;
    /** 生日 */
    birthday: Date;
    /** 备注 */
    note: string;
    /** 头像 */
    image: Image;
    /** 电话号码 */
    phoneNumbers: Array<{ label: string; value: string; identifier: string; localizedLabel: string }>;
    /** 邮箱地址 */
    emailAddresses: Array<{ label: string; value: string; identifier: string; localizedLabel: string }>;
    /** 邮政地址 */
    postalAddresses: Array<{
      label: string;
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      identifier: string;
      localizedLabel: string;
    }>;
    /** 社交资料 */
    socialProfiles: Array<{
      service: string;
      username: string;
      url: string;
      userIdentifier: string;
      localizedLabel: string;
    }>;
    /** URL 地址 */
    urlAddresses: Array<{ label: string; value: string; identifier: string }>;
    /** 是否可用 */
    isAvailable: boolean;
  }

  /**
   * 联系人容器类
   */
  class ContactsContainer {
    /** 获取默认容器 */
    static default(): ContactsContainer;
    /** 获取所有容器 */
    static all(): Promise<ContactsContainer[]>;
    /** 通过标识符查找容器 */
    static withIdentifier(identifier: string): ContactsContainer;

    /** 容器标识符 */
    identifier: string;
    /** 容器名称 */
    name: string;
  }

  /**
   * 联系人分组类
   */
  class ContactsGroup {
    /** 获取所有分组 */
    static all(containers?: ContactsContainer[]): Promise<ContactsGroup[]>;

    /** 分组标识符 */
    identifier: string;
    /** 分组名称 */
    name: string;
  }

  /**
   * 邮件类
   */
  class Mail {
    /** 发送邮件 */
    static send(): Promise<void>;
    /** 撰写邮件 */
    static compose(): Promise<void>;

    /** 收件人 */
    toRecipients: string[];
    /** 抄送 */
    ccRecipients: string[];
    /** 密送 */
    bccRecipients: string[];
    /** 主题 */
    subject: string;
    /** 邮件正文 */
    body: string;
    /** 是否为 HTML 格式 */
    isBodyHTML: boolean;
    /** 首选发件账户 */
    preferredSendingEmailAddress: string;

    constructor();

    /** 添加图像附件 */
    addImageAttachment(image: Image): void;
    /** 添加文件附件 */
    addFileAttachment(filePath: string): void;
    /** 添加数据附件 */
    addDataAttachment(data: Data, mimeType: string, filename: string): void;
    /** 发送邮件 */
    send(): Promise<void>;
  }

  /**
   * 短信类
   */
  class Message {
    /** 发送短信 */
    static send(): Promise<void>;

    /** 收件人 */
    recipients: string[];
    /** 短信正文 */
    body: string;

    constructor();

    /** 添加图像附件 */
    addImageAttachment(image: Image): void;
    /** 添加文件附件 */
    addFileAttachment(filePath: string): void;
    /** 添加数据附件 */
    addDataAttachment(data: Data, uti: string, filename: string): void;
    /** 发送短信 */
    send(): Promise<void>;
  }

  /**
   * 语音合成类
   */
  class Speech {
    /** 朗读文本 */
    static speak(text: string, language?: string): void;
    /** 停止朗读 */
    static stop(): void;
    /** 是否正在朗读 */
    static isSpeaking(): boolean;
    /** 获取支持的语言 */
    static supportedLanguages(): string[];
    /** 设置语速 */
    static setRate(rate: number): void;
    /** 设置音调 */
    static setPitch(pitch: number): void;
    /** 设置音量 */
    static setVolume(volume: number): void;
  }

  /**
   * 听写类
   */
  class Dictation {
    /** 开始听写 */
    static start(locale?: string): Promise<string>;
  }

  // ==================== 其他工具类 ====================

  /**
   * 日期格式化类
   */
  class DateFormatter {
    /** 日期格式 */
    dateFormat: string;
    /** 区域设置 */
    locale: string;
    /** 时区 */
    timeZone: string;
    /** 是否使用相对日期格式 */
    useRelativeDateFormatting: boolean;
    /** 是否使用零填充 */
    usesShortStandaloneWeekdaySymbols: boolean;

    constructor();

    /** 将日期转换为字符串 */
    string(date: Date): string;
    /** 将字符串转换为日期 */
    date(string: string): Date;
  }

  /**
   * 日期选择器类
   */
  class DatePicker {
    /** 初始日期 */
    initialDate: Date;
    /** 最小日期 */
    minimumDate: Date;
    /** 最大日期 */
    maximumDate: Date;
    /** 倒计时时长 */
    countdownDuration: number;
    /** 分钟间隔 */
    minuteInterval: number;

    constructor();

    /** 选择日期 */
    pickDate(): Promise<Date>;
    /** 选择时间 */
    pickTime(): Promise<Date>;
    /** 选择日期和时间 */
    pickDateAndTime(): Promise<Date>;
    /** 选择倒计时时长 */
    pickCountdownDuration(): Promise<number>;
  }

  /**
   * 相对日期时间格式化类
   */
  class RelativeDateTimeFormatter {
    /** 使用命名日期时间样式 */
    useNamedDateTimeStyle(): void;
    /** 使用数字日期时间样式 */
    useNumericDateTimeStyle(): void;

    constructor();

    /** 格式化日期 */
    string(date: Date, referenceDate: Date): string;
  }

  /**
   * 定时器类
   */
  class Timer {
    /** 创建定时器 */
    static schedule(timeInterval: number, repeats: boolean, callback: () => void): Timer;

    /** 时间间隔 */
    timeInterval: number;
    /** 是否重复 */
    repeats: boolean;

    /** 取消定时器 */
    invalidate(): void;
  }

  /**
   * SF Symbol 符号类
   */
  class SFSymbol {
    /** 创建 SF Symbol */
    static named(name: string): SFSymbol;

    /** 符号图像 */
    image: Image;

    /** 应用字体 */
    applyFont(font: Font): void;
    /** 应用超轻字重 */
    applyUltraLightWeight(): void;
    /** 应用极细字重 */
    applyThinWeight(): void;
    /** 应用细字重 */
    applyLightWeight(): void;
    /** 应用常规字重 */
    applyRegularWeight(): void;
    /** 应用中等字重 */
    applyMediumWeight(): void;
    /** 应用半粗字重 */
    applySemiboldWeight(): void;
    /** 应用粗字重 */
    applyBoldWeight(): void;
    /** 应用重磅字重 */
    applyHeavyWeight(): void;
    /** 应用黑色字重 */
    applyBlackWeight(): void;
  }

  /**
   * 分享表单类
   */
  class ShareSheet {
    /** 展示分享表单 */
    static present(activityItems: any[]): Promise<{ completed: boolean; activityType: string }>;
  }

  /**
   * UUID 生成类
   */
  class UUID {
    /** 生成 UUID */
    static string(): string;
  }

  /**
   * XML 解析器类
   */
  class XMLParser {
    /** XML 字符串 */
    string: string;
    /** 解析完成回调 */
    didStartElement: (elementName: string, attributes: Record<string, string>) => void;
    /** 元素结束回调 */
    didEndElement: (elementName: string) => void;
    /** 找到字符回调 */
    foundCharacters: (characters: string) => void;
    /** 解析错误回调 */
    parseErrorOccurred: (error: string) => void;

    constructor(string: string);

    /** 开始解析 */
    parse(): boolean;
  }

  /**
   * 位置类
   */
  class Location {
    /** 获取当前位置 */
    static current(): Promise<{
      latitude: number;
      longitude: number;
      altitude: number;
      horizontalAccuracy: number;
      verticalAccuracy: number;
    }>;
    /** 设置允许后台位置更新 */
    static setAllowsBackgroundLocationUpdates(allows: boolean): void;
    /** 反向地理编码 */
    static reverseGeocode(
      latitude: number,
      longitude: number,
      locale?: string,
    ): Promise<{
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      countryCode: string;
      timeZone: string;
    }>;
  }

  // ==================== 全局对象 ====================

  /**
   * 配置对象
   * 提供有关脚本运行环境的信息
   */
  const config: {
    /** 是否在应用内运行 */
    runsInApp: boolean;
    /** 是否在小组件中运行 */
    runsInWidget: boolean;
    /** 是否在通知中运行 */
    runsInNotification: boolean;
    /** 是否使用 Siri 运行 */
    runsWithSiri: boolean;
    /** 是否在 Siri 中运行 */
    runsInSiri: boolean;
    /** 是否在快捷指令中运行 */
    runsInShortcuts: boolean;
    /** 是否在操作扩展中运行 */
    runsInActionExtension: boolean;
    /** 是否从主屏幕运行 */
    runsFromHomeScreen: boolean;
    /** 是否在 App Clip 中运行 */
    runsInAppClip: boolean;
    /** 小组件类型（small, medium, large, extraLarge） */
    widgetFamily: string | null;
  };

  /**
   * 参数对象
   * 提供传递给脚本的参数
   */
  const args: {
    /** 小组件参数 */
    widgetParameter: string | null;
    /** 查询参数 */
    queryParameters: Record<string, string>;
    /** URL 列表 */
    urls: string[];
    /** 纯文本列表 */
    plainTexts: string[];
    /** 图像列表 */
    images: Image[];
    /** 文件路径列表 */
    fileURLs: string[];
    /** 快捷指令参数 */
    shortcutParameter: any;
    /** 通知 */
    notification: Notification | null;
  };
}

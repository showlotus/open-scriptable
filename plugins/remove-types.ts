import { type Plugin } from 'vite';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { transpileModule, ScriptTarget, ModuleKind } from 'typescript';

/**
 * 移除 TypeScript 类型注解的插件
 *
 * 在 dev 模式下，当请求 .ts 源文件时，返回移除类型注解后的 JavaScript 代码
 *
 * 在 build 模式下，生成 Bundle 时，移除 TypeScript 类型注解
 *
 * @returns {Plugin}
 */
export const removeTypesPlugin = (): Plugin => {
  return {
    name: 'remove-types-from-source',
    configureServer(server) {
      // 拦截对 .ts 源文件的请求
      server.middlewares.use((req, res, next) => {
        // 只处理 /src/ 目录下的 .ts 文件请求
        if (req.url && req.url.match(/^\/src\/.+\.ts$/)) {
          try {
            // 获取文件系统路径
            const filePath = resolve(process.cwd(), req.url.slice(1));
            // 读取文件内容
            const tsContent = readFileSync(filePath, 'utf-8');

            let content = removeTypes(tsContent);
            // 开发环境添加 DEV 环境变量
            content = content.replace('__IS_DEV__', 'true');
            // 设置响应头
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.statusCode = 200;
            res.end(content);
          } catch (error) {
            // 如果转换失败，继续正常流程
            console.error('移除类型注解失败:', error);
            next();
          }
        } else {
          next();
        }
      });
    },
    generateBundle(options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type === 'chunk') {
          file.code = removeTypes(file.code);
        }
      }
    },
  };
};

/**
 * 移除 TypeScript 类型注解
 * @param tsContent TypeScript 代码
 * @returns 移除类型注解后的 JavaScript 代码
 */
function removeTypes(tsContent: string) {
  // 使用 TypeScript 编译器 API 移除类型注解
  // 设置编译选项：尽量只移除类型，保持代码结构不变
  const result = transpileModule(tsContent, {
    compilerOptions: {
      target: ScriptTarget.Latest, // 使用最新语法，尽量减少转换
      module: ModuleKind.ESNext, // 使用 ES 模块
      removeComments: true, // 移除注释
      preserveConstEnums: false, // 不保留 const enum
      allowJs: true,
      checkJs: false,
      noEmitOnError: false,
      isolatedModules: true,
      esModuleInterop: false,
      skipLibCheck: true,
    },
  });

  // 获取移除类型后的代码
  let content = result.outputText;

  // 移除所有 export 语句
  content = content.replace(/export\s+[^;]+;?\s*\n+\s*/g, '');

  // 添加 return 语句
  content = `return ${content}`;

  return content;
}

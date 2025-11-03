#!/usr/bin/env node

/**
 * 发布后执行的脚本
 * 在 NPM 包发布成功后执行的后续操作
 */

import { readdirSync } from 'node:fs';

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始执行发布后脚本...');

  try {
    const files = readdirSync('./src').filter(file => file.endsWith('.ts'));

    const clearCachePromises = files.map(async file => {
      const name = file.replace('.ts', '');
      try {
        const response = await fetch(
          `https://purge.jsdelivr.net/npm/@showlotus/open-scriptable@latest/dist/${name}.js`,
        );
        const data = await response.json();
        console.log(`✅ 清除缓存成功: ${name}`);
        return { name, success: true };
      } catch (error) {
        console.error(`❌ 清除缓存失败 (${name}):`, error.message);
        return { name, success: false, error: error.message };
      }
    });

    const results = await Promise.all(clearCachePromises);

    const successCount = results.filter(result => result.success).length;
    const failCount = results.filter(result => !result.success).length;

    console.log(`📊 缓存清除结果: 成功 ${successCount} 个，失败 ${failCount} 个`);

    console.log('✅ 发布后脚本执行完成');
    process.exit(0);
  } catch (error) {
    console.error('❌ 发布后脚本执行失败:', error.message);
    process.exit(1);
  }
}

// 执行主函数
main();

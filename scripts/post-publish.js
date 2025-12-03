#!/usr/bin/env node

/**
 * 发布后执行的脚本
 * 在 NPM 包发布成功后执行的后续操作
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 获取当前包版本号
 */
function getPackageVersion() {
  try {
    const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));
    return packageJson.version;
  } catch (error) {
    console.error('❌ 无法读取 package.json:', error.message);
    return null;
  }
}

/**
 * 检查 jsDelivr 上是否已有指定版本的文件
 * @param {string} packageName 包名
 * @param {string} version 版本号
 * @param {string} fileName 文件名
 */
async function checkVersionAvailable(packageName, version, fileName) {
  const url = `https://cdn.jsdelivr.net/npm/${packageName}@${version}/dist/${fileName}`;
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * 轮询等待版本在 jsDelivr 上可用
 * @param {string} packageName 包名
 * @param {string} version 版本号
 * @param {string} fileName 文件名
 * @param {number} maxAttempts 最大尝试次数
 */
async function waitForVersionAvailable(packageName, version, fileName, maxAttempts = 60) {
  for (let i = 0; i < maxAttempts; i++) {
    const isAvailable = await checkVersionAvailable(packageName, version, fileName);
    if (isAvailable) {
      console.log(`✅ ${fileName} 已同步到 CDN (尝试 ${i + 1} 次)`);
      return true;
    }

    console.log(`⏳ 等待 ${fileName} 同步到 CDN... (${i + 1}/${maxAttempts})`);

    // 等待 5 秒后重试
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  console.log(`⚠️ ${fileName} 在 ${maxAttempts * 5} 秒内未同步到 CDN`);
  return false;
}

/**
 * 清除指定文件的 jsDelivr 缓存
 * @param {string} fileName 文件名
 */
async function clearFileCache(fileName) {
  try {
    const response = await fetch(
      `https://purge.jsdelivr.net/npm/@showlotus/open-scriptable@latest/dist/${fileName}.js`,
    );
    const data = await response.json();
    console.log(`🧹 清除缓存成功: ${fileName}`);
    return { name: fileName, success: true };
  } catch (error) {
    console.error(`❌ 清除缓存失败 (${fileName}):`, error.message);
    return { name: fileName, success: false, error: error.message };
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始执行发布后脚本...');

  try {
    // 获取当前包版本
    const packageVersion = getPackageVersion();
    if (!packageVersion) {
      console.error('❌ 无法获取包版本，脚本终止');
      process.exit(1);
    }

    console.log(`📦 当前包版本: ${packageVersion}`);

    // 获取所有 TypeScript 源文件
    const files = readdirSync('./src').filter(file => file.endsWith('.ts'));
    console.log(`📁 找到 ${files.length} 个源文件`);

    const packageName = '@showlotus/open-scriptable';
    const results = [];

    // 逐个处理文件（避免并发过多请求）
    for (const file of files) {
      const name = file.replace('.ts', '');
      console.log(`\n🔍 处理文件: ${name}`);

      // 等待文件在 jsDelivr 上可用
      const isAvailable = await waitForVersionAvailable(
        packageName,
        packageVersion,
        `${name}.js`,
        60, // 最多等待 5 分钟 (60 * 5 秒)
      );

      if (isAvailable) {
        // 文件可用后，清除缓存
        const result = await clearFileCache(name);
        results.push(result);
      } else {
        // 文件不可用，记录失败
        console.log(`⏭️ 跳过 ${name}，文件未及时同步到 CDN`);
        results.push({
          name,
          success: false,
          error: 'CDN 同步超时',
        });
      }
    }

    // 统计结果
    const successCount = results.filter(result => result.success).length;
    const failCount = results.filter(result => !result.success).length;

    console.log(`\n📊 缓存清除结果: 成功 ${successCount} 个，失败 ${failCount} 个`);

    if (failCount > 0) {
      console.log('\n❌ 失败的文件:');
      results
        .filter(result => !result.success)
        .forEach(result => {
          console.log(`   - ${result.name}: ${result.error}`);
        });
    }

    console.log('\n✅ 发布后脚本执行完成');
    process.exit(failCount > 0 ? 1 : 0);
  } catch (error) {
    console.error('❌ 发布后脚本执行失败:', error.message);
    process.exit(1);
  }
}

// 执行主函数
main();

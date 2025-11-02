#!/usr/bin/env node

/**
 * 检查并自动更新 package.json 中的 version
 * 当 push 到 master 分支时，如果 version 没有改变，则自动更新 patch 版本
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJsonPath = resolve(__dirname, '../package.json');

// 读取 package.json
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const currentVersion = packageJson.version;

// 从 git 获取上一个提交的 version（如果存在）
let previousVersion = null;
try {
  const { execSync } = await import('child_process');
  const previousPackageJson = execSync('git show HEAD:package.json 2>/dev/null || echo "{}"', {
    encoding: 'utf-8',
    cwd: resolve(__dirname, '..'),
  });
  const previousPkg = JSON.parse(previousPackageJson);
  previousVersion = previousPkg.version;
} catch (error) {
  // 如果没有之前的提交，previousVersion 为 null
}

// 如果 version 没有改变，自动更新 patch 版本
if (previousVersion === currentVersion) {
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  const newVersion = `${major}.${minor}.${patch + 1}`;

  packageJson.version = newVersion;
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');

  console.log(`✅ Version 已自动更新: ${currentVersion} -> ${newVersion}`);

  // 自动将更新后的 package.json 添加到暂存区并创建 commit
  try {
    const { execSync } = await import('child_process');
    const projectRoot = resolve(__dirname, '..');

    execSync('git add package.json', {
      cwd: projectRoot,
      stdio: 'inherit',
    });
    console.log('📦 package.json 已自动添加到暂存区');

    // 自动创建 commit，使用 --no-verify 跳过 hooks 避免循环
    execSync(`git commit -m "chore: bump version to ${newVersion}" --no-verify`, {
      cwd: projectRoot,
      stdio: 'inherit',
    });
    console.log(`✅ 已自动创建 commit: chore: bump version to ${newVersion}`);
  } catch (error) {
    console.error('❌ 自动提交失败，请手动运行:');
    console.error('   git add package.json');
    console.error(`   git commit -m "chore: bump version to ${newVersion}"`);
    process.exit(1);
  }

  process.exit(0); // 版本已更新并提交，允许继续 push
} else if (previousVersion === null) {
  // 首次提交，不需要检查
  console.log('ℹ️  首次提交，跳过 version 检查');
  process.exit(0);
} else {
  console.log(`✅ Version 已更新: ${previousVersion} -> ${currentVersion}`);
  process.exit(0);
}

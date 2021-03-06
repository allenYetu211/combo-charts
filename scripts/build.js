/*
 * @Description: 构建库
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-04 00:45:15
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-06 12:52:18
 */
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const proc = require('child_process');
const ProgressBar = require('progress');
const { components, removeDir } = require('./utils');

// 组件库目录
const PATH = './components';

// 要编译的文件名正则
const scriptRegx = /\.tsx?$/;

// 输出目录
const outDir = './es';

// 清理上一次构建结果
removeDir(outDir);
removeDir('./types');

try {
  // 获取所有组件
  const src = components(PATH, scriptRegx);

  // 编译 ts，生成 `.d.ts`
  proc.execSync(`tsc`, { stdio: 'inherit' });

  const bar = new ProgressBar(':current/:total [:bar] :percent', {
    total: src.length,
    width: 30,
    complete: '=',
    clear: false,
    callback() {
      process.stderr.write('Compile success!\n\n');
    },
  });

  if (!fs.existsSync(outDir)) {
    console.log('Create es directory\n');
    fs.mkdirSync(outDir);
  }

  // 编译文件
  src.forEach((v) => {
    const { code } = babel.transformFileSync(v);
    const filename = v.replace(PATH, outDir).replace(scriptRegx, '.js');
    const p = path.dirname(filename);
    // 创建文件夹
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
    }
    fs.writeFileSync(filename, code);
    bar.tick(1);
  });
} catch (e) {
  console.error(e);
}

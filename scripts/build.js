/*
 * @Description: 构建库
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-04 00:45:15
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-07 13:56:45
 */
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const proc = require('child_process');
const ProgressBar = require('progress');
const { listFile, removeDir } = require('./utils');

// 要编译的文件名正则
const scriptRegx = /\.tsx?$/;
const outDir = './es';
const typeDir = './types';
const source = './components';
const tsCmd = 'tsc';

// 清理上一次构建结果
removeDir(outDir);
removeDir(typeDir);

try {
  // 获取所有组件
  const src = listFile(source, scriptRegx);

  // 编译 ts，生成 `.d.ts`
  proc.execSync(tsCmd, { stdio: 'inherit' });

  const bar = new ProgressBar(':current/:total [:bar] :percent', {
    total: src.length,
    width: 30,
    complete: '=',
    clear: false,
    callback() {
      process.stderr.write('Compile success!\n\n');
    },
  });

  console.log('Create es directory\n');
  fs.mkdirSync(outDir);

  // 编译文件
  src.forEach((v) => {
    const { code } = babel.transformFileSync(v);
    const filename = v.replace(source, outDir).replace(scriptRegx, '.js');
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

/*
 * @Description: 构建库
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-04 00:45:15
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-07 21:34:40
 */
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const babel = require('@babel/core');
const proc = require('child_process');
const ProgressBar = require('progress');

// 要编译的文件名正则
const scriptRegx = /\.tsx?$/;
const declareRegx = /\.d\.ts$/;
const outDir = './es';
const typeDir = './types';
const source = './components';
const tsCmd = 'tsc';

// 清理上一次构建结果
fs.emptyDirSync(outDir);
fs.emptyDirSync(typeDir);

// 获取所有文件
const src = glob.sync(source + '/**/*.ts?(x)');
const general = [];
const declare = [];
src.forEach((v) => {
  if (v.match(declareRegx)) {
    declare.push(v);
  } else {
    general.push(v);
  }
});

process.stderr.write('\n');

const bar = new ProgressBar(':current/:total [:bar] :percent', {
  total: src.length * 2,
  width: 30,
  complete: '=',
  clear: false,
  callback() {
    process.stderr.write('Compile success!\n\n');
  },
});

const timer = setInterval(function () {
  if (bar.curr < src.length) {
    bar.tick(1);
  } else {
    bar.update((bar.curr - 1) / (src.length * 2));
  }
}, 80 * src.length);

// 编译 ts，生成 `.d.ts`
proc.exec(tsCmd, { stdio: 'inherit' }, function (err) {
  clearInterval(timer);
  bar.update(0.5);
  if (err) {
    console.error(err);
    return;
  }
  // 编译文件
  general.forEach((v) => {
    const { code } = babel.transformFileSync(v);
    const filename = v.replace(source, outDir).replace(scriptRegx, '.js');
    const p = path.dirname(filename);
    fs.ensureDirSync(p);
    fs.writeFileSync(filename, code);
    bar.tick(1);
  });

  // 复制声明文件
  declare.forEach((v) => {
    const filename = v.replace(source, typeDir);
    fs.ensureDirSync(path.dirname(filename));
    fs.copyFileSync(v, filename);
    bar.tick(1);
  });
});

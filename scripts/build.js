/*
 * @Description: 构建库
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-04 00:45:15
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-23 23:54:36
 */
const fs = require('fs-extra');
const glob = require('glob');
const chalk = require('chalk');
const proc = require('child_process');
const ProgressBar = require('progress');
const { compile } = require('./compile');

// 要编译的文件名正则
const outDir = [
  {
    path: './es',
    env: 'esm',
  },
  {
    path: './lib',
  },
];
const source = './components';
const tsCmd = 'tsc';
const times = 4;

// 清理上一次构建结果
outDir.forEach((v) => {
  fs.emptyDirSync(v.path);
});

// 获取所有文件
const src = glob.sync(source + '/**/*.ts?(x)');

process.stderr.write('\n');

const bar = new ProgressBar(
  chalk.cyan('build') +
    ' ' +
    chalk.grey('[:bar]') +
    ' ' +
    chalk.green(':percent'),
  {
    total: src.length * times,
    width: 30,
    complete: '=',
    clear: false,
    callback() {
      process.stderr.write(chalk.green('\n\nCompile success!\n\n'));
    },
  }
);

const timer = setInterval(function () {
  if (bar.curr < src.length * 2) {
    bar.tick(1);
  } else {
    bar.update((bar.curr - 1) / (src.length * times));
  }
}, 140);

outDir.forEach((v) => {
  const { curr } = bar;
  // 编译 ts，生成 `.d.ts`
  proc.execSync(`${tsCmd} --outDir ${v.path}`, { stdio: 'inherit' });
  bar.update((curr + src.length) / (src.length * times));
});

clearInterval(timer);

outDir.forEach((v) => {
  process.env.BABEL_ENV = v.env;
  compile(source, v.path, src, () => {
    bar.tick(1);
  });
});

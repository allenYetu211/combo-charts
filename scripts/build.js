/*
 * @Description: 构建库
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-04 00:45:15
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-27 11:10:15
 */
const fs = require('fs-extra');
const glob = require('glob');
const chalk = require('chalk');
const proc = require('child_process');
const ProgressBar = require('progress');
const { compile } = require('./compile');
const { moveFile } = require('./utils');

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
const temp = './tmp';

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
  if (bar.curr < src.length) {
    bar.tick(1);
  } else {
    bar.update((bar.curr - 1) / (src.length * times));
  }
}, 140);

// generate .d.ts
proc.exec(`${tsCmd} --outDir ${temp}`, function(err, stdout) {
  clearInterval(timer);
  bar.update(src.length / (src.length * times));
  if (err) {
    process.stdout.write('\n\n');
    process.stdout.write(stdout);
    process.stdout.write('\n\n');
    return;
  }

  // compile
  const paths = [];
  outDir.forEach((v) => {
    process.env.BABEL_ENV = v.env;
    compile(source, v.path, src, () => {
      bar.tick(1);
    });
    paths.push(v.path);
  });

  // move declare file
  const tmps = glob.sync(temp + '/**/*.d.ts');
  moveFile(temp, paths, tmps, function() {
    bar.tick(1);
  }, true);
});

/*
 * @Description: 构建库
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-04 00:45:15
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-04 22:10:50
 */
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const { components, removeDir } = require('./utils');

// 组件库目录
const PATH = './components';

// 要编译的文件名正则
const scriptRegx = /\.tsx?$/;

// 输出目录
const outDir = './es';

// 获取所有组件
const src = components(PATH, scriptRegx);

// 清理上一次构建结果
removeDir(outDir);
removeDir('./types');

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
});

// 编译 ts，生成 `.d.ts`
require('typescript/lib/tsc');

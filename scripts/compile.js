const babel = require('@babel/core');
const fs = require('fs-extra');
const path = require('path');
const { moveFile } = require('./utils');

const scriptRegx = /\.tsx?$/;
const declareRegx = /\.d\.ts$/;

/**
 * 将 ts 文件编译为 js
 * @param {string} src 源目录
 * @param {string} out 目标目录
 * @param {string[]} files 文件列表
 * @param {() => void} callback 编译成功一个文件后的回调函数
 */
function compileTs2Js(src, out, files, callback) {
  files.forEach((v) => {
    const { code } = babel.transformFileSync(v);
    const filename = v.replace(src, out).replace(scriptRegx, '.js');
    const p = path.dirname(filename);
    fs.ensureDirSync(p);
    fs.writeFileSync(filename, code);
    callback();
  });
}

/**
 * 将 ts 文件编译为 js
 * @param {string} src 源目录
 * @param {string} out 目标目录
 * @param {string[]} files 文件列表
 * @param {() => void} callback 编译成功一个文件后的回调函数
 */
function compile(src, out, files, callback) {
  const general = [];
  const declare = [];
  files.forEach((v) => {
    if (v.match(declareRegx)) {
      declare.push(v);
    } else {
      general.push(v);
    }
  });
  compileTs2Js(src, out, general, callback);
  moveFile(src, [out], declare, callback);
}

module.exports = {
  compile,
};

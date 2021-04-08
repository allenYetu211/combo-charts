const fs = require('fs-extra');
const path = require('path');

/**
 * 移动文件
 * @param {string} src 源目录
 * @param {string[]} out 目标目录
 * @param {string[]} files 文件列表
 * @param {() => void} callback 成功后的回调函数
 */
 function moveFile(src, out, files, callback, afterClean = false) {
  files.forEach((i) => {
    out.forEach((j) => {
      const filename = i.replace(src, j);
      fs.ensureDirSync(path.dirname(filename));
      fs.copyFileSync(i, filename);
    });
    callback();
  });
  // clean
  if (afterClean) {
    fs.emptyDirSync(src);
    fs.rmdirSync(src);
  }
}

module.exports = {
  moveFile,
};
/*
 * @Description:
 * @version:
 * @Author: liuyin
 * @Date: 2021-03-04 00:45:15
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-04 22:17:07
 */
const path = require('path');
const fs = require('fs');

/**
 * 递归查找要编译的文件
 * @param {string} src 要查找的目录
 * @param {RegExp} regx 匹配规则
 * @returns 在 `src` 目录下，匹配正则 `regx` 的所有文件
 */
function components(src, regx) {
  // src 如果不是目录就直接返回空数组
  if (!fs.statSync(src).isDirectory()) {
    return [];
  }
  // 解析出 src 中的相对路径前缀，因为在后面的 path.join 中，这个路径会消失
  const prefix = (src.match(/^\.\.?\//) ? src.split('/')[0] : '') + '/';
  const dir = src.replace(prefix, '');
  const entry = [];
  function iterateDir(d) {
    fs.readdirSync(d).forEach((v) => {
      const p = path.join(d, v);
      const stats = fs.statSync(p);
      // 是目录就继续遍历
      if (stats.isDirectory()) {
        iterateDir(p);
      }
      // 是文件就检查是否符合规则
      if (stats.isFile() && p.match(regx)) {
        entry.push((prefix + p).replace(/\\/, '/'));
      }
    });
  }
  iterateDir(dir);
  return entry;
}

/**
 * 删除目录中所有文件和目录
 * @param {string} dir 要删除的目录
 */
function removeDir(dir) {
  // 不存在说明已经被删掉了
  if (!fs.existsSync(dir)) {
    return;
  }
  fs.readdirSync(dir).forEach((v) => {
    let p = path.join(dir, v);
    let stat = fs.statSync(p);
    if (stat.isDirectory()) {
      //如果是文件夹就递归下去
      removeDir(p);
    } else {
      //删除文件
      fs.unlinkSync(p);
    }
  });
  fs.rmdirSync(dir); //如果文件夹是空的，就将自己删除掉
}

module.exports = {
  components,
  removeDir,
};

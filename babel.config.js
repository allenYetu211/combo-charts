/*
 * @Description:
 * @version:
 * @Author: liuyin
 * @Date: 2021-03-03 23:33:36
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-04 23:02:59
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: true,
      },
    ],
  ],
  comments: false,
};

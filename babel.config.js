/*
 * @Description:
 * @version:
 * @Author: liuyin
 * @Date: 2021-03-03 23:33:36
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-23 23:18:15
 */
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-transform-runtime'],
  comments: false,
  env: {
    esm: {
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
    },
  },
};

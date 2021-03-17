# 起步

`combo-charts` 是一个基于 `React` 的可视化组件库。它提供了一些基本的可视化组件，你也可以通过这些基本组件组合成自己想要的组件。

# 概念

在 `combo-charts` 中，一共有三种类型的组件，分别是：

- 容器组件，如：`Combo` 等
- 坐标系组件，如：`Geo` 、`Cartesian` 等
- 图形组件，如：`Bar` 、`Lines` 等

这些组件通过一定的组合，即可完成各种可视化图形的绘制。

# 安装

```shell
yalc add combo-charts
```

# 基本使用

```tsx
import { Geo, Combo, Lines } from 'combo-charts';

function PageName(props: any) {
  return (
    <Combo width="500" height="500">
      <Geo geoJson={json}>
        <Lines data={data} />
      </Geo>
    </Combo>
  );
}
```

有关 `combo-charts` 的更多内容请查看 [组件文档](./docs/README.md) 。

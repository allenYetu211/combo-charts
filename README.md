# 起步

`combo-charts` 是一个基于 `React` 与 `d3` 的可视化组件库。它提供了一些基本的可视化组件，你也可以通过这些基本组件组合成自己想要的组件。

# 概念

在 `combo-charts` 中，一共有两种类型的组件，分别是：

- 坐标系组件，如：`Geo` 、`Cartesian` 等
- 图形组件，如：`Bar` 、`Lines` 等

这些组件通过一定的组合，即可完成各种可视化图形的绘制。

# 安装

```shell
yalc add combo-charts
```

# 基本使用

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Geo, Lines } from 'combo-charts';
import { LinesData } from "combo-charts/lib/lines";

const data: LinesData[] = [
  {
    start: [116.414042, 39.914492],
    end: [87.976421, 36.941138],
  },
];

function App(props: any) {
  return (
    <Geo width="500" height="500" geoJson={json}>
      <Lines data={data} />
    </Geo>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

有关 `combo-charts` 的更多内容请查看 [组件文档](./docs/README.md) 。

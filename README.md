# 起步

`combo-charts` 是一个基于 `React` 的可视化组件库。它提供了一些基本的可视化组件，你也可以通过这些基本组件组合成自己想要的组件。

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

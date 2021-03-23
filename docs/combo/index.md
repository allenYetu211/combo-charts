# Combo 组件

`Combo` 组件是一个用于包裹图表的盒子组件，其他所有组件都必须是这个组件的子组件。你可以为这个盒子设置固定的宽高，或者让组件自动获取父级 DOM 节点的宽高。

## 基本使用

```tsx
import { Combo } from 'combo-charts';

function PageName(props: any) {
  return (
    <Combo width="500" height="500">
      {/* 其他组件放在这里面 */}
    </Combo>
  );
}
```

## API

<table>
    <thead>
        <tr>
            <td>属性名称</td>
            <td>类型</td>
            <td>描述</td>
            <td>默认值</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>width</td>
            <td>number</td>
          <td>组件的宽度，如果该值为 <code>undefined</code> 那么组件的宽度会设置为父组件的宽度</td>
            <td>undefined</td>
        </tr>
        <tr>
            <td>height</td>
            <td>number</td>
          <td>组件的高度，如果该值为 <code>undefined</code> 那么组件的高度会设置为父组件的高度</td>
            <td>undefined</td>
        </tr>
        <tr>
            <td>zoomable</td>
            <td>boolean</td>
            <td>是否支持放大与平移，默认不支持</td>
            <td>undefined</td>
        </tr>
        <tr>
            <td>maximumScale</td>
            <td>number</td>
            <td>最大放大比例</td>
            <td>3</td>
        </tr>
        <tr>
            <td>geoJson</td>
            <td>SimpleGeoJSON | GeoJSONFunction</td>
          <td>地图 geoJson 数据，可以是普通的 geoJson 数据，也可以是一个返回 <code>Promise</code> 的函数</td>
            <td>undefined</td>
        </tr>
    </tbody>
</table>

# Geo 组件

Geo 组件是用于绘制地图的组件。

## 基本使用

```tsx
import { Combo, Geo } from 'combo-charts';

function PageName(props: any) {
  return (
    <Combo width="500" height="500">
      <Geo geoJson={data}>{/* svg 的元素可以放这里 */}</Geo>
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
            <td>geoJson</td>
            <td>SimpleGeoJSON | GeoJSONFunction</td>
          <td>地图 geoJson 数据，可以是普通的 geoJson 数据，也可以是一个返回 <code>Promise</code> 的函数</td>
            <td>undefined</td>
        </tr>
        <tr>
            <td>style</td>
            <td><a href="#geostyle">GeoStyle</a></td>
            <td>地图中每个区块的样式</td>
            <td>undefined</td>
        </tr>
    </tbody>
</table>

## GeoStyle

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
        	<td>color</td>
            <td>string</td>
            <td>区块的填充色</td>
            <td>undefined</td>
        </tr>
        <tr>
        	<td>borderColor</td>
            <td>string</td>
            <td>区块的边框颜色</td>
            <td>undefined</td>
        </tr>
        <tr>
        	<td>borderWidth</td>
            <td>number</td>
            <td>区块的边框宽度</td>
            <td>undefined</td>
        </tr>
    </tbody>
</table>

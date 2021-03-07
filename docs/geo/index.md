# Geo 组件

Geo 组件是用于绘制地图的组件。

## 基本使用

```tsx
import { Geo } from 'combo-charts';

function PageName(props) {
  return (
    <Geo width="500" height="500">
      {/* svg 的元素可以放这里 */}
    </Geo>
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
            <td>组件的宽度</td>
            <td>undefined</td>
        </tr>
        <tr>
            <td>height</td>
            <td>number</td>
            <td>组件的高度</td>
            <td>undefined</td>
        </tr>
        <tr>
            <td>zoomable</td>
            <td>boolean</td>
            <td>是否支持放大与平移</td>
            <td>undefined</td>
        </tr>
        <tr>
            <td>maximumScale</td>
            <td>number</td>
            <td>最大放大尺寸</td>
            <td>3</td>
        </tr>
        <tr>
            <td>geoJson</td>
            <td>ExtendedFeatureCollection</td>
            <td>地图 geoJson 数据</td>
            <td>undefined</td>
        </tr>
        <tr>
            <td>areaStyle</td>
            <td><a href="#areastyle">AreaStyle</a></td>
            <td>地图中每个区块的样式</td>
            <td>undefined</td>
        </tr>
    </tbody>
</table>

## AreaStyle

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

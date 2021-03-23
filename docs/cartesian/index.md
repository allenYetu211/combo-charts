# Cartesian 组件

Cartesian 组件是笛卡尔坐标系组件，通过这个组件可以建立一个笛卡尔坐标系。

## 基本使用

```tsx
import { Combo, Cartesian } from 'combo-charts';

function PageName(props: any) {
  return (
    <Combo width="500" height="500">
      <Cartesian
        xAxis={{ mode: 'category', domain: ['0', '2'] }}
        yAxis={{ type: 'value', min: 0, max: 10 }}
      >
        {/* svg 的元素可以放这里 */}
      </Cartesian>
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
            <td>xAxis</td>
            <td><a href="#axis">Axis</a></td>
            <td>横坐标配置项</td>
            <td><code>{ mode: 'category' }</code></td>
        </tr>
        <tr>
            <td>yAxis</td>
            <td><a href="#axis">Axis</a></td>
            <td>纵坐标配置项</td>
            <td><code>{ mode: 'value' }</code></td>
        </tr>
        <tr>
            <td>style</td>
            <td><a href="#cartesianstyle">CartesianStyle</a></td>
            <td>笛卡尔坐标系样式</td>
            <td>undefined</td>
        </tr>
    </tbody>
</table>

## Axis

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
        <td>mode</td>
        <td>string</td>
        <td><code>value</code> | <code>category</code></td>
        <td>undefined</td>
      </tr>
      <tr>
        <td>min</td>
        <td>number</td>
        <td>最小值，只在 <code>mode === 'value'</code> 时有效</td>
        <td>undefined</td>
      </tr>
      <tr>
        <td>max</td>
        <td>number</td>
        <td>最大值，只在 <code>mode === 'value'</code> 时有效</td>
        <td>undefined</td>
      </tr>
      <tr>
        <td>domain</td>
        <td>string[]</td>
        <td>值域，只在 <code>mode === 'category'</code> 时有效</td>
        <td>undefined</td>
      </tr>
    </tbody>
</table>

## CartesianStyle

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
        <td>padding</td>
        <td>[number, number, number, number] | number</td>
        <td>内边距，同 css padding 模式一致 [top, right, bottom, left]</td>
        <td>0</td>
      </tr>
      <tr>
        <td>paddingTop</td>
        <td>number</td>
        <td>顶部内边距</td>
        <td>0</td>
      </tr>
      <tr>
        <td>paddingRight</td>
        <td>number</td>
        <td>右内边距</td>
        <td>0</td>
      </tr>
      <tr>
        <td>paddingBottom</td>
        <td>number</td>
        <td>底部内边距</td>
        <td>0</td>
      </tr>
      <tr>
        <td>paddingLeft</td>
        <td>number</td>
        <td>左内边距</td>
        <td>0</td>
      </tr>
    </tbody>
</table>

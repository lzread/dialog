# Javascript Dialog

## 特点
- 零依赖（原生JS实现，不依赖于任何库）
- 完全免费开源
- 使用 rollup.js 打包


## 快速开始
#### head 引入样式
```html
<link rel="stylesheet" href="dialog.min.css">
```
#### 页面底部引入 JS 文件
```html
<script src="dialog.min.js"></script>
```
#### 结构
```html
<div id="demoA01" style="display:none"></div>
```
#### 调用
```javascript
var dialogA01 = new Dialog(document.querySelector('#demoA01'));
```
## 配置
<table class="table table-striped table-condensed table-bordered">
<thead>
<tr>
<th>属性</th>
<th>名称</th>
<th>值类型</th>
<th>默认值</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>title</td>
<td>窗口标题</td>
<td><code>String</code></td>
<td><code>提示</code></td>
<td><code></code></td>
</tr>
<tr>
<td>width</td>
<td>窗口宽度</td>
<td><code>String</code></td>
<td><code>500px</code></td>
<td><code></code></td>
</tr>
<tr>
<td>height</td>
<td>窗口高度</td>
<td><code>String</code></td>
<td><code>auto</code></td>
<td><code></code></td>
</tr>
<tr>
<td>fullscreen</td>
<td>是否全屏显示</td>
<td><code>Boolean</code></td>
<td><code>false</code></td>
<td><code></code></td>
</tr>
<tr>
<td>customClass</td>
<td>自定义Class</td>
<td><code>String</code></td>
<td><code>Null</code></td>
<td><code></code></td>
</tr>
<tr>
<td>showClose</td>
<td>提示</td>
<td><code>Boolean</code></td>
<td><code>是否显示关闭按钮</code></td>
<td><code></code></td>
</tr>
<tr>
<td>showToggle</td>
<td>是否显示最大化、最小化按钮</td>
<td><code>Boolean</code></td>
<td><code>false</code></td>
<td><code></code></td>
</tr>
<tr>
<td>modal</td>
<td>是否显示遮罩层</td>
<td><code>Boolean</code></td>
<td><code>false</code></td>
<td><code></code></td>
</tr>
<tr>
<td>drag</td>
<td>是否支持拖动</td>
<td><code>Boolean</code></td>
<td><code>false</code></td>
<td><code></code></td>
</tr>
<tr>
<td>closeOnClickModal</td>
<td>是否支持点击遮罩层关闭</td>
<td><code>Boolean</code></td>
<td><code>false</code></td>
<td><code></code></td>
</tr>
<tr>
<td>footer</td>
<td>底部是否显示</td>
<td><code>Boolean</code></td>
<td><code>false</code></td>
<td><code></code></td>
</tr>
<tr>
<td>cancelButtonText</td>
<td>取消按钮文本</td>
<td><code>String</code></td>
<td><code>取消</code></td>
<td><code></code></td>
</tr>
<tr>
<td>submitButtonText</td>
<td>确认按钮文本</td>
<td><code>String</code></td>
<td><code>确定</code></td>
<td><code></code></td>
</tr>
<tr>
<td>cancelCallBack</td>
<td>取消按钮回调函数</td>
<td><code>Function</code></td>
<td><code>Null</code></td>
<td><code></code></td>
</tr>
<tr>
<td>submitCallBack</td>
<td>确认按钮回调函数</td>
<td><code>Function</code></td>
<td><code>Null</code></td>
<td><code></code></td>
</tr>
<tr>
<td>beforeClose</td>
<td>关闭前回调</td>
<td><code>Function</code></td>
<td><code>Null</code></td>
<td><code></code></td>
</tr>
</tbody>
</table>


## 实例
#### 默认配置
```javascript
var dialogA01 = new Dialog(document.querySelector('#demoA01'));
```

#### 默认打开全屏显示
```javascript
var dialogA02 = new Dialog(document.querySelector('#demoA02'), {
	fullscreen: true
});
```

#### 支持最大化
```javascript
var dialogA03 = new Dialog(document.querySelector('#demoA03'), {
	showToggle: true
});
```

#### 支持拖动
```javascript
var dialogA04 = new Dialog(document.querySelector('#demoA04'), {
	drag: true
});
```

#### 自定义尺寸
```javascript
var dialogA05 = new Dialog(document.querySelector('#demoA05'), {
	width:'800px',
	height:'600px'
});
```


#### 隐藏底部按钮
```javascript
var dialogA06 = new Dialog(document.querySelector('#demoA06'), {
	footer:false
});
```

#### 不显示遮罩层
```javascript
var dialogA07 = new Dialog(document.querySelector('#demoA07'), {
	modal: false
});
```

#### 自定义Class
```javascript
var dialogA08 = new Dialog(document.querySelector('#demoA08'), {
	customClass: 'myDialog'
});
```

#### 自定义标题
```javascript
var dialogA09 = new Dialog(document.querySelector('#demoA09'), {
	title: '添加收货地址'
});
```

#### 点击遮罩层关闭窗口
```javascript
var dialogA10 = new Dialog(document.querySelector('#demoA10'), {
	closeOnClickModal: true
});
```

#### 自定义底部按钮文字
```javascript
var dialogA11 = new Dialog(document.querySelector('#demoA11'), {
	submitButtonText: "yes",
	cancelButtonText: "no"
});
```

#### 底部按钮事件
```javascript
var dialogA12 = new Dialog(document.querySelector('#demoA12'), {
	cancelCallBack: function (element) {
		alert('点击了取消按钮');
		//return true 关闭窗口
		return false;
	},
	submitCallBack: function (element) {
		alert('点击了确认按钮');
		//return true 关闭窗口
		return false;
	}
});
```

#### 关闭窗口前执行的方法
```javascript
var dialogA13 = new Dialog(document.querySelector('#demoA13'), {
	beforeClose: function (element) {
		alert('窗口关闭前执行');
		//return true 关闭窗口
		return false;
	}
});
```

## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 9+

## License

[MIT](https://opensource.org/licenses/MIT) © [lzread](https://lzread.github.io/dialog)
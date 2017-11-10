# jquery.my-popover
支持ie9+

用于定位到元素旁边出现iframe并打开一个链接

<img src='http://opok8iwaa.bkt.clouddn.com/image/github/jquery.my-popoverjquery.my-popover.png' style='width:500px'/>



#### 示例代码

```html
<input type="text" name="test" id="test" value="" />
<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="js/jquery.my-popover.js"></script>
<script type="text/javascript">
  		//2种不同的方式
		var mp = new myPopover('test.html');
		/*var mp = new myPopover({
			width: 700,
			height: 400,
			minWidth: 400,
			minHeight: 300,
			src: 'test.html',
		});*/
		$('#test').on('click', function() {
           //2种不同的方式
		  //mp.show(this, 'test.html');
           //在上面设置了默认的src，就不用再次设置
			mp.show(this);//this为当前的dom
		});
</script>
```


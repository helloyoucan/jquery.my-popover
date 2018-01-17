用于定位到元素旁边并打开指定的内容
=======
用于定位到元素旁边出现iframe并打开一个链接


<img src='http://opok8iwaa.bkt.clouddn.com/image/github/jquery.my-popover/jquery.my-popover-2.png'/>
<img src='http://opok8iwaa.bkt.clouddn.com/image/github/jquery.my-popover/jquery.my-popover-1.png'/>



#### 示例代码

```javascript
var zTreeObj;
			$('.test1').myPopover({
				content: '<ul id="treeDemo" class="ztree"></ul>',
				maxHeight: '200px',
				afterAddDom: function() {
					// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
					var setting = {
						check: {
							enable: true,
							chkboxType: {
								"Y": "s",
								"N": "s"
							}
						}
					};
					// zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
					var nodes = [{
							name: "父节点1",
							children: [{
									name: "子节点1"
								},
								{
									name: "子节点2",
									checked: true
								}
							]
						},
						{
							name: "父节点1",
							children: [{
									name: "子节点1"
								},
								{
									name: "父节点1",
									children: [{
											name: "子节点1"
										},
										{
											name: "父节点1",
											children: [{
													name: "子节点1"
												},
												{
													name: "子节点2"
												}
											]
										},
									]
								},
							]
						}, {
							name: "父节点1",
							children: [{
									name: "子节点1"
								},
								{
									name: "父节点1",
									children: [{
											name: "子节点1"
										},
										{
											name: "父节点1",
											children: [{
													name: "子节点1"
												},
												{
													name: "子节点2"
												}
											]
										},
									]
								},
							]
						}
					];
					zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, nodes);
				},
				beforeDestroy: function($dom) {
					var nodeList = zTreeObj.getCheckedNodes();
					var nameList = [];
					nodeList.forEach(function(item) { //如果是末尾节点
						if(!item.children) {
							nameList.push(item.name)
						}
					})
					$dom.val(nameList.slice(','));
				}
			});
			$('.test2').myPopover({
				content: 'this is test2',
			});
```


/**
 * author:wucanlong
 * Github:helloyoucan
 * */

var myPopover = (function() {
	function Popover(opts) {
		if(typeof opts == "string" && opts != null) {
			DEFAULT_OPT.src = opts;
		} else if(typeof opts == "object") {
			DEFAULT_OPT = $.extend({}, DEFAULT_OPT, opts);
		}
		this._addDom();
		this._addStyle();
		this._addEvent();
	}
	var DEFAULT_OPT = {
		width: 700,
		height: 400,
		minWidth: 400,
		minHeight: 300,
		src: '',
	};
	Popover.prototype._addDom = function() {
		/*添加Dom*/
		var Fragment = document.createDocumentFragment();
		g_popoverDom = document.createElement('div'); //全局
		g_imgDom = document.createElement('img');
		g_iframeDom = document.createElement('iframe');
		g_maskDom = document.createElement('div');
		g_closeDom = document.createElement('span');
		g_closeDom.innerHTML = '&times;'
		g_popoverDom.className = 'selectPopover';
		g_iframeDom.src = DEFAULT_OPT.src;
		g_imgDom.src = 'data:image/gif;base64,R0lGODlhQABAANU6AAQGBFxeXAwODDQyNExOTERGRCwuLDQ2NBwaHCQmJCwqLExKTBweHBQWFBQSFDw6PFRWVDw+PFRSVFxaXAwKDCQiJERCRMzKzOTm5Hx+fLS2tNze3KSmpISGhKyurHRydGRmZJyanHR2dNTW1JSWlIyOjMTCxJyenMzOzHx6fLy6vISChNza3IyKjGxubLy+vNTS1JSSlLSytGxqbOTi5KyqrMTGxGRiZKSipAQCBAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTU5NDhFRTBCM0FBMTFFN0E1OTJENjk0MDU4NTdEMzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTU5NDhFRTFCM0FBMTFFN0E1OTJENjk0MDU4NTdEMzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNTk0OEVERUIzQUExMUU3QTU5MkQ2OTQwNTg1N0QzNyIg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';
		g_maskDom.className = 'sp_mask';
		g_closeDom.className = 'sp_close';
		g_popoverDom.appendChild(g_closeDom);
		g_popoverDom.appendChild(g_maskDom);
		g_popoverDom.appendChild(g_closeDom);
		g_popoverDom.appendChild(g_iframeDom);
		g_popoverDom.appendChild(g_imgDom);
		Fragment.appendChild(g_popoverDom);
		$('body').append(Fragment);

	}
	Popover.prototype._addStyle = function() {
		/*添加style*/
		g_$styleDom = $("<style></style>"); //全局
		g_$styleDom.html(
			'.selectPopover {display: none;border: 2px solid #ddd;box-shadow: 0px 2px 3px rgba(0, 0, 0, .175);background-color: #fff;position: absolute;padding-top: 25px;}' +
			'.selectPopover iframe {width: 100%;height: 100%;border: none;display: none;position:relative;z-index:99;}' +
			'.selectPopover img{width: 30px;height: 30px;margin: 5px;}' +
			'.sp_mask{position:fixed;top:0;bottom:0;left:0;right:0;z-index:98;}' +
			'.sp_close{display: inline-block;position: absolute;z-index: 100;right: 0px;top: -14px;font-size: 40px;color: #555;cursor: pointer;}.sp_close:hover{color:red}'
		);
		$('head').append(g_$styleDom);
	}
	Popover.prototype._setPosition = function(ele) {
		/*设定位置*/
		var $that = $(ele);
		var size = {
			top: (function() {
				if($(window).height() - $that.offset().top < DEFAULT_OPT.minHeight) {
					var top = $that.offset().top - $that.outerHeight() - DEFAULT_OPT.minHeight;
					top = top > 0 ? top : 0;
					return top;
				}
				return $that.offset().top + $that.outerHeight();
			})(),
			left: (function() {
				if($(window).width() - $that.offset().left < DEFAULT_OPT.minWidth) {
					return $that.offset().left - (DEFAULT_OPT.minWidth - ($(window).width() - $that.offset().left));
				}
				return $that.offset().left;
			})(),
			width: (function() {
				var default_width = DEFAULT_OPT.width,
					that_left = $that.offset().left,
					window_width = $(window).width();
				if($(window).width() - $that.offset().left < DEFAULT_OPT.minWidth) {
					return DEFAULT_OPT.minWidth;
				}
				return(that_left + default_width) < window_width ? default_width : window_width - that_left - 10;
			})(),
			height: (function() {
				var default_height = DEFAULT_OPT.height,
					that_top = $that.offset().top + $that.outerHeight(),
					window_height = $(window).height(),
					that_height = $that.height();
				if($(window).height() - $that.offset().top < DEFAULT_OPT.minHeight) {
					var top = $that.offset().top - $that.outerHeight() - DEFAULT_OPT.minHeight;
					if(top < 0) {
						return DEFAULT_OPT.minHeight + top;
					}
					return DEFAULT_OPT.minHeight;
				}
				return(that_top + default_height) < window_height - that_height ? default_height : window_height - that_height - that_top - 10;
			})(),
		}
		$(g_popoverDom).css({
			width: size.width,
			height: size.height,
			top: size.top,
			left: size.left,
		});
	}
	Popover.prototype._addEvent = function() {
		/*监听iframe是否加载完毕*/
		$(g_iframeDom).on('load', function() {
			$(this).show();
			$(g_imgDom).hide();
		});
		$(g_popoverDom).on('click', function() {
			return false;
		})
		$(g_maskDom).on('click', function() {
			$(g_popoverDom).hide();
		});
		$(g_closeDom).on('click', function() {
			$(g_popoverDom).hide();
		});
	};
	Popover.prototype.show = function(ele, src) {
		if(src !== undefined) {
			$(g_iframeDom).attr('src', src);
		}
		$(g_iframeDom).attr('src', DEFAULT_OPT.src);
		this._setPosition(ele);
		$(g_popoverDom).show();
	}
	Popover.prototype.hide = function() {
		$(g_popoverDom).hide();
	}
	Popover.prototype.destroy = function() {
		$(g_popoverDom).remove();
		g_$styleDom.remove();
	}
	return Popover;
})();
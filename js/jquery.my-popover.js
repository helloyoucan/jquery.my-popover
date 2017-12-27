/**
 * author:wucanlong
 * Github:helloyoucan
 * */

(function() {
	function Popover(that, opts) {
		this.opts = $.extend({}, Popover.DEFAULT_OPT, opts);
		this.that = that;
		this._addEvent();
	}
	Popover.DEFAULT_OPT = {
		content: '',
		maxHeight: '200px',
		afterAddDom: function() {},
		beforeDestroy: function() {},

	};
	Popover.prototype._addStyle = function() {
		this.$style = $('<style id="popoverStyle"></style>');
		this.$style.append(
			'.select-popover {position: fixed;width: 100px;z-index: 999;}' +
			'.s_p-content {box-sizing: border-box;overflow: auto;background-color: #fff;border: 1px solid #ddd;padding: 3px;}'
		);
		$('head').append(this.$style);
	}
	Popover.prototype._addDom = function() {
		var $that = $(this.that);
		var $select_popover = $('<div class="select-popover"></div>');
		this.$select_popover = $select_popover;
		$select_popover.append('<div class="s_p-content"  style="max-height:' + this.opts.maxHeight + '">' +
			this.opts.content +
			'</div>')
		this.$select_popover = $select_popover;
		$that.after($select_popover);
		this.opts.afterAddDom();
	}
	Popover.prototype._addEvent = function() {
		var $that = $(this.that);
		var that = this;
		$that.on('click', function(e) {
			that._addStyle();
			that._addDom();
			var size = {
				top: $(this).offset().top - $('html').scrollTop(),
				left: $(this).offset().left - $('html').scrollLeft(),
				width: $(that.that).outerWidth(),
				height: $(that.that).outerHeight(),
			}
			that.$select_popover.css({
				top: size.top,
				left: size.left,
				width: size.width,
				paddingTop: size.height
			});
			that.$select_popover.show();
			that.$select_popover.on('mouseleave', function() {
				that.opts.beforeDestroy($that);
				that._destroy();
			});
			$(window).scroll(function() {
				var size = {
					top: $that.offset().top - $('html').scrollTop(),
					left: $that.offset().left - $('html').scrollLeft(),
				}
				that.$select_popover.css({
					top: size.top,
					left: size.left,
				});
			});
		});

	}

	Popover.prototype._destroy = function() {
		this.$select_popover.remove();
		this.$style.remove();
	}
	$.fn.extend({
		myPopover: function(opts) {
			return this.each(function() {
				new Popover(this, opts);
			});
		}
	});
})();
/*
键盘监听事件

* 依赖：无
* 创建：2015-10-20
* 更新：1.0.2 更新回调函数用法
 */
;(function(window){
	/**
	 * 获取键盘按键对应的名称
	 * @param  {number} code   键盘按键编码
	 * @return {string}        对应名称
	 */
	function getCode(code){
		var key_list={
			'key-9':'tab',
			'key-13':'enter',
			'key-16':'shift',
			'key-17':'ctrl',
			'key-18':'alt',
			'key-32':'space',
			'key-37':'left_arrow',
			'key-38':'up_arrow',
			'key-39':'right_arrow',
			'key-40':'down_arrow',
			'key-48':'0',
			'key-49':'1',
			'key-50':'2',
			'key-51':'3',
			'key-52':'4',
			'key-53':'5',
			'key-54':'6',
			'key-55':'7',
			'key-56':'8',
			'key-57':'9',
			'key-65':'a',
			'key-66':'b',
			'key-67':'c',
			'key-68':'d',
			'key-69':'e',
			'key-70':'f',
			'key-71':'g',
			'key-72':'h',
			'key-73':'i',
			'key-74':'j',
			'key-75':'k',
			'key-76':'l',
			'key-77':'m',
			'key-78':'n',
			'key-79':'o',
			'key-80':'p',
			'key-81':'q',
			'key-82':'r',
			'key-83':'s',
			'key-84':'t',
			'key-85':'u',
			'key-86':'v',
			'key-87':'w',
			'key-88':'x',
			'key-89':'y',
			'key-90':'z',
			'key-112':'f1',
			'key-113':'f2',
			'key-114':'f3',
			'key-115':'f4',
			'key-116':'f5',
			'key-117':'f6',
			'key-118':'f7',
			'key-119':'f8',
			'key-120':'f9',
			'key-121':'f10',
			'key-122':'f11',
			'key-123':'f12',
		}
		return key_list['key-'+code];
	}
	/**
	 * 键盘监听事件初始化
	 * @param  {object} rule   按键策略事件列表
	 * -{
	 * 	"键盘名,多个用-隔开,全部为小写,tab-f1":执行调用的函数
	 * }
	 * @param  {object} option 配置参数
	 * @return {object}        keyboard对象
	 */
	var keyboard=function(rule,option){
		this.rule=rule;
		this.press_key='';
		this.option={
			forbidden:'shift'
		}
		this.option=$.extend(this.option,option);
		return this;
	}
	keyboard.prototype={
		/**
		 * 更新keyboard事件列表
		 * @param  {object} list 监听事件列表
		 */
		update:function(rule){
			this.rule=null;
			this.rule=rule;
		},
		on:function(){
			this.press_key='';
			var _this=this;
			$(document).on('keydown',function(e){
				var key=getCode(e.keyCode);
				//console.log('key名：'+key);
				//更新键盘组合键
				if(key&&_this.press_key){
					var rule='(^|\\-)'+key+'(\\-|$)';
					var regexp=new RegExp(rule);
					if(!regexp.test(_this.press_key)) _this.press_key+='-'+key;
				}else{
					_this.press_key=key;
				}
				//console.log(_this.press_key);
				if(key&&_this.press_key){
					var rule='(^|\\-)'+_this.option.forbidden+'(\\-|$)';
					var regexp=new RegExp(rule);
					if(regexp.test(_this.press_key)){
						return false;
					}
				}
			});
			$(document).on('keyup',function(e){
				//判断执行函数
				if(typeof _this.rule[_this.press_key]==='function'){
					_this.rule[_this.press_key].call(_this);
				}
				//清空按键情况
				if(_this.press_key){
					var key=getCode(e.keyCode);
					if(key){
						var rule='(^|\\-)'+key+'(\\-|$)';
						var regexp=new RegExp(rule);
						_this.press_key=_this.press_key.replace(regexp,'$2');
					}
				}
				if(_this.press_key===''&&_this.rule['default']){
					_this.rule['default'].call(_this);
				}
				//console.log('放开时目前按键：'+_this.press_key);
			});
		},
		off:function(){
			this.press_key='';
			$(document).off('keydown');
			$(document).off('keyup');
		}
	}
	window.keyBoard=keyboard;
})(window)
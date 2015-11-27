keyBoard
=

## 介绍

keyBoard是一个Jquery的键盘监听插件，可以通过监听配置的键盘按键（单键或组合键），执行设定的函数

## 引入

```
<script type="text/javascript" src="./src/keyboard.min.js"></script>
```

## 执行
```
var key_config={
    'a':function(){//单键配置
        console.log('this is a!');
    },
    'shift-a':function(){//使用组合键配置
        console.log('this is shift+a');
    }
}
var keyboard=new keyBoard(key_config);//加载配置文件
keyboard.on();//执行
```

## 关闭监听
```
keyboard.off();
```

## 更新规则
```
var key_config={
    'b':function(){//单键配置
        console.log('this is b!');
    }
}
keyboard.update(key_config);
```

## 变更阻止键
阻止键帮助屏蔽浏览器默认的组合键，如阻止键为ctrl时，将会屏蔽所有带有ctrl的组合键，但ctrl+w，ctrl+t等默认规则无效。默认阻止键为shift

```
var key_config={
    'ctrl+c':function(){//单键配置
        console.log('this is ctrl+c!');
    }
}
keyboard.update(key_config,{forbidden:'ctrl'});
```
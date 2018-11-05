# 在项目中使用TS的一些好处，以及迁移的方式，配置等
1、举例说明使用typescript之后的代码，具有代码提示和校验功能
2、距离说明使用typescript之后的代码可以避免的一些问题

## 开始讲解typescript

1、首先要了解的一点是，typescript的本质还是JavaScript，在只是在JavaScript的基础上添加了类型检查和一些新的语言特性，最终还是需要编译成js代码。所以大家不用感到很陌生或者是觉得很难。

2、首先来看一下基础类型，有以下一些基础类型
+ `String`
+ `Number`
+ `Boolean`
---
+ `Array`
+ `Tuple`
+ `Enum`
-----
+ `Any`
+ `Void`
+ `Null` and `Undefined`
+ `Nerver`
----
+ `object`

+ 类型断言

&nbsp"
&nbsp"
&nbsp"
我们先看下基础类型和简单的typescript语法
## String & Number & Boolean

这三个没啥好说的，是最基本的类型
```
let x:string = "xyz";
let y:number = 123;
let z:boolean = true;
```
但是如果在指定了类型的情况下，字面量赋值类型不符合，则会报错，例如
```
let x:string = true;
```
TS 会提示 不能讲`true`分配给类型`string`;
 因为`true`是`boolean`类型。

## Array
数组的话 其实是一个泛型,泛型的概念我们会在后面做详细的讲解，现在先看一下基础的用法。

声明一个数组变量
```
const arr:Array<string> = [];
```
这段话表示 arr是一个数组，且数组中的每个元素的类型是string。

还有另外一种表示数组的方式

```
const arr:string[] = [];
```
看下代码


## Tuple
Tuple是描述一个已知类型的固定长度数组的类型。
```
const tuple: [string, number] = ['吕佳文', 25];
```





## Enum
```
// Enum
enum Color { Red, Green, Blue };

let c: Color = Color.Green;
```

单纯的从字面上看 不太好理解。我们可以看下它转换为js之后是什么样子。

<!-- 转换后代码 -->
```
"use strict";
exports.__esModule = true;

var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;

console.log(Color);
// { '0': 'Red', '1': 'Green', '2': 'Blue', Red: 0, Green: 1, Blue: 2 }
console.log(c);
// 1
```

相同的，既然他是一个对象，我们可以取值
```
enum Color { Red, Green, Blue };
let d = Color[0];
console.log(d);

// 提问 这里的d会输出什么？
```

同样的，枚举可以被先行赋值例如
```
enum Color2 { Green = 20, Red, Blue };
```

那这种情况下，Color2的值会发生什么变化呢，我们来依次看几种情况

+ 只有一个被赋值
```
enum Color2 { Green = 20, Red, Blue };

// Color2 { '20': 'Red', '21': 'Green', '22': 'Blue', Red: 20, Green: 21, Blue: 22 }
```
+ 多个被赋值
```
enum Color2 { Green = 20, Red = 33, Blue };

// Color2 { '20': 'Red', '33': 'Green', '34': 'Blue', Red: 20, Green: 33, Blue: 34 }
```
+ 多个被赋值2

```
enum Color2 { Green = 20, Red, Blue = 66};

// Color2 { '20': 'Red', '21': 'Green', '66': 'Blue', Red: 20, Green: 21, Blue: 66 }
```

+ 多个被赋值3
```
enum Color2 { Green, Red, Blue = 66};

// Color2 ？？这里会输出什么？
```

+ 非number类型赋值
```
enum Color { Red = 'hello', Green, Blue = 66 };

console.log(Color); // error
```
这种类型的赋值是不正确的，一旦出现了非number类型的赋值，就只能全部赋值  // line 61

在全部都赋值的情况下，不同的赋值类型也会有不同的结果，例如
```
enum Color { Red = 'hello', Green = 'word', Blue = 66 };

Color { '66': 'Blue', Red: 'hello', Green: 'word', Blue: 66 };
```
可以看到 只有Blue进行了转换
+ 赋值不能是变量或者其他类型的数据，在声明之后也不能在对其进行赋值  // 例如 line 64




## Any
any类型，表示可以为任何类型，一般用来表示我们并不知道的类型。比如，后端给的数据，或者一个没有ts版本的第三方插件。

```
let notSure:any = 123;
notSure = "haha";   // ok
notSure = boolean;   // ok
```
any类型的存在可以很好的解决现有代码改装typescript的问题。
但是，我们还是建议尽量少用any,因为用any和不用typescript没什么太大的区别

<!-- 后续要补充any和object的区别 -->

## Void
void类型可以认为是any的反面, 也就是根本没有类型，你可以认为他它是一个没有返回值函数的返回值。
```
function A(value): void {
  console.log(value);
}
A();
```
我们通常认为,如果一个函数没有返回值，那么他就会返回`undefined`。但是void和undefined还是有区别的。
```
function A(): void {
  return undefined;
}
A();
// OK
```
上述代码中，函数期待的返回值是 void，但是我们返回的是undefined。这样是没有问题的。

我们反过来看
```
function A(): undefined {
  console.log(window);
}
A();
// error
```
如果我们期待返回的是undefined，但是我们没有返回任何值，就会出现类型上的问题。


要怎么去理解这个东西，我们可以浅显的认为, undefined === void; 但是 void !== undefined;

我们通常认为没有返回值的函数返回的是`undefined`。其实应该不是，应该是 如果一个值是一个没有返回值函数返回的值，那么这个值就是没有值，而不是说函数的返回值是`undefined`，而没有值的值，就会被认为是`undefined`。



# Null and Undefined

null和undefined没啥好说的
```
let x:null = null;
let y:undefined = undefined;
```
null和undefined只有一个值。所以基本没啥作用。
但是有一点需要注意的事情是，null和undefined被认为是其他类型的子类型。也就意味着你可以给number或string赋值为null。  
我们看下这中情况在实际应用中的表现。
例如  // 类型例子 C();

```
function C() {
  let arr: Array<string> = [];
  let x = arr.find(item => item === '1');
  x.split(' ');
}
```
大家看下这段代码有没有问题。
其实是有一些问题的，因为Array.prototype.find的返回值可能是 `undefined`。如果再执行后面的代码，就会出错。 

但是实际上ts没有报错。这其实是上述的特性导致的，但是其实我们可以避免这种情况，在ts里面有一个配置选项
`strictNullChecks` 和 `strict`; 只要打开就会强制校验，`null`和`undefined`只能是它自己类型本身，或者是`void`。
在这里是建议大家开启，来避免一些问题。


## Never
这个不太用到，用来表示一个绝对不会执行到的类型
```
function A():never {
  throw new Error(message);
}
```

上述代码中，函数抛出错误不会在继续执行，所以函数的返回值是Never。  
相同的地方还有死循环
```
function infiniteLoop(): never {
    while (true) {
    }
}
```

## Object
object类型表示非原始类型的其他类型。可以理解为 不是 `null` `undefine` `string` `number` `boolean` `symbol`的类型。

``` 
let a:object = {};
let b:object = /^1[0-9]{10}$/;
let c: object = null;
```
上面的代码中 可以看出除了我们刚刚说的那些值，其他的都可以为object，那么这样的话，看起来它和any很相似，但是实际上还是有写区别的。
+ object类型 不能为 null undefined string number boolean symbol类型的数据。
+ object类型只能规定类型，不能给当前的值进行对象方式的扩展或调用。
代码 类型例子.ts ObjectType();


## 类型断言
在有些时候，我们可能比ts更了解自己的数据是什么类型。所以我们可以在代码中强制使用某种类型。
```
let a: object = /regExp/g;
let lens = (a as Array<string>).length;
```

```
function Assertions(value: Array<string> | string, type: string) {
  if (type === '1') {
    value = value.split(' ');
  }
  return value.map(item => item + " hello");
}
```
在上述函数中，value值可能为 数组 或者是 string。但是如果type为1的话，那表示它一定的string。
而其实ts不知道我们的这条约定，他会认为value是 `Array<string> | string`, 它的类型上不存在split方法,也不存在map方法。
我们看下使用类型断言怎么去处理。

```
function Assertions(value: Array<string> | string, type: string) {
  if (type === '1') {
    value = (value as string).split(' ');
  }
  return value as Array<string>.map(item => item + " hello");
}
```
上面是一种表示方法，还有另外一种表示方法

```
function Assertions3(value: Array<string> | string, type: string) {
  if (type === '1') {
    value = (<string>value).split(' ');
  }
  return (<Array<string>>value).map(item => item + " hello");
}
```
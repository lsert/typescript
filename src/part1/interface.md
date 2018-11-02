# Interface
+ 接口的作用
+ 语法
+ 特殊属性
+ 函数类型

## 作用
定义数据结构，接口只定义结构和类型，但不定义值，他可以脱离于项目代码之外，定义通用的数据结构。如果一个数据被定义为某个接口，那么它的数据结构就一定要遵循这个接口的定义。

## 语法
基础语法
```
function A(person: {name:string, age:number}): void{
  console.log(person.name);
}
```
当我们需要描述一个对象的类型的时候，我们可能需要的是对这个对象内部的每个属性的详细类型描述。比如上述代码，我们传入一个person参数。他是一个纯对象，具有name属性和age属性。
当然我们可以使用interface字段抽象这个类型。
```
interface Person {
  name:string;
  age:number;
  speak(words:string):void;
}
```
他是如何应用在代码中的
```
function A(person: Person): void{
  console.log(Person.name);
}
```

## 接口的可选属性
```
interface Person {
  name:string;
  age?:number;
}
```
有些时候可能 我们需要的是一个属性是不必填的，
我们只需要在属性后面加一个问号就行。
// 代码演示

## 接口的只读属性
```
interface Person {
  readonly name:string;
  age?:number;
}
```
// 代码演示

## 函数类型
用interface 同样也可以表示函数
```
interface SearchFunc {
    (source: string, subString: string): boolean;
}
```
写法是 括号里面的内容定义参数类型，冒号后面的字段定义返回类型
// 代码演示 FunctionInterface()

当然 有些函数是可能包括静态类型的，比如
```
function A(){

}
A.sendMsg = function (){
  
}
```

这个时候我们看下如何写 
代码演示 FunctionInterfaceWithStaticTypes()




## 索引类型
想想一下 如果我们需要描述一个对象，他的键名是0-10000的数值。
```
interface {
  0:string;
  1:string;
  2:string;
  ......
}
```
我们不太可能写N个，尤其是在可扩展的情况下。
这个时候就会用到索引类型。
```
interface {
  [index:number] :string;
  [index:string]: string;
}
```
他表示 只要键名为number或者string类型就可以，不用管他到底是什么，也不用管他有多少个属性。



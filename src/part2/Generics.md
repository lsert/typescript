# 泛型

泛型的话，之前大家学过java的应该就不陌生了，这里简单的介绍一些就行了。

先来看泛型的简单应用  
函数泛型
```
function Box<T>(val:T):T{
  return val;
}
Box<string>(123);
```
这是一个极其无聊的函数。意思就是别人传进来什么值 我就返回什么值。
从类型上来讲，我们可以传入任何类型的值，所以这是个时候的函数的类型定义就不好写了。  
来看下没有泛型的go是如何处理泛型的。  
()[https://pic2.zhimg.com/v2-dd2dc3bc72b058b85774ee804a521165_b.jpg]

当然这只是一个玩笑。

只是为了给大家说明 泛型的用途。你可以浅显的理解为类型的参数。

当然接口也是支持泛型的  
```
interface BoxIF<T> {
    name: T;
    onChange(e: T): T;
}
```

我们之前写的Array其实也是泛型,如果我们用接口表示的话，他可能大概类似于这种结构。
```
interface Array2<T> {
  [index:number]: T;
  length:number;
  // ... others
}

let a: Array2<string> =['a','b'];
```
包括类，也是支持泛型的

```
class Array2<T> {
  [index:number]: T;
  length:number;
  push(...arg:Array<T>):void {
    <!-- code -->
  }
  //...code
}
let a: Array2<string> =['a','b'];
```
泛型的参数，也是可选的，但是方式不太一样 // code Param();
```
function Param() {
  interface paramIF<T = any> {
    name: T
  }
  let a: paramIF = {
    name: 123,
  }
  
  let b: paramIF<string> = {
    name: 123,   // error，name应该为string类型
  }
}
```
看一个实际运用的例子。  
后台给了我们返回的数据，格式大概为下面这种
```
{
  code:'0',
  message:'参数错误',
  result:null,
}
// ------
{
  code:'0',
  message:'',
  result: [
    {title:'这是标题',price:10,type:'select'},
    {title:'这是标题2',price:12,type:'input'},
    {title:'这是标题3',price:13,type:'date',conclusion:'暂无'},
  ]
}
```
我们来分析一下我们怎么写这个数据的`interface`;  

首先code,和message是string。
```
interface ResponseData {
  code:string;
  message:string;
}
```
而result是个Array,内部又是对象。这个时候一般情况下，我们可能就直接写any了。因为我们不清楚接口会返回给我们什么。但是有了泛型，我们可以做到更好。 
我们先写result的内部的类型。
```
interface resultData {
    title: string;
    price: number;
    type: 'select' | 'input' | 'date';
    conclusion?: string;
  }
  interface ResponseData {
    code: string;
    message: string;
  }
```
我们用泛型去处理result
```
interface resultData {
    title: string;
    price: number;
    type: 'select' | 'input' | 'date';
    conclusion?: string;
}
interface ResponseData<T> {
    code: string;
    message: string;
    result: T | null;
}

  fetch({
    url:'/test',
  }).then((res:ResponseData<Array<resultData>>)=>{
    return res;
  });
```
<!-- 这里需要代码演示 -->
相信大家看完 应该很清楚的了解了泛型的一些简单应用了 
我们现在来看下`Promise`的泛型接口
```
interface Promise<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
}
```
他接受一个泛型参数`T`。表示他在resolve状态下返回的值的类型。

`then`接收两个参数。分别表示 then的两个参数的返回值的类型。


# 泛型约束
特殊情况下我们需要对泛型进行约束，你不能什么类型都传给我，这在做一些枚举型的类型的时候很有用。
```
  interface BoxIF<T extends 'a' | 'b' | 'c'> {
    type?: T;
  }


  let a: BoxIF<'b' | 'a'> = {
    type: 'b',
  };
```
这里使用了关键字`extends`。他并非我们在前面讲的继承,而是对类型的一种约束。我们来通过代码看一下他的特征。





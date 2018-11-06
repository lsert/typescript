## 函数类型

函数的类型我们前面基本已经讲过了
现在简单看一下写法
```
 function A(name: string, age: number): string {
    return `${name} is ${age} years old`;
  }
  A('shuanger', 18);
```

函数的可选参数

```
 function A(name: string, age?: number): string {
    return `${name} is ${age} years old`;
  }
  A('shuanger');
```

函数的剩余参数
```
 function A(name: string, age?: number, ...others:Array<string>): string {
    return `${name} is ${age} years old`;
  }
  A('shuanger',18, 'hello', 'world');
```

`this`参数
当函数中出现this的时候，我们就得考虑this的类型，因为可能存在箭头函数（this会在上下文中取值），或`call` `apply`等操作，（`this`的值是不能确定的）。
这个时候我们如何定义this的值。

```
 class Box {
    name = '123';
    render() {
      return function () {
        return this.name;
      }
    }
  }
```
这个是一个简单的js的this指向问题的例子。typescript会在这个时候报错，但是前提是开启了 `noImplicitThis`。  

如果我们在函数的第一个参数写了this，函数内部的this就会被解析为对应的类型。尽管这样是错的。
```
class Box2 {
    name = '123';
    render() {
      return function (this: Box2) {
        return this.name;
      }
    }
  }
```

常见的应用场景就是回调函数中的`this`。
```
interface eventIF {
  (this: HTMLElement, e: Event): void
}

interface UIElement {
  addClickListener(onclick: eventIF): void;
}

let a: UIElement = {
  addClickListener(onclick) {
    // .....
  }
}

a.addClickListener(function () {
  console.log(this.appendChild);
});
```
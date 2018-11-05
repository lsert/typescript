# 类类型
要说类类型之前，我们要先说一下类的概念。

我自己把js中的类，表象的分为三个部分
1 类的构造函数
2 类的静态部分
3 类的实例部分

## 构造函数
我们如果使用ES5的写法来写class
```
class Box {
  static showName(){
    console.log('this is static method');
  }
  constructor(name){
    this.name = name;
  }
  changeName(newName){
    this.name = newName;
    return this;
  }
}

function Box (name){
  this.name = name;
}

Box.showName= function showName(){
    console.log('this is static method');
  }

Box.prototype.changeName = function changeName(newName){
    this.name = newName;
    return this;
}

let box = new Box();
```

类的接口有以下几个特点
+ 类的实例类型和静态类型需要分别处理
+ 使用new 关键字定义类构造函数类型
+ 使用this关键字表示实例类型
+ 类本身可以作为接口
+ 类可以在接口上实现扩展

## 类的实例类型和静态类型需要分别处理
我们先来看先如何定义一个类的接口
```
interface BoxIF {
    name: string;
    changeName(newName: string): this;
  }

  class Box implements BoxIF{
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    changeName(newName: string): this {
      this.name = newName;
      return this;
    }
  }
```
上诉的代码中，我们定义了一个class的类型，并且实现了这个类。
但是我们使用了一个新的关键字 `implements`,`implements`翻译过来就是`实现`的意思。也就是我们`Box`这个类实现了`BoxIF`这个接口的定义。所以Box这个类的属性和方法都必须要遵循BoxIF这个接口的定义。

在这里面的关键的一点是 `implements`的含义，你可以说Box实现了这个接口，但是实际上，`Box`本身是一个类，他它需要被实例化才能有所作为，所以我们可以理解为，`BoxIF`是描述`Box`的实例化的数据类型。因为类本身还有一些其他的属性，比如static静态方法，`constructor`构造器函数。这些我们在`BoxIF`中是无法描述的。这也是为啥我们要使用 implements关键字的原因。

关键信息：`BoxIF`是描述类实例化的数据类型。并不是描述类本身的。但是其实这句话并不完全准确。
```
interface BoxIF {
    name: string;
    changeName(newName: string): this;
  }

  class Box implements BoxIF {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    changeName(newName: string): this {
      this.name = newName;
      return this;
    }
  }
  let a: BoxIF = new Box('hello');
```
可以看到 我们给Box的实例赋予BoxIF类型，是可以通过的。  
但是这并不意味着，a的类型应该描述称为`BoxIF`。我们来看下一个特点。
## 类本身是类型。
```
class Box{
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    changeName(newName: string): this {
      this.name = newName;
      return this;
    }
  }
  let a: Box = new Box('hello');
```
上面的代码中，a的类型是什么，按照常理来讲 `a instanceof Box`。
这里的Box可以直接赋值给a,是因为Box本身就是一个类型。
可以浅显的理解为Box既是类，也是类型。是类型的时候描述的是类的实例。

## 如何描述类中的静态属性和方法。
```
function ClassInterface4() {
  interface BoxIF {
    name: string;
    changeName(newName: string): this;
  }

  interface BoxConstructor {
    new(name: string): void;
    showAll(): void;
  }

  class Box implements BoxIF {
    static showAll() {
      console.log('message');
    };
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    changeName(newName: string): this {
      this.name = newName;
      return this;
    }
  }
  let a: BoxIF = new Box('hello');

  function getClass(className: BoxConstructor): Box {
    return new Box('string');
  }
  getClass(Box);
}

```
上面的代码中，我们定义了`BoxConstructor`接口，他描述了Box的类型。

### 类是可以扩展实现接口的
```
interface BoxIF {
    name: string;
    changeName(newName: string): this;
  }

  class Box implements BoxIF {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    changeName(newName: string): this {
      this.name = newName;
      return this;
    }
    changeCode(newCode: number): this {
      return this;
    }
  }
  let a: Box = new Box('hello');
  a.changeCode(123);
```
如上，我们给这个类添加了`changeCode`方法。但是在`BoxIF`中没有这个方法。这样做是被允许的，它很像接口的继承。



## 接口继承类
我们可以把类当做接口，这样的话，接口继承类也是很自然的一件事情。
```
function interfaceExtendsClass() {
  class Box {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    changeName(newName: string): this {
      this.name = newName;
      return this;
    }
    changeCode(newCode: number): this {
      return this;
    }
  }

  interface Box2 extends Box {
    code: number
  }

  let a: Box2 = {
    name: '123',
    code: 123,
    changeName(newName) {
      return this;
    },
    changeCode(newCode) {
      return this;
    }
  };
}
```


## 类的其他概念
+ 类的继承  // 忽略
+ public 和 private
+ protected
+ readonly // 忽略
+ 存取器  // 忽略
+ 静态属性 // 忽略
+ 抽象类

### public 和private
例子 publicAndPrivate()

### protected
protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。

### 抽象类

```
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}
```
抽象类一般作为其他类的基类使用，也就是别人要继承他使用，他本身不能被实例化，但是可以定义一些类的细节。
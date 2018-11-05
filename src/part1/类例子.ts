import React from 'react';

function ClassInterface() {

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
}

// 佐证代码
function ClassInterface2() {
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
}


// 类本身可以作为接口
function ClassInterface3() {

  class Box {
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
}



// 类的静态类型定义
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


// 扩展实现接口
function ClassInterface5() {
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
}

// 接口继承类
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





function publicAndPrivate() {
  class Animal {
    public name: string;
    private age: number = 12;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
      console.log(this.age); // 在内部 可以访问
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }
  let animal = new Animal('fox');
  console.log(animal.name);
  console.log(animal.age);  // 报错 只能在内部访问
}



function AbsClass() {
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

  let a = new Department();  // 不能实例化
  let b = new AccountingDepartment();
  b.printName();    // 可以调用抽象类里面的已经实现的方法

}
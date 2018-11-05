function Functions() {
  function A(name: string, age: number): string {
    return `${name} is ${age} years old`;
  }
  A('shuanger', 18);
}


function ThisInFunctions() {
  class Box {
    name = '123';
    render() {
      return function () {
        return this.name;
      }
    }
  }
  // error this可能为undefined 或 window

  class Box2 {
    name = '123';
    render() {
      return function (this: Box2) {
        return this.name;
      }
    }
  }
  // 如果我们在函数的第一个参数写了this，函数内部的this就会被解析为对应的类型。尽管这样是错的

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

  // 回调函数中的this是可以被定义类型的
}
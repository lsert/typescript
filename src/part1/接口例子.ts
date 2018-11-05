interface Person {
  name: string;
  age: number;
  speak(words: string): void;
}


// 函数接口类型的定义
function FunctionInterface() {

  interface Search {
    (key: string, value: string): boolean;
  }

  const search: Search = (key, value) => {
    return !!key.includes(value);
  }

  search('hello 1234', 12);
}


// 有静态属性函数接口类型的定义
function FunctionInterfaceWithStaticTypes() {

  interface Search {
    (key: string, value: string): boolean;
    get(): void;
  }

  const search: Search = (key, value) => {
    return !!key.includes(value);
  }

  search.get = function () {

  }

  search('hello 1234', '12');
}


// 索引类型
function IndexType() {
  interface NumberDictionary {
    [index: number]: string;
    length: number;    // 可以，length是number类型
    name: number;       // 错误，`name`的类型与索引类型返回值的类型不匹配
    0: string;
  }





  // 数组也可以作为索引类型
  interface Test {
    [index: number]: string;
  }
  const arr: Test = ["string1", "string2"];






  // 索引类型的定义冲突
  interface conflict {
    [index: number]: string;
    30: Array<string>;
  }

  let f: conflict = {
    0: 'abc',
    1: 'cde',
    2: 'edf',
    30: ['gagag']
  }

  // 索引类型的定义冲突2
  interface conflict2 {
    [index: string]: string;
    length: number;
  }

  let f2: conflict2 = {
    a: 'this is a',
    length: 1
  }

}



// 接口的继承
function interfaceExtend() {
  interface BoxIF {
    name: string;
    age: number;
  }

  interface BoxIF2 extends BoxIF {
    gender: 'M' | 'F';
    color: string;
  }

  let box: BoxIF2 = {
    name: 'shuanger',
    age: 18,
    gender: 'F',
    color: 'red'
  }

  // 注意点，接口继承不能修改父接口的类型。
  interface BoxIF3 extends BoxIF {
    name: Array<string>;
    gender: 'M' | 'F';
    color: string;
  }
  // error


  //  可以继承多个接口
  interface colorIF {
    name: string;
  }
  interface BoxIF4 extends colorIF, BoxIF {

  }
  let box4: BoxIF4;

}
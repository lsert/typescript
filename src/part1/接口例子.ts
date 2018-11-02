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
    [index: string]: number;
    length: number;    // 可以，length是number类型
    name: object       // 错误，`name`的类型与索引类型返回值的类型不匹配
  }

}

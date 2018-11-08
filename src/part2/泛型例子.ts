// 泛型接口
function GenInterface() {
  interface BoxIF<T> {
    name: T;
    onChange(e: T): T;
  }
}


function GenInterfaceArray() {
  // 数组的接口大致类似于
  interface Array2<T> {
    [index: number]: T;
    length: number;
    // ... others
  }

  let a: Array2<string> = ['a', 'b'];

  class ArrayMore<泛型1, 泛型2> {
    [index: number]: 泛型1;
    length: number = 0;
    push(...arg: Array<泛型1>): 泛型2 | void {

    }
    //...code
  }
  let a1: ArrayMore<string, number> = ['a', 'b'];


  // 数组的类大致类似于
  class Array3<T> {
    [index: number]: T;
    length: number = 0;
    push(...arg: Array<T>): void {
      // code
    }
    //...code
  }
  let b: Array3<string> = ['a', 'b'];
  b.push(1); // error
  b.push('1', '2'); // success;
}

function simple() {

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
}


// 泛型可选参数
function Param() {
  interface paramIF<T = any> {
    name: T
  }
  let a: paramIF = {
    name: 123,
  }

  let b: paramIF<string> = {
    name: 123,
  }
}



function simple2() {

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

  FetchAPI({
    url: '/test',
  }).then((res: ResponseData<Array<resultData>>) => {
    return res;
  });

  function getData(): Promise<ResponseData<Array<resultData>>> | undefined {
    return FetchAPI({
      url: '/test',
    }).then((res) => {
      return res;
    }).catch((e) => {
      return undefined;
    });
  }

  getData().then((res) => {
    if (res) {
      const result = res.result;
      // result resultData[] | null
    }
  });
}




// 泛型约束

function GenConstraints() {
  interface BoxIF<T extends 'a' | 'b' | 'c'> {
    type?: T;
  }


  let a: BoxIF<'b' | 'a'> = {
    type: 'b',
  };
}

function GenConstraints2() {

  interface A {
    length: number,
  }

  interface BoxIF<T extends A> {

  };

  let a: BoxIF<{
    length: number,
    name: string,
  }
    >;
}

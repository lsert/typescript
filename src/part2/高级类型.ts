function IntersectionTypes() {

  interface A {
    name: string;
    age: number;
  }

  interface B {
    title: string;
    age: string;
  }

  type C = A & B;
  let c: C;
  /*
  C = {
    name: string;
    age: number & string;
    title: string;
  }
  */

}


function UnionTypes() {
  interface A {
    name: string;
    age: number;
  }

  interface B {
    title: string;
    value: number;
  }

  let c: A | B = {
    name: 12,
    age: '133',
    title: '111',
    value: 111,
  };
}


function UnionTypes2() {
  interface A1 {
    name: string;
    age: number;
  }

  interface B1 {
    title: string;
    value: number;
  }

  let c: A1 | B1;
}


function UnionTypes3() {
  interface A3 {
    name: string;
    age: number;
  }

  interface B3 {
    title: string;
    value: number;
  }

  function isA3(c: A3 | B3): c is A3 {
    return (c as A3).hasOwnProperty('name');
  }

  let c: A3 | B3 = {
    name: 'lv',
    age: 123
  }

  if (isA3(c)) {
    c.name;
  }
}


function typeOf() {
  function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
      return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
  }
  // 

  function padLeft2(value: string | null) {
    if (value !== null) {
      value.split(' ');
    }
  }
}


function typeAlias() {
  interface A<T> {
    name: string;
    add(): T;
  }

  type AddString = A<string>;
}


function typeAlias2() {
  interface A<T> {
    name: string;
    add(): T;
  }

  type AddType<K> = A<K>;

  let c: AddType<string>;
}

function typeAlias3() {
  interface Box<T, K> {
    name: string;
    add(): T;
  }

  type AddType<A, B = {}> = Box<A, B> & { remove(): B } | { set(): A & B } | string;

  let c: AddType<string>;
}


function DiffTypeInterface() {
  type Alias = { num: number }
  interface InterfaceA {
    num: number;
  }

  let c: Alias;
  let d: InterfaceA;
}



function extendsFe() {
  type A<T, K extends T> = {

  };

  interface Box {
    length: number;
    name?: number;
  }

  interface Person {
    length: number;
  }

  let a: A<Box, Person>;
}


function extendsF2() {
  type A<T, K extends T> = {

  };

  type Box = string | number;

  type Person = number;

  let a: A<Box, Person>;
}


function extendsF3() {
  type A = Person extends Box ? string : number;

  type Box = string | number;

  type Person = number;

  let a: A;
}



function extendsF4() {
  type A<参数1> = {
    [我是key in keyof 参数1]: 参数1[我是key];
  };

  type Box = {
    name: string;
    age: number;
    title: boolean;
  };
  type test = A<Box>;


  let a: test;
}



function extendsPick() {
  type Pick2<T, K extends keyof T> = {
    [key in K]: T[key];
  }
  type Box = {
    name: string;
    age: number;
    title: boolean;
  };
  type test = Pick2<Box, 'name' | 'age'>;
  let a: test;


  type PickType<T, K extends keyof T> = T[K];

  type test2 = PickType<Box, 'age' | 'title'>;
}



function Exclude() {
  type Box = 'a' | 'b' | 'c';
  type Person = 'a' | 'b' | 'd';

  type Exc<T, U> = T extends U ? T : never;

  type c = Exc<Box, Person>;
}



function ExcludeSimple() {
  interface Box {
    name: string
    age: number,
    value: "jjjj"
  }

  interface Person {
    name: string;
    title: string;
    value?: number;
  }

  type ss = Extract<keyof Person, keyof Box>

  type Merge<A, B> = Pick<A, Exclude<keyof A, keyof B>> & B;
  type Merge2<A, B> =
    {
      [key in Exclude<keyof A, keyof B>]: A[key]
    }
    &
    {
      [key in keyof B]: B[key];
    };


  type sd = Merge2<Box, Person>
  let sasd: sd = {
    name: '12',
    age: 12,
    title: "23",
  }

}
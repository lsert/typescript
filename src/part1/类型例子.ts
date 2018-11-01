function A() {
  let a: string = 'hello';
  let b: number = 123;
  let c: boolean = true;
}


function B() {
  let x: string = 123;
  let y: string = true;
}



// null 和 undefined
function C() {
  let arr: Array<string> = [];
  let x = arr.find(item => item === '1');
  x.split('');
}




// object类型
function D() {
  let a: object = /123345/;
  let b: object = [];
  let c: object = null;
}

// object类型和any类型的区别
function ObjectType() {
  let a: any = 10;
  let b: object = 10;

  let c: any = {};
  c.make();
  c.name = 'lvs';
  c();

  let d: object = {};
  d.make();
  d.name = 'lvs';
  d();
}



function Assertions(value: Array<string> | string, type: string) {
  if (type === '1') {
    value = value.split(' ');
  }
  return value.map(item => item + " hello");
}


function Assertions2(value: Array<string> | string, type: string) {
  let a: object = /regExp/g;
  let lens = (a as Array<string>).length;


  if (type === '1') {
    value = (value as string).split(' ');
  }
  return (value as Array<string>).map(item => item + " hello");
}


function Assertions3(value: Array<string> | string, type: string) {
  if (type === '1') {
    value = (<string>value).split(' ');
  }
  return (<Array<string>>value).map(item => item + " hello");
}
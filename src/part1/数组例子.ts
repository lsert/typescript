// Array
import React from 'react';

// 泛型写法
const arr: Array<string> = [];

// 特殊写法
const arr1: string[] = ['you are my sunshine'];


// 错误的类型赋值
const arr2: number[] = ['my only sunshine'];

arr.push('hello');
arr.push('word');

// 不能推入其他类型的数据
arr.push(123);














// Tuple
const tuple: [string, number] = ['吕佳文', 25];


const tuple2: [string, number] = [25, '吕佳文'];


const tuple3: [string, number] = ['lvjiawen', 25, 'eat']

// Tuple必须是固定长度，固定类型的






// Enum
enum Color { Red, Green, Blue };

let c: Color = Color.Green;


// Enum赋值
// 只有一个枚举被赋值
enum Color2 { Green = 20, Red, Blue };
// 


//  非number类型赋值
enum Color3 { Red = 'hello', Green, Blue = 66 };


// 赋值为变量
let ColorEnum = 123;
enum Color4 { Red = 'hello', Green = ColorEnum, Blue = 66 };

Color4.Yellow = 'world';
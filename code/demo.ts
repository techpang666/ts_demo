
/**
 * @description 只读属性
 */

// 只在创建时候赋值 可以使用readonly定义只读属性
interface Person {
  readonly id: number
	name: string;
	age?: number;
	[propName: string]: any;
}

let demo: Person = {
  id: 666,
	name: 'tom',
  gendr: 'man'
};

demo.id = 999 /* 初始化后又赋值就报错了 */

// 只读的约束在于第一次给(对象)赋值的时候 不是第一次给只读属性赋值的时候
let demo: Person = {
	name: 'tom',
  gendr: 'man'
};

// 这里会出现两个报错
// 给tom赋值的时候 没有给id赋值
// 给tom.id赋值的时候 由于它是只读属性 就报错了
demo.id = 999

/**
 * @description 数组的类型
 */

// 类型[]表示法
let arr: number[] = [1, 8, 5, 6, 9]
// 不允许出现其他类型
let arr: number[] = [1, '8', 5, 6, 9]
// 数组的一些方法会根据数组定义时约定的类型进行限制
arr.push('8') /* 比如8是字符串 push只能传入number类型 */

/**
 * @description 数组泛型
 */

// 可以通过数组泛型来表示数组
let arr: Array<number> = [1, 8, 5, 6, 9]

/**
 * @description 接口表示数组
 */

// 只要索引类型为数字 值必须为数字
interface NumberArray {
  [index: number]: number
}

let arr: NumberArray = [1, 8, 5, 6, 9]

// 一般只有类数组才通过接口描述数组

// 类数组不是数组类型 比如arguments 它不能用普通数组的方式去描述
function sum() {
  let args: number[] = arguments
}

// 应该这样描述
function sum() {
  let args: {
    [index: number]: number
    length: number
    callee: Function
  } = arguments
}

// 简写成这样
function sum() {
  let args: IArguments = arguments
}

// 常用的类数组都有自己的接口定义 比如IArguments/NodeList/HTMLCollection
interface IArguments {
  [index: number]: number
  length: number
  callee: Function
}

/**
 * @description any在数组中的应用
 */

// 用any表示数组中允许出现的任意类型
let arr: any[] = ['name', 18, {key: 'demo'}]

/**
 * @description 函数声明
 */

// 在js中常见的定义函数方式 函数声明和函数表达式
function fn(x, y) {
  return x + y
}

let fn = function (x, y) {
  return x + y
}

// 在ts中定义函数(多或者少的参数都是不允许的)
function fn(x: number, y: number): number {
  return x + y
}

/**
 * @description 函数表达式
 */

// 常规函数表达式
let fn = function (x: number, y: number): number {
  return x + y
}

// 但是fn是通过类型推论推断出来的 如果要指定类型
let fn: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}

// 不要混淆ts和es6的=>

// ts的=>用来函数定义 左边是输入类型 需要括号起来 右边是输出类型(number)

















/**
 * @description 可选属性/任意属性/只读属性的区别
 */

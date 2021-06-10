/**
 * @description 开局一个小栗子
 */

// 在ts中通过:指定变量类型
function sayHello(person: string) {
	return person;
}
console.log(sayHello('demo'));

// 在编译没有插入检查代码 是因为只在编译时对类型进行静态检查 运行时不会对类型检查 可以这样做
function sayHello(person: string) {
	if (typeof person === 'string') {
		return person;
	} else {
		throw new Error('is not a string');
	}
}
console.log(sayHello(666));

function sayHello(person: string) {
	return person;
}
console.log(sayHello(666));
// 编译会报错 但还是会生成js文件 可以通过tsconfig.json中配置noEmitOnError终止生成js文件

/**
 * @description 布尔型
 */

// 通过boolean定义布尔型
let isDone: boolean = true;

// 使用构造函数Boolean创造的是对象 不是布尔值 所以使用boolean定义类型会报错
let createdByNewBoolean: Boolean = new Boolean(1);
// 直接调用Boolean也可以返回一个boolean类型
let createdByBoolean: boolean = Boolean(1);

// boolean是基本类型 Boolean是构造函数 除了null和undefined都一样

/**
 * @description 数值
 */

let age: number = 18;
let age: number = NaN;
let age: number = Infinity;

/**
 * @description 字符串
 */

let demo: string = 'demo';
let age: number = 18;
// 模板字符串
let templateStr: string = `my name is ${demo}, my age is ${age + 1}`;
console.log(templateStr);

/**
 * @description 空值
 */

// js中没有空值的概念 ts中可以通过void表示没有返回值的函数

function demo(): void {
	console.log(666);
}

// 声明一个void类型的变量没什么用 只能赋值null和undefined
let demo: void = undefined;

/**
 * @description null和undefined
 */

// null和undefined是所有类型的子类型 也就是undefined类型的变量可以赋值给number类型的变量

let age: number = undefined;
// 赋值操作
let age: undefined;
let num: number = age;

// 但是void类型的变量不能赋值给number类型的变量
let demo: void;
let age: number = demo;

/**
 * @description 任意值类型
 */

// 普通类型在赋值过程中改变类型是不允许的
let demo: string = 'demo';
demo = 7;

// 但如果是any就可以
let demo: any = 'demo';
demo = 7;

// 在任意值上访问任何属性都是允许的
let demo: any = 'demo';
console.log(demo.myName);
console.log(demo.myName.firstName);

// 也允许被调用任何方法
let demo: any = 'demo';
demo.setName('name');
demo.setName('name').sayHello();
demo.myName.sayHello('name');

// 声明一个变量为任意值后 对它的任何操作 返回值的类型都是任意值

// 变量在声明的时候 没有指定类型的话 会被识别为任意值类型
let demo;

/**
 * @description 类型推导
 */

// ts在没有明确指定类型的时候会推测出一个类型
let demo = 'demo';

// 如果定义的时候没有赋值 不管后面有没有赋值 都会被推断为any类型 不会被类型检查
let demo;
demo = 666;

/**
 * @description 联合类型
 */

// 取值可以多种类型的一种 通过|分隔每个类型
let demo: number | string;
demo = 666;
demo = '666';

// 当ts不确定一个联合类型的变量属于哪个类型的时候 只能访问此联合类型的所有类型的共有属性和方法
function demo(something: string | number): number {
	// length不是共有属性 所以报错
	// return something.length
	return something.toString();
}

// 联合类型的变量在赋值的时候 会类型推论一个类型
let demo: string | number;
demo = '666';
console.log(demo.length);
demo = 666;
console.log(demo.length); /* number没有length属性就报错了 */

/**
 * @description 对象类型接口
 */

// 在面对对象语言中 接口是对行为的抽象 如何行动由类去实现

// ts的接口除了对类的一部分行为进行抽象 还对(对象的形状)进行描述

// 定义个接口
interface Person {
	name: string;
	age: number;
}

// 定义个变量 类型为Person 这样就约束tom的形状和Person一致了
let demo: Person = {
	name: 'tom',
	age: 18,
};

// 定义的变量比接口多一些或者少一些属性都是不允许的

// 如果不想完全匹配一个形状 可以通过?定义可选属性 但一样不允许添加未定义的属性
interface Person {
	name: string;
	age?: number;
}

/**
 * @description 任意属性
 */

interface Person {
	name: string;
	age?: number;
	// 希望接口有一个任意属性(定义一个string类型的任意属性)
	// 一旦定义了任意属性 那么确定属性和可选属性必须是它的类型子集
	[propName: string]: any;
}

interface Person {
	name: string;
	age?: number;
	[propName: string]: string;
}

// 接口中定义了一个任意属性值为string 可选属性age的值为number
// number不是string的子属性 所以就报错了
let demo: Person = {
	name: 'tom',
	age: 18,
  gendr: 'man'
};

interface Person {
	name: string;
	age?: number;
  // 一个接口只能定义一个任意属性 如果接口中有多个类型的属性 可以在任意属性中使用联合类型
	[propName: string]: string | number;
}

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
 * @description 接口定义函数的形状
 */

interface Search {
  (source: string, subString: string): boolean
}

// 采用接口/函数表达式定义函数 对mySearch进行类型限制 可以保证对函数名赋值的时候 参数个数/类型 返回值类型不变
let mySearch: Search
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1
}
console.log(mySearch('ddd', 'd')); /* true */















/**
 * @description 可选属性/任意属性/只读属性的区别
 */

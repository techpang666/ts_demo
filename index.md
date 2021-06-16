
# 一些ts的记录

## 体验一下ts

TypeScript里的类型注解(person: string)是一种轻量级的为函数或变量添加约束的方式

```js
// 在ts中通过:指定变量类型
function sayHello(person: string) {
	return person;
}
console.log(sayHello('demo'));
```

```js
// 在编译没有插入检查代码 是因为只在编译时对类型进行静态检查 运行时不会对类型检查 可以这样做
function sayHello(person: string) {
	if (typeof person === 'string') {
		return person;
	} else {
		throw new Error('is not a string');
	}
}
console.log(sayHello(666));
```

```js
function sayHello(person: string) {
	return person;
}
console.log(sayHello(666));
// 这里编译会报错 因为传入的类型不符合 但还是会生成js文件
// 可以通过tsconfig.json中配置noEmitOnError终止生成js文件
```

## ts的数据类型

### 布尔型

```js
// 通过boolean定义布尔型
let isDone: boolean = true;
```

```js
// 使用构造函数Boolean创造的是对象 不是布尔值 所以使用boolean定义类型会报错
// let createdByNewBoolean: boolean = new Boolean(1); /* 报错 */
let createdByNewBoolean: Boolean = new Boolean(1);
```

```js
// 直接调用Boolean也可以返回一个boolean类型
let createdByBoolean: boolean = Boolean(1);
```

boolean是基本类型 Boolean是构造函数 除了null和undefined 其他数据类型都一样

### 数值

```js
let age: number = 18;
let age: number = NaN;
let age: number = Infinity;
```

### 字符串

```js
let demo: string = 'demo';
let age: number = 18;
// 模板字符串
let templateStr: string = `my name is ${demo}, my age is ${age + 1}`;
console.log(templateStr);
```

### 空值

js中没有空值的概念 ts中可以通过void表示没有返回值的函数

```js
function demo(): void {
	console.log(666);
}
```

```js
// 声明一个void类型的变量没什么用 只能赋值null和undefined
let demo: void = undefined;
```

### null和undefined

null和undefined是所有类型的子类型

也就是undefined类型的变量可以赋值给number类型的变量

```js
let age: number = undefined;

// 赋值操作
let age: undefined;
let num: number = age;
```

```js
// 但是void类型的变量不能赋值给number类型的变量
let demo: void;
let age: number = demo;
```

### 任意值类型

```js
// 普通类型在赋值过程中改变类型是不允许的
let demo: string = 'demo';
demo = 7;
```

```js
// 但如果是any就可以
let demo: any = 'demo';
demo = 7;
```

```js
// 在任意值上访问任何属性都是允许的
let demo: any = 'demo';
console.log(demo.myName);
console.log(demo.myName.firstName);
```

```js
// 也允许被调用任何方法
let demo: any = 'demo';
demo.setName('name');
demo.setName('name').sayHello();
demo.myName.sayHello('name');
```

声明一个变量为任意值后 对它的任何操作 返回值的类型都是任意值

```js
// 变量在声明的时候 没有指定类型的话 会被识别为任意值类型
let demo;
```

## 类型推导

```js
// ts在没有明确指定类型的时候会推测出一个类型
let demo = 'demo';
```

```js
// 如果定义的时候没有赋值 不管后面有没有赋值
// 都会被推断为any类型 不会被类型检查
let demo;
demo = 666;
```

## 联合类型

```js
// 取值可以多种类型的一种 通过|分隔每个类型
let demo: number | string;
demo = 666;
demo = '666';
```

```js
// 当ts不确定一个联合类型的变量属于哪个类型的时候 只能访问此联合类型的所有类型的共有属性和方法
function demo(something: string | number): number {
	// return something.length /* length不是共有属性 所以报错 */
	return something.toString();
}
```

```js
// 联合类型的变量在赋值的时候 会类型推论一个类型
let demo: string | number;

demo = '666';
console.log(demo.length);

demo = 666;
console.log(demo.length); /* number没有length属性就报错了 */
```

## 对象类型接口

在面对对象语言中 接口是对行为的抽象 如何行动由类去实现

ts的接口除了对类的一部分行为进行抽象 还对(对象的形状)进行描述

```js
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
```

定义的变量比接口多一些或者少一些属性都是不允许的

### 可选属性

```js
// 如果不想完全匹配一个形状 可以通过?定义可选属性 但一样不允许添加未定义的属性
interface Person {
	name: string;
	age?: number;
}
```

### 任意属性

```js
interface Person {
	name: string;
	age?: number;
	// 希望接口有一个任意属性(定义一个string类型的任意属性)
	// 一旦定义了任意属性 那么(确定属性和可选属性)必须是它的类型子集
	[propName: string]: any;
}
```

```js
interface Person {
	name: string;
	age?: number;
	[propName: string]: string;
}

// 接口中定义了一个任意属性值为string 可选属性age的值为number
// number不是string的子属性 所以就报错了 可以通过联合类型
let demo: Person = {
	name: 'tom',
	age: 18,
  gendr: 'man'
};
```

```js
interface Person {
	name: string;
	age?: number;
  // 一个接口只能定义一个任意属性 如果接口中有多个类型的属性 可以在任意属性中使用联合类型
	[propName: string]: string | number;
}
```

```js
interface Demo {
	// 要求对象的键是string 属性值为number
	[prop: string]: number;
}

const objTest: Demo = { a: 1 }

interface Test {
	// 可以有任意的下标 属性值为string
	[index: number]: string;
}

const arrTest: Test = ['demo']
```

### 只读属性

```js
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
```

```js
// 只读的约束在于第一次给(对象)赋值的时候 不是第一次给只读属性赋值的时候
let demo: Person = {
	// 给对象赋值的时候 没有给id赋值
	name: 'tom',
  gendr: 'man'
};

// 给tom.id赋值的时候 由于它是只读属性 就报错了
demo.id = 999
```

## 数组的类型

```js
// 类型[]表示法
let arr: number[] = [1, 8, 5, 6, 9]
// 不允许出现其他类型
let testArr: number[] = [1, '8', 5, 6, 9]
// 数组的一些方法会根据数组定义时约定的类型进行限制
arr.push('8') /* 比如8是字符串 push只能传入number类型 */
```

### 数组泛型

```js
// 可以通过数组泛型来表示数组
let arr: Array<number> = [1, 8, 5, 6, 9]
// 数组每一项为string
let strArr: Array<string> = ['1', '2']
```

### 接口表示数组

```js
// 只要索引类型为数字 值必须为数字
interface NumberArray {
  [index: number]: number
}

let arr: NumberArray = [1, 8, 5, 6, 9]
```

一般只有类数组才通过接口描述数组

### 类数组

```js
// 类数组不是数组类型 比如arguments是个类数组 它不能用普通数组的方式去描述
function sum() {
  let args: number[] = arguments
}
```

```js
// 应该这样描述
function sum() {
  let args: {
    [index: number]: number
    length: number
    callee: Function
  } = arguments
}
```

```js
// 简写成这样
function sum() {
  let args: IArguments = arguments
}
```

```js
// 常用的类数组都有自己的接口定义 比如IArguments/NodeList/HTMLCollection
interface IArguments {
  [index: number]: number
  length: number
  callee: Function
}
```

### any在数组中的应用

```js
// 用any表示数组中允许出现的任意类型
let arr: any[] = ['name', 18, {key: 'demo'}]
```

## 函数的类型

### 函数声明

```js
// 在js中常见的定义函数方式 函数声明和函数表达式

// 函数声明
function fn(x, y) {
  return x + y
}

// 函数表达式
let fn = function (x, y) {
  return x + y
}
```

```js
// 在ts中定义函数(多或者少的参数都是不允许的)

// 输出输入都是number类型
function fn(x: number, y: number): number {
  return x + y
}
```

### 函数表达式

```js
// 常规函数表达式
let fn = function (x: number, y: number): number {
  return x + y
}
```

```js
// 但是fn是通过类型推论推断出来的 如果要指定类型
let fn: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}

// 不要混淆ts和es6的=>
// ts的=>用来函数定义 左边是输入类型 需要括号起来 右边是输出类型(number)
```

### 接口定义函数的形状

```js
// 定义函数的形状
interface Search {
  (source: string, subString: string): boolean
}

// 采用接口/函数表达式定义函数 对mySearch进行类型限制 可以保证对函数名赋值的时候 参数个数/类型 返回值类型不变
let mySearch: Search = (source: string, subString: string) => {
	return source.search(subString) !== -1;
};
console.log(mySearch('ddd', 'd')); /* true */
```

### 可选参数

```js
// 通过?定义可选参数 后面不可以再带必需参数
function buildName(firstName: string, lastName?: string) {
	if (lastName) {
		return firstName + ' ' + lastName;
	} else {
		return firstName;
	}
}
let tomCat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
console.log(tomCat, tom);
```

### 参数默认值

```js
// ts会将添加默认值的参数识别为可选参数
function buildName(firstName: string, lastName: string = 'Cat') {
	return firstName + ' ' + lastName;
}
let tomCat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
console.log(tomCat, tom);
```

```js
// 这时候就不限制可选参数在后面了 但需要传值 不然影响必需参数
function buildName(firstName: string = 'Tom', lastName: string) {
	return firstName + ' ' + lastName;
}
let tomCat = buildName('Tom', 'Cat');
let tom = buildName(undefined, 'Cat');
console.log(tomCat, tom);
```

### 剩余参数

```js
// 传入一个数组 打包剩余参数
function push(arr, ...items) {
	// 遍历push到空数组中
	items.forEach((item) => {
		arr.push(item)
	})
}

// 定义一个可以任意类型的空数组
let arrTest: any[] = []
push(arrTest, 1, 2, 3)
```

```js
// items是个数组 可以通过数组类型定义
function push(arr: any[], ...items: any[]) {
	items.forEach((item) => {
		arr.push(item)
	})
}

let arrTest = []
push(arrTest, 1, 2, 3)
```

### 重载

允许一个函数接受不同的参数 作出不同的处理

```js
// 通过重载定义多个reverse函数类型 最后个定义才是函数实现
// 如果多个函数有包含关系 需要把精确的定义放在前面
// 输入为数字 输出也应该为数字
function reverse(params: number): number;
function reverse(params: string): string;

function reverse(params: number | string): number | string | void {
	if (typeof params === 'number') {
		return Number(params.toString().split('').reverse().join(''));
	} else if (typeof params === 'string') {
		return params.split('').reverse().join('');
	}
}

console.log(reverse(123), reverse('demo'));
```

## 类型断言

手动指定一个值的类型

值 as 类型

### 将一个联合类型断言为其中一个类型

```js
interface Cat {
	name: string
	run(): void
}

interface Fish {
	name: string
	swim(): void
}

// 不确定联合类型变量是哪个类型的时候 只能访问共有的属性和方法
function getName(animal: Cat | Fish) {
	return animal.name
}
```

```js
// Cat接口没有swim()方法 就给报错了
function isFish(animal: Cat | Fish) {
	if (typeof animal.swim === 'function') {
		return true
	}
	return false
}
```

```js
// 可以通过类型断言 手动指定一个值的类型 就能解决报错问题
function isFish(animal: Cat | Fish) {
	if (typeof (animal as Fish).swim === 'function') {
		return true
	}
	return false
}
```

滥用类型断言会导致运行时报错

要避免断言后调用方法或者引用深层属性的时候 可以减少不必要的运行时错误

```js
interface Cat {
	name: string;
	run(): void;
}

interface Fish {
	name: string;
	swim(): void;
}

// 这里会屏蔽掉animal可能为Cat的情况 所以调用swim()没有出错
function swim(animal: Cat | Fish) {
	(animal as Fish).swim()
}

const tom: Cat = {
	name: 'tom',
	run() {
		console.log(666);
	}
}

// 但是传入的是Cat类型的变量 Cat类型没有swim()方法 就运行时出错了
swim(tom)
```

### 将一个父类断言为更加具体的子类

```js
// 继承父类 就能让函数接收Error或者子类作为参数了
class ApiError extends Error {
	code: number = 0;
}

class HttpError extends Error {
	statusCode: number = 200;
}

// 由于Error父类没有code这个属性 需要断言一下指向ApiError
function isApiError(error: Error) {
	if (typeof (error as ApiError).code === 'number') {
		return true;
	}
	return false;
}
```

```js
// 如果是类的话 可以通过更好的instanceof方式进行判断 error是不是它的实例
// 但有的时候 只是我们定义的一个接口interface(接口是个类型 不是值 无法通过instanceof进行判断)
class ApiError extends Error {
	code: number = 0;
}

class HttpError extends Error {
	statusCode: number = 200;
}

function isApiError(error: Error) {
	if (error instanceof ApiError) {
		return true;
	}
	return false;
}
```

### 将任何一个类型断言为any

```js
// 引用此类型不存在的属性和方法 会报错
const num: number = 1
num.length = 1
```

```js
// 给window添加一个num属性 在ts编译的时候会报错
window.num = 1

// 我们可以给window断言为any类型就可以了 在any类型的变量上 访问任何属性都是允许的
(window as any).num = 1
```

给变量断言为any是解决ts类型问题最后一个手段

这会掩盖真正的类型错误 不是确定的情况下 不要使用`as any`

不要滥用`as any` 也不要否定他的作用 在类型的严格性和开发的便利中掌握平衡

### 将any断言为一个具体的类型

```js
// 历史遗留代码 返回值是any
function getCacheData(key: string): any {
	return (window as any).cache[key];
}

interface Cat {
	name: string;
	run(): void;
}

// 我们可以断言为Cat类型 这样就明确tom的类型 对它访问也就有了代码提示 提高代码的可维护性
const tom = getCacheData('tom') as Cat;
tom.run();
```

## 类型断言的限制

1. 联合类型可以被断言为其中的一种类型
2. 父类可以被断言为子类
3. 任何类型都可以被断言为any
4. any可以被断言为任何类型

并不是任何类型都可以断言为另一种类型的

如果相互兼容的话 可以相互断言

类型之间的对比只会比较它们最终的结构 会忽略掉它们定义时的关系

```js
interface Animal {
	name: string;
}

interface Cat {
	name: string;
	run(): void;
}

let tom: Cat = {
	name: 'tom',
	run: () => {
		console.log(666);
	},
};

// Cat类型包含了Animal类型的所有属性
let animal: Animal = tom;
```

```js
interface Animal {
	name: string;
}

// 继承Animal父类就可以了
interface Cat extends Animal {
	run(): void;
}

let tom: Cat = {
	name: 'tom',
	run: () => {
		console.log(666);
	},
};
```

这就像是面向对象编程中 我们可以将子类实例赋值给父类的变量了

ts专业的说法就是 Animal兼容了Cat

```js
interface Animal {
	name: string;
}

interface Cat {
	name: string;
	run(): void;
}

// 相互进行兼容
function testAnimal(animal: Animal) {
	// 这里是因为父类可以被断言为子类
	return animal as Cat;
}

// 这里因为子类已经继承了父类的属性和方法 断言为父类就不会有任何问题
function testCat(cat: Cat) {
	return cat as Animal;
}
```

- 子类可以断言为父类
- 父类可以断言为子类
- 想要相互断言 只要相互兼容即可

## 双重断言

如果使用了双重断言 可以打破「想要相互断言 只要相互兼容即可」的限制 可以将任何类型断言为另一个类型

```js
// 如果是这种双重断言 十有八九都是错的 因为会导致运行时错误
return cat as any as Fish
```

**迫不得已的情况下 不要用双重断言**

## 类型断言vs类型转换

类型断言只会影响ts编译时的类型 编译结果中会被删除

类型断言不是类型转换 不会真正影响到变量的类型

需要类型转换 可以直接调用类型转换的方法

```js
function toBoolean(something: any): boolean {
	// return something as boolean;
  return Boolean(something)
}

toBoolean(1); /* 1 */
toBoolean(1); /* true */
```

## 类

```js
// ts的类只是一个语法糖(本质还是js函数的实现fn()())
class User {
	// 定义一些字段(接口需要的字段)
	fullName: string;
	firstName: string;
	lastName: string;
	// 构造方法constructor是一种用于创建和初始化class创建的对象的特殊方法 一个类中只能有一个
	// 在一个构造方法中可以使用super关键字来调用一个父类的构造方法
	constructor(firstName: string, lastName: string) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.fullName = firstName + ' ' + lastName;
	}
}

// 定义个接口
interface Person {
	firstName: string;
	lastName: string;
}

// 传入Person类型的参数
function getName(person: Person) {
	return person.firstName + ' ' + person.lastName;
}

// 构造一个user
let user = new User('tom', 'cat');
console.log(getName(user));
```





















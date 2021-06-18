function getObj(obj) {
    console.log(obj);
    return {
        name: 'demo',
        age: 18
    };
}
// console.log(getObj({ name: 'test', age: '27' }));
console.log(getObj(new Number(111)));

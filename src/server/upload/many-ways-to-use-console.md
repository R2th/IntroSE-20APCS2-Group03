A wide range of methods are provided for the Console object

```
console.log(console);
```
↓
```
console {debug: ƒ, error: ƒ, info: ƒ, log: ƒ, warn: ƒ, …}
memory: (...)
debug: ƒ debug()
error: ƒ error()
info: ƒ info()
log: ƒ log()
warn: ƒ warn()
dir: ƒ dir()
dirxml: ƒ dirxml()
table: ƒ table()
trace: ƒ trace()
group: ƒ group()
groupCollapsed: ƒ groupCollapsed()
groupEnd: ƒ groupEnd()
clear: ƒ clear()
count: ƒ count()
countReset: ƒ countReset()
assert: ƒ assert()
profile: ƒ profile()
profileEnd: ƒ profileEnd()
time: ƒ time()
timeLog: ƒ timeLog()
timeEnd: ƒ timeEnd()
timeStamp: ƒ timeStamp()
context: ƒ context()
Symbol(Symbol.toStringTag): "Object"
get memory: ƒ ()
set memory: ƒ ()
__proto__: Object
```
Even we have these amount of methods, I still feel that something is lurking in the shadows besides the `log()`.

So this time I will reveal some hidden methods

# Objective:
To have a better understanding about how to use methods of `console`

# Assert
If the value of the first argument is false, output is error.
```
const method = (num) => {
    console.assert(num > 0 , num + ' is NG.');
}

method(1);
method(0);
method(-1);
```
![](https://images.viblo.asia/ed60a1a2-9d13-43cc-bf63-b4c8283291ad.png)

# clear()
Clear the console

```
console.log('hoge');
console.log('hoge');
console.clear();
console.log('fuga');
console.log('fuga');
```
![](https://images.viblo.asia/d7b6dfce-c64f-4d8a-9285-542877f30e13.png)

# count()
Output is how many time the function is called
```
const method = () => {
    console.count('counter');
}

method();
method();
method();
```
![](https://images.viblo.asia/c63ca5f0-551f-4b8e-a71a-09b7206325b7.png)

# error()
An error is output
```
console.error('error');
```
![](https://images.viblo.asia/30a1b871-213c-4869-9d67-4a5982aaf5a9.png)

# group() / groupEnd()
Start with an indent, closes with an indent
```
console.group('Indent1');
console.log('hoge');
console.log('hoge');
console.group('Indent2');
console.log('fuga');
console.log('fuga');
console.groupEnd();
console.log('hoge');
console.log('hoge');
console.groupEnd();
```
![](https://images.viblo.asia/2c7b8464-b848-47af-8561-9afc9f98d7d7.png)

# table()
The log is output in a table form:
```
const ary = [100,200,300,400];
const obj = {
    'a':100 ,
    "b":200 ,
    "c":300 ,
    'd':400
};
console.table(ary);
console.table(obj);
```
![](https://images.viblo.asia/3a4ba8e0-f123-4784-b16e-5d54129a06d0.png)

# warn()
Output a warning
```
console.warn('warn');
```
![](https://images.viblo.asia/b0289edd-d722-48ad-9493-249e0281ee9a.png)

# Conclusion
What do you think?

You can see that the Console object is not just for outputting logs.
Something like `table()` or `group()` seems to be more convenient than `log()` depending on how you use it.

We hope you find it helpful to master the console
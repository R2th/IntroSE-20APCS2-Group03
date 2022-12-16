- `Không ai hiểu tôi cả, có phải tôi là javascript?`
- Javascript khó hiểu, Là một web developer thì dù bạn có thích hay không cũng phải làm việc với nó.
- Mình chia sẽ sáu bài test, là một số trường hợp magic của javascript mà mình đã gặp khi thực chiến.
- Đề bài chung là `cái gì được in ra console?`. 
- Giành 15 phút, mở console và thực hành ngay nhé.

## Bài 1. parseInt
```javascript
const a = parseInt('0.000005');
const b = parseInt('0.0000005');
const c = parseInt(0.000005);
const d = parseInt(0.0000005);
console.log(a, b, c, d);
```
- Bật mí kết quả là d=5 nhé mọi người. Mà vì sao d = 5?
## Bài 2. Math.max

```javascript
const a = Math.max([]);
const b = Math.max();
const c = a === b

console.log(a, b, c);
```

## Bài 3. RegExp

```javascript
const reg = new RegExp('true', 'g')
console.log(reg.test('true'))
['true', 'true', 'true', 'true'].forEach(str=> console.log(reg.test(str)));
```
- Bật mí là cái array khi forr sẽ log lúc là `true` lúc lại là `false` 😅

## Bài 4. Array.map và parseInt

```javascript
const a = parseInt('10');
const arrayA = ['10','10','10','10','10'].map(parseInt);
console.log({ a: a, arrayA: arrayA });

```


## Bài 5. Variable scope
```javascript
var a = 1; 
function bar() { 
    if (!a) { 
        var a = 10; 
    } 
    console.log(a); 
} 
bar();
```
- Cái nào kết qủa a = 10 ?
## Bài 6. toString() method
```javascript
function tryCatch(fn) {
    try {
        console.log(fn())
    } catch (err) {
        console.log(err.message)
    }
}
tryCatch(() => 2..toString());
tryCatch(() => 2 .toString());
tryCatch(() => 2        .toString());
tryCatch(() => (2).toString());
tryCatch(() => [2].toString());
tryCatch(() => 2.toString());
```
- Chạy được hết chỉ có `2.toString()` là bị `Error`?

Đáp án và lý giải chi tiết mình sẽ cập nhật vào tuần sau. Các bạn folow mình để có thể nhận thông báo.
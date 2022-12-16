Dạo này mình tập tành học Javascript, thấy có 2 cách khai báo biến khác nhau nên đã tìm tòi sự khác biệt. Nay xin đăng lên đây để mọi người đọc xong hy vọng phân biệt được giữa `let` và `var`, và sau đó là khai báo hằng bằng `const`. 
## Block Scope
Nếu bạn viết quen viết Python như mình thì có lẽ bạn sẽ quen với cách hoạt động của `var` hơn. Các biến được khai báo với `var` không có scope trong một block (ví dụ như vòng lặp `for` hoặc `if..else`), mà chỉ có scope trong `function` hoặc `global`. 
### var
Ví dụ: 
```js
if (true) {
    var noBlockScope = true;
}
console.log(noBlockScope)
=> true
```

Còn với `function`
```js
function foo_a() {
    var functionScope = true;
}
foo_a()
console.log(functionScope)
=> Uncaught ReferenceError: functionScope is not defined
```

### let
Nếu bạn khai báo biến với `let`, biến đó sẽ chỉ tồn tại trong phạm vi block đó. 

Ví dụ:
```js
if (true) {
    let functionScope = true;
}
console.log(functionScope)
=> Uncaught ReferenceError: functionScope is not defined
```

Lý do là vì biến functionScope của bạn ở đây đã được khai báo với `let`, và do đó chỉ tồn tại trong block mà nó được khai báo (ở đây là trong block `if..else`.

## Redeclaration
Đương nhiên là đã là biến thì phải khai báo lại được. Tuy nhiên, `let` và `var` vẫn có một vài sự khác nhau.
### let
Với `let`,  một khi đã khai báo biến, bạn có thể gán lại biến đó nhưng không thể khai báo lại.
```js
let foo = 1; let foo = 2;
```
sẽ trả về 
Uncaught SyntaxError: Identifier 'foo' has already been declared

### var
Còn với `var`, bạn có thể khai báo lại biến.

```js
var bar = 1; var bar = 2;
```

## Declaration
Bạn có thể khai báo các biến bằng `var` sau khi đã gọi chúng.

Ví dụ:

```js
function fncc() {
    txt = "ABC";
    console.log(txt);
    var txt;
}
fncc()
=> "ABC"
```

Lý do cho việc này là vì các biến khai báo với `var` được xử lý lúc hàm bắt đầu chạy, bất kể bạn viết đoạn khai báo đó ở đâu.

Còn nếu bạn khai báo hàm trên và dùng `let`:

```js
function fnc() {
    txt = "ABC";
    console.log(txt);
    let txt;
}
fnc()
=> Uncaught ReferenceError: Cannot access 'txt' before initialization
```

## const
Nếu bạn sử dụng ReactJS hoặc ES6, sẽ thấy `const` được dùng rất nhiều. `const` được dùng để tạo ra hằng số, bạn không thể khai báo hay gán lại hằng số này. Lưu ý là giống như `let`, các hằng số được khai báo bằng `const` cũng chỉ sống trong block scope của nó. 

* Lưu ý: `const` chỉ ngăn không cho bạn gán lại đối tượng đó, chứ không ngăn việc bạn thay đổi (mutate) nó. Ví dụ: 
```js
const arr = [1, 2, 3, 4]
arr[0] = 5
console.log(arr)
=> [5, 2, 3, 4]
```

## Khi nào dùng `let`, `const` vs `var` ?

Nếu bạn đến từ các ngôn ngữ khác, ắt hẳn sẽ nghĩ rằng hầu hết thời gian thì nên dùng `let`,  khi nào cấm khai báo lại thì dùng `const` và để `var` vào quá khứ. Tuy nhiên, chính chủ đề này cũng gây ra rất nhiều tranh cãi, nhiều người lại nghĩ là nên dùng `const` càng nhiều càng tốt, đến mức mà `prefer-const` được làm thành một quy tắc của ESlint. 
Các lý do được liệt kê để dùng `const` như sau:
- Nhất quán phương pháp
- Ở các hàm dài, việc gán đi gán lại các biến có thể sinh ra bug
- Dẫn dắt người mới học về mutation trong javascript
- Giữ cho các phần gán biến có ý nghĩa
- Tốc độ chạy


Các lý do được liệt kê để không dùng `const` như sau:
- Mất ý nghĩa của hằng số (chỗ nào cũng là hằng thì không biết hằng số sẽ mất đặc tính)
- Hiểu nhầm việc gán biến và khai báo biến
- Ở các hàm dài, việc gán đi gán lại các biến chưa chắc đã sinh ra bug

Kết luận được đưa ra ở đây là bạn hãy dùng cách nào phù hợp với phong cách của bạn và nhất quán với convention của nhóm. 

Mình xin kết thúc bài viết tại đây. Bạn có thể tham khảo thêm về Javascript tại [đây](https://javascript.info/var) và [đây](https://overreacted.io/on-let-vs-const/).
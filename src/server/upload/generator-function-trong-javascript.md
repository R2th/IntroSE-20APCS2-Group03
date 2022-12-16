Xin chào tất cả mọi người hôm nay mình sẽ giới thiệu Generator function trong javascript và nó được sử dụng rất nhiều trong redux-saga một thư viện kết hợp mạnh mẽ với reactjs, mong mọi người theo dõi

### 1) Generator function là gì

- Generator là một tính năng mới của ngôn ngữ JavaScript giới thiệu từ phiên bản ES6. Generator đóng vai trò cơ bản để xây dựng các phương thức xử lý bất đồng bộ khác (side effect), ví dụ: async/await, sagas.
- Generator function là một function, có khả năng tạm ngưng thực thi trước khi hàm kết thúc, và có thể tiếp tục chạy ở 1 thời điểm khác.
- Generator function có ký tự **"*"** được đặt sau từ khoá function để phân biệt giữa function thông thường và generator function

**Cú pháp**

```js
function* functionName([param[, param[, ... param]]]) {
     statements
}
```

Trong đó
 - functionName: là tên của hàm
 - param: là tham số đầu vào
 - statements: là phần code mà ta muốn xử lý


Khi chúng ta gọi Generator function : ” functionName() ” , nó không trả về các kiểu dữ liệu cơ bản mà đẩy về một iterator object . Hàm next() của iterator object được sử dụng để truy xuất dến các node dữ liệu, sau mỗi bước resume lại generator function. Khi đó generator function sẽ thực thi hàm cho đến khi gặp từ khóa yield , hoặc return kế tiếp chưa được duyệt ở bước trước

Nói cách khác hàm sẽ không được thực thi ngay sau khi gọi, mà thay vào đó generator function trả về iterator, giống như con trỏ trong vòng lặp. Sau khi hàm next() của iterator được gọi, generator function sẽ thực thi hàm cho đến khi gặp từ khóa yield đầu tiên. yield sẽ trả về giá trị cho iterator, generator function kết thúc cho đến khi hết giá trị để yield.

Sơ lược về iterator: Iterator là một bộ duyệt dùng để duyệt qua một mảng, một danh sách hoặc một collection mà qua mỗi lần duyệt sẽ ghi lại vị trí đã duyệt để từ đó có thể biết và lấy vị trí tiếp theo. Trong Javascript thì iterators có cung cấp phương thức next() và phương thức này sẽ return về phần tử kế tiếp, đồng thời ghi nhận luôn phần tử đã lặp là phần tử next(). Phương thức next() sẽ return về một Object gồm hai thuộc tính là value và done. done có giá trị true nếu Iteration đã hoàn thành, ngược lại nó có giá trị false.

Lý thuyết hơi dài chút sau đây thì mình sẽ đi vào ví dụ để hiểu hơn nhé

**Ví dụ 1**

```js
function* generateId() {
  yield 1;

  console.log('continue to run ...');
  yield 2;
  console.log('resume');
  return 3;
}

const newId  = generateId();

console.log(newId.next()); // {value:1, done:false}
console.log(newId.next()); // {value:2, done:false}
console.log(newId.next()); // {value:3, done:true}
```

Kết quả:

![](https://images.viblo.asia/04e31f07-9daa-40fc-b097-8695361ffe2a.png)

Ở ví dụ trên mỗi lần mình gọi **newId.next()** thì sẽ trả về một object có đạng là `{value: any, done: boolean}` trong đó:

- value:  kết quả của việc thực thi biểu thức [expression] sau lệnh yield
- done: nhận giá trị false nếu quá trình generator chưa hoàn thành, ngược lại sẽ trả về true.

Một số phương thức của generator:

- next(): Tiếp tục thực thi hàm cho đến khi gặp yield or return sẽ trả về một object có dạng `{value: any, done: true/false}`
- return(): Dừng generator function và return kết quả có dạng `{value: any, done: true}`
- throw(): quăng 1 lỗi vào trong generator function (đồng thời kết thúc generator, trừ khi được bắt lại trong generator đó). return object {value: any, done: true/false}

**Ví dụ 2 sử dụng return ()**

```js
function* generateId() {
  yield 1;

  yield 2;

  yield 3;
}

const newId  = generateId();


console.log(newId.next());
console.log(newId.next());
console.log(newId.return('ahihi'));
```

Kết quả:

![](https://images.viblo.asia/9efb0226-540a-432e-b7d1-fe4ee1d569d7.png)

Ở ví dụ trên thì mình có gọi 2 lần next() sau đó gọi đến return() thì hàm sẽ bị dừng lại không thực thi phía dưới nữa. ở trong return() mình có truyền vào giá trị là `ahihi` vậy nên kết quả nhận được sẽ là `{value: 'ahihi', done:true}` giả sử nếu mình không truyền giá trị nào vào thì kết quả sẽ nhận được là `{value: 'undefined', done:true}`

**Ví dụ 3 sử dụng throw()**

```js
function* gen() {
  while (true) {
    try {
      yield 42
    } catch (e) {
      console.log(e.message)
      return;
    }
  }
}

const g = gen()
console.log(g.next()) // { value: 42, done: false }
console.log(g.throw(new Error('Something went wrong')))

```

Kết quả:

![](https://images.viblo.asia/ff99a17b-9816-4254-a520-ef50ffc95378.png)



Ở ví dụ trên khi gọi tới throw() thì một lỗi sẽ được trả ra và generator function sẽ dừng lại và không thực thi nữa

Hai ví dụ trên mình đều có truyền tham số vào cho return() và throw() còn next() thì mình chưa truyền vậy truyền tham số vào cho next() thì sẽ thế nào nhỉ? vậy mình cùng xem ví dụ sau nhé

**Ví dụ truyền tham số cho next()**

Hàm next có param truyền vào nó (next(param)) thì param chính là giá trị thay thế của yield đang bị dừng lại trước đó trong hàm generator

Do đó, hàm next đầu tiên dù có truyền param vào cũng bị bỏ qua bởi vì đối với hàm next đầu tiên, vẫn chưa có yield nào đang bị dừng lại. Nghĩa là đối với lời gọi next đầu tiên thì next() = next(undefined) = next(null) = next(true) = next(100) = next("any string") = next([]) = next({key: "value"})

```js
function* testGen() {
  const i = 5 * (yield 100);
  console.log("Gia tri cua i = ", i);
  const j = yield (2 * i) / 4;
  console.log("Gia tri cua j", j);
  const k = i + (yield j);
  console.log("Gia tri cua k", k);
}

const gen = testGen();
console.log(gen.next());
console.log(gen.next(20));
console.log(gen.next(10));
console.log(gen.next());
```

Kết quả:

![](https://images.viblo.asia/0cdf08e6-63d9-4aa1-a68e-7705f12f69a3.png)


Ở ví dụ trên

- Lần gọi next() đầu tiên thì kết quả nhận được là `value: 100` và dừng lại ở trước `yield 100`
- Lần gọi tiếp theo next(20) thì lần này giá trị truyền vào là **20** sẽ thay thế cho **`yield 100`** nghĩa là `const i = 5 * (yield 100)` sẽ trở thành `const i = 5 * 20` và i lúc này sẽ có giá trị là `i = 5 * 20 = 100`. Giá trị trả về của next(20) là `(2*100)/4 = 50` và dừng lại trước` yield (2*i)/4`
- Lời gọi tiếp theo next(10) thì giá thị 10 sẽ thay thế cho `const j = yield (2*i)/4` lúc này giá trị trả về cho next(10) là 10 và dự lại trước`yield j`

- Lần gọi tiếp theo next() mình không có truyền tham số nào vào nên giái trị lúc này ở `yield j` sẽ là `undefined` và khi `i = 100` và cộng với `undefined` thì kết quả của k là `NaN` vậy mọi người chú ý (khi sử dụng phép gán yield cho một biến hay hằng số nào đó trong hàm generator thì phải truyền param vào hàm next (không áp dụng cho next đầu tiên), nếu không biến đó sẽ có giá trị là undefined)

**kết luận**

- Generator là một trong những phương thức hiệu quả để làm việc với dữ liệu collection, đồng thời là cơ sở để xử lý các yêu cầu bất đồng bộ (được ứng dụng trong redux-saga) nếu bạn muốn biết nó được ứng dụng như nào thì có thể tham khảo bài viết  [này nhé](https://viblo.asia/p/co-ban-ve-redux-saga-gDVK22x2KLj)

- Bằng việc sử dụng Generator, lập trình viên có thể phát triển các đoạn mã xử lý yêu cầu bất động bộ một cách đơn giản và rõ ràng hơn. Các câu lệnh yield trong Generator có thể trả về các Promise từ những yêu cầu bất đồng bộ
- Cấu trúc async/await dựa trên Generator để đơn giản hoá cách xử lý kết quả resolve trả về từ mỗi Promise
- Trên đây là một số kiến thức mình tìm hiểu được về generator function cám ơn mọi người đã theo dõi

**Nguồn tham khảo**

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
- https://blog.daovanhung.com/post/generator-function-trong-javascript
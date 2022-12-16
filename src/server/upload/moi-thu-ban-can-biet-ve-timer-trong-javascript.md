Bài viết đc dịch và chỉnh sửa lại từ: https://medium.freecodecamp.org/javascript-timers-everything-you-need-to-know-5f31eaa37162

Rất nhiều người lầm tưởng rằng các timer function trong javascript như setTimeout hay setInterval là một phần của ECMAScript hoặc chúng đc implement bởi các javascript engine. Trên thực tế, chúng đc implement bởi browser, và tùy theo từng browser mà chúng đc viết theo cách khác nhau. Trong môi trường NodejS thì chúng đc implement bởi chính Nodejs runtime.

Trong browser, các timer function là một phần của interface Window. Interface này làm cho tất cả các element của nó tồn tại ở dạng global, có thể dùng ở mọi nơi trong scope của javascript. Chính vì thế, bạn có thể chạy hàm setTimeout trực tiếp ngay trong console của browser.

Trong Nodejs, các timer function là một phần của biến global ( hoạt động tương tự như interface Window ở browser). Bạn có thể xem source code của các timer function trong Node [ở đây](https://github.com/nodejs/node/blob/master/lib/timers.js)

Giờ chúng ta sẽ làm thử vài ví dụ và thử thách về các timer function.

### Ví dụ 1: Delay function thực thi

Các timer function là những higher-order function có thể dùng để delay hoặc lặp lại thực thi của các hàm con.
Ví dụ về delay:

```js
setTimeout(
  () => {
    console.log('Hello after 4 seconds');
  },
  4 * 1000
);
```

Ở ví dụ này, chúng ta dùng setTimeout để delay việc in ra lời chào sau 4 giây. Tham số thứ nhất của setTimeout là function mà bạn muốn delay, tham số thứ hai là số thời gian bạn muốn delay ( đơn vị mini giây).

Nếu bạn chạy đoạn code trên bằng node command hoặc bằng console của browser, bạn sẽ thấy dòng chữ đc in ra sau 4 giây.

### Ví dụ 2: Truyền tham số

Nếu cái function mà bạn muốn delay thực thi có nhận thêm bất kì tham số nào, chúng ta sẽ truyền tham số đấy cho setTimeout (sau 2 tham số đã nói ở trên)

```js
const rocks = who => {
  console.log(who + ' rocks');
};
setTimeout(rocks, 2 * 1000, 'Node.js');
```

Nếu bạn chạy đoạn code trên, bạn sẽ thấy dòng chữ 'Node.js rocks' đc in ra sau 2 giây.

### Thử thách 1

In ra 2 dòng chữ sau sau một khoảng thời gian delay:
* In ra 'Hello after 4 seconds' sau 4 giây
* In ra 'Hello after 4 seconds' sau 8 giây

**Điều kiện:**
Bạn chỉ đc phép định nghĩa một function duy nhất, nghĩa là tất cả các lần gọi setTimeout chỉ đc dùng đúng function đấy thôi.

**Lời giải**

```js
const theOneFunc = delay => {
  console.log('Hello after ' + delay + ' seconds');
};
setTimeout(theOneFunc, 4 * 1000, 4);
setTimeout(theOneFunc, 8 * 1000, 8);
```

### Ví dụ 3: Lặp lại thực thi của một function

Nếu chúng ta muốn cứ mỗi 4 giây lại in ra một dòng chữ thì sao? Chúng ta có thể dùng setInterval để đạt đc điều này.

```js
setInterval(
  () => console.log('Hello every 3 seconds'),
  3000
);
```

Nếu bạn chạy đoạn code trên, bạn sẽ thấy dòng chữ 'Hello every 3 seconds' đc in ra sau mỗi 3 giây.

### Ví dụ 4: Hủy timer

Bạn có thể hủy một timer function trc' khi nó chạy (đối với setTimeout) hoặc trong khi đang chạy ( đối với setInterval).
Khi bạn gọi setTimeout, nó sẽ trả về một ID, bạn có thể dùng clearTimeout với tham số là ID đó để hủy setTimeout trc' đó.

```js
const timerId = setTimeout(
  () => console.log('You will not see this one!'),
  0
);
clearTimeout(timerId);
```

Bạn sẽ ko thấy dòng chữ 'You will not see this one!' đc in ra.
Có thể bạn thắc mắc, nếu setTimeout với delay là 0 thì nó sẽ phải đc in ra ngay lập tức, trc' cả khi chạy clearTimeout chứ? Thực tế, setTimeout là một hàm async, và nó sẽ chỉ chạy khi mà call stack đã trống rỗng, bạn có thể xem thêm [ở đây](https://www.youtube.com/watch?v=8aGhZQkoFbQ&vl=en)

### Thử thách 2

In ra dòng chữ 'Hello world' mỗi giây, nhưng chỉ 5 lần. Sau 5 lần, in ra dòng chữ 'Done'.

**Điều kiện:** Bạn ko đc dùng setTimeout.

**Lời giải:**

```js
let counter = 0;
const intervalId = setInterval(() => {
  console.log('Hello World');
  counter += 1;
if (counter === 5) {
    console.log('Done');
    clearInterval(intervalId);
  }
}, 1000);
```

### Chính xác thì "thứ gì" gọi (call) các function đc delay?

Nếu bạn dùng keyword this trong một function bình thường như sau:

```js
function whoCalledMe() {
  console.log('Caller is', this);
}
```

Giá trị của this chính ra là thứ đã gọi function này (caller). Nếu bạn định nghĩa hàm trên ở REPL của Node, caller sẽ là biến global. Nếu bạn định nghĩa nó ở console của browser, caller sẽ là window.

Giờ thử định nghĩa function này trong một object xem sao:

```js
const obj = { 
  id: '42',
  whoCalledMe() {
    console.log('Caller is', this);
  }
};
// The function reference is now: obj.whoCallMe
```

Giờ nếu bạn gọi obj.whoCallMe, caller sẽ là chính object obj đó.

![](https://images.viblo.asia/35edcfe4-ace2-46cf-b5c7-15e6f18f6b2c.png)

Vậy nếu chúng ta truyền reference của obj.whoCallme cho setTimeout, thì caller của nó sẽ là ai?

```js
setTimeout(obj.whoCalledMe, 0);
```

Câu trả lời là nó phụ thuộc vào việc hàm setTimeout đc gọi ở đâu. Bạn ko thể phụ thuộc vào ai là caller trong trường hợp này. Nếu bạn test nó trong REPL của Node, bạn sẽ nhận đc caller là Timeout object.

![](https://images.viblo.asia/1a634c24-446d-49c5-8f15-28986cd90664.png)

Lưu ý là bạn chỉ quan tâm đến this ở function bình thường, đối với arrow function, bạn ko cần quan tâm nó làm gì.

### Thử thách 3

In ra dòng chữ 'Hello world' sau khoảng delay ko cố định. Bắt đầu sau delay 1 giây, sau đó mỗi lần tăng thời gian delay thêm 1 giây. Lần thứ 2 sẽ delay 2 giây, lần 3 delay 3s...

**Điều kiện:** Bạn chỉ đc phép dùng const, ko đc dùng let hoặc var

**Lời giải:**
Vì thời gian delay ko cố định, ta ko thể dùng setInterval đc. Do đó ta sẽ tạo một hàm gọi đến setTimeout rồi đệ quy nó.

```js
const greeting = delay =>
  setTimeout(() => {
    console.log('Hello World. ' + delay);
    greeting(delay + 1);
  }, delay * 1000);
greeting(1);
```

Hy vọng bài viết sẽ giúp các bạn hiểu hơn về các hàm timer trong javascript, thanks for reading.
Một trong những điều khó khăn khi học Javascript là `promises`. Chúng không dễ hiểu và có thể cần một vài hướng dẫn và một thời gian kha khá để vận dụng chúng.
Hôm nay chúng ta sẽ chuẩn bị cho `coding interview` và hiểu rõ chúng qua những đoạn `code` sau.
Thử xử lý câu hỏi trước, sau đó chúng ta sẽ xem câu trả lời.
***
### 1. Kết quả trả về ?

```javascript
const firstPromise = new Promise((res, rej) => {
      setTimeout(res, 500, 'one');
});

const secondPromise = new Promise((res, rej) => {
      setTimeout(res, 100, 'two');
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));
```

* A: "one"
* B: "two"
* C: `"two"` `"one"`
* D: `"one"` `"two"`

#### Giải thích
- Khi chúng ta thực hiện nhiều `promises` với phương thức `Promise.race`, nó sẽ trả về resolves/rejects `promise` hoàn thành sớm nhất. Với `firstPromise` mất 500ms để trả về và `secondPromise` cần 100ms. Cho nên `secondPromise` sẽ được `resolve` trước với giá trị log ra `"two"`. Vậy nên câu trả lời đúng là **B**

###  2. Đoạn code sẽ in ra cái gì ?
```javascript
async function getData() {
      return await Promise.resolve('I made it!');
}

const data = getData();
console.log(data);
```

* A: `"I made it!"`
* B: `Promise {<resolved>: "I made it!"}`
* C: `Promise {<pending>}`
* D: `undefined`

#### Giải thích

- Một async function luôn trả về một `promise`. `await` sẽ giữ đợi cho đến khi promise hoàn thành.  `promise` đó sẽ pending khi nó đang thực hiện `getData()` cho đến khi `resolve/reject`.
- Vì vậy nếu chúng ta muốn get giá trị data `"I made it!"`, chúng ta có thể sử dụng phương thức `.then()`:

```javascript
data.then(res => console.log(res))
```
Với code trên sẽ không log ra `"I made it!"`. Câu trả lời là **C**

### 3. Giá trị output là gì ?
```javascript
const myPromise = () => Promise.resolve('I have resolved!');

function firstFunction() {
    myPromise().then(res => console.log(res));
    console.log('second');
}

async function secondFunction() {
    console.log(await myPromise());
    console.log('second');
}

firstFunction();
secondFunction();
```
* A: `I have resolved!`, `second` và `I have resolved!`, `second`
* B: `second`, `I have resolved!` và `second`, `I have resolved!`
* C: `I have resolved!`, `second` và `second`, `I have resolved!`
* D: `second`, `I have resolved!` và `I have resolved!`, `second`

#### Giải thích
- Với một promise và function thông thường chúng ta sẽ cơ bản hiểu rằng *Tôi muốn thực thi function này, nhưng tôi sẽ tạm gác chúng sang một bên trong khi nó đang chạy vì điều này có thể mất thời gian. Chỉ khi một giá trị được `resolve` (hoặc `reject`) hoặc `callstack` đã trống thì tôi mới sử dụng chúng*

- Chúng ta có thể get được data với cả `.then` và `await` trong một `async function` như ở `firstFunction` và `secondFunction`. Tuy nhiên chúng sẽ có sự khác nhau.
- Với `firstFunction` chúng ta sẽ đẩy hàm `myPromise` sang một bên (và callstack) trong khi chúng đang running, và tiếp tục thực thi hết đoạn code bên dưới, trong trường hợp này là `console.log('second')`. Sau đó quay lại thực thi chúng khi thấy `callstack` đã trống.
- Đối với `secondFunction`  chúng ta sẽ tạm dừng thực thi đoạn code bên dưới cho đến khi giá được giá trị đã được xử lý xong rồi mới chạy code tiếp theo. Điều này sẽ đảm bảo được sự xử lý đồng bộ cho đoạn code của chúng ta. Vậy nên `I have resolved` được log, rồi mới chạy đến `second` => **D**

### 4. Kết quả nào được trả về dưới đây?
```javascript
Promise.resolve(5);
```
* A: `5`
* B: `Promise {<pending>: 5}`
* C: `Promse {<fulfilled>: 5}`
* D: `Error`

#### Giải thích
Khi chúng ta thực hiện lệnh trả về bất kỳ type value nào với `Promise.resolve`, dù `promise` hay `non-promise`. Thì chính phương thức này sẽ return về một `promise` với `resolved value` (`<fulfilled>`). Có nghĩa là nếu chúng ta trả về với `Promise.resolve` thì dữ liều sẽ được trả về cùng với dạng `promise`. 
Trong trường hợp này giá trị được trả về là `promise` với dữ liệu là `5`. Đáp án sẽ là **C**

### 5. Cái gì được trả về ?

```javascript
async function* range(start, end) {
      for (let i = start; i <= end; i++) {
            yield Promise.resolve(i);
      }
}

(async () => {
      const gen = range(1, 3);
      for await (const item of gen) {
            console.log(item);
      }
})();
```
* A: `Promise {1}` `Promise {2}` `Promise {3}`
* B: `Promise {<pending>}` `Promise {<pending>}` `Promise {<pending>}`
* C: `1` `2` `3`
* D: `undefined ` `undefined ` `undefined `

#### Giải thích
Ở trên người ta sử dụng `generator function` với hàm `range` trả về một `async object` với `promises` mỗi phần tử duyệt qua: `Promise{1}`, `Promise{2}`, `Promise{3}`. Chúng đặt vào biến `gen` như là `async object`.  Sau đó chúng ta lặp qua nó bằng một vòng lặp `for await ... of`. Như vậy vòng lặp sẽ đặt vào item với giá trị là `promise value`: Đầu tiên `Promise{1}`, 2 là `Promise{2}` và cuối cùng là `Promise{3}`. Vì chúng ta đang chờ giá trị  từng `item` bằng cách sử dụng `await`, Như vậy promise sẽ được giải quyết xong và trả về theo thứ tự lần lượt: `1`, `2` và `3`. Đáp án là **C*

***
## Tổng kết
- Hi vọng với nhưng câu hỏi trên về `promise` sẽ giúp bạn làm mới những kiến thức đồng thời ôn lại kiến thức của mình. Chúc các bạn luôn gặp nhiều may mắn với Javascript.
- Tham khảo thêm tại  [đây](https://medium.com/javascript-in-plain-english/5-frontend-interview-questions-to-help-you-master-asynchronous-javascript-3339d0f89fdc)
ES 6 giới thiệu một cách thức hoàn toàn mới cho phép chúng ta làm việc với function và iterator là Generator (hay hàm sinh). Generator là function có thể thể **dừng giữa chừng** và sau đó tiếp tục **từ chỗ mà nó đã dừng**. Nói một cách ngắn gọn thì generators nó là iterator đội lốt function =))

Fun fact: `async/await` được xây dựng dựa trên generators.

Generators có mối liên hệ mật thiết với iterators. Nếu các bạn chưa biết về iterator thì các bạn có thể xem nhanh bài viết [này](https://viblo.asia/p/dao-dau-de-dang-voi-es6-iterators-thong-qua-vi-du-bJzKmGkYl9N) nhé :D

Sau đây là một ví dụ gắn với đời sống có thể giúp cho các bạn hiểu về bản chất của generator bằng trực giác =)):

Hãy tưởng tượng bạn đang mải xem JAV (Japanese Animal Video) đang đến doạn một con đang thịt con còn lại thì có thằng shipper gọi bạn ra nhận hàng. Dù đang rất cao trào (phim nhé =))) nhưng bạn vẫn phải pause phim lại để ra lấy hàng, Sau khi lấy hàng xong thì bạn lại bật phim xem tiếp chứ không xem lại từ đầu. Hành động xem tiếp đó của bạn nó cũng giống như là generator vậy.

## Giới thiệu

Hãy cùng xem liệu generator có thể giúp chúng ta giải quyết những vấn đề thông thường trong lập trình như nào nhé. Nhưng trước đó chúng ta hãy cùng định nghĩa generators là gì.

### Generators là gì

Một function thông thường như dưới đây không thể nào bị dừng được trước khi mà nó kết thúc công việc của nó (dòng lệnh cuối được thực thi)

```javascript
function normalFunc() {
  console.log('I')
  console.log('cannot')
  console.log('be')
  console.log('stopped.')
}
```

Cách duy nhất để chúng ta có thể exit hàm `normalFunc` là `return` khỏi nó, hoặc là `throw` một lỗi nào đó. Nếu chúng ta gọi `function` này lại thì nó sẽ bắt đầu được thực thi từ câu lệnh đàu tiên của hàm.

Ngược lại thì generator là hàm có thể dừng giữa chừng và tiếp tục từ chỗ mà nó dừng/

Sau đây là một số định nghĩa phổ biến về generator"

- Generator là một lớp đặc biệt của function có khả năng đơn giản hóa việc implement một iterator.
- Generator là một hàm sinh ra nhiều các kết quả tuần tự thay vì là chỉ trả về một giá trị đơn lẻ.

Trong JavaScript thì generator là một hàm sẽ trả về một object mà chúng ta có thể gọi `next()` trên nó. Mỗi lần chúng ta gọi `next()` nó sẽ trả về một object có dạng sau:

```json
{ 
  value: Any,
  done: true|false
} 
```

Thuộc tính `value` sẽ chứa giá trị trả về. Còn `done` sẽ hoặc là `false` hoặc `true`. Khi `done` là `true` thì generator sẽ dừng lại và sẽ không sinh ra giá trị nào nữa.

Dưới đây là hình minh họa:

![Funciton thường và Generators](https://images.viblo.asia/cb038080-a9e1-46d6-97f9-e9c758e3e6be.png)

`yield` ở đây có chức năng tương tự như `return` ở chỗ nó "trả về" giá trị được định nghĩa sau nó. Điểm khác của nó là ở chỗ nó lưu lại trạng thái của hàm tại vị trí `yield` được gọi nhằm mục đích ở lần gọi `next()` tiếp theo của chúng ta nó có thể chạy tiếp từ chỗ nó đang chạy dở. Đó là lý do keyword `yield` ra đời, chúng ta sẽ nói là hàm x yield một giá trị chứ không phải là `return`

### Tạo một Generator

Sau đây là ví dụ để tạo một generator trong Javascript:

```javascript
function * generatorFunction() { // Line 1
  console.log('This will be executed first.');
  yield 'Hello, ';   // Line 2
  console.log('I will be printed after the pause');  
  yield 'World!';
}
const generatorObject = generatorFunction(); // Line 3
console.log(generatorObject.next().value); // Line 4
console.log(generatorObject.next().value); // Line 5
console.log(generatorObject.next().value); // Line 6
// This will be executed first.
// Hello, 
// I will be printed after the pause
// World!
// undefined
```

Chúng ta sử dụng cú pháp `function *` thay vì `function` để khai báo một generator. Do nó cũng chỉ là `function` nên chúng ta có thể sử dụng ở bất kỳ đâu như đối với function thông thường.

Ngoài ra thì chúng ta có thể `return` từ generator. Tuy nhiên thì khi gọi `return` sẽ  thiết lập giá trị cho `done` thành `true` - như vậy là generator sẽ không thể sinh ra thêm giá trị nào nữa:

Ở dòng thứ 3, chúng ta đang tạo ra một object generator. Nếu các bạn đang bối rối vì thấy nó giống như đang gọi hàm thì các bạn yên tâm là các bạn đang đúng nhé =)): khi chúng ta gọi hàm generator thì cái mà nó trả về là một object generator. Object generator này là một iterator nên chúng ta có thể sử dụng nó trong vòng lặp `for-of` hoặc trong các fucntion khác chấp nhận đối số truyền vào là iterable.

Ở dòng 4 thì chúng ta gọi hàm `next()` trên `generatorObject`. Với lời gọi này thì generator bắt đầu được thực thi chức năng của nó. Đầu tiên thì nó `console.log` dòng `This will be executed first`. Sau đó thì khi nó chạy hết dòng `yield 'Hello, ` thì generator sẽ `yield` ra một object có nội dung như sau: `{ value: 'Hello, ', done: false }` và tạm dừng.

Ở dòng thứ 5 thì chúng ta lại gọi `next()`. Lần này thì generator sẽ lại chạy tiếp bắt đầu từ chỗ nó đang dừng. Đầu tiên nó sẽ `console.log` xâu `I will be printed after the pause`. Một lần nữa nó lại gặp yield, objext được `yield` có nội dung là `{ value: 'World!', done: false }`. Chúng ta sẽ chỉ extract thuộc tính `value` để in nó. Generator lại tiếp tục bị tạm dừng.

Ở dòng thứ 6 thì chúng ta lại gọi `next()`. Lần này thì không còn string nào để in ra nữa. Trong trường hợp này thì generators sẽ return một object là `{ value: undefined, done: true}` thay vì yield. Giá trị của cờ `done` được set thành `true` , 

Trong trường họp chúng ta muốn chạy lại generator từ đầu thì sẽ phải tạo một generator mới.

### Khi nào thì sử dụng Generator

Có rất nhiều tình huống thiết thực mà chúng ta sẽ được hưởng lợi từ việc sử dụng generator. Chúng ta hãy cùng xem nhé.

#### Implement một iterables

Bình thường khi chúng ta implement một iterator thì chúng ta sẽ phải tự tạo một object iterator thủ công với function `next()`. Ngoài ra thì state của nó chúng ta cũng phải lưu thủ công. Do generators cũng là iterables nên chúng cũng có thể được dùng để implement một iterables một cách ngắn gọn và dễ đọc hơn. Hãy cùng xem một ví dụ nhé:

Đặt vấn đề: Implement một iterable trả về *This, is,* và *iterable*. Đoạn code bên dưới sẽ sử dụng iterator để implement một iterable:

```javascript
const iterableObj = {
  [Symbol.iterator]() {
    let step = 0;
    return {
      next() {
        step++;
        if (step === 1) {
          return { value: 'This', done: false};
        } else if (step === 2) {
          return { value: 'is', done: false};
        } else if (step === 3) {
          return { value: 'iterable.', done: false};
        }
        return { value: '', done: true };
      }
    }
  },
}
for (const val of iterableObj) {
  console.log(val);
}
// This
// is 
// iterable.
```

Và đây là đoạn code sử dụng generator:

```javascript
function * iterableObj() {
  yield 'This';
  yield 'is';
  yield 'iterable.'
}
for (const val of iterableObj()) {
  console.log(val);
}
// This
// is 
// iterable.
```

So sánh giữa 2 phiên bản ở trên thì chúng ta có thể thấy phiên bản sử dụng generator vượt trội hơn hẳn do:

- Chúng ta không phải implement function `next()`
- Chúng ta không phải soạn nội dung object trả về một cách thủ công, ví dụ như ở trên là `{ value: 'This', done: false }`
- Chúng ta không phải quan tâm đến state của function. Như ở trong ví dụ với `iterator` chúng ta phải khởi tạo biến `step` để lưu state. Biến state này sẽ quyết định output từ iterable. Với generator thì chúng ta không phải quan tâm đến vấn đề này.

#### Tạo luồng dữ liệu vô tận

Chúng ta có thể tạo ra một generator với khả năng sinh dữ liệu vô tận, ví dụ:

```javascript
function * naturalNumbers() {
  let num = 1;
  while (true) {
    yield num;
    num = num + 1
  }
}
const numbers = naturalNumbers();
console.log(numbers.next().value)
console.log(numbers.next().value)
// 1
// 2
```

#### Có thể sử dụng Generator như một observer

Chúng ta có thể dùng hàm `next(val)` để gửi kèm dữ liệu đến cho generator. Mà mỗi lần chúng ta gọi gửi value đến cho generator như vậy là chúng ta đang "đánh thức" generator dậy. Chính vì vậy nên chúng ta có thể coi generator như là một observer do nó luôn quan sát value được truyền vào và sẽ có hành vi cụ thể kèm theo tương ứng.

## Ưu điểm của Generators

### Lazy evaluation

Như trong ví dụ luồng dữ liệu vô tận thì chúng ta có thể làm được như vậy là nhờ lazy evaluation. Lazy evaluation là một mô hình tính toán sẽ trì hoãn việc tính toán của một biểu thức cho đến khi nào chúng ta cần. Như vậy nghĩa là nếu chúng ta không cần đến nó thì nó sẽ không được tính toán. Hãy xem ví dụ sau nhé:

```javas
function * powerSeries(number, power) {
  let base = number;
  while(true) {
    yield Math.pow(base, power);
    base++;
  }
}
```

 Khi chúng ta gọi `powersOf2 = powerSeries(3, 2);` thì chúng ta mới chỉ đơn thuần là tạo ra một object generator, chưa có giá trị nào được tính toán. Sau đó, nếu chúng ta gọi tiếp `next()` thì nó sẽ tính toán ra giá trị 9 và trả về kết quả.

### Sử dụng tối ưu bộ nhớ

Một hệ quả của Lazy Evaluation là bộ nhớ sẽ được generator sử dụng một cách tối ưu. Do chúng ta sẽ chỉ sinh ra các values mà chúng ta cần. Với các function thông thường thì chúng ta sẽ phải sinh ra trước các values và giữ chúng để có thể dùng về sau. Tuy nhiên thì với generator thì chúng ta có thể trì hoãn sự tính toán này lại cho đến khi chúng ta thực sự cần value trả về của nó.

## Kết

Hi vọng qua bài viết này các bạn đã có cái nhìn rõ ràng hơn về Generators. Hẹn gặp lại các bạn trong các bài viết sau.

Happy coding ~


*Nguồn: https://codeburst.io/understanding-generators-in-es6-javascript-with-examples-6728834016d5*
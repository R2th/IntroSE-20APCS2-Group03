> Bài viết gốc: https://manhhomienbienthuy.github.io/2019/03/20/javascript-iterator-generator.html

Duyệt qua từng phần tử của một "tập các phần tử" là một hoạt động hết sức bình thường.  JavaScript cung cấp cho chúng ta tương đối nhiều phương thức để thực hiện việc đó.  Tuy nhiên, trong bài viết này, chúng ta sẽ không sa đà vào tìm hiểu những phương thức đó.  Thay vào đó, chúng ta sẽ tìm hiểu cơ chế đứng đằng sau tất cả, đó là những khái niệm: iterable, iterator, generator.

# Iterable

Một đối tượng được gọi là iterable nếu nó được cài đặt iterable protocol (sẽ tìm hiểu sau).  Những đối tượng iterable này thường có thể sử dụng các phương thức duyệt phần tử, ví dụ `for..of`.

Trong JavaScript, các đối tượng thuộc clas `Array` chính là iterable.

```javascript
for (let e of [1, 2, 3, 4]) console.log(e)
// 1
// 2
// 3
// 4
```

Ngoài ra, thì còn nhiều các đối tương dựng sẵn khác cũng là iterable, ví dụ `String`:

```javascript
for (let c of 'hello') console.log(c)
// h
// e
// l
// l
// o
```

Nếu một đối tượng là đại diện cho một "tập hợp các phần tử", thì chúng ta có thể hoàn toàn sử dụng `for..of` để duyệt qua các phần tử của nó.  Hoạt động duyệt qua các phần tử này được gọi là "iteration" (tương tự như nhiều ngôn ngữ khác).

Nhưng có khi nào bạn thắc mắc, những điều như thế hoạt động như thế nào hay chưa?  Không cần phải chờ lâu, chúng ta sẽ tìm hiểu ngay sau đây.

## Iterable protocol

Iterable protocol là một giao thức, cho phép các đối tượng của JavaScript có thể tuỳ biến hoạt động duyệt qua các phần tử của chính nó, protocol này sẽ được sử dụng trong các phép duyệt phần tử (ví dụ `for..of`).

Nhiều kiểu dữ liệu có sẵn của JavaScript đã được cài đặt iterable protocol (ví dụ Array, Map) cho phép chúng ta có thể duyệt qua các phần tử của nó khá dễ dàng.

Một đối tượng chỉ có thể là iterable nếu nó cài đặt iterable protocol.  Việc cài đặt sẽ được thực hiện qua phương thức `@@iterator`.  Nghĩa là đối tượng đó, bắt buộc phải có thuộc tính `@@iterator`.  Việc cài đặt thuộc tính này có thể thực hiện qua `[Symbol.iterator]` như sau:

```javascript
let range = {
	from: 1,
	to: 5,
	[Symbol.iterator]: () => {
		return {
			current: this.from,
			last: this.to,
			next: () => {
				if (this.current <= this.last) {
					return { done: false, value: this.current++ };
				} else {
				return { done: true };
			}
		}
	};
}
```

Thuộc tính `@@iterator` (được cài đặt thông qua `[Symbol.iterator]`) là một hàm không có tham số, và kết quả của nó phải là một iterator (sẽ tìm hiểu sau) thì chúng ta mới có thể duyệt các phần tử của một đối tượng được.  Thực ra, hàm này có thể trả về bất cứ thứ gì, nhưng nếu không phải là một iterator thì chúng ta sẽ gặp lỗi ngay khi duyệt phần tử, và tôi nghĩ chẳng ai làm điều "ngu ngốc" này khi cài đặt thuộc tính `@@iterator` cho một đối tượng cả.

Mỗi khi một đối tượng cần được duyệt qua các phần tử của nó, ví dụ sử dụng `for..of` là một điểm hình, thì những phương pháp đó trước hết sẽ gọi phương thức `@@iterator` của đối tượng đó (mà không có tham số), sau đó sẽ sử dụng kết quả trả về của phương thức này mà thực hiện việc iteration.

Chúng ta hoàn toàn có thể tự xây dựng các đối tượng iterable của riêng mình, bằng cách tự định nghĩa phương thức `@@iterator` như trong ví dụ ở trên.  Bằng cách tự định nghĩa phương thức, chúng ta hoàn toàn có thể tuỳ biến phương pháp duyệt phần tử.

Như trong ví dụ trên, chúng ta sẽ duyệt qua các phần tử từ 1 đến 5 (thực ra, các "phần tử" này không hoàn toàn nằm trong object, nhưng nhờ vào việc tuỳ biến phương pháp duyệt, chúng ta hoàn toàn có thể duyệt qua các phần tử này).

```javascript
for(let num of range) console.log(num)
// 1
// 2
// 3
// 4
// 5
```

Những phương thức duyệt như `for..of` chỉ làm việc với iterator được trả về.  Lưu ý rằng, iterator này có thể là một đối tượng hoàn toàn khác, không phải đối tượng được duyệt, điều này phụ thuộc vào cài đặt của từng đối tượng cụ thể.

# Iterator

Trong JavaScript, iterator là một đối tượng mà nó định nghĩa một "chuỗi" các phần tử, và sẽ trả về từng phần tử đó, cho tới khi gặp một điểm kết thúc nào đó.  Định nghĩa chính xác hơn, thì iterator là các đối tượng được cài đặt iterator protocol.

Iterator protocol hoàn toàn độc lập với iterable protocol, và một đối tượng không nhất định phải được cài đặt cả hai protocol này.  Điều đó cũng có nghĩa là một đối tượng iterable chưa chắc đã là iterator và ngược lại.

## Iterator protocol

Iterator protocol là một protocol định nghĩa phương pháp tiêu chuẩn để "tạo ra" một chuỗi các kết quả (có thể hữu hạn hoặc vô hạn), và trả về các kết quả lần lượt để chúng ta sử dụng trong phép duyệt.

Đây chính là protocol sẽ được sử dụng với `for..of` đối với các iterator được trả về từ thuộc tính của `@@iterator`.

Một đối tượng sẽ là iterator, nếu nó định nghĩa iterator protocol. Protocol này rất đơn giản, nó yêu cầu đối tượng đó phải được cài đặt phương thức `next` (không tham số) với kết quả trả về là một đối tượng có hai thuộc tính sau:

- `done (boolean)`: giá trị là `true` hoặc `false` biểu thị iterator đã kết thúc hay chưa và `false` khi vẫn còn các giá trị khác để duyệt.  Trong trường hợp giá trị này là `false` thì thuộc tính tiếp theo là bắt buộc.
- `value`: giá trị trả về của lần duyệt tiếp theo.  Giá trị của thuộc tính này có thể là bất cứ đối tượng JavaScript.

Phương thức `next` luôn luôn phải trả về một đối tượng có hai thuộc tính như trên (`value` có thể không cần nếu `done` là `true`).  Nếu một đối tượng khác với mô tả trên được trả về, chúng ta sẽ gặp lỗi `TypeError` khi thực hiện duyệt phần tử.

Thực ra, rất khó để biết một đối tượng có được cài đặt iterator protocol hay không.  Nhưng chúng ta lại có thể khá dễ dàng xây dựng một đối tượng có cài đặt protocol này.

Như đã nói ở trên, một đối tượng iterator chưa chắc đã là iterable và ngược lại, nhưng nếu chúng ta chủ đỗng xây dựng một đối tượng, chúng ta có thể cài đặt cả iterable protocol và iterator protocol.  Khi đó, đối tượng của chúng ta sẽ vừa là một đối tượng iterable vừa là một iterator.

## Tự xây dựng một iterator

Một trong số những iterator dựng sẵn của JavaScript, Array là một ví dụ điển hình.  Iterator này đơn giản là trả về từng giá trị của các phần tử trong nó và chúng ta sẽ duyệt lần lượt từng phần tử như vậy.

Chúng ta có thể tưởng tượng rằng, các iterator đều có tương tự như Array.  Nhưng thực ra không phải vậy.  Iterator hoàn toàn có thể hoạt động một cách thoải mái (thậm chí không có điểm dừng), phụ thuộc vào cách cài đặt iterator protocol của riêng nó.

Dưới đây là một ví dụ về iterator tự xây dựng.  Nó xây dựng một chuỗi các giá trị trong một khoảng cho trước.

```javascript
function makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let nextIndex = start;
    let iterationCount = 0;

    const rangeIterator = {
       next: function() {
           let result;
           if (nextIndex <= end) {
               result = { value: nextIndex, done: false }
               nextIndex += step;
               iterationCount++;
               return result;
           }
           return { value: iterationCount, done: true }
       }
    };
    return rangeIterator;
}

let it = makeRangeIterator(1, 10, 2);

let result = it.next();
while (!result.done) {
	console.log(result.value); // 1 3 5 7 9
	result = it.next();
}

console.log("Iterated over sequence of size: ", result.value); // 5
```

Thâm chí chúng ta có thể kết hợp iterator protocol và iterable protocol, như vậy, chúng ta vừa có thể xậy dựng một iterator, vừa có thể duyệt các phần tử của nó bằng `for..of`.

```javascript
var myIterator = {
    next: function() {
        // ...
    },
    [Symbol.iterator]: function() { return this }
};
```

# Generator

Tự xây dựng iterator cho riêng mình là một công việc rất ngầu và khá hiệu quả.  Thế nhưng nó yêu cầu chúng ta phải hết sức cẩn thận trong việc cài đặt iterable protocol cũng như iterator protocol.  Bởi chúng ta hoàn toàn phải làm thủ công các công việc như quản lý trạng thái hiện tại cũng như tính toán giá trị tiếp theo.

Thế nhưng, JavaScript có một công cụ khác, đó chính là các hàm generator, sẽ giúp chúng ta nhàn hạ hơn rất nhiều trong việc này. Generator có khả năng giúp chúng ta định nghĩa một chuỗi các giá trị dùng để duyệt, chỉ bằng một hàm duy nhất.

Về cú pháp, các hàm generator được định nghĩa bởi keywword `function*`, hơi khác một chút so với các hàm thông thường.  Sự hoạt động của generator cũng rất khác.  Khi được gọi, nó không thực sự được thực thi ngay.  Thay vào đó, nó trả về một đối tượng, mà chúng ta có thể gọi đó là generator.

## Generator là iterator

Một generator sẽ tự động được định nghĩa phương thức `next`, do đó nó sẽ tự động là một iterator.  Thậm chí, việc này là hoàn toàn tự động nên chúng ta không cần phải lo lắng về việc quản lý trạng thái cũng như các giá trị của generator.

Mỗi khi phương thức được `next`, hàm generator lúc này mới thực sự được thực thi, và nó sẽ dừng lại cho đến khi gặp `yield`.  Và giá trị của `yield` cũng là giá trị sẽ được trả về của `next`.

Trở lại với ví dụ về iterator tự xây dựng ở phía trên, chúng ta có thể dễ dàng viết lại nó bằng generator như sau:

```javascript
function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let iterationCount = 0;
    for (let i = start; i < end; i += step) {
        iterationCount++;
        yield i;
    }
}
```

Hoặc chúng ta cũng có thể sử dụng function expression để định nghĩa một generator:

```javascript
function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let iterationCount = 0;
    for (let i = start; i < end; i += step) {
        iterationCount++;
        yield i;
    }
}
```

Với phương thức `next` được định nghĩa sẵn, chúng ta có thể gọi như sau:

```javascript
range = makeRangeIterator(1, 10, 2);
range.next()
// {value: 1, done: false}
range.next()
// {value: 1, done: false}
```

## Generator là iterable

Không những là một iterator, generator cũng là một đối tượng iterable.  Tức là nó sẽ tự động được định nghĩa cả iterable protocol và iterator protocol, quá tiện cho chúng ta.  Nhờ việc cài đặt protocol, chúng ta có thể sử dụng các phép duyệt phần tử, tương tự như các iterable bình thường khác:

```javascript
for (let num in makeRangeIterator(1, 10, 2)) console.log(num)
// 1
// 3
// 5
// 7
// 9
```

Một hàm generator có thể được gọi bao nhiêu lần tuỳ ý.  Và mỗi lần gọi, nó sẽ trả về một generator khác nhau, có thể được duyệt riêng biệt mà không ảnh hưởng đến các lần gọi khác.

Tuy nhiên, khác với iterator tự xây dựng, chúng ta không thể tuỳ biến việc duyệt qua generator được.  Mỗi generator chỉ có thể duyệt một lần duy nhất, và mỗi giá trị cũng chỉ có thể duyệt qua 1 lần.  Tất nhiên, chúng ta có thể gọi hàm generator nhiều lần, nhưng mỗi lần gọi như vậy cũng chỉ có thể duyệt 1 lần mà thôi.

Nhờ vào những ưu điểm của mình, chúng ta có thể suy nghĩ đến việc sử dụng generator thay thế cho các iterator cũng iterable cần phải xây dựng bằng tay.  Vì rõ ràng, việc sử dụng generator tiện lợi và an toàn hơn rất nhiều.

## Generator yield một generator khác

Đây là một phương thức đặc biệt của generator, chúng ta có thể "nhúng" generator này trong một generator khác.  Khi đó, chúng ta cần đến một cú pháp đặc biệt: `yield*`:

```javascript
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

    // 0..9
    yield* generateSequence(48, 57);

    // A..Z
    yield* generateSequence(65, 90);

    // a..z
    yield* generateSequence(97, 122);

}

let str = '';

for(let code of generatePasswordCodes()) {
    str += String.fromCharCode(code);
}
console.log(str):
// 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
```

Cú pháp `yield*` ở trên cho phép chúng ta gọi một generator khác, và chờ generator đó kết thúc trước khi thực hiện các tính toán tiếp theo.  Nếu không sử dụng phương pháp này, chúng ta phải xây dựng generator phức tạp hơn như sau:

```javascript
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

    // yield* generateSequence(48, 57);
    for (let i = 48; i <= 57; i++) yield i;

    // yield* generateSequence(65, 90);
    for (let i = 65; i <= 90; i++) yield i;

    // yield* generateSequence(97, 122);
    for (let i = 97; i <= 122; i++) yield i;

}

let str = '';

for(let code of generateAlphaNum()) {
    str += String.fromCharCode(code);
}
console.log(str);
// 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
```

Việc yield một generator khác cho chúng ta phương thức đơn giản hơn rất nhiều trong việc nhúng một generator vào một generator.

## Gán giá trị cho `yield`

Từ đầu tới giờ, chúng ta vẫn sử dụng generator theo một cách rất tự nhiên, đó là lần lượt `yield` từng giá trị của generator.  Nhiều người cũng đang làm như vậy.  Thế nhưng, generator rất mềm dẻo, cho phép chúng ta làm nhiều hơn thế.

Đó là `yield` cũng có thể nhận ra giá trị từ bên ngoài, chứ không gò bò trong việc trả về giá trị.  Hãy xem một ví dụ đơn giản dưới đây, chúng ta dùng thủ thuật này để reset lại chuỗi từ đầu:

```javascript
function* foo() {
    let index = 0;
    while (true) {
        const result = yield index++;
        if (result) {
            index = 0;
        }
    }
}

const bar = foo();

console.log(bar.next())
// {value: 0, done: false}
console.log(bar.next())
// {value: 1, done: false}
console.log(bar.next(true))
// {value: 0, done: false}
console.log(bar.next())
// {value: 1, done: false}
```

Generator còn 1 ứng dụng rất lớn nữa, đó là làm cơ sở cho việc code bất đồng bộ với các keyword [`async/await`](https://manhhomienbienthuy.github.io/2018/Jul/17/javascript-asyncawait.html).

# Kết luận

Iterator và generator là những khái niệm rất quan trọng trong JavaScript.  Hy vọng bài viết cung cấp các thông tin hữu ích và giúp các bạn ngày càng bá hơn trong việc code JavaScript.
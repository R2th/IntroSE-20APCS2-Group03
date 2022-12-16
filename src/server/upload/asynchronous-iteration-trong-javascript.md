# Asynchronous Iteration trong JavaScript ?
Chắc hẳn khi nghe qua về chủ đề này bạn nghĩ tới  hoặc đã một lần nghe tới callback hay promises trong javascript ? Nhưng nó chỉ hữu ích dùng cho các xử lý đồng bộ single-shot nhưng bạn nghĩ sao với trường hợp sự kiện bất đồng hộ lặp đi lặp lại ? 

Ví dụ như hàm setInterval() hay sự kiện "Click" trên một web browser, một Promises không thể thực hiện cho một chuỗi sự kiện bất đồng bộ được và chúng ta cũng không thể thực hiện bằng async function và await statements thông thường.

## Vòng lặp for/await

Node 12 cung cấp đến với khả năng vòng lặp đọc dữ liệu bất đồng bộ. Điều này có nghĩa là bạn có thể đọc dữ liệu liên tiếp từ một luồng với vòng lặp for / await như thế này:
```javascript
const fs = require("fs");
async function parseFile(filename) {
    let stream = fs.createReadStream(filename, {
        encoding:
            "utf-8"
    });
    for await (let chunk of stream) {
        parseChunk(chunk); // Assume parseChunk() is defined
        elsewhere
    }
}
```
Giống như một biểu thức await thông thường, vòng lặp for / await được dựa trên promies. Có thể hiểu rằng vòng lặp bất đồng bộ tạo ra một Promise và vòng lặp for / await chờ đợi Promise đó thực hiện, gán giá trị thực hiện cho biến vòng lặp và chạy mã chính của vòng lặp. Sau đó lại bắt đầu lại, nhận được một Promise khác từ iterator và chờ đợi Promise mới thực hiện.

Giả sử bạn có một loạt các URLs:

```javascript
const urls = [url1, url2, url3];
```

Bạn có thể gọi fetch () trên mỗi URL để nhận một chuỗi các Promises:
```javascript
const promises = urls.map(url => fetch(url));
```
Chắc hẳn bạn đang hình dung tới Promise.all() sử dụng để chờ tất cả các Promise thực hiện. Nhưng giả sử rằng chúng ta muốn kết quả của lần tìm nạp đầu tiên ngay khi chúng có sẵn và không muốn chờ cho đến khi tất cả URLs được nạp trước thì giải pháp ở đây là gì ? (Tất nhiên, fetch đầu tiên sẽ mất mất nhiều thời gian hơn bất kỳ lần nào khác, và nó cũng không đảm bảo được sẽ nhanh hơn việc sử dụng Promise.all ()).
Các mảng có thể như một vòng lặp, vì vậy chúng ta có thể lặp lại qua mảng với các promises thông qua các vòng lặp for thông thường

```javascript
for (const promise of promises) {
    response = await promise;
    handle(response);
}
```
ví dụ này sử dụng vòng lặp for thông thường. Nhưng vòng lặp này trả về Promise và chúng ta cũng có thể sử dụng for / await cho đoạn code đơn giản hơn:
```javascript
for await (const response of promises) {
    handle(response);
}
```
Trong trường hợp này, vòng lặp for / await chỉ xây dựng cuộc gọi await vào vòng lặp và làm cho code  gọn hơn một chút, nhưng hai ví dụ vẫn cho kết quả như nhau .Nhưng điều quan trọng là cả hai ví dụ sẽ chỉ hoạt động nếu chúng nằm trong các hàm được khai báo async. Một vòng lặp for / await không khác gì một biểu thức await thông thường theo cách đó.
Tuy nhiên, hiện tại chúng ta đang sử dụng for/await với vòng lặp thông thường.Nhưng mọi thứ thú vị hơn với các vòng lặp bất đồng bộ hoàn toàn.

##  Asynchronous Iterators

Chắc hẳn bạn cũng đã biết thì một đối tượng iterable là một đối tượng có thể được sử dụng với vòng lặp for. Nó định nghĩa một phương thức với tên tượng trưng Symbol.iterator. Phương thức này trả về một đối tượng iterator với phương thức next () xử dụng để gọi các giá trị tiếp theo của interator.

Asynchronous iterators khá giống với các trình vòng lặp thông thường nhưng có hai điểm khác biệt. Thứ nhất một đối tượng lặp bất đồng bộ thực hiện một phương thức Symbol.asyncIterator thay vì Symbol.iterator. Cuối cùng là phương thức next() của asynchronous iterator trả về một Promise thay vì trả trực tiếp kết quả từ vòng lặp.

Đến đây chắc hẳn bạn đang đặt ra câu hỏi vậy for/await có khác biệt gì thì: Khi chúng ta sử dụng for/await một vòng lặp đồng bộ trả về một mảng Promise thuộc tính giá trị là Promise nhưng thuộc tính được thực hiện lại là đồng hộ . Một  asynchronous iterators sẽ trả về Promise là kết quả vòng lặp và cả value và done properties là bất đồng bộ. 

## Trình tạo bất đồng bộ

Cách dễ nhất để thực hiện một trình vòng lặp thường là sử dụng một trình tạo (generator). Và cũng được sử dụng với asynchronous iterators, chúng ta có thể thực hiện với các hàm tạo được khai báo async. ột trình tạo async có khả năng của async và tính năng của trình tạo. Chúng ta có thể sử dụng await giống với async function thông thường và bạn cũng có thể sử dụng yield như với trình tạo thông thường.

Ngay cả cú pháp cho async generators cũng là sự kết hợp async và function.  Dưới đây là một ví dụ về cách tạo một async generator và và vòng lặp for / await để chạy code theo các khoảng  thời gian cố định bằng vòng lặp thay vì hàm callback của setInterval ():

```javascript
// A Promise-based wrapper around setTimeout() that we can use await with.
// Returns a Promise that fulfills in the specified number of milliseconds
function elapsedTime(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// An async generator function that increments a counter and yields it
// a specified (or infinite) number of times at a specified interval.
async function* clock(interval, max = Infinity) {
    for (let count = 1; count <= max; count++) { // regular for loop
        await elapsedTime(interval); // wait for time to passs
        yield count; // yield the counter
    }
}
// A test function that uses the async generator with for/await
async function test() { // Async so we can use for/await
    for await (let tick of clock(300, 100)) { // Loop 100 times every 300ms
        console.log(tick);
    }
}
```

##  Triển khai một vòng lặp không đồng bộ

Thay vì sử dụng async generators để triển khai vòng lặp không đồng bộ, bạn cũng có thể thực hiện trực tiếp bằng cách định nghĩa cho một đối tượng với phương thức Symbol.asyncIterator() có phương thức next() và trả về Promise trả về đối tượng kết quả của vòng lặp
Để hiểu hơn chúng ta cùng đi đến ví dụ sau hãy tưởng tượng rằng chúng ta đang triển khai lại hàm clock() trong ví dụ trước thay thế generator mà thay vào đó là trả về một đối tượng lặp bất đồng bộ. Lưu ý rằng phương thức next() trong ví dụ này không trả về một promise; Thay vào đó, chúng ta chỉ khai báo next () là async:
```javascript
function clock(interval, max = Infinity) {
    // A Promise-ified version of setTimeout that we can use await with.
    // Note that this takes an absolute time instead of an interval.
    function until(time) {
        return new Promise(resolve => setTimeout(resolve, time - Date.now()));
    }
    // Return an asynchronously iterable object
    return {
        startTime: Date.now(), // Remember when we started
        count: 1, // Remember which iteration we're on
        async next() { // The next() method makes this an iterator
            if (this.count > max) { // Are we done?
                return { done: true }; // Iteration result indicating done
            }
            // Figure out when the next iteration should begin,
            let targetTime = this.startTime + this.count * interval;
            // wait until that time,
            await until(targetTime);
            // and return the count value in an iteration result object.
            return { value: this.count++ };
        },
        // This method means that this iterator object is also an iterable.
        [Symbol.asyncIterator]() { return this; }
    };
}
```
Vòng lặp for / await luôn chờ đợi Promise được trả về bởi một iteration  khi nó bắt đầu một iteration tiếp theo. Nhưng nếu bạn sử dụng một asynchronous iterator mà không có vòng lặp for / await, thì không có gì ngăn bạn gọi phương thức next () bất cứ khi nào bạn muốn. Với code clock () dựa trên generator, nếu bạn gọi phương thức next() ba lần theo tuần tự, bạn sẽ nhận được ba Promises sẽ hoàn thành gần như cùng một lúc, đó có thể không phải là điều bạn muốn. Nhưng với iterator mà chúng ta đã triển khai ở đây không gặp phải vấn đề đó. Lợi ích của asynchronous iterators là chúng cho phép chúng ta thực hiện được các luồng sự kiện hoặc dữ liệu bất đồng bộ.


Mọi phương thức asynchronous iterator nào cũng có khả năng duy trì hàng đợi Promise mà nó giải quyết theo thứ tự khi các sự kiện bất đồng bộ được thực thi. Nếu chúng ta gói gọn hành vi xếp hàng Promise này vào một lớp AsyncQueue, thì việc thực hiện một asynchronous iterators dựa trên AsyncQueue sẽ trở nên dễ dàng hơn nhiều.

Lớp AsyncQueue bao gồm các phương thức enqueue() và dequeue() giống như với mọi queue. Tuy nhiên, phương thức dequeue() trả về một Promise chứ không phải là một giá trị thực, điều đó có nghĩa là bạn có thể gọi dequeue() trước khi enqueue() được gọi. 

```javascript
/**
 * An asynchronously iterable queue class. Add values with
enqueue()
 * and remove them with dequeue(). dequeue() returns a
Promise, which
 * means that values can be dequeued before they are
enqueued. The
 * class implements [Symbol.asyncIterator] and next() so
that it can
 * be used with the for/await loop (which will not terminate
until
 * the close() method is called.)
 */
class AsyncQueue {
    constructor() {
        // Values that have been queued but not dequeued yet are stored here
        this.values = [];
        // When Promises are dequeued before their corresponding values are
        // queued, the resolve methods for those Promises are stored here.
        this.resolvers = [];
        // Once closed, no more values can be enqueued, and no more unfulfilled
        // Promises returned.
        this.closed = false;
    }
    enqueue(value) {
        if (this.closed) {
            throw new Error("AsyncQueue closed");
        }
        if (this.resolvers.length > 0) {
            // If this value has already been promised, resolve that Promise
            const resolve = this.resolvers.shift();
            resolve(value);
        }
        else {
            // Otherwise, queue it up
            this.values.push(value);
        }
    }
    dequeue() {
        if (this.values.length > 0) {
            // If there is a queued value, return a resolved Promise for it
            const value = this.values.shift();
            return Promise.resolve(value);
        }
        else if (this.closed) {
            // If no queued values and we're closed, return a resolved
            // Promise for the "end-of-stream" marker
            return Promise.resolve(AsyncQueue.EOS);
        }
        else {
            // Otherwise, return an unresolved Promise,
            // queuing the resolver function for later use
            return new Promise((resolve) => {
                this.resolvers.push(resolve);
            });
        }
    }
    close() {
        // Once the queue is closed, no more values will be enqueued.
        // So resolve any pending Promises with the end-ofstream marker
        while (this.resolvers.length > 0) {
            this.resolvers.shift()(AsyncQueue.EOS);
        }
        this.closed = true;
    }
    // Define the method that makes this class asynchronously iterable
    [Symbol.asyncIterator]() { return this; }
    // Define the method that makes this an asynchronous iterator. The
    // dequeue() Promise resolves to a value or the EOS sentinel if we're
    // closed. Here, we need to return a Promise that resolves to an
    // iterator result object.
    next() {
        return this.dequeue().then(value => (value ===
            AsyncQueue.EOS)
            ? {
                value: undefined,
                done: true
            }
            : {
                value: value, done:
                    false
            });
    }
}
// A sentinel value returned by dequeue() to mark "end of stream" when closed
AsyncQueue.EOS = Symbol("end-of-stream");
```

Vì lớp AsyncQueue này xác định một số hàm cơ bản cho asynchronous iteration, nên chúng ta có thể tạo các asynchronous iterators thú vị hơn cho riêng mình chỉ bằng giá trị ngăn xếp ất đồng bộ. Dưới đây, một ví dụ sử dụng AsyncQueue để tạo ra một luồng các sự kiện trình duyệt web có dược xử lý bằng vòng lặp for / await:

```javascript
// Push events of the specified type on the specified document element
// onto an AsyncQueue object, and return the queue for use as an event stream
function eventStream(elt, type) {
    const q = new AsyncQueue(); // Create a queue
    elt.addEventListener(type, e => q.enqueue(e)); // Enqueue events
    return q;
}
async function handleKeys() {
    // Get a stream of keypress events and loop once for each one
    for await (const event of eventStream(document, "keypress")) {
        console.log(event.key);
    }
}
```
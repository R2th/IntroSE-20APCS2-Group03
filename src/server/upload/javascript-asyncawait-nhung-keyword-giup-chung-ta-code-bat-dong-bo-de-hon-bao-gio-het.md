> Bài viết gốc: https://manhhomienbienthuy.github.io/2018/07/17/javascript-asyncawait.html (đã xin phép tác giả :D)

Trong [bài viết trước](https://manhhomienbienthuy.bitbucket.io/2018/Jun/20/javascript-promise.html), chúng ta đã tìm hiểu cách sử dụng Promise để code bất đồng bộ dễ dàng hơn.  Trong bài viết này, chúng ta sẽ tìm hiểu thêm những cách nâng cao hơn nữa để code bất đồng bộ trong JavaScript.  Đó chính là sử dụng `async` và `await`, những keyword mới được giới thiệu từ ECMAScript 2017 (ES8).

Cách hoạt động của `async/await` dựa trên generator, vì vậy, để hiểu được `async/await`, chúng ta cần hiểu về generator trước đã.

> Bài viết tập trung chủ yếu vào code bất đồng bộ với `async/await` nên những gì trình bày về generator ở đây chỉ ở mức sơ khai.  Nếu muốn tìm hiểu kỹ hơn, mời các bạn tìm đọc các bài viết chuyên sâu hơn về chủ đề này.

# Generator

[Generator](https://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions) của JavaScript được giới thiệu kể từ ECMAScript 2015 (ES6).  Tôi đã từng làm việc với ngôn ngữ Python và thấy rằng, generator của JavaScript cũng có ý tưởng tương tự như [generator của Python](https://manhhomienbienthuy.bitbucket.io/2016/Jan/05/python-iterator-generator.html).

Trong JavaScript, để định nghĩa một generator, chúng ta cần định nghĩa chúng là một `function*` (keyword `function` và tiếp theo là dấu sao `*`, có thể thêm dấu space tuỳ vào phong cách của mỗi người).  Khi gặp định nghĩa này, chúng ta sẽ thu được một generator (thuộc lớp `GeneratorFunction`) thay vì một hàm thông thường.  (Cú pháp có chặt chẽ hơn Python đôi chút).

```javascript
function* generator(i) {
    yield i;
    yield i + 10;
}
```

Chúng ta cũng có thể sử dụng cú pháp generator expression để định nghĩa:

```javascript
const generator = function* (i) {
    yield i;
    yield i + 10;
}
```

Một lưu ý nhỏ là lớp `GeneratorFunction` không phải đối tượng chúng ta có thể truy cập được nên không thể dùng nó để tạo ra một generator được mà phải dùng cú pháp như trên.

Cách sử dụng generator rất đơn giản thôi:

```javascript
var gen = generator(10);
console.log(gen.next().value);
console.log(gen.next().value);
// Kết quả:
// 10
// 20
```

## Cách thức hoạt động

Khi gọi một hàm generator, thì nội hàm đó sẽ không được thực thi ngay, mà một đối tượng [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators) sẽ được trả về.  Khi phương thức `next` của iterator đó được gọi (vòng lặp `for..of` cũng gọi đến phương thức này), nội dung của hàm generator mới được thực thi, và nó sẽ "tạm dừng" khi gặp lệnh `yield`. Những gì tiếp sau lệnh `yield` sẽ là giá trị được trả về của phương thức `next`.

Phương thức `next` trả về kết quả là một đối tượng là giá trị được `yield` và một trạng thái biểu thị generator đã `yield` giá trị cuối cùng hay chưa (giá trị `done` là `true` hoặc `false`).  Nếu chưa, chúng ta có thể tiếp tục gọi `next` và hàm generator đang bị tạm dừng sẽ tiếp tục chạy cho đến khi gặp `yield` tiếp theo (hoặc hàm kết thúc).

Ngoài ra, generator có thể sử dụng `yield*` để `yield` một generator khác.  Hàm generator cũng có thể dùng `return`.  Nếu một giá trị được `return` thì nó cũng tương tự `yield` sẽ là giá trị trả về của `next`, đồng thời hàm sẽ kết thúc tại đó.

Một generator đã kết thúc (`done`) thì dù chúng ta có tiếp tục gọi `next`, nó sẽ không thực thi thêm bất cứ một đoạn code nào của generator đó nữa.  Ngoài ra, nếu có exception xảy ra, thì generator cũng bị kết thúc sớm (generator `done` nhưng giá trị sẽ là `undefined`).

Bằng cách hoạt động như vậy, generator chỉ thực hiện tính toán và `yield` các giá trị khi cần thiết.  Vì vậy, nó rất thích hợp để thực hiện những tính toán mất nhiều thời gian và bộ nhớ, ví dụ như một mảng vô hạn chẳng hạn.

## Một số ví dụ

### Một generator thông thường

```javascript
function* foo() {
    let index = 0;
    while (true)
        yield index++;
}

const bar = foo();
console.log(bar.next());
// {value: 0, done: false}
console.log(bar.next());
// {value: 1, done: false}
console.log(bar.next());
// {value: 2, done: false}
console.log(bar.next());
// {value: 3, done: false}
console.log(bar.next());
// {value: 4, done: false}
```

### Generator sử dụng expression

```javascript
const foo = function* () {
    yield 10;
    yield 20;
};

const bar = foo();
console.log(bar.next());
// {value: 10, done: false}
console.log(bar.next())
// {value: 20, done: false}
console.log(bar.next())
// {value: undefined, done: false}
```

### Gọi generator khác với `yield*`

```javascript
function* foo(i) {
    yield i + 1;
    yield i + 2;
    yield i + 3;
}

function* bar(i) {
    yield i;
    yield* foo(i);
    yield i + 10;
}

const fooBar = bar(10);

console.log(fooBar.next());
// {value: 10, done: false}
console.log(fooBar.next());
// {value: 11, done: false}
console.log(fooBar.next());
// {value: 12, done: false}
console.log(fooBar.next());
// {value: 13, done: false}
console.log(fooBar.next());
// {value: 20, done: false}
console.log(fooBar.next())
// {value: undefined, done: true}
```

### Truyền tham số cho generator

Phương thức `next` có thể nhận tham số để thay đổi trạng thái hiện tại của generator.  Giá trị được truyền vào cho `next` được coi là kết quả được trả về của lệnh `yield` cuối cùng trước khi generator bị tạm dừng (bình thường lệnh này sẽ không trả về gì cả).

```javascript
function* logGenerator() {
    console.log(0);
    console.log(1, yield);
    console.log(2, yield);
    console.log(3, yield);
}

const logger = logGenerator();

logger.next();             
// 0
logger.next('pretzel');    
// 1 pretzel
logger.next('california');
// 2 california
logger.next('mayonnaise');
// 3 mayonnaise
```

Trong ví dụ dưới, chúng ta có thể sử dụng `next(true)` để reset chuỗi lại từ đầu:

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

### Gọi `return` trong generator

```javascript
function* foo() {
    yield 'yield';
    return 'return';
    yield 'unreachable';
}

const bar = foo()
console.log(bar.next());
// { value: "yield", done: false }
console.log(bar.next());
// { value: "return", done: true }
console.log(bar.next());
// { value: undefined, done: true }
```

# Sử dụng generator để code bất đồng bộ

Generator có một tính chất rất hay đó là hàm generator có thể được thực thi, rồi tạm dừng, sau đó tiếp tục thực thi mà trạng thái của nó sẽ được lưu lại.  Tất cả mọi biến, hằng, v.v... sẽ được giữ nguyên giá trị khi hàm được thực thi trở lại sau khi tạm dừng.

Vì vậy, generator có thể kết hợp với Promise (vốn là một công cụ tuyệt vời) để giúp chúng ta code bất đồng bộ dễ dàng hơn nữa.  Promise đã giúp chúng ta rất nhiều nhưng code bất đồng bộ vẫn còn quá khó đọc và hiểu so với code đồng bộ.  Việc xử lý khi gặp lỗi vẫn còn sử dụng rất nhiều đến cơ chế callback mà không thể dùng những cú pháp tiện lợi của chính JavaScript như `try..catch`.

Chúng ta có thể kết hợp generator với Promise theo cách sau: `yield` một promise khi nào chúng ta muốn code tạm dừng (vì hoạt động bất đồng bộ), và trong callback của promise đó sẽ gọi tiếp `next` của generator để hàm tiếp tục chạy.  Dưới đây là một ví dụ:

```javascript
let foo;
function* bar() {
    console.log('before async');
    yield new Promise(resolve => setTimeout(() => resolve(1), 1000)).then(x => {
        console.log(x);
        foo.next();
    })
    console.log('after async');
}
foo = bar();
foo.next();
```

Trong code cũng không lấy gì làm đẹp lắm.  Nhưng nó đã hoạt động đúng: sau khi in ra dòng `before async` thì 1 giấy sau nó mới in ra kết quả của promise và tiếp theo là dòng `after async`.  Bằng cách kết hợp generator với Promise như thế này, chúng ta có thể tạm dừng một hàm để chờ các hoạt động bất đồng bộ được thực thi và sau đó lại tiếp tục hàm.

Cách làm này cho chúng ta kết quả hay hơn khá nhiều so với chỉ sử dụng Promise thông thường, khi mà code bất đồng bộ sẽ luôn bị thực thi sau code đồng bộ.

Tuy nhiên, code này không phải là một dạng tổng quát, chúng ta sẽ phải biến hoá nó cho từng bài toán cụ thể.  Ngoài ra, generator cũng giúp chúng ta xử lý lỗi bằng cú pháp `try..catch` truyền thống của JavaScript.

Chúng ta có thể xây dựng một hàm cho phép tạm dừng code với generator và Promise tương đối tổng quát như sau:

```javascript
function async(gen, context=undefined) {
    const generator = typeof gen === 'function' ? gen() : gen;
    const {value: promise} = generator.next(context);
    if (typeof promise !== 'undefined') {
        promise
            .then(resolved => async(generator, resolved))
            .catch(error => generator.throw(error));
    }
}
```

Sử dụng hàm này, chúng ta có thể tạm dừng một hàm bằng cách `yield` một Promise, chờ nó kết thúc và nhận kết quả về:

```javascript
async(function* () {
    console.log('before async');
    const promise = new Promise(resolve => setTimeout(
        () => resolve('async'),
        1000
    ));
    const result = yield promise;
    console.log(result);
    console.log('after async');
})
// Kết quả:
// before async
// (Tạm dừng 1 giấy)
// async
// after async
```

Bằng cách sử dụng đệ quy, chúng ta có thể tạm dừng một hàm bao nhiêu lần cũng được:

```javascript
async(function* () {
    const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 1000));
    const promise2 = new Promise(resolve => setTimeout(() => resolve(2), 1000));
    const promise3 = new Promise(resolve => setTimeout(() => resolve(3), 2000));

    const result1 = yield promise1;
    console.log(result1);
    const [result2, result3] = yield Promise.all([promise2, promise3]);
    console.log(result2, result3);
})
// Kết quả:
// 1 (hiện ra sau 1 giây)
// 2 3 (hiện ra sau 2 giây)
```

Vậy là chúng ta đã có một cách tương đối tổng quát dùng để code bất đồng bộ rất dễ dàng.  Tuy nhiên, mức độ tổng quát như trên chưa thể đảm bảo được.  Nó sẽ chạy tốt cho các trường hợp thông thường, nhưng không rõ là một số trường hợp "không thông thường" thì sẽ thế nào.

Rất may cho chúng ta, những người làm đặc tả cho ngôn ngữ, cụ thể là tổ chức [Ecma International](https://www.ecma-international.org/) với đặc tả ECMAScript đã thiết kế phần này giúp chúng ta.  Tuy nó ra đời hơi muộn, nhưng muộn còn hơn là không có, những tính năng mới của JavaScript sẽ giúp chúng ta code bất đồng bộ dễ dàng hơn bao giờ hết. Đó chính là nội dung mà chúng ta sẽ tìm hiểu ngay sau đây.

# Async/await

Async/await được thêm vào từ đặc tả [ECMAScript 2017](https://www.ecma-international.org/ecma-262/8.0/#sec-async-function-definitions) (ES 8), nên hiện nay chưa được hỗ trợ bởi tất cả các trình duyệt. Nhưng với sự trợ giúp của [babel-preset-env](https://new.babeljs.io/docs/en/next/babel-preset-env.html) (đã hỗ trợ hết ES 6, 7, 8) thì chúng ta hoàn toàn có thể transpile để sử dụng `async`, `await` trên các trình duyệt phiên bản cũ hơn.

Async/await được xây dựng dựa trên generator và Promise, nó được xây dựng tương đối giống với ý tưởng của hàm `async` tổng quát ở phần trước, tất nhiên là phức tạp và bao quát hơn.  Để tìm hiểu rõ hơn về các xây dựng những keyword này, mời các bạn xem thêm [ở đây](https://tc39.github.io/ecmascript-asyncawait/#desugaring).

Trong bài viết này, chúng ta chủ yếu tập trung vào cách áp dụng những keyword này cho bài toán bất đồng bộ.

## Hàm `async`

Chúng ta có thể định nghĩa một hàm bất đồng bộ bằng keyword `async`:

```javascript
async function fname() {
    return 1;
}
```

Hoặc định nghĩa bằng function expression cũng không vấn đề gì:

```javascript
fname = async function() {
    return 1;
}
```

Thậm chí, chúng ta có thể kết hợp với cú pháp arrow function của ES 6:

```javascript
fname = async () => 1;
```

Keyword `async` trong định nghĩa hàm trên sẽ giúp chúng ta định nghĩa một hàm thuộc lớp `AsyncFunction`.  Lưu ý rằng, `AsyncFunction` không thể truy cập như một biến toàn cục được nên muốn định nghĩa một hàm bất đồng bộ, chúng ta bắt buộc phải dùng đến keyword `async`.

AsyncFunction cũng không khác các hàm thông thường nhiều lắm, ngoại trừ nó luôn luôn `return` một promise.  Nếu trong code không `return` một promise nào cả, thì một promise mới được resolve với giá trị được `return` trong code (sẽ là `undefined` nếu không có giá trị nào được return).

Và vì là một promise được trả về, chúng ta có thể dùng nó với callback như các promise khác:

```javascript
fname().then(console.log);
// Kết quả:
// 1
```

Nếu trong trường hợp hàm async trả về một promise, thì càng tốt, không cần phải chuyển đổi giá trị thành promise được resolve nữa, khi đó, thực ra `async` có hay không cũng như nhau cả:

```javascript
another_func = async () => Promise.resolve(2);
another_func().then(console.log);
// Kết quả:
// 2
```

Vậy là keyword `async` luôn đảm bảo một hàm sẽ trả về một promise. Tất nhiên, một hàm không async cũng có thể trả về một promise cũng không sao cả.  Nhưng `async` còn cho chúng ta một khả năng tuyệt vời hơn: sử dụng `async` kết hợp với `await`.

## Await

Câu lệnh `await` sẽ giúp chúng ta "tạm dừng" việc thực thi các code trong một hàm async, chờ cho đến khi promise được resolve thì mới tiếp tục thực thi các code đó với giá tị được resolve.  Keyword `await` chỉ có thể hoạt động bên trong một hàm async, nếu chúng ta gọi nó ở chỗ khác thì sẽ gặp lỗi `SyntaxError`.  Cũng dễ hiểu thôi, phải ở bên trong một hàm thì mới có thể xác định được phạm vi code được để mà tạm dừng.  Nếu chúng ta gọi `await` ở một nơi toàn cục chẳng hạn, rõ ràng là không thể xác định được code nào cần tạm dừng vì phạm vi quá rộng.

Sự kết hợp với `async` và `await` giúp chúng ta đơn giản hoá code với các hoạt động bất đồng bộ (kết hợp với promise).  Vì promise sẽ dễ dàng kết hợp với callback, `async` và `await` giúp chúng ta code đơn giản hơn bằng cách kết hợp generator và promise.  Chúng ta hãy xem xét ví dụ sau:

```javascript
(async function() {
    const promise = new Promise(resolve => setTimeout(() => resolve(1), 1000));
    await promise;
    console.log('done');
})();
```

Trong đoạn code trên, sau 1 giây, trên console sẽ hiển thị `1`.  Hàm async của chúng ta đã được tạm dừng khi gặp câu lệnh `await`, và chờ 1 giấy cho promise được resolve và tiếp tục thực thi với kết quả được trả về.

Bằng cách này, chúng ta có thể code bất đồng bộ theo phong cách tuần tự tương tự như các hoạt động đồng bộ mà không cần phải dùng callback. Điều đó giúp code dễ đọc và dễ hiểu hơn.  Thậm chí chúng ta có thể sử dụng `await` nhiều lần nếu muốn nhiều hoạt động bất đồng bộ diễn ra lần lượt (như ở phần trước, chúng ta cần đến promise chain).

Ví dụ load script nếu chuyển sang sử dụng async await có thể chuyển thành như sau:

```javascript
(async function(){
    await loadScript('//code.jquery.com/jquery-3.3.1.min.js');
    await loadScript('//cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js');
    ...
})();
```

Một điều thú vị là `await` đúng ra phải đi kèm với promise, nhưng về mặt code thì không cần phải làm như vậy.  Trong trường hợp phía sau `await` là một giá trị, nó sẽ được hiểu là một promise được resolve với giá trị đó.

```javascript
(async function(){
    const x = await 1;
    console.log(x);
})()
// Kết quả:
// 1
```

Và vì bản chất hoạt động bất đồng bộ là sử dụng một stack nên các đoạn code phía sau `await` đều được thực thi sau các code đồng bộ khác:

```javascript
(async function(){
    console.log(1)
    const x = await 2;
    console.log(x);
})()
console.log(3);
// Kết quả:
// 1
// 3
// 2
```

Lệnh `await` sẽ chờ promise được resolve và trả về kết quả được resolve đó (và sẽ tự convert một giá trị thành promise).  Nhưng trong trường hợp promise bị reject, thì nó sẽ trả về một exception.

```javascript
(async function() {
    const x = await Promise.reject(1);
    console.log(x);
})();
// Kết quả:
// Uncaught (in promise) 1
```

Chúng ta sẽ tìm hiểu thêm về việc xử lý khi gặp lỗi trong phần sau.

## Phương thức `async`

Trong phần trước chúng ta đã tìm hiểu về hàm `async`, với cú pháp ES2015, chúng ta có thể thêm `async` và trước các phương thức của một class để biến nó thành phương thức `async`.

Về cơ bản, cách hoạt động của phương thức `async` cũng không khác nhiều so với hàm.  Ví dụ:

```javascript
class Restaurant {
    async takeOrder() {
        return await Promise.resolve(1);
    }
}
(async function() {
    const x = await (new Restaurant).takeOrder();
    console.log(x);
})();
// Kết quả:
// 1
```

Lưu ý rằng, với tư tưởng thiết kế khác nhau, `async/await` hoạt động rất khác với promise chain.  Cơ chế "tạm dừng - chạy tiếp" của nó nhiều lúc có thể khiến hai promise được chạy một cách song song như ví dụ sau:

```javascript
var resolveAfter2Seconds = function() {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function() {
            resolve(20);
            console.log("slow promise is done");
        }, 2000);
    });
};

var resolveAfter1Second = function() {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function() {
            resolve(10);
            console.log("fast promise is done");
        }, 1000);
    });
};

(async function() {
    console.log('==CONCURRENT START with await==');
    const slow = resolveAfter2Seconds();
    const fast = resolveAfter1Second();

    console.log(await slow);
    console.log(await fast);
})();
```

Trong hàm async ở trên, cả `slow` và `fast` đều được tạo ra và `await`.  Hai promise tương ứng đều được thực thi nhưng `await` đã tạm dừng chúng lại và nó chỉ thực thi tiếp khi promise được resolve.  Vì vậy với đoạn code trên, nó sẽ mất 2 giây để thực thi, và việc thực thi await là lần lượt nên kết quả của `slow` và `fast` sẽ lần lượt xuất hiện.

Trong trường hợp này, cách hoạt động của nó giống với `Promise.all` nhiều hơn.  Nếu muốn một hoạt động song song thực sự thì `await` không phải là lựa chọn tốt, mà cách tốt nhất là sử dụng `Promise.then`, khi đó, promise nào kết thúc trước sẽ xuất hiện kết quả trước.

```javascript
(function() {
    console.log('==PARALLEL with Promise.then==');
    resolveAfter2Seconds().then(console.log);
    resolveAfter1Second().then(console.log);
})()
```

## Viết lại promise chain bằng `async/await`

JavaScript hiện nay có `fetch` API sẽ gửi truy vấn đến 1 URL và trả kết quả về là một promise.  Promise được trả về này hoàn toàn có thể được sử dụng bởi promise chain, ví dụ như sau:


```javascript
(function() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(json => console.log(json))
})();
// Kết quả
// {
//     userId: 1,
//     id: 1,
//     title: "sunt aut facere repellat provident occaecati...",
//     body: "quia et suscipit recusandae consequuntur..."
// }
```

Hoàn toàn có thể được viết lại bằng `async/await` như sau:

```javascript
(async function() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const json = await response.json();
    console.log(json);
})();
```

## Xử lý lỗi

Trong những phần trên, chúng ta mới chỉ quan tâm đến `aysnc/await` khi mà mọi việc đều diễn ra bình thường, nghĩa là promise hoạt động và resolve một kết quả.  Thế nhưng, trong trường hợp promise bị reject, với những code thông thường thì một exception sẽ xảy ra, và với hàm async thì mọi chuyện cũng giống như vậy:

Đoạn code này

```javascript
(async function() {
    await Promise.reject(new Error());
})();
```

cũng giống như đoạn code này

```javascript
(async function f() {
    throw new Error();
})();
```

đều sẽ cho ra một exception

```javascript
Uncaught (in promise) Error
```

Và cũng giống như những hàm thông thường khác, chúng ta có thể sử dụng `try..catch` để xử lý khi gặp những exception này:

```javascript
async function() {
    try {
        const result = await doSomething();
        const newResult = await doSomethingElse(result);
        const finalResult = await doThirdThing(newResult);
        console.log(`Got the final result: ${finalResult}`);
    } catch(error) {
        failureCallback(error);
    }
}
```

Trong nhiều trường hợp, một promise có thể sẽ mất thời gian thực thi rồi mới bị reject vì vậy, exception cũng phải chờ một lúc mới xảy ra.

```javascript
(async function() {
    try {
        let response = await fetch('http://no-such-url');
    } catch(err) {
        console.log(err);
    }
})();
```

Trong trường hợp hàm async, `try..catch` cũng hoạt động giống như các hàm thông thường khác, khi gặp exception, code của `catch` gần nhất sẽ được thực thi.  Tuy nhiên, chúng ta không thể sử dụng `try..catch` ở bên ngoài hàm async được, cũng giống như chúng ta không thể `try..catch` với promise vậy:

```javascript
async function f() {
    return await fetch('http://no-such-url');
};

try {
    f()
} catch(err) {
    console.log(err);
}
// try catch này không có tác dụng
// exception vẫn cứ xảy ra mà không bị catch
```

Nếu muốn xử lý exception ở bên ngoài hàm async thì chúng ta vẫn có thể sử dụng cơ chế callback thông thường với `Promise.catch` hoặc `Promise.then(null, function)`.  Bởi vì hàm async sẽ trả về một promise, chúng ta dễ dàng sử dụng cơ chế này:

```javascript
async function f() {
    return await fetch('http://no-such-url');
};

f().catch(console.log);
```

# Kết luận

Cặp keyworkd `async/await` cho chúng ta cơ chế "tạm dừng - chạy tiếp" rất hay, giúp công việc code bất đồng bộ dễ dàng hơn bao giờ hết.  Giờ đây, chúng ta có thể code bất đồng bộ không khác
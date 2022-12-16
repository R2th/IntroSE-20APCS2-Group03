# Generator functions

## Tại sao có hàm này?

Có 2 lý do chính:

1. Trừu tượng hóa iterables ở mức cao hơn

2. Tạo nên một cơ chế mới để giải quyết những vấn đề như "callback-hell"

Chi tiết cho các lý do trên:

### #1. Một wrapper cho iterables

Thay vì tạo một đối tượng/class `iterable` theo những quy tắc ở bài viết trước ([Symbols, Iterators trong Javascript](https://viblo.asia/p/symbols-iterators-trong-javascript-YWOZrgOYlQ0)), chúng ta có thể đơn giản hóa bằng cách sử dụng phương thức Generator:

Dưới đây là một vài điểm chính về Generators:

1. Các phương thức Generator trong một class có cú pháp: `*<myGenerator>`. Các hàm Generator được khai báo như sau: `function * myGenerator () {}`.
2. Việc gọi `myGenerator ()` sẽ đồng thời trả về một đối tượng `generator`, cũng như một `iterator`.
3. Generators sử dụng `yield` để trả về data.
4. Câu lệnh `yield` giữ bản ghi của những lời gọi trước và tiếp tục các câu lệnh tiếp theo.
5. Nếu sử dụng `yield` bên trong một vòng lặp thì nó chỉ được chạy một lần mỗi khi gọi phương thức `next` của iterator.

Ví dụ 1:Đoạn code dưới đây mô tả việc sử dụng phương thức generator (`*getIterator()`) thay cho việc sử dụng phương thức `Symbol.iterator` và định nghĩa phương thức `next` theo các quy tắc.

[![Using generators inside a Class](https://cdn-images-1.medium.com/max/1600/1*f9THoudk_sAkuJ1S-DdHUg.png)](https://cdn-images-1.medium.com/max/1600/1*f9THoudk_sAkuJ1S-DdHUg.png)

Ví dụ 2:
Chúng ta có thể đơn giản hóa hơn nữa bằng việc sử dụng hàm `function *` và câu lệnh `yield` như bên dưới:

[![Using Generators directly as functions](https://cdn-images-1.medium.com/max/1600/1*UhVsxr12_HBOtkF1_AB64Q.png)](https://cdn-images-1.medium.com/max/1600/1*UhVsxr12_HBOtkF1_AB64Q.png)

**Chú ý quan trọng**: Ở các ví dụ trên, mặc dù `allUsers` được sử dụng như một iterator nhưng về bản chất thì nó là một đối tượng `generator`.
 Đối tượng generator có những phương thức khác ngoài `next` như `throw`  và `return`.

###  #2. Cung cấp một cơ chế mới hơn và tốt hơn.

Generator giúp chúng ta viết code theo những cách hoàn toàn mới và giải quyết các vấn đề kiểu như `callback hell`.

Khác với một hàm thông thường, hàm generator có thể `yield` (lưu `state` của hàm và trả về `value`), đồng thời nhận thêm thêm những giá trị đầu vào khác tại nơi nó đã `yield`

Ở bức ảnh sau, mỗi khi sử dụng `yield`, nó sẽ trả về giá trị. Chúng ta có thể sử dụng `generator.next(“some new value”)` và truyền vào giá trị mới tại thời điểm mà nó đã `yield`.

[![Normal function vs Generator function](https://cdn-images-1.medium.com/max/1600/1*uYrMy6BZQlDO11rS7wOJZg.png)](https://cdn-images-1.medium.com/max/1600/1*uYrMy6BZQlDO11rS7wOJZg.png)

Một ví dụ cụ thể cho luồng hoạt động trên:

[![Generator control flow](https://cdn-images-1.medium.com/max/1600/1*dZ5nGoyU3MHmQ2qREGRvuw.png)](https://cdn-images-1.medium.com/max/1600/1*dZ5nGoyU3MHmQ2qREGRvuw.png)

## Cú pháp và cách sử dụng Generator

Hàm generator có thể được khai báo và sử dụng như sau:

[![Generator Usage](https://cdn-images-1.medium.com/max/1600/1*_nJM_kUVWrljrAsSBu3Ngw.png)](https://cdn-images-1.medium.com/max/1600/1*_nJM_kUVWrljrAsSBu3Ngw.png)

## Chúng ta có thể viết những đoạn code sau lời gọi "yield" (khác với "return")

`yield` cũng trả về giá trị giống `return` nhưng cho phép khai báo những đoạn code khác phía sau.

[![](https://cdn-images-1.medium.com/max/1600/1*7F-B-E_xNKwRRAtfSmS9gQ.png)](https://cdn-images-1.medium.com/max/1600/1*7F-B-E_xNKwRRAtfSmS9gQ.png)

## Có thể gọi yield nhiều lần

[![you can have multiple yield statements](https://cdn-images-1.medium.com/max/1600/1*o3_1UfeE8SZ82naHHY4JxQ.png)](https://cdn-images-1.medium.com/max/1600/1*o3_1UfeE8SZ82naHHY4JxQ.png)

## Truyền giá trị cho generators thông qua phương thức `next`

Phương thức `next` cũng có thể truyền giá trị trở lại generator như ví dụ dưới đây.

Thực tế, đặc tính này cho phép generator loại bỏ "callback hell".

Đây cũng là một tính năng được sử dụng nhiều bên trong các thư viện như redux-saga.

Ở ví dụ dưới đây, trong lời gọi `next()` đầu tiên, giá trị trả về là câu hỏi. Sau đó, kết quả trả về là `23` khi chúng ta truyền thêm tham số ở lời gọi thứ 2.

[![Passing value back to the generator from outside via “next”](https://cdn-images-1.medium.com/max/1600/1*YPrpj-UCevdn61G86Msq3A.png)](https://cdn-images-1.medium.com/max/1600/1*YPrpj-UCevdn61G86Msq3A.png)

## Generator giúp loại bỏ "callback hell"

Như chúng ta đã biết, một callback hell có thể xảy ra trong trường hợp có nhiều lời gọi bất đồng bộ.

Ví dụ dưới đây chỉ ra cách mà các thư viện như "co" sử dụng generator để truyền giá trị thông qua phương thức `next`. Từ đó, giúp chúng ta viết code bất đồng bộ theo cách đồng bộ hóa.

Chú ý đến cách mà hàm `co` truyền kết quả từ promise trở lại generator thông qua `next(result)` ở bước 5 và bước 10.

[![Step-by-Step explanation of libs like “co” that use `next(<someval>`](https://cdn-images-1.medium.com/max/1600/1*cR3liEi63aDOFCBYf543DQ.png)](https://cdn-images-1.medium.com/max/1600/1*cR3liEi63aDOFCBYf543DQ.png)

# Async/await

# Tại sao có từ khóa này ?

Như đã đề cập ở trên, Generators có thể giúp loại bỏ  "callback hell", nhưng lại cần một thư viện bên thứ 3 như `co`. `async/await` ra đời như một wrapper để thực hiện việc đó của Generator.

Khác nhau giữa Generators và Async/Await:

1. async/await sử dụng từ khóa `await` thay cho `yield`
2. `await` chỉ hoạt động với Promises
3. Thay vì `function*`, nó sử dụng từ khóa `async function`

Do đó, có thể nói rằng `async/await` là một đặc tính con của Generators và có cú pháp mới.

Từ khóa `async` yêu cầu bộ biên dịch Javascript xử lý hàm theo một cách khác. Bộ biên dịch sẽ dừng mỗi khi gặp từ khóa `await` được gọi bên trong hàm. Nó coi biểu thức phía sau `await` trả về một promise và đợi đến khi promise được resolve hoặc reject trước khi chạy đến các đoạn mã tiếp theo.

Ở ví dụ sau, hàm `getAmount` gọi 2 hàm bất đồng bộ là `getUser` và `getBankBalance`. Việc sử dụng `async await` sẽ trông đơn giản và gọn gàng hơn so với promise.

[![](https://cdn-images-1.medium.com/max/1600/1*RgzG4uFoO3qSoL-rML3kNA.png)](https://cdn-images-1.medium.com/max/1600/1*RgzG4uFoO3qSoL-rML3kNA.png)

# Asynce iterators

## Tại sao có từ khóa này?

Có khá nhiều trường hợp mà chúng ta cần gọi các hàm bất đồng bộ bên trong các vòng lặp. Vì vậy ở ES2018, một Symbol mới có tên `Symbol.asyncIterator` cùng cú pháp `for-await-of` được tạo ra nhằm mục đích sử dụng các hàm bất đồng bộ bên trong vòng lặp một cách dễ dàng.

Sự khác nhau chính giữa Iterator objects và Async Iterators:

## Iterator object

1. Phương thức `next` của đối tượng Iterator trả về giá trị với định dạng như `{value: ‘some val’, done: false}`
2. Cách sử dụng: `iterator.next() //{value: ‘some val’, done: false}`
## Async Iterator object
1. Phương thức `next()` của đối tượng Async Iterator trả về một Promise mà sau đó nó sẽ được xử lý thành một giá trị như sau: `{value: ‘some val’, done: false}`
2. Cách sử dụng `iterator.next().then(({ value, done })=> {//{value: ‘some val’, done: false}}`

Ví dụ sau sẽ mô tả cách hoạt động của `for-await-of`:

[![for-await-of (ES2018)](https://cdn-images-1.medium.com/max/1600/1*DtdH3gi21715BIQYCT0s9w.png)](https://cdn-images-1.medium.com/max/1600/1*DtdH3gi21715BIQYCT0s9w.png)

# Tổng kết

**Symbols**:  một kiểu dữ liệu có tính duy nhất toàn cục. Chúng ta có thể sử dụng symbol như những thuộc tính của đối tượng mà không làm ảnh hưởng tới những hàm như `Object.keys` hay vòng lặp `for-in`
Symbol phổ biến: là các symbol tự sinh bỏi JavaScript và có thể được sử dụng để định nghĩa các phương thức core bên trong những đối tượng tùy biến.

**Iterables**: là bất kỳ đối tượng nào có lưu trữ dữ liệu và tuân theo những quy tắc mà theo đó, chúng ta có thể sử dụng vòng lặp `for-of` và toán tử spread ` ...` để trích xuất dữ liệu từ đối tượng đó.

**Generators**: trừu tượng hóa mức cao hơn của Iterables. Chúng tạo ra một cơ chế mới giúp giải quyết những vấn đề như callback-hell và là nền tảng cho việc xây dựng nên `Async/Await`.

**Async/Await**: trừu tượng hóa mức cao hơn của Generators để giải quyết vấn đề callback-hell.

**Async Iterators**:  một đặc tính mới của ES2018 giúp duyệt qua một mảng bên trong các hàm bất đồng bộ để lấy về kết quả của mỗi hàm này giống như bên trong một vòng lặp thông thường.

# Tham khảo thêm:

**ECMAScript 2015+**

1. [Here are examples of everything new in ECMAScript 2016, 2017 and 2018](https://medium.freecodecamp.org/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e)

2. [Check out these useful ECMAScript 2015 (ES6) tips and tricks](https://medium.freecodecamp.org/check-out-these-useful-ecmascript-2015-es6-tips-and-tricks-6db105590377)

3. [5 JavaScript “Bad” Parts That Are Fixed In ES6](https://medium.com/@rajaraodv/5-javascript-bad-parts-that-are-fixed-in-es6-c7c45d44fd81#.7e2s6cghy)

4. [Is “Class” In ES6 The New “Bad” Part?](https://medium.com/@rajaraodv/is-class-in-es6-the-new-bad-part-6c4e6fe1ee65#.4hqgpj2uv)

### ** Lược dịch **

**rajaraodv**, *JavaScript Symbols, Iterators, Generators, Async/Await, and Async Iterators — All Explained Simply*, [Medium](https://medium.freecodecamp.org/some-of-javascripts-most-useful-features-can-be-tricky-let-me-explain-them-4003d7bbed32)
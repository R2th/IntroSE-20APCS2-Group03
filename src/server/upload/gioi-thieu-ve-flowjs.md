## 1. Mở đầu
<hr>

Đối với các bạn mới tiếp cận với Javascript hoặc đã làm việc với nó từ lầu thì đều biết được nó là ngôn ngữ dạng dynamic và weak type. Nếu bạn không biết nó nghĩa là gì thì có thể tham khảo tại [đây](https://viblo.asia/p/strong-vs-weak-static-vs-dynamic-typing-la-cai-khi-gi-JQVkVzZokyd). Tuy nhiên không giống như những ngôn  ngữ có dạng tương tự như PHP, Python mà Javascript lại sở hữu một hệ thống typing vô cùng ảo diệu và biến hóa khôn lường dẫn tới nhiều tính huống giở khóc giở cười khi làm việc với nó. Nếu muốn hiểu sâu hơn về sự ảo diệu này thì bạn có thể đọc ở [đây](https://viblo.asia/p/an-explanation-for-javascript-type-madness-naQZRbpmZvx) . Vì thế hôm nay mình sẽ hướng dẫn các bạn sử dụng một thư viện hỗ trợ cho việc kiểm tra loại dữ liệu hay còn gọi là `static type checker` cho Javascript đó chính là [FlowJS](https://flow.org/en/) một thư viện được phát triển bởi `Facebook`.

## 2. Cài đặt
<hr>

Để hỗ trợ cho các bạn trong việc nắm được nội dung cơ bản của bài viết thì trước hết chúng ta sẽ setup 1 project đơn giản để trải nghiệm `FlowJS`. 
- Đầu tiên bạn cần chắc rằng máy của mình đã được cài `NodeJS`, `npm` và `Yarn`.
- Tiếp đó chúng ta sẽ tạo 1 folder mới sau đó di chuyển vào folder đó bằng Terminal của bạn.
- Tiếp đó ta sẽ khởi tạo một project với lệnh:
```bash
$ npm init
```
Sau đó bạn nhập các thông tin cần thiết hoặc có thể bỏ qua và ấn enter liên tục cho đến khi tạo ra file `package.jon`

- Tiếp đến ta sẽ cài đặt folder `node_modules` với lệnh:
```bash
$ yarn install
```
Đợi cho quá trình tải các package thành công ta sẽ tiếp tục tạo thêm một folder mới đặt tên là `src/` và một file `index.js` nằm trong folder này. Trong file `package.json` đã tạo ra trước đó bạn cần sửa lại phần `main` để trỏ đến file `index.js` nói trên
```json
{
  "name": "flows",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
- Tiếp theo chúng ta sẽ tiến hành cài đặt thêm `Babel` để hỗ trợ việc complie code với lệnh:
```bash
$ yarn add --dev babel-cli babel-preset-flow
```
- Tiếp đến ta tạo một file `.babelrc` với nội dung như sau:
```json
{
  "presets": ["flow"]
}
```
- Cuối cùng chúng ta sẽ cài đặt `Flow` với lệnh:
```bash
$ yarn add --dev flow-bin
```
- Trước khi để có thể chạy được `Flow` ta cần tạo file config cho nó với lệnh:
```bash
$ yarn flow init
```
Lệnh trên sẽ tạo cho chúng ta một file có tên là `.flowconfig` chưa những config mà bạn muốn thêm vào. Để phục vụ cho việc demo đơn giản thì ta chỉ cần sửa lại file đó như sau:
```
[ignore]

[include]
src

[libs]

[lints]

[options]

[strict]

```
`[include] src` là cài đặt folder mà Flow sẽ kiểm tra khi ta chạy lệnh. Quá trình cài đặt đến đây là kết thúc bây giờ chúng ta sẽ bắt đầu khám phá `Flow`.

## 3. Chạy thử flows
<hr>

Đầu tiên trong file `src/index.js` mà chúng ta đã tạo ở trên ta sẽ thêm nội dung vào như sau:
```javascript
// @flow
function sayHello(name: string): void {
    console.log(`Hello ${name}`);
}

sayHello('FlowJS');
```
Mặc dù chúng ta đã config lại flow sẽ tiến hành kiểm tra type trong folder `src/` tuy nhiên Flow sẽ chỉ tiến hành check các file bắt đầu bằng:
```
// @flow 
Hoặc
/* @flow */
```
Bây giờ bạn có thể gõ lệnh:
```bash
$ yarn flow status
```
Sẽ thu được kết quả sau trên terminal:
```bash
$ yarn flow status
yarn run v1.7.0
$ /node_modules/.bin/flow status
No errors!
Done in 0.17s.
```
Vậy là `Flow` vừa tiến hành check type cho file `index.js` của chúng ta và không phát hiện lỗi nào cả. Ở đây cú pháp của `FlowJS` sẽ có dạng `variableName: type` hay tên biến sau đó mới đến kiểu dữ liệu mà ta muốn định nghĩa cho biến đó.
Nếu bạn thử sửa lại đoạn code trên và thay vì truyền vào `string` cho hàm `sayHello()` thì ta truyền thử số 1 rồi chạy lại lệnh `yarn flow status` sẽ thu được kết quả như sau:
```bash
$ yarn flow status
yarn run v1.7.0
$ /node_modules/.bin/flow status
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ src/index.js:6:10

Cannot call sayHello with 1 bound to name because number [1] is incompatible with string [2].

 [2] 2│ function sayHello(name: string): void {
     3│     console.log(`Hello ${name}`);
     4│ }
     5│
 [1] 6│ sayHello(1);
     7│

Found 1 error
error Command failed with exit code 2.
```
Đây chính là kết quả thu được trong trường hợp code của bạn gặp lỗi về kiểu dữ liệu. Đồng thời nếu bạn sử dụng `VSCode` hoặc `Sublimetext` hay bất cứ text-editor hay IDE mà bạn ưa thích đều có cách hỗ trợ cho việc phát hiện từ ngay khi bạn code. Của mình khi dùng `VSCode` với trường hợp truyền số vào hàm `sayHello()` thì sẽ có lỗi như sau:

![](https://images.viblo.asia/51f21260-43d7-4dbb-8875-90bede7683df.png)

Đến đây chúng ta đã được sử dụng thử tính năng của `FlowJS` tiếp sau đây chúng ta sẽ đi vào các khái niệm của nó.

## 4. Các kiểu dữ liệu cơ bản
<hr>

### a. Primitive Types
Mặc định `Flows` sẽ hỗ trợ chúng ta kiểm tra các kiểu dữ liệu dạng `Primitive` tương tự với trong Javascript thông thường như sau:
- Boolean
```javascript
// @flow
function acceptBoolean(myVar: boolean) {
    // ...
}
acceptBoolean(true);     // Ok
acceptBoolean(false);    // OK
acceptBoolean('foo');   // Error
```
- Number
```javascript
// @flow
function acceptNumber(myVar: number) {
    // ...
}
acceptNumber(1);       // Ok
acceptNumber(3.14);    // OK
acceptNumber('foo');   // Error
```
- String
```javascript
// @flow
function acceptsString(myVar: string) {
    // ...
}
acceptsString('hello');   // Ok
acceptsString(true);     // Error
acceptsString(1);        // Error
```
- Null
```javascript
// @flow
function acceptsNull(myVar: null) {
    // ...
}
acceptsNull(null);          // Ok
acceptsNull(undefined);     // Error
acceptsNull(true);          // Error
```
- Void (undefined): Kiểu dữ liệu dạng `undefined` trong Javascript sẽ được chuyển thành kiểu `void` trong `FlowJS`
```javascript
// @flow
function acceptsUndefined(myVar: void) {
    // ...
}
acceptsUndefined(undefined);    // Ok
acceptsUndefined();             // Ok
acceptsUndefined(true);        // Error
```
Ngoài kiểu dữ liệu `null` và `void` nói trên các kiểu dữ liệu còn lại ta đều có thể truyền tham số mặc định cho nó với dạng như sau:
```javascript
// @flow
function acceptsString(myVar: string = 'default') {
    // ...
}
```
Trong trường hợp bạn muốn hàm của mình có tham số truyền vào dạng string (hoặc boolean, number) hoặc không truyền vào gì cũng được thì có thể sử dụng cú pháp như sau:
```javascript
// @flow
function acceptsString(myVar?: string) {
    // ...
}
```
Hàm trên sẽ nhận vào 2 kiểu dữ liệu được tính là hợp lệ đó là `string` và `undefined`. 

### b. Literal Types
Ngoài việc check kiểu dữ liệu thuộc dạng `Primitive` như trên `Flow` cũng có thể kiểm tra các kiểu dữ liệu thuộc dạng hằng số như sau:
```javascript
// @flow
function acceptsTen(value: 10) {
    //
}
acceptsTen(10)       // Ok
acceptsTen(2)        // Error
acceptsTen('foo')    // Error
```
Không những check được một hằng số như trên `Flow` cho phép bạn chấp nhận một nhóm các hằng số như sau:
```javascript
// @flow
function status(status: 'success' | 'error' | 'pending') {
    //
}
status('success')  // Ok
status('pending')  // Ok
status('warning')  // Error
```

### c. Mixed Types
Giống như ví dụ ở ngay trên bên trên, ngoài việc kiểm tra đầu vào là một nhóm các hằng số, `Flow` cũng cho phép bạn kiểm tra đầu vào là một trong các kiểu dữ liệu bạn mong muốn như sau:
```javascript
// @flow
function acceptStringAndNumber(myVar: string | number) {
   //
}
acceptStringAndNumber(10)      // Ok
acceptStringAndNumber(3.14)    // Ok
acceptStringAndNumber('foo')   // Ok
acceptStringAndNumber(true)    // Error
```
Trường hợp bạn muốn nhận giá trị đầu vào là kiểu dữ liệu bất kì thì có thể sử dụng luôn kiểu `mixed`:
```javascript
// @flow
function acceptAnything(myVar: mixed) {
   //
}
acceptAnything(10)      // Ok
acceptAnything(3.14)    // Ok
acceptAnything('foo')   // Ok
acceptAnything(true)    // Ok
acceptAnything(null)    // Ok
acceptAnything()        // Ok
```

### d. Maybe Types
Tương tự với một ví dụ mà mình nói đến ở phần `Primitive`:
```javascript
// @flow
function acceptsString(myVar?: string) {
    // ...
}
```
Ví dụ trên sẽ chỉ nhận vào kiểu dữ liệu là `string` hoặc `void`. Tuy nhiên khi bạn nếu giá trị truyền vào của bạn có thể là cả `null` thì ta có thể sửa lại như sau:
```javascript
// @flow
function acceptsString(myVar: ?string) {
    // ...
}
```
Lúc này biến `myVar` có thể là `string`, `null` hoặc `void`.

### e. Function Return Types
Ngoài việc kiểm tra kiểu dữ liệu cho các biến và tham số truyền vào hàm, `Flow` còn có thể giúp ta kiểm tra kiểu dữ liệu trả về của hàm đó. Việc này giúp ta tránh được tình trạng vô tình trong quên trả về kiểu dữ liệu cần thiết cho hàm tại một lệnh rẽ nhánh nào đó. Ví dụ:
```javascript
// @flow
function method(): boolean {
  if (Math.random() > 0.5) {
    return true;
  }
}
```
Đoạn code trên khi chạy qua `Flow` sẽ báo lỗi vì `Flow` sẽ tự động phát hiện được nếu rơi vào trường hợp khác if sẽ không có kiểu dữ liệu nào được trả về cả dẫn tới vi phạm kiểu dữ liệu mong muốn là `boolean`.

### f. Non Primitive Types
Ngoài các `Primitive types` đã nói ban đầu thì tất nhiên `Flows` cũng hỗ trợ chúng ta kiểm tra các loại dữ liệu như `Array`, `Object`, `Tupple`. 
- Với `Array` cú pháp sẽ như sau:
```javascript
// @flow
function acceptArray(myVar: Array<string>) {
    //
}
// Hoặc
function acceptArray(myVar: string[]) {
    //
}
acceptArray(['foo', 'bar'])     // Ok
acceptArray([1, 'baz])          // Error
acceptArray([true, 'abc')       // Error
```
Không chỉ có thể sử dụng `Array` với đơn kiểu dữ liệu như trên mà bạn cũng có thể dùng dưới các dạng như `Primitive Types`:
```javascript
// @flow
let arr1: Array<mixed> = [1, true, 'string'];
let arr2: ?number[] = [1, 2]
let arr3: ?string[] = null
```
- Với các `Object` ta cũng có thể kiểm tra các thuộc tính của nó có đúng kiểu dữ liệu như ta mong muốn không:
```javascript
// @flow
var obj: { foo: boolean } = { foo: true };
var obj2: {
  foo: number,
  bar: boolean,
  baz: string,
} = {
  foo: 1,
  bar: true,
  baz: 'three',
};
```
- Còn `Tupple` cũng có dạng giống `Array` nhưng số lượng phần tử của nó được cố định cùng với kiểu dữ liệu của từng phần tử theo thứ tự tương ứng:
```javascript
// @flow
let tuple: [number, boolean, string] = [1, true, 'three'];
tuple[0] = 20       // Ok
tuple[1] = 'bar'    // Error
tuple[2] = 'fooo'  // Ok
```
Lưu ý khi bạn cập nhập giá trị của các phần tử trong  `Tuple` thì cũng cần phải đúng kiểu dữ liệu đã định nghĩa nếu không sẽ báo lỗi

## 5. Kết bài
<hr>

Trên đấy là bài giới thiệu của mình về việc sử dụng `Flow` và một số kiểu dữ liệu cơ bản trong nó. Nếu bạn muốn tìm hiểu sâu hơn về cái types khác thì hãy lên docs của `Flow` ở [đây](https://flow.org/en/docs/types/) để có thể tìm hiểu. Cảm ơn các bạn đã đọc bài :D
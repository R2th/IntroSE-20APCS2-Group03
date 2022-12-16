Chúng ta đã quá quen với việc viết test cho code và lợi ích của test với việc phát triển và bảo trì phần mềm.

Việc chúng ta viết test cho code của mình, giúp chúng ta tự tin khi cần phải thay đổi các phần code của mình, các test case đã được viết sẵn sẽ ngăn bạn làm hỏng mọi thứ.

Những lợi ích có thể nhiều hơn nữa: Viết test trước khi bạn viết code. Bài viết này là một bài thực hành hướng dẫn viết Test-Driven Development(TDD) với Typescript.

# TDD là gì?
Test-driven development là một phương pháp giúp lập trình viên có thể thiết kế, triển khai và kiểm thử một chức năng, khi mà chức năng đó chuẩn bị được triển khai.

Lập trình viên sẽ viết các đoạn kiểm thử trước khi bắt đầu viết code, đoạn mã kiểm thử này còn được sử dụng khi bạn bảo trì code hay thay đổi cấu trúc code khi cần. Chu trình này thường được gọi là `Red-Green-Refactor`

![](https://images.viblo.asia/a0023d25-b6fd-46a2-b38f-7f169f47a604.png)

1. Write failing test: Viết mã kiểm thử theo logic của hàm mà bạn định triển khai.
2. Make the test pass: Viết mã của hàm để nó vượt qua các tất cả các test.
3. Refactor the implementation: Cập nhật hoặc viết lại code để tăng chất lượng sản phầm. Chắc chắn rằng việc thay đổi vượt qua tất cả các bài kiểm thử mới và cũ.

# Viết kiểm thử TDD với Typescript
Chúng ta sẽ tạo một project trong thư mục `ts-tdd` để thực hiện các ví dụ:

```
$ mkdir ts-tdd
$ cd ts-tdd
$ npm init -y
$ tsc --init
```

Những câu lệnh trên chúng ta sẽ có được các file cơ bản.

Tiếp đến chúng ta sẽ tải về các thư viện cần thiết. Để viết test, chúng ta sẽ sử dụng kết hợp [mocha](https://mochajs.org/) và [chai](http://www.chaijs.com/). Tuy nhiên các thư viện này lại không làm việc trực tiếp được với Typescript, chúng ta cần thêm các thư viện hỗ trợ khác. Chúng ta cũng nên cài thêm cái gói định nghĩa, các gói này giúp IDE gợi ý, kiểm tra lỗi khi chúng ta viết code.

```shell
$ npm install --save-dev mocha chai ts-node typescript @types/chai @types/mocha
```

Trong file `package.json` chúng ta sẽ thêm một script cho việc chạy test:

```json
"scripts": {
    "test": "mocha --require ts-node/register test/**/*.ts"
},
```

Chúng ta sẽ viết các file test trong thư mục test. `--require ts-node/register` là một phần rất quan trọng, phần này đăng ký `Typescript` như một trình thông dịch với mocha để chúng ta có thể viết  các file test bằng Typescript.


-----

Giả sử chúng ta cần thiết kế một class môt tả kiểu dữ liệu có cấu trúc là `Stack`. Class sẽ có các chức năng: Khởi tạo (**constructor**), thêm một phần tử vào stack(**push**), lấy một phần tử ra từ `đỉnh` của stack và xoá nó khỏi stack(pop), lấy phần tử ở đỉnh stack mà không xoá nó(**peek**), kiểm tra stack có đang rỗ hay không(**isEmpty**), lấy kích thước hiện tại của stack(**size**).


-----

Viết test trước :D , chúng ta sẽ tạo ra và viết test trước. File test cho class Task sẽ là file `test/stack.ts`

Với nguyên tắc viết test trước, code sau, "**Đỏ**" (red) ở đâu thì chúng ta sẽ viết code để "**Xanh**"(Green) các test file.

```javascript
// test/stack.ts
import {expect} from 'chai';
import {Stack} from '../src/stack';

describe('Stack', () => {

});
```

Chúng ta thấy ngay IDE sẽ bảo lỗi ở dòng thứ 2  `import {Stack} from '../src/stack';` - Không tìm thấy module (Đỏ).

Khắc phục ngay lỗi này, tạo và export class Stack

```javascript
// src/stack.ts
export class Stack<T> {
  
}
```

Đã sửa được lỗi (Green).


-----

Test cho hàm khởi tạo khi không truyền theo tham số, độ dài của stack phải là `0`

```javascript
it('should be initialized without an initializer', () => {
    const s = new Stack<number>();
    expect(s.size()).to.equal(0);
});
```

Chúng ta sẽ thấy bị báo lỗi ở dòng thứ 3 `expect(s.size()).to.equal(0);` -> xấy dựng hàm `.size()` cho class Stack. Stack của chúng ta sẽ được xây dựng từ 1 mảng.

Hàm `size` sẽ trả lại độ dài của mảng chứa các phần tử của stack:

```javascript
export class Stack<T> {
  private _items: T[] = [];

  /**
   * @returns {number} the number of items in the stack.
   */
  size(): number {
    return this._items.length;
  }
}
```

IDE đã không còn báo lỗi nữa, chúng ta sẽ chạy thử lệnh test: `npm run test`

```shell
$ npm run test
> mocha --require ts-node/register test/**/*.ts



  Stack
    ✓ should be initialized without an initializer


  1 passing (19ms)
```
:D

-----

Test cho hàm khởi tạo có truyền vào tham số, tham số là một mảng các phần tử sẽ có trong stack. Kích thước của stack sẽ bằng với độ dài của mảng tham số.

```javascript
it('should be initialized with an initializer', () => {
  const s = new Stack<number>([1, 2, 3, 4]);
  expect(s.size()).to.equal(4);
});
```

Chúng ta chưa xây dựng hàm khởi tạo có tham số truyền vào, đó là lý do IDE báo lỗi ở dòng thứ 2 - `const s = new Stack<number>([1, 2, 3, 4]);`, như phần trên, chúng ta sẽ sửa lỗi này trong Class Stack.

```javascript
  constructor(initial: T[] = []) {
    this._items = initial;
  }
```

IDE đã không còn báo lỗi nữa, chúng ta sẽ chạy lại lệnh test:

```shell
$ npm run test

> mocha --require ts-node/register test/**/*.ts



  Stack
    Construct
      ✓ should be initialized without an initializer
      ✓ should be initialized with an initializer


  2 passing (17ms)
```

(good)


-----

Test cho phương thức `push`, thêm một phần tử vào đỉnh của stack, kích thước của phần tử sẽ phải tăng, và phần tử trên đỉnh của stack sẽ là phần tử vừa được thêm vào.

```javascript
it('should be pushed upon', () => {
  const s = new Stack<number>([1, 2, 3, 4]);
  s.push(5);
  expect(s.size()).to.equal(5);
  expect(s.peek()).to.equal(5);
});
```

Chúng ta sẽ thấy lỗi ở các dòng 3 và 5, stack không có các phương thức `push` và `peek`. Chỉ việc thêm các phương thức này vào class Stack để IDE không còn báo lỗi nữa:

```javascript
push(item: T): void {

}

peek() {

}
```

nhưng khi chạy lệnh test thì chúng ta nhận được kết quả:

```shell
  Stack
    constructor
      ✓ should be initialized without an initializer
      ✓ should be initialized with an initializer
    push
      1) should be pushed upon


  2 passing (45ms)
  1 failing

  1) Stack
       push
         should be pushed upon:

      AssertionError: expected 4 to equal 5
      + expected - actual

      -4
      +5
```

Bị sai ở test case `expect(s.size()).to.equal(5);`, lý do vì ở hàm `push` chúng ta chưa làm gì cả, tương tự hàm `peek`.

```javascript
  push(item: T): void {
    this._items.push(item);
  }

  peek() {
    return this._items[this._items.length - 1];
  }
```

Chạy test lại thì tất cả các đã pass.

-----

Tương tự, các bạn có thể tự triển khai test case và code cho các hàm còn lại: `pop`, `isEmpty` và `peek`.

# Kết luận

Với phương thức phát triền phần mềm như trên, mọi dòng code đều được đảm bảo ngay từ quy trình phát triển. Phầm mềm sẽ ít lỗi hơn, việc bảo trì sẽ dễ dàng hơn.

Hy vọng bài viết này sẽ mang tới cho các bạn hướng tiếp cận và áp dụng TDD vào dự án của mình một cách dễ dàng.

Source code: [Github](https://github.com/hoangsetup/ts-tdd)
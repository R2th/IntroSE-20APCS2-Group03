Hello 500 anh em, lại là mình đây. Chú bé coder yêu màu tím thích màu hồng và ghét sự giả dối đây :grinning::grinning::grinning: <br>
Sau một thời gian dài vắng bóng thì mình đã trở lại để chia sẽ với các bạn về một công cụ mạnh mẽ hỗ trợ cho việc viết unit test trên các ứng dụng Javascript. Đó chính là **Jest** - một công cụ hỗ trợ được xây dựng bởi anh lớn Facebook. Vậy cụ thể thì chúng ta sẽ làm được gì với Jest đây? Các bạn hãy theo dõi tiếp để biết thêm chi tiết nhé.
# Cài đặt
Để sử dụng được Jest thì tất nhiên chúng ta sẽ phải tiến hành cài đặt nó cho dự án của chúng ta đúng không nào :)<br>
Ở đây các bạn có thể dùng command `npm` hoặc `yarn` để cài đặt với combo thần thánh bên dưới.
```
npm install --save-dev jest
hoặc 
yarn add --dev jest
```
Sau đó thêm đoạn này vào file **package.json**
```json
{
  "scripts": {
    "test": "jest"
  }
}
```
Và cuối cùng các bạn chỉ việc tạo file *\*.test.js* và chạy lệnh `yarn test`. Thật là đơn giản phải không nào :wink:<br>
Ví dụ đơn giản về test hàm add 2 số.
```js
// file abc.js
const add = (a, b) => a + b;
module.exports = add;

// file abc.test.js để cùng folder với file abc.js
const add = require('./abc');
test('add two number', () => {
  expect(add(2, 2)).toBe(4);
});
```
![](https://images.viblo.asia/9c447e27-fdf9-40d8-bd84-2fd9cec17595.png)
# Matchers
Jest sử dụng "matchers" để cho phép bạn kiểm tra các giá trị theo những cách khác nhau. Dưới đây là các matchers hay gặp và cách sử dụng:
## toBe
Sử dụng toBe để kiểm tra các giá trị trả về.
```js
expect(add(2, 2)).toBe(4);
```
## toEqual
Tương tự như toBe nhưng nó được dùng để kiểm tra với dữ liệu dạng object.
```js
const add = (a, b) => ({ a, b });
test('check obj', () => {
  expect(add(2, 2)).toEqual({ a: 2, b: 2 });
});
```
## Truthiness
Trong unit test, đôi khi bạn cần phân biệt giữa undefined, null và false, nhưng đôi khi bạn không muốn xử lý chúng theo cách khác nhau. <br>
Và Jest cung cấp sẵn các helpers cho phép bạn mô tả rõ ràng về những gì bạn muốn.<br>
* toBeNull chỉ đối sánh với null
* toBeUndefined chỉ đối sánh không xác định
* toBeDefined đối lập với toBeUndefined
* toBeTruthy khớp với bất kỳ thứ gì mà câu lệnh if coi là true
* toBeFalsy khớp với bất kỳ thứ gì mà câu lệnh if coi là sai

Ví dụ
```js
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```
## Numbers
Đối với dữ liệu số thì các bạn có những hàm matchers như sau:
```js
test('Phep cong 2 voi 2', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // Với dữ liệu dạng số thì các bạn có thể dùng toBe hoặc toEqual
  // để so sánh bằng đều được
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```
## Strings
Bạn có thể kiểm tra chuỗi so với biểu thức chính quy bằng hàm toMatch().
```js
test('Khong co ky tu I', () => {
  expect('team').not.toMatch(/I/);
});

test('Co chuoi abc', () => {
  expect('Sabcdasdas').toMatch(/abc/);
});
```
## Arrays
Để kiểm tra với mảng thì các bạn cần sử dụng hàm toContain.
```js
const alphabets = [
  'a',
  'b',
  'c',
  'xxx',
  'yyy',
];

test('alphabets co chua xxx', () => {
  expect(alphabets).toContain('xxx');
});
```
## Exceptions
Để kiểm tra rằng một function nào đó throw ra lỗi lúc thực thi thì các bạn dùng hàm toThrow nhé.
```js
function divideByZero() {
  throw new Error('Ban khong duoc phep chia cho 0');
}

test('Thuc thi ham divideByZero bi loi', () => {
  expect(() => divideByZero()).toThrow();
  expect(() => divideByZero()).toThrow(Error);

  // Hoặc bạn có thể so sánh chính xác message lỗi hoặc dùng regex
  expect(() => divideByZero()).toThrow('Ban khong duoc phep chia cho 0');
  expect(() => divideByZero()).toThrow(/khong/);
});
```
Lưu ý
> Hàm throw một exception cần phải được gọi trong một hàm khác ở expect. Nếu không, quá trình toThrow sẽ không được thành công. <br>
> Cụ thể là các bạn thấy mình gọi hàm divideByZero() thông qua một arrow function trong expect(() => divideByZero()) chứ không có gọi trực tiếp expect(divideByZero()).

# Tổng kết
Trên đây là những hàm test cơ bản mình đã tìm hiểu được từ [trang chủ của Jest](https://jestjs.io/en/). Mọi thứ cũng chỉ tạm dừng ở việc test các hàm đơn giản mà thôi. Các bạn có thắc mắc gì thì cứ comment trao đổi để cùng nhau giải quyết nhé :) <br>
Ở bài sau mình sẽ giới thiệu tiếp cho các bạn về một số kỹ thuật testing nâng cao hơn như là: 
* Test các đoạn code bất đồng bộ (Asynchronous).
* Thực hiện một số việc trước và sau khi test (Setup and Teardown).
* Sử dụng mock để test các module phụ thuộc nhau (Dependency).

Cuối cùng thì mình chúc các bạn đọc bài có một năm mới với nhiều niềm vui và may mắn trong cuộc sống. Thân ái và quyết thắng :)
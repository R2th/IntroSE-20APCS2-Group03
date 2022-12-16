# Giới thiệu về Jest
Jestjs là một JavaScript Testing Framework khá là dễ sử dụng và cài đặt, tuy nhiên vẫn đầy đủ tính năng để bạn có thể sử dụng :clap:
Bài viết này mình xin giới thiệu một số tính năng cơ bản của jest cùng với một số ví dụ.
## Cài đặt
Cài đặt Jest khá đơn giản:
```
yarn add --dev jest
```
hoặc
```
npm install --save-dev jest
```

Sau đó thêm đoạn code sau vào file package.json:
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Tiếp theo mình có ví dụ một file test: `math.js`
```js
function sum(a, b) {
  return a + b;
}

const MathJS = {
  sum,
}

module.exports = MathJS;

```
Để viết test cho file trên mình tạo file `test/math.test.js`, đuôi file là test.js sẽ nói cho jest biết đây là file test của bạn.
```
const MathJS = require('../math');

it('Adds 1 + 1 to equals 2', () => {
  expect(MathJS.sum(1, 1)).toBe(2);
});

```
Sau đó chạy `yarn test` hoặc `npm run test`.

![](https://images.viblo.asia/9692954e-c671-4dcd-b028-dc188e860bea.png)

# Các Matchers trong Jest
Ở trong đoạn code trên:
```
expect(MathJS.sum(1, 1)).toBe(2);
```

`.toBe()` chính là một matcher trong jest. Nó giống như phép so sánh bằng bình thường vậy. Ví dụ:
```
expect(result).toBe(2);
expect(result).toBe(true);
expect(result).toBe({a: 1, b: 2});
```

Tuy nhiên khi so sánh một Object bạn nên sử dụng `.toEqual()`
Lý do là vì `.toBe` thực tế sử dụng `===` để so sánh và đưa ra kết quả. Và chúng ta đều biết trong javascript:
```js
a = {};
b = {};
a === b;
=> false
```
Còn `.toEqual()` theo như Jest sẽ lần lượt kiểm tra tất các trường của Object, hoặc mảng để so sánh.
Vì vậy thay vì viết:
```
expect(result).toBe({a: 1, b: 2});
```
Hãy viết:
```
expect(result).toEqual({a: 1, b: 2});
```

Ngoài ra còn các matchers khác:
### Truthiness
* `toBeNull` so sánh với giá trị `null`.
* `toBeUndefined` so sánh với giá trị `undefined`.
* `toBeDefined` là hàm cho kết quả ngược lại `toBeUndefined`.
* `toBeTruthy` so sánh với giá trị true.
* `toBeFalsy` so sánh với giá trị false.

### Numbers
```
it('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```
Đối với số thập phân, bạn nên sử dụng `toBeCloseTo`:
```
it('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```
### String
Bạn có thể kiểm tra một đoạn văn bản với regular expressions bằng `toMatch`:
```
it('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

it('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```
### Array
Để kiểm tra giá trị có trong một mảng, bạn có thể dùng toContain:
```
const array = [1, 2, 10, 1000];
it('array has 1000 on it', () => {
  expect(array).toContain(1000);
});
```
### Exceptions
Để kiểm tra một lỗi có thể xảy ra bạn có thể sử dụng `toThrow`:
```
function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
```
# Một số ví dụ
## Test một action trong redux
```
const CHANGE_EMAIL = 'CHANGE_EMAIL';

function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email
  }
}

it('should render type and email of change email action', () => {
  const email = 'test@tt.com';
  const expected = {
    type: CHANGE_EMAIL,
    email,
  }

  expect(changeEmail(email)).toEqual(expected);
});
```
## Test một event trong Jquery
```
it('should fire a alert', () => {
  const alert = jest.fn();

  document.body.innerHTML =
    '<div>' +
    '  <span id="username" />' +
    '  <button id="button" />' +
    '</div>';

  $('#button').click(() => {
    alert('click');
  });

  $('#button').click();
  expect(alert).toBeCalled();

  // the mock function is called one time
  expect(alert.mock.calls.length).toBe(1);

  // The first argument of the first call to the function was click
  expect(alert.mock.calls[0][0]).toBe('click');
});
```
Bạn có thể thấy `const alert = jest.fn();`. Đây là một tính năng trong Jest giúp bạn mock một function. Hay mô phỏng lại hàm cần test.
## Test với module axios
```
const axios = require('axios');

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: { message: 'hello' }})
}));

test('mock axios.get', async () => {
  const response = await axios.get('https://test.com/t/1');
  expect(response.data).toEqual({ foo: 'bar' });
});
```
Trong ví dụ này mình đã mock module axios, và đặt giá trị trả về cho hàm get. Như vậy khi test bạn sẽ không cần phải gửi request thật, tránh mất thời gian. Các module khác bạn cũng có thể làm cách tương tự.

> [Blog của mình](https://www.hungkieu.dev/posts/jest-react)
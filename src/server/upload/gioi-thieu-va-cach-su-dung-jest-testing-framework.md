# Jest Framework

Jest là một JavaScript Testing Framework đơn giản, dễ sử dụng và cài đặt. Có thể sử dụng Jest với project sử dụng: Babel, Typescript, Node, React, Angular, Vue, ...



### Cài đặt

Để cài đặt Jest sử dụng:

- Sử dụng npm: `npm install --save-dev jest`
- Sử dụng yarn: `yarn add --dev jest`

Thêm command code sau vào `package.json`:

```javascript
{
  "scripts": {
    "test": "jest"
  }
}
```




### Sử dụng

Sau đây mình sẽ thực hiện một ví dụ sử dụng Jest để kiểm tra một hàm thực hiện phép cộng hai số:

Tạo file `sum.js`:

```javascript
exports.sum = (a, b) => a + b;
```

Tạo file `sum.test.js`:

```javascript
const sum = require("./sum");

test('adds 1 + 1 to equal 2', () => {
    expect(sum(1,1)).toBe(2);
})
```

Sau đó lệnh `npm run test` hoặc `yarn test`, Jest sẽ in ra thông báo như sau:

```tex
PASS  ./sum.test.js
✓ adds 1 + 1 to equal 1 (3ms)
```



### Jest Matcher

Trong ví dụ trên, ta sử dụng matcher `toBe()`  để kiếm tra giá trị mong muốn so sánh với giá trị khi thực hiện hàm. Nó hoạt động tương tự như một phép so sánh thông thường:

```javascript
test('adds 1 + 1 to equal 2', () => {
    expect(sum(1,1)).toBe(2);
})
```

`toBe()` sử dụng phép so sánh `===` - `Object.is` để so sánh và đưa ra kết quả, thế nên muốn kiểm tra các trường của object hay array có giống nhau hay không, ta sử dụng `toEqual()` thay cho `toBe()`.

```javascript
expect(result).toEqual({first: 1, second: 2});
```



#### Truthiness

Trong kiểm thử, đôi khi ta cần phân biệt các giá trị `undefined`, `null` và `false` để có các xử lý khác nhau. Jest cũng cung cấp các matcher tương ứng như:

- `toBeNull` so sánh với giá trị `null`.
- `toBeUndefined` so sánh với giá trị `undefined`.
- `toBeDefined` là hàm cho kết quả ngược lại `toBeUndefined`.
- `toBeTruthy` so sánh với giá trị `true`.
- `toBeFalsy` so sánh với giá trị `false`.

Ví dụ:

```javascript
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});
```



#### Numbers

Jest cung cấp cho chúng ta tương ứng các phép so sánh:

```javascript
test('two plus two', () => {
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

Đối với số dấu chấm động, sử dụng `toBeCloseTo` thay vì `toEqual`, bởi vì độ chính xác có thể sai khác do vấn đề sai số làm tròn:

```javascript
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```



#### Strings

Có thể kiểm tra một đoạn văn bản với regular expressions bằng `toMatch`:

````javascript
test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
````



#### Arrays

Để kiểm tra giá trị có trong một mảng, dùng `toContain`:

```javascript
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});
```



 #### Exceptions

Để kiểm tra một lỗi có thể xảy ra,  ta sử dụng `toThrow`:

```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);
});
```



### Kiểm tra với Asynchronous Code



#### Callbacks

Ví dụ, giả sử bạn có hàm `fetchData(callback)` được dùng để fetchData thông qua API, sau đó gọi `callback(data)` khi hoàn thành để sử lý. Bạn cần kiểm tra xem data trả về có phải chuỗi `hello world` hay không?

Mặc định, Jest sẽ hoàn thành kiểm tra sau khi chúng kết thúc quá trình thực thi:

```js
// Don't do this!
test('the data is hello world', () => {
  function callback(data) {
    expect(data).toBe('hello world');
  }

  fetchData(callback);
});
```

Vấn đề nằm ở chỗ `test` sẽ luôn hoàn thành ngay khi khi `fetchData` hoàn thành, trước khi `callback` được gọi.

Để khác phục điều đó, thay vì sử dụng `test` không tham số, ta sử dụng thêm một tham số `done` . Jest sẽ chờ  đến khi nào `done` callback được thực thi  sau đó mới kết thúc bài kiểm thử.

```js
test('the data is hello world', done => {
  function callback(data) {
    try {
      expect(data).toBe('hello world');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

Lưu ý: Nếu `done()` không được gọi, hàm sẽ trả về kết quả kiểm thử là fail (với lỗi timeout error)

Nếu  lệnh `expect` fail, nó sẽ trả về lỗi và `done()` sẽ không được thực thi. Nếu như muốn xem lỗi test log là gì, ta sẽ bọc `expect` trong khối lệnh `try` và truyền error trong `catch` để thực thi `done`. Nếu không ta sẽ luôn nhận được lỗi timeout error.



#### Promises

Nếu code sử dụng Promise có một cách đơn giản hơn để xử lý các bài kiểm tra không đồng bộ. Return một Promise từ bài kiểm tra và Jest sẽ chờ cho Promise được thực thi. Nếu Promise bị reject bài kiểm tra sẽ trả về fail.

Ví dụ:

```js
test('the data is hello world', () => {
  return fetchData().then(data => {
    expect(data).toBe('hello world');
  });
});
```

Lưu ý: Luôn chắc chắn rằng return về một Promise. Nếu quên `return` , test sẽ được hoàn thành trước khi Promise trả ra trong hàm `fetchData` resolve.

Sử dụng  phương thức `.catch` nếu mong muốn Promise sẽ được reject. 

```js
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```



#### `.resolves` / `.rejects`

Có thể sử dụng `resolves` matcher để Jest đội đến khi Promise được resolve. Nếu Promise reject, test sẽ trả về fail.

```js
test('the data is hello world', () => {
  return expect(fetchData()).resolves.toBe('hello world');
});
```

Nếu mong muốn Promise reject, sử dụng `rejects` matcher. Nó hoạt động tương tự `resolves`. Nếu Promise hoàn thành, test sẽ trả về fail.

```js
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
```



#### Async/Await

Để sử dụng async test, sử dụng `async` keyword trước function truyền vào test. Ví dụ:

```js
test('the data is hello world', async () => {
  const data = await fetchData();
  expect(data).toBe('hello world');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```



> Reference: 
>
> - [Jest · 🃏 Delightful JavaScript Testing (jestjs.io)](https://jestjs.io/)
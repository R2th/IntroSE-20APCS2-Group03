# Giới thiệu về Jest

 Jest là JavaScript Testing Framework được tạo bởi Facebook do Christoph Nakazawa thiết kế và xây dựng.
Nó hoạt động với các dự án sử dụng Babel, TypeScript, Node, React, Angular, Vue ...

# Cài đặt
### Cài đặt jest khá đơn giản
Sử dụng yarn 
```
yarn add --dev jest
```
Sử dụng npm
```
npm install --save-dev jest
```
Tiếp theo, hãy tạo 1 file có tên là `sum.js` với nội dụng
```
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```
Sau đó, là file `sum.test.js` để kiểm tra kết quả của function sum
```
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
``` 
Tiếp đến, thêm dòng sau vào file `package.json` 
```
{
  "scripts": {
    "test": "jest"
  }
}
```
Cuối cùng. hãy chạy lệnh `yarn test`  hoặc `npm run test` ta được kết quả như sau :
```
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```
Chúc mừng mọi người, ví dụ test của bạn bằng jest đã thành công.
# Using Matchers
### Common Matchers
Cách đơn giản nhất để kiểm tra giá trị, ta đến với vị dụ sau đây :
```
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```
Ở đoạn code trên toBe(4) là 1 matcher. Tuy nhiên, khi sử dụng để so sánh giữa các object với nhau thì hãy sử dụng toEqual.Vì toBe sử dụng `===` để so sánh và đưa ra kết quả.Mà như chúng ta đã biết với js 
```
a = { master: 10 };
b = { master: 10 };
a === b
===> false
```
Vậy nên khi so sánh các object, mảng thì ta nên sử dụng toEqual, ta có ví dụ, mọi người hãy làm thử để xem kết quả như nào nhé :
```
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```
Ngoài ra, ta còn có thể sử dụng not.ToBe() ( ngược lại với trường hợp toBe() )
```
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```
###  Truthiness
Ở một số trường hợp, chúng ta cần phân biệt giữa `null`,`undefined`,`false`nhưng đôi khi bạn không muốn xử lý chúng theo cách khác nhau. Jest chứa những function cho phép bạn trả về những kết quả bạn muốn.

`toBeNull`  hàm  so sánh với giá trị `null`.

`toBeUndefined` hàm so sánh với giá trị `undefined`.

`toBeDefined` là hàm cho kết quả ngược lại `toBeUndefined`.

`toBeTruthy` so sánh với giá trị `true`.

`toBeFalsy` so sánh với giá trị `false`.

Dưới đây là một số ví dụ :
```
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
###  Numbers
Jest hỗ trợ hầu hết các phép so sánh giữa các số.
```
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
Trường hợp, số thập phân ta nên sử dụng `toBeCloseTo` thay vì `toEqual`
```
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           trường hợp này bị lỗi do làm tròn
  expect(value).toBeCloseTo(0.3); // trường hợp này đúng.
});
```
###  Strings
Bạn có thể kiểm tra một đoạn văn bản với regular expressions bằng `toMatch`:

```
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```
###  Arrays and iterables
Bạn có thể sử dụng `toContain` để kiểm tra phần tử có thuộc Arrays hoặc iterables :
```
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
### Exceptions
Nếu bạn muốn kiểm tra bất cứ hàm nào phát sinh ra lỗi khi được gọi, hãy sử dụng `toThrow` :
```
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
# Testing Asynchronous Code
### Callbacks
```
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```
### Promises
Nếu code của bạn có sử dụng promises, ta vẫn có thể xử lý nó với jest
```
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```
### Async/Await
Ngoài ra bạn có thể sử dụng async, await trong các test case của mình.Dưới đây là ví dụ cụ thể.
```
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
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
Bạn cũng có thể sử dụng `async`, `awai` cùng `.resolves`,`.rejects`
```
test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toMatch('error');
});
```
# Setup and Teardown
Thông thường, bạn cần phải thiết lập một số yếu tố trước khi chạy các test.Jest cũng cung cấp các chức năng trợ giúp để xử lý việc này.
### Repeating Setup For Many Tests
Đối với những trường hợp, việc kiểm tra cần lặp đi lặp lại nhiều lần.Nếu bạn cần phương thức để thiết lập trước và sau mỗi lần kiểm tra thì hãy tham khảo ví dụ dưới đây.Bạn có thể sử dụng `beforeEach` và `afterEach`.
```
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```
### One-Time Setup
Một số trường hợp xảy ra, bạn chỉ cần thiết lập một lần duy nhất. Jest cung cấp `beforeAll` và `afterAll` để xử lý tình huống này.
```
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```
### Scoping
Mặc định, `before` và `after` được sử dụng đối với tất cả các trường hợp test trong file. Như vậy ,đối với trường hợp bạn chỉ muốn thiết lập cho một nhóm các trường hợp test thì ta có thể sử dụng `describe` để xử lý.
```
// Applies to all tests in this file
beforeEach(() => {
  return initializeCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

describe('matching cities to foods', () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test('Vienna <3 veal', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});
```
# Mock Functions
### Using a mock function
Để minh họa cho việc mock function ta có ví dụ sau :
```
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
```
```
const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);

// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// The first argument of the second call to the function was 1
expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
expect(mockCallback.mock.results[0].value).toBe(42);
```
### Mock Return Values
Bạn cũng có thể mock các giá trị trả về của hàm 
```
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```
### Mocking Modules
```
// users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;
```
```
// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});
```
### Mock Implementations
```
const myMockFn = jest.fn(cb => cb(null, true));

myMockFn((err, val) => console.log(val));
// > true
```

```

// foo.js
module.exports = function () {
  // some implementation;
};

// test.js
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');

// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42
```
```
const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > false
```
###  Custom Matchers
```
// The mock function was called at least once
expect(mockFunc).toHaveBeenCalled();

// The mock function was called at least once with the specified args
expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

// The last call to the mock function was called with the specified args
expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

// All calls and the name of the mock is written as a snapshot
expect(mockFunc).toMatchSnapshot();
```
  Và tất cả những gì ở trên là những phần tổng quan về jest mà mình tìm hiểu được, hy vọng bài chia sẻ của mình giúp các bạn có thể vận dụng jest theo mục đích của mình :smiley: .
# Giới thiệu
Chắc hẳn không ai phủ nhận rằng **UnitTest** là 1 phần quan trọng trong giai đoạn phát triển phần mềm, đảm bảo cho code được coverage tránh các bug không mong muốn. Và mock là một công đoạn không thể thiếu khi viết UnitTest. 
**Mock** là 1 kĩ thuật để thay thế các dependencies của chủ thể muốn test (subject) mà chúng ta có thể định nghĩa cách thức nó hoạt động hoặc kết quả trả về. Trong bài viết này, mình xin giới thiệu với các bạn về 1 thư viện thường được các frontend developer sử dụng để mock, đó chính là **Jest**. 

# Jest Mocks
## Mock Function
Mục tiêu của mock là để thay thế những thứ chúng ta không thể kiểm soát bằng những thứ chúng ta có thể kiểm soát, do đó chúng ta sẽ nên biết những tính năng cần thiết để thực hiện công việc này.
Các tính năng mà mock có thể thay thế:
* Các API calls
* Áp đặt các kết quả trả về
* Thay đổi cách thức hoạt động của function

Cách đơn giản nhất để tạo 1 Mock Function instance là sử dụng jest.fn()
Bằng cách này, chúng ta có thể dễ dàng test các function

```javascript

test("returns undefined by default", () => {
  const mock = jest.fn();

  let result = mock("foo");

  expect(result).toBeUndefined();
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenCalledWith("foo");
});
```

chúng ta có thể thay đổi giá trị trả về, cách hoạt động hoặc cách promise được resolved

```javascript
test("mock implementation", () => {
  const mock = jest.fn(() => "bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});

test("also mock implementation", () => {
  const mock = jest.fn().mockImplementation(() => "bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});

test("mock implementation one time", () => {
  const mock = jest.fn().mockImplementationOnce(() => "bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");

  expect(mock("baz")).toBe(undefined);
  expect(mock).toHaveBeenCalledWith("baz");
});

test("mock return value", () => {
  const mock = jest.fn();
  mock.mockReturnValue("bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});

test("mock promise resolution", () => {
  const mock = jest.fn();
  mock.mockResolvedValue("bar");

  expect(mock("foo")).resolves.toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});
```

## Dependency Injection
Một trong những cách hay được sử dụng là truyền trực tiếp các argument vào function mà bạn đang test, việc này cho phép bạn test chủ thể dễ dàng, assert cách mà mock function được gọi với những argument nào.

```javascript
const doAdd = (a, b, callback) => {
  callback(a + b);
};

test("calls callback with arguments added", () => {
  const mockCallback = jest.fn();
  doAdd(1, 2, mockCallback);
  expect(mockCallback).toHaveBeenCalledWith(3);
});
```

Cách tiếp cận này rất rõ ràng, dễ hiểu, dễ test (còn được gọi là SOLID) nhưng yêu cầu code của bạn phải hỗ trọ dependency injection. Nhưng thực tế thì nhiều code trong nhiều dự án không hỗ trợ, do đó Jest hỗ trợ việc mock các module và function không cần thông qua DI.

## Các cách mocks với Jest
Có 3 loại mock được Jest hỗ trợ:
* jest.fn: Mock 1 function
* jest.mock: Mock 1 module (trong 1 file)
* jest.spyOn: Spy hoặc mock 1 function

Giả sử chúng ta có 1 project với cấu trúc như sau:


├ example/

| └── app.js

| └── app.test.js

| └── math.js



Với ví dụ này, chúng ta sẽ test app.js và có thể sẽ giả lập cách các function trong math.js hoạt động, hoặc spy cách nó hoạt động. (ví dụ khá đơn giản để chúng ta có thể dễ dàng hiểu, trong thực tế thì math.js có thể là các function tính toán phức tạp, đôi khi chứa đựng các external API, file IO, ..)

```javascript
//math.js
export const add      = (a, b) => a + b;
export const subtract = (a, b) => b - a;
export const multiply = (a, b) => a * b;
export const divide   = (a, b) => b / a;
```

```javascript
//app.js
import * as math from './math.js';

export const doAdd      = (a, b) => math.add(a, b);
export const doSubtract = (a, b) => math.subtract(a, b);
export const doMultiply = (a, b) => math.multiply(a, b);
export const doDivide   = (a, b) => math.divide(a, b);
```

### Mock 1 function với jest.fn
1 cách cơ bản để mock là assign lại 1 function bằng Mock Funciton. Vì vậy, bất cứ khi nào function được mock được gọi, thì mock function sẽ được sử dụng thay vì là function gốc ban đầu.
```javascript
//mock_jest_fn.test.js
import * as app from "./app";
import * as math from "./math";

math.add = jest.fn();
math.subtract = jest.fn();

test("calls math.add", () => {
  app.doAdd(1, 2);
  expect(math.add).toHaveBeenCalledWith(1, 2);
});

test("calls math.subtract", () => {
  app.doSubtract(1, 2);
  expect(math.subtract).toHaveBeenCalledWith(1, 2);
});
```

### Mock 1 module với jest.mock
1 cách tiếp cận được sử dụng nhiều hơn là dùng jest.mock để tự động mock tất cả export functions của 1 module. Khi gọi jest.mock('./math.js') tương đương với 
```javascript
export const add      = jest.fn();
export const subtract = jest.fn();
export const multiply = jest.fn();
export const divide   = jest.fn();
```
Từ đó, chúng ta có thể coi các exported function từ module là 1 mock function và mock theo cách mà ta muốn.
```javascript
//mock_jest_mock.test.js
import * as app from "./app";
import * as math from "./math";

// Set all module functions to jest.fn
jest.mock("./math.js");

test("calls math.add", () => {
  app.doAdd(1, 2);
  expect(math.add).toHaveBeenCalledWith(1, 2);
});

test("calls math.subtract", () => {
  app.doSubtract(1, 2);
  expect(math.subtract).toHaveBeenCalledWith(1, 2);
});
```

Cách tiếp cận này được thực hiện tự động nếu set automock: true
Điểm yếu của nó là chúng ta khó có thể dùng function gốc của module đó, trong trường hợp đó, ta có thể dùng spyOn.

### Spy or mock 1 function với jest.spyOn

Đôi khi bạn chỉ muốn xem cách 1 method được gọi, nhưng vẫn giữ original implementation. Hoặc bạn muốn mock cách function được implementation nhưng sau đó phục hồi function gốc sau đó. jest.spyOn được sinh ra dành cho trường hợp này.
Ở đây, chúng ta chỉ đơn giản "spy" cách math function được gọi, nhưng vẫn giữ nguyên cách nó được implement. Cách này rất hữu ích khi bạn muốn test các side-effect xảy ra khi function được gọi mà không thay thế cách nó thực sự hoạt động.
```javascript
mock_jest_spyOn.test.js
import * as app from "./app";
import * as math from "./math";

test("calls math.add", () => {
  const addMock = jest.spyOn(math, "add");

  // calls the original implementation
  expect(app.doAdd(1, 2)).toEqual(3);

  // and the spy stores the calls to add
  expect(addMock).toHaveBeenCalledWith(1, 2);
});
```

Trong trường hợp khác, bạn có thể muốn mock cách function được implement, nhưng sau đó phục hồi. Cách này hữu ích khi bạn muốn test trong cùng 1 file. 

```javascript
//mock_jest_spyOn_restore.test.js
import * as app from "./app";
import * as math from "./math";

test("calls math.add", () => {
  const addMock = jest.spyOn(math, "add");

  // override the implementation
  addMock.mockImplementation(() => "mock");
  expect(app.doAdd(1, 2)).toEqual("mock");

  // restore the original implementation
  addMock.mockRestore();
  expect(app.doAdd(1, 2)).toEqual(3);
});
```

Điểm lưu ý quan trọng ở đây là chúng lưu lại original function, sau đó mock implementation function đó, cuối cùng có thể phục hồi function gốc bằng biến đã lưu trước đó.
```javascript
//mock_jest_spyOn_sugar.js 
import * as app from "./app";
import * as math from "./math";

test("calls math.add", () => {
  // store the original implementation
  const originalAdd = math.add;

  // mock add with the original implementation
  math.add = jest.fn(originalAdd);

  // spy the calls to add
  expect(app.doAdd(1, 2)).toEqual(3);
  expect(math.add).toHaveBeenCalledWith(1, 2);

  // override the implementation
  math.add.mockImplementation(() => "mock");
  expect(app.doAdd(1, 2)).toEqual("mock");
  expect(math.add).toHaveBeenCalledWith(1, 2);

  // restore the original implementation
  math.add = originalAdd;
  expect(app.doAdd(1, 2)).toEqual(3);
});
```


# Kết bài
Như vậy, ở bài viết này chúng ta cơ bản đã hiểu được cách mà 1 mock function hoạt động và các cách tiếp cận mà Jest cung cấp để mock 1 function. Hi vọng bài viết hữu ích cho những bạn mới bắt đầu tìm hiểu về Jest testing. Cảm ơn các bạn đã đọc bài!
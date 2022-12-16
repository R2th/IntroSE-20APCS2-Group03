Chào các bạn, lại một tháng nữa trôi qua và mình vẫn lại lên đây để chém gió như mọi khi nữa rồi :). Sau khi [phần 1](https://viblo.asia/p/testing-trong-javascript-voi-jest-phan-1-LzD5d2JwZjY) ra lò với biết bao sóng gió thì hôm nay mình sẽ tiếp tục cho lên sóng phần 2 của loạt bài viết về **Testing trong Javascript với Jest** với hy vọng dùng tấm thân nhỏ bé này để giúp các bạn hiểu thêm về **Mr. Jest**.<br>
Bây giờ hãy cùng tìm hiểu thôi nào các bạn.
# Testing Asynchronous Code
Như các bạn đã biết, việc code chạy không đồng bộ là điều phổ biến trong JavaScript. Khi bạn có code chạy không đồng bộ, Jest cần biết khi nào đoạn code mà nó đang kiểm tra đã hoàn thành, trước khi nó có thể chuyển sang kiểm tra khác. Jest có một số cách để xử lý điều này.
## Promises
Một ví dụ điển hình của asynchronus là Promise.<br>
Nếu code của bạn sử dụng các Promis hãy return lại một Promise từ hàm test(), và Jest sẽ đợi Promise đó được giải quyết. Nếu Promise bị rejected, hàm test() sẽ tự động thất bại.
```js
function checkIsAdult(age) {
    return new Promise((resolve, reject) => {
        if (age >= 18) resolve('Da tren 18, an ngon nhoe');
        reject('Chua an duoc, can than boc lich');
    });
}

test('kiem tra truong thanh thanh cong', () => {
  return checkIsAdult(20).then(data => {
    expect(data).toBe('Da tren 18, an ngon nhoe');
  });
});
```
Nếu bạn mong đợi một Promise bị rejected, hãy sử dụng hàm `.catch` kết hợp thêm `expect.assertions();` bên trong hàm test của bạn.
```js
test('kiem tra truong thanh that bai', () => {
  expect.assertions(1);
  return checkIsAdult(13)
    .catch(e => expect(e.message)
    .toMatch('Chua an duoc, can than boc lich'));
});
```
Hoặc bạn cũng có thể dùng expect().resolves hoặc expect().rejects để match với từng trường hợp của Promise mà bạn mong muốn.
```js
test('kiem tra truong thanh thanh cong voi resolves', () => {
  return expect(checkIsAdult(20))
      .resolves
      .toBe('Da tren 18, an ngon nhoe');
});

test('kiem tra truong thanh that bai voi rejects', () => {
  return expect(checkIsAdult(13))
      .rejects
      .toEqual(new Error('Chua an duoc, can than boc lich'));
});
```
> Hãy luôn nhớ return expect — nếu bạn bỏ qua câu lệnh return này, thì quá trình test của bạn sẽ hoàn thành trước khi Promise trả về từ checkIsAdult được giải quyết và sẽ không có cơ hội thực hiện các lệnh callback sau đó.
## Async/Await
Để viết một hàm test không đồng bộ, hãy sử dụng từ khóa async ở phía trước hàm được truyền trong hàm test(). Ví dụ, với cùng hàm `checkIsAdult` ở trên có thể được test với async/ await như sau.
```js
test('kiem tra async truong thanh thanh cong', async () => {
  const data = await checkIsAdult(20);
  expect(data).toBe('Da tren 18, an ngon nhoe');
});

test('kiem tra async truong thanh that bai', async () => {
  expect.assertions(1);
  try {
    await checkIsAdult(13);
  } catch (e) {
    expect(e.message).toMatch('Chua an duoc, can than boc lich');
  }
});
```
Tương tự các bạn cũng có thể kết hợp async/ await với resolves/ rejects trong hàm test để match với từng case.
```js
test('kiem tra async truong thanh thanh cong voi resolves', async () => {
  await expect(checkIsAdult(20))
      .resolves
      .toBe('Da tren 18, an ngon nhoe');
});

test('kiem tra async truong thanh that bai voi rejects', async () => {
  await expect(checkIsAdult(13))
      .rejects
      .toEqual(new Error('Chua an duoc, can than boc lich'));
});
```
![](https://images.viblo.asia/fdac3aa8-7f0f-4f14-a126-a81610c4d758.png)
# Setup and Teardown
Thông thường, trong khi viết test, bạn có một số công việc thiết lập cần phải thực hiện trước khi các hàm test chạy và bạn cũng có một số công việc hoàn thiện cần phải thực hiện sau khi các đoạn test chạy xong. Jest cung cấp các chức năng trợ giúp để xử lý việc này.<br>
* **beforeAll**, **afterAll**: dùng để thiết lập một lần duy nhất cho các hàm test() của bạn.
* **beforeEach**, **afterEach**: dùng để thiết lập cho mỗi hàm test().

Dưới đây là ví dụ về thứ tự thực thi các hook kể trên.
```js
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});

Sẽ có kết quả như bên dưới
1 - beforeAll
1 - beforeEach
1 - test
1 - afterEach
2 - beforeAll
1 - beforeEach
2 - beforeEach
2 - test
2 - afterEach
1 - afterEach
2 - afterAll
1 - afterAll
```
# Mock Functions
Mock functions cho phép bạn kiểm tra các liên kết giữa code bằng cách xóa việc implementation thực tế của một hàm, ghi lại các lệnh gọi đến hàm (và các tham số được truyền trong các lệnh gọi đó), nắm bắt các phiên bản của hàm tạo khi được khởi tạo mới và cho phép cấu hình thời gian kiểm tra giá trị trả về.

Có hai cách để mock functions: bằng cách tạo một hàm giả để sử dụng trong test hoặc viết một đoạn `manual mock` để ghi đè một `module dependency`.<br>
Cách đơn giản nhất để tạo một Mock functions instance là dùng cú pháp thần thánh `jest.fn()`.<br>
Ví dụ bạn có 1 hàm forEach sẽ gọi đến 1 callback với mỗi item trong mảng. Để test hàm này thì bạn có thể sử dụng mock function để xác định giá trị mong muốn trả về với mỗi item.
```js
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

test('test foreach', () => {
    const mockCallback = jest.fn(x => 42 + x);
    forEach([0, 1], mockCallback);
    // mock function được gọi 2 lần
    expect(mockCallback.mock.calls.length).toBe(2);
    // tham số thứ nhất của lần gọi đầu tiên là 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);
    // tham số thứ nhất của lần gọi thứ 2 là 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);
    // giá trị trả về của lần gọi đầu tiên là 42
    expect(mockCallback.mock.results[0].value).toBe(42);
});
```
## mock property
Tất cả các mock function đều có thuộc tính **mock** , đây là nơi chứa dữ liệu về cách hàm đã được gọi và những gì hàm trả về được lưu giữ. Thuộc tính **mock** cũng theo dõi giá trị của nó cho mỗi cuộc gọi, vì vậy cũng có thể kiểm tra giá trị này bằng cách sau.
```js
const myMock = jest.fn();
const a = new myMock();
const b = {};
const bound = myMock.bind(b);
bound();
console.log(myMock.mock.instances);
// sẽ cho kết quả [ mockConstructor {}, {} ]
```
## Mock Return Values
Các mock function cũng có thể được sử dụng để đưa các giá trị test vào code của bạn trong quá trình thực thi test bằng cách gọi `mockReturnValueOnce`:
```js
test('test mock return value', () => {
    const filterTestFn = jest.fn();
    filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
    // ở đây filterTestFn sẽ trả về true ở lần gọi đầu và false ở lần gọi thứ 2
    const result = [11, 12].filter(num => filterTestFn(num));
    console.log(result);
    // [11]
    console.log(filterTestFn.mock.calls);
    // [ [11], [12] ]
});
```
## Mocking Modules
Để mock một module nào đó chúng ta có thể sử dụng cú pháp<br>
`jest.mock('path-to-module')`<br>
Ví dụ bạn có một module như bên dưới
```js
// users.js
import axios from 'axios';
class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}
export default Users;
```
Bây giờ bạn muốn test xem quá trình fetch users của bạn có thành công hay không thì đây chính là lúc bạn cần tới mock module.
```js
// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');
test('fetch users thanh cong', () => {
  const users = [{name: 'Tan'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);
  return Users.all().then(data => expect(data).toEqual(users));
});
```
## Mock Implementations
Sử dụng `mockImplementation` khi bạn muốn định nghĩa implementation mặc định của mock function được tạo ra từ module khác.
```js
// testImplement.js
module.exports = function () {
  // some implementation;
  return 12;
};
```
```js
// mock.test.js
jest.mock('../testImplement');
const testImplement = require('../testImplement');

// testImplement is a mock function
testImplement.mockImplementation(() => 'Nguoi viet bai dep trai qua');
testImplement();
// Nguoi viet bai dep trai qua
```
# Tổng kết
Vậy là chúng ta đã cùng nhau đi xong chặng đường tìm hiểu về sử dụng Jest trong việc testing các ứng dụng Javascript rồi nhỉ. Mình tin rằng bây giờ các bạn đã có thể tự viết test cho ứng dụng của riêng mình với gần đủ các thể loại test rồi :+1: <br>
Các bạn thấy đấy, kiến thức thì nó quá là nhiều trong khi chúng ta chỉ như là những giọt nước trong đại dương kiến thức bao la vô ngần ấy. Vậy nên mình suggest các bạn hãy lên trang chủ của [Jest](https://jestjs.io/docs/getting-started) để đọc thêm nhé.<br>Chào tạm biệt mọi người và hẹn gặp lại ở các bài viết sau. Còn thở là còn viết nhé :laughing::laughing::laughing:
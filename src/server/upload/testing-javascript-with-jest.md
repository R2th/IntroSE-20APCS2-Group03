### Ưu điểm khi sử dụng Jest
1. Đơn giản, dễ hiểu
2. Không cần cấu hình gì cả
3. All in one
4. Nhanh
### Cài đặt
Jest không cần cài đặt gì phức tạp. Bạn chỉ cần kéo thư viện về là gần như mọi thứ đã sẵn sàng.
Mình dùng Yarn nên toàn bộ command mình sẽ theo yarn nhé. Bạn chỉ cần gõ tương tự cho npm là được
```
yarn add --dev jest
```
Giờ bạn chỉ cần gõ: ./node_modules/.bin/jest là đã có thể chạy jest rồi nhé. Tuy nhiên ta sẽ thêm shortcut vào trong package.json để gọi cho tiện:
```
{
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^22.4.3"
  }
}
```
Giờ mỗi lần bạn muốn run test, chỉ cần gõ: yarn test nhé <3

Nếu bạn để ý kỹ thì sẽ thấy jest bỏ qua thư mục node_modules và tự động tìm kiếm file test nằm trong thư mục __tests__ hoặc file có đuôi là: .spec.js hoặc .test.js
Mình thì follow theo convention là sẽ đặt tên file test là .test.js cùng thư mục với unit code.

Giờ ta sẽ bắt tay vào đi viết test nhé.
### Unit tests
Unit tests là level đơn giản nhất, nôm na là test xem code của mình chạy có đúng không.
Giờ mình sẽ tạo 1 unit đơn giản là tính tổng 2 số nhé (sum.js):
```
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```
Để viết test cho unit này thì đơn giản mình sẽ tạo 1 file (test suite) sum.test.js đặt cùng thư mục, giờ mình sẽ test xem với unit sum của mình thì 1 + 2 có bằng 3 không nhé :D
```
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
Giờ bạn gõ yarn test sẽ thấy unit của bạn đã được test rồi nhé.
**Hint**: trường hợp bạn có nhiều test suite và chỉ muốn test 1 test suite bất kỳ, ví dụ: sum.test.js, gõ: yarn test sum.test.js
**Hint 1**: giả sử trong test suite sum.test.js có nhiều hơn 1 test và bạn chỉ muốn test 1 case là: foo is bar, gõ: yarn test -t 'foo is bar'
**Hint 2**: chỉ test case foo is bar trong test suite sum.test.js, gõ: yarn test sum.test.js -t 'foo is bar'

Viết test case với Jest đơn giản chỉ là vậy. Bạn bắt đầu 1 test case với test() và sử dụng bộ assert expect() + toXXX() mà jest cung cấp.
Bạn có thể tham khảo section Matchers trên trang chủ Jest, đầy đủ và rất dễ hiểu
### Integration tests
Integration tests, nôm na là test xem code của mình mà có dùng đến code khác chạy có đúng không.
Phần code khác, được hiểu là code của 1 unit khác, hoặc 1 thư viện mà mình nhúng vào để sử dụng.
Để test được case này thì ta sẽ phải mô phỏng hành vi của phần code khác (gọi là mock), và test phần code của mình.
### Mock 1 module
Giả sử mình có 1 module là total(array), nó sẽ sử dụng module sum ở trên để tính tổng các phần tử của 1 array
```
const sum = require('./sum');

function total(values = []) {
  return values.reduce(sum, 0);
}

module.exports = total;
```
Unit tests total:
```
const total = require('./total');
test('works', () => {
  expect(total([1, 2, 3, 4])).toEqual(10);
})
```
Giờ mình sẽ mock hàm sum để nó luôn trả ra là 1 nhé. Test của chúng ta sẽ fail, báo là expected value 10, received 1:
```
jest.mock('./sum');

const sum = require('./sum');

sum.mockReturnValue(1);

const total = require('./total');

test('works', () => {
  expect(total([1, 2, 3, 4])).toEqual(10);
})
```
Mock module thì chỉ đơn giản như vậy. Bạn có thể tham khảo kỹ hơn về mock trên trang chủ của jest.

Tất nhiên với case hàm total và sum ở trên thì bạn không cần mock vì mấy hàm này gần như cô lập và đã chạy rất nhanh.
Giờ ta sẽ sang 1 case thực tế hơn, ví dụ bạn có 1 function, trong function đó gọi đến việc đọc thông tin 1 file trên ổ cứng.
Trường hợp này mock sẽ giúp test case chạy nhanh hơn, mock được nhiều case hơn và bạn không cần chuẩn bị file trên ổ cứng để test.
### Mock Axios
Giả sử bạn có 1 unit gọi đến 1 http api và bạn đang dùng thư viện Axios để gửi request. Với môi trường CI thì rõ ràng mỗi lần chạy test
bạn sẽ không muốn gọi đến api thật vì vừa chậm, vừa ảnh hưởng đến api.
Mock Axios khá đơn giản, đoạn code dưới đây mình sẽ mock thử hàm get của axios để trả về 1 kết quả hoàn toàn khác.
```
const axios = require('axios');

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: { foo: 'bar' }})
}))

test('mock axios.get', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.data).toEqual({ foo: 'bar' });
});
```
### Kết luận
Đến đây bạn đã thấy Jest có những ưu điểm trên chưa
- **Đơn giản**, dễ hiểu: bạn ko cần phải đi mò giữa nhiều thư viện khác nhau, chỉ lên trang chủ Jest là đủ
- **Không cần cấu hình gì cả**: Chỉ cần kéo thư viện về là bạn có thể bắt đầu viết test và test code được rồi
- **All in one**: một mình Jest là đã cân đầy đủ test runner, assert và mock. Ngoài ra còn có thêm cả Coverage reports… 
Chúc mọi người thành công !!!
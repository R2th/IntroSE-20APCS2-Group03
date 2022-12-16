Bắt đầu chúng ta tạo thư mục trống ( thông qua `npm init`) và cài đặt Jest.
```
npm install Jest
```
trong file package.json 
```json
{
  "name": "jest-testing",
  "version": "0.1.0",
  "scripts": {
    "test": "jest"
  }
}
```
Để cho hợp thức thời đại chúng ta sẽ sử dụng các module ECMA Script, với module của NodeJs thông thường ta sẽ sử dụng `require`. Còn muốn sử dụng ECMA Script với cú pháp `import`và `export` chúng ta cần thêm vài bước nữa.

`npm install -D babel-preset-env`

tạo tệp `.babelrc` với nội dung như sau:
```json
{
  "env": {
    "test": {
      "presets": [
        [
          "@babel/preset-env",
          {
            "targets": {
              "node": "current"
            }
          }
        ]
      ]
    }
  }
}
```

Test basic nhất quả đất.

```javascript
// calculator.js
export default class Calculator {
  add(a, b) {
    return a + b
  }
  subtract(a, b) {
    return a - b
  }
}
```

```javascript
// calculator.test.js
import Calculator from './calculator'

describe('Calculator', () => {
  it('should be instanceable', () => {
    expect(new Calculator()).toBeInstanceOf(Calculator)
  });
});
```
 một Unit Test bắt đầu bằng một `describe` tham chiếu đến đối tượng thử nghiệm và `it` báo cáo cho từng trường hợp thử nghiệm
 
Jest tự động phát hiện các tệp kiểm tra có `.test` hoặc `.spec` hậu tố, cũng như các tệp `.js`  trong một thư mục `__tests__`. Đó là lý do tại sao tôi đặt tên cho Unit Test `calculator.test.js`

Đơn giản mà nói. run `npm test`:

![](https://images.viblo.asia/48a05f1d-53b5-4d31-8c75-268fb9f7db2b.png)

![](https://images.viblo.asia/912ccd4a-6c79-4fb1-bdc7-db207063bff6.jpg)

bây giờ chúng ta lồng thêm một số `it` vào describe
```javascript
// calculator.test.js
import Calculator from './calculator'

describe('Calculator', () => {
  it('should be instanceable', () => {
    expect(new Calculator()).toBeInstanceOf(Calculator)
  })
  describe('add', () => {
    //...
  })
  describe('subtract', () => {
    //...
  })
})
```

```javascript
// calculator.test.js
// ...
describe('add', () => {
  it('should sum up 2 numbers', () => {
    const calculator = new Calculator()
    expect(calculator.add(3, 2)).toBe(5)
  })
})
describe('subtract', () => {
  it('should subtract 2 numbers', () => {
    const calculator = new Calculator()
    expect(calculator.subtract(3, 2)).toBe(1)
  })
})
```

`npm test` và cảm nhận.

### Test Driven Development
TDD là một phương pháp lập trình dựa trên việc viết các Test cases trước khi thực hiện mã. Điều đó khiến bạn trước tiên nghĩ về các yêu cầu, sau đó nó sẽ hoạt động như thế nào và API cuối cùng của một module sẽ như thế nào, và cuối cùng là chi tiết triển khai.

Nó đã được áp dụng và phù hợp hoàn hảo trong các phương pháp quy trình công việc nhanh do các chu kỳ phát triển nhỏ và liên tục xuất hiện với TDD.

vậy là như thế nào áp dung TDD ra sao khi lý thuyết là vậy?

chúng ta có thể sử dụng TDD để xác định thêm các trường hợp sử dụng cho phương thức add:

```javascript
// calculator.test.js
// ...
describe('add', () => {
  // ...
  it('should throw an Error if less than 2 args are supplied', () => {
    const calculator = new Calculator()
    expect(() => calculator.add(3)).toThrow('2 arguments are required')
  })
  it('should throw an Error if the arguments are not numbers', () => {
    const calculator = new Calculator()
    expect(() => calculator.add(3, '2')).toThrow('The arguments must be numbers')
  })
})
```

chúng ta nghĩ thêm được 2 yêu cầu miêu tả trong `it` và hoạt động như thế nào -> kết quả kỳ vọng 

![](https://images.viblo.asia/889c7d71-c72f-41c3-ac7d-47b41a95369c.png)

![](https://images.viblo.asia/2cee0ee3-6b7d-433b-82c7-88e7dff31f5c.jpg)

lỗi thế liệu có chấp nhận, để bật đền xanh cho mấy đèn đỏ ở trên thì chúng ta có cách kiểm tra điều kiện đầu vào trước khi return của hàm `add` hay `subtract`

```javascript
// calculator.js
export default class Calculator {
  _checkArgs(a, b) {
    if (a === undefined || b === undefined) {
      throw new Error('2 arguments are required')
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('The arguments must be numbers')
    }
  }
  add(a, b) {
    this._checkArgs(a, b)
    return a + b
  }
  subtract(a, b) {
    this._checkArgs(a, b)
    return a - b
  }
}
```
![](https://images.viblo.asia/a2bd2a30-8d18-4448-be4d-eadfdb73f3c3.png)

![](https://images.viblo.asia/426c17c8-8cf7-4872-8e40-4a5bdc8f05a9.jpg)

### Coverage, và những gì cần Test

Như chúng ta đã thấy, việc thêm `_checkArgs` để ủy thác cho việc kiểm tra logic, việc sử dụng phương thức bổ trợ nó được thực hiện ngầm. Việc `Coverage` cho phép số lượng mã được kiểm tra

```
npm run test -- --coverage
```

![](https://images.viblo.asia/89822913-37a5-46b0-84c9-b3cfd9ce85d8.png)

có thể thấy dễ dàng đạt được coverage 100%, tất cả các dòng trong `calculator.js` đều được chạy qua.

việc coverage này sẽ có thể không được 100% khi có rẽ nhánh `if` hoặc phức tạp hơn, phạm vi coverage không nhất thiết 100%, các công ty phần mềm thường đưa ra 70% đến 80% cho các quy tắc coverage của họ.

Bài viết tiếp theo sẽ nói về Xử lý các phụ thuộc.

facebook: https://www.facebook.com/quanghung997
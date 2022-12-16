# Testing là cần thiết
Giả sử bạn bắt đầu viết một ứng dựng mới, bạn tham gia xuyên suốt dự án và biết mọi thứ về ứng dụng bạn đang làm. Vậy tại sao bạn nên viết test về những điều bạn đã biết?

Codebase của bạn càng lớn thì càng khó maintain nó. Đến một lúc bạn sẽ thêm các tính năng mới cho app. Sau đó, bạn phải bắt đầu debugging, sửa đổi code hiện tại của mình và hy vọng sẽ không ảnh hưởng đến bất kỳ tính năng nào khác. Vấn đề ở đậy, bạn làm việc cùng với các developer khác, khi bạn thay đổi tính năng cũ hay thêm vào các tính năng mới. Bạn có chắc chắc rằng những gì mình làm không ảnh hưởng đến các tính năng khác?

Giải pháp cho vấn đề này là viết test.:D

Lợi ích đem lại của việc viết test:
* Refactor code mà không ảnh hưởng đếnfeature khác, bởi vì test sẽ báo lỗi khi có điều gì sai xảy ra.
* Tao các features mới một cách dễ dàng.
* Tốn ít thời gian hơn để kiểm tra thủ công ứng dụng.

Trong bài viết này, chúng ta sẽ cùng tìm hiểu một công cụ mạnh mẽ để viết test cho các ứng dụng JavaScript: **Jest**.

## Giới thiệu về Jest

Jest là một công cụ test JavaScript *all-in-one* được xây dựng bởi Facebook. Tại sao *all-in-one*?,  bởi vì chỉ với Jest, bạn có thể làm tất cả những điều sau:

* Chạy test an toàn và nhanh chóng.
* Đảm bảo code của bạn đúng
* Giả hàm, modules
* Thêm phạm vi code
* Snapshot testing
* và nhiều nữa

## Cài đặt

Chúng ta thêm package vào project:

`
npm install --save-dev jest
\\ of
yarn add --save-dev jest
`

Sau đó thêm test script vào *package.json*:

`
{
  "scripts": {
    "test": "jest"
  }
}
`

Chạy *jest* bởi mặc định sẽ tìm và chạy file nằm trong folder *tests* và có đuôi* .spec.js* hoặc *.test.js*

## Cấu trúc của file test

Cấu trúc một file test:

* **describe**: được sử dụng để nhóm test cases và mô tả hành vi của functions/modules/class. Nó nhận hai tham số, thamsố đầu tiên mô tả nhóm của bạn  và có kiểu dữ liệu là string. Tham số thứ hai là một function callback trong đó bạn có test case hoặc hook functions.
* **it**, **test**: đây là test case, đơn vị test của bạn. Nó phải được mô tả, và các tham số phải chính xác như *describe*.
* **beforeAll**(**afterAll**):  hook function chạy trước (sau) tất cả tests. Nó nhận một tham số và function của bạn chạy trước (sau) tất cả tests.
* **beforeEach**(**afterEach**): hook function chạy trước (sau) mỗi tests. Nó nhận một tham số và function của bạn chạy trước (sau) mỗi tests.

### Notes

* **beforeAll**, **beforeEach**: và những hook function khác được gọi như vậy bởi vì chúng cho phép bạn gọi code riêng của mình và chỉnh sửa hành động của tests.
* Có thể bỏ qua test bằng cách sử dụng ***.skip*** trong *describe* và *it*: *describe.skip(...)* hay *it.skip(...)*.
* Có thể chạy riêng test mà bạn muốn bằng cách sử dụng ***.only***  trong *describe* hay *it*: *describe.only(...*) hay *it.only(...)*.

### Matchers

Khi bạn viết test, bạn thường xuyên cần phải đảm bảo code của mình đúng. Ví dụ: bạn sẽ gặp lỗi xuất hiện trên màn hình nếu người dùng cung cấp mật khẩu sai trên màn hình đăng nhập. Tổng quát hơn, để đưa ra khẳng định, bạn cần một đầu vào và đầu ra dự kiến. Jest cho phép chúng ta thực hiện điều đó một cách dễ dàng bằng cách cung cấp các công cụ ***matchers*** để test các giá trị của chúng ta:

`
expect(input).matcher(output)
`

Dưới đây là những function phổ biến:
* **toBe**: so sánh các giá trị nguyên thủy (boolean, number, string) hoặc các tham chiếu của objects và arrays:

`
xpect(1 + 1).toBe(2)

const firstName = 'Thomas'
const lastName = 'Lombart'
expect(`${firstName} ${lastName}`).toBe('Thomas Lombart')

const testsAreEssential = true
expect(testsAreEssential).toBe(true)
`

* **isEqual**:  So sánh tất cả thuộc tính của objects, arrays:

```
const fruits = ['banana', 'kiwi', 'strawberry']
const sameFruits = ['banana', 'kiwi', 'strawberry']
expect(fruits).toEqual(sameFruits)
// Oops error! They don't have the same reference
expect(fruits).toBe(sameFruits)

const event = {
  title: 'My super event',
  description: 'Join me in this event!',
}

expect({ ...event, city: 'London' }).toEqual({
  title: 'My super event',
  description: 'Join me in this event!',
  city: 'London',
})
````

* **toBeTruthy** (**toBeFalsy**): kiểm tra giá trị là *true* hay *false*:

`
expect(null).toBeFalsy()
expect(undefined).toBeFalsy()
expect(false).toBeFalsy()

expect('Hello world').toBeTruthy()
expect({ foo: 'bar' }).toBeTruthy()
`

* **not**: phải được đặt trước một *matcher* và trả về kết quả ngược lại với kết quả của *matcher*:

```
expect(null).not.toBeTruthy()
// same as expect(null).toBeFalsy()

expect([1]).not.toEqual([2])
```

* **toContain**: kiểm tra mảng có chứa tham số được truyền vào.

```
expect(['Apple', 'Banana', 'Strawberry']).toContain('Apple')
```

* **toThrow**: kiểm tả nếu function bắn ra lỗi:

```
function connect() {
  throw new ConnectionError()
}

expect(connect).toThrow(ConnectionError)
```

Bạn có thể tìm hiểu chi tiết hơn trên [jest docs](https://jestjs.io/docs/en/expect#methods)

## Jest CLI

Bây giờ chúng ta đã tìm hiểu cấu trúc của file test và các công cụ do Jest cung cấp, hãy xem cách chúng ta có thể sử dụng CLI của nó để run test:

### Chạy test

Bây giờ hãy giả sử bạn muốn chạy test cụ thể, Jest cho phép bạn làm như vậy với tùy chọn -t. Ví dụ, hãy xem xét hai nhóm test sau:

```
// calculator.test.js
describe('calculator', () => {
  it('adds two numbers', () => {
    expect(2 + 2).toBe(4)
  })

  it('substracts two numbers', () => {
    expect(2 - 2).toBe(0)
  })

  it('computes something', () => {
    expect(2 * 2).toBe(4)
  })
})

// example.test.js
describe('example', () => {
  it('does something', () => {
    expect(foo()).toEqual('bar')
  })

  it('does another thing', () => {
    const firstName = 'John'
    const lastName = 'Doe'
    expect(`${firstName} ${lastName}`).toBe('John Doe')
  })
})
```

Chạy nó bằng lệnh:
`jest -t numbers`

Jest sẽ chạy hai test case đầu tiên của *Calculator.test.js* nhưng sẽ bỏ qua phần còn lại.

### Watch mode

Sau đó, những gì tôi nghĩ là, tùy chọn tiện dụng nhất của Jest: ***watch mode***, chế độ này theo dõi các tệp để thay đổi và chạy lại các test case liên quan đến chúng. Để chạy nó, bạn chỉ cần sử dụng tùy chọn ***--watch***: 

`
jest --watch
`

**Chú ý**: **Jest** biết những tập tin nào được thay đổi nhờ **Git**. Vì vậy, bạn phải kích hoạt git trong dự án của bạn để sử dụng tính năng đó.

### Coverage

Chúng ta hãy xem một tùy chọn cuối cùng để cho bạn thấy **Jest** mạnh như thế nào: thu thập phạm vi test, nghĩa là đo lường số lượng code được bao phủ bởi một bộ test khi chạy. Số liệu này có thể hữu ích để đảm bảo code của bạn được bao phủ đúng bởi các test case của bạn. Để sử dụng, hãy chạy lệnh sau:

`
jest --coverage
`

**còn tiếp(...)**
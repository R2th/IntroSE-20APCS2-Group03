Bản chất của unit test là kiểm thử đơn vị chỉ mình nó làm sao chạy được không phụ thuộc thằng module hay đơn vị khác khi run test.

## Vấn đề phụ thuộc trong unit Test
Khi xây dựng ứng dụng, khi một module A được nhét vào một module B, cuối cùng module B phụ thuộc module A.
Cái gì mà nguyên lý SOLID, chữ cái D cuối cùng có một chút nội dung:

```
//Dependency Inversion Principle

Các module cấp cao không nên phụ thuộc vào các module cấp thấp. Cả 2 nên phụ thuộc vào abstraction.
Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại. (Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation.)
```
Trong thực tế, người ta thường áp dụng Dependency Injection để đảm bảo nguyên lý DIP trong code,

Nhiều người trong lập trình viên trên mức Developer lắm lúc còn chả biết cái này, còn là ai ấy, bằng chứng đâu ấy thì không tiện kiểm chứng. Chúng ta dùng cái này rất nhiều nhưng ít khi để ý đến nó.

có ví dụ sau đây: 
* module `book-utils.js` với chức năng `validateBook` kiểm tra tồn tại của `id` Book
```javascript
// book-utils.js
export const validateBook = book => {
  return Boolean(book.id && book.id > 0);
}
```

* module `book.js` 
```javascript
// book.js
import { validateBook } from './book-utils'

export default function createBook(id, name) {
  const book = { id, name }
  if (!validateBook(book)) {
    throw new Error('Invalid book: it doesn't have an id')
  }
  return book
}
```

vậy với trường hợp này `book.js` là module A và `book-utils.js` là module B.
Module A là module cấp cao phụ thuộc vào module B cấp thấp. Bât cứ khi nào ta sử dung `book`, chúng ta cũng đang sử dụng `book-utils`. Trông có vẻ không vấn đề gì nhưng sự phụ thuộc này sẽ làm cho một module khó kiểm tra.

**Vậy khó kiểm tra như thế nào ?**

Đơn giản: Khi một phụ thuộc có **tác dụng phụ**. Ý của câu này, một chức năng đang gọi cái gì đấy bên ngoài, chẳng hạn như call API, truy vấn database, kiểm tra trạng thái status... sẽ gây ra những kết quả không như mong đợi.

=> Điều đó sinh ra kiểm tra nhân đôi (Test double)

## Test double là gì?

> Đơn giản bạn hãy nghĩ tới trường hợp diễn viên đóng thế: người chuyên gia đóng những cảnh quay nguy hiểm thay thế cho nhân vật chính của chúng ta.

=> Kiểm tra nhân đôi: chúng là các đối tượng thay thể thử nghiệm sự phụ thuộc.

=> Tách rời sự phụ thuộc kiểm tra dễ dàng hơn.

Thông thường Test double được sử dụng trong các Unit Test và cả Integration Test

Trong Test Double này sẽ có nhiều loại khác nhau: **Spies, Stubs, Mocks**

## Spies
Các Spies sẽ giám sát, kiểm tra tính toán số lần một cái gì đó được gọi và không làm thay đổi can thiệp chức năng thực hiện của nó.

=> Phù hợp với những trường hợp không cần phải thay thế module phụ thuộc khi không có bất kì tác dụng phụ (call API, truy vấn database ...)

Chúng ta quay trở lại ví dụ trên ta có hàm `validateBook` phù hợp với dạng Spies này.

Đầu tiên chúng ta sẽ tạo ra test case **không sử dụng bất kì loại Spies nào** để đảm bảo `Book` được tạo ra chính xác.

```javascript
// book.spec.js
import createBook from './book'

describe('Book', () => {
  it('can create a book passing an id and name', () => {
    const book = createBook(2)
    expect(book.id).toBe(2)
  })
})
```

Phân tích mã nguồn này cho thấy chúng ta mặc định hiểu ngầm `validateBook` đã được kiểm tra ngay bên trong createBook nhưng để chắc chắn `createBook` gọi hàm `validateBook` thì cần xài Spies cụ thể ở đây Jest có `jest.spyOn`
để tạo spy `validateBook` (đây chính là diễn viên đóng thế mà vừa gọi ở trên)

![](https://images.viblo.asia/426c17c8-8cf7-4872-8e40-4a5bdc8f05a9.jpg)

chúng ta quay lại file test vừa nãy

```javascript
// book.spec.js
import createBook from './book'
import * as utils from './book-utils'

describe('Book', () => {
  // ...
  it('calls the validateBook function', () => {
    jest.spyOn(utils, 'validateBook')
    createBook(1, 'End game hay End nhau')
    expect(utils.validateBook).toBeCalled()
  })
})
```

Quy cho cùng chúng ta đã sử dụng công cụ `toBeCalled` đối sánh trên `validateBook`, trong đó xác nhận rằng một chức năng đã được gọi. 

Bạn có thể cụ thể hơn bằng cách xác định số lần được gọi hoặc với tham số nào:
```javascript
expect(utils.validateBook).toBeCalledWith({ id: 1, name: 'End game hay End nhau' })
expect(utils.validateBook).toHaveBeenCalledTimes(1)
```

Để cho triệt để hơn, đương nhiên trả giá bằng công sức hơn cả code ấy chứ

```javascript
describe('Book', () => {
  // ...
  it('calls the validateBook function', () => {
    jest.spyOn(utils, 'validateBook')
    createBook(1, 'End game hay End nhau')
    expect(utils.validateBook).toHaveBeenCalledTimes(1)
  })
  
   it('calls the validateBook function second', () => {
    jest.spyOn(utils, 'validateBook')
    createBook(2, 'End game hay End nhau 2')
    expect(utils.validateBook).toHaveBeenCalledTimes(1)
  })
})
```

=> chúng ta có lỗi ở đây
`Expected mock function to have been called one time, but it was called two times.`

Có nghĩa là chúng ta đã gọi spy `validateBook` 2 lần và nó tích lũy trong mỗi lần `createBook` được gọi. Bây giờ, chúng ta thiết lập lại các Spy của chúng ta.
Tại sao việc reset lại bộ đếm của Spy là **quan trọng**. Bản chất Unit Test có từ Unit là kiểm tra đơn vị, vậy các test cũng cần tách rời không nên phụ thuộc vào nhau thứ gì cả.

Jest cũng cung cấp cho chúng ta 3 chức năng cho điều này.

* `mockClear`: clear lại bộ đếm
* `mockReset`: Reset lại trạng thái ban đầu kể cả thiết lập
* `mockRestore`: giống như `mockReset` nhưng sẽ xóa đi mock function

Theo như Jest thì tất cả `mocks, spies, stubs` đều là mock function

```javascript
describe('Book', () => {
  // ...
  it('calls the validateBook function', () => {
    const spy = jest.spyOn(utils, 'validateBook')
    createBook(1, 'End game hay End nhau')
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockClear()
  })
  
   it('calls the validateBook function second', () => {
    const spy = jest.spyOn(utils, 'validateBook')
    createBook(2, 'End game hay End nhau 2')
    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockClear()
  })
})
```

ok done !

Chúng ta lại có vấn đề nữa đoạn unit test trên
rất nhiều hàm bị duplicate mockClear() gọi 2 lần nên Jest sinh ra Jest Hook ( chữ Hook phổ biến như kiểu vòng đời của 1 component của Vuejs hay Reactjs, có đủ thứ can thiệp quá trình vòng đời đó và Hook của Jest tương tự )

Jest có `hooks` sau:
`beforeEach, afterEach, beforeAll, afterALl`
trong trường hợp của chúng ta sẽ sử dụng `beforeEach` để xóa đi bộ đếm

```javascript
describe('Book', () => {
  const spy = jest.spyOn(utils, 'validateBook')

  afterEach(() => {
    spy.mockClear()
  })

  it('calls the validateBook function', () => {
    createStudent(1, 'End Game hay End Nhau');
    expect(spy).toHaveBeenCalledTimes(1)
  });

  it('calls the validateBook function second', () => {
    createStudent(2, 'End Game hay End Nhau')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
```

## Kết luận
Tùy thuộc vào mức độ nghiêm ngặt hay chất lượng của sản phẩm thì việc Test double này là một phần quan trọng.
Mong các bạn ủng hộ cho mình để tạo động lực ra bài viết tiếp theo.
Phần tiếp theo chúng ta cùng tìm hiểu nốt `Mocks và Stubs`.


facebook: https://www.facebook.com/quanghung997
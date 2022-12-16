## A little bit of history
Nếu bạn muốn thành thạo về React Router, đầu tiên bạn nên tìm hiểu về `history`. Cụ thể là `history` package, gói cung cấp các hàm chức năng chính cho **React Router**. Nó cho phép project dễ dàng thêm `location` dựa vào điều hướng trên `client-side`, và rất cần thiết cho quá trình phát triển Single Page Applications.

Để bắt đầu sử dụng package này, ta chạy lệnh:
```
npm install --save history
```
Có ba loại `history` là: browser, hash và memory. `history` package sẽ trả về các `method` tương ứng với loại `history` được tạo.

```
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from 'history'
```

Nếu bạn sử dụng **React Router**, nó sẽ tự động tạo ra đối tượng `history`, trong thực tế bạn không cần tương tác trực tiếp với `history`. Tuy vậy, hiểu được sự khác nhau giữa các loại `history` vẫn cực kỳ quan trọng, để bạn có thể chọn được loại `history` tốt nhất cho dự án.

## `History` là gì?

Cho dù bạn tạo `history` là loại nào đi nữa, bạn vẫn sẽ nhận được một `object` chứa cùng một loại thuộc tính và phương thức.
### Location
Thuộc tính quan trọng nhất của một `history` object là `location`. `location` phản án vị trí hiện tại của ứng dụng. Nó bao gồm rất nhiều các thuộc tính có nguồn gốc từ **URL**  như: `pathname`, `search` và `hash`.

Ngoài ra, mỗi `location` lại sở hữu một thuộc tính unique `key` tương ứng. `key` có thể định danh và lưu dữ liệu riêng của mỗi `location`.

Cuối cùng, một `location` có thể có `state` tương ứng. Nó cung cấp phương tiện để đính kèm data đến `location`, cái mà không hiển thị trên **URL**.
```
{
  pathname: '/here',
  search: '?key=value',
  hash: '#extra-information',
  state: { modal: true },
  key: 'abc123'
}
```
Khi object `history` được tạo, nó sẽ cần khởi tạo `location`. Điều này được xác định khác nhau như thế nào đối với từng loại `history`.
### Một `location` điều khiển toàn bộ?
Trong khi bạn chỉ có thể truy cập một `location` hiện tại, `history` object lại lưu giữ một loạt các `location`. `history` cho phép thêm `location`, di chuyển giữa các `location`. Nếu `history` chỉ biết về `location` hiện tại, nó được gọi là `present`.

Ngoài 1 array chứa các `location`, `history` lưu trữ giá trị *index*,  giá trị của vị trí `location` hiện tại trong array.

Với `memory history`, *index* được định nghĩa rỗ ràng. Với cả `browser` và `hash`, array và *index* được điều khiển bởi trình duyệt và không thể truy cập trực tiếp.
### Navigation
Một object khác là **property** của `location` ít thú vị hơn đó là `navigation`. `Các method của `navigation` cho phép thay đổi `location` hiện tại.

### Push
Phương thức `push` cho phép bạn đi tới `location` mới. Nó sẽ thêm một `location` mới vào *array* sau `location` hiện tại. Khi điều này xảy ra, bất cứ **future location**  (Những `location` tồn tại trong *array* sau `location` hiện tại bởi vị bạn sử dụng nút **Back**) sẽ bị xóa.

Mặc định khi bạn click vào `<Link>` trong **React Router**, nó sẽ  sử dụng `history.push` để điều hướng.
```
history.push({ pathname: '/new-place' })
```

### Replace
Phương thức `replace` cũng tương tự với `push`, nhưng thay vì thêm `location` mới, nó sẽ thay thế `location` ở *index* hiện tại. "Future" location sẽ không bị xóa.

> Redirect là thời điểm tốt nhất để sử dụng `replace`. Đó là phương thức mà **React Router** sử dụng trong component `<Redirect>`.
> 
Ví dụ, bạn đang ở trang thứ nhất và click vào link chỏ tới trang thứ hai, ở trang thứ hai có thể sẽ redirect về trang thứ ba. Nếu việc redirect sử dụng `push`, khi click vào nút **back** ở trang thứ ba sẽ đưa bạn về trang thứ hai. Thay và đó, khi sử dụng ` replace`, việc **back** sẽ đưa bạn từ trang thứ ba về trang thứ nhất.

```
history.replace({ pathname: '/go-here-instead' })
```

### Go
Cuối cùng, có 3 phương thức nữa là : `goBack`, `goForward`, và `go`.

`goBack` giúp lùi về một trang trước. Nó sẽ làm giảm *index* trong mảng `location` đi 1.
```
history.goBack()
```
`goForward` ngược lại với `goBack`. Nó chỉ hoạt động khi tồn tại "future" location để đi tới, hay cụ thể hơn là khi người dùng clock vào nút **back**.
```
history.goForward()
```
`go` kết hợp của `goBack` và `goForward`. Khi truyền vào một giá trị âm ( < 0 ) sẽ đưa về sau, và giá trị dương sẽ đưa về trước.
```
history.go(-3)
```
### Listen.

History được thiết kế dựa trên **Observer pattern** , cho phép thông báo khi location thay đổi ở bên ngoài.

Mỗi `history` object có một `listen` method. Hàm này sẽ thêm một mảng các hàm *listener* - cái được lưu bởi `history`. Bất cứ khi nào `location` thay đổi, `history` object sẽ gọi toàn bộ các hàm `listener`. Điều này cho phép bạn cài đặt code sẽ update bất cứ khi nào `location` thay đổi.
```
const youAreHere = document.getElementById('youAreHere')
history.listen(function(location) {
  youAreHere.textContent = location.pathname
})
```
### Linking things together.
Mỗi loại `history` sở hữu `createHref` method có thể lấy `location` object và trả về **URL**.

Nội bộ, `history` có  thể điều hướng sử dụng `location` object. Tuy nhiên, bất cứ code *unaware of history package* , ví dụ như element `<a>`, sẽ không hiểu được `location` object là gì!. Để tạo ra HTML điều hướng mà không cần `history`,  trước tiên bạn phải tạo ra **URL** thật:
```
const location = {
  pathname: '/one-fish',
  search: '?two=fish',
  hash: '#red-fish-blue-fish'
}
const url = history.createHref(location)
const link = document.createElement('a')
a.href = url
// <a href='/one-fish?two=fish#red-fish-blue-fish'></a>
```

## Kết luận
Những điều được trình bày trên cơ bản đã bao quát được những điều cần thiết về `history` API. Còn nhiều property và method khác, tuy nhiên những điều trên chắc chắn đủ để bạn hiểu về các hoạt động của `history` object.
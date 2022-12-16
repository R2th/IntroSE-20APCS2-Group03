> *Xin chào mọi người, hôm nay mình sẽ chia sẻ về cách `read`, `write` và `delete` data trong `firebase`. Bài viết này chỉ dành cho người mới đầu thôi nhé, những bạn nào master rồi thì xin góp ý giúp mình.*

Để dễ hiểu mình xin lấy một ví dụ cụ thể nhé. Bài viết này sẽ giúp chúng ta lấy danh sách các quán ăn ở Đà Nẵng, sau đó mình sẽ thêm, cập nhật và xoá một quán ăn nào đó nhé. Quán ăn gồm những thông tin như sau: tên quán, địa chỉ, số điện thoại và phân loại ( ví dụ như quán bán trà sữa, bán hải sải, bán thịt nướng.....).

Okay, mình bắt đầu thôi nào!

## 1. Get a database reference
Để `read` hoặc `write` dữ liệu từ `database`, trước tiên mình cần tham chiếu đến `firebase database` như sau:

```js
var database = firebase.database();
```

## 2. Reading and writing data

Mình có cấu trúc `database` như này nhé:
```js
restaurant = {
    id: (auto-ID of firebase),
    name: String,
    address: String,
    phoneNumber: String,
    category: String,
}
```

#### Đọc records có trong collection

```js
async function getRestaurants() {
  const querySnapshot = await firebase.database().collection('restaurant').get()
  return querySnapshot.data()
}
```

`Function` trên nó chưa trả về cho mình `array` có cấu trúc như này đâu nhé: 
```js
array = [
{ id: 'EfP6PSqfvuxvLy990zf7', name: 'Hải sản Bà Rô 1', address: '115 Lý Tử Tấn, Thọ Quang, Sơn Trà, Đà Nẵng, Vietnam', phone: '0787659363', category: 'Hải sản tươi'},
{ id: 'CJYcEhO8Owh3aC3fnCKJ', name: 'Mọi - Lẫu Nướng', address: '114 Núi Thành, Hòa Thuận Đông, Hải Châu, Đà Nẵng', phone: '0905616245', category: 'Lẩu Nướng'},
]
```

Các bạn có thể viết riêng một `function` như dưới để có thể `import` vào và dùng thôi:
```js
export function getDataFromDocument(doc) {
  return {
    ...doc.data(),
    id: doc.id,
  }
}
```

Okay, mình chỉnh lại hàm `get` restaurant như sau:
```js
export async function getRestaurants() {
  const querySnapshot = await firebase.database().collection('restaurant').get()
  return querySnapshot.docs.map(getDataFromDocument)
}
```

#### Thêm, cập nhật một record
Bây giờ muốn thêm một `record` thì chúng ta sử dụng `add()` của `firebase`:

```js
// Example data to add
const a = { name: 'Mộc Tea', address: '29 Lê Đại Hành, Khuêõ Trung, Cẩm Lệ, Đà Nẵng', phoneNumber: '0345342444', category: 'Trà sữa, ăn vặt' }

// Create a record
export function createRestaurant({ data }) {
  return firebase.database().collection('restaurant').add(data)
}
```

Khi cập nhật `record` chúng ta sẽ truyền vào data và `id` của record cần `update` và sử dụng `update()`:
```js
// Update a record with id passed: restaurantId
export function updateRestaurant({ data, restaurantId }) {
  return firebase.database().collection('restaurant').doc(restaurantId).update(data)
}
```

#### Xoá một record
Để xoá đơn giản chúng ta chỉ cần dùng `detete()` và nhớ truyền id của `record` cần xoá vào nhé.

```js
export function deleteRestaurant(restaurantId) {
  return firebase.database().collection('restaurant').doc(restaurantId).delete()
}
```

Ngoài ra `firebase` còn hỗ trợ chúng ta khá nhiều tính năng như thêm một lần nhiều `record` sử dụng `transactions` hoặc `batch`, `realtime database`....vv. Hy vọng những chia sẻ trên sẽ giúp ích cho mọi người. Hẹn mọi người ở bài viết tiếp theo nhé.
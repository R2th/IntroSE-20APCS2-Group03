`TypeScript` là một phiên bản cao hơn của `JavaScript`, được thiết kế để xây dựng các ứng dụng lớn và phức tạp.

Tuy nhiên, không phải ai cũng biết cách nó hoạt động như thế nào.

Trong bài viết này, chúng ta sẽ cùng tìm hiểu cách sử dụng `Maps` và `Sets` để lưu trữ cặp (key-value) mà không bị trùng lặp như thế nào nhé.

### Lưu key-value với Maps
Các thao tác chính với `Maps` như sau:

* Khởi tạo: `let map = new Map()`
* Thêm phần tử: `map.set('name', 'Tran Nu Nhu Quynh')`
* Xóa phần tử: `map.delete("name")`
* Kiểm tra phần tử tồn tại: `map.has('name')`
* Đếm tổng số phần tử: `map.size`
* Xóa toàn bộ phần tử: `map.clear()`


Đối với `Map` thì các `key` không được trùng, vì vậy nếu truyền vào 2 `key` giống nhau thì nó chỉ lưu đè vào một `key` duy nhất. Và `key` có thể là một `string`, `number`, `const` hay thậm chí là một `NaN`.

![](https://images.viblo.asia/4f375d91-4f60-4d0a-9bb6-ce85a60ed39e.png)

Ngoài ra, còn có một số hàm hỗ trợ trong `Maps` như: `keys()` - lấy danh sách `keys`,`values()` - lấy danh sách `values`, `entries() `- lấy danh sách `keys` + `values`.

### Sử dụng Symbol như là key của Maps

`Symbol` có thể được sử dụng như là một khoá của cho các đối tượng `Maps` và `Object`.

Chẳng hạn, chúng ta có thể viết:

```js
const data = new Map();
const symbol = Symbol();
data.set("name", "Quỳnh");
data.set(symbol, 2);
```

`Symbol` là hoàn toàn duy nhất (hoàn toàn khác nhau), điều đó có nghĩa là nếu bạn tạo ra 2 `Symbol`, thì chúng là khác nhau, kể cả khi bạn tạo ra 2 `Symbol` theo cùng một cách.

Ví dụ:

```js
const symbol1 = Symbol('foo');
const symbol2 = Symbol('foo');
```

Chúng có cùng tên nhưng khác nhau.

```js
symbol1 === symbol2 // kết qủa trả về false
```

Chúng ta có thể lấy giá trị với `key symbol` đã khai báo bằng cách:

```js
const value = data.get(symbol);
```

### Lưu data bằng Index

Chúng ta có thể lưu `data` mà không trùng lặp với `Sets`.

Ví dụ:

```js
const set = new Set([1, 2, 3]); // Set(3) {1, 2, 3}
```

Hoặc: 

```js
const set = new Set([1, 2, 3, 1]); // Set(3) {1, 2, 3}
```

Chúng ta cũng thấy giá trị trùng lặp đã bị loại bỏ.

`Set` có thuộc tính `size` để trả về kích thước của một `set`.

Tương tự với `Maps`, `Sets` cũng có một số phương thức hữu ích như `add()` - thêm một phần tử, `delete()` - xoá một phần tử, `has()` - kiểm tra phần tử có tồn tại không, `clear() `- xoá tất cả các phần tử và `loop`.

### Tổng kết
`Maps` sẽ là công cụ hữu hiệu để lưu trữ dữ liệu dạng (khóa, giá trị).

Trong khi đó, `Sets` giúp bạn lưu trữ chuỗi dữ liệu mà không lo lắng về việc trùng lặp giá trị.

Với những điều đó, không có lí do gì mà không áp dụng liền vào những dự án của chính mình các bạn nhỉ. Hy vọng sẽ giúp ích cho các bạn. Hẹn gặp lại các bạn ở các bài chia sẻ tiếp theo nhé.

![](https://images.viblo.asia/2e26fa15-6d36-4b2a-b0a1-3ac7b93e1eca.jpg)
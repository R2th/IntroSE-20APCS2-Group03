![image.png](https://images.viblo.asia/a3565f00-07a7-4c80-be27-a19ae6589c10.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Overriding the Express API
----------

Express API bao gồm các hàm và Properties khác nhau trên các đối tượng `request` và `response`. Chúng được kế thừa từ `prototype`. Có hai điểm cơ bản mà chúng ta có thể mở rộng cho `API Express`:

1.  Các `prototype global` tại `express.request` và `express.response`.
2.  `Prototype` dành riêng cho `app` tại `app.request` và `app.response`.

Việc thay đổi các `prototype` chung sẽ ảnh hưởng đến tất cả các ứng dụng `Express` đã `load` trong cùng một quy trình. Nếu muốn, có thể thực hiện các thay đổi dành riêng cho ứng dụng bằng cách chỉ thay đổi các `prototype` dành riêng cho ứng dụng sau khi tạo ứng dụng mới.

Methods
-----------

Bạn có thể ghi đè chữ ký và hành vi của các hàm hiện có bằng của riêng bạn, bằng cách gán một hàm tùy chỉnh.

Sau đây là một ví dụ về ghi đè hành vi của [res.sendStatus](https://expressjs.com/4x/api.html#res.sendStatus).

```javascript
app.response.sendStatus = function (statusCode, type, message) {
  // code is intentionally kept simple for demonstration purpose
  return this.contentType(type)
  .status(statusCode)
  .send(message)
}
```


Việc thực hiện trên làm thay đổi hoàn toàn `signature` ban đầu của `res.sendStatus`. Bây giờ nó chấp nhận một `status code`, `encoding type` và `message` sẽ được gửi đến `client`.

Hàm ghi đè hiện có thể được sử dụng theo cách này:

```javascript
res.sendStatus(404, 'application/json', '{"error":"resource not found"}')
```


Properties
--------

Các `Properties` trong `API Express` là:

1.  `Properties` được chỉ định (ví dụ: `req.baseUrl`, `req.originalUrl`)
2.  Được định nghĩa là `getters` (ví dụ: `req.secure`, `req.ip`)

Vì các `Properties` trong mục 1 được gán động (`dynamically`) trên các đối tượng `request` và `response` trong `contexts` của chu kỳ `response-request` hiện tại, nên không thể ghi đè hành vi của chúng.

Các `Properties` trong mục 2 có thể được ghi đè bằng cách sử dụng `Express API extensions API`.

Đoạn code sau đây viết lại cách value của `req.ip` được dẫn xuất (`derived`). Bây giờ, nó chỉ đơn giản trả về `value`  `Client-IP` của `headers request`.

```javascript
Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get () { return this.get('Client-IP') }
})
```


Prototype
----------

Để tạo ra `API Express.js`, thì người ta đã tạo ra các `request/response` được truyền đến `Express.js` (ví dụ: thông qua `app(req, res)`) cần phải kế thừa từ cùng một chuỗi `prototype`. Theo mặc định sẽ là `http.IncomingRequest.prototype` dành cho `request` và `http.ServerResponse.prototype` dành cho `response`.

Trừ khi cần thiết, chúng ta khuyến nghị rằng điều này chỉ được thực hiện ở cấp ứng dụng (`app`), thay vì trên `global`.

```javascript
// Use FakeRequest and FakeResponse in place of http.IncomingRequest and http.ServerResponse for the given app reference
Object.setPrototypeOf(Object.getPrototypeOf(app.request), FakeRequest.prototype)
Object.setPrototypeOf(Object.getPrototypeOf(app.response), FakeResponse.prototype)
```

Roundup
--------
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
------
* https://tuan200tokyo.blogspot.com/2022/11/blog31-how-to-override-express-api.html
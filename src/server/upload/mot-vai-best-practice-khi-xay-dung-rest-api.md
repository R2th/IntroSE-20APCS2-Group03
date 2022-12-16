Khi xây dựng API, mọi người thông thường hay tập trung quá nhiều vào logic thực thi của API đấy, mà chưa để ý nhiều về mặt thiết kế API, vì đây là khía cạnh chính mà người sử dụng API họ quan tâm 

Và không chỉ vậy, với hệ thống microservices, thì một bản thiết kế API thống nhất là bắt buộc, giúp ích rất nhiều cho người sử dụng và người bảo trì sau này 

## 1. Sử dụng snake_case hoặc kebab-case cho URL
VD, nếu muốn trả về danh sách system order 

**BAD**
```
/systemOrders
```

**GOOD**
```
/system-orders hoặc /system_orders
```

## 2. Sử dụng camelCase hoặc snake_case cho parameter 

VD, muốn trả về thông tin của 1 order 

**BAD**
```
/system-orders/{OrderId}
```

**GOOD**
```
/system_orders/{orderId} hoặc /system_orders/{order_id}
```

## 3. Sử dụng số nhiều với Collection

Nếu muốn trả về danh sách user 

**BAD**
```
GET /user or GET /User
```

**GOOD**
```
GET /users
```

## 4. Bỏ động từ ra khỏi URL của Resource 

Không sử dụng động từ để mô tả ý định trong URL. Thay vào đó, sử dụng HTTP method để thể hiện

**BAD**
```
POST /updateuser/{userId} or GET /getusers
```

**GOOD**
```
PUT /users/{userId} # cập nhật user 
POST /users         # tạo mới user
GET /users/{userId} # trả về thông tin user
```

## 5. Sử dụng Động từ với URL không phải resource 

Nếu bạn cần xây dựng một endpoint mà không trả về gì, chỉ thực hiện một hành động, thì bạn có thể sử dụng `Động từ`

VD, bạn muốn resend cảnh báo cho user 

**GOOD**
```
POST /alerts/245743/resend
```

## 6. Thống nhất sử dụng camelCase hoặc snake_case cho thuộc tính JSON

Khi bạn cần xây dựng API với body request hoặc response là JSON, thì thuộc tính cần được thống nhất chỉ là camelCase hoặc snake_case

**GOOD**
```
{
   user_name: "Mohammad Faisal"
   user_id: "1"
}

hoặc

{
   userName: "Mohammad Faisal"
   userId: "1"
}
```

## 7. Monitoring

RESTful API phải thực hiện các API endpoint là `/health`, `/{version}` hoặc `/metrics`

### /health
Response request `/health` với status code là `200 OK` để kiểm tra API vẫn còn hoạt động 

### /{version}
Request đến endpoint `/{version}` để trả về số phiên bản API 

### /metrics
Cung cấp một vài số liệu mô tả về API như thời gian thực thi trung bình, rate limit của API, ...

## 8. Sử dụng công cụ design API 

Có nhiều công cụ thiết kế API tốt mà giúp tạo ra các tài liệu API rõ ràng như

[API Blueprint](https://apiblueprint.org/)
[Swagger](https://swagger.io/)

Với tài liệu API được mô tả chi tiết và đầy đủ thì sẽ cung cấp trải nghiệm rất tốt cho API của bạn 

## 9. Sử dụng các con số thông thường cho version 

Luôn luôn đặt version cho API, theo các phiên bản từ bé đến lớn, từ ít chức năng đến nhiều tính năng, VD `v1`, `v2`, ...

**GOOD**
```
http://api.domain.com/v1/shops/3/products
```

Việc sử dụng version sẽ giúp cho việc thay đổi các endpoint sẽ không làm ảnh hưởng đến người dùng đang sử dụng hiện tại 

## 10. Luôn thêm tổng số resource trong response 

Nếu API trả về một danh sách object, cần phải thêm tổng số đối tượng trong response, và có thể trả thêm các thông tin pagination nữa 

**BAD**
```
{
  users: [ 
     ...
  ]
}
```

**GOOD**
```
{
  users: [ 
     ...
  ],
  total: 34,
  page: 1, # optional
  per_page: 50 # optional
}
```

## 11. Luôn gửi Parameters limit và offset 
Trong request `GET` danh sách resource, cần gửi thêm cả `limit` và `offset`, vì đây là các tham số hỗ trợ cho phân trang ở client 

**GOOD**
```
GET /shops?offset=5&limit=5
```

## 12. Thêm tham số fields trong URL

Thêm tham số `fields` để chỉ trả về các trường cần thiết từ API

VD, khi chỉ muốn trả về name, contact, address của shop:

```
GET /shops?fields=id,name,address,contact
```

Nhờ vậy, sẽ giúp giảm bớt kích thước của response 

## 13. Không truyền Authentication Token trong URL 

Việc này thật là tệ hại khi để authen token trong URL, vì URL luôn được log lại trong trình duyệt

**BAD**
```
GET /shops/123?token=some_kind_of_authenticaiton_token
```

**GOOD**
Thay vào đấy, nên truyền vào trong Header

```
Authorization: Bearer xxxxxx, Extra yyyyy
```

Ngoài ra, authorization tokens cũng nên có thời gian active ngắn 

## 14. Validate Content-Type

Server không nên giả định content-type. VD, nếu server chấp nhận application/x-www-form-urlencoded, thì hacker có thể tạo một form và trigger một request POST đơn giản. 

Vì vậy, cần luôn luôn validate `content-type` và nếu chỉ cần với các content mặc định, thì có thể validate `content-type: application/json`

## 15. Sử dụng HTTP Methods cho các hàm CRUD 

HTTP methods phục vụ cho mục đích giải thích các chức năng CRUD 

`GET`: để trả về thông tin của một resource 

`POST`: để tạo một resource mới hoặc các sub resource

`PUT`: để cập nhật các resource có sẵn, nếu resource không tồn tại thì sẽ tạo mới 

`PATCH`: để cập nhật resource có sắn, nó sẽ chỉ cập nhật các trường được cung cấp và bỏ qua các trường không được gửi

`DELETE`: xoá các resource đã có 

## 16. Sử dụng Relation cho Nested Resources trong URL

`GET /shops/2/products`: trả về danh sách products của shop có id 2

`GET /shops/2/products/31`: trả về thông tin chi tiết của product có id 31 của shop id 2

`DELETE /shops/2/products/31`: xoá product id 31 và product này thuộc shop id 2

`PUT /shops/2/products/31`: cập nhật product id 31 và product này thuộc shop . id2

## 17. CORS

Luôn hỗ trợ CORS (Cross-Origin Resource Sharing) cho tất cả public API 

## 18. Security

Bắt buộc sử dụng HTTPS (TLS-encrypted) cho tất cả endpoints, resources và services, kể cả các callback URL, push notification và webhook 

## 19. Errors

Error được tạo ra khi client tạo một request invalid hay không chính xác, hoặc service thực thi hành động với data và kết quả không đúng. Hoặc gọi đến bên thứ 3 và bên thứ 3 phát sinh lỗi.

VD như chứng thực đăng nhập không đúng, các tham số request không đúng hoặc version không tồn tại, data không tồn tại, ...

Với các error code 4xx khi được trả về khi client request không đúng format params, hoặc data không tồn tại. 

Để biết rõ hơn, có thể vào trang [này](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## 20. Luôn đo đạc thời gian API

Thời gian API tính từ lúc request, xử lý trên server, parse data response và trả về client. Vì test trên local, nên không phải tính network time.

Luôn lưu ý với các API GET, cần ưu tiên trả về data nhanh, còn với API khác (create, update, delete) thì có thể không quan trọng về thời gian thực thi, cần đảm bảo tính toàn vẹn của data 

Để đảm bảo API GET đáp ứng được rule về time, cần lưu ý giảm bớt query, sửa lỗi N + 1, tối ưu data trả về, có thể sử dụng query `select` để lọc trực tiếp các data response ngay trong SQL

Trước khi xây dựng API, cần tạo data non function, lên danh sách các yêu cầu mà API cần thoả mãn, như security, performance, scale, ...

## 21. Luôn đảm bảo tính toàn vẹn data 

Không tin tưởng toàn bộ parameter, phải luôn có validate tập dữ liệu cho phép của parameter 

Kiểm tra trạng thái dữ liệu trước khi thực hiện cập nhật, VD muốn cập nhật resource lên một trạng thái mới thì phải đảm bảo trạng thái hiện tại là gì

Luôn tính đến kịch bản API được gọi liên tục, đồng thời, khi đấy data sẽ dễ phát sinh các vấn đề dữ liệu bị trùng lặp, cập nhật dữ liệu không chính xác
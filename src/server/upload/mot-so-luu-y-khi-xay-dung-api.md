## Lời nói đầu
  Xin chào các bác (bow)
  
Phải nói là code backend thì mình thích việc code API nhất, vì nó không phải sờ tới cái View (yaoming).

Bài viết dưới đây mình xin phép cóp nhặt một số điều cần chú ý lúc xây dựng hệ thống API.

Nếu có thể thực hiện nó ngay từ đầu thì sẽ giúp giảm thiểu rủi ro và thời gian code sau này.

## API Document

Biết rồi, khổ lắm, nói mãi... 

Ai chả biết việc viết API docs là cần thiết. 

Tuy nhiên, để có một API docs hoàn chỉnh cũng tiêu tốn kha khá thời gian. 
Nhất là trong lúc dự án gấp rút thì mọi người thường chỉ để API docs ở mức ... dùng được case chính.

API document là một phần tương tự như Unit Test vậy - *lấy ngắn để nuôi dài*. 

Nếu không được chăm sóc kỹ, thì đến lúc maintain hoặc thay đổi spec thì hậu quả sẽ rất thảm khốc. (khoc2)

Đẹp trai đ bao giờ là sai, bộ mặt của API rất đáng để bỏ công sức để chỉnh chu.
Dưới đây là một số lưu ý lúc viết docs:
- Mô tả đầy đủ về params request: gồm những params nào, datatype, require hay optional.
- Nên đưa ra các ví dụ về HTTP requests và responses với data chuẩn.
- Cập nhật Docs thường xuyên, để sát nhất với API có bất cứ thay đổi gì.
- Format, cú pháp cần phải nhất quán, mô tả rõ ràng, chính xác.
- Có thể sử dụng API frameworks nổi tiếng như Swagger, Apiary, Postman,...

![](https://images.viblo.asia/537f6182-51a5-4d16-9b87-7dccc77eed53.jpeg)

## Errors message

Ngay cả khi API docs có lởm, nhưng nếu errors messages trả về rõ ràng, ta cũng có thể sử dụng tương đối triệt để API đó.

Errors message chính xác và rõ ràng thực sự rất quan trọng đối với trải nghiệm của client. 
Ngay đối với cả API developers, errors message giúp bạn kiểm soát hệ thống, debug và maintain dễ dàng hơn. 
Vì vậy, đừng để errors message quá sơ sài:

### Bad error

```
HTTP/1.1 422 Unprocessable Entity
{
    “error”: Invalid Attribute
}
```

### Good error

```
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/vnd.api+json
{
    "errors": [
        {
            "status": "422",
            "source": { "pointer": "/data/attributes/first-name" },
            "title": "Invalid Attribute",
            "details": "First name must contain min three chars."
        }
    ]
}
```

## Authorization

Hiện tại có 3 cơ chế Authorize chính:
- HTTP Basic.
- JSON Web Token (JWT).
- OAuth2.

Tùy thuộc vào service của bạn, mà hãy chọn loại Authorize có mức độ phù hợp, cố gắng giữ nó càng đơn giản càng tốt.

Giả dụ về OAuth2 - cơ chế rất phổ biến.

Luôn phải sinh ra 1 cặp access-token và refresh-token. 
Access-token có thời gian expire, và phải sử dụng refresh-token để lấy access-token mới.

Trên quan điểm cá nhân của tôi, thì phần lớn các hệ thống không cần thiết căng thẳng như thế đâu :v

## HTTP status code

Nhiều người không quan tâm tới cái HTTP status code này lúc định nghĩa response trả về.
Trừ khi server sập, thì mọi request đều trả về HTTP status code bằng 200 (yaoming).

HTTP status code là mã trạng thái mà Server trả về cho Client sau mỗi request. 

Nếu tận dụng được triệt để, ngoài việc để nhìn API chuyên nghiệp hơn, nó cũng giúp ích nhiều trong quá trình phát triển.

Mỗi mã code đều có ý nghĩa khác nhau và trở thành tiêu chuẩn chung [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).

Dựa vào đó, hãy chọn ra status codes phù hợp với case response của bạn. 

Từ đó mà Client có thể dự đoán được vấn đề đang gặp phải và tìm ra phương án xử lý phù hợp. 

Ví dụ:
- 200 (**OK**) -> thành công, xử lý dữ liệu trả về.
- 500 (**Internal Server Error**) -> Server gặp lỗi trong quá trình xử lý, liên lạc với API dev để support.
- 400 (**Bad Request**) -> request API sai, hãy đọc lại document.
- 401 (**Unauthorized**) -> Thông tin xác thực của client bị sai, hãy kiểm tra lại access token xem có đúng không?, còn hạn không?
- 403 (**Forbidden**) -> User hiện tại không có quyền để thực hiện action này.
- 404 (**Not Found**) -> Không tìm thấy record hoặc url, hãy kiểm tra lại id hoặc url.
- 405 (**Method Not Allowed**) -> Method này không còn được phép thực hiện nữa.

## Content-type

Nếu không phải vì lý do đặc biệt nào, hãy luôn giữ content-type ở tất cả API giống nhau.

Nó giúp kiến trúc client được đồng nhất, quá trình phát triển app sẽ đơn giản và nhanh hơn. 

Đồng thời tránh việc endpoint A thì chạy được API, nhưng endpoint B lại báo lỗi mặc dù 2 thằng xử lý công việc giống hệt nhau :v.

## Object structure

Dưới quan điểm của client, việc biết được cấu trúc đầy đủ của objects trả về rất quan trọng, nhất là trong lúc fetch data và debug.

Vì thế, ta nên xây dựng một API đặc biệt, trả về toàn bộ thông tin các fields của object.

Nó sẽ tương tự như cái Metadata-API của google này
[Google analytics](https://developers.google.com/analytics/devguides/reporting/metadata/v3/)

Nếu không thì ít nhất, bạn hãy đảm bảo rằng sẽ trả về đầy đủ các fields của object kể cả khi field đó = null.

```
{
    "id": "9c7fd1e5-97f0-4b6a-979c-1d7adf5bda16",
    "email": "example@gmail.com",
    "firstname": "John",
    "lastname": "Smith",
    "timezone": null,
    "phone_code": "RU",
    "phone": null,
    "created_at": "2018-03-27T05:40:31.929Z",
    "updated_at": "2018-04-08T09:24:39.683Z",
    "citizenship": null
}
```

## Phân trang

Chắc chắn các bạn đã hiểu rõ lợi ích của việc phân trang rồi, nhưng ta hãy cải thiện nó thêm một chút. 

Dưới đây là ý kiến của mình:
- Nên để client có thể tự định nghĩa được page size lúc request. Client sẽ tự quyết định params, định đoạt request của mình sẽ thiên về **chất** hay **lượng**.
- Ngoài list data trả về, ta cũng nên có thêm meta information - chứa số lượng record trả về trong request đó. 

## Ảnh và files

Hiển nhiên rồi, bạn không nên đưa files hoặc images body bên trong data responsed, nghe đã thấy toang rồi.

Hãy trả về upload link để client tự truy cập và download về sau đó.

## Ngày và giờ

Trong data response trả về từ server, có lẽ Datetime là datatype gây ra nhiều bug ngớ ngẩn nhất =))

Để tránh việc trả về nhầm ngày giờ do có Timezone khác nhau, ta có thể làm đơn giản như sau:

 - Convert ngày giờ trả về sang dạng format Integer -> bằng tổng số giây tính từ thời điểm Unix ra đời.
 - Mô tả về format và cách sử dụng loại data datetime trong Document.
Vì đã là 1 chuẩn chung, nên bất cứ client nào cũng có thể convert ngược số giây về format và TimeZone mong muốn của họ.
```
{
  ...
  "created_at" => article.created_at.utc.to_i 
}.to_json 
#=> { ..., created_at: 1525969414  }
```

## API limit

Nếu services có chức năng giới hạn request cho API, thì nên có errors message rõ ràng khi client đã đạt mốc limit. 

Ngoài ra, thông tin về giới hạn limit và số lượng request cũng cần trả về cho phía Client.
Phần này nên ném vào HTTP Response Headers thành như sau:

Ví dụ:

```
X-RateLimit-Limit - Giới hạn request trong một giờ
X-RateLimit-Remaining - Số lượng request còn lại.
```

### Nguồn tham khảo:
- https://developers.google.com/analytics/devguides/reporting/metadata/v3/devguide
- https://medium.com/pixelpoint/oh-man-look-at-your-api-22f330ab80d5
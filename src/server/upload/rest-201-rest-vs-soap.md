Tiếp tục [bài viết trước](https://dev.vntechies.com/blog/apis/api-101-rest-restful-api), liệu `REST` có vượt trội so với `SOAP` theo như ý kiến của tác giả dưới đây?

![](https://i.imgur.com/WnxV9PO.jpg)


Trong bài viết này mình sẽ so sánh trực tiếp `REST` và `SOAP` để các bạn có thể tự tìm ra được câu trả lời của riêng mình.

_ps: bạn nào chưa từng nghe đến SOAP có thể tham khảo tại [đây](https://vi.wikipedia.org/wiki/SOAP)._


# Ưu điểm

![](https://i.imgur.com/ledbd3W.jpg)
1. `REST`
- `REST` thích ứng tốt với các công nghệ web mới, dễ dàng sử dụng và bảo trì.
- Tách biệt rõ ràng giữa server và client, chỉ giao tiếp thông qua các phương thức `HTTP` và `URI` (đọc lại bài viết [REST 101](https://qmau.me/blog/post/rest-101-rest-restful-api)).
- Các thông tin có thể được lưu lại phía client → tránh phải gọi đến resource nhiều lần.
- Có thể sử dụng bất kỳ cấu trúc nào (`XML`, `JSON`, hoặc cấu trúc do server và client quy ước với nhau).
  
2. `SOAP`
- Tuân theo cách xử lý trong hệ thống của các doanh nghiệp lớn.
- Được thực hiện ở tầng trên của các giao thức giao tiếp, cả với các giao thức không đồng bộ, không bắt buộc phải là `HTTP`.
- Các thông tin của đối tượng được giao tiếp với khách hàng.
- Bảo mật và xác thực luôn được đảm bảo trong giao thức (nhờ stateful).
- Có thể được miêu tả bằng `WSDL`.

# Nhược điểm

![](https://i.imgur.com/Qwiav8t.jpg)

1. `REST`
  - Chỉ hoạt động trên các giao thức `HTTP`.
  - Việc bảo mật và xác thực có thể không đảm bảo bằng `SOAP` (stateless).
2. `SOAP`
  - Việc duy trì trạng thái (stateful) khiến tiêu tốn tài nguyên cho các metadata.
  - Khó sử dụng và không phổ biến bằng `REST` trong các ứng dụng web hay mobile thông thường.
  - Chỉ sử dụng `XML`.

Có thể thấy rõ được `REST` như một cậu thanh niên mới lớn, mạnh mẽ, nhanh nhẹn và thích ứng nhanh. `SOAP` thì như một người đàn ông ở tuổi trung niên, chắc chắn và vững chãi tuy có chậm chạp và tốn thời gian hơn. **Nhưng liệu có phải tất cả phụ nữ đều thích một cậu trai mới lớn?**

![](https://i.imgur.com/3Tnm5Ly.jpg)

Không ai dùng `javascript` để lập trình hệ thống điều khiển nhà máy điện hạt nhân hay dùng `fortran` để lập trình web. Không phải tự nhiên mà các phương thức cũng như ngôn ngữ được ra đời, việc cái gì tốt hơn sẽ được quyết định trong những hoàn cảnh cụ thể khác nhau. Với những tính chất đặc biệt của 2 cách xử lý này sẽ có những use cases một cách sẽ vượt trội hơn cách còn lại.

1. `REST`: Việc gần gũi với công nghệ web hiện đại, dễ học, nhanh chóng và đơn giản giúp `REST` ưu việt hơn trong các ứng dụng hướng tài nguyên (resources), thiên về các `CRUD` actions với mô hình point-to-point (client-server):
  - Mạng xã hội (twitter API)
  - Blog cá nhân (qmau.me)
  - Đọc và gửi dữ liệu.
  - Không đòi hỏi tính bảo mật quá cao.
2. `SOAP`: Có thể sử dụng với mọi phương thức giao tiếp (không chỉ `HTTP` như `REST`), được chuẩn hoá và phụ hợp với các hệ thống lớn, phức tạp, đòi hỏi tính bảo mật cao:
  - Dịch vụ tài chính (Paypal API)
  - Thanh toán trực tuyến (Saleforce API)
  - Viễn thông (Clickatell SMS API)

Các bạn có thể đánh giá độ phức tạp qua ví dụ một API lấy thông tin của phim tình cảm.
#### `REST`:
- Request: (`HTTP` methods + endpoint) → có thể cache vì có uniform interface
```bash
GET  http://phimtinhcam.com/movies/69
```

- Response:
```javascript
{
    title: Phim tình cảm
    actress: Moria azawo
}
```

#### `SOAP`: SOAP sử dụng HTTP method POST → không thể cache
- Request:

    ```xml
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
        <getMovieDetailsRequest xmlns="http://phimtinhcam.com/movies">
            <id>69</id>
        </getMovieDetailsRequest>
        </Body>
    </Envelope>
    ```

- Response:

    ```xml
    <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
    <SOAP-ENV:Header/>
    <SOAP-ENV:Body>
    <ns2:getMovieDetailsResponse xmlns:ns2="http://phimtinhcam.com/movies">
        <ns2:movie>
            <ns2:id>69</ns2:id>
            <ns2:name>Phim tình cảm</ns2:name>
            <ns2:actress>Moria azawo</ns2:actress>
        </ns2:movie>
    </ns2:getMovieDetailsResponse>
    </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>
    ```

# Tại sao SOAP được sử dụng?

1. **WS-Security:** `SOAP` và `REST` đều hỗ trợ `SSL` (point-to-point sercurity) như với `SOAP` có hỗ trợ thêm một số tính năng enterprise security và được chuẩn hoá → hỗ trợ định danh, bảo mật qua các bên trung gian, bảo đảm an toàn, sự toàn vẹn và tính tin cậy của thông điệp.
2. **WS-AtomicTransaction:** Các giao dịch  [ACID](https://en.wikipedia.org/wiki/ACID) với WebService cần sử dụng `SOAP`. `REST` có hỗ trợ transactions nhưng nó không phù hợp với các giao dịch ACID. `REST` bị hạn chế rất lớn bởi chỉ sử dụng `HTTP`, khó sử dụng trong các hệ thống phân tán yêu cầu [2 phase-commit protocol](https://en.wikipedia.org/wiki/Two-phase_commit_protocol).Với các dịch vụ tài chính, ngân hàng hay đòi hỏi tính tin cậy và sự toàn vẹn dữ liệu, điều này là bắt buộc.
3. **WS-ReliableMessaging:** `REST` không có hệ thống xử lý lỗi chuẩn và muốn khách hàng giải quyết các lỗi giao tiếp bằng cách retry... Đây chắc chắn không phải là cách xử lý hay khi giao dịch ngân hàng. `SOAP` có hệ thống xử lý lỗi và thậm chí cung cấp qua các trung gian của hệ thống.

Sự vượt trội của các ứng dụng `RESTful` so với `SOAP` có lẽ gần giống với việc `JSON` đã vượt qua `XML` trong định dạng và mô tả dữ liệu. Trong thời đại các micro services lên ngôi thì tính nhanh chóng, gọn nhẹ và tốc độ cao được đặt lên hàng đầu. Điều này giải thích vì sao trong các ứng dụng thông thường và phần lớn các hệ thống hiện nay vẫn đang sử dụng `RESTful APIs` và các lập trình viên (bao gồm cả mình) đều ít biết về sự tồn tại của `SOAP`. Tuy nhiên, `SOAP` không biến mất vì nó vẫn rất cần thiết, nếu bạn có ý định làm về tài chính hoặc viễn thông, hãy cố gắng dành thời gian tìm hiểu và nắm chắc nó.

Mình vẫn luôn cố gắng viết bài theo cách trình bày các ý tưởng và không định hướng suy nghĩ của mọi người theo ý nghĩ của bản thân (vì chắc chắn suy nghĩ của mình nhiều khi không chính xác). Hi vọng rằng bài viết này sẽ giúp các bạn có câu trả lời của riêng mình cho câu hỏi trên.

Cuối cùng thì liệu còn anh chàng nào trẻ trung hơn cả `REST`? Mạnh mẽ và đơn giản hơn không? Câu trả lời sẽ có ở phần 3 và có lẽ là bài viết cuối trong [series về `REST` của mình](https://qmau.me/tag/rest). See ya!

Hope you are having a `RESTful` weekend.

# Bài viết gốc được đăng tại VNTechies Dev Blog
https://dev.vntechies.com/blog/apis/api-201-rest-vs-soap
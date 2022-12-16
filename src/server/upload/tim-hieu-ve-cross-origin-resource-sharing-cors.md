# Cross-Origin Resource Sharing (CORS) # 
![](https://images.viblo.asia/6018bef4-7846-4fe7-8d13-1ac84a996288.png)

Trước khi có tiêu chuẩn về CORS, thì không có cách nào để một trang web gửi request thông qua trình duyệt đến một domain khác. Đó là một cơ chế trong trình duyệt có từ Netscape Navigator 2 (1995) gọi là Same Origin Policy, để hạn chế một document hay một script tương tác với tài nguyên không cùng một gốc hay origin. Hai trang web có cùng một origin là khi nó có chung protocol, port và host. Khác subdirectory cũng coi là khác origin.
![](https://images.viblo.asia/e2788bf5-9703-454f-bf23-b997a7ef2085.png)
Cơ chế này nhằm hạn chế các cuộc tấn công Cross-site scripting (XSS), khi attacker nhúng cấy một đoạn mã vào các websites để gửi các thông tin đánh cắp được về máy chủ khác hoặc, thực hiện giao dịch bằng thông tin vừa ăn cắp được (từ cookies của trình duyệt etc).

Và một trong những lợi ích to lớn khác là nó cung cấp một cơ chế (yếu) để ngăn các website khác ăn cắp traffic của bạn một cách quá dễ dàng :-)

## Cơ chế hoạt động của CORS như thế nào?
Trong trường hợp đơn giản nhất, phía client (tức là cái web app chạy ở browser đó) sẽ tạo request GET, POST, PUT, HEAD, etc để yêu cầu server làm một việc gì đó. Những request này sẽ được đính kèm một header tên là Origin để chỉ định origin của client code (giá trị của header này chính là domain của trang web).

Server sẽ xem xét Origin để biết được nguồn này có phải là nguồn hợp lệ hay không. Nếu hợp lệ, server sẽ trả về response kèm với header Access-Control-Allow-Origin. Header này sẽ cho biết xem client có phải là nguồn hợp lệ để browser tiếp tục thực hiện quá trình request.

Trong trường hợp thông thường, Access-Control-Allow-Origin sẽ có giá trị giống như Origin, một số trường hợp giá trị của Access-Control-Allow-Origin sẽ nhìn giống giống như Regex hay chỉ đơn giản là *, tuy nhiên thì cách dùng * thường được coi là không an toàn, ngoại trừ trường hợp API của bạn được public hoàn toàn và ai cũng có thể truy cập được.

Và như thế, nếu không có header Access-Control-Allow-Origin hoặc giá trị của nó không hợp lệ thì browser sẽ không cho phép

## CORS HTTP headers
CORS sử dụng một số HTTP headers trong cả request và response để cho phép việc truy xuất tài nguyên không cùng một origin có thể xảy ra, mà vẫn đảm bảo độ bảo mật.

Về cơ bản thì từ phía server sẽ thông báo cho trình duyệt biết là server chỉ chấp nhận resquest từ origin nào và những phương thức HTTP nào.

**Access-Control-Allow-Origin:**

Đây là header được trả về từ phía server, để thông báo cho browser biết domain nào được truy xuất tài nguyên từ server đó. Header này có thể được thiết lập giá trị: * chấp nhận request từ tất tần tật các domain hoặc một domain đầy đủ (https://example.com)

**Access-Control-Allow-Headers:**

Bằng header này Server sẽ thông báo cho trình duyệt biết những request header nào được phía server hỗ trợ. Ví dụ như (*x-authentication-token*, *Authorization* v.v). Nếu client gửi những header khác không nằm trong danh sách này sẽ bị server bỏ qua.

**Access-Control-Allow-Methods:**

Đây là một danh sách chứa các phương thức HTTP mà server cho phép client sử dụng (vd: **GET, POST, DELETE**), và sách này phân cách bằng dấu phẩy. Ví dụ có những trường hợp server chỉ cho phép truy xuất, nhưng không cho phép cập nhật hoặc xoá tài nguyên chẳng hạn.
Origin
Header này được đính kèm theo mỗi request đến server, nó được sinh ra từ server mà nơi tài liệu được trả về. Và vì lý do bảo mật, trình duyệt không cho phép ghi đè, thay đổi gía trị của header này.

**Preflight request:**

Một cái preflight request là một request được gửi từ phía trình duyệt để thăm dò xem server có hiểu/ hỗ trợ giao thức CORS hay không. Nó được tự động gởi bởi trình duyệt. Việc của phía server là trả về những headers cần thiết cho phía client.
Ví dụ, phía client có thể gửi một OPTIONS request để xem server có cho phép DELETE tài nguyên trên server hay không.

```
OPTIONS /resource/foo 
Access-Control-Request-Method: DELETE 
Access-Control-Request-Headers: origin, x-requested-with
Origin: https://foo.bar.org
```


Server sẽ phản hồi cho phía client những thông tin cần thiết ví dụ như header Access-Control-Allow-Methods chứa những phương thức HTTP mà client được phép thực hiện.

```
HTTP/1.1 200 OK
Content-Length: 0
Connection: keep-alive
Access-Control-Allow-Origin: https://foo.bar.org
Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE
Access-Control-Max-Age: 86400
```

# Làm thế nào để sửa lỗi “CORS”
Như đã nói ở trên, đây không thực sự là một lỗi kỹ thuật. Nó là cơ chế của thế giới web để đảm bảo vệ người dùng. Có một số cách để giải quyết vấn đề này:

**a) Cách tiêu chuẩn**

Để “fix lỗi” này là thêm domain của bạn vào Access-Control-Allow-Origin header của server. Khi lập trình front-end, bạn nên sử dụng một domain để code, ví dụ myawesomeapp.test thay vì dùng localhost:3000. (Hoặc đơn giản hơn là cấu hình để server trả về Access-Control-Allow-Origin: *. Nhưng cách này không được khuyến khích.)

**b) Cách thứ hai**

Hoặc nếu như bạn hoàn toàn không thể kiểm soát được backend (không có contact của backend dev) và cần một giải pháp tạm thời, thì bạn có thể tắt chức năng bảo mật của trình duyệt
chrome --disable-web-security --user-data-dir

Lưu ý rằng nó áp dụng cho tất cả các trang web, nên nếu bạn quên mở nó lại thì bạn có thể bị dính chưởng XSS.

**c) Cách thứ ba**

Là nếu như bạn hoàn toàn không thể làm gì được thì có thể viết một proxy đứng ở giữa front-end và server bạn cần truy xuất tài nguyên. Nói chung thì chỉ có browser cản bạn gởi request thôi, chứ dùng curl hay truy xuất thẳng trên browser thì vẫn bình thường. Cho nên bạn hoàn toàn có thể dựng một server để trung chuyển request và response mà không gặp vấn để gì. Thật ra mấu chốt là nếu client không gửi Orign header đến server thì server không check nó có phải là request CORS không.

Tham khảo: https://codeaholicguy.com/2018/05/07/cors-la-gi/ 
https://butchiso.com/2018/06/cors-tro-ve-can-ban.html
# IT start with a URL
Có 1 điều chúng ta có thể dễ dàng nhận thấy nhất của 1 trang Web đó chính là 1 dãy kí tự đơn giản được dùng để truy cập đến các tài nguyên trên remote server. Hay còn gọi là URL ( Viết tắt của Uniform Resource Locator)
Đó cũng là một phần không thể thiếu của web. Sau đây chúng ta sẽ cùng tìm hiểu về chúng.

## Cấu trúc của url: 

![](https://images.viblo.asia/31f102a3-ff02-4e5e-bd06-23b835d24287.png)

1 -> Cheme/protocol name

2 -> Indicator of a hierarchical URL (Cố định)

3 -> Credentials to access the resource (Tùy chọn có hoặc không)

4 -> Server to retrive the data form
5 -> Port number to connect to (có thể không có. Mặc định 80 với http và 443 với https)

6 -> Hierarchical Unix path to a resource

7 -> "Query string" parameters (Tùy chọn có hoặc không)

8 -> "Fragment indentifier" (Tùy chọn có hoặc không)

### Scheme Name
Là một chuỗi string kết thúc bằng dấu ":" xác định protocol được sử dụng để truy cập tài nguyên. Ví dụ như: http:, https:, ftp:,.. được sử dụng thông dụng. Ngoài ra còn có 1 số được ít sử dụng hoặc không phải tiêu chuẩn như: data:, javascript:,..
### Indicator of a Hierachical URL
Trong 1 số trường hợp URL có thể không có dấu "//" ví dụ như: 
mailto:user@example.com
### Credentials to Access the Resource
Đây là 1 tùy chọn của url. Nó có thể chỉ ra Username hoặc thậm chí cả password, Nó có thể được yêu cầu để có thể truy cập tài nguyên trên server.
Nếu như url không có phần này thì trình duyệt sẽ cố thử lấy tài nguyên về như là với người dùng ẩn danh. Nếu đây là phương thức http hoặc 1 vài phương thức khác nữa thì điều này có nghĩa là không gửi các dữ liệu xác thực. Với giao thức FTP thì sẽ logging với tài khoản khách tên là ftp và 1 bogus pasword.
### Server address
Đây là xác định địa chỉ của server. Nó có thể là 1 DNS name ví dụ http://sun.vn hoặc 1 địa chỉ ip v4 ví dụ http://127.0.0.1 hoặc địa chỉ ip v6 ví dụ: http://0:0:0:0:0:0:0:1
### Server Port
Server Port ở đây chính là 1 tùy chọn để mô tả 1 url sử dụng port không phải tiêu chuẩn. Ví dụ như cổng mặc định 80 cho HTTP, 21 cho FTP có thể bị ghi đè với cổng trên url.
### Hierarchical File Path
Ví trí tiếp theo của URL là ánh xạ để xác định tài nguyên sẽ được lấy về từ server. Ví dụ như /doc/mydocument.txt
### Query String
Đây là một tùy chọn dùng để cung cấp thêm các thông tin truy vấn cho server ví dụ 
http://example.com/search.php **?query=Hello+world**
ở đây thường được viết theo dạng các cặp key value.
### Fragment ID
Đây là 1 đoạn giá trị có vai trò trương tự như là Query String nhưng nó cung cấp các hướng dẫn tùy chọn cho phía client hơn là server. ( trong thực tế thì giá trị này không được gửi đến máy chủ)
## Mã hóa và giải mã URL
Dù hợp lệ hay không hợp lệ thì cũng sẽ có các trường hợp mà url sẽ cần có các kí tự đặc biệt ví dụ như:
   
   - : / ? # [ ] @

Điều này có thể phá vỡ cấu trúc của url và làm mất tính hợp lệ của url nên người ta sẽ mã hóa các kí tự đặc biệt trong url bằng các kí tự % + số đại diện của kí tự trong bảng mã ASCII
Khi đó url sẽ trở thành hợp lệ do các kí tự này sẽ không ảnh hưởng đến cấu trúc của url, ngoài ra việc mã hóa này còn giúp phòng tránh được một số kiểu tấn công phổ biến

Ví dụ các url sau là tương đương:
```
http://example.com/
http: //%65xample.%63om/
http: //% 65% 78% 61% 6d% 70% 6c% 65% 2e% 63% 6f% 6d / *
```
## Sumary
Bài viết được dịch và tóm tắt từ chương 2 tài liệu The Tangled Web
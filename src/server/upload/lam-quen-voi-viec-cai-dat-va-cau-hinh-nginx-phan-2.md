Ở phần [trước](https://viblo.asia/p/lam-quen-voi-viec-cai-dat-va-cau-hinh-nginx-3P0lPaJ85ox), chúng ta đã cơ bản có thể tự mình cấu hình Nginx có thể hoạt động. Ở bài viết này, ta sẽ đi chi tiết hơn về từng phần trong tệp cấu hình để có thể tự do tùy chỉnh theo nhu cầu và các chức năng của ứng dụng của bản thân. Bài viết sẽ giúp bạn làm quen với các tham số và quy ước cơ bản trong Nginx.

# Hiểu hơn về context trong cấu hình Nginx
Hãy bắt đầu bằng việc xem tệp cấu hình mặc định `/etc/nginx/nginx.conf`.

Một điều mà bạn cần chú ý khi xem tệp chính là nó được tổ chức theo cấu trúc giống như cây, được xác định bởi các bộ dấu ngoặc nhọn `{` và `}`. Các khu vực mà các dấu ngoặc này xác định được gọi là context vì chúng chứa các chi tiết cấu hình được phân tách theo khu vực liên quan. Hai thuật ngữ **blocks** và **contexts** là tương đương nhau.

Bởi vì các context có thể xếp lớp lồng nhau, Nginx cung cấp một mức độ kế thừa directive. Các tùy chọn cấu hình trong Nginx được gọi là directive. Theo nguyên tắc chung, nếu một lệnh có giá trị trong nhiều phạm vi lồng nhau thì một directive của context cha sẽ được chuyển cho context con làm giá trị mặc định. Context con có thể ghi đè các giá trị này theo ý muốn. Đối với việc ghi đè của các directive kiểu mảng thì nó sẽ bị thay thế hoàn toàn giá trị mà không phải nối vào giá trị cũ.

Directive chỉ có thể được sử dụng trong context mà chúng được thiết kế. Nginx sẽ báo lỗi khi đọc tệp cấu hình với các lệnh được khai báo trong context bị sai. Chi tiết bạn có thể xem ở [tài liệu hướng dẫn của Nginx](http://nginx.org/en/docs/dirindex.html).

Các dòng có ký tự `#` đứng trước là các nhận xét và không được Nginx thực thi. Các dòng chứa directive phải kết thúc bằng `;` hoặc Nginx sẽ báo lỗi.

Cấu trúc cơ bản của tệp cấu hình sẽ được tóm tắt như sau:
```sh
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
       . . .
}

http {
       . . .
}
```
Một số thông tin cơ bản thì [ở bài trước](https://viblo.asia/p/lam-quen-voi-viec-cai-dat-va-cau-hinh-nginx-3P0lPaJ85ox) mình cũng đã có nhắc đến. Chúng ta sẽ tóm tắt các phần thuật ngữ sẽ nói đến chi tiết trước khi chuyển sang phần chi tiết về chúng. Tệp bắt đầu với 4 directive: `user`, `worker_processes`, `error_log`, `pid`. Những directive này nằm ngoài cặp ngoặc nhọn và không thuộc context nào. Ta gọi nó là `main` context. Hai block là `events` và `http` là các directive bổ sung. Chúng tồn tại trong `main` context. 

# Main context
Phần context chung nhất được gọi là `main` hay `global`. Nó sẽ được diễn giải ở vị trí như sau:
```
# The main context is here, outside any other contexts

. . .

context {

    . . .

}
```
Bất kỳ directive nào ở ngoài các block đều được cho là tồn tại trong main context. Main context chính là đại diện cho môi trường rộng nhất cho cấu hình Nginx. Nó được sử dụng để cấu hình các chi tiết ảnh hưởng đến toàn bộ ứng dụng ở mức cơ bản. Một vài các directive trong phần này ảnh hưởng đến các context thấp hơn. Còn một vài cái khác lại không thể thừa kế bởi vì chúng không thể ghi đè bởi lớp thấp hơn.

Một số thông số phổ biến được cấu hình trong main context chính là người dùng, nhóm để chạy worker process như số lượng worker và tệp lưu PID của main process. Tệp tin chứa thông tin lỗi của toàn bộ ứng dụng có thể được định nghĩa ở đây.

# Events context
Events context ở trong main context. Nó được sử dụng để đặt các tùy chọn mức global ảnh hưởng đến cách Nginx xử lý các kết nối ở mức chung. Chí có thể có một event context được định nghĩa trong cấu hình Nginx.

Nó sẽ ở dạng
```sh
# main context

events {

    # events context
    . . .

}
```
Nginx sử dụng mô hình xử lý kết nối dựa trên sự kiện. Do đó, các lệnh được xác định trong context này được xác định cách mà các worker process nên xử lý các kết nối như thế nào. Các directive ở đây được sử dụng để chọn kỹ thuật xử lý kết nối sẽ sử dụng hoặc để sửa đổi cách thực hiện các phương thức này.

Thông thường, phương thức xử lý kết nối được chọn tự động dựa trên sự lựa chọn hiệu quả nhất mà nền tảng đang sẵn có. Đối với hệ thống Linux thì `epoll` chính là phương thức tối ưu nhất.

# http context
Khi cấu hình Nginx làm máy chủ web hoặc reverse proxy, http context sẽ giữ phần lớn cấu hình. Nó sẽ chứa tất cả các directive và các context cần thiết để xác định cách chương trình sẽ xử lý các kết nối HTTP hoặc HTTPS.

http context và events context là đồng hạng với nhau. Cho nên chúng thường được định nghĩa cạnh nhau. Cả hai đều là con của main context:
```sh
# main context

events {
    # events context

    . . .

}

http {
    # http context

    . . .

}
```
http context chứa các directive để xử lý lưu lượng truy cập web. Các directive này thường được gọi là uninersal - phổ cập bởi vì chúng được truyền cho tất cả các cấu hình trang web Nginx. Để xem danh sách các directive cuả http context chúng ta có thể xem [tài liệu ở trang chủ Nginx](https://nginx.org/en/docs/http/ngx_http_core_module.html).
# Server context
Server context được khai báo trong http context. Đây là một context lồng nhau và nó có thể được khai báo nhiều lần. 

Cấu trúc chung của server context có thể là như sau:
```
# main context

http {

    # http context

    server {

        # first server context

    }

    server {

        # second server context

    }

}
```
Lý do để cho phép khai báo nhiều server context chính là vì mỗi trường hợp xác định một máy chủ ảo để xử lý các yêu cầu của máy chủ khách. Bạn có thể khai báo các khối máy chủ mà bạn cần. Mỗi khối có thể xử lý một tập hợp con cụ thể các kết nối khác nhau.
## Listen port
`listen` chỉ thị cho Nginx hostname - tên máy chủ/IP và cổng TCP sẽ lắng nghe các kết nối HTTP. Nếu một yêu cầu bởi một khách hàng phù hợp với các giá trị này, khối này sẽ có khả năng được chọn để xử lý kết nối. 
## Name-Based Virtual Hosting
`server_name` cho phép nhiều tên miền được phục vụ từ một địa chỉ IP. Máy chủ sẽ quyết định tên miền sẽ phục vụ dựa trên request header mà nó nhận được.

Thông thường, bạn nên tạo tệp riêng biệt cho mỗi tên miền hoặc trang web mà bạn muốn lưu trữ trên máy chủ.
* Yêu cầu xử lý cho cả `example.com` và `www.example.com`:
```/etc/nginx/conf.d/example.com.conf
server_name   example.com www.example.com;
```
* `server_name` có thể sử dụng wildcards `*.example.com` và `.example.com` đều hướng dẫn máy chủ xử lý các yêu cầu cho tất cả các tên miền phụ của `example.com`:
```/etc/nginx/conf.d/example.com.conf
server_name   *.example.com;
server_name   .example.com;
```
* Yêu cầu xử lý cho tất cả các tên miền bắt đầu với `example`:
```/etc/nginx/conf.d/example.com.conf
server_name   example.*;
```
Nginx cho phép bạn chỉ định `server_name` không phải là tên miền hợp lệ. Nginx sử dụng tên từ HTTP header để trả lời các yêu cầu. Bất kể, tên miền có hợp lệ hay không. 
# Location context
Location context chia sẻ nhiều tính chất quan hệ với server context. Ví dụ: Nhiều location context có thể được định nghĩa. Mỗi location được sử dụng để xử lý một loại yêu cầu khách hàng nhất định. Và mỗi location được chọn theo nguyên tắc phù hợp với định nghĩa vị trí so với yêu cầu của khách hàng thông qua thuật toán lựa chọn.

Trong khi các directive xác định có chọn khối máy chủ hay không được xác định trong server context, thành phần quyết định location có khả năng xử lý yêu cầu của bạn được đặt trong định nghĩa location.

Cú pháp chung như sau:
```sh
location match_modifier location_match {

    . . .

}
```
Location context sống trong server context và có thể được lồng nhau. Chính vì điều này có thể cho chúng ta thuận tiện tạo context một cách tổng quát để nhóm tập hợp lưu lượng truy cập nhất định và sau đó xử lý thêm dựa trên các tiêu chí cụ thể hơn với context bổ sung bên trong.
```
# main context

server {

    # server context

    location /foo/bar {

        # first location context

    }

    location /other/bar {

        # second location context

        location nested_match {

            # first nested location

        }

        location other_nested {

            # second nested location

        }

    }

}
```
Mặc dù server context được chọn dựa trên tổ hợp của địa chỉ IP/cổng được yêu cầu và hostname trong host header, các location block tiếp tục phân chia xử lý yêu cầu trong server block bằng cách kiểm tra URI được gửi đến. URI là một phần của request xuất hiện khi kết hợp tên miền hoặc địa chỉ IP/cổng.

Ví dụ, nếu request là `http://www.example.com/blog` ở cổng 80, thì `http`, `www.example.com` và côngt 80 sẽ được sử dụng để xác định server block thực hiện. Sau khi chọn server, phần `/blog` sẽ được đánh giá theo vị trí và sẽ được context nào xử lý yêu cầu.

# Tạm kết
Các phần context trong Nginx còn khá nhiều vấn đề nữa cần nói đến. Vì vậy, mình sẽ tiếp tục ở [bài tiếp theo](https://viblo.asia/posts/aWj5378w56m). Cảm ơn mọi người :smiley: .
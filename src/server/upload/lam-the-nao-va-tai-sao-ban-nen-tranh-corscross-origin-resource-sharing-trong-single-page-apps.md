Trong thời gian qua, Single Page Apps đã trở thành công nghệ chuẩn để xây dựng ứng dụng web. Ngày nay, các framework như Angular, Vue và các thư viện như React thống trị sự phát triển của frontend, cung cấp nền tảng cơ bản cho những ứng dụng này. Tin tốt là, nó phục vụ  frontend và backend APIs từ một tên miền duy nhất. Nhưng có những trường hợp, frontend  là ` web.myapp.com` và backend là `api.myapp.com`, chúng có các tên miền phụ khác nhau. Đôi khi, chúng ta chỉ cho phép truy cập cross-origin tại backend API cho môi trường dev.

![](https://images.viblo.asia/c3886f1a-a9ea-44f0-94db-87a8f1f9edb0.jpeg)

`Cross-origin resource sharing` (CORS) là một cơ chế được triển khai trong các trình duyệt web để cho phép hoặc từ chối các yêu cầu đến từ một tên miền khác với ứng dụng web của bạn. Với CORS, các trình duyệt web và máy chủ web đồng ý về một giao thức chuẩn để hiểu liệu các tài nguyên có được phép truy cập hay không. Thực thi CORS từ backend nên không có nghĩa là Bots hoặc bất kỳ cơ chế nào khác có thể truy cập tài nguyên máy chủ của bạn.

## Bạn cần CORS ?

Chúng ta có cần cho phép CORS trong các ứng dụng web của mình không? Với hầu hết các trường hợp, chúng ta không cần phải lo lắng về CORS vì ứng dụng web được phục vụ từ một tên miền duy nhất. Tuy nhiên, có thể có các tính năng đặc biệt như cho phép nhúng một trang (ví dụ: Form, Video) bên ngoài tên miền ứng dụng web chính, nơi bạn có thể xem xét bật CORS trong backend của mình. Tuy nhiên, bạn có thể kích hoạt CORS trong phạm vi tính năng cụ thể đó.

## Vấn đề với CORS

Vấn đề dễ thấy nhất với CORS, bên cạnh bảo mật, là ảnh hưởng đến hiệu suất trong các ứng dụng web. Khi frontend của bạn gửi một HTTP request đến một tên miền phụ hoặc tên miền khác, trình duyệt sẽ gửi một HTTP bổ sung được gọi là [preflight request](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request), để xem liệu máy chủ có chấp nhận các tin nhắn từ tên miền của người gửi hay không.

**Vì vậy, đối với mỗi HTTP request được kích hoạt bởi frontend, trình duyệt cần gửi 2 HTTP request, tăng thời gian phản hồi. Trong hầu hết các trường hợp, độ trễ được thêm vào có thể nhìn thấy trong các ứng dụng web và ảnh hưởng xấu đến trải nghiệm người dùng.**

## CORS trong Single Page Apps

Khi nói đến Single Page Apps, việc sử dụng CORS rõ ràng hơn nhiều. Các trình duyệt web, sẽ không xem xét `preflight request` nếu ứng dụng web chỉ sử dụng các *HTTP header* (`Accept`, `Accept-Language`, `DPR`, `Downlink`, `Save-Data`, `Viewport-Width`, `Width`, `Content-Language`, `Content-Type (Except the values application/x-www-form-urlencoded, multipart/form-data, text/plan)`) và các phương thức *HTTP* (`GET, HEAD, POST`) cho việc gọi backend API. Bạn có thể sẽ cần ngoài các *HTTP headers* và phương thức HTTP này trong Single Page Apps của mình.

Trong những ứng dụng này, chúng ta xác định *backend API URL* ở *frontend* như một biến cho các hoạt động của *server*. Ngoài ra, chúng ta thậm chí có thể cấp CORS trong API backend, vì *server* phát triển cho *API frontend* và *API backend* có thể đang chạy ở hai *port* khác nhau. Môi trường dev cũng có thể ảnh hưởng đến thiết lập của bạn trong môi trường *production*, nơi bạn có thể *deploy* *frontend and backend API* trong các tên miền phụ khác nhau.

Nhưng chúng ta có cần đi theo hướng này không? Hãy cùng xem xét các cách để tránh CORS cho cả môi trường *development* và *production*.

## Tránh CORS trong môi trường Dev

Ngày nay, hầu hết các sever phát triển mà chúng ta chọn để phát triển *frontend* đều sử dụng *NodeJS*. Hầu hết các Node server đều hỗ trợ cấu hình proxy. Ngoài ra, *Angular*, *React* và *Vue* đi kèm với Webpack dev server có hỗ trợ cấu hình proxy.

**Vậy cấu hình proxy để làm gì ?**

Giả sử *frontend app* của bạn đang chạy trong `http://localhost:4200` và *API backend* đang chạy trong `http://localhost:3000/api/<resource>`. Frontend  cần lưu trữ *backend API URL* và *port* để chạy app ở local. Ngoài ra, bạn cũng sẽ cần bật CORS trong *backend*, cho phép các lệnh gọi API đến *frontend*. Ở đây, tên miền API frontend và backend giống nhau (`http: // localhost`), nhưng các cổng khác nhau, nơi chúng được coi là nguồn gốc khác nhau của trình duyệt.

Chúng ta có thể tránh tất cả các rắc rối trên bằng cách cấu hình proxy ở frontend. Khi bạn sử dụng proxy, bạn chỉ cần lưu trữ đường dẫn tương đối (`/api`) trong frontend app. Khi chạy ứng dụng ở local, frontend của bạn sẽ cố gắng truy cập API backend, sử dụng cùng tên miền và cổng (`http://localhost:4200/api/<resource>`), sẽ không có vấn đề gì về CORS trên trình duyệt.

Bên trong cấu hình proxy, bạn có thể xác định để chuyển tiếp bất kỳ yêu cầu nào tới đường dẫn `/api` tới `http://localhost:3000`  tại *frontend*.

Vì server dev là người trung gian giao tiếp với *API backend* , nên nó có thể tránh CORS một cách an toàn. Ví dụ dưới đây cho thấy cách bạn có thể thêm cấu hình proxy trong server trong  Webpack.

```
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
```

Là một cách tiếp cận khác, nếu bạn không muốn sử dụng các đường dẫn tương đối trong frontend cho API backend, bạn có thể khởi động trình duyệt web của mình bằng các cờ chuyên dụng để vô hiệu hóa CORS. ví dụ: [Run Chrome browser without CORS](https://alfilatov.com/posts/run-chrome-without-cors/)

## Tránh CORS trong môi tường Production
    
 Trong môi trường *productiont*, trừ khi API frontend và backend của bạn chạy trong cùng một  web server, bạn cần thiết lập một cổng hoặc proxy trước chúng để phục vụ từ một tên miền duy nhất. Trong một số trường hợp, bộ cân bằng tải của bạn sẽ đủ nếu nó có thể định tuyến đến các điểm cuối khác nhau dựa trên các đường dẫn HTTP.
 
 Tương tự như proxy server dev, port , proxy hoặc load balancer (bộ cân bằng tải) thực hiện định tuyến dựa trên cấu hình chúng ta cung cấp, khớp với đường dẫn HTTP nhận được trong request. Danh sách sau đây chứa một số port, proxy và load balancer phổ biến hỗ trợ định tuyến dựa trên đường dẫn URL để bạn tham khảo.
*  NGINX
* Traefik
* AWS CloudFront
* AWS Application Load Balancer
* Azure Application Gateway

Hy vọng bài viết hữu ích, cảm ơn mn đã đọc :D
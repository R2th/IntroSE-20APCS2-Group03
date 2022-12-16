# 1. Khái niệm web caching
Trước hết chúng ta sẽ cùng tìm hiểu web caching là gì. Caching là lưu một bản sao của dữ liệu trả về vào bộ nhớ **cache** ở lần truy cập đầu tiên để tái sử dụng cho các lần truy cập tiếp theo. 

Ví dụ về bài toán"3 x 5 = ?", với câu hỏi này thì hầu hết mọi người nhìn phát ra ngay 15 phải không nào :D nhưng hãy thử hình dung khi còn nhỏ thì mình sẽ trả lời câu hỏi này thế nào? lấy bảng cửu chương ra dò, ngồi tính nhẩm, lấy máy tính ra bấm ... tốn cả đống thời gian, nhưng hiện tại chúng ta có thể trả lời ngay với tốc độ chưa tới 1s vì não chúng ta đã có sắn kết quả rồi, quá trình học bảng cửu chương lúc nhỏ cũng giống như caching và não chũng ta đóng vai trò như bộ nhớ **cache** vậy.

Trong web caching thì cache được đặt ở nhiều nơi: trên web server, ở trình duyệt của client, thậm chí nhiều hệ thống lớn còn build cả một server riêng để lưu trữ dự liệu được caching, hôm nay mình sẽ nói về cache ở trình duyệt.

# 2. Cache trình duyệt (browser cache)
Hầu hết các trình duyệt hiện đại ngày nay đều hỗ trợ cache, và các dữ liệu được cache sẽ được lưu ở ngay trong máy tính cá nhân của chúng ta, ví dụ chrome sẽ là thư mục 

```
\AppData\Local\Google\Chrome\User Data\Default\Cache
```

Khi bạn truy cập một trang web lần đầu tiên một số dữ liệu như file ảnh, js (javascript), css … sẽ được lưu lại vào bộ nhớ cache của trình duyệt và khi bạn truy cập vào trang web đó vào các lần sau những dữ liệu này sẽ được lấy ngay trên máy bạn mà không cần phải tải về từ server, nhờ vậy tốc dộ load trang web sẽ nhanh hơn rất nhiều. 

Vậy nếu những dữ liệu đó bị thay đổi trên server thì làm sao browser có thể biết và cập nhật chúng? Đó là nhờ các [Response header](https://freetuts.net/header-request-va-header-response-670.html) được server gửi về và trình duyệt sẽ lưu các header này cùng với dữ liệu trong bộ nhớ cache, bao gồm **Strong caching headers** và **Weak caching headers**. Hầu hết các web framework hiện nay đều hỗ trợ giúp bạn tạo ra các header này, nhưng ở bài viết này mình sẽ sử dụng Ruby on Rails

# 3. Strong caching headers
Strong caching headers gồm 2 header là **Expires** và **Cache-Control** Khi có yêu cầu tới một trang web đã caching dữ liệu ở trình duyệt, trình duyệt sẽ kiểm tra các header này trước khi gửi request lên server hay lấy từ bộ nhớ cache.
## 3.1 Expires
 Là thời điểm hết hiệu lực của tài liệu được cache mà chỉ khi nào quá thời điểm này, trình duyệt mới gửi request lên server để tải lại tài liệu. Giá trị của trường này luôn là thời gian theo GMT.

- Tuy nhiên nó có một nhược điểm là vì sử dụng thời gian tuyệt đối nên thời gian tại server và ở máy của bạn  luôn phải chính xác. Thêm nữa, server phải “nhớ” cập nhật expires date, nếu không khi qua thời điểm này, số lượng request tới server sẽ tăng mạnh gây quá tải cho server.

Trong Rails thì bạn có thể set Expires, bạn hãy đặt đoạn code sau vào controller bạn muốn caching:

```
response.headers["Expires"] = 1.hour.from_now.httpdate
```
Hãy truy cập vào url của controller này và kiểm tra bằng nhấn F12-> tab network bạn sẽ thấy headers Expires trong response header
![](https://images.viblo.asia/76094af6-028c-41cd-b57d-f976712fa020.png)


## 3.2 Cache-Control
Linh động hơn Expires, nó có thể bao gồm các thông tin như:
- max-age=[seconds]: Là "tuổi thọ" của dữ liệu trong bộ nhớ cache, nếu dữ liệu có thời gian tồn tại vượt quá khoảng này thì trình duyệt sẽ tự động xóa nó đi
- no-cache: tài liệu không được cache mà luôn request lên server

Trong Rails chúng ta sẽ có phương thức **expires_in** để tạo ra header Cache-Control

```
expires_in 1.hour
```

Cache-Control sẽ được trả về kèm response
![](https://images.viblo.asia/7878fee8-1fbe-47fe-86c3-374cd33d9bcc.png)

Khi sử dụng cả Expires và Cache-Control thì Cache-Control được ưu tiên. Với strong caching header thì chừng nào các điều kiện trong Expires và Cache-Control còn thỏa mãn thì trình duyệt sẽ luôn lấy dữ liệu từ bộ nhớ cache dù dữ liệu đó đã thay đổi ở server. Ta có thể giải quyết vấn đề này với **weak caching header**
# 4. Weak caching headers
Weak caching headers gồm **Etag** và **Last-Modified**: còn được gọi là các validators. Nếu trình duyệt gửi request tới server, nó sẽ gửi request kèm theo các trường này (lúc này request được gọi là conditional GET request)

## 4.1 Etag:
Giá trị của trường này có thể dựa trên thời gian chỉnh sửa cuối cùng hay checksum của file.Khi gửi request lên Server nó sẽ gửi giá trị của etag thông qua header **If-None-Match** Server sẽ kiểm tra giá trị này với giá trị etag của file hiện tại trên server, nếu trùng khớp nó chỉ trả về mã 304 Not Modified và trình duyệt sẽ load dữ liệu từ trong cache.
- Etag có nhược điểm là theo mặc định, một file duy nhất khi ở trên các server khác nhau sẽ có Etag khác nhau. Sẽ không sao nếu trang web của ta chỉ đặt trên một server. Tuy nhiên sẽ là vấn đề nếu website đặt trên nhiều server và được phân tải bởi load-balancer.

Trong Rails chúng ta sẽ có phương thức **fresh_when** để tạo ra header Etag, tham số đầu vào là dữ liệu của Object mà bạn muốn cache

```
fresh_when etag: @user
```

Header etag được gửi về
![](https://images.viblo.asia/c21c5255-06a7-401f-9526-8096da7412c0.png)
## 4.2 Last-Modified: 
Tương tự như Etag, nhưng Last-Modified luôn là thời gian chỉnh sửa cuối cùng của file dưới dạng GMT. Last-Modified nằm trong response server trả về, và khi trình duyệt gửi request lên server, nó kèm thêm header **If-Modified-Since** với giá trị là Last-Modified cuối cùng nó nhận được.  nếu trùng khớp nó chỉ trả về mã 304 Not Modified và trình duyệt sẽ load dữ liệu từ trong cache.

Chúng ta có thể cấu hình để phương thức  **fresh_when** để trả về headerLast-Modifiedthay vì etag và tham số là một httpdate, ở đây mình sẽ lấy trường updated_at trong database

```
fresh_when last_modified: @user.updated_at
```
Header Last-Modified được gửi về
![](https://images.viblo.asia/b04c53c4-415e-4b45-9a17-c4e7c98642d7.png)
- Khi cả Etag và Last-Modified được sử dụng, server sẽ kiểm tra cả hai trường này, theo nguyên tắc có thể mô tả bằng mã giả như sau:
![](https://images.viblo.asia/01962fc2-fd9d-476d-b298-ea698d45d339.png)

# 5. Kết luận

Trên đây là cách mà cache ở trình duyệt hoạt động cũng như cách dùng với Ruby on Rails, chúng ta có thể sử dụng nó để tăng tốc độ tải trang web ở client cũng như giảm tải cho server. Bạn có thể tham khảo một số thủ thuật khác trong công cụ [ Google PageSpeed Insights Tool](https://developers.google.com/speed/pagespeed/insights/) của google. Tham khảo:
- https://trinhtuantai.com/cache-trinh-duyet-browser-cache-cho-website-cua-ban.html
- https://pressidium.com/blog/2017/browser-cache-work/
- https://thoughtbot.com/blog/take-control-of-your-http-caching-in-rails
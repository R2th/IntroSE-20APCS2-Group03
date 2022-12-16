Chao,
Chào mọi người, đến tháng lại lên. Hôm nay mình xin giới thiệu với mọi người một khái niệm khá mới mẻ nhưng không phải mới lắm, đó chính là Shopify. Và cách chúng ta dùng Rails app để custom một shopify như thế nào nhé. Nhưng trước hết, hay cùng nhau tìm hiểu một chút về khái niệm Shopify (len)
# Shopify là gì?
Shopify dễ hiểu là một nền tảng thương mại điện tử giúp bạn tạo ra website bán hàng nhanh chóng, chuyên nghiệp. Hệ thống giao diện phong phú của shopify hiện tại đang rất được ưa chuộng và sử dụng phổ biến trong các công ty thương mại điện tử.
## Shopify có một số ưu điểm và nhược điểm sau
### Ưu điểm
- Có thể dễ giàng: Tạo ra một store điện tử-website dễ dàng, chuyên nghiệp mà không cần biết về coding, hosting, server(tóm lại là những thứ liên quan đến kỹ thuật). Việc còn lại bạn cần phải làm là chăm chút cho sản phẩm bằng marketing và bán hàng-rõ ràng chuyện ni nó không giúp được mình :D
- Giao diện phong phú, đa dạng: Khi sử dụng Shopify để tạo một store, bạn đã có sẵn trong tay mình rất nhiều sự lựa chọn về giao diện, và tất cả đều có vẻ rất chuyên nghiệp, bắt mắt
- Nhiều ứng dụng hay
### Nhược điểm
- Tốn phí:  Dĩ nhiên là với một đống tiện ích như vậy, khi sử dụng thì bạn cần trả phí cho nhà sản xuất, và chi phí khi sử dụng shopify được tính hàng tháng với các mức bạn có thể cân nhắc là 29 đô, 79 đô hoặc 299 đô.
- Độ tùy biến, linh động thấp hơn: Đây là vấn đề lớn nhất mình thấy còn tồn tại ở shopify, nếu trong tương lai nhược điểm này được khắc phuc, mình nghĩ mọi người sẽ không còn bất cứ ngần ngại gì nữa khi quyết định chọn shopify để tạo cho mình một trang web thương mại điện tử.

# Đăng ký shopify 
Phần này mọi người có thể tìm hiểu bên ngoài, mình xin phép không đưa vào bài viết, vì nội dung bài viết này của mình mục đích muốn giới thiệu cho các bạn kỹ thuật dùng Rails để custom một shopify appication. :D

Link create shopify: [(https://partners.shopify.com)]
# Create app
![](https://images.viblo.asia/91e6eb49-d081-4d74-9ff2-259985d9e889.png)https://images.viblo.asia/91e6eb49-d081-4d74-9ff2-259985d9e889.png
 Sau khi hoàn thành các thủ tục đăng ký ở link bên trên mình gửi, chúng ta bắt đầu step by step với việc tạo và custom một shopify app nhé
 ## Login with partner's account
 Để ý thanh menu bên phải màn hình, bạn sẽ thấy link Apps, click vào đó và theo dõi phần giao diện tiếp theo
 
 ![](https://images.viblo.asia/40b3eeb9-e510-4ed6-9d4c-2833b1b40691.png)https://images.viblo.asia/40b3eeb9-e510-4ed6-9d4c-2833b1b40691.png
 
 Tiếp theo, bạn click vào button create app để tạo mới ứng dụng. Lưu ý điền các thông tin cần thiết về tên ứng dụng, URL cần dùng-mình khuyên các bạn dùng luôn local server localhost:3000 cho nó thân thiện :D :D

Đến tab App info để get một API xác thực

Để tạo một ứng dụng, bạn cần set Application Callback URL đến http://localhost:3000/ và redirect_uri đến http://localhost:3000/auth/shopify/callback

![](https://images.viblo.asia/b4f42beb-6d14-4c36-8067-51c4864c4370.png)

Và tiếp theo, tạo một Rails app với add thêm giúp mình `gem "shopify_app"` vào Gemfile, chạy bundle nhé

Thằng gem mình vừa add vào đó, nó sẽ tạo ra một bộ generator để tạo các điều kiện bắt buộc khi làm việc với Shopify. Chạy câu lệnh bên dưới để generate 
```
rails generate shopify_app — api_key <your_api_key> — secret <your_app_secret>
```

Bạn lên lại tap App info để lấy thằng API key và API secret key nhé

![](https://images.viblo.asia/e0afbdb7-e54a-44bf-9a80-0603dda610a2.png)

Nếu bạn không thể tạo được ứng dụng nhúng với shopify, hãy thử thay đổi sau trong file config/initializers/shopify_app.rb

```
config.embedded_app = false
```

Run migrate 

```
$ rake db:migrate
```

Trên đó là quá trình tích hợp ứng dụng Rails của bạn với shopify, bạn cần start server rails để thực hiện tiếp những bước sau

## Cài đặt ứng dụng vào cửa hàng

- Click vào nút Create App Store listing

![](https://images.viblo.asia/53f9bc55-0a63-48e4-85aa-d8b5584172e0.png)

- Điền các thông tin chi tiết và lưu 

![](https://images.viblo.asia/27454b97-354c-4cc0-b879-6f585420b0d9.png)

- Sau khi lưu, bạn sẽ được chuyển hướng trang(đừng quan tâm nó đi đâu) và click vào nút View App listing để xem chi tiết(nút này lại nằm ngay trên nút Save)

![](https://images.viblo.asia/e028f307-adf7-49bb-89b0-de57c8501c6f.png)

- Sau đó, bạn sẽ thấy ứng dụng của mình trong cửa hàng, quá trình cài đặt chưa hoàn thành. Bấm vào nút Get bên phải phía dưới

![](https://images.viblo.asia/0dfc9d59-bcd0-4fc1-a970-c26caf954632.png)

Đến đây, bạn phải đảm bảo rằng chắc chắn ứng dụng của bạn đã có thể chạy trên máy chủ, máy mà bạn đã tiến hành cài đặt với shopify. Sau khi cài đặt ứng dung, hệ thống sẽ tự động chuyển hướng đến cửa hàng của bạn.

shopify_app gem lưu các chi tiết cửa hàng này theo mặc định vào mô hình Shop vì vậy không cần phải làm điều đó theo cách thủ công.
Và nếu bạn thực hiện bất kỳ thay đổi nào đối với ứng dụng thì bạn phải cài đặt lại ứng dụng để nhận những thay đổi đó.


Trên là toàn bộ các thao tác bạn tích hợp một custom rails app vào shopify, mình xin dừng lại bài viết này ở đây. Ở các bài sau, mình sẽ tìm hiểu và giới thiệụ với các bạn các kỹ thuật khi xây dựng và phát triển một shopify store với Rails app.

Xin chào và hẹn gặp lại.

(bye)
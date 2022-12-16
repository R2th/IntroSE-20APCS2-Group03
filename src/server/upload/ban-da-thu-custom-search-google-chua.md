Có thể các bạn đã rất quen với việc tạo 1 ứng dụng có thể đăng ký/ đăng nhập bằng gmail. Vậy việc custom search google trong ứng dụng thì sao?

Ví dụ như trang [Hợp âm chuẩn](https://hopamchuan.com/) này chẳng hạn

![](https://images.viblo.asia/6dc34091-7a99-49fd-b851-4bd0eeabc08d.png)

Google cho phép bạn có thể tạo 1 search engine như vậy cho trang web của bạn hoặc bất kỳ trang web nào mà bạn muốn. Bạn sẽ có thể cấu hình công cụ tìm kiếm của mình, tùy chỉnh thứ hạng, giao diện của kết quả tìm kiếm,... và mời bạn bè của bạn để giúp bạn xây dựng công cụ tìm kiếm của bạn. Bạn thậm chí có thể kiếm tiền từ công cụ tìm kiếm của mình bằng cách sử dụng tài khoản Google AdSense của bạn.

Cụ thể, [Google Custom Search](https://developers.google.com/custom-search) cho phép bạn:
- Tạo một search engine cho một tập các trang được chỉ định.
- Cho phép tìm kiếm hình ảnh.
- Tùy chỉnh giao diện và kết quả tìm kiếm.
- Thêm promotions cho kết quả.
- Liên kết công cụ tìm kiếm của bạn với tài khoản Google AdSense của bạn để bạn kiếm tiền (nhờ việc người dùng nhấp vào quảng cáo trên các trang tìm kiếm của bạn).

Trong bài viết này, mình và các bạn hãy cùng thử tạo 1 engine đơn giản nhé :) 

### 1. Đăng ký engine

Để có thể tạo một công cụ tìm kiếm, việc đầu tiên bạn cần làm là đăng ký một engine để lấy code custom tại [Custom Search Engine control panel](https://cse.google.com/cse/all)

Cụ thể, bạn hãy truy cập https://cse.google.com/cse/all sau đó đăng ký một domain, là địa chỉ trang web mà bạn muốn custom.
 
 ![](https://images.viblo.asia/c110572d-037d-4f8f-b69d-2bd13a3154ba.png)
 
 Tiếp theo, click Get code và copy private code
 ![](https://images.viblo.asia/63f7d4b4-fc6f-46d2-bf5a-ff74273d9069.png)
 
 Đoạn code sẽ có dạng như vậy:
 ```html
 <script async src="https://cse.google.com/cse.js?cx=005643767746568613717:unw1at7qbrs"></script>
<div class="gcse-search"></div>
 ```
 
 Bạn sẽ sử dụng đoạn code này để show kết quả search được tại trang mà bạn đã đăng ký.
 
 ### 2. Triển khai tìm kiếm
 
Để thử custom, mình sẽ tạo 1 file index.html sau đó paste đoạn code đã lấy được từ phần 1 vào phần body.
 
 ```html:index.html
<html>
<head>
<title>my site</title>
...
<head>
<body>
<div1>...</div1>
    <script async src="https://cse.google.com/cse.js?cx=005643767746568613717:unw1at7qbrs"></script>
    <div class="gcse-search"></div>
<div2>...</div2>
</body>
</html>
```

Kết quả thu được sẽ như vậy:
 ![](https://images.viblo.asia/a610b7de-9139-4d65-a18e-d4fa3eb6c868.gif)
 
 ### 3. Một số tùy chỉnh đơn giản
 
 Để tùy chỉnh công cụ search, bạn hãy click vào 1 engine mà bạn đã đăng ký:
 ![](https://images.viblo.asia/5186fc83-dc49-42a9-92a2-f060dc8f0533.png)
 
 và cài đặt để tùy chỉnh cho engine.
 
 Bạn có thể tùy chỉnh rất nhiều như:
 - **Setup**: Lựa chọn ngôn ngữ, khu vực, cho phép tìm kiếm hình ảnh, tắt quảng cáo, thêm phân quyền,...
 - **Look and feel**: Lựa chọn giao diện, chủ đề, thumbnail, style khung search và khung kết quả tìm kiếm,...
 - **Search features**: Thêm promotions, refinements, cho phép autocomplete,...
 - **Statistics and Logs**: Xem lịch sử tìm kiếm,...
 
Ví dụ: Setup layout
![](https://images.viblo.asia/de560026-ff85-4b3f-919d-91d891cf1376.gif)

Lựa chọn 1 layout mà bạn muốn, sau đó thay mã code cũ bằng mã code mới, vậy là bạn đã có được layout custom như mong muốn. Có phải rất đơn giản không :) 

![](https://images.viblo.asia/aba8da0c-c265-495b-b57e-fe9fe9a57a5d.png)

Với Themes, Customize bạn cũng có thể tùy chỉnh tương tự.

Với thumnail, nếu bạn để chế độ `OFF` cho thumnail thì hình ảnh thumbnail sẽ không được hiển thị trong kết quả tìm kiếm. Ngược lại, hình ảnh thumbnail sẽ xuất hiện trong kết quả tìm kiếm.

Bạn có thể tìm hiểu thêm tại [Google Custom Search](https://developers.google.com/custom-search)

Chúc các bạn thành công và hẹn gặp lại mọi người trong những bài viết tiếp theo.
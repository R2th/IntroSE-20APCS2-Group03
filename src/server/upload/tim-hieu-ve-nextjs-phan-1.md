# 1. Mở đầu
[Next.js ](https://nextjs.org/)là một framework dựa trên React cho phép bạn tối ưu hoá hiệu năng, hỗ trợ SEO và trải nghiệm người dùng thông qua pre-rendering: **Server Side Rendering (SSR)** và **Static Site Generation (SSG).**
Ở phần này mình sẽ chia sẻ với các bạn những kiến thức cơ bản về Next.js và khi nào chúng ta nên dùng nó trong dự án.
![](https://images.viblo.asia/76f93c33-4f5a-4bd1-a9ee-6c2ddceaea11.png)

# 2. Khái niệm Next.js
Next.js là một open-source React front-end framework được bổ sung các tính năng như  Server Side Rendering (SSR) và Static Site Generation (SSG). Next.js được xây dựng dựa trên thư viện React có nghĩa là Next.js lấy những lợi thế của React và bổ sung các tính năng.

**Server Side Rendering:** SSR cho phép máy chủ access tất cả required data và xử lý javaScript để hiển thị lên trang web. Theo cơ chế này thì hầu hết các xử lý logic đều ở phía máy chủ. Trong đó, máy chủ thực hiện xử lý và tiến hành các thao tác với cơ sở dữ liệu để thông dịch (render) ra thành HTML, sau đó gửi phản hồi cho khách hàng. Trình duyệt của khách hàng cũng sẽ chỉ hiển thị HTML này.

**Search Engine Optimization (SEO):**  Sử dụng SSR cũng mang lại cho bạn lợi thế về SEO, giúp trang web của bạn hiển thị cao hơn trên các trang kết quả của công cụ tìm kiếm. SSR làm cho các trang web xếp hạng tốt hơn cho SEO vì chúng tải nhanh hơn và nhiều nội dung trang web có thể được quét bởi các trình theo dõi SEO.

Next.js cũng cho phép bạn chỉnh sửa thẻ `<head>` của một trang web, điều mà bạn không thể thực hiện trong React. Thẻ `<head>` góp phần vào xếp hạng SEO của trang web.

# 3. Tại sao nên sử dụng Next.js?
Ưu điểm chính của Next.js là hỗ trợ SSR tích hợp để tăng hiệu suất và SEO. Server Side Rendering (SSR) hoạt động bằng cách thay đổi luồng yêu cầu (altering the request flow) của ứng dụng React để tất cả các thành phần ngoại trừ máy khách gửi thông tin của họ đến máy chủ.

Với tất cả thông tin trên máy chủ, nó có thể hiển thị trước (pre-render) HTML của trang. Máy khách có thể gửi một yêu cầu đến máy chủ và nhận toàn bộ trang HTML thay vì yêu cầu từng thành phần riêng lẻ với client-side rendering.

![](https://images.viblo.asia/7f5f91d9-7326-4770-8345-0c035c686d52.png)
![](https://images.viblo.asia/9625d493-ce76-4687-9375-2b99fd839192.png)

# 3. Các tính năng của Next.js?
* Server-Side rendering (SSR)
* Static site generation (SSG)
* Single-Page application (SPA)
* Development of faster application
* Optimization of pages
* SEO websites
* Automatic code splitting

# 4. Next.js được sử dụng để làm gì?
Bây giờ câu hỏi đặt ra là khi nào chúng ta nên sử dụng Next.Js. Chúng ta có thể thấy rất nhiều tính năng và lợi thế mà Next.Js có. Chúng ta có thể sử dụng Next.Js để phát triển các ứng dụng web của mình khi trong dự án cần những thứ sau:
## 4.1 Những website thương mai điện tử

Next.js cho phép bạn tạo những trang web hiệu suất cao, thân thiện với người dùng và SEO tốt.
## 4.2  Khi SEO quan trọng

Khi làm bất kỳ trang web nào trên internet, SEO luôn được tính đến. Vì các trang web này được thực hiện client-side, nên SEO không hoạt động tốt trong hầu hết các single-page applications. Khi Google thu thập dữ liệu cho indexing, chỉ cần chọn một loạt các tệp JS và thẻ `div` có `id`, khiến không thể lập indexing một trang web. 
## 4.3  Landing page
Khi chúng ta phải xây dựng một landing page, thì chúng ta có thể sử dụng Next.Js, vì nó giúp các marketers rất nhiều trong việc tạo trang marketing-focused.

## 4.4 Marketing websites
Vì ứng dụng sẽ được hiển thị trên máy chủ, thời gian tải có thể được cải thiện đáng kể. Đặc biệt là trong những trường hợp khách truy cập sử dụng thiết bị chậm hơn.

## 4.5  Static websites
Viết một trang web hoàn toàn bằng HTML không chỉ khó và tốn thời gian mà bạn còn khó có thể viết code tốt hơn những gì được tạo sẵn (ít nhất là về kích thước package).

# 5. Ưu điểm của Next.js?
## 5.1 Split code
Nó tự động breaks code để làm cho trang tải nhanh hơn. Đó là lý do tại sao hầu hết các trang web lớn sử dụng Next.js đều có khả năng tải trang nhanh hơn mặc dù chúng được xây dựng cho một lượng lớn người xem.

## 5.2 Brings organic traffic
Các trang web được phát triển bằng Next JS không chỉ nhanh mà còn đơn giản để tìm kiếm và cung cấp trải nghiệm người dùng tuyệt vời. Ba yếu tố: tốc độ, cấu trúc và trải nghiệm người dùng, là những yếu tố xếp hạng quan trọng sẽ tăng thứ hạng trên công cụ tìm kiếm của Google trang web của bạn.

## 5.3 Trải nghiệm người dùng tốt
Việc thuận lợi nhất của việc sử dụng Next JS là trải nghiệm người dùng, chỉ đứng thứ hai sau tốc độ. Marketers yêu thích sự độc lập trong thiết kế, đặc biệt là trong ngành thương mại điện tử, nơi nhiều cửa hàng trực tuyến trông giống nhau và có một trải nghiệm người dùng tốt sẽ giúp  cửa hàng nổi bật hơn so với các đối thủ cạnh tranh.

## 5.4 Bảo mật
An toàn vì nó không có liên kết trực tiếp đến database, dependencies, user data hoặc thông tin bí mật khác.

## 5.5 Thời gian tải trang nhanh hơn
Tiếp theo, vì các trang web JS là tĩnh, chúng cực kỳ nhanh và khách truy cập sẽ rất hài lòng với kết quả. Nó cũng có thể tự động tối ưu hóa các trang bất cứ khi nào nó được yêu cầu.

## 5.6 Cộng đồng hỗ trợ lớn
Next.Js là React framework nên rất dễ nhận được sự hỗ trợ nhanh chóng khi bạn cần. Bạn không cần phải xây dựng nó từ đầu, vì sẽ luôn có một nhà phát triển React hỗ trợ nhanh chóng cho bạn.

## 5.7 Server-side rendering
Cải thiện khả năng bảo vệ dữ liệu và tuân thủ PIPA. Server-side rendering có các ưu điểm sau:
* Cải thiện hiệu năng
* Hỗ trợ SEO tốt hơn
* Social sharing
* Có ít vấn đề hơn với khả năng tương thích của trình duyệt.


# Tài liệu tham khảo
https://www.educative.io/blog/nextjs-tutorial-examples

https://medium.com/geekculture/why-should-you-learn-next-js-in-2021-what-are-the-benefits-8292d79bc50c
Ở một số bài viết trước, mình có viết về React và đã dùng Create React App để thực hiện ví dụ một cách đơn giản và nhanh chóng nhất. Tuy nhiên sử dụng CRA cũng có một số điểm yếu như khi bạn xem source code trên duyệt web thì bạn sẽ chỉ thấy trang gần như trống trơn và chỉ có phần `<head>` nhưng hầu như không có gì trong `<body>`.

![](https://images.viblo.asia/0cd82844-5d61-4b68-8c90-132822714b6d.png)

Điều này là kết quả của việc CRA render ứng dụng của bạn ở **client-side**. Bạn có thể hiểu rằng, tệp .js đã build được tải xuống trình duyệt của người dùng trước khi phần còn lại của trang bắt đầu tải. Việc này làm cho thời gian tải trang ban đầu bị tăng lên và một số trình thu nhập dữ liệu web không thể lập index trang web.

Có cách tốt hơn để render ứng dụng là server-side rendering.

# Server-Side Rendering?
SSR chính là nội dung website của bạn được hiển thị trên máy chủ chứ không phải sử dụng JS hiển thị trên trình duyệt. Ví dụ như một trang web Laravel thì nội dung chính là đến từ HTTP hiển thị trên server và render ra HTML, CSS và cả JS. Với ứng dụng tạo bởi CRA thì nó chỉ gửi tệp .js đến máy client, từ đây trình duyệt JS của client tạo ra markup sau khi tệp .js được tải hoàn thành.

# Lý do nên dùng server-side rendering
Server-Side Rendering có nghĩa là mọi trang web được hiển thị và tải từ server. Với server-side của React thì có một số nhược điểm như sau:
* SSR cải thiện hiệu suất với điều kiện rằng ứng dụng của bạn là tương đối nhỏ. Tuy nhiên, nó lại có thể làm cho ứng dụng của bạn bị chậm đi với một ứng dụng đủ lớn.
* Nó làm cho thời gian phản hồi của ứng dụng cũng bị tăng lên. Với một máy chủ yếu hay bận thì làm cho điều này càng tồi tệ hơn.
* Nó tăng kích thước của phản hồi và đương nhiên rồi thời gian tải trang của bạn không thể nào giảm đi được.
* Ứng dụng cũng bị làm cho phức tạp hơn.

Tuy nhiên, chúng ta không thể không kể đến những thuận lợi, và sự cần thiết của SSR trong một số trường hợp:
## Cải thiện hiệu năng
Nội dung hiển thị xuất hiện sớm hơn với render phía server do trang HTML được hiển thị đang được gửi đến client thay vì trang HTML trống chỉ được hiển thị sau khi tải JS/ React trên client. Vì nôi dung xuất hiện sớm hơn khi sử dung SSR so với CSR cho nên hiệu suất là tốt hơn. Hiệu suất thực tế không nhất thiết phải tốt hơn cho ứng dụng được hiển thị phía server vì ứng dụng không thể được cập nhật hoặc tương tác cho đến khi JS được tải trên trang. Nó xảy ra đồng thời với CSR.
Trong SSR, hiệu suất của ứng dụng cao hay thấp tùy thuộc vào tài nguyên của server và nữa là tốc độ mạng của người dùng. Thời gian tải trang nhanh hơn chính là yếu tố đầu tiên để đánh giá trải nghiệm của người dùng tốt hay xấu. Với các trang web lớn hiện này thì đương nhiên họ đang sử dụng SSR. 

## Optimal Search Engine Optimization (SEO)
Tiêu chuẩn vàng để các ứng dụng web ủa bạn hiển thị trong các kết quả của các công vụ tìm kiếm là sử dụng render phía server cho các ứng dụng cẩu bạn. Điều này sẽ đảm bảo rằng ứng dụng của bạn có thể được thu thập và lập chỉ mục một cách nhanh chóng và hiệu quả bởi các công cụ tìm kiếm. Mọi trang web đều luôn luôn muốn xuất hiện trong các kết quả tìm kiếm từ các máy chủ tìm kiếm lớn như Google, Bing. Tuy nhiên, trình công cụ tìm kiếm chưa hiểu được và cũng chưa có khả năng lấy nội dung từ JS. Điều này có nghĩa rằng họ chỉ thấy một trang trống, không có nội dung mặc dù trang web của bạn có hữu ích như thế nào. Hiện tại có nghe nói rằng Google thu thập dữ liệu từ các ứng dụng Web được xây dựng bởi JS. Tuy nhiên, không phải tất cả các công cụ tìm kiếm đều có thể thu thập dữ liệu các ứng dụng được client-side render như Google. Hơn nữa, vì việc render JS cần thêm tài nguyên tính toán, Google sẽ trì hoãn khi nó sẽ thu thập dữ liệu và lập chỉ mục các ứng dụng client-side render. Việc chuẩn bị sẵn sàng nội  dung phía server để các công cụ tìm kiếm thu nhập dữ liệu web của bạn thì có vẻ vẫn là cách làm chắc chắn hơn.

## Social sharing
Một lợi ích khác của SSR chính là bạn có một đoạn snippet và hình ảnh nổi bật khi chia sẻ nội dung trang web của bạn thông qua mạng xã hội. Điều này chỉ có thể thực hiện nếu ứng dụng của bạn được render từ server. 

Viblo cũng vừa mới có tính năng này:
![](https://images.viblo.asia/6a2c8a0d-07a9-4c27-bf40-385f50658f7c.png)

# Client-side Rendering với Server-side Rendering
Chúng ta xem xét trình tự các sự kiện khi tải ứng dụng CSR và SSR. 

![](https://images.viblo.asia/df2bcc4e-5dec-4469-8e0b-a71e31d7152f.png)

Hình trên đã lý giải tại sao nội dung hiển thị nhanh hơn cho người dùng khi sử dụng SSR. Cũng có thể thấy rằng ứng dụng có thể được tương tác vào cùng một thời điểm cho cả CSR và SSR.

Dưới đây là một mô tả chi tiết hơn cho trình tự của SSR, bao gồm cả những gì đang thực sự xảy ra ở phía server.

* Trình duyệt gửi yêu cầu trang web (client)
* Server tải React từ bộ nhớ (server)
* Server render HTML dựa trên DOM ảo được tạo bởi ứng dụng React (server)
* Server gửi HTML được tạo tới trình duyệt (server)
* Nội dung hiển thị cho người dùng
* Yêu cầu gói JS (client)
* Ứng dụng React tải trong trình duyệt (client)
* Người dùng có thể tương tác với ứng dụng
* Yêu cầu dữ liệu API từ backend (client)
* Render lại ứng dụng với dữ liệu mới (client)
# React SSR framework
Có một số framework phục vụ cho việc render React ở phía server như sau:

## Next.js
[Next.js](https://nextjs.org/) là một framework tuyệt vời, cùng với đó là nó cũng có một cộng đồng lớn. Sử dụng Next.js thì bạn không cần phải lo lắng về việc bunding, minimize hay reload. Có rất nhiều những tính năng vượt trội mà bạn có thể trải nghiệm với nó. Bạn có thể tạo các trang dưới dạng là các component trong các tập tin. Ngoài việc có một cộng đồng hỗ trợ thì có nhiều công ty lớn cũng sử dụng Next.js trong các trang web của họ như là npm, Netflix...

## Razzle
[Razzle](https://github.com/jaredpalmer/razzle) là một công cụ giúp trừu tượng hóa tất cả các cấu hình phức tạp cần thiết cho SSR thành một phụ thuộc duy nhất. Nó mang đến cho bạn một sự trải nghiệm tuyệt vời của developer về `create-react-app`. 

Để bắt đầu với Razzle thì nó tương đối dễ dàng và nó sử dụng React Router v4 theo mặc định, không như Next.js.

## Một số lựa chọn thay thế
Nếu bạn có sự quen thuộc hơn với việc dùng đến Vue hoặc framework JS nào khác thì dưới đây sẽ có một vài lựa chọn thay thế khác.

### Nuxt.js
[Nuxt.js](https://nuxtjs.org/) là framework server-side rendering cho các ứng dụng Vue và khá phổ biến trong cộng đồng Vue. Nếu bạn đang tìm kiếm một sự lựa chọn thay thế cho Next.js hay Razzle trong thế giới của Vue thì hãy cố gắng thử đến với Nuxt.js 
![](https://images.viblo.asia/7f2c64bd-baff-47dc-8842-625d81710474.png)

### Gatsby
[Gatsby](https://www.gatsbyjs.org/) nó là một trình tạo trang web tĩnh dựa trên React có được cảm tình với nhiều người với (User Experience) và DX (Developer Experience) một cách đặc biệt. Nói một cách chính xác thì nó không làm SSR trong thời gian chạy. Thay vào đó, nó thực hiện render phía server với Node.js trong thời gian build. Nơi mà nó tạo ra HTML tĩnh, CSS và JS khi deploy trang web. Điều này làm cho thời gian tải nhanh và có tối ưu hóa hơn nữa như chia tách các đoạn code dựa trên route và tìm nạp trước.

# Có phải luôn luôn cần đến SSR?
Tất nhiên là không rồi :smiley: . Không phải mọi ứng dụng đều cần đến việc render ở phía server. Đặc biệt đối với các ứng dụng có dashboard và xác thực sẽ không cần đến SEO hoặc chia sẻ đến các phương tiện truyền thông. Thêm nữa, yêu cầu chuyên môn để xây dựng một ứng dụng SSR React là cao hơn đối với ứng dụng tạo bằng `create-react-app`.

Quan trọng nhất là các ứng dụng SSR React tốn nhiều chi phí hơn về mặt tài nguyên do bạn cần duy trì hoạt động của máy chỉ Node. 

# Kết luận
Client-side rendering React rất tuyệt nhưng ứng dụng được render phía server có những lợi ích đáng chú ý hơn. Các lợi ích bao gồm:
* Hiệu năng
* SEO
* Social sharing
 
 Bài này mình tổng hợp lý thuyết đọc được và chủ yếu nói về lợi ích của SSR. Mong rằng ở bài sau mình sẽ có thể thực hiện hướng dẫn các bạn làm ví dụ về việc sử dụng các thư viện kể trên để làm ứng dụng SSR đối với React. Cảm ơn mọi người đã đọc bài :bowing_woman: .
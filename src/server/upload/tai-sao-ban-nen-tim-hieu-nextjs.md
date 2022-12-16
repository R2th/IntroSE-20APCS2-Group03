![](https://images.viblo.asia/aaae9904-6b99-43f9-8e96-f6acb691a4c1.jpg)
## 1. Early web

Trở lại giữa những năm 2000, khi web còn non trẻ và đang phát triển, các nhà phát triển mới bắt đầu chuyển từ các trang HTML tĩnh sang các trang web động. Đó là thời hoàng kim của ngôn ngữ lập trình hướng đối tượng như PHP (Server render HTML)

Sau đó là thời đại JavaScript. Mọi người bắt đầu nhận ra rằng ngôn ngữ này được hỗ trợ cho web và có thể được sử dụng rất nhiều.

Bạn có thể submit form động, requests `HTTP`, tạo ra các hiệu ứng cuộn đẹp mắt và thậm chí tạo trang web nhanh chóng.

Sự gia tăng của JavaScript và các thư viện như jQuery cho phép các nhà phát triển web tạo ra các giao diện đẹp có thể tùy chỉnh hoàn toàn bằng JavaScript.

Chẳng bao lâu, mọi nhà phát triển web bắt đầu đẩy ngày càng nhiều JavaScript xuống cho `client` web. Chắc chắn, công nghệ phát triển, điện thoại di động và PC trở nên tốt hơn với nhiều RAM và lõi hơn, nhưng JavaScript bắt đầu phát triển nhanh hơn.

Nhiều chức năng hơn, nhiều tính năng hơn và nhiều `frameworks` hơn có nghĩa là trải nghiệm người dùng tốt hơn và khả năng tạo cảm giác giống như ứng dụng trên web.

Nhưng điều này cũng có nghĩa là ngày càng đẩy nhiều JavaScript xuống thiết bị di động, và các thiết bị đó không thể theo kịp các giới hạn JavaScript đang phát triển.

## 2.The Web was made for HTML

Với các framework như React và Angular, về cơ bản bạn đang đẩy các gói JavaScript khổng lồ cho `client` mà trước tiên phải tải xuống các trang HTML nhỏ.

Các thiết bị di động cũ, chậm chạp bắt đầu bỏ cuộc - thời gian tải ngày càng cao, độ trễ nhiều hơn, các công cụ JS kém mạnh mẽ hơn

Các nhà phát triển web đã chuyển từ PHP (HTML do máy chủ `render`) sang JavaScript (HTML do máy client render) đã bắt đầu nhận ra rằng họ đã tiêu tốn rất nhiều thời gian để load trang.

Một trang `About Us` đơn giản, có thể là một trang HTML / CSS tĩnh rất đơn giản, bây giờ là một trang có gói JS khổng lồ. Đầu tiên, trình duyệt (client) phải tải xuống, sau đó phân tích cú pháp, sau đó thực thi và sau đó thay đổi DOM để hiển thị nội dung.

Mọi người yêu thích React và các công cụ tương tự. Nhưng họ cũng hiểu ý nghĩa của việc chạy quá nhiều JS phía client.

Mặt khác, họ thích cách hoạt động của PHP (server render HTML), nhưng họ không thích kiến trúc của nó. Vì vậy giải pháp là gì?

## 3. Server-Side Rendering (SSR) – the best of both worlds

Các nhà phát triển web nhận ra, rốt cuộc, khi mã React được thực thi xong, tất cả những gì bạn thực sự có là một HTML document để hiển thị.

Vì vậy, họ đã làm điều đó. Server-Side Rendering (SSR) cho React đã ra đời.

Giờ đây, với SSR, bạn có thể viết mã React, bằng cách nào đó chạy nó trên máy chủ (mạnh hơn thiết bị client thông thường của bạn - như điện thoại di động), rồi gửi HTML document đến client.

Với tư cách là nhà phát triển, bạn có thể viết mã trong React - công nghệ mà bạn yêu thích. Và client truy cập trên trang web sẽ nhận được một HTML document thuần túy, điều này sẽ được tăng hiệu suất rất lớn.

Win-win, ai lại không thích điều đó chứ <3

## 4. But it was too difficult

Server-side rendering chắc chắn là giải pháp cho vấn đề này. Nhưng vấn đề? Quá khó để thiết lập chính xác.

Bộ nhớ đệm và chặn bộ nhớ cache thích hợp? Bạn có thể tạo tệp HTML tĩnh cho các trang không thay đổi không? Bạn nên làm thế nào để xây dựng trải nghiệm điều hướng liền mạch trên trang web của mình ngay cả khi bạn có HTML hiển thị phía máy chủ? Bạn nên giảm tải trên máy chủ của mình như thế nào hoặc tạo nội dung theo yêu cầu?

Và trên hết, làm thế nào để bạn thiết lập toàn bộ kiến trúc này? Chắc chắn, React và web cung cấp tất cả các API cho những thứ này, nhưng chúng khá dài dòng và thường là thiết lập một lần.

Và `Next.js` ra đời trong hoàn cảnh đó

## 5. Introducing Next.js

Github: https://github.com/vercel/next.js

 Việc có đến gần 60k star trên github đã thấy `Next.js` được nhiều người quan tâm đến mức nào 
 `Next.js` đang nhận được những update, bạn có thể check trong tags trên github của next: https://github.com/vercel/next.js/tags

`Next.js` có những giải pháp:

*  Tốt cho việc SEO website
*  Tích hợp bộ nhớ đệm và tối ưu hóa tĩnh tự động
*  Các trang hoàn toàn do máy chủ hiển thị
*  100% React hỗ trợ
*  Tinh chỉnh cấu hình webpack / babel của bạn nếu cần
*  Và nhiều hơn nữa!

Nó trừu tượng tất cả các thiết lập hiệu suất và phát triển bạn cần với một ứng dụng React điển hình và cho phép bạn chỉ tập trung vào những gì quan trọng - code logic nghiệp vụ của bạn.

Next.js 9.5 đã được phát hành trong năm nay với rất nhiều tính năng mới. Và tôi nghĩ thật an toàn khi nói rằng nó là một trong những công cụ mạnh mẽ nhất hiện có trong hệ sinh thái phát triển web, đặc biệt nếu bạn đã là nhà phát triển React.

Nếu bạn là developer React vào năm 2020, một trong những kỹ năng tốt nhất bạn có thể học là Next.js. Dưới đây là một số lợi ích mà nó mang lại cho bạn với tư cách là developer:

*  Một công nghệ mới nổi - nhiều cơ hội và khả năng việc làm hơn
* Các page được server render, có nghĩa là hiệu suất tốt hơn - nhiều khách hàng tìm đến website của bạn hơn
*  SEO cho các trang web của bạn - search engines cũng sẽ yêu bạn
*  Tất cả những lợi ích của việc có một server - API router, tìm nạp nội dung động
*  Một technical skill tuyệt vời trong CV của bạn

## 6. Some Next.js features I'm excited about

Next.js đang phát triển rất nhanh. Họ không dùng các chức năng cũ và luôn giới thiệu những thứ mới tinh và chất lượng.

Cho đến hôm nay, tôi thực sự quan tâm đến toàn bộ framework, nhưng đây là tính năng mà tôi thích nhất

### 6.1 Stable Incremental Static Regeneration

Nói một cách đơn giản, tính năng này cho phép bạn tạo nội dung tĩnh một cách động.

Giả sử bạn có một trang web blog với rất nhiều bài viết. Khi ai đó truy cập `/news/[link]` (trong đó `[link]` là bất cứ thứ gì), bạn muốn cung cấp cho họ trang tĩnh nhanh nhất có thể.

Nhưng có thể bạn không muốn tạo tất cả các trang tĩnh tại thời điểm build vì nó sẽ khiến bạn mất rất nhiều thời gian. Trong một số trường hợp, điều này hoàn toàn không thể xảy ra tại thời điểm build.

Ngoài ra, đôi khi nội dung của bạn có thể thay đổi, chẳng hạn như chỉnh sửa blog nhanh - vì vậy bạn cũng không thực sự muốn một trang hoàn toàn tĩnh mãi mãi. Vậy giải pháp là gì?

Sử dụng Next.js 9.5+, giờ đây bạn có thể tạo động các trang tĩnh theo đường dẫn động và refresh chúng.

Điều này có nghĩa là khi Next tìm nạp URL cụ thể đó, nó sẽ lưu nó dưới dạng một trang tĩnh và phân phát nó một cách tĩnh bất cứ khi nào ai đó truy cập đường dẫn. Đồng thời, nó sẽ sẵn sàng chấp nhận các `paths` mới một cách linh hoạt.

### 6.2 Webpack 5 Support

Next.js cũng đang hướng tới hỗ trợ Webpack 5. Điều này thật thú vị khi Webpack 5 mang lại một số tối ưu hóa bundle và hiệu suất tuyệt vời, đồng thời loại bỏ hỗ trợ cho những thứ không dùng nữa trong webpack 4, làm cho phần `core` nhẹ hơn.

Điều đó có nghĩa là các ứng dụng Next.js của bạn sẽ nhanh hơn bao giờ hết và mạnh mẽ hơn.

[Tìm hiểu webpack 5](https://webpack.js.org/blog/2020-10-10-webpack-5-release/)

### 6.3 Dropping of getInitialProps

Cá nhân tôi không thích khái niệm có một hàm duy nhất thực thi trên cả hai môi trường (client request và server request) - `getInitialProps`.

Rất may, Next.js đã phát hiện ra rằng có một giải pháp tốt hơn nhiều và họ đã đưa `getServerSideProps` và `getStaticProps` vào như hai phương pháp tuyệt vời với những cái tên hay.

`getServerSideProps`, như tên cho thấy, cho phép bạn đưa các `props` vào trang Next.js của mình từ chính `server`. Và `getStaticProps` cho phép Next.js vẫn tạo ra các đầu ra tĩnh tại thời điểm build.

`getStaticProps` kết hợp với tái tạo `static regeneration` là một tính năng tuyệt vời. Bạn nhận được nhiều lợi ích của `dynamic backend` mà không cần có `dynamic backend`.

### 6.4 Persistent Caching for Page Bundles

Next.js hiện cũng hỗ trợ bộ nhớ đệm liên tục cho các trang không bị thay đổi. Trước đây, khi bạn release một ứng dụng Next.js mới, Next.js sẽ loại bỏ toàn bộ ứng dụng và người dùng phải tải xuống lại tất cả CSS / JS, ngay cả khi các gói đó không thay đổi.

Trong phiên bản Next.js mới nhất được phát hành vào tuần trước, những người bạn của chúng tôi tại Vercel đã giới thiệu `Persistent Caching` ([tìm hiểu thêm](https://nextjs.org/blog/next-9-5#persistent-caching-for-page-bundles)) , đây một lần nữa là một điều hoàn toàn tuyệt vời để có hiệu suất.

### 6.5 Out of the box support for Sass Modules and TypeScript

Nếu có một thứ tôi yêu thích hơn JavaScript, thì đó là TypeScript. Và Sass cũng rất ngọt ngào. Hầu hết những người tôi biết đều sử dụng Sass để tăng sức mạnh cho CSS của họ và nó cung cấp trải nghiệm tuyệt vời cho develop

Next.js từ lâu đã cung cấp hỗ trợ tuyệt vời cho TypeScript. Nhưng gần đây họ cũng đã thêm hỗ trợ dựa trên module cho Sass.

Điều này có nghĩa là các `styles` hiện có thể được viết bằng `Sass`, cục bộ cho các module của bạn, với bộ nhớ đệm và xác thực lại - tất cả đều do Next.js quản lý nội bộ.

Có vẻ như Vercel thực sự muốn bạn phát triển những sản phẩm tốt nhất chỉ tập trung vào logic.

## 7. Conclusion

Trên là tìm hiểu của mình về `Next.js`

Hi vọng bài viết trên giúp mọi người có được cái nhìn khái quát về `Next.js`, một ngôn ngữ đang chiếm được nhiều tình cảm của các developer

## 8. Tài liệu tham khảo

[Next.js](https://nextjs.org/)

[Webpack](https://webpack.js.org/blog/2020-10-10-webpack-5-release/)

[Next.js new version 9.5](https://nextjs.org/blog/next-9-5)

[Why You Should Learn Next.js ](https://www.freecodecamp.org/news/why-you-should-learn-next-js-as-a-react-developer/)
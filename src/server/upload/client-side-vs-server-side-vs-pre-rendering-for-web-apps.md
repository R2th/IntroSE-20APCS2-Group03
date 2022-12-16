## Client-rendered Application
Từ khi các framework như Angular, Ember.js và Backbone ra đời, các front-end developer đã có xu hướng render mọi thứ ở client-side . Nhờ có Google và khả năng của nó để "đọc" được JavaScript, nó hoạt động khá tốt và thậm chí còn tương thích với SEO.

Với giải pháp render ở client-side, ta rediect request đến một file HTML duy nhất và server sẽ deliver nó mà không có bất kỳ nội dung nào (hoặc với loading screen) cho đến khi ta fetch tất cả JavaScript và để trình duyệt biên dịch mọi thứ trước khi hiển thị nội dung.

Với một kết nối internet tốt và đáng tin cậy, nó khá nhanh và hoạt động tốt. Nhưng nó có thể tốt hơn thế rất nhiều, và không khó để làm theo cách đó. Đó là những gì chúng ta sẽ thấy trong các phần sau.

## Server-side Rendering (SSR)
Có một giải pháp là SSR, thứ chúng ta từng làm ở rất nhiều năm trước đây, nhưng lại quên đi việc ủng hộ giải pháp render ở phía clients-side.

Với các giải pháp cũ là render phía server-side, lấy ví dụ là bạn xây dựng một trang web với PHP, server đã biên dịch mọi thứ, bao gồm dữ liệu và gửi một trang HTML được điền đầy đủ cho client. Thật nhanh chóng và hiệu quả.

Nhưng mỗi khi bạn navigate đến một route khác, server phải thực hiện lại công việc: Lấy file PHP, biên dịch và gửi HTML, với tất cả CSS và JS trì hoãn tải trang xuống vài trăm ms hoặc thậm chí cả giây.

Điều gì xảy ra nếu ta có thể thực hiện tải trang đầu tiên với giải pháp SSR, sau đó sử dụng framework để thực hiện "dynamic routing" với AJAX, chỉ fetching liệu cần thiết ?

Đây là lý do tại sao SSR ngày càng có nhiều traction trong cộng đồng bởi vì React đã phổ biến một giải pháp để giải quyết vấn đề này đó là:  [RenderToString](https://reactjs.org/docs/react-dom-server.html#rendertostring) method.

Loại ứng dụng web mới này được gọi là  *universal app* hoặc một *isomorphic app*. Vẫn còn một số tranh cãi về ý nghĩa chính xác của các thuật ngữ này và mối quan hệ giữa chúng, nhưng nhiều người sử dụng chúng để thay thế cho nhau.

Dù sao thì lợi thế của giải pháp này là có thể phát triển phía server-side và phía client-side với cùng một code và cung cấp trải nghiệm thực sự nhanh chóng cho người dùng với dữ liệu được tùy chỉnh. Nhược điểm đó là bạn cần phải chạy server.

SSR được sử dụng để fetch dữ liệu và chuẩn bị trước một trang có nội dung tùy chỉnh, tận dụng kết nối internet đáng tin cậy của máy chủ. Đó là kết nối internet của máy chủ tốt hơn so với người dùng với [lie-fi](https://developers.google.com/web/fundamentals/performance/poor-connectivity/#what_is_lie-fi)), do đó, nó có thể prefetch và hợp nhất dữ liệu trước khi cung cấp cho người dùng.

Với dữ liệu được chuẩn bị trước, sử dụng SSR app cũng có thể khắc phục sự cố mà ứng dụng render của client gặp phải với social sharing và hệ thống OpenGraph. Ví dụ: nếu bạn chỉ có một fille `index.html` để cung cấp cho client, chúng sẽ chỉ có một loại siêu dữ liệu (metadata), giống với siêu dữ liệu trang chủ của bạn. Điều này sẽ không được đặt vào ngữ cảnh khi bạn muốn chia sẻ một route khác, do đó, không có route nào của bạn sẽ được hiển thị trên các trang web, khác với nội dung proper user (hình ảnh mô tả và xem trước) mà người dùng muốn chia sẻ với người khác.

## Pre-rendering
Server bắt buộc cho một *universal app* có thể là yếu tố ngăn chặn đối với một số người và có thể là quá mức cần thiết cho một ứng dụng nhỏ. Đây là lý do tại sao pre-rendering có thể là một thay thế thực sự tốt đẹp.

Tôi đã phát hiện ra giải pháp này với [Preact](https://blog.logrocket.com/introduction-to-preact-a-smaller-faster-react-alternative-ad5532eb6d79/) và CLI của chính nó cho phép bạn biên dịch tất cả các pre-selected route, để bạn có thể lưu trữ file HTML được điền đầy đủ vào máy chủ tĩnh (static server). Điều này cho phép bạn cung cấp trải nghiệm siêu nhanh cho người dùng, nhờ Preact / React hydration function mà không cần đến Node.js.

Điều đáng chú ý, vì đây là SSR, bạn không có dữ liệu cụ thể về người dùng để hiển thị tại thời điểm này. Nó chỉ là một file tĩnh (và hơi chung chung) được gửi trực tiếp theo request đầu tiên. Vì vậy, nếu bạn có dữ liệu cụ thể của người dùng, đây là nơi bạn có thể tích hợp design skeleton đẹp mắt để hiển thị cho người dùng rằng dữ liệu của họ đang được load, để tránh một số thất vọng của user:
![](https://images.viblo.asia/8c4f1a00-86b4-4b1c-af88-bf35b4f8150f.png)

Có một nhược điểm khác: Để kỹ thuật này hoạt động, bạn vẫn cần phải có proxy hoặc thứ gì đó để chuyển hướng người dùng đến đúng file.

## Why ?
Với một single-page application, bạn cần chuyển hướng tất cả các yêu cầu đến file gốc và sau đó framework chuyển hướng người dùng với hệ thống routing tích hợp. Vì vậy, load trang đầu tiên luôn là cùng một tập tin gốc.

Để giải pháp pre-rendering hoạt động, bạn cần nói với proxy của mình rằng một số routes cần các file cụ thể và không phải luôn luôn là file `index.html` gốc.

Ví dụ: giả sử bạn có bốn route (`/`, `/about`, `/jobs` và `blog`) và tất cả chúng đều có layout khác nhau. Bạn cần bốn file HTML khác nhau để cung cấp skeleton cho người dùng, sau đó sẽ cho phép `React/Preact` / etc. rehydrate nó với dữ liệu. Vì vậy, nếu bạn chuyển hướng tất cả các route đó đến file `index.html` gốc, trang sẽ gây cảm giác khó chịu, rối mắt trong khi tải, theo đó người dùng sẽ thấy skeleton của trang sai cho đến khi tải xong và thay thế layout. Ví dụ: người dùng có thể thấy một skeleton trang chủ chỉ có một cột, khi họ đã yêu cầu một trang khác có thư viện giống như Pinterest.

Giải pháp là nói với proxy của bạn rằng mỗi trong bốn route đó cần một tệp cụ thể:

* `https://my-website.com` → Redirect đến root `index.html` file
* `https://my-website.com/about` → Redirect đến `/about/index.html `file
* `https://my-website.com/jobs` → Redirect đến `/jobs/index.html` file
* `https://my-website.com/blog` → Redirect đến `/blog/index.html` file

Đây là lý do tại sao giải pháp này có thể hữu ích cho các ứng dụng nhỏ. Bạn có thể thấy nó sẽ khổ sở như thế nào nếu bạn có vài trăm trang.

Nói một cách chính xác, nó không bắt buộc phải làm theo cách này mà bạn có thể sử dụng trực tiếp một file tĩnh. Ví dụ: `https://my-website.com/about/` sẽ hoạt động mà không có bất kỳ redirect nào vì nó sẽ tự động tìm kiếm một `index.html` trong thư mục của nó. Nhưng bạn cần proxy này nếu bạn có param urls `https: //my-website.com/profile/guillaume` sẽ cần redirect yêu cầu đến `/profile/index.html` với layout riêng, vì `profile/guillaume/index.html` không tồn tại và sẽ gây ra lỗi 404.
![](https://images.viblo.asia/594b44c8-d0da-4e7e-ada6-001c6f2f82a3.png)

Nói tóm lại, có ba chế độ xem cơ bản khi play với các rendering strategies được mô tả ở trên: Một loading screen, một skeleton và toàn bộ trang sau khi nó được hiển thị.
![](https://images.viblo.asia/c22da0f7-1c3d-4401-8609-c6661726e437.png)

Tùy thuộc vào chiến lược, đôi khi chúng ta sử dụng cả ba chế độ xem này và đôi khi chúng ta chuyển thẳng đến một trang được hiển thị đầy đủ. Chỉ trong một trường hợp sử dụng, chúng ta buộc phải sử dụng một cách tiếp cận khác:
![](https://images.viblo.asia/565eeb28-b5c7-465e-90fe-8843eb52984f.png)

## Client-only Rendering is Often Not Enough
Các ứng dụng do client-render là điều chúng ta nên tránh ngay bây giờ vì chúng ta có thể làm tốt hơn cho người dùng. Và làm tốt hơn, trong trường hợp này, dễ dàng như pre-rendering. Nó chắc chắn là một cải tiến so với chỉ render ở client và dễ thực hiện hơn so với ứng dụng server-side-rendered hoàn toàn.

Một ứng dụng `SSR/universal` có thể thực sự mạnh mẽ nếu bạn có một ứng dụng lớn với nhiều trang khác nhau. Nó cho phép nội dung của bạn được tập trung và có liên quan khi nói chuyện với trình social crawler. Điều này cũng đúng với các công cụ robot tìm kiếm, hiện đã tính đến hiệu suất của trang web của bạn khi xếp hạng nó.

## References
https://www.toptal.com/front-end/client-side-vs-server-side-pre-rendering
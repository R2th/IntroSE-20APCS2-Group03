![](https://images.viblo.asia/e0ae5f63-69ea-4f10-922b-2c67fc8e55c4.png)

Thời kỳ đầu, khi web mới phát triển, khái niệm Server side render (SSR) đã được biết tới. 

> Bạn request một trang web, server xử lý nội dung thành HTML, return lại cho browser hiển thị lại lên màn hình.

Cho tới nay, SSR vẫn được sử dụng phổ biến và chưa có dấu hiệu bị thay thế hoàn toàn. Nhưng càng ngày, những trang web càng giống ứng dụng hơn là nơi hiển thị nội dung, bạn có thể xử lý ảnh, chat, soạn thảo văn bản.

Dần dần cách thức hoạt động của SSR tỏ ra nặng nề hơn và bộc lộ những nhược điểm nhất định, đó cũng là lúc Client Side Render (CSR) ra đời và không ngừng phát triển cho tới ngày nay.

## How server-side rendering works

![](https://images.viblo.asia/5ecda4bf-90ac-4bf3-af2f-3cfa399e8220.png)

Nội dung HTML được xử lý trên server và trả lại cho browser, lúc này nội dung HTML đã hoàn chỉnh và được hiển thị ngay khi nó được load về máy, tuy nhiên lúc này trang web mới chỉ xem được nội dung, người dùng chưa thể tương tác được. Ngay trong lúc này, trình duyệt vẫn âm thầm tải tiếp JS và thực thi nó ngay khi hoàn tất, một khi hoàn tất quá trình này người dùng mới có thể tương tác được.

Nó sẽ không là vấn đề nếu bạn truy cập 1 trang mới, mà trang này chỉ có 1 số nội dụng thay đổi so với trang hiện tại, lúc này browser sẽ gửi request lên server, server nhận được yêu cầu và re-render lại toàn bộ trang mới.

Từ đây ta có thể nhận thấy một vài điểm yếu nổi bật:

* Trang web phải xử lý lại hoàn toàn và load lại từ đầu nếu chỉ có một thay đổi nhỏ trong nội dung. (Ví dụ tiêu đề thay đổi …)
* Việc xử lý nội dung HTML khiến hao tốn tài nguyên server, gây chậm trễ khi xử lý các request khác.
* Lượng request lên server rất nhiều, do mọi tác vụ đều phải xử lý lại trên server và render lại HTML
* TTFB (Time To First Byte) cao do cần phải xử lý trên server, sẽ ảnh hưởng tới một vài công cụ benchmark

Tuy có nhiều hạn chế như vậy nhưng hiện tại SSR vẫn chưa thể bị thay thế hoàn toàn bởi nó vẫn có những yêu điểm rất lớn và quan trọng:
* Hỗ trợ rất mạnh việc SEO bởi vì các Search engines của Google có thể Crawler dữ liệu tốt hơn
* Load trang lần đầu tiên sẽ rất nhanh
* Sẽ rất tuyệt vời đối với các static page

## How client-side rendering works

![](https://images.viblo.asia/0c35cba8-c5b3-4b7d-b8b3-0437b24634c3.png)

Như trên hình, ta có thể nhận thấy trình duyệt sẽ load tất cả nội dung về máy, một khi đã load thành công, nó sẽ thực thi code, lúc này nội dung trang web mới được hiển thị ra. 

Điều này hoàn toàn khác biệt với SSR bởi vì Server bây giờ chỉ chịu trách nhiệm tải dữ liệu thô của trang web. Mọi thứ khác được xử lý bởi client-site Javascript library (Vuejs, React, Angular,...)

Tuy nhiên, CSR không thể thay thế hoàn toàn được SSR, mỗi cái đều có những điểm mạnh và yếu khác nhau, và chúng đều quan trọng. Nhược điểm của CSR nổi bật như:

* Lượng dữ liệu lần đầu load về khá nặng
* Nội dung hiển thị ra lần đầu chậm hơn so với SSR, tuy nhiên những lần sau thì quá nhanh do việc xử lý ngay trên client.
* SEO bị ảnh hưởng, do nội dung web được sinh trên client, khiến crawler của của Seach engine không tiếp xúc được nội dung. Gần đây mới có Google giải quyết được vấn đề này, tuy nhiên dù Google nắm phần lớn thị phần tìm kiếm thì tại những quốc gia khác nhau, sẽ có ảnh hưởng nhất định.

## Kết luận

Việc sử dụng SSR hay CSR còn phụ thuộc vào dự án bạn thực hiện, quốc gia cũng như những yêu cầu đặc biệt của dự án, không có cách nào áp chế hay thay thế hoàn toàn cách còn lại, chúng song hành cùng nhau và lựa chọn sử dụng chúng một cách khôn ngoan là việc của chúng ta.
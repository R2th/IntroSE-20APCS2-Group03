![](https://images.viblo.asia/48c78b9a-14a9-46a5-b1e1-14c0842c5d33.png)

Thời kỳ đầu, khi web mới phát triển, khái niệm Server side render (SSR) đã được biết tới. Bạn request một trang web, server xử lý nội dung thành HTML, return lại cho browser hiển thị lại lên màn hình. Cho tới nay, SSR vẫn được sử dụng phổ biến và chưa có dấu hiệu bị thay thế hoàn toàn. Nhưng càng ngày, những trang web càng giống ứng dụng hơn là nơi hiển thị nội dung, bạn có thể xử lý ảnh, chat, soạn thảo văn bản … Dần dần cách thức hoạt động của SSR tỏ ra nặng nề hơn và bộc lộ những nhược điểm nhất định. Trước khi nói rõ hơn về nhược điểm, hãy nhắc lại cách hoạt động của SSR.

![](https://images.viblo.asia/4e1f1cfc-867b-49c9-a484-e4b499c24f6c.png)

Theo [nguồn](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8),  nội dung HTML được xử lý trên server và trả lại cho browser, lúc này nội dung HTML đã hoàn chỉnh và được hiển thị ngay khi nó được load về máy, tuy nhiên lúc này trang web mới chỉ xem được nội dung, người dùng chưa thể tương tác được. Ngay trong lúc này, trình duyệt vẫn âm thầm tải tiếp JS và thực thi nó ngay khi hoàn tất, một khi hoàn tất quá trình này người dùng mới có thể tương tác được. Từ đây ta có thể nhận thấy một vài điểm yếu nổi bật :

* Trang web phải xử lý lại hoàn toàn và load lại từ đầu nếu chỉ có một thay đổi nhỏ trong nội dung. (Ví dụ tiêu đề thay đổi …)
* Việc xử lý nội dung HTML khiến hao tốn tài nguyên server, gây chậm trễ khi xử lý các request khác.
* Lượng request lên server rất nhiều, do mọi tác vụ đều phải xử lý lại trên server và render lại HTML
* TTFB (Time To First Byte) cao do cần phải xử lý trên server, sẽ ảnh hưởng tới một vài công cụ benchmark
Và từ những nhược điểm đó, Client Side Render (CSR) được sinh ra.

Hiện nay những chiếc máy tính cá nhân ngày càng trở nên mạnh mẽ, việc render HTML thuần không thể tận dụng được sức mạnh của chúng, nên tại sao không sử dụng chính chúng để xử lý nội dung thay vì đổ tất cả cho server.

![](https://images.viblo.asia/4e1f1cfc-867b-49c9-a484-e4b499c24f6c.png)

Như trên hình, ta có thể nhận thấy trình duyệt sẽ load tất cả nội dung về máy, một khi đã load thành công, nó sẽ thực thi code, lúc này nội dung trang web mới được hiển thị ra. Việc sinh nội dung … đều được thực hiện ngay trên client, server chỉ có nhiệm vụ trả mã nguồn JS và dữ liệu thô cho client. Với CSR, những nhược điểm đã nêu trên của SSR đã được giải quyết hết. Tuy nhiên, CSR không thể thay thế hoàn toàn được SSR, mỗi cái đều có những điểm mạnh và yếu khác nhau, và chúng đều quan trọng. Nhược điểm của CSR nổi bật như :

* Lượng dữ liệu lần đầu load về khá nặng
* Nội dung hiển thị ra lần đầu chậm hơn so với SSR, tuy nhiên những lần sau thì quá nhanh do việc xử lý ngay trên client.
* SEO bị ảnh hưởng, do nội dung web được sinh trên client, khiến crawler của của Seach engine không tiếp xúc được nội dung. Gần đây mới có Google giải quyết được vấn đề này, tuy nhiên dù Google nắm phần lớn thị phần tìm kiếm thì tại những quốc gia khác nhau, sẽ có ảnh hưởng nhất định.

Vậy nên, việc sử dụng SSR hay CSR còn phụ thuộc vào dự án bạn thực hiện, quốc gia cũng như những yêu cầu đặc biệt của dự án, không có cách nào áp chế hay thay thế hoàn toàn cách còn lại, chúng song hành cùng nhau và lựa chọn sử dụng chúng một cách khôn ngoan là việc của chúng ta.
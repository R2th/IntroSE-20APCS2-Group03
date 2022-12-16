## Server side rendering (SSR)
Kể từ thời khai thiên lập địa, các phương pháp thông thường để nhận HTML của trình duyệt là bằng cách sử dụng server-side rendering. Gọi nó là server-side rendering là vì phần lớn logic sẽ được xử lý ở server
![](https://images.viblo.asia/b31506dc-45c5-4e7f-adae-5a9d77405fbd.png)
Bất cứ khi nào bạn truy cập vào trang website, trình duyệt sẽ gửi request tới web server, thông thường mỗi yêu cầu thường chỉ mất vài mili giây, nhưng thực tế nó lại phụ thuộc khá nhiều vào các yếu tố như: Tốc độ đường truyền internet của bạn, vị trí máy chủ của trang website, có bao nhiêu người cũng đang truy cập tại thời điểm bạn gửi yêu cầu, .... Web server sẽ nhận request, đọc dữ liệu từ database (nếu cần), Web server sẽ render HTML, trả về cho browser để hiển thị cho người dùng.

Một số tính chất của cơ chế server side rendering:
* Logic từ đơn giản (validation, đọc dữ liệu) cho đến phức tạp (phân quyền, thanh toán) đều nằm ở phía server.
* Logic để routing – chuyển trang nằm ở server.
* Logic để render – hiển thị trang web cũng nằm ở server nốt.

Khi đó chỉ cần 1 framework như Laravel của PHP, Spring MVC của java hay Rails của ruby là đủ xử hết mọi thứ. Từ cơ chế tính chất trên chắc hẳn các bạn cũng đã nhận ra những nhược điểm nổi bật của server-side rendering rồi nhỉ 🙂 một số nhược điểm đó là:
* Trang web phải xử lý lại hoàn toàn và load lại từ đầu nếu chỉ có một thay đổi nhỏ trong nội dung (Ví dụ tiêu đề thay đổi …) gây khó chịu.
* Nặng server vì server phải xử lý nhiều logic và dữ liệu.
* Việc xử lý nội dung HTML khiến hao tốn tài nguyên server, gây chậm trễ khi xử lý các request khác.
* Lượng request lên server rất nhiều, do mọi tác vụ đều phải xử lý lại trên server và render lại HTML.
* TTFB (Time To First Byte) cao do cần phải xử lý trên server, sẽ ảnh hưởng tới một vài công cụ benchmark.

Tuy có điểm yếu như vậy nhưng hiện tại SSR vẫn chưa bị thay thế hoàn toàn bởi nó có nhưng ưu điểm rất lớn và quan trọng:
* Hỗ trợ rất mạnh việc SEO bởi vì các Search engines của Google có thể Crawler dữ liệu tốt hơn.
* Load trang lần đầu tiên sẽ rất nhanh.
* Sẽ rất tuyệt vời đối với các static page.

## Client Side Rendering (Single Page Applications)
Ở những năm 2010, với sự phát triển của JavaScript và AJAX, cơ chế client-side rendering bắt đầu được sử dụng, Client Side Rendering tức là việc render HTML, CSS sẽ được thực hiện ở client. Frontend và backend có thể tách biệt hoàn toàn và làm việc thông qua cái gọi là API. API là bản lề để nối giữa phần backend (xử lý data và logic) với frontend (xử lý giao diện, hiệu ứng). API là một trong những cái lõi của ứng dụng SPA, thường gặp là có RESTful API, và một cái tên mới nổi là GraphQL (lại một cuộc chiến khác, nhưng tôi nghĩ phần thắng chắc chắn sẽ thuộc về GraphQL)

![](https://images.viblo.asia/5b4acf67-43bd-4a36-bad3-67cf6323027a.jpg)

So với Server Side Rendering (SSR) đã nhắc ở, Client Side Rendering (CSR) có những đặc điểm sau:
* Những logic đơn giản (validation, đọc dữ liệu, sorting, filtering) nằm ở client side
* Logic để routing (chuyển trang), render (hiển thị) dữ liệu thì 96.69% là nằm ở client side	
* Logic phức tạp (thanh toán, phân quyền) hoặc cần xử lý nhiều (data processing, report) vẫn nằm ở server side.

Khi nghe nói cơ chế client-side rendering thì chắc hẳn ai cũng nghe nói đến Single Page Applications (SPA). Nói đơn giản, SPA có một trang gốc và trong trang gốc đó, chúng ta có thể tải nhiều trang con (tương ứng với các thành phần của trang gốc) mà không gây bất kì ảnh hưởng gì tới trang gốc. SPA chỉ load phần trang cần thiết, khác với ứng dụng web truyền thống (tải lại toàn bộ trang) khi chúng ta tương tác với trang web (như thực hiện việc điều hướng).Trong một SPA chúng ta chỉ việc load các thành phần chung (của trang gốc) một lần duy nhất, các thành phần chung này (header, footer, menu…) thường xuất hiện ở nhiều trang của ứng dụng. Ví dụ khi bạn đang ở trang chủ thì sẽ có header, footer là thành phần chung, bây giờ mình chuyển sang trang Giới thiệu chẳng hạn, thì mình chỉ load lại phần nội dung giới thiệu, còn header, footer giữ nguyên. Một số framework dùng để phát triển SPA như: AngularJS, React, EmberJS, Vuejs…

Ưu điểm của SPA: 
* Việc render html ở server là một điều đáng quan tâm nếu trang web của bạn có nhiều người dùng, cực kì tốn tài nguyên hệ thống. Với SPA, điều này chỉ xảy ra lần đầu tiên khi người dùng truy cập trang chủ, còn sau đó việc render sẽ do client đảm nhiệm. Thử tưởng tượng xem 1 server phải render html cho 1000 request từ client, với SPA thì chúng ta để 1000 máy của client làm việc đấy.
* SPA tách biệt phần front-end và back-end ra, SPA giao tiếp với server chủ yếu qua JSON Rest API giúp cho dữ liệu gửi và trả giữa client và server được giảm đến mức tối thiểu. Việc phát triển, kiểm thử cũng có thể độc lập giữa front-end và back-end.
* SPA rất nhanh, vì các tài nguyên tĩnh (static resources) như HTML, CSS, Script chỉ được tải 1 lần duy nhất. Trong suốt quá trình sử dụng, chỉ có dữ liệu là được chuyển giao qua lại giữa client với server -> giảm thiểu băng thông cho server.
* Tăng trải nghiệm người dùng: Như mình nói ở trên, với ứng dụng web truyền thống thì người dùng thường xuyên phải tải lại toàn bộ trang – đồng nghĩa với việc một trang trắng xuất hiện trước khi tải xong, với SPA thì không như vậy, người dùng chỉ phải tải lại những gì họ cần. Người dùng có thể tương tác với SPA như một ứng dụng cho Desktop vậy.\

Tuy khắc phục được tất cả các nhược điểm của các ứng dụng web theo cơ chế server side rendering nhưng SPA không thể thay thế hoàn toàn được web theo cơ chế SSR, mỗi cái đều có những điểm mạnh và yếu khác nhau, và chúng đều quan trọng. Nhược điểm của SPA nổi bật như :
* Người dùng phải cho phép Javascript hoạt động trên trình duyệt. Nếu không SPA sẽ không hoạt động.
* Trình duyệt sẽ phải xử lý rất nhiều, nên vấn đề hiệu năng trên điện thoại tầm trung trở xuống là điều bạn cần quan tâm.
* Phức tạp: Việc phát triển SPA sẽ phức tạp hơn rất nhiều so với ứng dụng web truyền thống. Back-end developer cần phải biết Javascript cũng như biết cách sử dụng một trong những framework dùng để phát triển SPA (AngularJS, React, EmberJS, Vuejs…). Và việc viết unit test cho Javascript cũng có nhiều khó khăn hơn, tuy nhiên hiện nay cũng có rất nhiều framework support việc này.
* SEO bị ảnh hưởng, do nội dung web được sinh trên client, khiến crawler của của Seach engine không tiếp xúc được nội dung. Gần đây mới có Google giải quyết được vấn đề này, tuy nhiên dù Google nắm phần lớn thị phần tìm kiếm thì tại những quốc gia khác nhau, sẽ có ảnh hưởng nhất định
## Kết luận
Trong bài viết này, mình đã giới thiệu sơ về 2 cơ chế client-side rendering và server-side rending. Mình cũng chia sẻ về những ưu nhược điểm của 2 cơ chế này. Việc sử dụng SSR hay CSR còn phụ thuộc vào dự án bạn thực hiện, quốc gia cũng như những yêu cầu đặc biệt của dự án, không có cách nào áp chế hay thay thế hoàn toàn cách còn lại

Một điều mình không nhắc đến  là đôi khi các website sẽ kết hợp cả server-side rendering lẫn client side rendering. Ví dụ server sẽ tải trước một số dữ liệu dưới dạng JSON cho client, hoặc server sẽ render HTML khi gặp bot đễ hỗ trợ crawl tốt hơn
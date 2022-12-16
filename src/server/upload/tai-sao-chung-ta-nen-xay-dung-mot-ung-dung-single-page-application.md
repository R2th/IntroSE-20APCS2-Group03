Với sự phát triển của ứng dụng web, các ứng dụng Destop đang dần trở nên lạc hậu. Bây giờ là thời đại của những trang web thân thiên, dễ dùng, dễ dàng bảo trì, không bị phụ thuộc vào bất cứ phần cứng nào. Tuy vậy thị phần người dùng ứng dụng web đang dần chuyển từ trên nền browser sang nền mobile. Nếu bạn có ý định phát triển một ứng dụng, thì chăc hẳn bạn sẽ nghe tới hai concept chính mà ta có thể áp dụng vào. Đó là : Multi-page Application (MPA) và Single-page Application (SPA). Tất nhiên cái nào cũng sẽ có tốt và xấu riêng.

Trước khi quyết định chọn concept nào để dùng, chắc hẳn chúng ta sẽ có rất nhiều câu hỏi cần được trả lời để định hình cho ứng dụng của mình. Nhưng trước hết, chúng ta có một câu hỏi mà sẽ định hình cho mọi dự án: "**Chúng ta xây dựng ứng dụng về cái gì và người dùng muốn nhận được cái gì từ chúng ta?**". Câu hỏi này sẽ giúp ta chọn concept nào phù hợp với dự án của mình. Nếu bạn muốn một dự án đặt người dùng làm trung tâm, hướng tợi sự tương tác qua lại giữa người dùng và trang web thì **SPA** chắc hẳn sẽ là sự lựa chọn phù hợp. Tư tưởng khi mọi người phát triển ra SPA là giúp người dùng có trải nhiệm thoải mái nhất cỏ thể. 

# Single-Page Application
## Sự hình thành
Single-page Application là mọt ứng dụng hoạt động trên browser và không cần bắt buộc phải reload lại khi sử dụng. Bạn bắt gặp những trang web là SPA hàng ngày, ví dụ như Facebook, Google, hay Gmail ... Cảm giác dùng rất "mượt" phải không? Trang web chỉ cần load trang một lần, sau đó sẽ sủ dụng javascript để load những dữ liệu mà bạn cần dùng (Đây có thể coi vừa là điểm mạnh cũng như điểm yếu của một ứng dụng SPA)

Với MPA, chúng ta có một phong cách hiển thị rất "truyền thống" là mọi dữ liệu sẽ được render ra từ mã HTML, CSS và cả Javascript và trả lại về người dùng hay được gọi là **Server Side Rendering**. Mỗi làn chuyển trang, dù tốc độ mang đến cỡ nào, chúng ta vẫn có cảm giác khựng lại do mỗi lần gửi request, sever đều phải thực hiện công việc như trên để trả lại cho người dùng. Bất cứ thay đổi nho nhất cũng sẽ bắt buộc trang web phải render lại trang. 

Còn với SPA, chúng ta sẽ được tiếp cận một cụm từ khác là **Client Side Rendering** khi Client mới là người render ra từ những dòng HTML, CSS để hiển thị. Nhờ đó mà chúng ta cũng tách biệt được giữ nhưng công việc mà Sever phải làm khi lượng người dùng Internet ngày càng đông, khiến Sever phải chịu tải rất nặng khi vừa phải xử lý dữ liệu lại phải render ra để trả lại cho người dùng. 

Với sự xuất hiện của các framework như AngularJS, ReactJS hay VueJS, SPA đang dần trở thành một xu hướng cho tương lai.

## Ưu nhược điểm
### Ưu điểm
Dưới góc độ là một người dùng : 
* SPA có thể thực hiện đẩy đủ các chức năng của một ứng dụng hiển thị phong cách "truyền thống".
* SPA nhanh, tất cả (HTML + CSS + JS) chỉ phải load một lần trong quá trình sử dụng. Chỉ có dữ liệu là được chuyển qua chuyển qua lại.
* Tăng tính tương tác giữa người dùng.
* Tìm kiếm, tính toán, xử lý nhanh hơn.

Dưới góc độ là một người lập trình viên:
* Việc phát triển back-end và front-end có thể thực hiện song song. Chúng ta không cần phải viết code để render trên sever, ta có thực hiện ngay trên một file html do đó không cần phải khởi chạy sever mỗi khi phát triển.
* Xử lý bất đồng bộ. SPA phát triển dựa trên javascript nên ta có thể tận dụng điểm mạnh của ngôn ngữ. 
* Giúp việc phát triển ứng dụng mobile dễ dàng hơn do người lập trình có thể tái sử dụng code để làm cả ứng dụng web lẫn native mobile.
* Có thể cache lại dữ liệu. Chỉ cần một lần load dữ liệu và sau đó ta có thể tái sử dụng dữ liệu đó nhiều lần kể cả khi offline.

### Nhược điểm

* Sử dụng ngôn ngữ Javascript nên vừa là ưu điểm vừa là nhược điểm nếu người lập trình xử lý không khéo. Ta rất dễ rơi vào "callback hell".
* Có qua nhiều sự lựa chọn nên ta không biết nên dùng cái nào cho dự án của mình.
* Đi kèm với sự linh hoạt trong thiết kế thì ta sẽ không có một quy chuẩn nhất định.
* Bên cạnh tối ưu cho sever, ta cần suy nghĩ tới việc tối ưu cho cả client.
* Lần load đầu sẽ cực kì nặng.
* Ảnh hưởng tới việc SEO.

# Tổng kết

Với sự phát triển mạnh mẽ của "kỉ nguyên javascript", SPA đang dần dần trở thành một hướng đi cho việc phát triển web với tiêu chí là đề cao trải nghiệm người dùng. Tuy vẫn còn những nhược điểm nhưng tôi nghĩ vào một ngày không xa, đây sẽ là hướng đi cho mọi ứng dụng.

# Nguồn tham khảo
https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58
https://www.linkedin.com/pulse/why-single-page-application-pros-cons-ravi-hamsa
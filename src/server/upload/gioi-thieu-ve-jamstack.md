Tôi chắc chắn rằng bạn đã bắt gặp từ JAMstack trước đây nhưng bạn có thể không hiểu ý nghĩa thực sự của nó. Tôi đã nhìn thấy từ này trước đó nhưng cũng không quan tâm để kiểm tra nó cho đến khi Egwuothy Gift tổ chức [JAMstack Lagos](https://twitter.com/jamstacklagos). Sau đó tôi nhận ra rằng tôi đã xây dựng các ứng dụng JAMstack trước đây.

JAMstack là một kiến trúc phát triển web hiện đại. Nó không phải là ngôn ngữ lập trình hay bất kỳ hình thức công cụ nào. Đây là một cách thức phát triển web nhằm mục đích thực thi hiệu suất tốt hơn, bảo mật cao hơn, giảm chi phí mở rộng và giúp cho trải nghiệm của nhà phát triển trở nên tốt hơn.

Trong bài viết này, tôi sẽ giới thiệu cho bạn ý nghĩa của JAMstack, tại sao bạn nên quan tâm, các [best-practices](https://en.wikipedia.org/wiki/Best_practice) và cách để bắt đầu với nó. 😃

# Giới thiệu
![](https://images.viblo.asia/c98a731f-29af-48db-a5fc-a4eb7305ba74.png)

Theo tài liệu chính thức của JAMstack,
> JAMstack là một kiến trúc phát triển web hiện đại dựa trên JavaScript phía client, các API có thể sử dụng lại và Markup dựng sẵn.
Khi chúng ta nói về chủ đề Stack, chúng ta không còn nói về hệ điều hành, máy chủ web cụ thể, ngôn ngữ backend hoặc cơ sở dữ liệu.
JAMstack không phải về công nghệ cụ thể. Nó là một cách mới để xây dựng các trang web và ứng dụng mang lại hiệu suất tốt hơn, bảo mật cao hơn, chi phí mở rộng thấp hơn và trải nghiệm nhà phát triển tốt hơn.

JAMstack là một xu hướng chính trong phát triển web được đặt ra bởi [Mathias Biilman](https://twitter.com/biilmann), CEO và đồng sáng lập của Netlify.

# JAMStack là cái gì ?
Bạn có thể đã gặp các thuật ngữ cụ thể như  MEAN stack, LAMP stack và  MERN stack. Đây chỉ là các thuật ngữ được sử dụng để phân loại hoặc nhóm một số công nghệ nhất định với mục đích đạt được một mục tiêu cụ thể.
JAMstack ở đây là viết tắt của

**J**avaScript

**A**PI

**M**arkup

> Stack nói chung chỉ là sự kết hợp của một số công nghệ được sử dụng để tạo một ứng dụng web hoặc thiết bị di động. Vì vậy, JAMstack là sự kết hợp giữa JavaScript, APIs và Markup. Khá thú vị phải không?

Các dự án JAMstack không  dựa vào code phía máy chủ - chúng có thể được phân phối thay vì dựa vào máy chủ. Được phục vụ trực tiếp từ CDN, ứng dụng JAMstack mở khóa tốc độ, hiệu suất và nâng cao trải nghiệm người dùng.

![](https://images.viblo.asia/9274cbd9-c3bb-4c36-a38a-4ce12fcc999d.png)

# Các thuật ngữ hữu ích

Tôi thường xuyên sử dụng các thuật ngữ này trong bài viết này và tôi nghĩ bạn nên biết ý nghĩa của chúng (nếu bạn chưa biết).

* **API** là từ viết tắt của Application Programming Interface(Giao diện lập trình ứng dụng), là một  phần mềm trung gian cho phép hai ứng dụng nói chuyện với nhau.
* **CDN**  (mạng phân phối nội dung) là một hệ thống các máy chủ phân tán (mạng) phân phối các trang và nội dung Web khác cho người dùng, dựa trên các vị trí địa lý của người dùng, nguồn gốc của trang web và máy chủ phân phối nội dung.
* **Server**  (máy chủ) là một máy tính được thiết kế để xử lý các yêu cầu và gửi dữ liệu đến một máy tính khác qua internet hoặc mạng cục bộ.
* **Database** (cơ sở dữ liệu) là tập hợp thông tin được tổ chức để có thể dễ dàng truy cập, quản lý và cập nhật

# Tại sao là JAMstack ?

![](https://images.viblo.asia/84312fca-e933-42ce-b58d-08757ed37cd3.png)

Các trang web truyền thống hoặc các trang web CMS (ví dụ: WordPress, Drupal, v.v.) phụ thuộc nhiều vào máy chủ, plugin và cơ sở dữ liệu. Nhưng JAMstack có thể tải một số JavaScript nhận dữ liệu từ API, phục vụ các tệp từ CDN và đánh dấu được tạo bằng trình tạo trang tĩnh trong thời gian triển khai.

Nghe thật tuyệt phải không?!

### JAMstack nhanh

Khi nói đến việc giảm thiểu thời gian tải, không có gì vượt qua các tệp có sẵn được cung cấp qua CDN. Các trang web JAMstack siêu nhanh vì HTML đã được tạo trong thời gian triển khai và chỉ được cung cấp qua CDN mà không có bất kỳ sự chậm trễ nào.

### JAMstack có tính bảo mật cao

Mọi thứ hoạt động thông qua API và do đó không vi phạm cơ sở dữ liệu hoặc bảo mật. Với các quy trình phía máy chủ được trừu tượng hóa thành các API dịch vụ vi mô, các khu vực bề mặt cho các cuộc tấn công được giảm và do đó trang web của bạn trở nên được bảo mật cao.

### JAMstack chi phí thấp hơn và dễ dàng mở rộng hơn
Các trang web JAMstack chỉ chứa một vài tệp với kích thước tối thiểu có thể được phục vụ ở bất cứ đâu. Thu nhỏ là vấn đề phục vụ các tệp đó ở một nơi khác hoặc thông qua CDN.

# JAMstack best-practices
* Sử dụng CDN để phân phối tệp của bạn chứ không phải máy chủ
* Cài đặt và đóng góp cho dự án của bạn nên dễ dàng và ít phức tạp hơn. Sử dụng các công cụ như npm và Git để đảm bảo thiết lập tiêu chuẩn và nhanh hơn.
* Sử dụng các công cụ xây dựng và làm cho dự án của bạn tương thích với tất cả các trình duyệt (ví dụ: Babel, Browserify, Webpack, v.v.)
* Đảm bảo dự án của bạn đạt tiêu chuẩn web và có khả năng truy cập cao
* Đảm bảo quá trình xây dựng của bạn được tự động để giảm căng thẳng.
* Làm cho quá trình triển khai của bạn tự động, bạn có thể sử dụng các nền tảng như Netlify để làm điều này

# Bắt đầu với JAMstack

Bạn có thể sử dụng một số công nghệ đã được xây dựng để xây dựng các ứng dụng JAMstack trong ít phút. Sau đây là một vài ví dụ:

* [**Gatsby**](https://www.gatsbyjs.org/): Gatsby là một framework mã nguồn mở và miễn phí dựa trên React giúp các nhà phát triển xây dựng các trang web và ứng dụng nhanh chóng
* [**NuxtJS**](https://nuxtjs.org/): NuxtJS là frameworkg Vue.js cho các ứng dụng phổ quát, ứng dụng  tĩnh, ứng dụng trang đơn(SPA) và ứng dụng máy tính để bàn
* [**Hugo**](http://gohugo.io/): Hugo là framework nhanh nhất thế giới về xây dựng trang web. Nó là một trong những trình tạo trang tĩnh nguồn mở phổ biến nhất. Với tốc độ và sự linh hoạt đáng kinh ngạc của mình, Hugo làm cho việc xây dựng trang web trở nên sôi động trở lại.
* [**Netlify CMS**](https://www.netlifycms.org/): Netlify CMS là một trình quản lý nội dung nguồn mở cho quy trình công việc Git của bạn, có thể được sử dụng với bất kỳ trình tạo trang tĩnh nào cho dự án web nhanh hơn và linh hoạt hơn
* [**Contentful**](https://www.contentful.com/): Contentful là một hệ thống quản lý nội dung thông minh và liền mạch hơn, cung cấp cho các biên tập viên và nhà phát triển một nội dung thống nhất từ ​​đó tăng cường hợp tác và đảm bảo các sản phẩm kỹ thuật số được đưa ra thị trường nhanh hơn.
* [**Svelte**](https://svelte.dev/): Svelte là một cách tiếp cận mới triệt để để xây dựng giao diện người dùng. Trong khi các framework truyền thống như React và Vue thực hiện phần lớn công việc của họ trong trình duyệt, Svelte chuyển công việc đó thành một bước biên dịch xảy ra khi bạn xây dựng ứng dụng của mình.
# Các nguồn hữu ích
* [**JAMstack WTF**](https://jamstack.wtf/)

* [**How to Build a JAMstack Website**](https://cosmicjs.com/blog/how-to-build-a-jamstack-website)

* [**What is JAMstack and why you should try it**](https://www.giftegwuenu.com/what-is-ja-mstack-and-why-you-should-try-it/)

* [**A JAMstack-ready CMS**](https://www.contentful.com/r/knowledgebase/jamstack-cms/)

* [**JAMstack for Clients: On Benefits & Static Site CMS**](https://snipcart.com/blog/jamstack)

* [**Go static: 5 reasons to try JAMstack on your next project**](https://builtvisible.com/go-static-try-jamstack/)

* [**Static Websites + JAMstack = ❤**](https://julian.is/article/static-websites-and-jamstack/)

{@embed: https://www.youtube.com/watch?v=uWTMEDEPw8c}

# Kết luận

JAMstack được phát minh như một cách xây dựng trang web và ứng dụng mới mang lại hiệu suất tốt hơn, bảo mật cao hơn, chi phí mở rộng thấp hơn và trải nghiệm nhà phát triển tốt hơn.

JAMstack không phải là các công nghệ cụ thể, nó là một kiến trúc phát triển web hiện đại dựa trên JavaScript phía client, các API có thể sử dụng lại và Markup dựng sẵn.

Tham gia [cộng đồng JAMstack](https://jamstack.org/community/) để tìm hiểu thêm và nhận thêm thông tin cập nhật.

### Link bài viếc gốc
https://medium.com/free-code-camp/an-introduction-to-the-jamstack-the-architecture-of-the-modern-web-c4a0d128d9ca
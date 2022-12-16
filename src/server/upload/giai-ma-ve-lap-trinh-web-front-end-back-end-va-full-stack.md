Lập trình web với tôi là cả một niềm đam mê, hứng khởi. Nhưng tôi từng chơi vơi, lênh đênh không biết phải bắt đầu từ đâu trong khi tôi chỉ là một chàng sinh viên nghèo tỉnh lẻ lên Sài Gòn học đại học thì lấy đâu ra tiền để tham gia các lớp tại các trung tâm đào tạo.

Tôi tìm kiếm thông tin từ mọi phương tiện, sách báo, bạn bè, internet...

Trong đầu có muôn vạn câu hỏi: học lập trình web cần bắt đầu từ đâu?, học lập trình web cần học ngôn ngữ gì?, ...

Nhưng dường như rất ít các bài viết sách báo hay tài liệu ghi rõ ngọn ngành và rất nhiều bài viết thiếu xót, thông tin dễ gây hiểu nhầm.

Hy vọng với bài viết này bạn sẽ hiểu được bản thân cần làm gì để trở thành một lập trình web (Front-End, Back-End hay Full Stack).

### 1. Website, web application.
#### Website
Ngày xưa, khi Internet còn thô sơ, web được viết bằng html đơn lẻ. Mỗi trang web đơn lẻ được viết bằng html gọi là Web Page. Tập hợp nhiều trang web đơn lẻ, thành một trang web lớn, có chung tên miền, được gọi là Website.

các website chỉ bao gồm text, hình ảnh và video, liên kết với nhau thông qua các link. Tác dụng của website là lưu trữ và hiển thị thông tin. Người dùng chỉ có thể đọc, xem, click các link để di chuyển giữa các page.
#### Web application
Về sau, với sự ra đời của các ngôn ngữ server: CGI, Perl, PHP, … các website đã trở nên “động” hơn, có thể tương tác với người dùng. Từ đây, người dùng có thể dùng web để “thực hiện một công việc nào đó bằng máy tính“, do đó web app ra đời.

Nói dễ hiểu, web app là những ứng dụng chạy trên web. Thông qua web app, người dùng có thể thực hiện một số công việc: tính toán, chia sẻ hình ảnh, mua sắm … Tính tương tác của web app cao hơn website rất nhiều.

![](https://images.viblo.asia/a5d7c2a0-1c87-4f41-b950-6b4221001a08.png)

Và để một website hoạt động thì cần có 3 thành phần cơ bản: Source Code, Web hosting và domain.

#### Source Code (mã nguồn):
Phần mềm website do các lập trình viên thiết kế xây dựng. Phần này giống như bản thiết kế, vật liệu xây dựng, trang thiết bị nội ngoại thất của ngôi nhà vậy.
#### Web hosting (Lưu trữ web):
Dùng để lưu trữ mã nguồn. Thành phần này tương tự như mảnh đất để bạn có thể xây dựng ngôi nhà. Là một dịch vụ lưu trữ nằm trên Server hoặc bạn đủ giàu có thể dùng cả Server cho website của bạn.

Là trang web của bạn được đặt trên  một máy chủ cùng với nhiều trang web khác. Thông thường, các website này chia sẻ chung tài nguyên từ máy chủ như bộ nhớ RAM và CPU.
#### Domain (Tên miền):
Là địa chỉ của website để các máy tính ở các nơi trỏ tới khi muốn truy cập vào website. Tên miền có vai trò giống như địa chỉ ngôi nhà, dựa vào đó thì người khác mới có thể tìm tới thăm nhà bạn được.

#### Server:
Một máy chủ dùng riêng (Server) cung cấp cho bạn quyền kiểm soát hoàn toàn trên máy chủ mà bạn đặt website – Bạn được độc quyền sử dụng và hoàn toàn có thể cho những người dùng khác thuê lại. Trang web của bạn là trang web duy nhất trên máy chủ nếu bạn muốn.

### 2. Lập trình website, web application.
Để trở thành lập trình viên website hay web application thì bạn cần biết một số điều sau:

Đầu tiên web chia làm 2 thành phần chính: Front-End, Back-End.

Bạn có thể chọn lựa làm lập trình Front-End, lập trình Back-End hay lập trình Full Stack (là lập trình cả Front-End và Back-End).

![](https://images.viblo.asia/84088c08-d62b-4a72-99c8-0d3f72fb3bbb.jpg)

#### Front-End:
Phần front-end của một trang web là phần tương tác với người dùng. Tất cả mọi thứ bạn nhìn thấy khi điều hướng trên Internet, từ các font chữ, màu sắc, hình ảnh cho tới các menu xổ xuống và các thanh trượt, là một sự kết hợp của HTML, CSS, và JavaScript được điều khiển bởi trình duyệt máy tính của bạn.

#### Back-End:
Vậy điều gì giúp phần front-end của một trang web có thể hoạt động được? Tất cả dữ liệu sẽ được lưu trữ ở đâu? Đó là phần việc của back end. Phần back end của một trang web bao gồm một máy chủ, một ứng dụng, và một cơ sở dữ liệu. Một lập trình viên back-end xây dựng và duy trì công nghệ mà sức mạnh của những thành phần đó, cho phép phần giao diện người dùng của trang web có thể tồn tại được.

### 3.Lập trình Front-End
Để trở thành một lập trình viên Front-End (Developer Front-End) thì bạn cần thuần thục 3 ngôn ngữ chính: HTML, CSS, và ngôn ngữ lập trình JavaScript.Ngoài ra, các lập trình viên front-end cần phải làm quen với các framework như Bootstrap, Foundation, Backbone, AngularJS, và EmberJS, để đảm bảo nội dung luôn hiển thị tốt trên mọi thiết bị khác nhau, và các thư viện như jQuery và LESS, đóng gói code vào trong một hình thức giúp tiết kiệm thời gian và hữu dụng hơn. Rất nhiều công việc dành cho lập trình viên front-end cũng yêu cầu kinh nghiệm với Ajax, một kỹ thuật được sử dụng rộng rãi bằng cách dùng JavaScript để cho phép các trang load một cách tự động bằng cách tải dữ liệu máy chủ ở phần background.
#### Bắt đầu học
##### Html
Html là chữ viết tắt của Hypertext Markup Language. Nó giúp người dùng tạo và cấu trúc các thành phần trong trang web hoặc ứng dụng, phân chia các đoạn văn, heading, links, blockquotes...

HTML không phải là ngôn ngữ lập trình, đồng nghĩa với việc nó không thể tạo ra các chức năng “động” được. Nó chỉ giống như Microsoft Word, dùng để bố cục và định dạng trang web.

Khi học HTML bạn cần chú ý:

* Tìm hiểu các khái niệm cơ bản và cách viết HTML
* Hiểu cách chia trang thành các phần và cách cấu trúc DOM đúng cách.

Mục tiêu:

* Hãy thử ngồi xây dựng một trang html bất kỳ. Mặc nó không đẹp được như các trang web ta thường thấy nhưng quan trọng là chúng ta hướng đến đó là cấu trúc bố cục. Và hãy cố gắng nhớ được thật nhiều các thẻ của HTML.

##### CSS
CSS là ngôn ngữ tạo phong cách cho trang web – Cascading Style Sheet language. Nó dùng để tạo phong cách và định kiểu cho những yếu tố được viết dưới dạng ngôn ngữ đánh dấu, như là HTML. Nó có thể điều khiển định dạng của nhiều trang web cùng lúc để tiết kiệm công sức cho người viết web. Nó phân biệt cách hiển thị của trang web với nội dung chính của trang bằng cách điều khiển bố cục, màu sắc, và font chữ.

Mục tiêu:
* Sau khi đax tạp môkt trang web bằng html, bạn hãy thử sử dụng thêm cho nó css để nó trở nên đẹp và có bố cục hơn.

#### CSS Frameworks

CSS Frameworks: Bootstrap, Bulma...

Nhưng trên thực tế thì bạn nên chọn Bootstrap để bắt đầu, nó hỗ trợ rất tốt và được đông đông đảo Development sử dụng.

##### Javascript
JavaScript là ngôn ngữ kịch bản cho phép tạo ra trang web động - cập nhật nội dung theo ngữ cảnh, điều khiển đa phương tiện, hoạt cảnh các hình ảnh và nhiều thứ hay ho khác. (Dĩ nhiên không phải mọi thứ, nhưng chỉ với một vài dòng code, JavaScript có thể làm được nhiều điều đáng kinh ngạc.)

JavaScript cho phép bạn làm cho các trang HTML của bạn tương tác với thao tác của người dùng hơn. Ví dụ khi bạn đăng nhập vào một website thành công, bạn nhận được thông báo đăng nhập thành công. Thì điều đó được tạo nên từ javascript đấy

Sau khi học xong 3 ngôn ngữ chính (Html, CSS, Javascript) thì lúc này bạn đã đủ khả năng để học các framework, bạn hãy chọn cho mình 1 frameworl để bắt đầu, đừng quá lo lắng khi chọn framework vì khi bạn đã thuần thục Html, CSS và Javascript thì bạn sẽ đủ tư duy để bắt đầu 1 framework. Khi thuần thục 1 framework thì framework sau cũng sẽ trở nên dễ dàng với bạn.

### 4. Lập trình Back-End
Để rở thành lập trình viên Back-End thì bạn có thể chọn học một hoặc nhiều trong những ngôn ngữ sau: Java, .NET, PHP, Python hay Ruby,… Ngoài ra do yêu cầu công việc thường xuyên phải thao tác với dữ liệu, nên những Back-end Developer cũng cần có những kiến thức về SQL và các hệ quản trị cơ sở dữ liệu như: MySQL, Oracle, và SQL Server… đây là những hệ quản trị cơ sở dữ liệu phổ biến nay.

#### SQL:
SQL là viết tắt của Structured Query Language có nghĩa là ngôn ngữ truy vấn có cấu trúc, là một ngôn ngữ máy tính để lưu trữ, thao tác và truy xuất dữ liệu được lưu trữ trong một cơ sở dữ liệu quan hệ.

### 5. Full Stack
Thường thì không có sự phân biệt rõ ràng giữa phát triển Front-End và Back-End. Các lập trình viên Front-End thường cần phải tìm hiểu thêm những kỹ năng Back-End, và ngược lại các lập trình viên Back-End thường cần tìm hiểu những kỹ năng Front-End

Nhưng khi bạn làm Full-Stack thì đòi hỏi kiến thức của bạn đều tốt ở cả Front-End và Back-End và lương của bạn cũng cao hơn.

### 6. Tổng kết
Dù Front-End hay Back-End đều có những phần cơ bản bắt buộc phải nắm vững và cũng có những phần riêng.

Giữa các framework hay giữa các ngôn ngữ ở Back-End, các bạn hãy mạnh dạng chọn một framework, một ngôn ngữ để nắm thật vững. Đến lúc bạn đi làm thực tế sẽ có đủ kiến thức để làm cái đã học hoặc cũng có đủ tư duy để bắt đầu dễ dàng với một cái mới.

> **Chọn lựa và bước đi, đừng do dự, đừng dẫm chân tại chỗ, nếu bước sai bạn có thể bước lại, nếu không bước đi bạn chỉ mãi đứng một chỗ.**
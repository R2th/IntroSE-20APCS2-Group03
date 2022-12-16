**Github bây giờ là nơi mà các lập trình viên và nhà thiết kế làm việc cùng nhau. Họ cộng tác, đóng góp và sửa lỗi. Nó cũng chứa rất nhiều dự án mã nguồn mở và các mã ngôn ngữ lập trình khác nhau. Hơn nữa, Github cũng phát hành một ứng dụng máy tính để bàn cho cả Windows và OS X, cho phép bất cứ ai tích hợp Github trong luồng công việc của họ một cách liền mạch.**

**Nhưng Github có nhiều tính năng hữu ích hơn những gì chúng ta thấy. Một số tính năng được phần nào ẩn bên dưới giao diện người dùng cho gọn gàng và do đó bị bỏ qua bởi nhiều người. Vì vậy, đây là 10 tính năng Github mà bạn có thể không biết .**

### **1. Kéo và thả code với Gist**

Gist là 1 phần riêng biệt của Github, cho phép bạn lưu trữ các đoạn code. Bạn cũng có thể duyệt và tìm một số lượng lớn các đoạn mã của nhiều ngôn ngữ khác nhau. Sử dụng Gist hoàn toàn dễ dàng và phải trực quan. Nhưng, bạn có biết rằng bạn có thể thêm code trực tiếp từ các tệp tin trong máy tính của mình không? Chỉ cần kéo và thả các tệp từ máy tính vào Gist, các đoạn code trong các tệp sẽ được sao chép ngay lập tức. Nó nhanh chóng và tiết kiệm cho bạn rất nhiều thời gian!

![](https://images.viblo.asia/3d63b20f-3047-4e6f-b2af-17bbea94651d.gif)

### 2. Tạo một thư mục thông qua Giao diện Web

Trong khi nhiều người trong chúng ta có thể quản lý repo Github thông qua ứng dụng Github miễn phí. Ngoài ra, Github cũng đã xây dựng những gì họ gọi là WebFlow. Nó cho phép chúng ta quản lý repo thông qua giao diện web của Github.

Và dưới đây là cách bạn tạo thư mục hoặc tệp mới trực tiếp trong Github. 

![](https://images.viblo.asia/f7e2b781-75db-4a97-a914-41574c790815.gif)

### 3. Sử dụng Git URL Shortener

Ngày nay, mọi người thích chia sẻ mọi thứ từ hình ảnh, trạng thái và tin tức của họ trên mạng xã hội. Nếu bạn là người dùng Github, bạn cũng có thể muốn chia sẻ repo Github của mình. Tuy nhiên, URL của repo đôi khi quá dài để chia sẻ, ví dụ như Twitter chỉ chấp nhận URL chứa tối đa 140 ký tự.

Chắc chắn có rất nhiều tùy chọn để rút ngắn URL ví dụ như Bit.ly và Goo.gl, nhưng tại sao không cân nhắc sử dụng 1 trong các chức năng tương tự như vậy của Github là Git.io? [Git.io](https://git.io/) sẽ rút ngắn URL của repo Github của bạn.

![](https://images.viblo.asia/e3939efd-04dc-49de-bd35-24cd4c8e9ef5.jpg)

### 4. Tìm kiếm tập tin và file
Bên cạnh việc tạo các tệp mới, bạn cũng có thể điều hướng và tìm kiếm nhanh chóng qua các tệp trong bất kỳ repo nào. Tính năng này rất hữu ích nhưng lại không rõ ràng vì nó bị ẩn và chỉ hoạt động khi dùng phím tắt.

Nhấn phím `T` để kích hoạt Trình tìm kiếm tệp. Nhấn ↑ và ↑ nhảy qua các tệp lên và xuống. Hoặc, nhập tên tệp để chọn một tệp cụ thể mà bạn đã có.

![](https://images.viblo.asia/a7a0611f-bdf8-475a-879d-0fadd40fc311.gif)

### 5. Sử dụng Github Emoji

Tương tự như Facebook hay một số mạng xã hội, Github cũng tích hợp 1 số Emoji để khi review, comment các đoạn code trên Github đỡ nhàm chán :D. Bạn có thể tìm tất cả các ký tự Emoji và mã trong [Bảng Cheat Emoji](https://www.webpagefx.com/tools/emoji-cheat-sheet/). 

![](https://images.viblo.asia/158e048e-95ca-4f2e-8a5a-5b40eb126e08.png)

### 6. Sử dụng Github CLI

Trong khi hầu hết mọi người thích làm việc bằng cách sử dụng GUI, vẫn có một số người thích sử dụng CLI (Giao diện dòng lệnh). Github CLI được bắt đầu với từ khoá `hub`. Github CLI bổ sung các cú pháp có thể được sử dụng cùng với các cú pháp của git. Danh sách đầy đủ các tính năng có thể được tìm thấy tại [Hub](https://github.com/github/hub) repo.
Ví dụ:
> `$ hub clone rtomayko/tilt`

sẽ expands thành: 

> `$ git clone git://github.com/rtomayko/tilt.git`

![](https://images.viblo.asia/5f8d99e1-0a89-4b92-b565-408e31c7d7f4.jpg)

### 7. Linking Lines
Đôi khi, bạn có thể muốn chia sẻ và chỉ ra các dòng cụ thể trong 1 file bất kỳ trên git repo của bạn . Github cho phép bạn làm điều này bằng cách thêm tham số `#L` tiếp theo là số dòng ở cuối URL của file (xem ví dụ bên dưới).

Bạn cũng có thể chọn một loạt các dòng bằng cách chỉ định các dòng bắt đầu và kết thúc trong tham số `#L`. Ví dụ `#L10-15` sẽ chọn dòng 10 đến 15.

![](https://images.viblo.asia/48dfa1ca-ce5b-4a9e-87cc-527e5f62bae8.jpg)

### 8. Task Checklist
Github tích hợp sẵn rất nhiều các cú pháp markdown . Bạn có thể thêm một list các checkboxes trong pull request bằng cách sử dụng `- []` hoặc `- [x]` để biểu thị một mục đã chọn. Xin lưu ý rằng checkboxes sẽ chỉ xuất hiện trong một list các item; các `[]` dấu hiệu phải được bắt đầu với một dấu gạch ngang `-`. Đây là một ví dụ:

- [x] create a post.
- [x] create a page.
- [x] add images.
- [ ] published the post.

Sau khi create pull sẽ trông như thế này:

![](https://images.viblo.asia/68445f96-3f1b-4aac-87af-958772fdc0c1.jpg)

### 9. Maps, CSV và 3D Rendering
Gihub hỗ trợ file **CSV**. Nếu bạn include một tệp .csv, Github sẽ hiển thị tệp CSV của bạn thành định dạng dữ liệu bảng. Nó thậm chí còn cho phép bạn tìm kiếm thông qua nó. Ngoài CSV, Github cũng sẽ tự động hiển thị Bản đồ với định dạng **geoJSON** và 3D với phần mở rộng **STL** .

![](https://images.viblo.asia/6719a9e5-64b4-4bdb-8d3a-7dc10b236b08.jpg)

### 10. Get Octodex
Cuối cùng nhưng không kém phần quan trọng, bạn có biết rằng Github có nhiều phiên bản linh vật của nó, Octocat? Google có Doodle, trong khi Github có [Octodex](https://octodex.github.com/). Octodex là một tập hợp các phiên bản sáng tạo thay thế cho Octocat. Ở đó, bạn có thể tìm thấy Labtocat, Femalecodertocat, Octoliberty, Spidertocat, Megacat, và một loạt các Octocats thú vị khác. Bạn có thể sử dụng Octodex làm hình đại diện cá nhân. Tham khảo trang [FAQ](https://octodex.github.com/faq.html) để biết thêm về chính sách sử dụng của Octodex.

Tham khảo: [HongKiat](https://www.hongkiat.com/blog/github-overlooked-features/)

Cảm ơn các bạn đã theo dõi bài viết. Xin cảm ơn và hẹn gặp lại.
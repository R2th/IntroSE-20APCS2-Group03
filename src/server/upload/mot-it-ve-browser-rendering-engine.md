Mỗi browser sử dụng rendering engine để chuyển dữ liệu HTML thành dạng dữ liệu khác dùng cho việc render content trên page của browser đó, hiện tại chúng ta vẫn biết các browser các khau dùng các rendering engines khác nhau:

* Apple dùng Webkit trong Safari
* Google dùng Webkit cho Chrome
* Microsoft dùng 2 cái Trident và EdgeHTML
* Mozila dùng Geko cho FireFox

Trong bài viết này mình muốn nói rõ hơi 1 chút về rendering engine.

![](https://images.viblo.asia/8fe71101-a6ef-4908-8f00-5ef920d50685.png)

Các thành phần chính trong 1 browser bao gồm:

* The user interface: Phần này bao gồm thanh url bar, nút quay lại / chuyển tiếp, menu đánh dấu trang, v.v. Mọi phần của trình duyệt đều hiển thị ngoại trừ cửa sổ nơi bạn nhìn thấy trang được yêu cầu.
* The browser engine: Phần này thống nhất các hành động giữa user interface và rendering engine.
* The rendering engine: Phần này chịu trách nhiệm hiển thị nội dung được yêu cầu. Ví dụ: nếu nội dung được yêu cầu là HTML, rendering engine phân tích HTML và CSS, đồng thời hiển thị nội dung được phân tích trên màn hình.
* Networking: Phần này là network calls, chẳng hạn như HTTP request, sử dụng các platform khác nhau cho nền tảng khác nhau đằng sau một giao diện độc lập với nền tảng.
* UI backend: Phần này được sử dụng để render các thành phần cơ bản combo box và window. Bên dưới nó sử dụng operating user interface của hệ điều hành.
* JavaScript interpreter: Phần này dùng để phân tích cú pháp và thực thi các đoạn code JavaScript.
* Data storage: Browser có thể cần lưu tất cả các loại dữ liệu cục bộ, chẳng hạn như cookie. Các browser cũng hỗ trợ các cơ chế lưu trữ như localStorage, IndexedDB, WebSQL và FileSystem.


Điều quan trọng cần lưu ý là các trình duyệt như Chrome chạy multiple rendering engines, nghĩa là mỗi tab có 1 instance riêng. Mỗi tab chạy trong 1 process riêng biệt.

Đây cũng là sự khác nhau khá lớn giữa Webkit và Geko.

### Main flow hoạt động của rendering engine:

![](https://images.viblo.asia/010bb385-fbf2-44bb-95a8-69d2d5bee21c.png)

Rendering engine sẽ bắt đầu lấy nội dung của tài liệu được yêu cầu từ tầng network. Điều này thường sẽ được thực hiện trong các khối dữ liệu 8kB.

Rendering engine sẽ bắt đầu phân tích dữ liệu HTML và chuyển đổi các thành phần thành các DOM node được gọi là content tree. Engine sẽ phân tích dạng dữ liệu, cả trong các tệp CSS bên ngoài và trong các style element. Thông tin tạo style cùng với visual instructions trong HTML sẽ được sử dụng để tạo ra render tree.

Render tree các hình chữ nhật với các thuộc tính trực quan như màu sắc và kích thước. Các hình chữ nhật theo đúng thứ tự được hiển thị trên màn hình.

Sau khi xây dựng render tree, nó sẽ trải qua một quá trình layout. Điều này có nghĩa là cung cấp cho mỗi node tọa độ chính xác nơi nó sẽ xuất hiện trên màn hình. Giai đoạn tiếp theo là vẽ - render tree, mỗi nút sẽ được vẽ bằng cách sử dụng UI backend layer.

Dưới đây là 2 hình vẽ mô tả main flow của webkit và geko:

Main flow của webkit:

![](https://images.viblo.asia/1d7c7e86-521b-4e41-a022-1a31cc78ea09.png)

Main flow của geko:

![](https://images.viblo.asia/1655947b-a6f2-4f2e-b98f-a085df358799.jpg)

Từ 2 hình vẽ trên, bạn có thể thấy rằng mặc dù WebKit và Gecko sử dụng thuật ngữ hơi khác nhau, nhưng về cơ bản quy trình là giống nhau.

### Một chút về Geko

Gecko process cho nó xử lý tất cả các tab đồng thời trên một process duy nhất. Mặc dù điều này dẫn đến giao diện tương đối chậm hơn, nhưng về lâu dài, việc không tạo thêm một process mới cho mọi tác vụ nhỏ cần được hoàn thành - mô hình thường được sử dụng trong trong WebKit. Điều này có nghĩa là mặc dù một số tab đầu tiên với WebKit sẽ có vẻ nhanh hơn, nhưng đó là bởi vì engine chỉ sử dụng một số tài nguyên bổ sung từ máy tính để song song công việc, nhưng khi bạn tăng lên gấp đôi trong các tab được mở, với một số trong số chúng thực hiện công việc sử dụng nhiều tài nguyên, chẳng hạn như phát video hoặc làm việc với các ứng dụng web, mô hình này quay trở lại làm tê liệt hiệu suất tổng thể của hệ thống và bởi phần mở rộng, của chính trình duyệt, do số lượng của các process đang được hệ thống yêu cầu phân nhánh và duy trì.

Firefox, như thường được trích dẫn, có xu hướng làm tốt hơn nhiều trong việc xử lý tải áp suất cao như vậy, bởi vì toàn bộ hoạt động của trình duyệt bị giới hạn trong một process duy nhất, dễ bảo trì hơn nhiều ở cấp hệ thống. Sự khác biệt về diện tích bộ nhớ tăng gần như theo cấp số nhân giữa hai loại.

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn

Bài viết được tổng hợp từ các nguồn:

* https://en.wikipedia.org/wiki/Browser_engine
* https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/
* https://softnuke.com/firefox-gecko-engine-whats-behind-your-browser/
# 1. Khái quát

Các bộ chọn jQuery được sử dụng để tìm hoặc chọn các phần tử HTML dựa trên tên, id, lớp, loại, thuộc tính, giá trị của các thuộc tính và nhiều hơn nữa. Nó dựa trên các bộ chọn CSS hiện có. Ngoài ra, nó có một số bộ chọn tùy chỉnh riêng. 

JQuery Selector là một hàm sử dụng các biểu thức để tìm ra các phần tử phù hợp từ DOM dựa trên các tiêu chí đã cho. Đơn giản là bạn có thể nói, các bộ chọn được sử dụng để chọn một hoặc nhiều phần tử HTML bằng jQuery. Khi một phần tử được chọn thì chúng ta có thể thực hiện các hoạt động khác nhau trên phần tử được chọn đó.
# 2. Tác dụng

JQuery Selector được phát triển trên nền thư viện JavaScript với mục đích viết ngắn gọn và thực hiện được nhiều hơn. Giúp đơn giản hóa nhiều thứ phức tạp trong JavaScript

Dễ dàng sử dụng JavaScript trên trang web mà bạn đang xây dựng, phát triển.

Có rất nhiều chức năng phổ biến mà đòi hỏi cần nhiều dòng code JavaScript để thực hiện và chúng được gói gọn lại trong một method mà bạn có thể gọi đến chỉ trong một dòng code.

Đơn giản hóa rất nhiều thứ phưc tạp trong JavaScript. Ví dụ như việc gọi và thực hiện Ajax
## Thư viện jQuery có các tính năng sau đây:
### HTML/DOM manipulation:

DOM (Document Object Model) hay Mô hình đối tượng tài liệu là một chuẩn được định nghĩa bởi Tổ chức Web Toàn Cầu (World Wide Web Consortium – W3C).

DOM cung cấp cách thức để truy cập và thay đổi nội dung của các tài liệu HTML. Phần lớn các trình duyệt web hiện này đều triển khai DOM dưới nhiều hình thức và mức độ khác nhau. Cũng như rất nhiều chuẩn khác, đặc biệt các chuẩn liên quan đến lập trình web, DOM được phát triển và cải tiến qua nhiều năm. Hiện có ba đặc tả DOM, được gọi là các cấp độ của DOM, đặc tả thứ tư hiện đang được phát triển.

Mỗi thẻ HTML sẽ có những thuộc tính và phân cấp cha – con với các thẻ HTML khác. Sự phân cấp này gọi là Selector và DOM sẽ có nhiệm vụ xử lý các vấn đề như: đổi thuộc tính của thẻ, đổi cấu trúc HTML của thẻ ,..vv..

Khi một trang web được tải, trình duyệt tạo ra một Document Object Model trang. Dưới đây là mô hình cây DOM
![](https://images.viblo.asia/097571e1-9387-4027-b587-26ecc6530e8a.png)

### DOM có thể làm gì:
*    JavaScript có thể thay đổi tất cả các phần tử HTML trong trang
*    JavaScript có thể thay đổi tất cả các thuộc tính HTML trong trang
*    JavaScript có thể thay đổi tất cả các kiểu CSS trong trang
*    JavaScript có thể xóa các phần tử và thuộc tính HTML hiện có
*    JavaScript có thể thêm các thành phần và thuộc tính HTML mới
*    JavaScript có thể phản ứng với tất cả các sự kiện HTML hiện có trong trang
*    JavaScript có thể tạo các sự kiện HTML mới trong trang
### Các loại DOM trong Javascript:
*    DOM document: có nhiệm vụ lưu trữ toàn bộ các thành phần trong tài liệu của website
*    DOM element: có nhiệm vụ truy xuất tới thẻ HTML nào đó thông qua các thuộc tính như tên class, id, name của thẻ HTML
*    DOM HTML: có nhiệm vụ thay đổi giá trị nội dung và giá trị thuộc tính của các thẻ HTML
*    DOM CSS: có nhiệm vụ thay đổi các định dạng CSS của thẻ HTML
*    DOM Event: có nhiệm vụ gán các sự kiện như onclick(), onload() vào các thẻ HTML
*    DOM Listener: có nhiệm vụ lắng nghe các sự kiện tác động lên thẻ HTML đó
*    DOM Navigation dùng để quản lý, thao tác với các thẻ HTML, thể hiện mối quan hệ cha – con của các thẻ HTML
*    DOM Node, Nodelist: có nhiệm vụ thao tác với HTML thông qua đối tượng (Object)

# 3. Cú pháp
jQuery selectors được sử dụng để tìm các phần tử HTML dựa trên name, ID, class, types, attributes, values of attributes, . . . Nó dựa trên các CSS selector hiện có và ngoài ra có một số bộ tùy chỉnh riêng.
Tất cả các bộ chọn trong jQuery bắt đầu bằng dấu đô la và dấu ngoặc đơn: $()

`$(selector).action()`

*    $ để xác định / truy cập jQuery.
*    (selector) để tìm kiếm các phần tử HTML.
*    action() là hành động được thực hiện trên các phần tử đó.

Ví dụ:

$(this).hide() - ẩn phần tử hiện tại

$(p).hide() - ẩn tất cả các thẻ p

# 4. Lời kết
Như vậy phần này mình đã giới thiệu khái quát đến mọi người về jQuery Selector rồi. Hy vọng bài viết sẽ các bạn tìm được thêm những thông tin bổ ích. 

##### Để biết thêm chi tiết về các selectors các bạn có thể xem thêm tại https://api.jquery.com/category/selectors/
Hôm nay tôi sẽ giới thiệu một hiệu ứng có bố cục giống như tạp chí hai mặt và sẽ lật sang khá đẹp.
![](https://images.viblo.asia/5a6f366d-e86d-4e80-8b9a-47c5a574c799.jpg)

[Demo](https://tympanus.net/Development/PageFlipLayout/) 
[Download Source](http://tympanus.net/Development/PageFlipLayout/PageFlipLayout.zip)

When navigating, the content gets covered and then the next “pages” show. Depending on how far the pages are apart (when choosing a page from the menu), we show multiple elements to cover the content, creating a flat page flip look. We’ve added a little visual indicator on each page side, representing a book cover. The indicator will grow, depending on which page we’re currently at.

Khi chuyển trang, nội dung của trang trước sẽ được bao phủ bởi một lớp background trắng và sau đó hiển thị "trang" tiếp theo. Tùy thuộc vào khoảng cách giữa các trang (khi chọn một trang từ trình đơn), chúng tôi hiển thị nhiều phần tử để che nội dung, tạo ra một giao diện lật trang phẳng (page-flip). Chúng tôi đã thêm một số đề mục nhỏ ở mỗi bên trang, đại diện cho bìa sách.

Hiệu ứng động được làm bởi TweenMax.

Tôi không thực sự phân chia trang ra làm hai, mà chỉ mô phỏng nó bằng cách thêm một đường kẻ ở giữa. Tôi sử dụng cấu trúc ô 20 × 20 và thêm vị trí tùy chỉnh cho mỗi hình ảnh bằng cách sử dụng thuộc tính grid-area.

![](https://images.viblo.asia/59f17a64-abfd-4da4-bd23-cb08dc5be6bf.jpg)

Menu cho phép chuyển đổi giữa các trang. Các đường màu xanh ở mỗi bên của màn hình đóng vai trò như một đề mục:

![](https://images.viblo.asia/a9dc5744-9a58-41c5-9bd7-215a9ec373b6.jpg)

Và đây là KẾT QUẢ

![](https://images.viblo.asia/89b1dce9-1c21-403d-8d6e-057c1caa0f1d.gif)

*Nguồn: https://tympanus.net/codrops/2018/11/12/page-flip-layout/*
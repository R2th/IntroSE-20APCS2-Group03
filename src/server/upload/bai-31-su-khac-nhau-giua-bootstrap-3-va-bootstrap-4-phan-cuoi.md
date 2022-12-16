Chào các bạn,

Qua 2 bài trước, các bạn cũng có thể thấy được sự khác nhau giữa 2 phiên bản Bootstrap 3 và Bootstrap 4 không phải là ít. Bài viết này mình sẽ tiếp tục liệt kê những sự khác nhau còn lại giữa 2 bản và đây cũng là những điểm khác biệt cuối cùng trong seri bài viết này.


| **Component** | **Bootstrap 3** | 	**Bootstrap 4** |
| -------- | -------- | -------- |
|   **Pagination**   |      |      |
|  Default Pagination   |   Yêu cầu phải có class .pagination thêm vào element bao ngoài cùng (thường là tag ul)   |   Phải thêm class .page-item cho mỗi phần tử li  và class .page-link cho mỗi phần tử a.   |
|   Pagers   |  Sử 2 classes .previous và .next để điều hướng chuyển trang |  Tạm dừng phần này trong bản Bootstrap 4 (Alpha 3).    |
|   **Labels**   |      |      |
|  Pill Labels    |  Trong Bootstrap 3 không có sẵn .label-pill. Tuy nhiên, ở bootstrap 3 có phần [badges](https://www.quackit.com/bootstrap/bootstrap_3/tutorial/bootstrap_badges.cfm) (có hiệu ứng tương tự).    |   Labels được thay thế bởi [badges](https://www.quackit.com/bootstrap/bootstrap_4/tutorial/bootstrap_badge.cfm). Để bo tròn góc cho các badges có thể sử dụng class .badge-pill.  |
|    **Tags**  |      |      |
|  Supported?    |   Không.  "Tags" được gọi là "Labels" trong bootstrap 3 (ví dụ: họ sử dụng .label class).   |   Tags được thay thế bằng "badges". Chúng đã được thay thế từ bootstrap 3.  |
|    **Jumbotron**  |      |      |
|   Full-Width   |   Không bắt buộc class .jumbotron-fluid khi jumbotrons full-width.  |   Giới thiệu class .jumbotron-fluid  cho jumbotrons full-width.   |
|    **Progress Bars**  |      |      |
|    Uses progress?  |   Không sử dụng <progress.>  element cho progress bars. Thay vào đó sử dụng các class cho các <div> lồng nhau để tạo  progress bars.  |  Ở bản Alpha 6 có sử dụng <progress> tuy nhiên thời điểm hiện tại đã bỏ. Bootstrap 4 hiện tại lại sử dụng <div> như bootstrap 3.    |
|    **Glyphicons**  |      |      |
|  Supported?   |   Có sử dụng   |  Đã bỏ    |
|   **Typography** |      |      |
|   Blockquotes   |  Bootstrap 3 đã có sẵn style mặc định cho <blockquote> element.  |   Giới thiệu class .blockquote  để style cho <blockquote> element. |
|   Blockquote Alignment   | Sử dụng class .blockquote-reverse để căn chỉnh blockquote sang bên phải.     |  Sử dụng các class trong phần utilities để căn chỉnh text (như .text-center và .text-right).   |
|   Page Headers   |   Có sử dụng class .page-header.   |   Đã bỏ class .page-header.   |
|   Description Lists   |  Sử dụng class .dl-horizontal để khai báo horizontal list.    |   Horizontal list được khai báo bởi class .row cho <dl> tag, tiếp theo là sử dụng grid system cho các <dt> và <dd> tags.  |
|   **Non-Responsive Usage**   |      |      |
|   Supported?   |   Có. Bạn có thể sử dụng các layout đặc biệt ko có responsive.   |   Không hỗ trợ .  |
|   **List Groups**   |      |      |
|    Linked List Items / Button List Items  |   Sử dụng class .list-group-item cho <a> element.  |  Sử dụng class .list-group-item-action cho <a> element.    |
|   **Collapse**   |      |      |
|   Show content   |   Sử dụng class .in khi phần content được hiển thị   |  Thay class .in bằng class .show    |
|    **Cards**  |      |      |
|   Supported?   |  Không support.    |   Trong bootstrap 4, cards được thay thế bằng các functions panels, wells, and thumbnails.   |
|  **Panels**    |      |      |
|   Supported?   |   Có sử dụng.   |  Không sử dụng. Đã được thay thế bằng cards.    |
|    **Wells**  |      |      |
|   Supported?   |   Có sử dụng.   |  Không sử dụng. Đã được thay thế bằng cards.    |
|   **Thumbnails**   |      |      |
| Supported?   |   Có sử dụng.   |  Không sử dụng. Đã được thay thế bằng cards.    |
|  **Breadcrumbs**   |      |      |
|   Classes   |  Sử dụng class .breadcrumb cho <ul> tag.    |   Yêu cầu sử dụng .breadcrumb-item cho tất cả các phần tử <li> tạo nên breadcrumb.   |
|    **Carousels**  |      |      |
|  Carousel Item    |   Sử dụng .item class.   |  Sử dụng .carousel-item class.    |
|    **Affix**  |      |      |
|  Supported?    |   Có.   |   Không.   |

    
Như vậy, seri liệt kê những sự khác nhau giữa bootstrp 3 và bootstrap 4 đã kết thúc ở đây. Hi vọng qua 3 bài viết của mình, các bạn có thể bổ sụng cho mình được vài điều thú vị.
    
Link tham khảo: https://www.quackit.com/bootstrap/bootstrap_4/differences_between_bootstrap_3_and_bootstrap_4.cfm
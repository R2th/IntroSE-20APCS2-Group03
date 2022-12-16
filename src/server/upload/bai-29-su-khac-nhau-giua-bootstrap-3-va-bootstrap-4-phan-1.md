Chào các bạn!

Trước khi đi vào chi tiết sự khác biệt giữa 3 phiên bản Bootstrap 3 và Bootstrap 4, mình muốn hỏi 1 câu: đã có bao bạn đã từng sử dụng cả 2 phiên bản Bootstrap? Và khi dùng bootstrap 4, các bạn có nhận ra được ở bootstrap 4 đã có những sự thay đổi gì so với bootstrap 3 hay không? 
Bài viết này mình sẽ liệt kê một số điểm khác biệt (không phải tất cả) giữa 2 phiên bản bootstrap 3 và 4 - chỉ những cái mà 2 phiên bản đều dùng.

Thực tế, sẽ có nhiều bạn và cả mình đều chưa sử dụng hết những điều mà mình sắp liệt kê dưới đây. Tuy nhiên để tìm hiểu thêm thì đó cũng là 1 điều không tồi phải không?

| Component	 | Bootstrap 3 | Bootstrap 4 |
| -------- | -------- | -------- |
|**Global**   |
| Source CSS Files     | LESS     | SCSS    |
| Primary CSS Unit     | px    | rem   |
|Media Queries Unit|px | px|
|Global Font Size|14px |16px|
|Default Fonts|Helvetica Neue, Helvetica, Arial, sans-serif| Sử dụng "native font stack" tức là font mặc định của người dùng. Tuy nhiên vẫn có font dự phòng là Helvetica Neue, Arial, and sans-serif|
|**Grids**   |
|Grid Tiers| 4 loại: xs, sm, md, lg|5 loại:  xs, sm, md, lg, xl. Thực tế, ở bootstrap 4 đã bỏ **xs** khỏi màn hình nhỏ nhất. Do đó, **col-** *  bao gồm tất cả các thiết bị (không cần chỉ định kích thước trong trường hợp này).|
|Offsetting Columns|Sử dụng **col-*-offset-*** classes để set cho offset columns. Ví dụ: col-md-offset-4.|Sử dụng offset-*-* classes để set offset columns. Ví dụ: offset-md-4. Ở bootstrap 4 đã bỏ tiền tố **col-** trong phần offset|
|**Tables**   |
|Dark/inverse Tables|Không hỗ trợ |Thêm dark/inverse tables với the .table-dark class. Lưu ý: trước khi phát hành Beta 2, sử dụng .table-inverse class. Sau đó được thay thế bằng .table-dark class trong Beta 2.|
|Table Head Styles|Không hỗ trợ|Thêm vào table head styles class.thead-light và class .thead-dark . Lưu ý: trước khi phát hành Beta 2, bắt buộc phải sử dụng .table-default class và the .table-dark class. Tuy nhiên sau khi phát hành bản Beta 2 đã được thay thế bằng .table-light và .table-dark class.|
|Condensed Tables|.table-condensed|.table-sm|
|Contextual Classes|Bootstrap 3 không sử dụng tiền tố .table- cho Contextual classes. Ví dụ, khi table ở trạng thái active thì ở Bootstrap 3 chỉ thêm .active còn ở Bootstrap 4 sẽ là .table-active. Điều này tương tự cho cả 5 contextual keywords (active, success, info, warning, danger). | Thêm tiền tố .table- vào mỗi contextual classs|
|Responsive Tables|Thêm class .table-responsive vào <div> cha của nó|Thêm class .table-responsive vào <div> cha của nó|
|**Forms** |||
|Horizontal Forms|Yêu cầu sử dụng .form-horizontal class. Form không nhất thiết phải dùng class .row khi sử dụng grid (mặc dù class này là bắt buộc khi sử dụng grid nói chung trong bootstrap 3)|Bootstrap 4 đã class .form-vertical - không còn cần thiết để hiển thị horizontal forms. Thay vào đó, form yêu cầu phải thêm class .row khi sử dụng grid hoặc class .form-row khiến cho form nhỏ gọn hơn. |
|Horizontal Forms|Thêm class .control-label khi sử dụng grid cho form layout|Bootstrap 4 thêm class .col-form-label  grid cho form layout. Lưu ý rằng ban đầu Bootstrap 4 đã sử dụng .form-control-label class nhưng tạm thời thay đổi nó thành .col-form-label class.|
|Checkboxes and Radio Buttons|Sử dụng .radio, .radio-inline, .checkbox, hoặc .checkbox-inline để hiển thị checkbox hoặc radio button|Sử dụng .form-check, .form-check-label, .form-check-input, và  .form-check-inline để hiển thị checkbox hoặc radio button.|
|Form Control Size| Sử dụng .input-lg và .input-sm để tăng hoặc giảm size của 1 input-control|Sử dụng .form-control-lg và .form-control-sm để tăng hoặc giảm size của 1 input-control|
|Form Label Size|Không có class cụ thể để thay đổi kích thước của label|Bootstrap 4 giới thiệu các class .col-form-label-sm và .col-form-label-lg để tăng hoặc giảm size của label cho phù hợp với kích thước của form liên quan.|
|Help Text|Sử dụng .help-block để hiển thị help text|Bootstrap 4 sử dụng .form-text để hiển thị help text|
|Validation and Feedback Icons|Bao gồm các trạng thái validate của form như error, warning, and success. Bootstrap 3 sử dụng glyphicons để hiển thị các trạng thái này|Các style của validation không có sẵn trong bootstrap 4.  Thay vào đó là sử dụng message validation của form trong bootstrap|
|Legends|Không sử dụng class style cho form legends|Có thể sử dụng .col-form-label class cho <legend> để sử dụng nó như 1 label|
|Static text|Sử dụng .form-control-static để hiển thị static text thay vì control.|Trong bootstrap 4,  .form-control-static class được thay đổi thành .form-control-plaintext.|
|Custom Forms|Không hỗ trợ|Bootstrap 4 giới thiệu [custom forms](https://www.quackit.com/bootstrap/bootstrap_4/tutorial/bootstrap_custom_forms.cfm) để thay thế cho cái mặc định của trình duyệt|

Do bài viết quá dài nên mình sẽ viết thành 2 phần. Những phần khác nhau còn lại mình sẽ giới thiệu vào bài sau.

Bài viết được tham khảo từ https://www.quackit.com/bootstrap/bootstrap_4/differences_between_bootstrap_3_and_bootstrap_4.cfm
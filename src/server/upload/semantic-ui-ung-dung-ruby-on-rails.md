Đối với các dự án phát triển web, bạn phải có kinh nghiệm sử dụng các plugin có nguồn mở khác nhau và các khung frontend. Mặc dù Ruby on Rails luôn là lựa chọn chính của tôi về khung web, bạn cũng cần một khung giao diện để phục vụ bố cục HTML và các thành phần tiêu chuẩn đáp ứng của bạn.

### Khung giao diện

***Bootstrap 4***

Nó là một lựa chọn phổ biến và đã phát triển rất nhiều kể từ ngày sau khi Twitter phát hành nó trong Github cho công chúng sử dụng. Hệ thống lưới, các thành phần tiêu chuẩn và tích hợp javascript là điển hình cho tất cả các ứng dụng web. Nó giúp bạn tiết kiệm rất nhiều thời gian khi bootstrapping dự án mới của bạn. 

***Semantic UI***

Với Semantic, nó nói thêm về cú pháp và lựa chọn từ cho các lớp gần với ngôn ngữ của con người. Tôi thấy khái niệm này gần với những gì chúng ta đang làm với Ruby. Đây là định nghĩa chính thức:

> UI Semantic coi các từ và các lớp là các khái niệm có thể trao đổi.
> Các lớp sử dụng cú pháp từ các ngôn ngữ tự nhiên như mối quan hệ danh từ / bổ nghĩa, trật tự từ và số nhiều để liên kết các khái niệm bằng trực giác.

Theo văn bản này, phiên bản mới nhất là 2.4. Để cho bạn thấy một ví dụ về việc tạo hộp đầu vào cho phép mọi người nhập URL với nhãn mặc định (http: //) ở phía trước. Trong thuật ngữ Bootstrap, nó được gọi là nhóm đầu vào và theo thuật ngữ Semantic, nó gọi là đầu vào có nhãn.

```
# Bootstrap
<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">http://</span>
  </div>
  <input type="text" class="form-control" placeholder="medium.com">
</div>
```

{@embed: https://jsfiddle.net/phuonganhdinh_96/pyd2091n/}

Hai đoạn mã này từ 2 khung khác nhau được tạo ra về cơ bản là cùng một đầu ra. Tuy nhiên, bạn có thể thấy rằng cú pháp của Semantic UI gọn gàng và tự nhiên hơn so với Bootstrap.
Có những thành phần tuyệt vời khác không tồn tại trong Bootstrap nguyên bản.

### Divider( Dải phân cách )

Phân chia nội dung giữa lưới:

Horizontal Divider(Dải phân cách ngang)

{@embed:https://jsfiddle.net/phuonganhdinh_96/rt6fL4es/}
                                         *  Semantic UI — Divider*

### Form Components

***Dropdown***

UI Semantic bao gồm các biểu tượng FontAwgie Standard 5.0. Bạn có thể thêm trước mỗi mục lựa chọn bằng một biểu tượng hoặc hình ảnh. Danh sách dropdown của bạn có thể là một (Country) hoặc nhiều lựa chọn (Send Receipt To).

***Checkbox***

Checkbox cũng có nhiều loại khác nhau như được minh họa trong đoạn mã:

```
/* Regular Checkbox */
<div class="ui checkbox">
  <input type="checkbox" name="promotion" class="hidden" checked>
  <label>Please send me promotion material.</label>
</div>
/* Slider Checkbox */
<div class="ui slider checkbox">
  <input type="checkbox" name="data_privacy" class="hidden">
  <label>I accept your termsand conditions</label>
</div>
/* Toggle Checkbox */
<div class="ui toggle checkbox">
  <input type="checkbox" name="gift" class="hidden">
  <label>Do not include a receipt in the package</label>
</div>
```

{@embed: https://jsfiddle.net/phuonganhdinh_96/3yLxcsvr/}

*PlaceHolder*

Một trình PlaceHolder được sử dụng để dành chỗ cho nội dung sẽ sớm xuất hiện trong bố cục. Điều này hữu ích khi bạn muốn trì hoãn việc tải một số nội dung nhất định nhưng muốn bảo lưu bố cục.

{@embed: https://jsfiddle.net/phuonganhdinh_96/a60x4he1/}

*Reveal*

Một tiết lộ hiển thị nội dung bổ sung thay cho nội dung trước đó khi được kích hoạt.
{@embed: https://jsfiddle.net/phuonganhdinh_96/gv8ck2xz/}

*Step*

Một step cho thấy trạng thái hoàn thành của một hoạt động trong một loạt các hoạt động

{@embed: https://jsfiddle.net/phuonganhdinh_96/1jraL2c3/}

*Progress*

Một progress cho thấy sự tiến triển của một nhiệm vụ.

{@embed: https://jsfiddle.net/phuonganhdinh_96/ud5r31cv/}

*Rating*

Một rating cho thấy sự quan tâm của người dùng trong nội dung.

{@embed: https://jsfiddle.net/phuonganhdinh_96/ehrw2u4s/}

Đây chỉ là một vài ví dụ về các tính năng vốn có trong Semantic UI. Bạn nên kiểm tra trang web chính thức để biết thêm.

### Tích hợp với Rails

Có một giao diện người dùng [Semantic cho Sass](https://github.com/doabit/semantic-ui-sass) đã sẵn sàng để sử dụng. Thực hiện thêm `gem 'semantic-ui-sass'` trong Gemfile của bạn và chạy lệnh `bundle install`

Hãy nhớ đổi tên application.css của bạn thành application.css.scss. Để biết chi tiết kiểm tra các tài liệu.

UI Semantic cung cấp các bộ thành phần và tùy chọn bố cục tương tự với các tính năng bổ sung và cú pháp rõ ràng không có sẵn trong Bootstrap. Tôi thừa nhận rằng Bootstrap đã trưởng thành hơn và có sự hỗ trợ lớn hơn về các plugin bên ngoài (như bộ chọn thời gian ngày). Tôi khuyên bạn nên thử điều này trong nguyên mẫu hoặc dự án tiếp theo của bạn.

[Nguồn Dịch.](https://medium.com/swlh/plugins-and-frameworks-for-your-next-ruby-on-rails-project-5793d8dee3eb)
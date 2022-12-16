### **I. Giới thiệu**

-  Hiện nay, chúng ta có thể dễ dàng tìm được vô vàn những theme có sẵn trên nguồn tài nguyên dường như bất tận mang tên "Internet". Tuy nhiên, rất ít những theme có sẵn đó được thiết kế đúng theo chuẩn cấu trúc và hỗ trợ sẵn Rails. Chính vì lẽ đó, trong bài viết này mình sẽ hướng dẫn các bạn từng bước cách tích hợp một theme bất kì vào project Rails của mình. Bài viết này đặc biệt hữu ích đối với những bạn mới làm quen với Rails.
-  Chúng ta sẽ demo bằng theme [Resume](https://startbootstrap.com/template-overviews/resume/)

### **II. Tạo mới project**

-  Tạo project mới bằng lệnh
```
rails new custom_theme_demo
```

-  Di chuyển vào project vừa tạo trên terminal
```
cd custom_theme_demo
```

-  Xóa toàn bộ comment bên trong `Gemfile`, sạch sẽ hơn, dễ nhìn hơn.
-  Tạo controller mới kèm theo index action
```
rails generate controller Pages index
```

-  Đặt index của pages làm root route trong file `/config/routes.rb`
```
Rails.application.routes.draw do
  root 'pages#index'
end
```

-  Cài đặt gem và mở server trong terminal
```
bundle install
rails s
```

-  Truy cập vào `localhost:3000` sẽ được màn hình
![](https://images.viblo.asia/82818b2e-ed63-45e5-94bf-2ef993456922.png)

### **III. Tích hợp các file HTML, CSS, Javascript,...**
- Nếu chưa tải theme về thì đây là thời điểm thích hợp để bạn làm việc đó. Giải nén theme đã tải về. Bên trong thư mục vừa giải nén bạn sẽ thấy có các thư mục, các file HTML và một số file liên quan tới bản quyền (nếu theme có trả phí). Việc cần làm lúc này là mở và copy toàn bộ code có trong file `index.html` vào `app/view/pages/index.html.erb` trong project đã tạo trước đó.

1. Xử lý nội dung bên trong thẻ head

- Toàn bộ các thẻ meta và nội dung của nó bạn cut và paste vào trước thẻ head đóng `</head>` của `app/view/layout/application.html.erb`.
- Sửa nội dung bên trong thẻ `<title>` của `application.html.erb` theo ý thích và xóa thẻ `<title>` cùng nội dung của nó ở file `index.html.erb`.
- Lúc này sẽ còn lại các thẻ `<link>`. Ta thấy có link tới file bootstrap, bạn đi theo đường dẫn  href bên trong thẻ link mở file bootstrap kiểm tra version của nó. Nếu theme của bạn sử dụng bootstrap 3 bạn có thể xem hướng dẫn tại: https://github.com/twbs/bootstrap-sass . Theme sử dụng trong bài này là bootstrap v4.1.3. Vậy ta sẽ sử dụng gem bootstrap tương ứng với v4.x, tham khảo ở: https://github.com/twbs/bootstrap-rubygem
- Thêm vào `Gemfile`
```
gem 'bootstrap', '~> 4.1.3'
gem 'jquery-rails'
```

- Cài đặt gem và restart server:
```
bundle install
rails s
```

- Đổi tên `app/assets/stylesheets/application.css` thành `application.scss`
- Xóa toàn bộ nội dung bên trong và thêm `@import "bootstrap";`
- Thêm vào trước những require có sẵn trong `app/assets/javascripts/application.js`
```
//= require jquery3
//= require popper
//= require bootstrap-sprockets
```

- Xóa thẻ `<link>` liên quan tới bootstrap trong `index.html.erb`
- Cut toàn bộ các `<link>` liên quan tới font và paste dưới các `<meta>` trong `application.html.erb`
- Kiểm tra version font-awesome, trong theme này là 5.2.0, ta sẽ tìm gem tương ứng https://github.com/FortAwesome/font-awesome-sass
- Làm theo hướng dẫn ở tích hợp gem, ta sẽ:
    - Thêm vào `Gemfile`: `gem 'font-awesome-sass', '~> 5.2.0'`
    - Chạy lệnh `bundle install`
    - Thêm vào `application.scss`
        ```
        @import "font-awesome-sprockets";
        @import "font-awesome";
        ```
    - Xóa thẻ `<link>` có font-awesome trong `index.html.erb`

- Ngoài ra nếu theme của bạn có chứa những css hoặc scss khác được link vào index bạn cũng nên tìm gem tương ứng cho nó trước, nếu không có gem nghĩa là css hoặc scss đó được viết riêng cho theme này hoặc không có gem hỗ trợ.
- Đối với những file như trên, bạn tìm kiếm file đó theo đường dẫn trong href của `<link>` và copy toàn bộ các file đó vào `app/assets/stylesheets`. Nhớ thêm scss vào tên file (ví dụ: `resume.css` thành `resume.css.scss`). Tuy nhiên nếu theme có hỗ trợ sẵn scss các bạn không cần thực hiện đổi tên. Hãy tìm file `.scss` tương ứng, trong theme này các file scss nằm trong thư mục `/scss`. Copy toàn bộ các file trong thư mục `/scss` và paste vào `app/assets/stylesheets`.
- Import các file đã copy và đổi tên vào `application.scss`, ví dụ: `@import "resume";`

- Nếu trong `<head>` có chứa các script, xử lý tương tự như trong thẻ `<body>` bên dưới.

- Xóa thẻ `<head>` và toàn bộ nội dung còn sót lại bên trong.

2. Xử lý nội dung bên trong thẻ body:
- Sau khi đã xử lý xong `<head>`, lúc này ta sẽ xóa toàn bộ những gì nằm ngoài thẻ `<body>` và xóa luôn thẻ `<body>`. Tuy nhiên nếu thẻ `<body>` có chứa `id` hoặc `class` nào đó, ta sẽ copy các `id` hoặc `class` đó đưa vào `<body>` của `application.html.erb`. Toàn bộ nội dung bên trong `<body>` giữ nguyên, nhớ chỉnh lại indent cho phù hợp. Nội dung được giữ lại chính là nội dung bạn sẽ thấy trên browser khi truy cập view này (index).

- Các file `javascript` hoặc `script` thường được viết hoặc thêm vào ngay trước khi đóng thẻ `<body>`. Ta sẽ lần lượt xử lý các file này như sau…

    - Tất cả những dòng `script` có liên quan tới `bootstrap` có đầy đủ trong quá trình thêm `gem bootstrap` nên có thể xóa được ngay những dòng này.

    - `Jquery` cũng đã có sẵn khi tạo project nên có thể xóa luôn dòng `script` tương ứng.

    - Đối với những `script` khác nếu tìm thấy gem tương ứng version, hãy sử dụng gem đó. Nếu gem có version quá cũ so với `script` thì không nên dùng gem hoặc `script` không có gem chúng ta sẽ đều làm thủ công. Tìm theo đường dẫn nằm trong `src` của `script` và copy các file đó vào `app/assets/javascripts`.

    - Xóa toàn bộ các thẻ `<script>` sau khi đã xử lý xong.

    - Toàn bộ ảnh được gán vào `body` các bạn có thể tìm theo đường dẫn có sẵn trong các thẻ `<img>` và copy paste vào `app/assets/images` sau đó chỉnh sửa lại các câu lệnh thành `link_to` phù hợp chuẩn Rails

- Bước cuối cùng là chỉnh sửa lại toàn bộ các lệnh trong `index.html.erb` theo đúng chuẩn Rails

### **IV. Tài liệu tham khảo**

- Source: [Bùi Mạnh Cường](https://github.com/manhcuongdtbk/custom_theme_integration)

### **V. Kết luận**

Trên đây là hướng dẫn cơ bản cách tích hợp một theme bất kì vào project Rails. Hi vọng qua bài viết này các bạn có thể hiểu và nắm rõ quy trình cũng như phương thức tích hợp 1 hay nhiều theme vào project. 

## **Cảm ơn đã theo dõi**
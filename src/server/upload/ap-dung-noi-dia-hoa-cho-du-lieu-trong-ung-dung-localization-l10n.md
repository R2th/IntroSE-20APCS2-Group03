# Giới thiệu
Trong thời đại mới hiện nay, chúng ta luôn muốn mở rộng thị trường của mình đến mọi nơi trên thế giới để mang lại nhiều doanh số cũng như đem về lợi nhuận nhiều hơn. Việc mở rộng này sẽ không hề dễ dàng nếu ứng dụng của bạn không có khả năng nội địa hoá (localized). Bởi vì mỗi nơi trên thế giới có ngôn ngữ, hệ thống đo lường, đơn vị tiền tệ, format dữ liệu, v..v... khác nhau. Trong bài viết này, tôi sẽ giới thiệu các cách thiết kế database khác nhau để áp dụng việc localized cho dữ liệu trong database.

Đầu tiên chúng ta hãy tìm hiểu khái niệm I18N và L10N là gì nào.

# Khái niệm
Internationalization (I18N) là quá trình thiết kế một ứng dụng phần mềm để nó có thể được điều chỉnh thích hợp cho nhiều ngôn ngữ và khu vực mà không có sự thay đổi về kỹ thuật.

Localization (L10N) là quá trình đáp ứng một phần mềm đã quốc tế hóa cho một vùng hoặc ngôn ngữ cụ thể bằng cách bổ sung các thành phần của ngôn ngữ đang hướng đến, cũng như dịch các đoạn văn bản trong phần mềm qua ngôn ngữ đó.

Localization không chỉ mang tính chất dịch nội dung đơn thuần, mà còn hỗ trợ về:
* định dạng ngày tháng
* định dạng số
* timezone
* định dạng biểu diễn tiền tệ
* thuế / VAT
* nhiệt độ và các đơn vị đo lường khác
* mã bưu điện, số điện thoại
* định dạng địa chỉ
* mã thành phố, tỉnh thành


Bây giờ chúng ta hãy cùng xem xét các cách xử lí L10N nào.

# Các pattern xử lí

## 1. Tách cột cho từng trường dữ liệu
Đây là cách xử lí dễ dàng tiếp cận nhất trong các pattern. Ở cách này, chúng ta sẽ thêm một cột mới vào table cho mỗi trường dữ liệu cần được localize.

Ví dụ tôi có một bảng `Products` muốn áp dụng localize.

![](https://images.viblo.asia/a62c91bf-51ef-45a6-ad2a-bf2b4e942f70.png)

Các bạn có thể thấy tôi đã thêm các cột có format tên `column_name_language_code`. `Products` cần hỗ trợ `name`, `price`, `description` cho nhiều ngôn ngữ, vậy nên table sẽ có tất cả các trường đấy cho từng loại ngôn ngữ

### Ưu điểm
* Dễ dàng áp dụng
* Query đơn giản

### Nhược điểm
* Không có khả năng mở rộng cao
* Số lượng cột trong bảng có thể tăng lên nhanh chóng dựa vào số lượng ngôn ngữ mà ứng dụng của bạn hỗ trợ
* Nếu bạn thiếu 1 cột cho bất kì ngôn ngữ, ứng dụng của bạn có thể xảy ra lỗi
* Khó khăn trong việc quản lí format của dữ liệu (thời gian, đơn vị đo lường,...)


## 2. Tách hàng cho từng loại ngôn ngữ

Ở cách này, thay vì tạo cột mới cho tất cả ngôn ngữ, chúng ta sẽ quản lí data dựa vào từng dòng, dựa vào một cột là `language_code`.
![](https://images.viblo.asia/058d61c9-e1ec-46c8-a515-8b6e64800871.png)

Dữ liệu trong bảng:

![](https://images.viblo.asia/81eee86d-1227-4dc4-bfd6-b70427cfdd9b.png)

### Ưu điểm
* Đơn giản và hiệu quả.
* Việc truy vấn trở nên đơn giản, dựa trên `language_code` riêng biệt.

### Nhược điểm
* Không có tính tập trung. Mỗi bảng khác nhau có thể hỗ trợ nhiều loại ngôn ngữ khác nhau. Vậy nên bạn sẽ không biết được rõ là có bao nhiêu ngôn ngữ được hỗ trợ trong ứng dụng của bạn.
* Trong hệ thống phân tích dữ liệu của bạn, việc tính toán số liệu cho các product trở nên khó khăn hơn vì chúng ta có nhiều bản ghi cho cùng một product.

### Ghi chú
Để dữ liệu mang tính nhất quán hơn, tôi sẽ tạo một bảng `language` và tạo quan hệ với các bảng khác. Kể từ lúc này, mọi cách xử lí của mình sẽ follow theo kiểu này.

## 3. Tách bảng translations (1)

Ở cách này, chúng ta sẽ có một bảng translation cho tất cả các bảng trong database cần hỗ trợ I18n. Ví dụ với `products` và `product_types`:

![](https://images.viblo.asia/43deb112-9b34-4d3f-a186-562a2c16ed29.png)

### Ưu điểm
* Việc nội địa hoá nhất quán hơn.
* Chúng ta có thể quản lí mọi thuộc tính như định dạng ngày tháng, tiền tệ,... dựa trên ngôn ngữ cần hỗ trợ.

### Nhược điểm
* Yêu cầu joins bảng để lấy được translations.
* Mọi bản dịch của các bảng đều nằm cùng một bảng 
* Cần đánh index một cách thích hợp để mang lại hiệu quả tốt nhất

## 4. Tách bảng translation (2)
Ở bước tiếp cận này, thay vì để tất cả bản dịch vào chung một bảng, chúng ta sẽ chia nhỏ bản dịch ra từng bảng cần nội địa hoá.

![](https://images.viblo.asia/0b62a6e0-4bef-4ab0-a641-e00a6273d2b7.png)

### Ưu điểm
* Không cần join bảng để lấy dữ liệu chưa được dịch
* Việc tách riêng bảng khiến cho việc query trở nên dễ dàng hơn
* Dữ liệu không có sự khác biệt
* Bên cạnh nội dung dịch, việc nội địa hoá các kiểu định dạng có hiệu quả hơn

# Tham khảo
https://medium.com/walkin/database-internationalization-i18n-localization-l10n-design-patterns-94ff372375c6
https://en.wikipedia.org/wiki/Internationalization_and_localization
https://blog.mozilla.org/l10n/2011/12/14/i18n-vs-l10n-whats-the-diff/
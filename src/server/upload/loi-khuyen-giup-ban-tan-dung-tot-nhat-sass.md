Khi được sử dụng hiệu quả, Sass giúp xây dựng CSS có thể mở rộng và DRY . Tuy nhiên, khi được sử dụng không chính xác, sử dụng Sass có thể tăng kích thước tệp và thêm mã không cần thiết hoặc trùng lặp.

Dưới đây là một loạt các gợi ý và lời khuyên để giúp bạn tận dụng tốt nhất Sass.

## Cấu trúc thư mục Sass
Các tập tin cục bộ được tạo bằng cách sử dụng dấu gạch dưới và không được xuất dưới dạng các tệp CSS riêng biệt. Mỗi phần nên được import bằng tệp Sass chính (global.scss) trong thư mục gốc của thư mục Sass.

Ví dụ: đây là cấu trúc thư mục mẫu:
```
base/
|
|-- _variables.scss
|-- _mixins.scss
components/
layouts/
pages/
|-- _index.scss
global.scss
```

Cấu trúc thư mục này đảm bảo dễ tìm kiếm và thêm vào. Ví dụ, các modules mới có thể dễ dàng được thêm vào thư mục modules và sau đó thêm vào global.scss bằng cách sử dụng @import.

## Sử dụng biến Sass hiệu quả hơn

Các biến là một trong những tính năng đơn giản của Sass nhưng đôi khi vẫn được sử dụng không chính xác. Tạo quy ước đặt tên trên toàn trang là rất cần thiết khi làm việc với Biến. Nếu không có quy tắc thì chúng sẽ trở nên khó hiểu và khó tái sử dụng.

Dưới đây là một số mẹo để tạo các biến hữu ích:

- Đừng tuỳ ý đặt tên Biến
- Tuân theo quy ước đặt tên (Modules, BEM, v.v.)
- Đảm bảo việc sử dụng biến hợp lý.
Dưới đây là một số ví dụ:

```
// ======================================================
// Base :: Colors
// ======================================================

$black: #000;
$blackLight: #333;

$colorPrimary: #f77e62;
$colorSecondary: #d9583a;
$colorThird: #f4f4f2;
```

## Sử dụng hàm để tính toán

Các hàm được sử dụng để thực hiện tính toán. Hàm Sass không xuất bất kỳ CSS nào. Thay vào đó, nó trả về một giá trị có thể được sử dụng trong CSS. Điều này rất hữu ích cho các tính toán sẽ được thực hiện trên toàn trang web.

Ví dụ: các hàm rất hữu ích để tính độ rộng phần trăm của một phần tử đã cho:
```
@function calculate-width ($col-span) {
    @return 100% / $col-span 
}

.span-two {
    width: calculate-width(2); // spans 2 columns, width = 50%
}

.span-three {
    width: calculate-width(3); // spans 3 columns, width = 33.3%
}
```

## Hạn chế lồng nhiều cấp

Việc lạm dụng các quy tắc lồng nhau trong Sass có thể gây ra nhiều vấn đề, từ mã phức tạp đến tính đặc hiệu quá mức và quá phụ thuộc vào cấu trúc HTML của một trang. Những điều này có thể gây ra các vấn đề tiếp theo và có khả năng làm tăng nhu cầu đưa vào !important, thường nên tránh.

Dưới đây là một số quy tắc vàng để làm tổ:

- Không đi sâu hơn 3 cấp.
- Đảm bảo đầu ra CSS sạch và có thể tái sử dụng.
- Sử dụng lồng nhau khi nó có ý nghĩa, không phải là một tùy chọn mặc định.

## Sắp xếp trật tự công việc của bạn
Đặt tất cả các mixin, hàm, extend và các biến trong file cục bộ có liên quan của chúng. Giữ các khối mã cùng nhau sẽ đảm bảo chúng dễ dàng chỉnh sửa và tái sử dụng trong tương lai.

Các yếu tố trên toàn trang web nên được giữ cùng nhau trong một thư mục cơ sở. Thư mục cơ sở nên chứa các biến toàn cục như phông chữ, bảng màu:

$font-primary: 'Roboto', sans-serif; 
$font-secondary: Arial, Helvetica, sans-serif;

hoặc 

$color-primary: $orange;
$color-secondary: $blue;

Các mixin, hàm và biến cụ thể của modules phải được để trong file cục bộ của modules đó:
$tab-radius: 5px;
$tab-color: $grey;

## Sử dụng mixin có tham số thay cho extend

Sử dụng extend có thể gây rắc rối do sẽ khiến các selector của bạn bị ghi đè styles bởi các selector được SASS tự động thêm vào khi biên dịch.Nó sẽ làm tăng dung lượng file .css của bạn lên đáng kể. 

## Giữ mọi thứ đơn giản
Cuối cùng hãy giữ mọi thứ đơn giản nhất có thể. Mục đích của Sass là viết CSS dễ quản lý hơn. Trước khi tạo bất kỳ mixin, biến hoặc chức năng mới nào, hãy đảm bảo rằng chúng sẽ dễ phát triển và không làm quá nhiều task. Tất cả các tính năng của Sass đều hữu ích khi được sử dụng trong các tình huống chính xác và có chừng mực.
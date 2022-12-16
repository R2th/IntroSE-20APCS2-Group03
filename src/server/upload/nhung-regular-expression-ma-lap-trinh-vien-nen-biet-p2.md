## Tìm một chuỗi Base64 hợp lệ trong PHP

`\?php[ \t]eval\(base64_decode\(\'(([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?){1}\'\)\)\;`

Nếu bạn là một PHP developer thì đôi khi bạn có thể cần phân tích qua code để tìm kiếm các đối tượng nhị phân đã mã hóa Base64 (ví dụ như tìm shell được giấu trong một tập tin PHP chẳng hạn). Đoạn regex này có thể áp dụng với tất cả code PHP và sẽ kiểm tra bất cứ chuỗi Base64 nào đang tồn tại.

## Khoảng trắng ở đầu và cuối

`^[ \s]+|[ \s]+$`

Sử dụng đoạn mã này để lấy ra khoảng trắng ở đầu/cuối từ một chuỗi. Đây có thể không phải là một việc lớn, nhưng đôi khi nó ảnh hưởng đến đầu ra khi lấy kết quả ra từ một cơ sở dữ liệu hoặc áp dụng vào mã hóa tài liệu.

## Xác thực ngày trong định dạng DD/MM/YYYY

```
^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$
```

Các ngày khó khăn vì chúng có thể xuất hiện dưới dạng văn bản + số, hoặc chỉ là số với các định dạng khác nhau. PHP có một hàm ngày tuyệt vời nhưng điều này không phải luôn là lựa chọn tốt nhất khi lấy ra từ một chuỗi thô (raw). Cân nhắc việc thay thế bằng cách sử dụng biểu thức chính quy này cho các cú pháp ngày cụ thể.

## URL trang cá nhân Facebook

`/(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/`

Facebook rất phổ biến và có nhiều sự sắp đặt URL khác nhau. Trong một tình huống mà bạn đang lấy URL hồ sơ từ người sử dụng thì đoạn regex này có thể hữu ích để phân tích chuỗi và xác nhận rằng chúng có cấu trúc đúng. Đoạn này Regex này áp dụng hoàn hảo cho tất cả các kiểu liên kết FB.

## Kiểm tra phiên bản của Internet Explorer

`^.*MSIE [5-8](?:\.[0-9]+)?(?!.*Trident\/[5-9]\.0).*$`

Trình duyệt IE vẫn đang có thị phần người dùng lớn và các nhà phát triển thường phải kiểm tra phiên bản IE để xử lý tính tương thích của trang web.

Đoạn regex này có thể được sử dụng trong JavaScript để kiểm tra phiên bản của trình duyệt Internet Explorer ( 5 -> 11 ) đang được sử dụng nhờ vào việc phân tích chuỗi User-Agent.

[Phần 1](https://viblo.asia/p/nhung-regular-expression-ma-lap-trinh-vien-nen-biet-p1-L4x5xpRa5BM)
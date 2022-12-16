Như ở [bài viết trước](https://viblo.asia/p/regex-co-gi-thu-vi-07LKXWq85V4) mình đã giới thiệu một số khái niệm về regex cơ bản. Ở bài viết này mình sẽ giới thiệu một vài trường hợp sử dụng regex trong thực tế.

### 1. Kiểm tra Email 

`^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$`

Kiểm tra email có chính xác không là 1 điều vô cùng quan trong trong lập trình nhằm xác thực tài khoản của người dùng. 

### 2. Độ mạnh của mật khẩu

`^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$`

Tương tự như email, độ mạnh của mật khẩu cũng khá là quan trọng trong việc bảo vệ tài khoản của người dùng 

### 3. Xác thực địa chỉ IPv4

`/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/`

Xác thực địa chỉ IP được sử dụng để xác định địa chỉ truy cập Internet của người dùng 

### 4. Xác thực địa chỉ IPv6

`(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))`

Ngoài IPv4 thì hiện nay còn 1 laiị IP nữa cũng hay được sử dụng là IPv6.

### 5. Kiểm tra tên miền hợp lệ

`/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i`

Việc kiểm tra tên miền hợp lệ cũng là vô cùng quan trọng trong lập trình web 

### 6. Xác thực số điện thoại 

`^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$` 

Việc xác thực số điện thoại cũng là vô cùng quan trọng trong việc xác thực thông tin người dùng 

### 7. Lấy nguồn ảnh 

`\< *[img][^\>]*[src] *= *[\"\']{0,1}([^\"\'\ >]*)`

Khi bạn crawl dữ liệu mà chỉ muốn lấy nguồn ảnh thì có thể sử dụng đoạn biểu thức trên 

### 8. Số thẻ tín dụng 

`^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$`

Xác thực số thẻ tín dụng cũng vô cùng quan trọng để bảo vệ máy chủ 

### 9. URL trang cá nhân Facebook

`/(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/`

Dành cho các hắc cơ facebook :3 

### 10. Xác thực ngày trong định dạng DD/MM/YYYY

`^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$`

Bóc tách ngày tháng năm từ 1 đoạn văn bản, cũng như xác thực dữ liệu truyền vào từ người dùng.
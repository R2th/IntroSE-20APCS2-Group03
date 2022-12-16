Biểu thức chính quy (hay regex) là một công cụ mạnh mẽ mà mỗi nhà phát triển nên biết. Nó có thể khớp với một chuỗi các ký tự dựa trên các thông số rất phức tạp mà có thể giúp bạn tiết kiệm rất nhiều thời gian khi xây dựng các trang web. Dưới đây là tập hợp một vài regex hữu ích mà mình sưu tập được.
### 1. Kiểm tra tên người dùng:<br>
```
var regex = /^[a-z0-9_-]{3,16}$/
```

**Mô tả:**
- Tên sẽ bắt đầu bởi bất kỳ chữ cái viết thường (a-z), số (0-9), dấu gạch dưới hoặc dấu gạch nối. Tiếp theo, {3,16} đảm bảo có ít nhất 3 trong số các ký tự đó, nhưng không quá 16. <br>
### 2. Kiểm tra mật khẩu:<br>
Đối với mật khẩu tùy vào yêu cầu và mức độ chặt chẽ mà có nhiều regex khác nhau. Một vài đoạn regex dành cho mật khẩu tiêu biểu dưới đây.<br>- Tối thiểu tám ký tự, ít nhất một chữ cái và một số:
```
"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
```

{@embed: https://codepen.io/ThanhNhan96/pen/dyyNoGE}

-Tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt:<br>

```
"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
```

{@embed: https://codepen.io/ThanhNhan96/pen/pooRJEd}
<br>
-Tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số:

```
"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
```

{@embed: https://codepen.io/ThanhNhan96/pen/vYYgOmE}


-Tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt:

```
"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
```

{@embed: https://codepen.io/ThanhNhan96/pen/VwwPLMw}
<br>
-Tối thiểu tám và tối đa 10 ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt:

```
"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
```

{@embed: https://codepen.io/ThanhNhan96/pen/OJJWVzW}
### 3. Kiểm tra email:
Trong việc kiểm tra đúng định dạng của một địa chỉ mail phải tuân thủ 6 quy tắc sau đây:

- Phải có ký tự @
- Ký tự @ không nằm ở vị trí đầu
- Phải có ít nhất một dấu . trong địa chỉ mail
- Phải có ít nhất 1 ký tự giữa @ và dấu . cuối cùng
- Phải có ít nhất một ký tự sau dấu . cuối cùng
- Không có khoảng trắng trong địa chỉ mail<br>
Regex để validate email:
```
var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
```

{@embed: https://codepen.io/ThanhNhan96/pen/MWWJYNE}
### 4. Kiểm tra địa chỉ IPv4:
```
^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$
```

### Kết luận:
- Trên đây chỉ là một vài các regex tiêu biểu hay dùng mà mình muốn giới thiệu. Tùy vào yêu cầu validate mà bạn có thể biến đổi regex sao cho phù hợp hơn. Ngoài ra bạn có thể check regex online tại: https://regex101.com

**Tham khảo**
- https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149
- https://stackoverflow.com
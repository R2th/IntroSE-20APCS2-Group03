Trong quá  trình code, đôi khi chúng ta gặp phải tình trạng task đang làm cần dùng đến bootstrap, nhưng nếu thêm vào source của dự án sẽ bị conflict với các class css trước đó. Trong bài viết này mình sẽ giới thiệu 1 cách nhanh gọn nhẹ để có thể vừa thêm được bootstrap mà vẫn tránh được conflict.

### 1. Install LESS vào máy tính
Một lưu ý nhỏ ở đây là chúng ta chỉ cần cài less vào máy tính, không cần thiết phải thêm less vào project nhé.
 
Cài đặt LESS trên:

[Linux](http://lesscss.org/usage/#command-line-usage)

[Window](https://github.com/duncansmart/less.js-windows)

[Mac OS X](https://outlast.hu/install-less-compiler-on-mac-os-x/)

### 2.
Sau khi cài LESS xong, ra sẽ tạo 1 file, tạm đặt tên là prefix.less (file này ko quan trọng lắm nên tên gì cũng đc nhé).
Trong file đó ta sẽ thêm đoạn code sau:

```
.bootstrap-iso {
  @import (less) 'bootstrap.css';
  @import (less) 'bootstrap-theme.css';  /* optional */
}
```

### 3. Compile to Css

Giờ chúng ta sẽ compile file vừa tạo thành file .css :

chạy lệnh sau trong terminal:

```
lessc prefix.less bootstrap-iso.css
```
Lệnh này sẽ gen cho chúng ta 1 file bootstrap-iso.css - đây chính là file chúng ta cần.
### 4. Add file .css to project
Công việc còn lại khá đơn giản: thêm file bootstrap-iso.css mới gen vào project.
Khi bạn cần sử dụng bootstrap, khá đơn giản, wrap đoạn code đó trong 1 thẻ div có ```class="bootstrap-iso"```.

## Source
https://formden.com/blog/isolate-bootstrap
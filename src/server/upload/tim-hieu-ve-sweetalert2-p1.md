Như các bạn đã biết, phương thức alert () hiển thị hộp cảnh báo với thông báo được chỉ định và nút OK. Nhưng về cơ bản phương thức alert bình thường nhìn cũng được đẹp cho lắm. Vậy nên trong bài viết này, mình và các bạn sẽ cùng tìm hiểu về SweetAlert2, sẽ giúp chúng ta thay đổi hộp thoại alert nhìn đẹp và phê hơn. OK let's go
## 1. TẢI VÀ CÀI ĐẶT
Bạn có thể cài đặt SweetAlert2 theo các cách sau:
```bash
npm install sweetalert2 
```

hoặc
```bash
bower install sweetalert2
```

Hoặc bạn có thể tải từ CDN: jsdelivr.com/package/npm/sweetalert2

## 2. SỬ DỤNG 
Sau khi cài đặt thành công thì việc sử dụng trở nên dễ dàng hơn rất nhiều:

### 1. Khởi tạo plugin bằng cách referencing các tệp cần thiết
```html
<script src="sweetalert2.all.min.js"></script>

<!-- Tùy chọn: bao gồm một polyfill cho ES6 Promising cho trình duyệt IE11 và Android -->

<script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>
```
Còn cách khác là:
```html
<script src="sweetalert2.min.js"></script>

<link rel="stylesheet" href="sweetalert2.min.css">
```
Hoặc
```javascript
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

// CommonJS
const Swal = require('sweetalert2')
```
Có thể nhập riêng biệt JS và CSS, ví dụ: nếu bạn cần tùy chỉnh kiểu:
```javascript
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
```
Cách này thì cục súc quá, không nên sử dụng nhé, mình ném vào để biết thôi :)
```html
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@7.29.2/dist/sweetalert2.min.js"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@7.29.2/dist/sweetalert2.min.css">
```
### 2. Bắt đầu sử dụng
Ở đây mình sẽ sử dụng một cách đơn giản. Đầu tiên mình sẽ tạo một nút để bấm vào sẽ hiển hộp thoại ra:
```html
<button type="button" onclick="sweetalert2()">Nhấn vào đây!</button>
```
Tiếp theo là tạo cái function sweetalert2() kia:
```html
<script>
    function sweetalert2(){
        Swal({
            title: 'Success',
            text: 'Do you want to continue',
            type: 'success',
            confirmButtonText: 'Cool'
        })
    }
</script>
```

Như vậy, ở bài viết này chúng ta đã biết được cách cài đặt và  sửa dụng SweetAlert2 một cách đơn giản. Ở bài viết sau, chúng ta sẽ tìm hiểu về các CONFIGURATION của nó nhé.

LInk p2: https://viblo.asia/p/tim-hieu-ve-sweetalert2-p2-3P0lPeGb5ox

Nếu thấy hay, hãy upvote, share để được đẹp trai và xinh gái hơn.
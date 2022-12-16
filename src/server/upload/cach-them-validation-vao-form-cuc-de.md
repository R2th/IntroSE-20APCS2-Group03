![](https://images.viblo.asia/86f411ce-16ed-456c-9ae3-24701751d92a.png)
# Layout
### HTML
Design bao gồm form bootstrap và 3 input với nút submit. Trong ví dụ này sử dụng 3 loại input khác nhau - một kiểu nhập văn bản, một kiểu mật khẩu và một kiểu email.
```html
<div class="registration-form">
    <form>
        <h3 class="text-center">Create your account</h3>
        <div class="form-group">
            <input class="form-control item" type="text" name="username" maxlength="15" minlength="4" pattern="^[a-zA-Z0-9_.-]*$" id="username" placeholder="Username" required>
        </div>
        <div class="form-group">
            <input class="form-control item" type="password" name="password" minlength="6" id="password" placeholder="Password" required>
        </div>
        <div class="form-group">
            <input class="form-control item" type="email" name="email" id="email" placeholder="Email" required>
        </div>
        <div class="form-group">
            <button class="btn btn-primary btn-block create-account" type="submit">Create Account</button>
        </div>
    </form>
</div>
```

### CSS
Thêm 1 chút css cơ bản vào để form dễ nhìn hơn 1 chút:
```css
html {
  background-color:#214c84;
  background-blend-mode:overlay;
  display:flex;
  align-items:center;
  justify-content:center;
  background-image:url(../../assets/img/image4.jpg);
  background-repeat:no-repeat;
  background-size:cover;
  height:100%;
}

body {
  background-color:transparent;
}

.registration-form {
  padding:50px 0;
}

.registration-form form {
  max-width:800px;
  padding:50px 70px;
  border-radius:10px;
  box-shadow:4px 4px 15px rgba(0, 0, 0, 0.2);
  background-color:#fff;
}

.registration-form form h3 {
  font-weight:bold;
  margin-bottom:30px;
}

.registration-form .item {
  border-radius:10px;
  margin-bottom:25px;
  padding:10px 20px;
}

.registration-form .create-account {
  border-radius:30px;
  padding:10px 20px;
  font-size:18px;
  font-weight:bold;
  background-color:#3f93ff;
  border:none;
  color:white;
  margin-top:20px;
}

@media (max-width: 576px) {
  .registration-form form {
    padding:50px 20px;
  }
}
```

### Validation Types
HTML5 cung cấp một cách dễ dàng để **"inline validation"**, sử dụng các thuộc tính input. Có một số lượng lớn các thuộc tính có sẵn, nhưng hiện tại hãy xem xét một số thuộc tính phổ biến nhất. 
Để biết danh sách đầy đủ, bạn có thể tham khảo link hướng dẫn [MDN guide](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes).

**required**
Thuộc tính này quy định trường đầu vào không được để trống. Nó yêu cầu người dùng nhập nội dung nào đó trước khi gửi form.
```html
<input class="form-control item" type="email" name="email" id="email" placeholder="Email" required>
```

**maxlength and minlength**
Chỉ định số lượng ký hiệu maximum/minimum (tối đa / tối thiểu) mà người dùng có thể nhập vào input. Điều này đặc biệt hữu ích trong các trường mật khẩu mà mật khẩu dài hơn có nghĩa là mật khẩu an toàn hơn.
```html
<input class="form-control item" type="password" name="password" minlength="6" id="password" placeholder="Password" required>
```

**pattern**
Chỉ định cụm từ phải khớp với thứ tự dữ liệu đã nhập. Nó có thể được sử dụng với các loại input sau: **"text, search, url, email, and password"**.
```html
<input class="form-control item" type="text" name="username" maxlength="15" minlength="4" pattern="^[a-zA-Z0-9_.-]*$" id="username" placeholder="Username" required>
```

### Form Validation trong Bootstrap Studio
Bootstrap Studio cung cấp một cách nhanh chóng và dễ dàng để validate form của bạn mà không cần phải viết một dòng code. Ứng dụng này có các điều khiển tích hợp cho phép bạn nhanh chóng thiết lập tất cả các quy tắc xác thực mà bạn có thể cần.
để hiểu hơn bạn xem tham khảo [tại đây.](https://bootstrapstudio.io/tutorials/form-validation)

### Kết luận
Tham khảo demo tại đây: {@codepen: https://codepen.io/oBuiThiHuyen/pen/wXjxam}
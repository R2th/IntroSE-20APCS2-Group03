# Tại sao Validation Form lại quan trọng
Người dùng sử dụng các form để đăng ký hoặc thực hiện các giao dịch trực tuyến. Nếu bạn muốn lưu dữ liệu nhập của người dùng vào cơ sở dữ liệu thì tốt nhất bạn nên đảm bảo dữ liệu được thu thập ở định dạng chính xác, nếu không ai đó sẽ làm hỏng website của bạn bằng cách đưa các giá trị vô lý vào form.

Validation Form cũng có thể là một biện pháp bảo mật. Việc để mọi người đưa bất cứ thứ gì họ muốn vào form sẽ khiến website của bạn dễ bị tấn công bằng SQL injections, và còn rất nhiều lý do tại sao chúng ta nên validation form nhưng đây là hai lý do rõ ràng nhất khiến một website bị phá hủy.

# Cách thực hiện
Việc thực hiện validation form trên giao diện người dùng (trước khi gửi dữ liệu đến server) được gọi là validation form phía client. Bạn cũng có thể validation form ở phía back-end/server. nhưng tôi chỉ tập trung ở phía client.

Có 2 loại validation ở phía client:

* Form Validation có sẵn (HTML)
* JavaScript Validation

Validation có sẵn của form HTML sẽ có hiệu suất tốt hơn Javascript nhưng ít tùy chỉnh hơn. Trong ví dụ sau, tôi đã tạo ra một form với các input trống.

![](https://images.viblo.asia/05db67ff-00e9-46aa-a154-ae10dcc76c33.png)

Thử nhập "Jo" và nhấn nút đăng ký:
![](https://images.viblo.asia/204c8773-1a6b-4985-bcc2-0806f82c59d2.png)

Sau đó sửa nó, đường viền của input sẽ chuyển từ màu đỏ sang màu xanh:
![](https://images.viblo.asia/026a8504-981e-464c-8521-fa1e5319a70f.png)

Bạn cũng có thể thử nhập các trường khác, dưới đây là các quy tắc mà tôi đã đặt (sử dụng validation có sẵn của HTML):
* Full Name: ít nhất 3 kí tự, nhiều nhất 100 kí tự
* Phone Number: 3 chữ số - 3 chữ số - 4 chữ số (0123456789 sẽ không hợp lệ)
* Email Address:  phải tồn tại kí tự "@"
* Website URL: phải tồn tại  "http://" hoặc "https://"
* Password: 1 kí tự viết hoa, 1 kí tự viết thường, và 1 số.

Bên cạnh đó, tôi đã sử dụng Javascript Validation để đảm bảo "Password" trùng khớp với "Confirm Password".

![](https://images.viblo.asia/1d21a027-cf34-4cf4-ab08-2f178372eaa7.png)
# Sau đây là 1 vài dòng code của tôi
Validation form có sẵn (HTML) cung cấp các thuộc tính để validation, Ví dụ: 
```
* required
* minlength="3"
* maxlength="100"
* pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
* type="email"
```
Sử dụng chúng trong HTML: 
```html
<!-- Full Name -->
<div class="form-group">
  <label for="name">Full Name</label>
  <input type="text" id="name" placeholder="Full Name" name="name" required minlength="3" maxlength="100" />
</div>

<!-- Phone Number -->
<div class="form-group">
  <label for="phone">Phone Number</label>
  <input type="tel" id="phone" placeholder="555-555-5555" name="phone" required
    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
</div>
  
<!-- Email Address -->
<div class="form-group">
  <label for="email">Email Address</label>
  <input type="email" id="email" placeholder="email@address.com" name="email" required />
</div>

<!-- Website URL -->
<div class="form-group">
  <label for="website">Website URL</label>
  <input type="url" id="website" placeholder="https://google.com/" name="website" required />
</div>

<!-- Password -->
<div class="form-group">
  <label for="password1">Password</label>
  <input type="password" id="password1" placeholder="Create Password (Min. 8 Characters)" required
    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
    title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number." />
</div>

<!-- Confirm Password -->
<div class="form-group">
  <label for="password2">Confirm Password</label>
  <input type="password" id="password2" placeholder="Confirm Password" name="password" required
    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" />
</div>
```

Sau đó, kiểm tra xem mật khẩu có khớp nhau hay không bằng cách sử dụng Javascript Validation:

```js
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
let passwordsMatch = false;

// Check to see if passwords match
if (password1El.value === password2El.value) {
  passwordsMatch = true;
  password1El.style.borderColor = 'green';
  password2El.style.borderColor = 'green';
} else {
  passwordsMatch = false;
  password1El.style.borderColor = 'red';
  password2El.style.borderColor = 'red';
  return;
}
```
Link file Javascript đầy đủ của tôi: [Github Javascript Validation](https://github.com/taidev98/form-validate/blob/main/script.js)
# Ưu và nhược điểm
**Ưu điểm:** đơn giản, dễ sử dụng, giao diện bắt mắt do được hầu hết các loại trình duyệt thiết kế giao diện sẵn. Giảm thiểu được các form sai định dạng của người dùng lên server.

**Nhược điểm:** Rất dễ để vượt qua validation bằng cách người dùng bấm F12 và sửa source code html. Không thể check được validation unique ( đã tồn tại dữ liệu này trong database hay chưa )
Như ví dụ ở trên, người dùng có thể vượt qua bằng cách F12, vào tab console và gõ `document.getElementById("form").submit().`

Bất kể việc submit có thỏa mãn điều kiện validation hay không, form trên sẽ được submit!

# Tổng kết
Tuy cách này đủ để validation với người dùng cơ bản nhưng cũng rất dễ bị kẻ xấu tấn công (F12, postman...) nên bắt buộc vẫn phải validation ở back-end/ server. Hi vọng thông qua bài viết này các bạn sẽ biết cách validation form ở phía client và ưu nhược điểm của chúng.

*Thanks you for watching!*
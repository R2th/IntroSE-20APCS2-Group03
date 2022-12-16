Về bản chất, việc validate form trong website chẳng qua chỉ là kiểm tra xem dữ liệu input có hợp lệ với format yêu cầu của người lập trình hay không. Nếu có thì submit form thành công, còn không thì reject và hiển thị lỗi. Thuật toán đều là so sánh [regular expression](https://viblo.asia/p/hoc-regular-expression-va-cuoc-doi-ban-se-bot-kho-updated-v22-Az45bnoO5xY) (regex) . Khác nhau là việc kiểm tra regex diễn ra ở quá trình nào mà thôi.

# 1. Validate bằng Front End

## a. Validate bằng HTML
Cách dùng khá đơn giản bằng cách  thêm 1 số option để validate cho input.

- Thêm "required" nếu muốn trường đó bắt buộc phải điền mới được phép submit
```
<input type="text" required>
```
- Thêm option type="email" để thiết lập điều kiện giá trị nhập vào phải có dạng email
```
<input type="email" >
```
- Thêm partern và định dạng regex để định kiểu format cho dữ liệu nhập vào
```
<input pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" />
```
Ngoài ra còn 1 số option khác ví dụ: `min, max, minlength, maxlength v...v... `


![](https://images.viblo.asia/ccabd08b-74bf-4945-a107-00acc9e0d850.png)

*Minh họa khi người dùng không nhập vào trường required*


**Ưu điểm :** đơn giản, dễ sử dụng, giao diện bắt mắt do được hầu hết các loại trình duyệt thiết kế giao diễn sẵn. Giảm thiểu request sai của người dùng lên server. 

**Nhược điểm :** Rất dễ để vượt qua validate bằng cách người dùng bấm F12 và sửa source code html. Không thể check được validate unique ( đã tồn tại dữ liệu này trong database hay chưa )
## b. Validate bằng Javascript

Validate bằng javascript thì chúng ta phải tự so sánh bằng tay xem dữ liệu nhập vào có khớp với format của regex hay không, và việc hiển thị tin nhắn cũng phải tự custom. 
Ví dụ đơn giản :
```
<form id="form">
    <input type="text" id="testvalidate">
    <div id="show-message"></div>
    <button type="submit" onClick="check_submit()"> Submit </button>
</form>

<script>
function check_submit(){
    var value = document.getElementById("testvalidate").value
    //chỉ gồm những kí tự viết thường
    var regex = /a-z/ 
    unless (regex.test(value)){
        event.preventDefault()
        document.getElementById("show-message").innerHTML =
            "Please enter format input right!"
    }
}
</script>
```

**Ưu điểm :** tránh được việc người dùng spam request lên server. 

**Nhược điểm :** Có thể vượt qua bằng cách F12, vào tab console và custom lại hàm submit. Phải tự thiết kế giao diện cho show message. Không thể check được validate unique.

![](https://images.viblo.asia/03e8e627-ca0e-4228-b17e-1f577b9508a7.png)

*Hình ảnh minh họa cho việc validate form bằng Javascript*

Như ví dụ ở trên, người dùng có thể vượt qua bằng cách F12, vào tab console và gõ `document.getElementById("form").submit()`.

Bất kể việc submit có thỏa mãn điều kiện validate hay không, form trên sẽ được submit!

## c. Chốt lại:
Validate ở Front-end mục đích giúp hạn chế những request sai lên server nhưng không thể chống lại những người cố tình phá hoại. Không thể validate kiểu unique (kiểm tra xem đã tồn tại ở database chưa ). Validate ở Front-end có thể có hoặc không.

# 2. Validate bằng Back end
## a. Validate bằng ngôn ngữ Back End

Rất cần thiết và quan trọng nên hầu hết mọi Framework đều hỗ trợ validate này, điểm chung đều là gọi tới hàm callback trước khi lưu dữ liệu vào database. ( Và tất nhiên đều là sử dụng thuật toán so sánh với regular expression)

Đây là validate bắt buộc phải có!

**Ưu điểm :** Kiểm tra dữ liệu an toàn trước khi thực hiện lưu vào database. Depveloper cũng không quá khó khăn ( không cần code nhiều ) trong việc validate ở back end vì đã có Framework hỗ trợ. 

**Nhược điểm:** Không chặn được việc người dùng spam request lên. Message show ra phải nhờ phía FE show lên.

## b. Validate ở database

Khi thiết kế database, depvelop có thể chọn các option validate cho từng field của từng table ví dụ : require, unique, type, minlength, maxlength v....v... Validate ở database là việc kiểm tra cuối cùng xem dữ liệu có thực sự "an toàn " hay không ?
Validate ở database có thể có hoặc không. Nhưng thông thường là có, và chỉ validate những option cơ bản chứ không phải tất cả.

**Ưu điểm :** Ngăn chặn việc depvelop validate thiếu sót bằng ngôn ngữ back end, dẫn dến lưu dữ liệu sai vào database. 

**Nhược điểm :**   Option hạn chế, không có regular expression. Khá bất tiện trong việc fake data lỗi để test bug.

## c. Chốt lại

Validate phía back end là cực kì cần thiết. Nên kết hợp giữa việc validate bằng ngôn ngữ back end và validate ở database một cách khéo léo.

# 3. Tổng kết 
Hy vọng qua bài viết của mình các bạn sẽ biết được thêm về validate form trong lập trình websibte, các cách validate và ưu nhược điểm của chúng.

*Thanks you for watching!*
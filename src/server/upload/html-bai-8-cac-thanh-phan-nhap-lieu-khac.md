Trong bài viết trước, chúng ta đã nói về `<form>` và các kiểu `<input>` cơ bản. Bên cạnh đó, HTML còn hỗ trợ nhiều kiểu `input` khác giúp chúng ta tạo ra những biểu mẫu dễ dàng và linh động hơn, phù hợp với nhiều loại câu hỏi truy vấn thông tin từ người dùng. Hãy cùng nói về các kiểu `input` này.

## Các kiểu input phổ biến khác

HTML có tất cả 3 nhóm `input` phổ biến bao gồm:

1. Các trường nhập văn bản:
    - Text-field - trường nhập văn bản 1 dòng
    - Text-area - trường nhập văn bản nhiều dòng
2. Các danh sách lựa chọn:
    - Radio-button - nhóm các nút lựa chọn hình tròn, hỗ trợ 1 lựa chọn
    - Check-box - nhóm các ô lựa chọn hình vuông, hỗ trợ nhiều lựa chọn
    - Dropdown-list - danh sách lựa chọn dạng cuộn có thể đóng mở, hỗ trợ 1 lựa chọn
3. Các loại input khác:
    -  Nút chọn tệp để tải lên từ máy tính của người dùng
    -  Chọn ngày tháng trong lịch hiển thị ở dạng bảng
    -  Chọn màu sắc trong bảng màu
    -  v.v....

### 1. Text-field & Text-area

Chúng ta đã gặp `text-field` trong ví dụ của bài viết trước rồi. Còn về `text-area` thì thực sự không có gì nhiều khác biệt cả. Chỉ đơn giản là một cái `text-field` được mở rộng xuống nhiều dòng. Để tạo một `text-area` thì bạn sử dụng [thẻ `textarea`](https://www.w3schools.com/tags/tag_textarea.asp) thay vì `<input>`.

```textarea.html
<form method="post">
   Người nhận:<br>
   <input type="text" name="recipient"><br>
    Tin nhắn:<br>
   <textarea name="message"></textarea><br>
   <button type="submit">Gửi</button>
   <button type="button">Hủy</button>
</form>
```

### 2. Radio-button & Check-box & Dropdown-list

Các kiểu `input` phổ biến tiếp theo là radio-button, check-box, và dropdown-list, giúp chúng ta cung cấp các đáp án lựa chọn cho người dùng.

#### Radio-button & Check-box

Radio-button và check-box được tạo bằng cách sử dụng các thẻ `<input>` và có phong cách hiển thị khá giống nhau. Trong khi radio-button chỉ hỗ trợ 1 lựa chọn duy nhất thì check-box hỗ trợ người dùng chọn nhiều hơn 1 đáp án.

```choices.html
<form>
   <b>Radio-buttons:</b><br>
   Nam <input type="radio" name="gender" value="male" checked> |
   Nữ <input type="radio" name="gender" value="female"> |
   Khác <input type="radio" name="gender" value="other"><br>
   <br>
   <b>Check-boxes:</b><br>
   Đỏ <input type="checkbox" name="favcolor" value="red"> |
   Xanh lá <input type="checkbox" name="favcolor" value="green" checked> |
   Xanh Dương <input type="checkbox" name="favcolor" value="blue"><br>
   <br>
   <button type="submit">Gửi</button>
</form>
```

Bạn có thể nhận thấy một vài thuộc tính mới được sử dụng ở đây - đó là [thuộc tính `value`](https://www.w3schools.com/tags/att_value.asp) và [thuộc tính `checked`](https://www.w3schools.com/tags/att_input_checked.asp).

Lý do là vì các `input` này không hỗ trợ người dùng nhập đáp án bằng việc gõ chữ, do đó chúng ta cần phải chỉ định các giá trị mặc định cho mỗi lựa chọn bằng thuộc tính `value`. Thuộc tính này cũng có thể được sử dụng để thiết lập nội dung mặc định cho `text-field` và `text-area`.

Thuộc tính `checked` được sử dụng để thiết lập một lựa chọn được đánh dấu mặc định.

#### Dropdown-list

`Dropdown-list` được sử dụng trong trường hợp có rất nhiều lựa chọn mà chúng ta cần cung cấp cho người dùng. Ví dụ điển hình thường thấy là danh sách quốc tịch, hay danh sách địa danh thành phố, quận, phường, v.v...

```dropdown.html
<form>
   Xuất sứ:
   <select name="hometown">
       <option value="earth">Trái Đất</option>
      <option value="mars">Sao Hỏa</option>
      <option value="moon">Mặt Trăng</option>
   </select>
   <br>
   <button type="submit">Xác nhận :D</button>
</form>
```

### 3. File-browser & Các kiểu input khác

Đây là cách để tạo ra một nút nhấn mà khi người dùng nhấp chuột vào thì trình duyệt web sẽ mở ra một cửa sổ duyệt thư mục và chọn tệp đăng tải. Ví dụ thường thấy là các nút đăng tải hình ảnh hay audio, video của các mạng xã hội.

```file.html
<form>
   <input type="file" name="photo"><br>
   <button type="submit">Đăng tải ảnh</button>
</form>
```

Bên cạnh các kiểu `input` phổ biến mà chúng ta đã liệt kê ở phía trên, HTML còn hỗ trợ rất nhiều kiểu `input` khác nữa rất tuyệt vời và hỗ trợ bởi các trình duyệt web được cập nhật
thường xuyên với phiên bản mới. Đây là liên kết tham khảo về danh sách đầy đủ các kiểu `input` của HTML 5 phiên bản mới nhất hiện tại: [Danh sách các kiểu `input`](https://www.w3schools.com/tags/att_input_type.asp).

### Thẻ `<label>`

Đây là một tiện ích được thiết kế để sử dụng kèm với các radio-button và check-box. Thẻ tiện ích này sẽ giúp chúng ta cung cấp trải nghiệm sử dụng tốt hơn tới người dùng thiết bị di động. Với [thẻ `label`](https://www.w3schools.com/tags/tag_label.asp), chúng ta có thể tạo ra một vùng có thể nhận cick chuột và gắn với các ô lựa chọn nhỏ. Bằng cách này thì người dùng sẽ có thể chạm vào phần chữ mô tả ở bên cạnh ô lựa chọn để đánh dấu vào ô đó thay vì phải cố gắng chạm vài lần để trúng được 1 ô lựa chọn nhỏ.

Cách đơn giản nhất để gắn một `label` vào một lựa chọn là bạn chỉ cần đặt luôn phần tử `input` bên trong thẻ `<label>`.

```label.html
<!--
   Các ô check-box ở đây có thể được chọn
   bằng cách click hoặc chạm vào tên màu.
-->
<form>
   <b>Màu sắc:</b><br>
   <label>
      Đỏ <input type="checkbox" name="favcolor" value="red"> |
   </label>
   <label>
      Xanh lá <input type="checkbox" name="favcolor" value="green"> |
   </label>
   <label>
      Xanh dương <input type="checkbox" name="favcolor" value="blue">
   </label>
   <br>
   <button type="submit">Gửi</button>
</form>
```

Một `label` cũng có thể được gắn với một `input` bằng cách sử dụng [thuộc tính `for`](https://www.w3schools.com/tags/att_for.asp). Trong trường hợp này, chúng ta sẽ cần thêm `id` cho `input`.

```label.html
<form>
   <label for="accept">Click ở đây</label><br>
   
   <input id="accept" type="checkbox" name="confirm" value="accept">
   Tôi đã đọc và đồng ý với các điều khoản.<br>
   <button type="submit">Xác nhận</button>
</form>
```

Bài viết về các kiểu `input` khác trong HTML của chúng ta tới đây là kết thúc. Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu về một số thẻ hỗ trợ tạo ra các khung vẽ đồ họa, sử dụng cho nhu cầu trình bày các nội dung đồ họa được tạo ra bởi các phần mềm thiết kế.

[[HTML] Bài 9 - Các thẻ hỗ trợ đồ họa & Các thuộc tính tự tạo**](https://viblo.asia/p/1VgZvANmKAw)
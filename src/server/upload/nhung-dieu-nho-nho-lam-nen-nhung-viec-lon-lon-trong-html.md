Bài viết này chúng ta sẽ cùng nhau tìm hiểu về những điều nhỏ nhặt trong HTML nhưng lại có tác dụng không hề nhỏ khi biết được công dụng của nó nhé! Bắt đầu thôi nào!
### 1.  Thuộc tính `alt` trong tag image
```html
<img src="user.png" alt="User Profile Image" />
```
`alt` được sử dụng như một văn bản thay thế khi image không thể hiển thị. Hay cụ thể hơn là dùng để mô tả về ảnh, dành cho các công cụ tìm kiếm hiểu được ảnh này có nội dung là gì.
Cụ thể trong các trường hợp sau:
- Đường dẫn đến hình ảnh bị hỏng và không thể hiển thị.
- Trình duyệt không thể hiển thị hình ảnh do mạng chậm.
- Người dùng bị khiếm thị sử dụng trình đọc màn hình để đọc văn bản được chỉ định trong thẻ alt.
- Hiển thị thay vì một biểu tượng phản cảm không thấy ảnh khi ảnh không hiển thị được.

Một thuộc tính nhỏ như vậy nhưng đem lại công dụng mạnh mẽ, giúp mọi người dễ dàng tiếp cận đến trang web của bạn hơn. Vậy nên hãy tận dụng thuộc tính này đừng bỏ trống nó nữa nhé! (Trừ những hình ảnh mang tính trang trí cho trang web của bạn).
> Chú ý là alt không phải dùng để hiển thị khi di chuyển chuột lên image, muốn văn bản hiển thị khi di chuyển chuột lên image thì ta dùng thuộc tính title thay thế.
### 2. Mối lương duyên giữa  for của label và id của input
Như các bạn cũng đã biết thì label dùng để định nghĩa nhãn cho các thẻ `input` trong HTML. Có nghĩa là ta có thể liên kết label với một phần tử khác bằng cách tạo khớp giá trị của thuộc tính for với id của phần tử đó. Như bên dưới này:
```html
<label for="male">
  <input id="male" value="M" type="radio" name="gender">Male
</label>
<label for="female">
  <input id="female" value="F" type="radio" name="gender">Female
</label>
<label for="na">
  <input id="na" value="O" type="radio" name="gender">NA
</label>
```
Điều này sẽ khiến chúng ta thao tác dễ dàng hơn, khi click chuột vào tag `<label>` thì sẽ đưa con trỏ chuột vào vùng `<input />`. 

Bạn lưu ý là giá trị trong thuộc tính `id` của `input` phải giống với giá trị trong thuộc tính `for` của `label`, như thế để `label` biết được nó được dùng cho `input` nào nhé!
    
Mối lương duyên này tuy đơn giản nhưng giúp được người dùng tiếp cận dễ dàng hơn và tăng diện tích click chuột khi bắt đầu thao tác nhập.
###     3. Autofocus
Khi thuộc tính `autofocus` được thiết lập, trình duyệt sẽ tự động chuyển con trỏ tới thẻ `<input>` chứa thuộc tính đó.
```html
<form action="/action.do">
  <label for="uname">Username:</label>
  <input type="text" id="uname" name="uname" autofocus><br><br>
  <label for="password">Password:</label>
  <input type="password" id="password" name="password"><br><br>
  <input type="submit">
</form>
```
Vài thuộc tính tự động như này thì quá khoẻ cho người dùng rồi đúng không. Tiếp theo cũng là một thuộc tính kiểu tự động như thế nhé!
### 4. Autocomplete
Thuộc tính `autocomplete` quy định một form hoặc một tag input trong form có được sử dụng chức năng tự động điền, gợi ý thông tin hay không. 

Thuộc tính này sẽ thông báo cho trình duyệt biết loại data nào mà bạn mong muốn với thẻ input tương ứng, ví dụ đối với  text, search, url, tel, email, password, datepickers, range và color.
```html
<input type="email" id="email" name="email" autocomplete="on">
```
Thuộc tính `autocomplete` có 2 giá trị “on” và "off",  giá trị mặc định của nó là "on" khi đó trình duyệt sẽ tự động gợi ý những giá trị dựa trên thông tin người dùng nhập vào.

> Lưu ý: Đối với trường nhập mật khẩu, để bảo mật thì bạn nên thiết lập `autocomplete` là “off”. Tắt chức năng `autoComplete` không có nghĩa là bạn đã xóa tất cả các thông tin đã được lưu trữ trước đó nên yên tâm nhé!
    
### Tổng kết
Những thuộc tính, chức năng mà HTML hỗ trợ được chia sẻ phía trên tuy đơn giản nhưng rất có tác dụng mà bạn thường không để ý đến. Bài viết mình muốn chia sẻ đến những bạn mới bắt đầu nên các cao thủ xin bỏ qua hoặc có gì hay thì góp ý cho mình với nhé!

Cảm ơn mọi người đã dành thời gian đọc bài viết!
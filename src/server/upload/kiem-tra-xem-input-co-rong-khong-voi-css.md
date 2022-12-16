## Giới thiệu
Liệu rằng chúng ta có thể biết được một input có trống hay không chỉ với CSS? Chúng ta thường đặt ra câu hỏi này khi học Javascript bởi vì chúng ta luôn nghĩ rằng phải dùng đến Javascript mới có thể validate được bên phía Client Side.
Giả sử chúng ta muốn như sau:
+ Chúng ta sẽ ẩn dropdown đi khi input không có giá trị
+ Hiện dropdown khi người dùng nhập vào giá trị

![](https://images.viblo.asia/0429b299-57a4-4335-a869-5a5a01b686fa.gif)

Đầu tiên, chúng ta xây dựng một form HTML với một input duy nhất. 
```
<form>
  <label for="input"> Input </label>
  <input type="text" id="input" />
</form>
```

Khi người dùng nhập giá trị vào input chúng ta sẽ style cho input với thuộc tính `border-color` thành green. Dưới đây là ảnh demo:

![](https://images.viblo.asia/c809beaf-b3e1-4164-9396-8a6cba43492e.gif)

## Kiểm tra nếu đầu vào trống
Chúng ta sử dụng HTML form validation để kiểm tra xem input có trống không. Điều này có nghĩa là chúng ta phải sử dụng thuộc tính `required`

```
<form>
  <label> Input </label>
  <input type="text" name="input" id="input" required />
</form>
```

Tại thời điểm này, nó hoạt động tốt người dùng nhập giá trị vào input. Border của input sẽ chuyển sang màu xanh lá cây.

![](https://images.viblo.asia/c809beaf-b3e1-4164-9396-8a6cba43492e.gif)

Tuy nhiên, có vấn đề xảy ra đó là: Nếu người dùng nhập khoảng trắng thì border của input cũng chuyển màu xanh lá cây.

![](https://images.viblo.asia/8a6b0a3b-04cb-4a45-add6-b81f2263f1f2.gif)

Về mặt kỹ thuật, điều này là chính xác. Input có giá trị bởi vì người dùng đã nhập giá trị cho nó mặc dù đó là ký tự khoảng trắng. 
Nhưng chúng ta không muốn hiện dropdown (tự động hoàn thành) khi người dùng nhập vào khoảng trắng chúng ta cần sử dụng thêm kỹ thuật để làm được điều này. 

## Thêm điều kiện kiểm tra
HTML cung cấp cho chúng ta khả năng validate inputs bằng các biểu thức chính quy  với thuộc tính mẫu. Chúng ta sẽ thử sử dụng chúng với thuộc tính `pattern` . Chúng ta không muốn khoảng trắng được chấp nhận hợp lệ, chúng ta sử dụng pattern `\S+`. Pattern này có nghĩa là: Một hoặc nhiều ký tự mà không phải là một khoảng trắng.

```
<form>
  <label> Input </label>
  <input type="text" name="input" id="input" required pattern="\S+"/>
</form>
```

Nếu người dùng nhập vào một khoảng trắng thì input không được validate. 

![](https://images.viblo.asia/d566797a-415d-4d08-af9d-8150d6a8dd48.gif)

Nhưng khi một khoảng trắng được người dùng nhập vào input, input sẽ không hợp lệ. 

![](https://images.viblo.asia/9a2b34c9-96a7-47c2-9323-3e8f0dcfd6a6.gif)

Do đó chúng ta sẽ bao gồm cả khoảng trắng trong patternpattern. Sự thay thế tốt nhất mà chúng ta có thể nghĩ đến đó là `\S+.*` . Điều này có nghĩa là 1 hoặc nhiều ký tự không phải khoảng trắng theo sau là 0 hoặc nhiều (bất kỳ) ký tự.
```
<form>
  <label> Input </label>
  <input type="text" name="input" id="input" required pattern="\S+.*"/>
</form>
```

![](https://images.viblo.asia/34596631-3687-452f-9d4d-ede1750d03fc.gif)

Bây giờ đã hoạt động như chúng ta mong muốn, chúng ta có thể nhập khoảng trắng giữa các từ.

![](https://images.viblo.asia/1b927f4b-f165-4bda-ad93-dd87e7b694fa.gif)

## Style khi input không hợp lệ
Liệu rằng chúng ta có thể style cho trạng thái khi input nhập vào không hợp lệ?  Trong bài viết về validate ở đây, tác giả có sử dụng `:placeholder-shown` pseudo-class. Nó sử dụng để kiểm tra xem khi nào placeholder hiển thị. 
```
/* Show red borders when filled, but invalid */
input:not(:placeholder-shown) {
  border-color: hsl(0, 76%, 50%);
}
```

Chúng ta cũng cần style cho input khi input ở trạng thái valid
```
/* Show red borders when filled, but invalid */
input:not(:placeholder-shown) {
  border-color: hsl(0, 76%, 50%);;
}

/* Show green borders when valid */
input:valid {
  border-color: hsl(120, 76%, 50%);
}
```
Dưới đây là bản demo chi tiết:

{@embed: https://codepen.io/zellwk/pen/dgEKxX}

Chú ý: Trình duyệt Edge không hỗ trợ `:placeholder-shown` do đó nó không phải là ý tưởng tốt để triển khi ứng dụng được sản xuất. 
## Kết luận
Như chúng ta có thể nhận thấy chúng ta hoàn toàn có thể validate form sử dụng CSS, nhưng có những vấn đề tiềm ẩn với validate khi liên quan tới các ký tự khoảng trắng. Nếu không quan tâm tới vấn đề liên quan vấn đề khoảng trắng chúng ta hoàn toàn có thể sử dụng một số pattern sau:

```.*``` bất kỳ ký tự nào 

```\S```: theo sau ký tự không phải khoảng trắng 

```\S```: theo sau là bất kỳ ký tự nào


Tài liệu tham khảo: [https://zellwk.com/blog/check-empty-input-css/](https://zellwk.com/blog/check-empty-input-css/)
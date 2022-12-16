# Mở đầu
Khi chúng ta làm việc với Javascript chắc chắn sẽ phải thao tác với sự kiện (event). Sự kiện (Event) trong javascript sẽ giúp chúng ta có những hiệu ứng thật cool ngầu trên một webstie. Vậy sự kiện là gì nhỉ ? Và sử dụng như thế nào ? Mình sẽ giải quyết vấn đề này trong bài viết dưới đây, một cách ngắn gọn nhất.

Hiểu một cách đơn giản thì sự kiện là một hành động nào đó tác động lên đối tượng HTML mà ta có thể bắt được sự kiện này và thực hiện những hành động nào đó. 

Xét về mặt thực tế thì ta có ví dụ thế này: Giả sử bạn xây dựng một form đăng ký tài khoản và bạn muốn bắt sự kiện khi người dùng CLICK vào button đăng ký thì hiện những hành động như validate dữ liệu, thông báo nếu người dùng nhập nội dung không đúng, .. Như vậy bạn cần nhớ rằng mỗi sự kiện chúng ta có thể thực hiện nhiều hành động khác nhau và bao nhiêu hành động thì phụ thuộc vào từng chức năng cụ thể.
# Các sự kiện (Events) trong javascript
## 1. Sự kiện chuột (mouse)

Khi sử dụng chuột chúng ta có các thao tác di chuột, click chuột, click đúp chuột, click chuột phải,... Tương ứng với đó trong javascript cũng có các sự kiện sau:
* **onclick**: Sự kiện xảy ra khi người dùng click vào phần tử
* **ondblclick**: Sự kiện xảy ra khi người dùng double-click vào phần tử
* **oncontextmenu**: Sự kiện xảy ra khi người dùng click chuột phải để mở context menu (ấn phím menu trên bàn phím không được nhé)
* **onmousedown**: Sự kiện xảy ra khi người dùng ấn một nút chuột trên phần tử (kể cả nút chuột giữa)
* **onmouseup**: Sự kiện xảy ra khi người dùng thả nút chuột qua một phần tử

Bạn sẽ hiểu rõ hơn về sự kiện click chuột khi xem ví dụ:
{@embed: https://codepen.io/xuannam79/pen/agZVWp}

**Chú ý**: 
- Khi người dùng click, double-click, right-click thì sẽ xảy ra sự kiện `onmousedown`, `onmouseup` và kèm theo các sự kiện tương ứng. - Sự kiện `onmousedown`, `onmouseup` sẽ được xảy ra trước `onclick`, `ondblclick`, `oncontextmenu` - Trường hợp người dùng ấn chuột vào phần tử nhưng lại di chuyển chuột ra chỗ khác để thả nút. 😃. Lúc này thì sự kiện `onmousedown` sẽ xảy ra và `onmouseup` với `onclick` sẽ không xảy ra được trên phần tử đầu. Điều tất yếu chức năng của sự kiện click chuột trên phần tử đầu sẽ không được thực hiện. Chỗ người dùng thả nút chuột sẽ có xảy ra sự kiện `onmouseup` với `onclick` và thực hiện luôn cả chức năng click chuột. - Khi người dùng `double-click` chuột thì đồng nghĩa với việc sẽ bôi đen phần văn bản được `double-click`. Để ngăn chặn điều này ta nên sử dụng thuộc tính 'user-select: none;' của css. Xem ví dụ: 
{@embed: https://codepen.io/xuannam79/pen/rELYpM}

* **onmousemove**: Sự kiện xảy ra khi con trỏ chuột di chuyển trên phần tử
* **onmouseenter**: Sự kiện xảy ra khi con trỏ chuột di chuyển vào phần tử
* **onmouseover**: Sự kiện xảy ra khi con trỏ chuột di chuyển vào phần tử hoặc các con của nó

Ví dụ: 
```html
<div id="onmouseenter">
    <p>onmouseenter: <span id="demo1">Mouse over me!</span></p>
</div>

<div id="onmouseover">
    <p>onmouseover: <span id="demo2">Mouse over me!</span></p>
</div>

<script>

var x = 0;
var y = 0;

function myEnterFunction() {
    document.getElementById("demo1").innerHTML = x+=1;
}

function myOverFunction() {
    document.getElementById("demo2").innerHTML = y+=1;
}
</script>
```

Sự kiện đối lập với `onmouseenter` và `onmouseover` là `onmouseleave` và `onmouseout`.
* **onmouseleave**: Sự kiện xảy ra khi con trỏ chuột di chuyển ra khỏi phần tử
* **onmouseout**: Sự kiện xảy ra khi con trỏ chuột di chuyển ra khỏi phần tử hoặc các con của nó.

## 2. Sự kiện bàn phím (Keyboad)

* **onkeydown**: Sự kiện xảy ra khi người dùng đang ấn 1 phím (sẽ được kích hoạt với tất cả các phím)
* **onkeypress**: Sự kiện xảy ra khi người dùng ấn 1 phím (một số phím sẽ không kích hoạt sự kiện này như phím alt, shift, ctrl, esc, backspace, delete, các phím mũi tên...)
* **onkeyup**: Sự kiện xảy ra khi người dùng thả 1 phím

## 3. Sự kiện khung (Frame)
* **onresize**: Sự kiện xảy ra khi người dùng thay đổi kích thước trình duyệt
* **onscroll**: Sự kiện xảy ra khi thanh cuộn của phần tử đang được cuộn

**Chú ý**:
        * Khi bạn thay đổi kích thước cửa sổ làm cho vị trí cuộn của trang bị ảnh hưởng cũng sẽ kích hoạt sự kiện **scroll**
        
##  4. Sự kiện form
* **onfocus**: Sự kiện xảy ra khi thành phần được tập trung. Một thành phần được focus như là một ô nhập liệu có con trỏ ở bên trong. Một ô check box hoặc radio được tab vào hoặc click vào cũng sẽ kích hoạt sự kiện focus.
* **onblur**: Đối nghịch với sự kiện onfocus. Sự kiện xảy ra khi thành phần rời bỏ sự tập trung.
* **onchange**: Sự kiện xảy ra khi thành phần đã được thay đổi nội dung, giá trị. Đối với ô `<input>`, `<keygen>`, `<select>`, và `<textarea>`.

Đối với ô nhập liệu khi người sử dụng thay đổi giá trị của ô nhập liệu và thoát khỏi ô nhập đó (blur) thì sự kiện onchange mới được kích hoạt.
Còn khi người dùng nhập dữ liệu vào ô input hoặc textarea mà mình cần lấy giá trị để validate thì sao. Chúng ta sẽ sử dụng sự kiện oninput dưới đây.
* **oninput**: Sự kiện xảy ra khi người dùng nhập giá trị vào ô input hoặc textarea
        **Chú ý**:
                * Đối với các ô select, checkbox, radio thì cũng có sự kiện oninput nhưng tùy trình duyệt bạn sử dụng. Như google chrome thì không có sự kiện oninput cho các ô checkbox, radio. Vì vậy chỉ nên sử dụng sự kiện oninput với các ô nhập liệu thôi.

* **onselect**: Sự kiện xảy ra khi người dùng chọn một số văn bản trong ô nhập liệu (input text, textarea, keygen)
* **onsubmit**: Sự kiện xảy ra khi form được gửi đi.
* **onreset**: Sự kiện sảy ra khi form được reset về giá trị mặc định.

## 5. Sự kiện Clipboard
* **oncut**: Sự kiện xảy ra khi người dùng cắt nội dung của một phẩn tử
* **onpaste**: Sự kiện xảy ra khi người dùng dán một số nội dung vào trong phẩn tử
* **oncopy**: Sự kiện xảy ra khi người dùng sao chép nội dung của một phần tử.

## 6. Các hàm của sự kiện hay dùng:
* **preventDefault()**: Ngăn chặn sự kiện thực hiện chức năng mặc định. Ví dụ ta có một sự kiện submit() form, nhưng ta không muốn nó submit bình thường mà dùng ajax gửi request chẳng hạn thì mình sẽ dùng hàm preventDefault() để ngăn chặn form submit bình thường.

```html
<form id="myForm">
  Name: <input type="text" name="name">
  <input type="submit" value="Submit">
</form>

<script>
document.getElementById("myForm").addEventListener('submit', myFunction);

function myFunction(event) {
	event.preventDefault();
	$.ajax({
		//Enter your code
	});
    console.log('The form was submitted');
}
</script>
```

* **element.addEventListener(event, function)**
* **element.removeEventListener(event, function)**

#  Lời kết
Trên đây là một số event thường sử dụng trong Javascript. Làm việc với Javascript thì không thể quên khái niệm event được nên hãy học chắc bài này nhé các bạn.
Hẹn gặp lại các bạn vào bài viết tiếp theo!
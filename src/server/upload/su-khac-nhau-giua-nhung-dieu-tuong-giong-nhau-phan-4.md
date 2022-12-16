<p align="center">Cầm tấm vé trên tay em bay đến Sapa,</p>
<p align="center">Đà Lạt mưa nhiều quá toàn kỉ niệm chúng ta.</p>

Hôm nay mình sẽ mang đến cho các bạn một làn không khí lạnh xua tan cái nóng của mùa hè. Là một người thích sự lãng mạn, mình đã có kinh nghiệm 4 lần đi Đà Lạt và đã có *"vài lần"* đi Sapa qua youtube, thời sự... mình xin gửi đến đôi lời về 2 địa điểm tránh nóng của Việt Nam. :laughing:

Đà Lạt và Sapa, đều là 2 thành phố ở ***"Tây (Tây Nguyên, Tây Bắc)"*** tuy mạnh yếu từng lúc khác nhau song đặc trưng từ vùng vẫn có, 2 vùng đất này luôn được yêu thích bởi khí hậu mát lạnh, phong cảnh hữu tình và đa dạng văn hóa dân tộc thiểu số. Sapa là thị trấn với đa dạng ẩm thực miền núi, nổi bật trong phiên chợ vùng cao là hình ảnh thiếu nữ xinh xắn với những bộ đồ thổ cẩm của người H'mong. Nếu đi vào tháng 10 - mùa lúa chín của Sapa, bạn sẽ được đắm chìm trong những sắc vàng của ruộng bậc thang, hoặc chinh phục đỉnh Fansipan vào những ngày cuối năm. Còn với Đà Lạt - thành phố sương mù nổi tiếng đỉnh núi Langbiang tựa thiên đường, những ngọn thác bên thung lũng tình yêu gắn liền trong những bài hát như *"Thành phố buồn", "Đà Lạt hoàng hôn", "Ai lên xứ hoa đào"...* Đà Lạt ẩn mình trong vùng đất Tây Nguyên huyền bí với những trường ca của núi rừng. Không thua kém Sapa, Đà Lạt có những đồi chè, những cung đường 2 bên rừng thông nguyên sinh bao phủ, trải dài bên thung lũng là rừng hoa mai anh đào đỏ thắm hay màu trắng tinh khôi của hoa ban, nếu là tín đồ *"make color"* thì nơi đây không thể bỏ qua. Đà Lạt đã mang đến cho mình rất nhiều cảm xúc, trong 2 năm liên tiếp mình đã ghé thăm xứ sở ngàn hoa này đến 4 lần và chuyến đi sẽ không dừng lại.

![](https://images.viblo.asia/ac628243-8bde-4fb5-bf38-9444539a6ca2.jpg)

Chắc hẳn đến đây mọi người cũng đã háo hức cho chuyến đi của mình. Mùa này Đà Lạt đang mưa rất lớn, Sapa thì đang trong mùa nước đổ của đầu hạ cũng là lúc ngập tràn trong hương sắc của hoa đỗ quyên và táo mèo, còn mình thì tiếp tục chia sẻ đến các bạn bài viết này đến các bạn.

### 1. `preventDefault()` và `return false`
Đều có tác dụng ngăn chặn sự kiện mặc định xảy ra.
#### - preventDefault()
Ví dụ khi nhấp vào link, ta có thể chặn việc thực hiện điều hướng bằng cách
```js
hyperlink.addEventListener('click', function(e) {
  // Don't redirect user to the link
  e.preventDefault();
});
```
Tương tự đối việc submit form
```js
submitButton.addEventListener('click', function(e) {
  // Don't submit the form when clicking a submit
  e.preventDefault();
})
```
#### - return false
- Không hoạt động trên thông qua `addEventListener`
- Chỉ hoạt động khi handle event được khai báo là attribute của element

```js
hyperlink.addEventListener('click', function(e) {
  // Does NOT work
  return false;
});

// Work
hyperlink.onclick = function(e) {
  return false;
};
```
- Nếu bạn đang sử dụng `jQuery` để quản lý các event, thì bạn có thể sử dụng `return false` trong trình xử lý sự kiện:
```js
$('button').click(function (event) { // cần có tham số truyền vào
  // code ...
  event.preventDefault()
});

$('button').click(function () { // không cần tham số truyền vào
  // code ...
  return false;
});
```

- Ngăn cản event ảnh hưởng tới parrent element giống như `event.stopPropagation()` ***(Best practice)***

```html
<p onclick="parentEventHandler()">
  <a href="https://viblo.asia">Viblo</a>
</p>

<script type="text/javascript">
  // hàm callback xử lý sự kiện click vào phần tử "p"
  function parentEventHandler() {
    alert("bạn đã nhấp chuột vào phần tử p");
  };

  // đoạn mã jQuery đăng ký hàm callback để xử lý sự kiện click vào phần tử "a"
  $("a").click(function (event) {
    alert("bạn đã nhấp vào link");
    return false;
  });
</script>
```
Khi người dùng nhấp vào link liên kết một hộp thoại cảnh báo được hiện ra với nội dung `bạn đã nhấp vào link`. Sau đó sẽ không có bất cứ hành động nào khác diễn ra do `return false` ngăn cản browser điều hướng tới trang đích của liên kết đồng thời ngăn cản sự kiện nhấp chuột ảnh hưởng tới phần tử cha là `p`.

### 2. `currentTarget` và `target`
#### - target
- `target` cho biết nơi bắt đầu sự kiện.
- Là phần tử mà người dùng đã nhấp vào, trong trường hợp sự kiện click. Nó có thể là phần tử gốc hoặc bất kỳ phần tử con nào của nó tùy thuộc vào nơi được người dùng click vào chính xác.

#### - currentTarget
- `currentTarget` cho chúng ta biết phần tử nào mà sự kiện đã được đính kèm hoặc phần tử có `eventListener` đã kích hoạt sự kiện, nói chung là để lắng nghe sự kiện.

Giả sử bạn xây dựng modal, modal sẽ được 1 lớp overlay bao bên ngoài, khi click ra ngoài sẽ close modal (click outside)

![](https://images.viblo.asia/c5445b2c-454a-462d-9f4c-f7b9ef0e5c54.png)

```html
<!-- Overlay -->
<div id="overlay">
  <!-- Modal content -->
  <div id="modal">...</div>
</div>

<script>
  let overlay = document.getElementById('overlay');
  let modal = document.getElementById('modal');
</script>
```
Đầu tiên, mình sẽ detect việc click vào `#overlay`
```js
overlay.addEventListener('click', function() {
  // To do close modal
  console.log('Close the modal');
});
```
Tuy nhiên, khi người dùng click lên `#modal` thì `#overlay` cũng được click. Vì vậy, cần sử dụng `stopPropagation()` để ngăn chặn event ảnh hưởng tới phần tử cha.
```js
modal.addEventListener('click', function(e) {
  e.stopPropagation();
});
```
Cách thứ 2, để đảm bảo rằng người dùng nhấp vào `#overlay` chứ không phải `#modal`, chúng ta có thể chỉ cần kiểm tra xem cả thuộc tính `currentTarget` và `target` có tham chiếu đến cùng một phần tử hay không:
```js
overlay.addEventListener('click', function(e) {
  if (e.currentTarget === e.target) {
    // To do close modal
    console.log('Close the modal');
  }
});
```
Cách làm **thứ hai đơn giản hơn** nhiều so với cách đầu tiên và nó không yêu cầu handle sự kiện nhấp chuột của modal.

### 3. `addEventListener() function` và `on property`
#### - addEventListener
Các phiên bản cũ **< 9** của của IE - ***phần mềm để down chrome*** thực hiện javascript khác với khá nhiều trình duyệt khác. Với các phiên bản nhỏ hơn 9, ta sử dụng phương thức `attachEvent`

```js
element.attachEvent('onclick', function() {
  /* do stuff here*/
});
```
Cho đến khi IE 10 ra đời, `addEventListener` đã ra đời và thay thế cho `attachEvent`
```js
element.addEventListener('click', function() {
  /* do stuff here*/
}, false);
```
- Handle được nhiều sự kiện với `addEventListener`
- Cho phép handle event không giới hạn và remove chúng với `element.removeEventListener()`.
- Cho phép tách file (HTML) và logic (JavaScript) giúp viết rõ ràng và dễ quản lý hơn.
- Hoạt động hầu hết tất cả các trình duyệt. Nếu vẫn phải hỗ trợ **IE <= 8**, thì có thể sử dụng [polyfill từ MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Compatibility).

```js
const handler = () => {
  console.log('the element is clicked');
};

element.addEventListener('click', handler);
```
#### - on property (onevent HTML attribute)
```js
element.onclick = handler;

<div onclick="handler()" />
<div onclick="javascript: handler()" />
```
- Thường gặp vấn đề về lỗ hổng bảo mật XSS.
- Khó quản lý vì viết trong HTML thay vì viết ở file JS xử lý logic riêng
- `addEventListener` có thể thêm nhiều event, trong khi với `onclick` điều này không thể thực hiện được

### Tổng kết
Bài chia sẻ trên là một số điểm khác biệt mà quá trình làm mình đã nhận ra. Hi vọng sau bài này sẽ giúp các bạn có thêm nhiều thủ thuật mới để giải quyết được nhiều task mà tối ưu nhất. Cảm ơn bạn đã đồng hành cùng những chuyến du lịch của mình. Hãy đón chờ những bài sau để cùng mình khám phá những địa danh mới nhé. :P
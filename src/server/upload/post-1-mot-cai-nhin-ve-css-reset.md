## Mở đầu
Không phải ngẫu nhiên mà nhiều lúc bạn viết giao diện không cho thêm một thuộc tính nào mà các thẻ <h1>, <h2>... của bạn vẫn cách nhau một khoảng. Điều đó xảy ra là vì hầu hết các trình duyệt đều có một tập các kiểu định dạng mặc định được áp dụng cho mọi trang web, cái này được gọi là "user agent stylesheet".   Hầu hết các định dạng này đều là nguồn mở nên bạn có thể xem qua chúng:  
* [ Chromium UA stylesheet](https://chromium.googlesource.com/chromium/blink/+/master/Source/core/css/html.css) - Google Chrome & Opera
* [Mozilla UA stylesheet](https://dxr.mozilla.org/mozilla-central/source/layout/style/res/html.css) - Firefox
* [WebKit UA stylesheet](https://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css) - Safari
Giữa các UAS (User agent stylesheet) hầu như có các định dạng mặc định phù hợp, có thể dùng chung cho nhau. Nhưng cũng ko ít định dạng khác nhau dẫn đến mâu thuẫn khi phát triển web. Ví du như là khi :focus vào các ô nhập liệu của các trình duyệt khác nhau thì cho ra các giao diện mặc định khác nhau.
![](https://images.viblo.asia/df26bd80-80d9-486f-8e12-d6c57212f147.png)

## Vì sao cần CSS Reset
Để đối phó với sự không nhất quán giữa các định dạng UAS, các bộ CSS Reset đã ra đời. Các bộ CSS Reset ấy đã thiết lập lại CSS trước khi có thiết lập CSS riêng, với mục đích tạo cơ sở chuẩn hơn giữa các trình duyệt. Việc ra đời của CSS Reset là rất cần thiết. Ngoài việc tạo nên cơ sở chuẩn giữa các trinh duyệt thì nó cũng giúp cho các lập trình viên không bị mệt mỏi mỗi khi hiệu chỉnh lại CSS mặc định của mỗi trình duyệt. 

## Ghi đè lên CSS Reset
Một trong những lí do chính biện hộ cho việc không dùng CSS Reset đấy chính là chúng ta thường có suy nghĩ là trước sau gì trong khi phát triển web chúng ta chẳng chỉnh sửa hết những định dạng mặc định ấy, thêm CSS Reset chỉ làm việc tải trang thêm nặng mà thôi. Điều này hoàn toàn đúng nhưng không phải là lý do cốt lõi để không sử dụng CSS Reset. 
- Thứ nhất: Khi dùng CSS Reset chúng ta sẽ thiết lập được phong cách viết sạch sẽ hơn. Lúc ấy chúng ta có thể tự do sáng tạo theo phong cách và trình duyệt chúng ta mong muốn mà không phải đi chỉnh sửa từng trình duyệt một. 
- Thứ hai: Các bộ CSS Reset thường được tối ưu hóa dung lượng ít nhất có thể để không làm ảnh hưởng đến hiệu suất trang. 

## Các bộ CSS Reset thông dụng
### 1. Reset all
```css
* {
    margin: 0;
    padding: 0;
}
```
Mình nghĩ đây là một cách reset quá nặng tay và không tối ưu. Nó không reset triệt để những gì chúng ta cần mà lại làm mất đi những cái không đáng mất như là `padding` của `input`. Chúng ta nên nghĩ đến việc sử dụng các bộ CSS Reset được xây dựng chuyên nghiệp và tối ưu hơn. 

### 2. Normalize.css
Đây là bộ CSS Reset mình thấy là tối ưu nhất và mình cũng hay sử dụng nhất để thiết lập lại những định dạng mặc định. Bộ reset CSS này thích hợp cho những ai muốn tự mình viết lại CSS cho toàn bộ các thành phần trong website, kể cả việc thiết lập kích thước chữ cho các thẻ tiêu đề. Bộ CSS Reset này cũng hỗ trợ rất nhiều trình duyệt. 
[`https://necolas.github.io/normalize.css/`](https://necolas.github.io/normalize.css/)

### 3. Reset CSS 2.0 by Eric Meyer
Nếu bạn cần một đoạn reset CSS đưa toàn bộ các phần tử website về “thời đồ đá”, không có bất cứ một định dạng gì thì có thể sử dụng bộ này. Bộ reset CSS này thích hợp cho những ai muốn tự mình viết lại CSS cho toàn bộ các thành phần trong website, kể cả việc thiết lập kích thước chữ cho các thẻ tiêu đề.
[`http://meyerweb.com/eric/tools/css/reset/`](http://meyerweb.com/eric/tools/css/reset/)

### 4. Bootstrap’s Reboot 
Bộ CSS Reset của Bootstrap lại đưa chúng ta đi xa hơn khi nó thậm chí khai báo họ phông chữ và màu nền cho phần tử  `<body>`.
```css
// Body
//
// 1. Remove the margin in all browsers.
// 2. As a best practice, apply a default `background-color`.
// 3. Set an explicit initial text-align value so that we can later use the
//    the `inherit` value on things like `<th>` elements.

body {
  margin: 0; // 1
  font-family: $font-family-base;
  font-size: $font-size-base;
  font-weight: $font-weight-base;
  line-height: $line-height-base;
  color: $body-color;
  text-align: left; // 3
  background-color: $body-bg; // 2
}
```
## Kết luận
Việc sử dụng CSS Reset sẽ đem đến cho bạn cách viết sạch sẽ hơn, dễ định hình phong cách, kiểu dáng trang web của bạn trên mọi trình duyệt web. Đây là việc một việc nên làm. Tuy nhiên bạn không hẳn là phải sử dụng các bộ CSS Reset có sẵn mà bạn có thể tạo ra những bộ Custom CSS Reset của chính bạn để phù hợp nhất với mục đích sử dụng của bạn. 

Happy coding!
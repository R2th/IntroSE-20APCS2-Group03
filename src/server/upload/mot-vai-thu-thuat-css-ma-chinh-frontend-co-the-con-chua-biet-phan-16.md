![](https://images.viblo.asia/413c68bc-1f0a-4f6a-aaa1-754e9f3bcd5e.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 16 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Debug CSS mà không phải F12 (Inspect Element)

Inspect element khi code CSS đối với Frontend là điều luôn luôn rồi, nhưng đã bao giờ bạn thử debug CSS bằng cách kiểm tra tất cả elements trên trang:

- Xem nó đang được `line-height`, `padding`, `margin` như thế nào chưa?
- Vị trí của element đó có đúng với ý đồ thiết kế layout của mình chưa?
- Hay xem thử có chỗ nào khoảng cách của nó không ổn và dễ phát sinh lỗi sau này chưa?

Và đây là cách mình hay debug CSS, kết hợp bên cạnh việc Inspect Element

![Toggle Debug CSS](https://images.viblo.asia/c2c94f55-5ece-4ca9-b88e-ff1823816714.PNG)

Hồi đấy giờ, mình sài mỗi extension này [simple-debug.css](https://chrome.google.com/webstore/detail/simple-debugcss/jlkgkebpphmaiemciejnmgccejccnpha). Nay mình còn biết thêm extension này nữa [Pesticide for Chrome](https://chrome.google.com/webstore/detail/pesticide-for-chrome/bblbgcheenepgnnajgfpiicnbbdmmooh)

Nhưng dù là extension nào thì mình nhận thấy việc cài đặt là không cần thiết, thay vào đó ta có 1 đoạn script và tạo thành 1 bookmark trên trình duyệt, thế là có thể toggle nhanh chóng bật debug được rồi!

Sử dụng đoạn script dưới đây:

```js
javascript: (function() {
	var elements = document.body.getElementsByTagName('*');
	var items = [];
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].innerHTML.indexOf('* { background:#000!important;color:#0f0!important;outline:solid #f00 1px!important; background-color: rgba(255,0,0,.2) !important; }') != -1) {
			items.push(elements[i]);
		}
	}
	if (items.length > 0) {
		for (var i = 0; i < items.length; i++) {
			items[i].innerHTML = '';
		}
	} else {
		document.body.innerHTML +=
			'<style>* { background:#000!important;color:#0f0!important;outline:solid #f00 1px!important; background-color: rgba(255,0,0,.2) !important; }\
            * * { background-color: rgba(0,255,0,.2) !important; }\
            * * * { background-color: rgba(0,0,255,.2) !important; }\
            * * * * { background-color: rgba(255,0,255,.2) !important; }\
            * * * * * { background-color: rgba(0,255,255,.2) !important; }\
            * * * * * * { background-color: rgba(255,255,0,.2) !important; }\
            * * * * * * * { background-color: rgba(255,0,0,.2) !important; }\
            * * * * * * * * { background-color: rgba(0,255,0,.2) !important; }\
            * * * * * * * * * { background-color: rgba(0,0,255,.2) !important; }</style>';
	}
})();
```

Và tiến hành các bước để tạo 1 bookmark cho trình duyệt **Chrome**

1. Vào **Dấu trang** > **Trình quản lý dấu trang**

2. Ở góc phải click vào nút 3 chấm dọc, chọn **Thêm dấu trang mới**

3. Đặt tên cho dấu trang, ở đây mình đặt là `debug-css` và paste đoạn code JS ở trên vào ô URL

4. Lưu lại và bạn đã có 1 bookmark trên trình duyệt, giờ thì thử click vào bookmark để toggle debug css nào!

#### Đọc hiểu thêm

- https://dev.to/gajus/my-favorite-css-hack-32g3
- https://gist.github.com/vcastroi/e0d296171842e74ad7d4eef7daf15df6

### 2. CSS tạo theme cho `dark mode` [Not Cross-Browsers]

Màu tối luôn mang đến sự huyền bí, trông có vẻ nguy hiểm hơn (như hacker) và đôi khi là thấy ngầu hẳn ra. Từ Code Editor, Command line mình đều chọn dark theme (theme màu tối).

Hiện nay những phiên bản mới nhất của các Hệ điều hành như MacOS hay Windows đều đã support cho phép chọn theme màu tối, bắt kịp xu hướng trên, làm sao để site của bạn cũng tự động được style CSS đáp ứng **chế độ tối** kia, nếu máy người dùng config chọn dark theme từ máy của họ nhỉ?

Đó là 1 tính năng của CSS `@media`, gọi là `prefers-color-scheme` sẽ giúp detect nếu user thay đổi theme `light` hoặc `dark` từ hệ điều hành của họ.

Sở dĩ 1 dev Frontend nên nắm hiểu tính năng này, vì sẽ giúp bạn đưa ra đề nghị cho khách hàng của dự án, bổ sung thêm tính năng này vào site của họ, người dùng sẽ vô cùng thích thú. Vì người dùng họ đã thích màu tối, họ vào hệ điều hành để điều chỉnh sang dark theme, khi họ ghé thăm site của bạn, thưởng thức được theme màu tối nữa thì còn gì bằng.

Chỉ với 1 đoạn code media đơn giản như thế này:

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: #ccc;
  }
}
```

Hãy mở demo bên dưới và vào setting máy của bạn, switch qua lại giữa theme `light` sang `dark` để xem kết quả nhé!

{@codepen: https://codepen.io/tinhh/pen/oNvJqRY}

> Hiện tại media query này đang được support bởi các version mới nhất của Chrome, Firefox, Safari, Edge, Opera, riêng mỗi IE là chưa được support.

#### Đọc hiểu thêm

- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
- https://caniuse.com/#search=prefers-color-scheme
- https://dev.to/blacksonic/add-dark-mode-to-your-site-with-this-short-css-trick-1g7b
- https://web.dev/prefers-color-scheme

### 3. Break text xuống dòng theo ý muốn khi responsive

Đã bao giờ bạn gặp trường hợp CSS cho 1 câu slogan, ở màn hình Desktop khi không gian đủ rộng câu slogan sẽ nằm trên 1 dòng, nhưng ở màn hình Mobile khi không gian hẹp hơn, slogan đấy phải break xuống dòng theo ý muốn.

Hình dung câu slogan sẽ bị break xuống dòng bình thường sẽ như thế này:

Khi ở Desktop:

> MAKE AWESOME THINGS THAT MATTER

Khi ở Mobile:

> MAKE AWESOME THINGS THAT
>  
> MATTER

Hoặc màn hình nhỏ hơn nữa thì sẽ

> MAKE AWESOME THINGS
>  
> THAT MATTER

Câu slogan cũng 1 phần làm nên thương hiệu của công ty, mà bị break xuống dòng 1 cách dở dang, không đúng chủ đích, 1 phần có thể gây ấn tượng không tốt cho người khách khi ghé thăm site của công ty đó.

Vậy với tình huống trên, Frontend sẽ phải xử lý như thế nào để control đoạn text đó break xuống dòng theo mong muốn?

Dev web nói chung, kể cả Frontend hay Backend thì không xa lạ gì với thẻ `br` nhỉ? Chỉ cần đặt vào 1 thẻ `br` ngay tại nơi bạn muốn ngắt dòng và đương nhiên bạn phải cho `display: none` cái thẻ `br` đó ở màn hình Desktop, khi xuống Mobile bạn cho nó hiện ra, thế là xong!

Giả sử ở đây mình muốn màn hình nhỏ hơn `500px` thì xuống dòng và mình đang làm theo hướng Desktop First, thì đoạn CSS sẽ như sau: 

```css
br {
   display: none;
}

@media (max-width: 500px) {
   br {
      display: block;
   }
}
```

{@codepen: https://codepen.io/tinhh/pen/jONdLQg}

#### Đọc hiểu thêm

- Đây là cách mình nghĩ ra, nên không có tài liệu tham khảo :smile: 

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!
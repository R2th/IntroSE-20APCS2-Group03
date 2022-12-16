![image.png](https://images.viblo.asia/57f8e40c-e6eb-40b1-b354-2f5679c011e3.png)

Mình là TUẤN hiện đang là một Full-stack Web Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Đôi khi, chúng ta muốn chuyển đến phần tử có ID bất kỳ bằng cách sử dụng JavaScript.

Trong bài viết này, mình sẽ giới thiệu cách cuộn đến một phần tử bất kỳ bằng cách sử dụng JavaScript.

Sử dụng location.href và history.replaceState
=============================================

Chúng ta có thể sử dụng thuộc tính `location.href` để lấy URL và bỏ quan phần `hashtag #`. Ví dụ: `https://viblo.asia/u/Clarence161095#fullname` thì `location.href` sẽ bỏ `#fullname` và chỉ lấy `https://viblo.asia/u/Clarence161095`.

Sau đó, chúng ta có thể nối thêm `hashtag #` tùy ý vào vào nó.

ví dụ chúng ta có code HTML như sau:

```html
<button>
  jump
</button>
<div id='a'>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus dignissim lacus, ac ullamcorper ex aliquam vel. Donec nec luctus augue, sit amet porttitor diam. Ut sit amet mi ac risus congue ultricies. Donec et condimentum nisi, sit amet consequat felis. Nam velit nibh, blandit non nunc eget, ullamcorper suscipit ex.
</div>
<div id='b'>
  Phasellus faucibus fringilla ullamcorper. Vivamus gravida urna vel odio rutrum rutrum. Vivamus pretium, orci eget cursus tempus, quam elit rutrum est, vel fermentum sapien odio sit amet velit. Etiam cursus pulvinar massa, non maximus dolor vestibulum id. Morbi mi mauris, iaculis ac sem a, porta vehicula risus. Curabitur tincidunt sollicitudin sapien, ac tristique ligula ullamcorper eget. Donec tincidunt orci non ligula auctor ullamcorper. Aliquam mattis elit mauris, at posuere nulla lobortis id.
</div>
```

Sau đó, chúng ta có thể thêm một `button` để cuộn xuống `div` có ID là `b` khi click:

```javascript
const jump = (h) => {
  const url = location.href;
  location.href = "#" + h;
  history.replaceState(null, null, url);
}
const button = document.querySelector('button')
button.addEventListener('click', () => {
  jump('b')
})
```

Chúng ta có hàm `jump` với tham số `h` là ID của phần tử mà chúng ta muốn cuộn đến.

Tiếp theo, chúng ta lấy URL hiện tại với `location.href`.

Sau đó, chúng ta thêm `hashtag #` có ID là `h` vào nó để chuyển đến phần tử có ID `h`.

Và sau đó chúng ta gọi `history.replaceState` với `url` làm đối số thứ 3 để thay thế URL có `hashtag #` bằng URL gốc.

Tiếp theo, chúng ta sử dụng `document.querySelector` để get phần từ `button`.

Và sau đó chúng ta gọi `addEventListener` với sư kiện `'click'` để thêm *click listener*.

Đối số thứ 2 là một hàm **callback** gọi hàm `jump` và truyển `'b'` để cuộn đến `div` với ID `b`.

Tóm tắt
===========

Chúng ta có thể sử dụng thuộc tính `location.href` để lấy URL mà không cần `hashtag #`.

Sau đó, chúng ta nối `hashtag #` vào nó.

Và sau đó chúng ta có thể xóa `hashtag #` khỏi URL trong thanh URL bằng `history.replaceState`.

Roundup
========================================
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
========================================
* https://tuan200tokyo.blogspot.com/2022/12/blog61-di-chuyen-en-div-co-id-bat-ky.html
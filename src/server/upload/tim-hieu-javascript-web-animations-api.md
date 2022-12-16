- Việc thêm các animation vào giao diện web làm cho web pages và các apps trông có vẻ tương tác nhiều hơn với người dùng. Một thanh side menu với khả năng trượt vào/ra mượt mà sẽ mang đến trải nghiệm người dùng tốt hơn nhiều trường hợp cũng là thanh side menu đó, chỉ xuất hiện rồi biến mất.

- Từ trước đến nay, việc tạo web animation thường được thực hiện bằng **CSS transition**, **CSS keyframe** hoặc một thư viện bên ngoài như Animate.css, Velocity.js. Những API mới của native JavaScript có thể tạo animation cho các phần tử HTML gói gọn trong file .js


# Tạo animation

-  Để thể hiện sự tuyệt vời của các JavaScript Web animations. chúng ta sẽ tạo một ví dụ đơn giản bằng cả 2 cách, một cách cũ sử dụng CSS, và một cách mới sử dụng JavaScript Web animation.

- Editor bên dưới chứa 2 thẻ div HTML, gồm 2 hình vuông và tròn. Khi nhấp vào hình thì hình đó sẽ di chuyển sang phải và sau đó đổi màu. Hình vuông được tạo animation thông qua **CSS code>@keyframes**, hình tròn được tạo animation bằng Web Animations API.


- Demo code ở link sau : {@codepen: https://codepen.io/ngc-yn/pen/QRMBqY}

 
### Với css animation

- **code>@keyframes** đã quen thuộc với tất cả developer, chúng ta sẽ cùng xem xét code này trước.
- CSS animation được định nghĩa trong một block **code>@keyframes**, thể hiện cho khoảng thời gian thay đổi của tất cả các transtion.
- Một khi chúng ta đã xác định được khoảng thời gian chuyển động của nó, chúng ta có thể thay đổi đường đi các selector thông qua thuộc tính animation

```CSS
.animate {
    animation-name: move-and-change-color;   
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
}

@keyframes move-and-change-color {
    0% {
        transform: translateX(0);
    }

    80% {
        transform: translateX(100px);
        background-color: #2196F3;
    }

    100% {
        transform: translateX(100px);
        background-color: #EF5350;
    }
}
```

-  Để animation bắt đầu khi có tương tác từ người dùng, chúng ta cần tạo sự kiện on-click, thêm một class CSS vào element mà mình mong muốn:

```JS
var square = document.getElementById('square');

square.addEventListener('click', function() {
    square.className += " animate";
})
```

- Mặc dù nó hoạt động tương đối tốt, sử dụng CSS để tạo animation có vẻ không trực quan, vì chúng ta định nghĩa animation trong file CSS, nhưng animation lại bắt đầu trong JavaScript. Hơn nữa, chúng ta cũng bị hạn chế kiểm soát các animation một khi chúng bắt đầu được chạy. Các vấn đề này có thể được giải quyết bằng cách chuyển sang sử dụng JS Web Animation API

### Với  JS Web Animation API

- Chúng ta có thể mô tả JavaScript animation tương tự như cách chúng ta mô tả trong CSS:

```
var moveAndChangeColor = [
    { 
        transform: 'translateX(0)',
        background: '#2196F3'    // blue
    },
    { 
        offset: 0.8,
        transform: 'translateX(100px)', 
        background: '#2196F3'    // blue
    },
    {
        transform: 'translateX(100px)',
        background: '#EF5350'    // red
    }
];
```

- Mỗi đối tượng trong mảng đại diện cho một trạng thái của animation. Các trạng thái được phân bổ đều theo thời gian (3 trạng thái - 0%, 50%, 100%). để thay đổi mốc thời gian của đối tượng trong animation, chúng ta sử dụng offset. Như ví dụ bên trên, chúng ta để offset là 0.8 cho đối tượng ở giữa.

- Sau khi định nghĩa animation array, chúng ta có thể gọi chúng bằng hàm animate(). Hàm này nhận animation làm argument thứ 1, và argument thứ 2 là một đối tượng với các property tương tự với CSS animation property. Tên các property gần giống nhau (animation-fill-mode trên CSS tương ứng fill, animation-iteration-count trên CSS tương ứng iteration,…)

```
var circle = document.getElementById('circle');

circle.addEventListener('click', function() {
    circle.animate(moveAndChangeColor, {
        duration: 400,
        fill: 'forwards'
    });
});
```

- Như các bạn có thể thấy, việc viết animation bằng JavaScript có tổ chức hơn, animation được lưu trữ trong một biến, và hàm animate() được sử dụng bất kỳ khi nào chúng ta cần


# Điều khiển animation

Web animation API cho phép chúng ta dễ dàng kiểm soát animation bằng nhiều cách khác nhau. Hàm animate() trả lại một đối tượng Animation, chúng ta có thể lưu đối tượng này trong một biến, và xử lý animation bằng đối tượng này sau này.

var animation = elem.animate(transitions, options);

Chúng ta có thể sử dụng các hàm sau để kiểm soát animation:

	• pause() - Tạm thời đóng băng trạng thái hiện tại của animation
	• play() - Tiếp tục thực hiện animation hoặc chạy lại animation trong trường hợp animation đã hoàn thành
	• reverse() - thực hiện animation với chiều ngược lại
	• finish() - Đi đến cuối của animation (đi đến đầu trong trường hợp sử dụng reverse)
	• cancel() - Dừng animation và trở lại trạng thái đầu tiên trước khi thực hiện animation

Dưới đây là 1 demo nhỏ, với một loading indicator chạy vô hạn. Chúng ta sẽ thiết lập các nút cho các sự kiện khác nhau như sau: link demo {@codepen: https://codepen.io/ngc-yn/pen/VOzEqe} 


# Các thuộc tính và các Event

-  Các object Animation trả về  animate () chứa một số thuộc tính hữu ích cho phép chúng ta truy cập vào các tùy chọn như thời gian hiện tại, tốc độ phát  và các thuộc tính khác, mặc dù một số thuộc tính chỉ  để đọc

- Bạn có thể xem demo này {@codepen: https://codepen.io/ngc-yn/pen/QRMJbB}  để hiểu về cách chúng hoạt động. Để biết thêm danh sách chi tiết  đầy đủ các thuộc tính, hãy truy cập [MDN.](https://developer.mozilla.org/en-US/docs/Web/API/Animation)

- Ngoài ra, API Animation Web còn cung cấp cho chúng ta hai trình xử lý sự kiện hữu ích khi Animation kết thúc( finish) hoặc đã bị hủy (cancel)


```
spinnerAnimation.addEventListener('finish', function() {
    doSomething();
});

spinnerAnimation.addEventListener('cancel', function() {   
    doSomething();
});
```

# Hỗ trợ 
- Hầu hết các tính năng Animation Web API đều có sẵn hỗ trợ  miễn phí trong Chrome và Firefox, với Safari thì từ version 12.2 đã có hỗ trợ, còn IE và Edge thì mãi là đường cong đi sau ak.  Bạn có thể seach hỗ trợ trình duyệt thông qua [ caniuse ](https://caniuse.com/#search=Web%20Animations%20API)

![](https://images.viblo.asia/4fa21174-58ad-498e-8b70-16320b65170c.png)

-  Ngoài ra còn có mã nguồn mở [polyfill ](https://github.com/web-animations/web-animations-js ) bạn có thể được sử dụng nó  trong khi chờ hỗ trợ của trình duyệt.


#  Kết luận

- Web Animation API  cung cấp cho các deverloper một cách tuyệt vời để tạo  và kiểm soát **animation** web bằng cách sử dụng không có gì  khác ngoài JavaScript thuần túy.
-  Đối với các **Animation** được gọi khi tương tác với người dùng hoặc các event animation khác, đây là một tin tuyệt vời vì toàn bộ Animation có thể được thực hiện, mà không phải chuyển sang  CSS .

- Bài viết này đề cập đến hầu hết các tính năng của API mới, nhưng nếu bạn muốn tìm hiểu thêm các link dưới đây: 

    - Sử dụng Web Animations API trên [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)
    - [Animatelo](https://gibbok.github.io/animatelo/) - Bản làm lại của Animate.css bằng API Web Animation
    - [Let’s talk about the Web Animations API](http://danielcwilson.com/blog/2015/07/animations-intro/) - Hướng dẫn gồm 5 phần của Daniel C. Wilson
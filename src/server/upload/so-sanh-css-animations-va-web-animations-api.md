### Giới thiệu về Web Animations API
 Web Animations API cung cấp một cách để các nhà phát triển trực tiếp thao tác với công cụ animations của trình duyệt bằng JavaScript.
**Khởi tạo một Animation**
Để tạo một hiệu ứng động bằng cách sử dụng Web Animations API, chúng ta sử dụng hàm `Element.animate ()`, lấy hai giá trị keyframes và options.
```
element.animate(keyframes, options);
```
**keyframes**
Đối tượng keyframe thể hiện dòng thời gian của các sự kiện trong animations. Có hai cách để viết đối tượng này. Để minh họa cho họ, bạn hãy sử dụng animations grow, animation này sẽ mở rộng một phần tử thành gấp đôi kích thước của nó. Đây là animation sử dụng CSS

**@keyframes:**

```
@keyframes grow {
    0% {
        transform: none;
    }
    100% {
        transform: scale(2);
    }
}
```

Cách đầu tiên để viết các **keyframes** là truyền một đối tượng. Mỗi từ khóa trong đối tượng đại diện cho thuộc tính CSS mà chúng ta muốn tạo hiệu ứng động. Giá trị cho mỗi khóa là một mảng các giá trị CSS mà chúng ta muốn tạo hiệu ứng. Mỗi giá trị trong mảng đại diện cho một điểm trong từng khoảng thời gian animation.
```
const growKeyframes = {
    transform: ['none', 'scale(2)']
}
```

Cách thứ hai để viết các **keyframe** là viết nó thành một mảng. Mỗi mục trong mảng đại diện cho một điểm trong từng khoảng thời gian, trong đó chúng ta chỉ định từng thuộc tính CSS và giá trị được áp dụng cho điểm đó.

```
const growKeyframes = [
    { transform: 'none' },
    { transform: 'scale(2)' }
]
```

Theo mặc định, mỗi điểm trên khoảng thời gian là khoảng cách đều nhau. Ví dụ: nếu chúng tôi có 5 điểm trên dòng thời gian, quá trình chuyển đổi aniamtion giữa mỗi điểm sẽ bằng 20% thời lượng animation.
Nếu chúng ta muốn thay đổi thời gian, chúng ta có thể sử dụng thuộc tính **offset** với định dạng thứ hai là viết các **keyframe**. Thuộc tính này chấp nhận một số nằm trong khoảng từ 0 đến 1, đó là animation biểu thị điểm mà tại đó. Lấy ví dụ, hoạt ảnh CSS này
```
@keyframes alteredGrow {
    0% { transform: none; }
    10% { transform: scale(1.5) }
    30% { transform: scale(1.9) }
    100% { transform: scale(2) }
}
```
Để giải thích khoảng cách không đồng đều trong dòng thời gian, chúng ta có thể viết nó theo cách sau
```
const alteredGrowKeyframes = [
    { transform: 'none' },
    { transform: 'scale(1.5)', offset: 0.1 }
    { transform: 'scale(1.9)', offset: 0.3 }
    { transform: 'scale(2)' }
]
```
**options**

Đối số thứ hai chúng ta chuyển tới hàm **animate ()** là một đối tượng có một số tùy chọn. Đối tượng này cho phép chúng ta chỉ định tất cả các thuộc tính mà chúng ta sẽ áp dụng cho thuộc tính CSS đang hoạt ảnh nếu chúng ta đang sử dụng animation CSS. Có 9 tùy chọn chúng ta có thể chỉ định:

| Option | Description |
| - | - |
| id | A unique reference for the animation |
| delay | Specifies a delay before the animation begins. Corresponds to the **animation-delay** CSS property |
| duration | Specifies the amount of time it should take for one cycle. Corresponds to the **animation-duration** CSS property |
| iterations | Specifies how many times to run a cycle of the animation. Corresponds to the **animation-iteration-count** CSS property |
| direction | Specifies in which direction to run through the animation timeline. Corresponds to the **animation-direction** CSS property |
| easing | Specifies how the animation transitions between steps. Corresponds to the **animation-timing-function** CSS property |
| fill | Specifies the values applied to the element and the start and end of the animation. Corresponds to the **animation-fill-mode** CSS property |
| endDelay | Specifies an amount of time to delay after the end of the animation |
| iterationStart | Specifies the point n the iteration the animation should start |

Ví dụ: chúng ta hãy xem  alteredGrow animation. Với animation CSS, chúng tôi có thể áp dụng animation trong 3 giây, trên một vòng lặp vô hạn, các hướng thay thế, sau một khoảng thời gian trễ 2 giây, với các khai báo này

```
.animated-element {
    animation-name: alteredGrow;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-delay: 2s;
}
```
Sử dụng Web animations API , chúng ta có thể thực hiện tương tự với các tùy chọn sau
```
const alteredGrowOptions = {
    duration: 3000,
    iterations: Infinity,
    direction: 'alternate',
    delay: 2000
}
```

**Sử dụng Animation**

Animation được áp dụng cho một phần tử bằng cách gọi hàm **animate ()** trên phần tử và truyền các giá trị keyframes và option.

```
const element = document.querySelector('.animated-element');
element.animate(alteredGrowKeyframes, alteredGrowOptions);
```

Khi chức năng đó được gọi, animation sẽ tự động bắt đầu. Tuy nhiên, chúng ta có thể bắt đầu và dừng nó bằng cách sử dụng các phương thức **play ()** và **pause ()**.

```
const element = document.querySelector('.animated-element');
const myAnimation = element.animate(alteredGrowKeyframes, alteredGrowOptions);

myAnimation.pause();
myAnimation.play();
```
**Support**

![](https://images.viblo.asia/44772cfd-2acd-4245-95f6-a24aa65bcc6b.png)

### VD Animating bitsofcode Logo
Cũng giống như animation CSS của tôi, tôi đã tạo lại một phần ngắn của animaton đầy đủ đã được tạo. Dưới đây là so sánh giữa cả ba phiên bản
{@codepen: https://codepen.io/ire/pen/MmJOzR}

### CSS Animations và the Web Animation API
Như với tất cả mọi thứ, cho dù sử dụng animations CSS hay JavaScript, phụ thuộc rất nhiều vào các chi tiết animations. Theo quy tắc chung, animations CSS nên được sử dụng cho các hoạt ảnh nhỏ liên quan đến giao diện người dùng, chẳng hạn như hiển thị chú giải công cụ. Web Animation API nên được dành riêng cho các hiệu ứng nâng cao hơn cần điều khiển tinh chỉnh. Điều đó nói rằng, đây là so sánh của tôi giữa hai phương pháp cho animation này.
**Performance**
Hiệu suất của animation CSS và JavaScript có thể thay đổi rất nhiều tùy thuộc vào thuộc tính nào chúng ta đang tạo animaton. Nói chung, tôi khuyên bạn chỉ nên tạo các thuộc tính **Transform** hoặc **Opacity**, vì các animation này có thể được thực thi trên một luồng khác nhau của trình duyệt.
> Changing `transform` does not trigger any geometry changes or painting, which is very good. This means that the operation can likely be carried out by the compositor thread with the help of the GPU. [CSS Triggers](https://csstriggers.com/transform)

Vì animation của ta chỉ sử dụng thuộc tính transform nên tôi không thể thấy bất kỳ sự khác biệt đáng kể nào về hiệu năng giữa hai phương thức. Sử dụng DevTools của Firefox, tôi đã đo tốc độ khung hình của cả hai hình động và có tỷ lệ chính xác là 60 FPS, ngay cả khi Off Main Thread Animation đã bật.
Tôi đã không thể tìm thấy nhiều cách để đo hiệu suất giữa hai phiên bản. Nếu bạn biết bất kỳ cách nào tốt hơn, hãy để lại nhận xét bên dưới.

**Developer Experience**
Trong trường hợp này, cá nhân tôi đã tìm thấy animation CSS dễ dàng hơn để làm việc với Web Animation API, chủ yếu là do công việc bổ sung cần thiết để làm cho animation được chạy / tạm dừng bằng cách sử dụng sau này. Nếu tôi đang làm một hoạt hình phức tạp hơn, ví dụ cho một trò chơi, Web Animation API chắc chắn sẽ là con đường để đi. Tuy nhiên, đối với trường hợp này, tôi nghĩ rằng animation CSS đơn giản hơn để triển khai.

___
Nguồn: [bitsofco](https://bitsofco.de/css-animations-vs-the-web-animations-api/)
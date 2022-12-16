## 1. Sticky Footer
Hầu hết các bạn làm về web đều biết đến vấn đề này. Đối với hầu hết các dự án, bạn sẽ muốn một `footer` ở dưới cùng của màn hình, bất kể kích thước của nội dung.

Trước đây, khá là rắc rối và khó khăn khi tạo một `sticky footer` theo đúng nghĩa. Còn ngày nay, với việc xuất hiện của CSS3 và flexbox, mọi việc trở nên dễ dàng hơn rất nhiều. Chúng ta sử dụng thuộc tính flex-grow cho div chứa content của page. Ví dụ:

flex-grow điều khiển xem có bao nhiêu phần tử flex được `fill` vào `container` và liên hệ giữa chúng và các phần tử flex khác. Ở ví dụ dưới, mình sử dụng flex: auto, nó sẽ tự động đặt flex-grow bằng 1 theo mặc định.

Để ngăn chặn mọi hành vi không mong muốn, chúng ta cũng có thể thêm flex-shrink: 0 vào footer. flex-shrink trái ngược hoàn toàn với flex-grow, kiểm soát lượng phần tử flex co lại (shrink) để khớp với container của nó và đặt nó về 0 sẽ ngăn footer co lại - đảm bảo rằng nó vẫn giữ được kích thước.

{@codepen: https://codepen.io/doanh/pen/OqdQMJ}

## 2. Zoom-on-Hover Images

Hiệu ứng phóng to thu nhỏ là một cách tuyệt vời để thu hút sự chú ý vào hình ảnh có thể click. Khi người dùng di chuyển qua nó, hình ảnh sẽ tăng lên một chút, nhưng kích thước của nó vẫn giữ nguyên.

Để đạt được hiệu ứng này, chúng ta cần một div bao bọc xung quanh thẻ img trong HTML.

Để làm cho hiệu ứng này hoạt động, bạn cần đặt chiều rộng và chiều cao của phần tử cha và đảm bảo overflow đặt thành hidden. Sau đó, bạn có thể áp dụng bất kỳ loại hình ảnh động chuyển đổi nào cho hình ảnh bên trong.

{@codepen: https://codepen.io/doanh/pen/WmPMrw}

## 3. Instant Night Mode
Nếu bạn đang tìm kiếm một cách nhanh chóng để áp dụng chế độ ban đêm cho trang web của bạn, hãy thử sử dụng các bộ lọc invert (đảo ngược) và hue-rotate (xoay màu).

- Bộ lọc: invert() theo thang từ 0 đến 1 - trong đó 1 thay đổi màu trắng thành màu đen.
- Bộ lọc: hue-rotation() làm thay đổi nội dung màu của các thành phần của bạn theo cách chúng ít nhiều giữ lại cùng một mức độ tách biệt với nhau. Giá trị của nó nằm trong khoảng từ 0deg đến 360deg.

Bằng cách kết hợp các hiệu ứng này trên thẻ body, bạn có thể nhanh chóng dùng thử night mode của trang web của mình. (Lưu ý rằng, để cập nhật background, bạn phải set cho nó một màu.)

Dưới đây là một ví dụ:
```css
body {
    background: #FFF;
    filter: invert(1) hue-rotate(210deg);
}
```

Sử dụng các cài đặt này, chúng tôi có thể cung cấp cho trang chủ Google Google một sự thay đổi tức thì:
![](https://cdn-images-1.medium.com/max/1600/1*fZIBkkNgo11XZiFhmLumvg.jpeg)

## 4. Custom Bullet Points
To create custom bullet points for an unordered list, you can use the content property, together with the ::before pseudo-element.

In the CSS below, I’m using two classes .complete and .incomplete to distinguish two different types of bullet point.

Để tạo các dấu đầu dòng tùy chỉnh cho một danh sách không có thứ tự, bạn có thể sử dụng thuộc tính content, cùng với phần tử pseudo-element ::.

Trong đoạn CSS bên dưới, mình sử dụng hai class .complete và .incomplete để phân biệt hai loại dấu đầu dòng khác nhau.

```css
ul {
  list-style: none;
}
ul.complete li::before {
  content: '🗹 ';
}
ul.incomplete li::before {
  content: '☐ ';
}
```

{@codepen: https://codepen.io/doanh/pen/LaqQGJ}

5. Parallax Images
Hiệu ứng bắt mắt này ngày càng phổ biến và nó có thể được sử dụng để mang lại sự thú vị cho một trang khi người dùng cuộn qua nó.

Mặc dù hình ảnh bình thường của một trang di chuyển khi người dùng cuộn, parallax image dường như vẫn cố định - chỉ cửa sổ mà nó có thể nhìn thấy di chuyển.

**CSS-only Example**
Thuộc tính bắt buộc phải có cho phiên bản đơn giản nhất của hiệu ứng này là background-attachment: fixed, cố định vị trí hình nền trên nền trong view-port. (Hiệu ứng ngược lại đạt được bằng cách sử dụng background-attachment: scroll).

{@codepen: https://codepen.io/doanh/pen/vPbdLP}

**CSS + JavaScript Example**
Để có hiệu ứng nâng cao hơn, bạn có thể sử dụng JavaScript để thêm chuyển động cho hình ảnh khi người dùng cuộn.
{@codepen: https://codepen.io/doanh/pen/wONyGa}

6. Animation with Cropped Images
Giống như phần chân trang, rất khó để cắt ảnh trước phiên bản CSS3. Bây giờ, chúng ta có hai thuộc tính giúp cắt xén dễ dàng, object-fit và object-position, phép bạn thay đổi kích thước hình ảnh mà không ảnh hưởng đến tỷ lệ khung hình.

Trước đây, luôn có thể cắt hình ảnh của bạn trong trình chỉnh sửa ảnh, nhưng một lợi thế lớn của việc cắt xén chúng trong trình duyệt là khả năng thay đổi kích thước hình ảnh như một phần của hoạt hình.

Ví dụ sau đây kích hoạt hiệu ứng bằng cách sử dụng thẻ <input type="checkbox">. Bằng cách đó, chúng ta có thể tận dụng pseudo-class :checked và chúng ta không cần sử dụng bất kỳ đoạn code JavaScript nào:

{@codepen: https://codepen.io/doanh/pen/jJdZqM}


7. Blend Modes
Nếu bạn có kinh nghiệm sử dụng Photoshop, bạn có thể biết các chế độ blend khác nhau của nó có thể mạnh đến mức nào để tạo ra các hiệu ứng thú vị. Nhưng bạn có biết rằng hầu hết các chế độ hòa trộn (blend) trong Photoshop cũng có sẵn trong CSS không?

Ở đây, trang chủ của Medium trông như thế nào khi background-color của các hình ảnh là lightblue và blend-mode khác biệt:
![](https://cdn-images-1.medium.com/max/1600/1*0tW3PYLlt0PytC3XGlC25w.png)

Thêm vào đó, backgrounds là cách duy nhất bạn có thể tận dụng các blend-mode. Thuộc tính mix-blend-mode cho phép bạn trộn các phần tử với background hiện có của chúng. Vì vậy, ví dụ, bạn có thể tạo các hiệu ứng như thế này, bằng cách sử dụng mix-blend-mode của color-dodge và background của lightalmon.

![](https://cdn-images-1.medium.com/max/1600/1*N1hQszg6o3H_tNWA18yn9Q.png)
Trước CSS3, thật khó để tin rằng các trang web có thể trông như thế này!

{@codepen: https://codepen.io/doanh/pen/aMXqNG}

8. Pinterest-style Image Board

CSS Grid và Flexbox đã giúp chúng ta dễ dàng tạo được nhiều loại bố cục đáp khác nhau và cho phép chúng ta dễ dàng căn giữa các yếu tố theo chiều dọc trên một trang - điều này rất khó khăn trước đây.

Tuy nhiên, một kiểu bố cục khá đặc biện được sử dụng bởi Pinterest, trong đó vị trí dọc của từng thành phần thay đổi dựa trên chiều cao của phần tử phía trên nó.
![](https://cdn-images-1.medium.com/max/1600/1*dcMN4fUddq6KWlXmIUYISA.png)

Cách tốt nhất để đạt được điều này là sử dụng thuộc tính column. Chúng thường được sử dụng nhất để tạo nhiều cột văn bản theo kiểu báo, nhưng đây là một trường hợp sử dụng tuyệt vời khác.

Để làm việc này, bạn cần wrap các phần tử của mình trong một div và cung cấp cho wrapper một thuộc tính column-width và column-gap.

Sau đó, để ngăn chặn bất kỳ phần tử nào được phân chia giữa hai cột, thêm thuộc tính column-break-inside: avoid cho các phần tử riêng lẻ.

{@codepen: https://codepen.io/doanh/pen/dradMw}
# Sử dụng CSS
Đây là cách mình vẫn thường dùng, để tạo ra animation bạn chỉ cần sử dụng css để thay đổi thuộc tính của phần tử kết hợp với thuộc tính **transition**. Nó có thể giúp mình thực hiện hầu hết các animation cần thiết như fadeIn, fadeOut, slideIn, slideOut,...... Sử dụng CSS chỉ gặp khó khăn khi animation của bạn quá phức tạp, kết hợp nhiều bước hoặc cần tính toán dựa trên tương tác của người dùng. Tuy nhiên việc kết hợp nó với ReactJS giúp cho cách sử dụng này mạnh mẽ hơn rất nhiều.

Bên duới là một ví dụ đơn giản theo dạng bật tắt và cách mà bạn có thể từ ví dụ này tạo ra các animation của riêng bạn:

![](https://images.viblo.asia/ed12eb98-371a-4596-ab15-f9f945d77c48.gif)

Một animation đơn giản, khi bạn bấm vào icon tìm kiếm, ô input sẽ hiện ra từ trái qua phải. Bạn có thể xem đoạn code bên dưới để biết cách mình đã làm:
![](https://images.viblo.asia/bb1c85a6-daf3-4d7e-9720-e3b852833d63.png)

Ở thẻ Input khi click vào Icon, biến on sẽ thay đổi. Nếu là true thì sẽ thêm class show vào thẻ Input.

![](https://images.viblo.asia/e186e708-cff0-4283-954c-79172f76082c.png)

Bạn có thể để ý thấy ban đầu Input chỉ có with là 0px sau khi thêm class show nó sẽ là 150px, kết hợp với thuộc tính transition để tạo hiệu ứng bạn đã có một animation nhìn như của Medium ^^

Nếu bạn chưa biết vầ thuộc tính **transition** thì đây là một thuộc tính chỉ ra khi bạn thay đổi một thuộc tính CSS thì sẽ có thay đổi trong bao lâu và khi nào thay đổi. Cú pháp của nó là:

![](https://images.viblo.asia/984b03b3-cd5a-4224-b5a2-1e40fb1618d1.png)

Trong ví dụ của mình thì **all** để chỉ  hiệu ứng sẽ diễn ra ở tất cả các thuộc tính, bạn cũng có thể chỉ định thuộc tính cụ thể như width, height, transform, opacity,....... **1s** là khoảng thời gian diễn hiệu ứng. Còn **ease** là timing-function, nó sẽ mô tả cách mà transition sẽ phát triển như thế nào theo thời gian. Ví dụ **ease** nghĩa là bạn sẽ bắt đầu hiệu ứng chậm, rồi nhanh, và lại kết thúc chậm.

Bạn có thể tìm hiểu thêm về **transition** tại đây https://www.w3schools.com/css/css3_transitions.asp

Cách mà bạn có thể làm các animation theo giống như này:

1. Xác định hành động tạo ra animation.
2. Phần tử nào của bạn sẽ thay đổi.
3. Phần tử đó sẽ thay đổi như nào.

Trong ví dụ của mình việc người dùng click Icon là hành động tạo ra animation, ngoài ra còn có thể là khi người dùng vừa load trang, gõ bàn phím, cuộn chuột,.... Phần tử thay đổi là ô Input, trong ví dụ của mình thì chỉ đơn giản là ô Input nhưng bạn hoàn toàn có thể tạo ra thay đổi trên nhiều phần tử khác nhau cùng lúc, với ReactJS thì việc này lại khá đơn giản. 

Mình đã thay đổi with của ô Input từ 0px đến 150px. Đây là cách mình thay đổi phần tử. Ngoài ra bạn có thể tìm các thuộc tính CSS mà transition có thể tác động được ở đây https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties

Bạn có thể tự mình làm các ví dụ để hiểu hơn, kết hợp các animation theo ý thích của mình. Việc thực hành từ các ví dụ nhỏ sẽ giúp bạn rất nhiều nếu muốn làm các animation phức tạp và đẹp như trên mạng :)

Bên dưới là một ví dụ khác mình sử dụng thuộc tính **animation** trong CSS:

![](https://images.viblo.asia/effb49d2-45ca-4a2e-a7d5-ba1722ab6293.gif)


# Hook animate
Khi gặp một số tình huống mà không thể thay đổi được CSS (ví dụ khi muốn cuộn chuột mượt mà) , hoặc cần căn chỉnh thời gian thì mình dùng cách này. Đây chỉ là hook mình tự viết, có khá nhiều thư viện khác sẽ có chức năng tương tự.

![](https://images.viblo.asia/1ea57251-ae2c-43b8-a961-157da1504b03.png)

Hook nhận vào 2 tham số là:
* Duration: Khoảng thời gian diễn ra hiệu ứng.
* Process: Hàm này sẽ giống như timing-function ở trên, bạn có thể tìm hiểu về [đường cong bezier](https://vi.wikipedia.org/wiki/%C4%90%C6%B0%E1%BB%9Dng_cong_B%C3%A9zier), và thư viện [bezier-easing](https://github.com/gre/bezier-easing)

Nó sẽ trả về 3 giá trị:
* Time: khoảng thời gian hiệu ứng đã diễn ra.
* Fraction: Tỷ lệ giữa thời gian đã điễn ra và toàn bộ khoảng thời gian diễn ra hiệu ứng **(time / duration)**.
* Start: Gọi hàm này sẽ bắt đầu chạy hiệu ứng.

Thật ra thì tuỳ cách sử dụng mà mình sẽ sửa nó cho phù hợp :D

# Clone một UI Animation trên Pinterest
Đây là một hiệu ứng khá đẹp mắt mà mình thấy trên Pinterest. Thấy nó đẹp nên cũng tìm cách làm thử nhưng không được xịn sò bằng ^^

**Hàng thật**

![](https://images.viblo.asia/57250b92-ee66-4ee6-872a-cc276a3d6f82.gif)

Link trên Pinterest: https://www.pinterest.com/pin/843158361471238865/

**Hàng tự làm**

![](https://images.viblo.asia/38cbc93c-55df-461e-adee-f78f637ec089.gif)

Link trên CodeSandBox: https://codesandbox.io/s/nifty-montalcini-rsu5m

Mình có sử dụng thư viện https://www.react-spring.io/ để căn chỉnh thời gian. Đây là một thư viện khá nổi tiếng và cung cấp nhiều function tiện ích mà bạn cũng có thể sử dụng...

# Tổng kết
Bài viết là các cách làm của mình khi muốn tạo ra một animation trên ReactJS. Hy vọng có thể giúp đỡ các bạn khi cần làm việc với Animation. :D
[Blog của mình](https://hungkieu.dev/posts/cac-minh-tao-animation-reactjs)
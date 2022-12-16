Khi làm về UI, giải pháp nào cho khoảng cách đều nhau giữa các phần tử, cũng như là các phần tử luôn cao bằng nhau dù content thay đổi ?

**Vấn đề 1:** Để các cột cao bằng nhau thì trong Flexbox khi dùng `display: flex` thì giá trị mặc định `flex-direction: row` và `align-items: stretch`, giá trị **stretch** làm các phần tử con trực tiếp của thẻ cha dùng display: flex luôn cao bằng nhau. Lưu ý là theo flex-direction: row và flex-wrap: nowrap, nếu dùng wrap thì một phần tử rớt xuống tạo thành hàng mới và nó sẽ so sánh với các phần tử cùng hàng với nó mà thôi, dù nó cao thế nào thì cũng không ảnh hưởng tới chiều cao của các phần tử hàng khác.

**Vấn đề 2:** Khi chia layout với chỉ 3 phần tử như hình thì dùng `justify-content: space-between` sau đó xác định khoảng cách giữa mỗi phần tử, ở đây ta có 30px, chúng ta có 3 cột từ đó khoảng cách ở giữa sẽ là **30×2 = 60px** sau đó chia cho 3 cột = **20px**. Từ đó ta có thể CSS độ rộng của các phần tử là` width: calc(33.333% - 20px)` kết quả ra sẽ chính xác như Design.

![](https://images.viblo.asia/5792fbd4-c87c-4445-9664-ad86f2450105.png)

**Vấn đề 3:** Cũng layout như trên nhưng chỉ có 5 phần tử, khi dùng `space-between`, có `flex-wrap: wrap` thì phần tử số 4 và 5 sẽ xuống hàng, tuy nhiên phần tử số 5 sẽ nằm về cuối làm xấu layout. Giải pháp là để giá trị `justify-content` về mặc định là flex-start, tuy nhiên các phần tử sẽ dính nhau.

Từ đây ta có giải pháp khác đó là chúng ta đã biết khoảng cách giữa các phần tử là **30px**, suy ra mỗi bên của phần tử sẽ chiếm **15px** khoảng trống, ta có thể dùng **margin: 0 15px** cho các phần tử đó, kết hợp với `width: calc(33.333% - 30px)`, **-30px** vì khi dùng margin hai bên 15px nó đẩy ra. Nhưng phần tử đầu sẽ bị bóp vào do margin-left cũng như margin-right với phần tử cuối, từ đây ta có thể CSS cho class cha margin số âm là `margin: 0 -15px` để đẩy ra lại, cái này khá quen nếu các bạn dùng Bootstrap trong các class về column hay dùng cái này.

Nếu các bạn muốn tối ưu hơn nữa dễ dàng scalable hơn thì các bạn có thể dùng biến trong CSS với một biến như là `--gutter: 15px` chẳng hạn thì lúc này code của các phần tử con ví dụ là image__item đi ha sẽ là `width: calc(33.33% - calc(var(--gutter) * 2)); margin: 0 var(--gutter);` và phần tử cha ví dụ là image__list sẽ là `margin: 0 calc(-1 * var(--gutter));`  lúc này giả dụ các bạn muốn khoảng cách giữa chúng là 60px đi thì các bạn chỉ cần thay đổi giá trị ở --gutter thành 30px thay vì 15px là ngon lành cành đào luôn.

Trên đây là vài tips tricks của bản thân mình hi vọng sẽ giúp ích cho các bạn. Chúc các bạn học tập tốt, nâng cao trình độ.
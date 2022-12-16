**Giới thiệu:**

![](https://images.viblo.asia/cedc6c80-530f-49f1-a13a-68e441ca111e.jpg)

Khi ứng dụng web ngày càng trở nên phức tạp hơn, chúng ta cần có cách tự nhiên hơn nữa để dễ dàng thực hiện layout cao cấp. Và như vậy, với CSS Grid Layout, chúng ta sẽ có một giải pháp mới để tạo layout, nhanh và hiệu quả hơn nữa.

Trong bài giới thiệu này, chúng ta sẽ được làm quen với tính năng CSS còn khá mới này, tìm hiểu các dạng trình duyệt được hỗ trợ, kèm theo một số ví dụ về cách hoạt động của chúng.

**CSS Grid Layout là gì?**

Ý tưởng chính đằng sau Grid Layout là chia web page thành nhiều cột và hàng, cùng với khả năng chỉ định vị trí và kích thước của các building block element dựa trên kích thước, vị trí, và layer của hàng và cột ta đã tạo.

Lưới ô cũng mang đến cách thức thay đổi vị trí của phần tử rất dễ dàng với chỉ CSS mà không thay đổi đến HTML. Phương thức mới này có thể được sử dụng với media query để thay đổi layout tại các breakpoint khác.

**Hỗ trợ trình duyệt**

Trước khi tìm hiểu sâu về Grid Layout, các bạn hãy xem thử trình duyệt của mình có được hỗ trợ hay không, và cách kích hoạt tính này trên các trình duyệt hiện nay.

![](https://images.viblo.asia/be9e0b3f-7dab-4491-b6a2-81f7c3dfe0b5.png)

**Chrome và Firefox**

Tin vui là từ tháng ba năm 2017 cả trình duyệt Chrome và Firefox đều mặc định kích hoạt sẵn CSS Grid Layout.

Bởi vậy, chúng tôi khuyến khích sử dụng Chrome hoặc Firefox với các ví dụ trong bài viết này.

**Internet Explorer**

Một trong những môi trường đầu tiên cho Grid Layout được phát triển bởi Microsoft, và IE10 bắt đầu xuất hiện tiền tố -ms. Nếu bạn nhìn qua support on Can I Use, bạn có thể thấy rằng cả IE11 và Edge cũng có hỗ trợ Grid Layout.

**Opera**

Để kích hoạt Grid Layout trong Opera, hãy điều hướng đến chrome://flags hoặc opera://flags (cả hai đều hiệu quả với Opera) bằng thanh địa chỉ của trình duyệt, và tìm đến flag Enable experimental Web Platform features. Sau khi đã kích hoạt, bạn sẽ được yêu cầu phải relauch trình duyệt.

![](https://images.viblo.asia/56973c0e-1ae4-4273-afd1-83e4ff06e83f.png)

**Grid Layout Polyfill**

Polyfill cũng mang đến lựa chọn tích hợp Grid Module cho nhiều trình duyệt hiện nay.

**Thiết lập một Grid**

Grid cho phép chúng ta sắp xếp các thành phần trong một trang web, tuỳ thuộc vào các khu vực được tạo ra bởi các chỉ dẫn.

**Thuật ngữ**

Nói một cách đơn giản nhất những chỉ dẫn này, hoặc các grid line, định khung ngang và dọc các grid track. Các grid track đóng vai trò như là các dòng và các cột, với các gutter (khoảng không gian giữa các dòng hay cột) chạy giữa chúng. Nơi mà các grid track ngang và dọc giao nhau, chúng ta có các cell (ô), rất giống với việc chúng ta sử dụng các table (bảng). Đây là những thuật ngữ quan trọng cần phải hiểu.

Trong hình bên dưới bạn sẽ thấy một grid minh hoạ, diễn tả:

1. Các grid line
1. Các cột
1. Các dòng
1. Các ô

![](https://images.viblo.asia/c8deff97-4d1c-4801-99a6-95edbf0ae443.png)

Đối với một bố cục đồ hoạ, nó có thể trông quen hơn nếu chúng ta sử dụng grid hoàn toàn giống nhau, nhưng bỏ qua vài track để tạo ra các gutter giữa các khu vực nội dung.

1. Các gutter

![](https://images.viblo.asia/7622e184-df4d-4aca-adce-ba4ea3282332.png)

Có một thuật ngữ cuối cùng chúng ta cần phải làm rõ trước khi tìm hiểu phần tiếp theo:

1. Grid area

![](https://images.viblo.asia/56616128-e6c1-4d6b-9f15-a36d94a60748.png)

Một grid area là bất kỳ phần nào của grid của chúng ta được bao lại bởi bốn grid line; nó có thể bao gồm bất kỳ số ô.

Đã đến lúc xây dựng grid này trên trình duyệt rồi! Hãy bắt đầu bằng một vài thẻ đánh dấu.

**Thẻ đánh dấu Grid**

Để tạo một grid như trên, chúng ta cần có một container (kho chứa) các phần tử; bất kỳ thứ gì mà bạn thích:

```
<section class="grid-1">
 
</section>
```

Trong đó chúng ta sẽ đặt 9 phần tử con.

```
<section class="grid-1">
  <div class="item-1">1</div>
  <div class="item-2">2</div>
  <div class="item-3">3</div>
  <div class="item-4">4</div>
  <div class="item-5">5</div>
  <div class="item-6">6</div>
  <div class="item-7">7</div>
  <div class="item-8">8</div>
  <div class="item-9">9</div>
</section>
```

Các luật Grid

Trước nhất chúng ta cần định nghĩa rằng phần tử container của chúng ta là một grid bằng cách sử dụng một giá trị mới cho thuộc tính display:

```
.grid-1 {
  display: grid;
}
```

Chính xác, thật là dễ. Tiếp theo chúng ta cần định nghĩa grid của chúng ta, bằng cách đặt bao nhiêu grid track mà nó sẽ có, cả chiều ngang và chiều dọc. Chúng ta làm điều đó bằng các thuộc tính grid-template-columns và grid-template-rows:

```
.grid-1 {
  display: grid;
  grid-template-columns: 150px 20px 150px 20px 150px;
  grid-template-rows: auto 20px auto 20px auto;
}
```

Bạn sẽ lưu ý 5 giá trị cho mỗi cái. Các giá trị cho grid-template-columns xác định rằng "cột đầu tiên nên rộng 150px, cái thứ hai rộng 20px, thứ ba rộng 150px", và cứ như thế xuyên suốt năm cột, nhiều hay ít hơn tuỳ thuộc vào hình lá cờ Phần Lan. Năm giá trị cho grid-template-rows xác định một số thứ tương tự. Mỗi cái sẽ mặc định là auto, lấy chiều cao từ nội dung, nhưng chúng ta muốn chính xác hơn với các gutter của chúng ta, cho chúng cao 20px, do đó chúng ta cần liệt kê tất cả năm dòng.

Mỗi phần tử của chúng ta đã được thiết tự động một grid area theo thứ tự thời gian. Không tệ, nhưng chuyện gì đã xảy ra với phần tử 2, 4, và 7? Chúng đã rơi vào trong các gutter dọc, bởi vì các gutter của chúng ta là các grid track hoàn toàn hợp quy luật và đó là nơi mà grid layout sẽ cho rằng chúng thuộc về nếu chúng ta không cụ thể hơn. Đến lúc thêm vài luật vào các phần tử của chúng ta.

**Các luật của phần tử**

Cú pháp khả dụng đối với chúng ta ở thời điểm hiện tại có thể khá phức tạp, nhưng chúng ta sẽ làm mọi thứ dễ dàng có thể bằng cách sử dụng một thuộc tính rút gọn. Chúng ta sẽ bắt đầu với phần tử đầu tiên của chúng ta, giả sử rằng chúng ta muốn nó bắt đầu tại grid-column 1 và grid-row 1:

```
.item-1 {
  grid-column: 1;
  grid-row: 1;
}
```

Phần tử của chúng ta sẽ tự động lấp đầy khoảng không còn lại giữa các grid line. Phần tử thứ hai thì ít rõ ràng hơn. Chúng ta cũng muốn cái này bắt đầu trong grid-row 1, nhưng chúng ta muốn nó bỏ qua grid-column 2 và thay vào đó bắt đầu trong grid-column 3. Cột 2 sẽ được để rỗng để thành gutter của chúng ta.

```
.item-2 {
  grid-column: 3;
  grid-row: 1;
}
```

Chúng ta tiếp tục giống như cái này, bỏ qua các cột và các dòng gutter của chúng ta, cuối cùng kết thúc với mục thứ 9 của chúng ta.

```
.item-9 {
  grid-column: 5;
  grid-row: 5;
}
```

**Kết luận**

Vậy đó, bạn đã tìm hiểu và làm quen với Grid! Hãy tóm tắt lại 4 bước cơ bản:

1. Tạo một thành phần container, và định nghĩa nó là display: grid;.
1. Sử dụng container đó để định nghĩa các grid track sử dụng các thuộc tính grid-template-columns và grid-template-rows.
1. Đặt các thành phần con bên trong container.
1. Thiết lập nơi mà mỗi phần tử con thuộc về trong grid bằng cách định nghĩa grid-column và grid-row của nó.

Hy vọng bài viết này sẽ giúp ích rất nhiều cho các bạn trong việc thiết kế bố cục layout của 1 trang web.

**Tham khảo:**

https://webdesign.tutsplus.com/vi/tutorials/css-grid-layout-quick-start-guide--cms-27238

https://developer.mozilla.org/vi/docs/Web/CSS/CSS_Grid_Layout/tong_quan_ve_grid_layout

https://techtalk.vn/gioi-thieu-ve-css-grid-layout-module.html
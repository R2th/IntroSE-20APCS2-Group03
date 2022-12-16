![](https://images.viblo.asia/1f40d3c0-a78e-43ea-8f07-70860d63b9c2.jpg)


Html và Css luôn luôn phát triển theo theo gian, và theo sự phát triển đó thì nó cũng cung cấp cho các Frontend & Web Designer rất nhiều những tính năng mới.

### Native < dialog >

Thẻ <dialog>  được phát hành trong phiên bản Html 5.2 trong năm 2017, phần tử <dialog> cung cấp khả năng tạo các hộp thoại riêng trong Html thuần túy.
Kể từ tháng 1 năm 2018, <dialog> chỉ hoạt động trong Chrome/ Chrome dành cho thiết bị di động.

```
<dialog>  
  <h2>Your title</h2>
  <p>Your content...</p>
</dialog>
```

### CSS scroll snap points

Css Scroll Snap là một module CSS gần đây được giới thiệu, nó được mô tả là sẽ bắt được vị trí chuột scroll để có thể style cho nó.
Nó giúp chúng ta có thể xác định được một vị trí cụ thể trong 1 block sau khi thao tác scroll hoàn tất.
Tính năng này vẫn còn đang trong trong giai đoạn phát triển và chưa được triên khai trên bất cứ một trình duyệt nào.

Code nó sẽ có thể như này:

CSS

```
img {
    /* Specifies that the center of each photo
       should align with the center of the scroll
       container in the X axis when snapping */
    scroll-snap-align: center none;
}
.photoGallery {
    width: 500px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    /* Requires that the scroll position always be
       at a snap position when the scrolling
       operation completes. */
    scroll-snap-type: x mandatory;
}
```

HTML

```
<div class="photoGallery">
    <img src="img1.jpg">
    <img src="img2.jpg">
    <img src="img3.jpg">
    <img src="img4.jpg">
    <img src="img5.jpg">
</div>
```

### Inline CSS in < body >
    
Trong document của Html 5.2, thẻ <style> có thể được thêm vào ngay trong body. Nó không phải là một tính năng mới thú vị nhất, hay ho nhất, thậm chí cũng đã được sử dụng khá nhiều rồi, nhưng mình vẫn muốn đưa ra ở đây vì việc đưa thẻ <style> vào ngay sau block cần style trong Html đôi khi sẽ giải quyết được vấn đề theo cách đơn giản nhất.
    
```
   <body>  
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <style>
        p { color: #069; }
    </style>
    <p>Vestibulum interdum pellentesque massa</p>
</body> 
```
    
### Variables

Các bộ tiền xử lý CSS như là Sass, Scss, hay là less giúp chúng ta sử dụng được biến để compile ra css trong suốt một khoảng thời gian dài, nó làm cho việc code css trở nên đỡ nhàm chán hơn, gọn gàng hơn. Tuy nhiên, trong Css hiện nay cũng đã cung cấp cho chúng ta các native variables, ý tưởng này thật tuyệt vời, cho các dự án nhỏ, ko cần tới preprocessors Css thì chúng ta có thể quất luôn mấy cái native variables này.
Các native variables của CSS được hỗ trợ rất tốt và hầu như là hoạt động hoàn hảo trên tất cả các trình duyệt hiện nay.

```
:root {
--main-color: #069; // Định nghĩa biến ở đây, ở dưới chỉ việc dùng lại
}

h1, h2, h3 { color: var(--main-color); }  
a { color: var(--main-color); text-decoration:underline } 
```

### Support queries

Trong quá trình làm việc vs CSS của tôi thì vấn đề tương thích vs các trình duyệt luôn là vấn đề đau đầu nhất. Với các tính năng mới của Css đoi kho tôi phải cân đo đong đếm khá nhiều khi muốn sử dụng nó, vì thực sự nó mang lại cho người dung trải nghiệm khá là tốt.
Tính năng @supports tương đối mới, cung cấp cho developer có thể kiểm tra xem, cái trình duyệt đang tải trang đó nó có hỗ trợ thuộc tính họ khai báo ko, nếu có thì áp dụng style với feature mới mà ta khai báo trong @support cho nó.
Ví dụ: 

```
@supports (mix-blend-mode: overlay) {
  .example {
    mix-blend-mode: overlay;
  }
}
```
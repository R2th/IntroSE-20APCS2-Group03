## Mở đầu

CSS tiến triển rất nhanh, hơn rất nhiều so với trước đây về việc triển khai các tính năng của Nền tảng web và bài đăng này là một tổng hợp tin tức về các tính năng CSS mới đang tiến vào nền tảng này. 
Nếu bạn là người không thích đọc và làm những điều mới mẻ thì có lẽ đây không phải là bài viết mà bạn nên đọc. Nếu bạn là người thích khám phá sử dụng những tính năng mới, đây chính là bài viết dành cho bạn !

## Flexbox Gaps

Trong CSS Grid, chúng ta có thể sử dụng các thuộc tính gap, column-gap và row-gap để xác định khoảng cách giữa các hàng và cột hoặc cả hai cùng một lúc. Tính năng Multi-column cũng xuất hiện trong layout nhiều cột để tạo khoảng cách giữa các cột.

Mặc dù bạn có thể sử dụng margins để tạo khoảng trống cho các mục trong grid, nhưng điều thú vị về tính năng gap là bạn chỉ nhận được gaps giữa các item; bạn không có thêm không gian để tính ở đầu và cuối của grid. Thêm margins thường là cách chúng ta tạo khoảng trống giữa các flex item. Để tạo khoảng trống thông thường giữa các flex item, chúng ta sử dụng một margin. Nếu chúng ta không muốn có một margin ở đầu và cuối, chúng ta phải sử dụng negative margin trên container để loại bỏ nó.

Sẽ rất tuyệt nếu có cả tính năng gaps đó trong Flexbox, phải không? Tin tốt là chúng tôi đã có - tính năng này đã được triển khai trên Firefox và ở phiên bản Beta của Chrome.

Trong CodePen tiếp theo, bạn có thể thấy cả ba tùy chọn: 
* Đầu tiên là các flex item sử dụng margin ở mỗi bên. Điều này tạo ra một khoảng trống ở đầu và cuối của flex container. 
* Cách thứ hai sử dụng một margins trên flex container để kéo margin đó ra bên ngoài border.
* Cách thứ ba có margin hoàn toàn và thay vào đó sử dụng *gap: 20px,* tạo ra khoảng cách giữa các mục nhưng không phải ở cạnh đầu và cuối.

{@codepen: https://codepen.io/oBuiThiHuyen/pen/KKzayeG}

## Aspect Ratio Unit

Một số thứ có tỷ lệ khung hình mà chúng ta muốn giữ nguyên, ví dụ như hình ảnh hoặc video. Nếu bạn đặt một image hoặc video trực tiếp trên trang bằng cách sử dụng thẻ HTML img hoặc video, thì nó sẽ giữ nguyên tỷ lệ khung hình mà nó có (trừ khi bạn buộc phải thay đổi width hoặc height).  Tuy nhiên đôi khi chúng ta muốn tăng tỉ lệ, ví dụ div có *w* và *h*  là 50-50px tôi muốn nó thay đổi là 100-100px nhưng chỉ được thay đổi chiều rộng mà không được thay đổi chiều cao. Hay nói cách khác, bất kể width là bao nhiêu, hãy làm height của nó bằng với width.

Cách chúng ta hiện đang đối phó với điều này là bằng cách **hack padding**. Điều này sử dụng thực tế là phần đệm theo hướng khối được sao chép từ hướng nội dòng khi chúng ta sử dụng tỷ lệ %. Đó không phải là một giải pháp tốt cho vấn đề, nhưng nó hoạt động.

```
.item {
  width: 100px;
}

.item::after {
  content: '';
  display: block;
  padding-top: 100%;
}
```

Và thuộc tính aspect-ratio ra đời để giải quyết vấn đề này.

```
.item {
  width: 100px;
  aspect-ratio: 1 / 1;
}
```

Tôi đã tạo grid layout và đặt các flex item của mình để sử dụng tỷ lệ 1/1. Chiều rộng của các item được xác định bởi grid column track size (như là flexible). Height sau đó được coppy từ đó để tạo thành hình vuông. Chỉ cho vui thôi, sau đó tôi xoay các item.

![](https://images.viblo.asia/1444e896-4187-4a51-a178-7efbc782f85c.png)

Bạn có thể xem qua bản demo và xem các item vẫn vuông như thế nào ngay cả khi chúng to lên và thu nhỏ, do kích thước khối đang sử dụng tỷ lệ 1/1 của inline size.

{@codepen: https://codepen.io/oBuiThiHuyen/pen/XWdpzGr} 

## Native Masonry

![](https://images.viblo.asia/f4575ed3-99c1-436a-8b50-f75271c64293.png)

Nó được gọi là Masonry layout. Với CSS đơn thuần, sẽ rất khó để bạn có thể dựng được layout như vầy, nhưng không hẳn là không thể, chỉ là bạn sẽ mất khá nhiều công sức thôi, bạn tham khảo các cách sau:

Phân trang web ra hẳn 3 column, rồi tính toán để phân chia các tấm ảnh vào từng column
Tính toán trước ở backend (hoặc hardcode) kích thước các tấm ảnh theo một quy tắc của bạn. Sau đó sử dụng position absolute + một tí javascript
Tự viết javascript thuần để tính toán và sắp xếp các tấm ảnh
Sử dụng thư viện hỗ trợ như https://masonry.desandro.com/
Với sự ra đời của CSS Grid, việc tạo Masonry layout đã đơn giản hơn, tuy nhiên nó cũng không phải là giải pháp "native". Bản chất CSS Grid là để tạo grid, chứ không phải tạo ra Masonry layout.

Tuy nhiên, team Firefox đang thử nghiệm tính năng tạo Masonry layout chính thức với CSS Grid. Bạn có thể thử nghiệm với Firefox Nightly, bật cờ layout.css.grid-template-masonry-value.enabled lên.

{@codepen: https://codepen.io/oBuiThiHuyen/pen/MWyJORd}

## ::marker
![](https://images.viblo.asia/cbb89ff8-7470-42b9-8999-889039c4e7d3.png)

Nếu dùng color, bạn sẽ đổi màu cho cả marker và text bên trong.

Có rất nhiều trick để làm được việc đó như tạo marker giả với ::before chẳng hạn. Hoặc dùng icon và cho position: absolute

Giờ đây bạn có thể style cho marker dễ dàng hơn với ::marker

```
li::marker {
  color: blue;
}

li:last-child::marker {
  content: "😋";
}
```

![](https://images.viblo.asia/728cb617-b1a0-4c49-a68a-9685831d782f.png)

Hỗ trợ cho :: marker đã có trên Firefox và hiện cũng có thể được tìm thấy trong Chrome Beta.

Ngoài việc tạo kiểu dấu đầu dòng trên list, thực tế bạn có thể sử dụng :: marker trên các phần tử khác. Trong ví dụ bên trên, tôi có một tiêu đề đã được hiển thị: list-item và do đó có một điểm đánh dấu mà tôi đã thay thế bằng một biểu tượng cảm xúc.


## Prefers-reduced-data

Chưa được triển khai trong bất kỳ trình duyệt nào - nhưng có một lỗi được liệt kê cho Chrome có hoạt động gần đây - là tính năng media *prefers-rednced-data*. Điều này sẽ cho phép CSS kiểm tra xem khách truy cập đã bật tính năng lưu dữ liệu trong thiết bị của họ hay chưa và điều chỉnh trang web cho phù hợp. Ví dụ: bạn có thể chọn tránh tải các hình ảnh lớn.

```
@media (prefers-reduced-data: reduce) {
  .image {
    background-image: url("images/placeholder.jpg");
  }
}
```

Tính năng media *prefers-rednced-data* hoạt động theo cách giống như một số tính năng media tùy chọn người dùng đã được triển khai trong Level 5 Media Queries Specification. Ví dụ: các tính năng media *prefers-rednced-motion* và *prefers-color-scheme* cho phép bạn kiểm tra xem liệu khách truy cập có yêu cầu giảm chuyển động hoặc chế độ tối trong hệ điều hành của họ hay không và điều chỉnh CSS của bạn cho phù hợp.

## Subgrid

Chúng ta đã hỗ trợ giá trị subgrid củagrid-template-columns và grid-template-rows trong Firefox trong một thời gian. Sử dụng giá trị này có nghĩa là bạn có thể kế thừa kích thước và số lượng bản nhạc từ  parent grid xuống thông qua child grids. Về cơ bản, miễn là grid item có display: grid, nó có thể kế thừa các tuyến đường mà nó bao gồm thay vì tạo các new column hoặc row tracks.

Tính năng này có thể được thử nghiệm trên Firefox và tôi có rất nhiều ví dụ để bạn có thể thử nghiệm. trong bài viết [Digging Into The Display Property: Grids All The Way Down](https://www.smashingmagazine.com/2019/05/display-grid-subgrid/) giải thích cách subgrid khác với các grid lồng nhau, và[ CSS Grid Level 2: Here Comes Subgrid](https://www.smashingmagazine.com/2018/07/css-grid-2/) giới thiệu đặc điểm kỹ thuật. Tôi cũng có một tập hợp các ví dụ được chia nhỏ tại [Grid by Example](https://gridbyexample.com/examples/#css-grid-level-2-examples)

Tuy nhiên, câu hỏi đầu tiên mà mọi người đặt ra khi tôi nói về subgrid là “Khi nào nó sẽ khả dụng trong Chrome?” Tôi vẫn chưa thể cho bạn biết khi nào, nhưng một số tin tốt đang đến gần. Vào ngày 18 tháng 6 trong một bài đăng trên blog Chromium, người ta đã thông báo rằng nhóm Microsoft Edge (hiện đang làm việc trên Chromium) đang làm việc để hoàn thiện lại Grid Layou thành công cụ LayoutNG, tức là công cụ layout thế hệ tiếp theo của Chromium. Một phần của công việc này cũng sẽ liên quan đến hỗ trợ thêm subgrid.

Tuy nhiên, việc thêm các tính năng vào trình duyệt không phải là một quá trình nhanh chóng, tuy nhiên, ngay từ đầu, nhóm Microsoft đã mang đến cho chúng ta Grid Layout - cùng với việc triển khai tiền tố ban đầu trong IE10. Vì vậy, đây là một tin tuyệt vời và tôi mong muốn có thể kiểm tra việc triển khai khi nó xuất hiện trong bản Beta.


Tham khảo tại: https://www.smashingmagazine.com/2020/07/css-news-july-2020/
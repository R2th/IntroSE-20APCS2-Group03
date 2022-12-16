Học những trick CSS mới là cách tốt nhất để cải thiện website của bạn. Nếu bạn đã làm việc với web một thời gian, bạn có thể cảm thấy bạn luôn code hoặc thiết kế theo một các bố cục. Có nhiều Trend đã đến và đi suốt thời gian qua nhưng phần lớn các trang web đều trông giống nhau - sử dụng lưới 12 cột, bố cục hình hộp hai và ba cột và hình dạng tương tự. Điều đó không chỉ gây nhàm chán khi nhìn, mà trải nghiệm người dùng cũng không phải là tuyệt vời nhất.
Trong bài viết hôm nay mình sẽ chia sẻ một số tips về CSS sẽ giúp bạn phá vớ khuôn mẫu trong bố cục web chỉ với một vài dòng lệnh.

# 1. Khám phá các chế độ blend CSS
Hình ảnh duotone và hiệu ứng colouriser là một số xu hướng thiết kế web đáng chú ý nhất. Chúng phổ biến rộng rãi là nhờ Spotify, nơi đã áp dụng chúng một cách hoàn hảo. Bây giờ bạn cuối cùng cũng có thể ngừng tạo nhiều phiên bản màu khác nhau trong asset của mình và áp dụng các hiệu ứng trực tiếp trong trình duyệt.

Sử dụng blend CSS không chỉ là một cách tuyệt vời để thống nhất giao diện nội dung trên các trang web, nó còn cho phép bạn cài đặt các phiên bản màu khác nhau của hình ảnh, chỉ thay đổi một giá trị trong CSS:  `colour`. Có 15 giá trị chế độ blend có thể sử dụng, bao gồm màn  screen, overlay, làm sáng và làm tối.

Có một vài phương thức thực hiện, tùy thuộc vào loại phần tử bạn muốn áp dụng hiệu ứng. Ví dụ: bạn có thể sử dụng background-image và background-colour trên container background-blend-mode: **darken**;, hoặc tạo overlay với các phần tử pseudo (ví dụ:**:before** và **:after**) trên wrapper bọc hình ảnh để có được một hiệu ứng màu sắc.

Để đạt được hiệu ứng duotone tốt, mình khuyên bạn nên sử dụng hình ảnh đen trắng có độ tương phản cao. Bạn có thể làm điều này bằng cách áp dụng các bộ lọc CSS để đặt thang độ xám và mức độ tương phản cao.
![](https://images.viblo.asia/ff815527-5036-48c5-b2b3-d61a6fb80a5a.jpg)

Một thuộc tính thú vị khác là **mix-blend-mode**, cho phép bạn trộn nội dung của phần tử với nội dung hoặc background của cha nó. Điều này đặc biệt áp dụng tốt trên kiểu chữ chồng chéo. Bạn có thể hỏi tại sao trong trường hợp này, chúng ta không sử dụng opacity ?- câu trả lời rất đơn giản: chúng ta có thể dễ dàng mất đi độ sống động của màu sắc nếu sử dụng opacity.

# 2. Thêm Mask
Masking cho trình duyệt của bạn biết các yếu tố asset nào sẽ hiển thị và rất hữu ích để xây dựng các hình dạng và bố cục một cách sáng tạo. Việc tạo mask có thể được thực hiện theo ba cách: sử dụng hình ảnh raster (ví dụ định dạng PNG với các phần trong suốt), CSS gradients  hoặc SVG.

Lưu ý rằng không giống như một hình ảnh raster thông thường, SVG có thể được thu nhỏ hoặc biến đổi mà không làm giảm chất lượng đáng kể.

```
img {
  mask-image: url(‘mask.png’) linear-gradient(-45deg,
                        rgba(0,0,0,1) 20%, rgba(0,0,0,0) 50%);
  mask-image: url(#masking); /*referencing to the element generated and defined in SVG code*/
} 
```

Điều quan trọng cần đề cập là Firefox chỉ hỗ trợ cho phiên bản mới nhất, vì vậy chúng ta cần sử dụng mask SVG inline. Vậy điều gì sẽ xảy ra nếu chúng ta sử dụng hình ảnh raster trong suốt? Các phần trong suốt của hình ảnh sẽ không được nhìn thấy - vì vậy nói cách khác, các phần mờ sẽ được hiển thị, ẩn các phần khác.

Masking đặc biệt mạnh mẽ vì nó cho phép bạn áp dụng các thuộc tính tương tự cho hình ảnh nền, xác định vị trí, kích thước và độ lặp lại của chúng.
![](https://images.viblo.asia/ab0e2e80-d9d5-432a-9f20-c6774b2e8d16.jpg)

Một trường hợp tuyệt vời để áp dụng masking CSS là trong các bài viết kết hợp văn bản và hình ảnh. Các container và hình ảnh bất thường rất phổ biến trong in ấn, nhưng lại tẻ nhạt và tốn thời gian để thực hiện trên web. Nhưng nhờ masking, vấn đề đó sẽ không còn nữa!

# 3. Đừng ngại ngùng sử dụng clipping
Một tính năng tuyệt vời khác là clipping CSS. Ranh giới hình dạng được gọi là **clip-path** (đừng nhầm lẫn với thuộc tính clip không còn dùng nữa) và clipping xác định vùng hình ảnh nào sẽ được hiển thị. Clipping tương tự như cắt ra một mảnh giấy - mọi thứ bên ngoài đường viền sẽ bị ẩn đi, trong khi mọi thứ bên trong vẫn sẽ hiển thị bình thường.

```
clip-path: circle(radius at x, y);
clip-path: url(#clipping); /*referencing to SVG element*/
```

Ví dụ: nếu function cricle đặt clipping mask lên trên đầu hình ảnh, bạn sẽ chỉ thấy phần hình ảnh trong vòng tròn này.

Điều thú vị là chúng ta có thể sử dụng các hàm hình dạng và SVG làm đường dẫn clip, điều này mang lại cho chúng ta rất nhiều lựa chọn - ví dụ, chúng ta có thể biến chúng thành các hình dạng biến hình. Kiểm tra bài viết [này](https://css-tricks.com/transparent-jpg-svg/) của Chris Coyier về cách tạo JPG trong suốt bằng cách sử dụng đường dẫn clip SVG.
[![](https://images.viblo.asia/ae011836-1e99-42d8-9c59-b69aa0ead617.jpg)](http://aganaplocha.com/netmag/plants/)
(click ảnh để xem chi tiết ảnh đựoc loại bỏ backround)

Nếu bạn đang tự hỏi sự khác biệt giữa clipping và mask là gì, thì hãy nhớ rằng mask là hình ảnh và clip chỉ là đường dẫn vector. Điều đáng nói là việc che dấu sẽ tiêu tốn nhiều bộ nhớ hơn, vì bạn đang làm việc với một hình ảnh đầy đủ để mọi thứ phải được thực hiện theo pixel.

Đây là lý do tại sao nó khuyên bạn nên sử dụng mask khi bạn muốn có hiệu ứng trong suốt một phần; Nếu bạn muốn các cạnh sắc nét, tốt nhất bạn nên sử dụng các đường dẫn clip.

# 4. Think outside the box
**Shape-outside** và **shape-inside** đã tới để giải cứu! Ai nói rằng container text luôn phải là hình chữ nhật? Hãy bước ra khỏi hộp, theo đúng nghĩa đen và khám phá các hình thức mới làm cho bố cục trang của chúng ta phong phú hơn và ít hộp hơn. thuộc tính **Shape-outside** và **shape-inside** cho phép bạn bọc nội dung của mình xung quanh các đường dẫn tùy chỉnh trong CSS.

Vậy, làm thế nào để nó hoạt động? Chỉ cần áp dụng mã sau đây cho hình ảnh nổi hoặc container:

```
shape-outside: circle(50%); /* content will flow around the circle*/
```

Điều quan trọng cần lưu ý là thuộc tính float và kích thước của phần tử - height và width - phải được đinh nghĩa, nếu không tất cả mọi thứ sẽ không hoạt động. Đối với hình dạng, bạn có thể dùng với circle(), polygon(), inset() hoặc ellipse().

Một giá trị khác có thể là hàm url(). Trong trường hợp này, điều này cho **Shape-outside** xác định hình dạng phần tử dựa trên hình ảnh. Bạn có thể chọn sử dụng hàm url() thay vì polygon() khi bạn có một đồ họa đặc biệt tinh vi với nhiều đường cong và điểm mà bạn muốn lại nội dung được bao bọc một cách trơn tru.

![](https://images.viblo.asia/ce19881d-7cb8-4558-b233-6bfa755fd052.jpg)

Nếu bạn muốn tạo thêm khoảng trống giữa phần tử của bạn và nội dung, hãy sử dụng thuộc tính **shape-margin**, nó sẽ hoạt động giống như một bản lề. Các hàm shape có thể là hoạt hóa, nhưng chỉ đối với các đa giác được xác định - không may là hàm url() không thể hoạt hóa được.

Hiện tại, lượng trình duyệt hỗ trợ cho **Shape-outside** đang khá hạn chế. Hi vọng nó sẽ được mở rộng trong tương lai.

Bài viết của mình xin phép được tạm dừng tại đây, hẹn gặp lại mọi người trong phần tiếp them nhé. Nếu có góp ý gì, các bạn cứ comment bên dưới nha.
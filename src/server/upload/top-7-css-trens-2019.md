Cùng với sự thay đổi chóng mặt của công nghệ, thiết kế web cũng dần đổi mới. Thay vì chỉ hiển thị thông tin, các trang web ngày này có thể  là tác phẩm nghệ thuật, có hình ảnh động phức tạp , bố cục độc đáo và tương tác vi mô. Tất cả những điều này đều có thể thông qua CSS.

CSS mang lại sức hấp dẫn cho các trang web nhàm chán và cho phép mọi thứ có thể tương tác với người dùng. Năm 2019 mang đến nhiều chân trời mới cho thiết kế web và đây là 7 xu hướng CSS  mới mà bạn nên biết trong năm nay.

## CSS Grid

![](https://images.viblo.asia/1cb8cb5c-0565-4131-8f37-1020003c8798.jpg)[](https://cssgrid-generator.netlify.com/)

Tiêu chuẩn phổ biến cho bố cục dạng lưới là Flexbox. Trên thực tế, cho đến cuối năm 2018, gần 83% tải trang trên Chrome đã sử dụng Flexbox . Nhưng điều này có thể sẽ thay đổi trong tương lai gần.

Đó là Grid . Ra đời không lâu và thị phần trên khoảng 2,25% dự theo lượt tải trang trên chrome, có vẻ còn quá ít nhưng so với mức 0,25% đầu năm 2018 thì Grib đang được khẳng định qua từng ngày.

Được xem là tốt hơn so với Flexbox. Flexbox cho phép bạn kiểm soát căn chỉnh dọc hoặc ngang, nhưng không phải cả hai cùng một lúc. Nhưng với Grib thì không.

Các chuyên gia CSS cho rằng sự thiếu phổ biến đối với thực tế là hầu hết các trang web lớn không sử dụng nó. Xét cho cùng, dữ liệu trên được dựa trên lượt xem trang, không phải số lượng trang thô sử dụng Grib. Gần đây chỉ có các trang web lớn mới áp dụng Flexbox, vì vậy điều hợp lý là họ chưa muốn thực hiện chuyển đổi.

Tuy nhiên, năm 2019 chắc chắn sẽ chứng kiến sự tăng trưởng của Grid, bởi vì nó mở ra một mức độ tự do sáng tạo mà các tùy chọn khác không cung cấp.

```
Example:
CSS:
.parent {
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-template-rows: repeat(5, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
.div1 { grid-area: 1 / 1 / 2 / 2; }
.div2 { grid-area: 1 / 2 / 2 / 3; }
.div3 { grid-area: 1 / 3 / 2 / 4; }
.div4 { grid-area: 1 / 4 / 2 / 5; }
.div5 { grid-area: 1 / 5 / 2 / 6; }
.div6 { grid-area: 2 / 1 / 3 / 2; }
}

HTML:
<div class="parent">
<div class="div1"> </div>
<div class="div2"> </div>
<div class="div3"> </div>
<div class="div4"> </div>
<div class="div5"> </div>
<div class="div6"> </div>
</div>
```

Thử ngay[ tại đây.](https://cssgrid-generator.netlify.com/) 

## CSS Writing Mode

![](https://images.viblo.asia/348d7d33-68be-4851-b2b5-fa708e159d5c.jpg)

Không phải tất cả các ngôn ngữ được viết và đọc từ trái sang phải. Đối với các ngôn ngữ đi theo hướng khác, bạn có thể sử dụng thuộc tính CSS ở [Writing-Mode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) .

Luồng văn bản từ trên xuống dưới hoặc từ phải sang trái và điều chỉnh các giá trị ngang và dọc. Bạn thậm chí có thể hiển thị văn bản sang một bên theo chiều dọc, xoay văn bản cho các thiết kế nhất định và sử dụng cùng lúc các bố cục trên.

```
Systax:
/* Keyword values */
writing-mode: horizontal-tb;
writing-mode: vertical-rl;
writing-mode: vertical-lr;

/* Global values */
writing-mode: inherit;
writing-mode: initial;
writing-mode: unset;
```

Đọc thêm về [writing-mode](https://www.w3schools.com/cssref/css3_pr_writing-mode.asp)

## Ảnh động trên các thiết bị di động

Các trang web sẽ bắt đầu sử dụng ngày càng nhiều biểu tượng tải hay xem trước video một đoạn ngắn để gây chú ý của người dùng.

Một ví dụ về điều này từ một trang web phổ biến là YouTube. Mở ứng dụng YouTube dành cho thiết bị di động và cuộn qua các video. Nếu bạn dừng lại một giây, video sẽ tự động phát với âm thanh tắt và hiển thị chú thích.

```
Systax:
p {
  animation-duration: 3s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%; 
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```



Đọc tất cả về việc sử dụng hình ảnh động CSS ở [đây](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) .

## Thêm nhiều Frameworks phổ biến (Bulma, Tailwind, Bootstrap 4, v.v.)
Khi chúng ta chuyển sang một trang web di động hơn, các Framework đang điều chỉnh để bù đắp. Kiểu dáng và thiết kế đang thay đổi, hình ảnh động và hành động đang trở nên phổ biến hơn, và sự tập trung vào sự đơn giản và trải nghiệm người dùng cuối là quan trọng hơn bao giờ hết!

Năm 2019, nhiều framework được thiết kế tốt đang dẫn đầu và giúp các nhà phát triển và nhà thiết kế hoàn thành dự án nhanh hơn bao giờ hết. Một số framework đáng chú ý nhất đang được sử dụng trên web vào năm 2019 là:

* Foundation - Responsive, mobile-first framework và được sử dụng làm giải pháp doanh nghiệp;
* Bootstrap 4 - Bootstrap là một trong những framework CSS lớn nhất được sử dụng trên toàn thế giới, phiên bản 4 đi kèm với các tính năng mới cho sơ đồ màu và các lớp tiện ích;
* Materialize - Khung phổ biến tập trung vào material design styles;

## Single Pages, Experimental Navigations

![](https://images.viblo.asia/88178312-4302-4e10-8b7b-9f38a7e87fd8.jpg)

Xu hướng làm Profile web đang ngày dần phổ biến, vì vậy các trang web hỗ trợ tạo Profile cá nhân cũng được ra đời

Ví dụ phổ biến bao gồm:

* Linktree - Trang đơn giản với các liên kết đến mạng xã hội, sản phẩm của bạn, v.v.;
* Carrd - Các trang web một trang đơn giản, miễn phí, đáp ứng đầy đủ cho hầu hết mọi thứ;
* About.me - Trang web danh mục đầu tư tập trung chuyên nghiệp hơn, tương tự LinkedIn nhưng có thể sáng tạo thêm cho trang cá nhân của mình.
* Instapage - Trình tạo trang hàng đầu cho doanh nghiệp và người khởi nghiệp;

Ngày càng có nhiều trang web được thiết lập đơn giản làm profile cho các công ty, cá nhân hoặc nhóm gửi lưu lượng đến và sau đó phân phối. Các nhạc sĩ sử dụng Linktree và các dịch vụ khác để chia sẻ các bài hát mới của họ trên tất cả các nền tảng phát trực tuyến và nhận được một phần doanh thu liên kết trong thời gian này.


## Variable Fonts
![](https://images.viblo.asia/c28c5d63-de61-4975-93d1-354ef46421de.jpg)

Nôm na dễ hiểu là kỹ thuật này cho phép bạn sử dụng một Font chữ trên website của mình nhưng có thể có nhiều hình dạng khác nhau phụ thuộc vào bố cục màn hình để được trải nghiệm tốt nhất cho người dùng

Kiểm tra một ví dụ về kiểu chữ biến đổi '[Amstelvar](https://github.com/TypeNetwork/Amstelvar)' trên GitHub.

## Scroll Snapping
![](https://images.viblo.asia/c9829b8a-dbfd-488d-be7f-cd0ec4dcb42f.jpg)
Xu hứơng cuối cùng mà tôi muốn nhắc đến trong bài viết này, scroll snapping là một kỹ thuật tương đối mới được sử dụng để chụp người dùng đến một điểm nhất định trên thanh cuộn. Thay vì chuyển động lỏng xuống trang hoặc từ trái sang phải, bạn có thể cuộn trang theo gia số cài đặt. Việc sử dụng phổ biến này là để vuốt qua các sản phẩm hoặc chi tiết trên một trang, cuộn qua trải nghiệm đọc sách / đọc và trượt xuống một trang với các khối thông tin lớn.

```
Example:
Html:
<div class='container'>
  <section class='child'></section>
  <section class='child'></section>
  <section class='child'></section>
  ...
</div>
CSS:
.container {
  scroll-snap-type: y mandatory;
}

.child {
  scroll-snap-align: start;
}
```

CSS Tricks có một hướng dẫn tuyệt vời về [CSS Scroll Snapping thực tế](https://css-tricks.com/practical-css-scroll-snapping/) .

Hướng dẫn có các thông tin về hỗ trợ trình duyệt, thực hành tốt nhất và các thuộc tính bạn nên sử dụng để đảm bảo tính năng chụp nhanh cuộn của bạn hoạt động như dự định.

Bạn muốn xem làm thế nào snapping cuộn hoạt động? Kiểm tra các ví dụ này trên [Webkit](https://webkit.org/demos/scroll-snap/) .

## Hiện tại và tương lai của CSS
> There you have it

[Link](https://1stwebdesigner.com/7-top-css-trends-for-2019/) bài viết gốc.
Thanks [Mike Moloney](https://1stwebdesigner.com/author/mikemoloney/)
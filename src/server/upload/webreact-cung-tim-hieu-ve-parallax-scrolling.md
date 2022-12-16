## Giới thiệu về parallax scrolling
* Kỹ thuật Parallax Scrolling được Ian Coyle tạo ra và áp dụng lần đầu tiên vào năm 2011 và cho đến hôm nay vẫn còn đang được sử dụng rộng rãi cho nhiều website trên thế giới.

* “Parallax” là từ thường được dùng trong video games 2D, sử dụng nhiều hình ảnh nền rồi cho chúng cùng lúc di chuyển song song với những tốc độ khác nhau, tạo ra ảo giác về chiều sâu khi nhìn vào.

* Đối với Web Design thì parallax scrolling được dùng để tạo hiệu ứng 3 chiều với các element liên tục thay đổi vị trí khi người dùng có thao tác cuộn chuột.

![](https://viblo.asia/uploads/36cd60f4-22be-4f2a-aabf-1034e8c592ba.jpg)
Demo: http://demo.tutorialzine.com/2015/09/6-practical-examples-for-building-parallax-websites/1_parallax_intro.html
## Ưu điểm của parallax scrolling trong xây dựng website
* Đem đến cho người truy cập những trải nghiệm tuyệt vời về độ sâu của trang web và hình ảnh động
* Tiếp cận người dùng bằng một phương thức mới mẻ và thú vị: kể chuyện thông qua website
* Người truy cập có thể thăm quan toàn bộ trang web chỉ bằng 1 thao tác là cuộn trang
* Kích thích trí tò mò
* Tăng uy tín của website với sự tương tác mới, đầy sáng tạo

## Ứng dụng của parallax scrolling trong xây dựng website
### Body Text
Ở đây chúng ta có ba đoạn paragraphs sẽ xuất hiện khác nhau. Chúng tôi đã thực hiện điều này bằng cách sử dụng offsets, bắt đầu các hình ảnh động sớm hơn so với bình thường nó cần.
![](https://viblo.asia/uploads/32182b1c-9dfc-412a-af86-5910f7a8a647.jpg)
Demo: http://demo.tutorialzine.com/2015/09/6-practical-examples-for-building-parallax-websites/2_body_text.html
### Feature List
Feature List là những nơi mà bạn giới thiệu sản phẩm của bạn .Icon lớn và văn bản là phải có, nhưng bạn cũng có thể spice lên với hình ảnh động bắt mắt. Trong ví dụ chúng tôi sẽ cho các tính năng xuất hiện từ những phía khác nhau của màn hình.
![](https://viblo.asia/uploads/8eef2258-9182-49a7-b352-90c0140d276f.jpg)
Demo: http://demo.tutorialzine.com/2015/09/6-practical-examples-for-building-parallax-websites/3_feature_list.html
### About us
Phần About us ví dụ của chúng tôi bao gồm các avatar khá tròn xếp trên hai hàng. Các hình ảnh trong hàng đầu tiên được xoay chiều kim đồng hồ và những người vào hàng thứ hai được lật ngang.
![](https://viblo.asia/uploads/6803f4bd-ec8e-43be-aa72-080dbe2064e3.jpg)
Demo: http://demo.tutorialzine.com/2015/09/6-practical-examples-for-building-parallax-websites/4_about_us.html
### Gallery
* Chúng tôi đã chuẩn bị một hình ảnh động di chuyển đẹp ví dụ như bộ sưu tập chúng.
* Nó bao gồm một tập hợp các hình ảnh trên hai hàng.
* Hàng đầu tiên di chuyển từ phải sang trái và di chuyển hàng thứ hai theo hướng ngược lại.
* Các animation này có một số thời gian để hoàn thành, và vì chúng ta không muốn bộ sưu tập chúng rời khỏi màn hình mà không kết thúc quá trình chuyển đổi, chúng tôi tạm dừng di chuyển trong một thời gian.
![](https://viblo.asia/uploads/edacfbb6-6c9a-499a-bf1e-95ae2f458b6d.jpg)
Demo: http://demo.tutorialzine.com/2015/09/6-practical-examples-for-building-parallax-websites/5_gallery.html
### Footer
Đối với khu vực footer chúng tôi đã sử dụng một trong những mẫu freebie chúng và chúng tôi chỉ thay đổi các màu sắc. Khi di chuyển vào màn hình, độ rộng của thanh tìm kiếm bên trong nó tăng lên.
![](https://viblo.asia/uploads/4baa3199-bbe3-450f-9b70-6e76723d5e43.jpg)
Demo: http://demo.tutorialzine.com/2015/09/6-practical-examples-for-building-parallax-websites/6_footer.html
## Xây dựng webpage đơn giản sử dụng Parallax scrolling chỉ với css
HTML:
```
<div id="title" class="section header">
    <h1>Hello Viet Nam</h1>
</div>
<div id="section1" class="section">
    <div class="text">
        <h3>Text h3</h3>
        <p>Text p</p>
    </div>
</div>
```
*"section" là class cơ bản của trang web, chúng ta có thể tạo nhiều section và các section sẽ được "move" khi người dùng cuột trang*
CSS: 
```
html {
    height: 100%;
    overflow: hidden;
}
body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    perspective: 1px; /* set viewport perspective */
}
.section {
    position: relative;
    padding: 20% 10%;
    min-height: 100%; /* Đảm bảo background luôn hiển thị full page */
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 5px 1px rgba(0, 0, 0, .7), 0 -5px 1px rgba(0, 0, 0, .7);
    background: 50% 50% / cover;
}
/* Tạo style cho text */
.text {
    width: 50%;
    padding: 10px 50px;
    border-radius: 5px;
    background: rgba(200,200,200, .7);
    box-shadow: 0 0 10px rgba(0, 0, 0, .8);
}

#section1 .text {
    margin-left: auto;
    margin-right: auto;
}
```
Phần quan trọng nhất là sử lý việc di chuyển các section
```
#title {
    background-image: url('image1.png');
    background-attachment: fixed; /* Cố định background, move section sau section đè lên nó */
}

#section1 {
    background-image: url("image2.png");
    transform: translateZ(-1px) scale(2);
    /* scale = 1 + (translateZ * -1) / perspective với perspective được đặt ở trên*/
    z-index: -1; /* section này sẽ nằm đè lên các section trước và sau nó (khi  cuộn trang)*/
}
```
Demo:
{@embed: https://codepen.io/lebathanhtuan/pen/ZEEBMmX}
## Thư viện hỗ trợ
Ngoài ra đối với ReactJS, chúng ta có thể dùng thư viện **`react-scroll-parallax`**. Nó hoạt động bằng cách sử dụng một scroll listener để thêm, thay đổi offset của những đối tượng(muốn tạo hiệu ứng) dựa vào vị trí của chúng.
Thư viện này cung cấp cho chúng ta 3 component chính như dưới:

* <Parallax> đây là component chính dùng để thay đổi vị trí của đối tượng DOM dựa vào vị trí của chúng.
* <ParallaxBanner> đây là trường hợp khác của Parallax>, nó dùng để tạo hiệu ứng parallax cho các banner.
* <ParallaxProvider> đây là provider dùng để wrap ngoài <Parallax> và <ParallaxBanner> để tạo context và kiếm xoát việc thay đổi.

Các bạn có thể tham khảo thêm tại: https://www.npmjs.com/package/react-scroll-parallax

## Kết luận
Với kỹ thuật parallax scrolling, trang web của chúng ta sẽ sinh động, đơn giản hơn, đồng thời chúng ta dễ truyền tải những thông điệp cần thiết tới người dùng mọt cách nhanh và đơn giản nhất.

Cảm ơn các bạn đã theo dõi.
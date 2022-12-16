Bữa trước mình có làm một giao diện landing page, trong đó có sử dụng video background. Việc đầu tiên mình làm là lên google search "video background js" để tìm một plugin có thể giúp mình giải quyết vấn đề này. Đây là thời đại mà mọi thứ được support tận răng, nhà nhà sài plugin, người người sử dụng library. Tiện dụng, nhanh gọn nhưng ... thừa thãi là những gì chúng ta có thể nói về các loại mì ăn sẵn thế này. Chúng ta có thể dễ dàng tìm ra hàng tá plugin phù hợp có thể giúp giải quyết vấn đề trên. 
Yêu cầu trên trang landing page của mình rất đơn giản: 
+ Video tự động chạy
+ Hiển thị toàn màn hình
+ Làm nổi nội dung
+ Hiển thị poster thay thế khi màn hình nhỏ hơn 768px

Vậy nếu không sử dụng plugin, chúng ta sẽ giải quyết vấn đề này như thế nào?
## Video tự động chạy
Qua rồi cái thời chúng ta phải sử dụng một plugin như flash để có thể chạy video. Phần tử <video> trong html5 là một cách tiêu chuẩn giúp chúng ta nhúng một video vào website. 2 định dạng video phổ biến được hỗ trợ bởi hầu hết các trình duyệt hiện nay là mp4 và webm. Phần tử <video> hỗ trợ rất nhiều phương thức và thuộc tính giúp chúng ta dễ dàng tương tác và kiểm soát hành vi của video.
```html
<video autoplay loop muted>
    <source type="video/mp4" src="https://tinyurl.com/y5x5jmnf">
    <source type="video/webm" src="https://tinyurl.com/y6q5jxr6">
</video>
```
Ở trên, chúng ta sử dụng 3 thuộc tính là autoplay (video tự động chạy), loop (video tự động phát lại vô hạn), muted (tắt âm thanh video)
## Hiển thị toàn màn hình
Phần tử <video> cũng tương tự như phần tử <img>. Mặc định nó sẽ hiển thị theo kích thước và tỉ lệ gốc. Để hiển thị full size mà không phá vỡ tỉ lệ khung hình, chúng ta style như sau:
 ```css
video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
 ```
## Làm nổi nội dung
Đây không phải là vấn đề khó khăn gì khi bạn hiểu một chút về Stacking context trong css. 2 yếu tố cơ bản trong đó là: Các phần tử có position khác static luôn được ưu tiên hiển thị phía trên; theo sau đó, các phần tử sẽ được xét lại độ ưu tiên dựa vào thuộc tính z-index. Như vậy chúng ta chỉ cần thêm thuộc tính z-index: -1; vào phần style phía trên. Những phần nội dung tiếp được thêm vào sẽ luôn hiển thị phía trên video.
## Hiển thị poster thay thế
Sử dụng @media là cách cơ bản nhất giúp chúng ta tác động lên các thành phần của trang phù hợp với từng kích thước màn hình. Trước hết, chúng ta cần cấu trúc lại html như sau:
```html
<section id="hero">
  <video id="heroVideoBg" autoplay loop muted>
    <source type="video/mp4" src="https://tinyurl.com/y5x5jmnf">
    <source type="video/webm" src="https://tinyurl.com/y6q5jxr6">
  </video>
  <img id="heroImgBg" src="https://tinyurl.com/y5gkrvxm" alt="storm">
  <div id="heroContent">
    <h1>Get ricky!</h1>
    <h2>We make it awesome</h2>
  </div>
</section>
```
Thêm một chút css là chúng ta đã có một video background hoàn chỉnh.
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  
  #heroVideoBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    display: none;
    @media (min-width: 768px) {
      display: inline-block;
    }
  }
  #heroImgBg {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    @media (min-width: 768px) {
      display: none;
    }
  }
  #heroContent {
    text-align: center;
    padding-top: 100px;
  }
}
```
[Demo](https://codepen.io/ChimSeDiNang/pen/RwbagLj)
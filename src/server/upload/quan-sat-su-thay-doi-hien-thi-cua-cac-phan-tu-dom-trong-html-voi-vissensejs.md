VisSense.js là một thư viện được sử dụng để quan sát sự thay đổi hiển thị của các phần tử DOM. Nó giúp nhận biết khi nào một phần tử bị ẩn, hiển thị một phần hoặc hiển thị đầy đủ trên màn hình. VisSense.js rất nhẹ (< 4KB), và Không phụ thuộc vào các thư viện khác.

Chắc hẳn ở đây ai củng dùng Facebook và đều thấy là trong khi bạn đang đọc bài trên News Feed, nếu bạn kéo thanh cuộn lướt tới một video nào đó thì video đó sẽ tự động phát (play). VisSense.js sẽ giúp bạn có thể làm được điều đó dễ dàng.

### Thư viện này 
* Cung cấp các phương thức để phát hiện khả năng hiển thị của các phần tử DOM
* Cung cấp một class tiện lợi với các phương thức đơn giản như isHidden, isVisible, isFullyVisible, percentage
* Cung cấp một class tiện lợi để phát hiện những thay đổi hiển thị của các phần tử

### Tuy nhiên nó không thể phát hiện được khi
* Một phần tử bị chồng chéo bởi những phần tử khác
* Các phần tử bị opacity
* Các phần tử nằm trong khối có chứa thanh cuộn, vào các yếu tố "ẩn" đằng sau thanh cuộn được coi là hiển thị.

# Cài đặt
**npm**

```
npm install vissense --save
```
**Bower**

```
bower install vissense/vissense --save
```
**sử dụng thẻ  script với link cdn**

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/vissense/0.10.0/vissense.min.js"></script>
```
    
# Examples
Ở đây mình có làm 1 đoạn demo nhỏ khi scroll qua 75% của video thì nó sẽ tự chạy và khi thẻ video ẩn đi thì nó sẽ tự đồng tắt. bạn có thể xem demo [tại đây](https://codepen.io/nguyenhathanh2212/pen/KOdbZK).

```
<video width="320" height="240" controls id="video" autoplay>
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    <source src="https://www.w3schools.com/html/mov_bbb.org" type="video/ogg">
</video>
 ```

```
var video = document.getElementById("video");

var visibility = VisSense(video, { fullyvisible: 0.75 });

 var visibility_monitor = visibility.monitor({
   fullyvisible: function() {
       video.play();
   },
   hidden: function() {
       video.pause();
   }
 }).start();
```

![](https://images.viblo.asia/411ee7a3-810b-467f-91cf-d8930ad2f8e2.gif)

# VisSense(element [, options])
Khởi tạo đối tượng, có 2 option là 
* hidden (default: 0): nếu tỷ lệ phần trăm bằng hoặc dưới giới hạn này, phần tử được coi là ẩn
* fullyvisible (default: 1): nếu tỷ lệ phần trăm bằng hoặc vượt quá giới hạn này, phần tử được coi là hiển thị
Ex: VisSense(video, { fullyvisible: 0.75, hidden: 0.25 });

**Các method**
* `.percentage()`: get phân trăm hiển thị hiện tại của phần tử
* `.isHidden()`: trả về true nếu phần tử bị ẩn
* `.isVisible()`: trả về true nếu phần tử đang hiển thị
* `.isFullyVisible()`: trả về true nếu phần tử đang hiển thị toàn bộ
* `.state()`: trả về tất cả trạng thái hiện tại của phần tử
* `.monitor([config])`:  quan sát phần tử để biết được trạng thái ẩn hiện của phần tử
```
var element = document.getElementById('video');

var visibility_monitor = VisSense(element).monitor({
  visible: function() { 
    console.log('visible');
  }, 
  hidden: function() { 
    console.log('hidden');
  }
}).start();
```

Ex: Khi sử dụng đoạn code sau thì trên console log sẽ hiển thị những thông tin của phần tử khi phần tử được hiển thị.
```
var video = document.getElementById("video");

var visibility = VisSense(video, { fullyvisible: 0.75 });

 var visibility_monitor = visibility.monitor({
   fullyvisible: function() {
      console.log(visibility.percentage());
      console.log(visibility.isHidden());
      console.log(visibility.isVisible());
      console.log(visibility.isFullyVisible());
      console.log(visibility.state());
      video.play();
   },
   hidden: function() {
       video.pause();
   }
 }).start();
```

![](https://images.viblo.asia/867a45c3-68d3-437c-b5bd-dbdd9594bdfb.PNG)

-----
> Trên đây mình chỉ hướng đẩn 1 số cách sử dụng cơ bản của VisSense.js. Ngoài ra còn nhiều cách sử dụng nâng cáo hơn bạn có thể tham khảo [tại đây](https://vissense.github.io/vissense-demo/#/demos/overview).
> 
> Nguồn tham khảo: https://github.com/vissense/vissense
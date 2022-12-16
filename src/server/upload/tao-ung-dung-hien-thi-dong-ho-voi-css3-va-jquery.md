hôm nay tôi  sẽ  tạo ứng dụng hiển thị đồng hồ  trên website hoặc blog. Với sự hỗ trợ từ jQuery và CSS3 animation, mà các bước thực hiện thì cực kỳ đơn giản, sẽ không khó để các bạn có thể hiểu và tùy chỉnh nâng cao cho riêng mình.

### **The Graphics**

Đầu tiên chúng ta cần chuẩn bị các hình ảnh cho phần giao diện đồng hồ
![](https://images.viblo.asia/ae3d9f73-7f3f-4105-80a9-77a987de7b5d.jpg)

### **HTML**

Trước hết, chúng ta sẽ tạo định dạng html cho đồng hồ điện tử sẽ hiển thị như sau :
```
<ul id="clock">	
	   	<li id="sec"></li>
	   	<li id="hour"></li>
		<li id="min"></li>
 </ul>
 ```
Trong đoạn html bên trên, thẻ div với class là ” clock ” sẽ là nơi chứa toàn bộ thời gian. 
Những thẻ li sẽ lần lượt hiển thị thông tin thời gian tương ứng với giờ (hours), phút (min) và giây (sec).

### **CSS**

Bây giờ chúng ta sẽ sắp xếp và trang trí đồng hồ sao cho đẹp mắt. Trong phần này, các bạn có thể tự sáng tạo ra những kiểu hiển thị theo ý mình. Còn không thì có thể tham khảo đoạn css mà mình áp dụng trong bài viết này như sau :

```
#clock {
  position: relative;
  width: 600px;
  height: 600px;
  margin: 20px auto 0 auto;
  background: url(clockface.jpg);
  list-style: none;
}

#sec, #min, #hour {
  position: absolute;
  width: 30px;
  height: 600px;
  top: 0px;
  left: 285px;
}

#sec {
  background: url(sechand.png);
  z-index: 3;
}
   
#min {
  background: url(minhand.png);
  z-index: 2;
}
   
#hour {
  background: url(hourhand.png);
  z-index: 1;
}

```

### **jQuery**
Việc thiết kế và định dạng coi như đã xong, bây giờ chúng ta sẽ tiến hành kích hoạt cho đồng hồ chạy bằng jQuery.
```
$(function() {
 
      setInterval( function() {
      var seconds = new Date().getSeconds();
      var sdegree = seconds * 6;
      var srotate = "rotate(" + sdegree + "deg)";
      
      $("#sec").css({ "transform": srotate });
          
      }, 1000 );
      
      setInterval( function() {
      var hours = new Date().getHours();
      var mins = new Date().getMinutes();
      var hdegree = hours * 30 + (mins / 2);
      var hrotate = "rotate(" + hdegree + "deg)";
      
      $("#hour").css({ "transform": hrotate});
          
      }, 1000 );

      setInterval( function() {
      var mins = new Date().getMinutes();
      var mdegree = mins * 6;
      var mrotate = "rotate(" + mdegree + "deg)";
      
      $("#min").css({ "transform" : mrotate });
          
      }, 1000 );
 
});
```
Thế là xong, bây giờ các bạn có thể tự kiểm tra thành quả mà chúng ta đã làm này giờ. [  DEMO LINK](https://codepen.io/But/pen/mLJdoE)
{@codepen: https://codepen.io/But/pen/mLJdoE}

Qua bài viết này, các bạn sẽ có thêm kinh nghiệm trong việc sử dụng hàm setInterval và có thể áp dụng cho những ứng dụng khác sau này.
Xin cảm ơn!
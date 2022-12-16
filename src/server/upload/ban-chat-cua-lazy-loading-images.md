UX thì vô cùng quan trọng trong việc lôi kéo khách hàng quay trở lại website, hẳn bạn sẽ k bao giờ quay trở lại 1 trang web mà chờ hết thanh xuân cũng k load ra cho bạn cái nội dung cần thiết. Đối với website hình ảnh là thứ vô cùng quan trọng. Nó có ở hầu hết mọi nơi từ Logo, Banner, Product Image... Thật k vui khi mà ngày nay thì ảnh có dung lượng ngày 1 lớn hơn tỉ lệ thuận với chất lượng hình ảnh đi kèm. Theo như thống kê của [HTTP Archive's State of Images report](https://httparchive.org/reports/state-of-images). Page size trung bình thường là 1511KB trong đó Images chiếm lên đến 45%(650KB). Vì vậy số lượng ảnh đương nhiên có ảnh hưởng lớn đến việc load trang. Éo le thay chúng ta k thể vứt bớt ảnh đi được.Lúc này chúng ta sẽ nghĩ ngay đến kĩ thuật **Lazy Loading Images**.
# 1 Lazy Loading là gì?
**Lazy Loading(Lười tải, Tải chậm)**  hiểu nôm na thì nó là việc load dữ liệu khi cần sử dụng đến chúng.Chẳng hạn nhiều người dùng khi vào 1 page còn chẳng kéo xuống hết đến cuối trang để xem toàn bộ nội dung thì ta cần gì load toàn bộ nội dung trước?Việc ta nên làm là người dùng scroll đến đâu ta sẽ load dữ liệu đến đấy.Lazy Loading có thể áp dụng cho bất cứ resource nào trên 1 page,thậm chí là file JavaScript . Giờ thì chúng ta tập trung vào việc Lazy Loanding Images(load images khi thật sự cần).
# 2 Tại sao nên áp dụng 
**Lazy loading giảm việc tải dữ liệu => Tốc độc load trang nhanh hơn và giảm chí phí (bằng cách giảm tổng số bytes transferred)**
# 3 Lazy Loading Images
Có 2 cách phổ biến để load Image trên 1 page đó là sử dụng thẻ `<img>` , sử dụng thuộc tính `background-image`  của CSS. 

**Lazy Loading Images qua thẻ Img**

Thẻ `<img/>` với đinh dạng cơ bản:

`<img src="/path/to/some/image.jpg" />`

Như đã biết trình duyệt đọc `src` attribute để trigger đến việc tải ảnh. Nên chúng ta sẽ move link image qua 1 attribute khác để ngăn chặn việc tải ảnh này. Dưới đây là 1 VD sử dụng `data-src` attribute , bạn hoàn toàn có thể đặt bất cứ tên attr nào mà bạn muốn.

`<img data-src="https://ik.imagekit.io/demo/default-image.jpg" />`

Sau khi ngăn chặn được việc load Images tức thời thì chúng ta cũng cần thông báo cho trình duyệt biết khi nào cần load Images lên.  Lúc này ta sẽ sử dụng Javascript để bắt sự kiện của người dùng và add **link** từ `data-src` vào lại attr `src`.  

**Lazy Loading Images qua thuộc tính background-image**

Với background-image , trình duyệt sẽ xây dựng cây DOM kèm theo CSSDOM và check xem kiểu CSS có áp dụng cho nút DOM hiện tại không. Nếu DOM hiện tại có `background-image` thì trình duyệt sẽ load Image. Tương tự như `src` attr , trước tiên ta sẽ set cho DOM có giá trị `background-image: none`  sau đó sẽ change giá trị khi cần thiết.
 
**Đương nhiên ta không thể thiếu class để trigger đến đối tượng thông qua JavaScript cho cả 2 trường hợp trên.**

Dưới đây là 2 link code tương ứng cho 2 lí thuyết phía trên :)) 

**Image Lazy Loading**

{@codepen: https://codepen.io/imagekit_io/pen/MBNwKB}

**Background-Image lazy loadiing**

{@codepen: https://codepen.io/imagekit_io/pen/RBXVrW}

# 3 Ứng dụng
Sau khi hiểu bản chất của **Lazy Loading Images** và cơ chế hoạt động của nó, giờ việc của chúng ta là tìm 1 vài thư viện có sẵn và tích hợp vào project( vì không nên chế tạo lại chiếc bánh xe :)) )
**Dưới đây là 1 vài thư viện phổ biến** 

[JQuery-Lazy](http://jquery.eisbehr.de/lazy/ ) : Thư viện hỗ trợ lazy load phổ biến được viết bằng JQuery.

[Lazysizes](https://github.com/aFarkas/lazysizes) : Đây là một thư viện rất phổ biến với chức năng mở rộng. Nó bao gồm hỗ trợ cho các attr `srcset` và `size` cho việc responsive kèm theo.

Các bạn có thể click vào mấy link trên và đọc hướng dẫn sử dụng để áp dụng :)) .Rất dễ để dùng :))
# 4 Testing Lazy Load
Khi đã tích hợp Lazy Loading Images thì chúng ta sẽ cùng check xem Images có  được **tải chậm** thật không nhé.
Mở chrome dev tool bằng cách nhấn F12 or click chuột phải chọn Inspect elements(Kiểm tra)
sau đó chọn tab Network->Img. Ở lần refresh page đầu tiên bạn sẽ chỉ nhìn thấy 1 số image phía trên được load
	
![alt](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1537217765/lazy-03_eas7mm.png)

Sau đó khi bạn scroll xuống dưới thì sẽ để í thấy những Images khác ngay lập tức được load theo
![alt](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_700,f_auto,q_auto/v1537217795/lazy-04_qpxxfe.gif)

# 5 Kết luận
Cảm ơn các bạn đã đón đọc, mọi góp í xin để lại cmt bên dưới >< .

tham khảo:
https://css-tricks.com/the-complete-guide-to-lazy-loading-images/
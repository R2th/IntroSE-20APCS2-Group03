### Giới thiệu
Chào độc giả Viblo !
Chủ đề về cải thiện tốc độ hiển thị cho Website lúc nào cũng là chủ đề nóng hổi và quan trọng vì không chỉ tạo ra sản phẩm cho khách hàng là xong mà còn phải làm nó chạy nhanh ổn định thì mới gọi là sẩn phẩm chất lượng.
Đúng vậy ko ai vào một trang Web chậm mà muốn vào lại nữa cả, cái này nó liên quan đến UX(trải nghiệm người dùng) vì thế tối ưu tốc độ thường là phía bên Backend. Tuy nhiên bên phía Frontend cũng cần tối ưu tốc độ load JS, CSS thì thường chúng ta nén hay viết làm sao cho không gây chậm. Cũng liên quan đến tối ưu tốc độ hiển thị hôm nay mình xin giới thiệu thuốc tính CSS cực mới làm giảm thời gian Rending xuống và tăng tốc độ hiển thị. Đó chính là  `content-visibility`. Đây là thuộc tính mới ra từ Chromium 85 giúp cải thiện tăng tốc độ hiển thị cho nội dung của Website, thuộc tính này có liên quan đến thuộc tính CSS khác là `Contain` mình sẽ nói ở phần cuối nhé.
Về  tốc độ rending content không sử dụng thuộc tính `content-visibility` và có sử dụng các bạn xem hình sau đây sẽ thấy rõ. Bình thường không sử dụng thì tốc độ rending là `232ms`, còn sử dụng chỉ còn `30ms` thôi,gấp khoản 7 lần.
![](https://images.viblo.asia/ea50369b-7053-437e-b5f7-c23c30a35569.jpg)


### Các thuộc tính và cách sử dụng
**1.content-visibility: auto**<br>
Việc tối ưu tốc độ hiển thị phần nội dung nào đó của trang Web cần có cái gì đó được chỉ định để chúng ta điều khiển theo ý muốn và vì thế lần này với sự ra đời của `content-visibility` chúng ta có thể làm được việc điều khiển nội dung rending hiển thị ra mà trước đây không làm được.

`content-visibility` để là `auto` sẽ mang đến hiệu suất tức thì nhất là khi kết hợp với thuộc tính `contain` với value như `layout`,`style`,`paint`. tức là nếu 1 element có các element con nhưng các element con đó ko nằm trong viewport của màn hình sẽ không được hiển thị nhưng ở đây là trình duyệt hiểu và sẽ không render các element con  ko nằm trong viewport đó. Vùng ẩn ko render ra khi gần vào trong vùng view thì trình duyệt sẽ render hiển thị ra để người dùng nhìn thấy nội dung. 

```CSS
.class {
  content-visibility: auto;
  contain-intrinsic-size: 1000px; /* giải thích phía dưới */
}
</div>
```

Chúng ta muốn là content đó chỉ render và hiển thị ở kích thước chỉ định nhưng  nếu mà  chỉ set là `content-visibility: auto; `thì trình duyệt sẽ điều chỉnh hiển thị theo viewport thôi không theo kích thước chỉ định vì vậy để theo kích thước chỉ định rất may là có thuộc tính này`contain-intrinsic-size` , thuộc tính này có thể set chiều rộng và cao, như trên là 1000px cho chiều rộng vs 1000px cho chiều cao.

**2.content-visibility: hidden**<br>
 Với hidden thì nó ko tự động hiển thị trên màn hình, khi muốn dữ lại nội dung bất kể là nó có hay ko có trên màn hình thì chúng ta dùng thuộc tính này. Có nghĩa là với thuộc tính này thì sẽ có nhiều quyền kiểm soát nội dung hiển thị hơn, cho phép ẩn hiện 1 cáchs nhanh chóng.
 
 Nói đến ẩn nội dung chúng ra nghĩ ra ngay 2 thuộc tính là `display:none` và `visibility:hidden` vậy thì nó khác gì với `content-visibility: hidden`
* display: none - ẩn content và destroy trạng tháng hiện thị có nghĩa là hiển thị nó cũng mất thời gian như hiển thị content mới.
* visibility: hidden - ẩn content tuy nhiên lại vẫn giữ trạng thái hiển thị của nó , tức là nội dung đó có chiều cao rộng bao nhiêu dù ẩn đi mình không nhìn thấy rồi nhưng nó vẫn chiếm diện tích hiển thị.
* content-visibility - ẩn nhưng vẫn dữ nguyên trạng tháng hiển thị tuy nhiên khi có thay đổi nào thì có chỉ thay đổi khi content đó được hiển thị

content-visibility tương thích chỉ trên 1 số trình duyệt và tương lai hứa hẹn sẽ phổ biến tương thích trên mọi trình duyệt.
![](https://images.viblo.asia/8b94dff3-d1b5-434f-b157-edd611483f2d.png)

**3. về thuộc tính contain**
* **size**: xác định kích thước của 1 content mà ko cần quan tâm nó có bao nhiêu content con bên trong.
* **layout**: Ngăn bố cục con bên trong không ảnh hưởng tới bố cục bên ngoài.
* **style**:  Áp dụng cho các content con nằm trong bố cục được chỉ định trước.
* **paint**: Chỉ tác động tới các content bên trong màn hình mà ko cần quan tâm đến đến các content nằm ngoài màn hình.
 
### Lời kết
 Đây là thuộc tính mới rất hay trong việc cải thiện tốc độ hiển thị và điều khiển được nội dung hiển thị theo ý muốn rất hay mà mình nghĩ chúng ta nên tìm hiểu kĩ về nó và áp dụng vào để cải thiện tốt về mặt hiển thị. 
Mọi người có thể tìm hiểu kỹ hơn về thuộc tính content-visibility ở đây nhé.
https://css-tricks.com/content-visibility-the-new-css-property-that-boosts-your-rendering-performance/
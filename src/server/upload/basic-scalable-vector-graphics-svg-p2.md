Quay trở lại với Scalable Vector Graphics, hôm nay mình sẽ tiếp tục tìm hiểu cách thức để tạo ra một svg bằng tay. Tất nhiên bạn có thể dùng một số phần mềm như adobe illutrator chẳng hạn để sinh ra code svg nhưng trước hết hãy viết code bằng tay để xem svg có những gì.
# Những thành phần của svg
Có khá là nhiều thứ rối rắm trong một svg, tuy nhiên bạn có thể sẽ bắt gặp một số thứ khá thường xuyên. Dưới đây là một số thành phần thường thấy trong một svg.

* <svg> : thành phần bao ngoài, định nghĩa một hình svg. SVG chính là đồ họa vector mà <html> là một trang web.
* <line> : những đường thẳng đơn.
* <polyline> : những đường đa đoạn.
* <rect> : hình chữ nhật và hình vuông.
* <ellipse> : hình tròn hoặc hình oval.
*  <polygon> : hình đa giác.
*  <path> : tạo bất kỳ hình nào bạn muốn bằng cách định nghĩa cả điểm và đường nối giữa chúng.
*  <defs> : định nghĩa nhưng thành phần có thể dùng lại, những thành phần được định nghĩa trong <defs> sẽ không được hiển thị.
*  <g> : gom nhóm các thành phần khác.
*  <symbol> Liên kết một nhóm, những với một số tính năng phụ. Thông thường được đặt trong phàn <defs>.
*  <use> Lấy những tài nguyên được định nghĩa bên trong phần <defs> và làm cho chúng hiển thị trong SVG.

# Starter
Trước khi bắt đầu ta sẽ tạo ra một trang có grid là 2 trục tọa độ. Chúng ta sẽ vẽ svg trên grid này
![](https://images.viblo.asia/39ce3662-aab3-4989-b802-098429f88969.png)

# Xác định các giá trị x, y
Khi làm việc trong không gian 2D trên một trang web, trục ngang được biểu diễn bởi x và trục dọc được biểu diễn bởi y. Vị trí theo từng trục này được biểu diễn bởi những con số. Nếu bạn muốn di chuyển thứ gì đó về bên phải, chúng ta sẽ cần tăng giá trị x lên, và để di chuyển về bên trái chúng ta sẽ giảm x. Tương tự, để di chuyển thứ gì đó xuống chúng ta sẽ tăng y và để di chuyển lên trên chúng ta sẽ giảm y.
Khá quen thuộc phải không, như vậy để biểu diễn một điểm trên không gian 2D này, chỉ cần gán cho nó một cặp giá trị (x, y). Như ở hình ví dụ trên, 2 đường đậm nhất biểu thị cho 2 trục tọa độ. Như vậy điểm giao nhau sẽ có tọa độ (0, 0).
# Grid nền
Mỗi đường grid sáng nhất biểu diễn 10px, và những đường grid dày nhất biểu diễn 100px. Vì vậy nếu chúng ta muốn di chuyển một đối tượng xuống dưới từ một đường dày đến đường kế, chúng sẽ tăng vị trí của nó trên trụng y bằng 100px.
 Chúng ta cùng bắt tay vào tạo ra một svg cơ bản, như một icon chẳng hạn
 # Thiết lập svg
 Bước đầu tiên trong việc tạo bất kỳ SVG nào là xây dựng một thẻ phần tử <svg></svg>. Bất kỳ thứ gì mà bạn muốn SVG của bạn hiển thị sẽ phải nằm bên trong hai thẻ này. Có một số thuộc tính mà bạn có thể sử dụng trên phần tử này, nhưng chúng ta sẽ giữ cho mọi thứ đơn giản và chỉ sử dụng width và height.
 
 ```
 <svg width="750" height="500">
 
</svg>
```
# Icon menu
Hãy bắt đầu với thành phần cơ bản nhất <line>
Phần tử line có bốn thuộc tính mà bạn sẽ cần phải sử dụng:

* x1 điểm bắt đầu trên trục ngang
* y1 điểm bắt đầu trên trục dọc
* x2 điểm kết thúc trên trục ngang
* y2 điểm kết thúc trên trục dọc
Về cơ bản chỉ là tạo ra 2 điểm trên không gian 2D và svg sẽ nối chúng lại cho bạn. Cũng làm như thế vài lần nữa là ta đã có một hình menu đơn giản
{@codepen: https://codepen.io/kevtran/pen/XqNOaE}
Bạn có thể tìm hiểu thêm các cách vẽ cơ bản khác với những thành phần như <polyline>, <rect>, <circle> ... ở [đây](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes).
    
# Thêm Phần tử <defs>
Như đã nói trong phần giới thiệu các thành phần, các svg mà ta vẽ được có thể dùng lại nhiều lần. Để làm được điều này chúng ta sẽ bọc svg đó trong thẻ <defs></defs>
```
<svg width="750" height="500">
     <defs>
 
    </defs>
</svg>
```

Điều này nói cho hệ thống biết rằng tất cả các icon mà chúng ta đã tạo ra mặc định là ẩn đi, cho tới khi chúng ta sử dụng chúng.

# Tạo nhóm với <g>
Để chuyển đổi một trong số svg của chúng ta thành một nhóm thì tất cả những gì chúng ta phải làm là bọc nó bên trong thẻ <g></g>. Để làm cho nhóm đó có thể sử dụng lại chúng ta cũng sẽ cần cho nó một ID duy nhất.

 # Tạo Symbol với <symbol>
 Thay vì sử dụng nhóm để định nghĩa các icon bạn cũng có thể sử dụng symbol. Symbol hoàn toàn giống với nhóm, tuy nhiên bạn được truy xuất các thiết lập bổ sung để điều khiển viewbox và tỷ lệ.
 
 Symbol có cung cấp thêm một thuộc tính viewBox. Thuộc tính này sẽ cho phép chúng ta định nghĩa phần sẽ được hiển thị của mỗi svg. Khi trình duyệt truy cập đến thông tin này thì nó có thể giãn và canh symbol một cách chính xác.
 
 Chúng ta sẽ cần cho thuộc tính viewBox của chúng ta bốn giá trị. Hai cái đầu tiên sẽ định nghĩa điểm phía trên bên trái của svg, và cái thứ ba và thứ tư định nghĩa chiều rộng và chiều cao tương ứng của nó.
 # Sử dụng <g>, <symbol> với <use>
 Đơn giản là bạn cung cấp điểm bắt đầu của svg, đối với <symbol> ta sẽ cung cấp thêm thuộc tính chiều rộng và chiều cao cho nó.
 ```
 <use href="#alert" x="100" y="200" width="100" height="100"></use>
 ```
 
 Xem một đoạn code tổng quan những gì đã học được nhé
{@codepen:  https://codepen.io/kevtran/pen/zjoeqp}
 
 Chúng ta đã học được một số thứ cơ bản của svg ở phần này. Nhưng svg còn nhiều thứ hay ho khác, mình sẽ tiếp tục tìm hiểu nó trong những phần sau.
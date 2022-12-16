CSS transform và transition là một trong những thuộc tính mạnh mẽ của CSS3 giúp tăng UX cho trang web của bạn. Không cần phải thêm những dòng code Javascript dài lê thê và nặng nề như trước, nay bạn có thể thêm các animation cho web bạn trở nên sinh động chỉ bằng việc kết hợp animation và CSS3.  Ở [bài viết trước](https://viblo.asia/p/ban-da-thuc-su-nam-ro-css-animation-ByEZkgzxZQ0) mình có đề cập về CSS Animation và các kiến thức cơ bản xung quanh đến Animation. Vậy nên ở bài viết này mình sẽ tiếp tục viết về Animation và cách kết hợp các thuộc tính của CSS3. Go Go Go!!

# Các phương thức trong thuộc tính tranform:
Ở thuộc tính transform có rất nhiều phương thức, một trong số đó là: rotate, translate, scale và skew.

## 1. Rotate
Rotate tranform là phương thức giúp cho một khối có giá trị này xoay theo chiều kim đồng hồ hoặc ngược chiều kim đồng hồ bằng cách xác định một con số có giá trị là độ (degree). Ví dụ khi để `90deg` thì khối đó sẽ xoay theo chiều kim đồng hồ 90 độ ngược lại nếu để -90deg thì khối sẽ xoay 90 độ ngược chiều kim đồng hồ.
{@codepen: https://codepen.io/thang21/pen/PyJgwJ}

## 2. Scale
Scale có thể hiểu là phương thức làm cho khối nhận phương thức này được tăng hoặc giảm về kích thước nghĩa là chúng ta có thể phóng to - thu nhỏ khối này lại. Phương thức này có thể tăng hoặc giảm ở cả hai chiều X và Y còn nếu chúng ta chỉ viết giả dụ `scale(1)` thì sẽ đồng thời tăng cả 2 chiều 
{@codepen: https://codepen.io/thang21/pen/dgVxYX}

## 3. Translate
Với Translate, chúng ta có thể tạo ra các hiểu ứng dịch chuyển trên dưới, trái phải một cách dễ dàng. `TranslateX`dịch chuyển trái phải trong đó giá trị dương thì dịch chuyển sang phải còn giá trị âm thì dịch chuyển sáng trái. Trái lại với `TranslateY` thì dịch chuyển trên dưới, giá trị dương thì lên trên còn giá trị âm thì dịch xuống dưới.  
{@codepen: https://codepen.io/thang21/pen/mzBgVw}

## 4. Skew
Phương thức skew dùng để làm nghiêng một khối dựa vào chiều X hoặc Y. Giá trị dương X sẽ làm nghiêng sang bên trái, trong khi đó giá trị âm sẽ là bên phải. Giá trị dương Y sẽ làm nghiêng khối xuống dưới, và giá trị âm sẽ làm nghiêng lên trên. Nếu chỉ viết `skew` không thôi thì nó sẽ mặc định là `skewX`. 
{@codepen: https://codepen.io/thang21/pen/oaGKEZ}

# Thuộc tính Tranform origin
- Thuộc tính `transform-origin` là một thuộc tính riêng biệt với `tranform` nhưng lại làm việc đồng thời với nhau. Nó cho phép bạn định vị chiều rộng và chiều cao cho thành phần.
- Ví dụ bạn muốn dùng `tranfrom: rotate` but lại không muốn nó rotate từ chính giữa, mà từ đoạn trên-trái, bạn sẽ dùng giá trị là `0% 0%` hoặc `left top`, nếu là dưới-phải thì sẽ là `0% 100%` hoặc `right bottom`,...
- Hãy chắc chắn một điều đó là bạn phải đặt thuộc tính `tranform-origin` này vào thành phần cha, chứ không phải là ngay thành phần mà bạn muốn định vị lại
{@codepen: https://codepen.io/thang21/pen/LgOPrB}

Nếu bạn có phải làm việc trên trình duyệt Internet Explore thì nên cân nhắc và check kĩ vì có thể trên trình này sẽ sinh ra bug không mong muốn. Bạn có thể tham khảo [ở đây](https://caniuse.com/#search=transform-origin) để an tâm hơn nhé  

# Thuộc tính Perspective
- Thông thường khi nhìn một thành phần ta sẽ thấy thành phần có dạng 2D (chiều rộng và chiều cao), để nhìn vật thể 3D ta cần có thêm chiều sâu, thuộc tính perspective sẽ cho ta thấy được chiều sâu của thành phần, khoảng chiều sâu được tính từ điểm đặt ban đầu tới giá trị của perspective (theo đơn vị pixel).
{@codepen: https://codepen.io/thang21/pen/JmOjYe}

Tới đây các bạn đã biết cách kết hợp các thuộc tính của CSS3 và Animation rồi phải không nào? Hãy tự tạo cho mình một thư viện animation thật riêng và sáng tạo nhé! Chúc các bạn học tốt
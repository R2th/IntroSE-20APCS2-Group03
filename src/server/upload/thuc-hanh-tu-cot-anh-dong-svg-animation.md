Sau vài tháng lặn ngụp trong đám bài ThreeJS, thì hôm nay mình sẽ refresh 1 tí, chọn chủ đề đơn giản vui vẻ, quay lại với css nhé :D

![](https://images.viblo.asia/ed71aca0-f6a4-42f3-8765-2747dd6fb4e2.gif)

Câu chuyện là thế này, bạn mình có gửi cho mình trang https://loading.io/spinner vì trang đó  có cái spinner con mèo khá là hay :D.

![](https://images.viblo.asia/8d3c2e3d-14ae-4175-9616-ab1ddebce62e.gif)

Vào xem thì mình nhận ra là trang này có rất nhiều hình loading vui vui, mà như con mòe này ko chỉ có thể đổi chọn palette màu, mà còn chỉnh được speed, size rồi preview trước khi download với mấy loại định dạng nữa. 

Lúc đầu mình tưởng là họ làm sẵn palette màu và kích thước cho con mòe, rồi record lại như ảnh gif cơ, nhưng mà như thế tù túng quá, và ở đây không chỉ đổi palette được mà còn có thể custom cho từng màu nữa. Vậy thì record là bất khả thi rồi. Thế họ làm như nào mà nó vừa chuyển động flexible được hay vậy?

Nếu là sử dụng JS, thì lúc ảnh tải xuống lại phải chèn js để chạy à? Trong khi tải xuống nhận về có mỗi cái ảnh để đặt vào thẻ `<img>` mà thôi.

Vì định dạng download có cả SVG, nên mình đoán là họ dùng svg rồi. À thì đến đây họ có yêu cầu mua license để tải mấy cái icon loading này về, mà mình thì chỉ muốn tìm hiểu cách hoạt động thôi, nên có dùng 1 ít trick để check source :D

Kết quả sau khi xóa từng phần tử để check thì hóa ra là ảnh svg ấy ngoài các thẻ path bình thường ra thì có thêm 1 thứ lạ là thẻ `<animation>` đã làm cho nó chuyển động được như vậy.

Với cái mục tiêu là học để làm mấy trang có animation cool ngầu trên mạng, đồng thời tối giản hóa js thì tất nhiên là mình muốn tìm hiểu cách animation cho SVG như này rồi :D

Bài này là kết quả tìm hiểu ở mức 'nhập môn' của mình chia sẻ cho mọi người. Nếu sau này có thể tìm hiểu được những cái cao siêu hơn thì mình sẽ lại chia sẻ, tất nhiên là bằng cách dễ hiểu nhất cho dễ học :D

Vậy dưới đây mình sẽ hướng dẫn các bạn dựa trên base là các bài css trước của mình nhé:

 - [Vẽ với SVG](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-4-ve-bang-svg-Qpmlea0Nlrd)
 - Hướng dẫn cơ bản về animation: [bài 1](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-1-transition-4dbZNprL5YM), [bài 2](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-2-transforms-4dbZNpNg5YM), [bài 3](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-3-keyframes-animation-3Q75w86BKWb)

# Lý thuyết
https://codepen.io/bunnypi04/pen/zYKMKeP?editors=1100

> Lưu ý, trên firefox ko xem chuyển động được :v
 
Trước hết mình sẽ giới thiệu qua về svg animate nhé
## Tổng quan
Như đã hướng dẫn ở các bài trước, thì mình có thể kéo dãn, dịch chuyển, thay đổi trạng thái của các đối tượng HTML bằng css rồi.

Và hình ảnh SVG, phân tích kỹ ra cũng chính là 1 cấu trúc HTML, thì đương nhiên cũng có thể animate được như HTML rồi. Tuy nhiên, việc animate cho SVG sẽ có chút khác biệt. Bạn có thể đọc tài liệu đầy đủ tại đây nhé: https://www.w3.org/TR/2001/REC-smil-animation-20010904/

Để phục vụ cho việc animate thì sẽ sử dụng các tag sau:
 - `<animate>`: animate các thuộc tính (attribute) và đặc tính (properties) với thời gian xác định
 - `<set>`: 1 cách viết tắt để animate, sử dụng cho animation không có value attribute/properties như là các khả năng hiển thị
 - `<animateMotion>`: animate theo motion path
 - `<animateColor>`: thay đổi màu sắc của attribute (border color,...)

Phía dưới đây mình sẽ hướng dẫn sử dụng thẻ phổ biến nhất, là `<animate>` nhé. Sau này tìm hiểu sâu hơn thì mình sẽ viết phần 2 sau :D

## Chỉ định thuộc tính sẽ animate
Để animate được theo ý muốn, thì cần thẻ `<animate>`1 số attribute với value phù hợp, cụ thể là các attribute như dưới đây:
 - `attributeName = <attributeName>`.  Attribute này quy định giới hạn animate cho đối tượng: giới hạn là animate opacity, hoặc animate color

VD:
```html
<animate attributeType="CSS" attributeName="display" />
<animate attributeType="CSS" attributeName="opacity" />
<animate attributeName="d" /> /* animate path 'd' (defination) của hình*/
```

 - `attributeType = "CSS | XML | auto"`: Như VD attributeName ở trên, thì với các attribute liên quan tới css sẽ cần có define `attributeType = "CSS"` rồi mới attributeName được. Có 3 loại type như trên, mặc định sẽ là 'auto', còn 'css' tất nhiên là dùng trong TH `attributeName` là tên của 1 thuộc tính css; với 'XML' sẽ được sử dụng nếu `attributeName` là 1 XML namespace.

## Chỉ định đối tượng cho animate (target)
`targetElement = "<target selector>"` hoặc `xlink:href="<target id>"`

Thông thường, bạn có thể target cho `<path>`, `<line>`, hoặc thành phần thẻ svg nào bằng cách viết thẻ `<animate>` trực tiếp vào trong scope của thẻ đó: `<path id="paw"><animate/></path>`

Tuy nhiên thì trong 1 số trường hợp phức tạp, hoặc bạn muốn viết tách biệt animate ra, thì có thể sử dụng targetElement như sau:
```html
<path id="paw"></path>
<path id="tail"></path>
<animate targetElement="#tail"/>
<animate targetElement="#paw"/>
```

Với `xlink:href="#item_id"`, thì nó hoạt động giống như link vậy: khi bạn viết menu cho page, kèm theo thẻ `<a href="#menu-item">` thì khi click vào sẽ được đưa xuống vị trí phần tử có id là `id="menu-item"`. Vì vậy, target của `xlink:href` phải nằm trong hình ảnh svg hiện tại

## Chọn animation function - cách chuyển động
 ### Animation time
 - `begin`: attribute này định nghĩa thời điểm bắt đầu animate, giống như animation delay vậy. Có vài loại `begin` thường sử dụng: 
     - `begin="click"`: click vào ảnh thì bắt đầu animate
     - `begin="0s"` hoặc `begin="3s"`: thời điểm bắt đầu là ngay lập tức hoặc sau 3s
     - `begin="event-value"`- Điều khiển bằng sự kiện của đối tượng khác. 
     
     Chẳng hạn: `begin=" x.load "` bắt đầu animate khi đối tượng x  được load; `begin="x.focus+3s"`: sau khi focus đối tượng x là 3s thì animate; `begin="x.endEvent+1.5m"`; `begin="x.repeat" `: bắt đầu mỗi khi event x lặp lại. VD:
```html
<circle id="orange-circle" r="30" cx="50" cy="50" fill="orange" />
<rect id="blue-rectangle" width="50" height="50" x="25" y="200" fill="#0099cc"></rect>

<animate xlink:href="#orange-circle"  begin="click" fill="freeze" ...
    d="circ-anim" />
<animate xlink:href="#blue-rectangle" fill="freeze" ....
    begin="circ-anim.begin + 1s"/> // sau khi animate hình tròn màu cam bắt đầu, thì 1s sau bắt đầu animate hình xanh này
```
### Thời gian animation
`dur="5s"`: Tổng thời gian animation. Giả sử bạn muốn đổi màu cho hình, từ màu đỏ sang màu trắng, thì `dur="5s"` nghĩa là sau khi begin được 5s sẽ hoàn thành chuyển đổi màu.

### Giá trị animation
Để xác định cái gì sẽ được animate như thế nào, sẽ cần 1 vài giá trị sau:
 - `from="blue" to="orange"`: xác định trạng thái đầu và trạng thái cuối của animation. Nếu attributeName="d" (animate hình học), thì không cần cặp giá trị này

### Trạng thái sau khi kết thúc animation

Giống như animation bình thường (xem lại [đây](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-3-keyframes-animation-3Q75w86BKWb#_animation-fill-mode-forwards-11)), bạn có thể chọn trạng thái kết thúc của animation là giữ nguyên trạng thái cuối, hoặc trở về như trước khi animate:
 - `fill="freeze"`: sau khi kết thúc animation thì thời điểm kết thúc như nào thì đứng nguyên như thế
 - `fill="remove"`: sau khi kết thúc animation thì trở về như chưa có gì xảy ra

Ngoài ra, sau khi kết thúc, thì có thể tùy chỉnh restart cho animation nữa (do mình có thể set lặp lại cho animation và do thời điểm start của animation có thể phụ thuộc vào các element khác, thì cần cái này để chặn việc restart liên tục do bị ảnh hưởng - xem phía dưới nhé)
 - `restart="always"`: có thể restart bất kỳ lúc nào, đây là giá trị mặc định nếu không viết restart
 - `restart="whenNotActive"`: chỉ có thể restart nếu nó ko active (đang không thực hiện animation)
 - `restart="never"`: khỏi cần nói cũng hiểu, chặn luôn ko cho restart nữa :D

### Lặp lại animation

Sử dụng `repeatCount` có thể chỉnh được số lượng lần lặp lại animation theo ý muốn của bạn:
 - `repeatCount="indefinite"`: lặp lại vĩnh viễn luôn, cứ chạy hết lại chạy lại từ đầu
 - `repeatCount="4"`: lặp lại 4 lần thôi là mệt rồi

### Đường cong chuyển động
Vấn đề này sẽ hơi khó hiểu và khó sử dụng. Trước hết, hãy đọc qua về đường cong 2 control point ở trong bài [Vẽ SVG path](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-4-ve-bang-svg-Qpmlea0Nlrd#_path-10) ở phần đường C (Cubic Bezier Curves )

Để xác định các đường C, cần 3 cặp tham số: Cặp đầu tiên là tọa độ Control point của start point, cặp tiếp theo là tọa độ control point của end point, cuối cùng là tọa độ end point

Thì tương tự như vậy, để xác định đồ thị vận tốc chuyển động của animation, sẽ đại diện cho 3 cặp tọa độ đó bằng 2 cặp attribute tương ứng nhau: `keyTimes` đại diện cho cặp tọa độ control start point, và có `keySplines` tương ứng với nó là 2 cặp thông số end point của đường cong C.

# Thực hành 
## Tìm kiếm Next top Model
https://codepen.io/bunnypi04/pen/zYKMKeP?editors=1100

> (Lưu ý, trên firefox ko xem chuyển động được :v)


Điều đầu tiên, muốn tạo ảnh động, trước hết bạn cần các key frame cho các trạng thái chuyển động đã. Dễ hiểu là với mỗi 1 cử động sẽ tương ứng với 1 ảnh chụp ấy :D

Như hình con mèo của mình, mình có 2 trạng thái chạy lặp lại thôi: 
 - Trạng thái 1: giơ tay trái, tay phải đập bàn =))
 - Trạng thái 2: tay trái đập bàn, tay phải nhấc lên

Như vậy thì mình cần 2 hình ảnh cho mỗi trạng thái này, nếu bạn muốn chuyển động đa dạng hơn thì cần có hình ảnh mẫu cho mỗi chuyển động nhé. Hình con mèo này mình lấy trên trang CV của [TrungQuânDev](https://cv.trungquandev.com/) vì thấy nó hay hay :D.
Dưới đây là hình mà mình lấy được trên trang về:
```html
    <svg id="bongo-cat" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 787.3 433.8">
      <defs>
        <symbol id="eye" data-name="eye" viewBox="0 0 19.2 18.7">
          <circle cx="9.4" cy="9.1" r="8"></circle>
          <path d="M16.3,5.1a1.3,1.3,0,0,1-1.4-.3,7.2,7.2,0,0,0-4.5-2.6A7.2,7.2,0,0,0,5.5,3.5,6.8,6.8,0,0,0,2.8,7.8a6.8,6.8,0,0,0,1,4.8,6.2,6.2,0,0,0,4,2.7,6.1,6.1,0,0,0,4.6-.7,6.7,6.7,0,0,0,2.9-3.7,6.4,6.4,0,0,0-.5-4.5c-.1-.2.8-1,1.5-1.3s2.2,0,2.3.5a9.4,9.4,0,0,1-.2,7.2,9.4,9.4,0,0,1-5.1,5.1,9,9,0,0,1-7,.2A9.6,9.6,0,0,1,1,13.5,9.2,9.2,0,0,1,.4,6.6,8.9,8.9,0,0,1,4.6,1.3,9,9,0,0,1,11.2.2,9.3,9.3,0,0,1,16.7,4C16.9,4.3,17,4.8,16.3,5.1Z"></path>
        </symbol>
        <symbol id="paw-pads" data-name="paw-pads" viewBox="0 0 31.4 33.9">
          <path d="M6.8,16a3.7,3.7,0,0,1,1.1,2.8,3.2,3.2,0,0,1-1.6,2.6L5,21.8H4.4a2.8,2.8,0,0,1-1.8.3A4.2,4.2,0,0,1,.2,19.1,7.7,7.7,0,0,1,0,17.6a2.8,2.8,0,0,1,.6-2,3.2,3.2,0,0,1,2.1-.8H4A5,5,0,0,1,6.8,16Zm7.3-4.8a1.8,1.8,0,0,0,.7-.5l.7-.4a3.5,3.5,0,0,0,1.1-1,3.2,3.2,0,0,0,.3-1.4,1.4,1.4,0,0,0-.2-.6,3.4,3.4,0,0,0-.3-2.4,3.2,3.2,0,0,0-2.1-1.5H13.1a4.7,4.7,0,0,0-1.6.4,2,2,0,0,0-.9.9l-.4.6v.4a6.1,6.1,0,0,0-.5,1.2,4.3,4.3,0,0,0,0,1.6,3.5,3.5,0,0,0,.5,2l.7.6a3.3,3.3,0,0,0,1.7.7A3,3,0,0,0,14.1,11.2ZM22.7,7l.6.2h.3A2.3,2.3,0,0,0,25,6.8l.4-.3.6-.3a7.5,7.5,0,0,0,1.5-.9,4.2,4.2,0,0,0,.8-1.2,1.9,1.9,0,0,0,.1-1.5A2.6,2.6,0,0,0,27.5,1,3.5,3.5,0,0,0,23.6.3a3.8,3.8,0,0,0-2,1.5,4.8,4.8,0,0,0-.7,2,3.6,3.6,0,0,0,.9,2.6ZM31,24.1a13.5,13.5,0,0,0-2.2-4.7,36.6,36.6,0,0,0-3.2-3.9,5.3,5.3,0,0,0-5-1.9,10.5,10.5,0,0,0-4.5,2.2A5.6,5.6,0,0,0,13.5,20a15.1,15.1,0,0,0,1.2,6.3c.8,2,1.7,4,2.6,5.9a1.6,1.6,0,0,0,1.5.8,1.7,1.7,0,0,0,1.9.9,17.1,17.1,0,0,0,8.7-4.8,8.2,8.2,0,0,0,1.7-2C31.6,26.3,31.3,25,31,24.1Z" fill="#ef97b0"></path>
        </symbol>
      </defs>
      <g id="head">
        <g id="head__outline">
          <path d="M303.2,186.3c4-7,14.8-20.2,20-26,17-19,34.6-34.9,43-41l12-8s16.6-32,21-33c9-2,33,22,33,22s20-9,79,7c41,11.1,47,14,57,22,7.5,6,18,16,18,16s33.7-19.5,41-15-2,66-2,66,5.9,12.9,11,22c9.1,16.2,13.6,20.2,19,31,3.6,7.2,8.4,28.5,10.5,43.5l-385-62Z" fill="#fff"></path>
          <path d="M302.9,186.9c-1.2,3-5.9,12.6-9,18.8l-12.5,25.5-.6-1.2c32.2,4.8,64.4,9.2,96.6,13.6s64.4,8.9,96.5,13.7,64.3,9.7,96.4,14.9,64.1,10.5,96.2,15.8l-5.6,5.5c-1.2-8.5-2.8-17.1-4.8-25.6-1-4.1-2.1-8.4-3.4-12.3l-.5-1.4-.5-1.4-.6-1.3-.7-1.3a59.5,59.5,0,0,0-3.1-5.5c-2.2-3.6-4.7-7.2-7.1-11s-4.8-7.6-7-11.5c-4.5-7.9-8.3-15.9-12.1-24a4,4,0,0,1-.3-2.6h0c1.4-9.1,2.7-18.2,3.7-27.4.5-4.5.9-9.1,1.2-13.7s.4-9.1.2-13.4a26.4,26.4,0,0,0-.8-6,8.1,8.1,0,0,0-.3-1.1c-.1-.3-.2-.4-.1-.3h.3c0,.1.1.1,0,.1h-.6a11.9,11.9,0,0,0-2.5.2,16.3,16.3,0,0,0-3,.7,56.7,56.7,0,0,0-6.2,2.1,212.6,212.6,0,0,0-24.5,11.9h-.1a3.9,3.9,0,0,1-4.7-.6c-4.9-4.7-10-9.4-15.1-13.8a86.6,86.6,0,0,0-7.9-6,46.1,46.1,0,0,0-8.5-4.6c-6-2.6-12.6-4.6-19.2-6.7l-19.8-5.7a324.9,324.9,0,0,0-40-8.9,196.8,196.8,0,0,0-20.2-1.8c-1.7,0-3.4-.1-5.1,0h-2.5l-2.5.2-2.5.2-2.4.4-2.4.5-1.1.3h-.5l-.4.2H433a2.5,2.5,0,0,1-2.6-.7c-4.6-4.6-9.5-9.1-14.5-13.2a82.7,82.7,0,0,0-7.9-5.7L403.9,81a10.8,10.8,0,0,0-4-.9c-.1,0-.3,0-.3.1h0l-.7.5-1.5,1.7c-1,1.2-2,2.6-2.9,3.9s-3.6,5.5-5.3,8.3c-3.5,5.7-6.8,11.4-9.9,17.3h0l-.4.4-10.2,6.6a53.6,53.6,0,0,0-4.9,3.4l-4.6,3.8c-6.2,5.1-12.1,10.6-17.9,16.2s-11.3,11.4-16.7,17.4c-2.7,3-5.3,6.1-7.8,9.2s-5,6.3-7.4,9.5c-4.2,5.6-7,10-5.7,7.1a34.1,34.1,0,0,1,2.1-3.8l3.8-5.6c2.9-4,6.3-8.3,8.5-10.9s4.4-5.2,6.7-7.7l6.9-7.4c4.7-4.9,9.4-9.7,14.3-14.3s9.8-9.3,15-13.7l4-3.2,4.2-2.9,8.3-5.7-.4.4c3-5.9,6.1-11.8,9.4-17.7,1.6-2.9,3.3-5.8,5.1-8.6l2.9-4.3,1.8-2a7.5,7.5,0,0,1,1.3-1.1c.1-.2.6-.4,1-.5l.9-.2h1.7l1.4.2,2.7.8c1.7.7,3.3,1.5,4.8,2.3a84,84,0,0,1,8.5,5.7A175.7,175.7,0,0,1,434,98.5l-2.9-.6.8-.3.7-.2L434,97l2.7-.7,2.7-.5a23,23,0,0,1,2.6-.3l2.7-.3,2.7-.2h5.3a182.1,182.1,0,0,1,21,1.3,332.5,332.5,0,0,1,41.1,8.4l20,5.5c6.7,2,13.4,4,20.1,6.7a65.3,65.3,0,0,1,9.8,5.1c3.1,2.1,5.9,4.3,8.6,6.5,5.4,4.5,10.6,9.2,15.7,14l-4.8-.6c4.1-2.4,8.2-4.6,12.4-6.7s8.6-4.2,13-6c2.3-.9,4.6-1.7,7-2.4a23.4,23.4,0,0,1,3.8-.9,20,20,0,0,1,4.4-.4h1.3l1.5.4a5.1,5.1,0,0,1,1.7.7l.9.7.8.7a8.3,8.3,0,0,1,1.6,2.6,12.7,12.7,0,0,1,.8,2.3,44.6,44.6,0,0,1,1.1,7.7c.2,5,.1,9.7-.1,14.4s-.7,9.5-1.2,14.1c-.9,9.4-2.1,18.6-3.6,27.9l-.3-2.6c3.7,7.9,7.5,15.8,11.8,23.3,2.1,3.7,4.4,7.4,6.8,11s4.9,7.2,7.3,11.1c1.3,2,2.4,4,3.5,6.1a10.9,10.9,0,0,0,.8,1.5l.8,1.8.7,1.7.6,1.7c1.5,4.4,2.6,8.7,3.7,13.1a262,262,0,0,1,5.2,26.4,4.9,4.9,0,0,1-4.1,5.6h-1.5c-32.1-5-64.2-9.9-96.3-15.1s-64.1-10.6-96.1-16.1-64-11.4-96-17.4-63.9-11.9-95.9-17.4h-.1a.8.8,0,0,1-.6-.9v-.2l16.6-32.1C299.8,192.2,304.1,183.9,302.9,186.9Z"></path>
        </g>
        <g id="head__face">
          <g id="eyes">
            <use width="19.2" height="18.7" transform="translate(474.8 195.2)" xlink:href="#eye"></use>
            <use width="19.2" height="18.7" transform="matrix(-0.51, -0.85, 0.82, -0.5, 370.39, 192.59)" xlink:href="#eye"></use>
          </g>
          <g id="mouth">
            <path d="M399.2,186.3c.9,3.6,2.6,7.8,6,9,6.4,2.3,19-6,19-6s4.1,12.4,10,15,10.7-1.7,16-6" fill="#fff"></path>
            <path d="M450.2,198.3c.6,1.2.2,1.9-.2,2.2a36.7,36.7,0,0,1-7.6,4.9,14.9,14.9,0,0,1-4.8,1.4h-1.4l-1.3-.2-1.4-.4-1.3-.6a21.6,21.6,0,0,1-6.4-7.2,52.8,52.8,0,0,1-4-8.3l3.8,1.3a62.3,62.3,0,0,1-7.1,4.1,32.1,32.1,0,0,1-7.9,2.8,13.2,13.2,0,0,1-4.9.2l-1.4-.3a7.5,7.5,0,0,1-1.3-.6,7.9,7.9,0,0,1-2.3-1.6,16.8,16.8,0,0,1-2.9-4,24.1,24.1,0,0,1-1.6-4.2c-.1-.5,1.6-1.3,3-1.4s3.5.2,3.6.6a10.3,10.3,0,0,0,2.6,4.9l.7.5h2.4l1.5-.2a28.4,28.4,0,0,0,6.5-2c2.1-1,4.3-2.1,6.3-3.3h.1a2.5,2.5,0,0,1,3.4.9l.3.5a43.1,43.1,0,0,0,3.2,7.7,19.8,19.8,0,0,0,2.2,3.4,8.1,8.1,0,0,0,2.6,2.6,5,5,0,0,0,3,.7,10.8,10.8,0,0,0,3.7-1,33.4,33.4,0,0,0,7.2-4.3C448.8,197.4,449.5,197.2,450.2,198.3Z"></path>
          </g>
        </g>
      </g>
      <g>
        <g id="paw-right">
          <g id="paw-right--down">
            <path d="M293.2,191.3l10-7s-18.4,11.1-24,20-13,20.4-9,31c4.7,12.4,20.5,15.7,22,16,20,3.8,47.8-24.3,47.8-24.3s1.9-3.3,2.2-3.7" fill="#fff"></path>
            <path d="M342.1,223.4c.9,1.2.2,2.8-.3,3.7l-.4.7-.3.3a118.1,118.1,0,0,1-14.2,12.3,83.2,83.2,0,0,1-16.2,9.8,43.9,43.9,0,0,1-9.3,3,26.3,26.3,0,0,1-10.1.2,44.5,44.5,0,0,1-9.3-3.2,34.2,34.2,0,0,1-8.3-5.5,23,23,0,0,1-5.8-8.5,21.3,21.3,0,0,1-1.3-10.3,34.9,34.9,0,0,1,2.7-9.7,76.1,76.1,0,0,1,4.5-8.5l2.4-4,.6-1,.8-1.1a15.6,15.6,0,0,1,1.6-2,49.9,49.9,0,0,1,7-6.8,136.1,136.1,0,0,1,15.3-11.2,3.1,3.1,0,0,1,4.4,1,3,3,0,0,1-.8,4.2H305l-8.6,6.2c-.9.6-2.7-.5-3.1-1.9s.5-4.4,1.5-5l6.6-4.5,3.5,5.3A131.9,131.9,0,0,0,290,197.4a52.7,52.7,0,0,0-6.4,6,6.5,6.5,0,0,0-1.3,1.6l-.6.8-.7,1-2.4,3.8c-1.6,2.6-3.1,5.2-4.4,7.8a27.7,27.7,0,0,0-2.4,8.1,15.6,15.6,0,0,0,.8,8,17.4,17.4,0,0,0,4.4,6.7,27.2,27.2,0,0,0,7.1,4.9,39.5,39.5,0,0,0,8.1,3,21.6,21.6,0,0,0,8.4,0,37.8,37.8,0,0,0,8.5-2.6,84.9,84.9,0,0,0,15.7-9,142.4,142.4,0,0,0,14.1-11.6l-.3.3,1.1-1.8C340.3,223.4,341.3,222.2,342.1,223.4Z"></path>
          </g>
          <g id="paw-right--up">
            <g>
              <path d="M282.2,215.2c-1.6-1.6-12.8-17.9-14-34.3-.1-2.5,1.7-16,12.9-22.4s22.3-1.9,26.2.4c12.2,7.3,21.2,19.1,22.8,22.4" fill="#fff"></path>
              <path d="M330,181.2a2.4,2.4,0,0,1-2.6-1.3,71.4,71.4,0,0,0-9.8-10.8,64,64,0,0,0-11.7-8.6,26.3,26.3,0,0,0-6.5-2.3,26.9,26.9,0,0,0-6.9-.6,24.9,24.9,0,0,0-6.7,1.3,20.8,20.8,0,0,0-5.8,3.3,23.1,23.1,0,0,0-7.6,11,32.5,32.5,0,0,0-1.4,6.6,6.6,6.6,0,0,0,.1,1.4l.2,1.8c.1,1.2.4,2.3.6,3.5a65,65,0,0,0,4.8,13.4c1,2.2,2.2,4.3,3.4,6.4a43.1,43.1,0,0,0,3.9,5.9.6.6,0,0,1,0,.6c0,.2-.2.4-.4.7a5.7,5.7,0,0,1-1.5,1.6c-1.3.6-4.1.1-4.6-.6a89.5,89.5,0,0,1-7.2-13.7,63.7,63.7,0,0,1-4.3-14.9,25.7,25.7,0,0,1-.5-4c0-.3-.1-.6-.1-1v-1.2a12.5,12.5,0,0,1,.2-2.1,35.2,35.2,0,0,1,2.4-7.8,28.6,28.6,0,0,1,4.1-6.9,24.6,24.6,0,0,1,6.1-5.5,26.2,26.2,0,0,1,15.5-4.2,28.9,28.9,0,0,1,7.8,1.2l3.8,1.3,1.8.9,1.8,1a78.2,78.2,0,0,1,11.9,9.6,80.2,80.2,0,0,1,9.7,11.8C331.1,179.7,331.4,181,330,181.2Z"></path>
            </g>
            <use width="31.4" height="33.93" transform="translate(273.2 166.1) rotate(-5.6)" xlink:href="#paw-pads"></use>
          </g>
        </g>
      </g>
      <g id="paw-left">
        <g id="paw-left--up">
          <g>
            <path d="M545.4,261.9c-7.1-13-12.9-31.1-13.3-37.6-.6-9,0-15.6,5.2-22.2s15-9.8,22.7-8.8a26.7,26.7,0,0,1,17.3,9.4c5.3,5.8,9.4,12.9,11.6,16.6" fill="#fff"></path>
            <path d="M588.9,219.2c-1.4.4-2.3-.7-2.8-1.4a93.9,93.9,0,0,0-8.9-12.5c-3.3-3.9-7.1-7-11.7-8.6a24.2,24.2,0,0,0-7.1-1.4,24.5,24.5,0,0,0-7.1.7,27,27,0,0,0-6.6,2.7,21,21,0,0,0-5.2,4.6,20.6,20.6,0,0,0-3.5,6.1,22.2,22.2,0,0,0-1.3,6.9,47.3,47.3,0,0,0,.1,7.5,52.2,52.2,0,0,0,1.4,7.1c1.4,4.8,3.1,9.7,5,14.4a147.7,147.7,0,0,0,6.5,13.9c.4.7-1,2.3-2.4,2.6s-4-.6-4.4-1.4c-2.3-4.8-4.3-9.7-6.1-14.6a128.8,128.8,0,0,1-4.6-15.3c-.3-1.3-.5-2.6-.7-4a16.4,16.4,0,0,1-.2-2.2v-2a57,57,0,0,1,.4-8.2,27.2,27.2,0,0,1,2.3-8.2c.7-1.3,1.4-2.5,2.2-3.7l1.3-1.7,1.4-1.6a28.8,28.8,0,0,1,7-5,27.6,27.6,0,0,1,8-2.5,25.6,25.6,0,0,1,8.3-.2,27.4,27.4,0,0,1,15.1,6.7,50.6,50.6,0,0,1,5.5,5.9,111.3,111.3,0,0,1,8.7,13.2C589.8,217.7,590.3,218.9,588.9,219.2Z"></path>
          </g>
          <use width="31.4" height="33.93" transform="matrix(0.99, -0.03, 0.04, 1, 539.85, 203.52)" xlink:href="#paw-pads"></use>
        </g>
        <g id="paw-left--down">
          <path d="M538.2,239.3c-3.2,1.6-33,10.8-37,28-.4,1.8-2.1,18.9,7,26,5.5,4.3,12.7,2.8,25,0,10.3-2.3,19-5.8,40-16,9.1-4.4,16.6-8.2,22-11" fill="#fff"></path>
          <path d="M595.1,266.4c.1,1.4-1.4,2.4-2.4,2.9l-18.3,9.4c-6.2,3.1-12.3,6.1-18.6,9a120.8,120.8,0,0,1-19.6,7.2l-5.1,1.2-5.1,1.1a43.4,43.4,0,0,1-5.2.9,33.8,33.8,0,0,1-5.6.3,17.8,17.8,0,0,1-5.8-1.5,6.1,6.1,0,0,1-1.4-.7l-1.3-.9-2.2-2a23.6,23.6,0,0,1-5.2-10.2,44.5,44.5,0,0,1-1.3-10.9c0-.9.1-1.8.1-2.7a6.6,6.6,0,0,0,.1-1.4v-.7c.1-.3.1-.7.2-.9a21.6,21.6,0,0,1,2.1-5.5,33.4,33.4,0,0,1,7.1-8.7,67.1,67.1,0,0,1,8.7-6.4,121.7,121.7,0,0,1,19-9,1.5,1.5,0,0,1,1.7.6,3.4,3.4,0,0,1,.9,1.9c.1,1.5-1.6,4.2-2.6,4.6a91.1,91.1,0,0,0-17.8,8.5,40.1,40.1,0,0,0-7.6,5.8,22.8,22.8,0,0,0-5.2,7.3l-.4,1-.3,1a1.7,1.7,0,0,0-.2.5v.4c-.1.4-.1.8-.2,1.2s-.1,3.1-.1,4.7a35.4,35.4,0,0,0,1.4,9.3,15.6,15.6,0,0,0,4.5,7.3c2,1.9,4.7,2.6,7.8,2.5a55.9,55.9,0,0,0,9.7-1.2l4.9-1.1,4.9-1.1a121,121,0,0,0,18.8-6.8c12.4-5.3,24.6-11.5,36.8-17.4C593.4,265.4,595,264.9,595.1,266.4Z"></path>
        </g>
      </g>
    </svg>
```

Trông nó như thế này:
![](https://images.viblo.asia/d30fd193-4d89-459b-87b4-24e28f4047f2.png)

Như hình thì bạn có thể thấy nó có đủ 2 trạng thái trên cùng 1 file svg luôn :v 

## Phân tích và tách trạng thái

Như đã nói ở trên, mình cần 2 trạng thái đập bàn. 2 trạng thái này khác nhau ở mỗi cái tay thôi. Vậy thì cần trích 2 cái tay ra là được :D.

Như bài hướng dẫn vẽ SVG, thì chỉ cần trích được path vẽ hình cái tay thôi. Trên thẻ `svg` kia đã có note sẵn tay của mèo rồi: `id='paw-left'`, `id='paw-right'`. Thậm chí còn ghi chú cả trạng thái giơ tay (`paw-left--up`) và đập bàn (`paw-left--down`) nữa.

### Cách 1: animate path
Như phần lý thuyết đã trình bày dài dòng ở trên, thì có thể thấy là cần sử dụng tới animate path rồi: `attributeName="d"`, trường hợp này chỉ cần animate cho 2 cái tay là được

Và theo hướng dẫn mà làm thôi: animate `attributeName="d"` sẽ đi kèm với `values="<path d trạng thái 1>; <path d trạng thái 2>; ..."` thay vì sử dụng `from` và `to`. Ở đây trạng thái 1 và 2 là 2 trạng thái của mỗi bàn tay, tương ứng với trạng thái up và down.

Kèm theo đó, mình cho nó repeat vô hạn indefinite luôn, vậy là sẽ có code như này đây:

```html
<animate
         xlink:href="#paw-right"
         attributeName="d"
         dur="600ms" 
         repeatCount="indefinite"
         keyTimes="0; 1"
         calcMode="spline" 
         keySplines="0,0,1,1"
         values="M588.9,219.2c-...;
                 M595.1,266.4c.1,1.4-1...."
/>
```

Làm tương tự với tay trái nhưng đảo ngược thứ tự up - down so với tay phải là được rồi :D

![](https://images.viblo.asia/68f1529b-8e02-4672-8626-37bdbb922692.png)

Ơ nhưng mà đến đây thấy còn gì đó chưa đúng :D. Còn 2 cái lòng bàn tay hồng hồng nữa kìa :D.

Để 'xử lý' nốt cái paw-pad này thì hãy xem tiếp cách dưới nhé:

### Cách 2: animate display
Do hạn chế của animate path trên fire fox mà khiến cho hình ảnh không 'động đậy' được, nên mình nghĩ ra cách 'nông rân' này dùng tạm. 

Về cơ bản, cách này như tiêu đề, đấy là sử dụng thuộc tính display của css, 2 trạng thái path sẽ thay nhau ẩn/hiện tương ứng với display: none/block để tạo ra hiệu ứng như phía trên. Tất nhiên là cách này có hạn chế nhiều, chẳng qua là dùng được vài trường hợp animate kiểu: vài khung hình/đơn vị thời gian không quá bé mà thôi.

Vậy là, mình sẽ làm như sau:

 - Đầu tiên: hiển thị `paw-left--up` và `paw-right--down` (display: block), đồng thời ẩn `paw-left--down` và `paw-right--up` (display: none)
 - Tiếp theo, hiển thị/ ẩn ngược lại
 - Và lặp lại Infinite

Vậy là mình có 2 cặp thẻ animate, trỏ tới 2 cặp trạng thái của 2 tay mèo:
```html
<g id="paw-right">
    <g id="paw-right--up"></g>
    <g id="paw-right--down"></g>
</g>
<g id="paw-left">
    <g id="paw-left--up"></g>
    <g id="paw-left--down"></g>
</g>
<animate
         xlink:href="#paw-left--up"
         attributeType="css" attributeName="display"
         from="1" to="0"
         dur="0.6s" repeatCount="indefinite"
/>
<animate
         xlink:href="#paw-right--down"
         attributeType="css" attributeName="display"
         from="1" to="0"
         dur="0.6s" repeatCount="indefinite"
/>
<animate
         xlink:href="#paw-left--down"
         attributeType="css" attributeName="display"
         from="0" to="1"
         dur="0.6s" repeatCount="indefinite"
/>
<animate
         xlink:href="#paw-right--up"
         attributeType="css" attributeName="display"
         from="0" to="1"
         dur="0.6s" repeatCount="indefinite"
/>
```

Giờ thì hiệu ứng hệt như phía trên rồi nhé :D. Xử lý tương tự sử dụng display là có thể animate được cái paw-pad rồi nhé

# Nâng cao: biến hình smooth như ditto

![](https://images.viblo.asia/e7fe004b-87f9-4e50-b20b-74003bed18c9.gif)

Với ví dụ thực hành ở trên, thì có thể thấy là cái sự transform nó khá là 'cứng', chỉ là bật tắt 2 cái ảnh mà thôi. Nhưng mà như con ditto kia thì nhìn nó 'mượt' hơn hẳn nhỉ?

Việc biến hình mượt như vậy là hoàn toàn có thể, nhưng mà nó sẽ khá phức tạp :D. Nếu để ý thì cái VD kia mình có note là: không chạy được trên Firefox. Lý do là vì firefox chỉ cho phép `attributeName="d"` có sự mượt như ditto kia thôi. Hay cụ thể hơn, đấy là values các trạng thái của animation có `attributeName="d"` phải map với nhau:
```html
<animate 
    attributeName="d" 
    dur="1440ms" 
    repeatCount="indefinite"
    values="M 0,0 
    C 50,0 50,0 100,0
    100,50 100,50 100,100
    50,100 50,100 0,100
    0,50 0,50 0,0
    Z;

    M 0,0 
    C 50,0 50,0 100,0
    100,50 100,50 100,100
    50,100 50,100 0,100
    0,50 0,50 0,0
    Z;"
/>
```

Như trên minh họa, tức là với values có thứ tự vẽ trong path là M -> C -> Z, thì các trạng thái tiếp theo cũng phải có thứ tự là: M -> C -> Z.

Với hình con mèo trên của mình, thì nó không map với nhau nên không thể chạy trên firefox, cũng như không smooth được. Việc sử dụng 2 ảnh SVG có sẵn sẽ khó mà đạt được điều này, vậy nên cái này mới được gọi là 'Nâng cao'
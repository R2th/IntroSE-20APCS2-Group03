![](https://images.viblo.asia/c8488def-bf17-459a-ad19-03338bd99ed8.gif)

# Mở đầu
Tiếp tục trở lại với series CSS animation, lần này mình quyết định tìm hiểu về SVG. Lý do là vì mình muốn tạo hiệu ứng vẽ chữ như trên, mà cái này dùng ảnh hay dùng text đều không được, nên phải nhờ tới SVG.

Chắc hẳn nếu đã từng có ý định tìm hiểu về SVG trong html thì nhiều người đã vô cùng đau đầu khi nhìn 1 cái path đã hoa cả mắt rồi, các tài liệu thì lại đã tiếng anh lại còn khó hiểu. Mình cũng vậy, mấy lần định tìm hiểu xong lại từ bỏ, đến giờ mới tập trung quyết tâm giải trình nó. Thông tin trong bài được tổng hợp từ rất nhiều nguồn khác nhau, mỗi nơi chắt được 1 ít để có thể hiểu hoàn toàn về cách vẽ SVG, và tất nhiên nó bằng tiếng Việt, nên chắc chắn rằng sẽ giúp được những bạn muốn tìm hiểu SVG rút gọn lại con đường so với mình :D.

Ở bài này, mình sẽ giới thiệu cơ bản về SVG, cách vẽ SVG đơn giản, và cuối cùng là giới thiệu tool render SVG cho nhanh =))
# Giới thiệu SVG
SVG là viết tắt của Scalable Vector Graphics, đúng như tên gọi, nó cấu tạo là các vector.

Hiểu đơn giản, hình ảnh thông thường được cấu tạo từ các pixel là các ô vuông, khi bạn zoom lên thì các pixel hiển thị to ra, các ô vuông to lên và hình của bạn trông giống hình game 8 bit vậy. Còn hình ảnh vector nó là các "đường" có hướng, kiểu như nối đường nối giữa 2 điểm, nên dù phóng to cũng ko bị vỡ ra bit.

Với hình ảnh định dạng SVG, thì nó tốn ít "chỗ" hơn, sử dụng cho các icon trên web nhẹ hơn nhiều so với việc load ảnh bình thường (à trừ khi là ảnh SVG của bạn vô cùng phức tạp nhé, thì dùng 1 file png optimize và giảm chất lượng ảnh còn hơn), nhất là khi muốn co kéo mà không bị giảm chất lượng hình ảnh, giống như 180p và full HD vậy

![](https://images.viblo.asia/92e800a4-6398-4e62-adb4-92331b10ae9e.PNG)
> Hình ảnh bit map và ảnh vector khi nhìn qua không khác nhau

![](https://images.viblo.asia/8b391fff-3bce-49fd-b64a-c7985754d4c5.PNG)
> Nhưng khi phóng to thì ảnh bitmap bị vỡ, còn ảnh vector thì không

Mọi người cũng có thể xem thêm bài giới thiệu này: https://viblo.asia/p/tim-hieu-ve-svg-gAm5yqd85db

# Vẽ với SVG
## Các thẻ tag
Trong các thẻ SVG, có thể có nhiều thẻ con, list các thẻ con khá dài, bạn có thể xem chi tiết tất cả tại https://developer.mozilla.org/en-US/docs/Web/SVG/Element (thực ra mình cũng chưa thể tìm hiểu hết đám này). Ở đây mình sẽ giới thiệu 1 số thẻ tạo hình dạng (shape) như sau:
###  `<circle>`
Thẻ vẽ đường tròn. Cái này giống như dùng khuôn hình tròn có sẵn rồi vẽ theo, hoặc dùng compa. Đảm bảo cực tròn :D. Thẻ `<circle>` có 3 parameter:
```html
<svg>
  <circle cx="50" cy="50" r="50"  stroke="red" fill="none"/> //stroke để tô màu cho đường, không có nó lại 'invisible' mọi người bảo mình hướng dẫn linh tinh :D
</svg>
```
Trong đó: `cx`, `cy` là tọa độ tâm đường tròn theo chiều x, y (Mọi người xem lại hệ x, y trong html tại [đây](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-2-transforms-4dbZNpNg5YM#_translate-5) nhé); Còn `r` đương nhiên là bán kính đường tròn theo pixel

###  `<ellipse>`
Thẻ vẽ đường elip. Cũng giống như đường tròn, tuy nhiên elip thì có nhiều hơn 1 param:
```html
<svg>
  <ellipse cx="100" cy="50" rx="100" ry="50" stroke="red" fill="none" /> 
</svg>
```
Vì elip có 2 tiêu điểm (cái này học hồi cấp 3 ý), nên thay vì chỉ có bán kính `r` như đường tròn, ta có `rx`, và `ry`. Mọi người có thể search thêm về hình elip để tập vẽ nhé

![](https://images.viblo.asia/75b1e5b8-344a-42f8-9a83-dff10b0fbfb4.png)

###  `<line>`
Thẻ vẽ đường thẳng. Và để vẽ đường thẳng thì cần biết vị trí điểm đầu và vị trí điểm cuối, nên là sẽ có 4 param ở đây:
```html
<svg>
  <line x1="0" y1="80" x2="100" y2="20" stroke="red" fill="none" />
</svg>
```

`x1`, `y1` là tọa độ x, y của điểm bắt đầu, và `x2`, `y2` là tọa độ của điểm kết thúc.
###  `<polygon>`
Thẻ vẽ hình đa giác. Với thẻ này, bạn sẽ định nghĩa các điểm là các đỉnh của đa giác, và sẽ nối các điểm theo thứ tự bạn viết và sau đó sẽ tự động nối điểm cuối cùng về điểm đầu để tạo 1 hình khép kín.
```html
<svg>
  <polygon points="0,100 50,25 50,75 100,0" stroke="red" fill="none"/>
</svg>
```
Trong attribute `points` chính là danh sách các cặp tọa độ của mỗi đỉnh đa giác.

![](https://images.viblo.asia/8d6fa742-0551-49bc-b80a-65be548b6b0f.png)
###  `<polyline>`
Thẻ vẽ đường thẳng gãy khúc. Thẻ này sẽ định nghĩa các cặp tọa độ của các điểm, rồi nối các điểm với nhau bằng đường thẳng theo thứ tự. Nó không khác polygon là mấy, trừ việc nó không nối điểm cuối với điểm đầu :D. 
```html
<svg>
    <polyline points="100,100 150,25 150,75 200,0" fill="none" stroke="black" />
</svg>
```
![](https://images.viblo.asia/1ecbfedf-42b8-49a0-aa41-e5b9e758771a.png)
###  `<react>`
Vẽ hình chữ nhật. Với thẻ này, ngoài việc vẽ hình chữ nhật 4 góc nhọn thông thường, thì còn có thể bo góc cho hình nữa:
```html
<svg>
    <rect x="120" y="60" width="200" height="100" rx="15" />
</svg>
```
Ở đây, `x`, `y` là tọa độ đỉnh trên bên trái. `width` là chiều rộng của hình chữ nhật, `height` là chiều cao của hình chữ nhật. Để bo góc cho hình, có thể sử dụng thêm 2 param là `rx` và `ry`. Nếu chỉ ghi `rx`, mặc định sẽ là `rx = ry`. `rx` là chiều rộng của đường bo, `ry` là chiều cao của đường bo tròn. Mọi người tham khảo hình minh họa phía dưới để hình dung rõ hơn nhé:

![](https://images.viblo.asia/a332986b-5492-45ef-8106-b6301d4b1f17.png)


###  `<path>`
Thẻ vẽ đường. Đây là thẻ linh hoạt nhất, có thể vẽ mọi thứ bằng thẻ này, giống như dùng tay vẽ vậy. Và tất nhiên, nếu biết cách sử dụng thì hoàn toàn có thể dùng thẻ này để vẽ các hình trên, nhưng mà sẽ ko đơn giản như dùng trực tiếp thẻ như vậy :D. Chính vì sự linh động này, đây là thẻ phức tạp nhất để tìm hiểu. Mình đã nhiều lần từ bỏ trong lúc tìm hiểu vì quá đau đầu, mà các tài liệu tìm đọc thì đọc 1 hồi rối hết lên nên drop mấy lần rồi :D. Giờ mới quyết tâm quay lại và tìm được vài tài liệu dễ hiểu hơn.

`<path>` thì không có các attribute `x`, `y`, `points` như các thẻ trên, mà chỉ có attribute chính là `d` đại diện cho chữ 'data' (tất nhiên là còn attribute thông thường như `style`, `class`, `id`,... như các tag khác nữa). Và bên trong cái `d` này mới là sự phức tạp này. Để vẽ các đường nét thì tất cả thông tin dùng để vẽ sẽ được đặt trong thẻ d này
```html
<path d="M 10,30
       A 20,20 0 0,1 50,30
       A 20,20 0 0,1 90,30
       Q 90,60 50,90
       Q 10,60 10,30 z"/>
```
Bên trong attribute `d` này có các phần tử con chính như sau (lưu ý là đây vẫn là 1 đường liền, tức là điểm trước nối điểm sau, vẽ không nhấc bút cho tới điểm cuối cùng nhé: end point thằng trước là start point vẽ thằng sau): 
* M - move to: Đây là điểm bắt đầu đặt bút vẽ, đi kèm theo sau là cặp tọa độ của điểm đặt bút này.
```
M[point-x],[point-y]
VD: 'M282,360'
```
* L: viết tắt của 'Line', đi theo sau cũng là 1 cặp tọa độ, có nghĩa là từ điểm trước đó vẽ 1 đường thẳng tới điểm có tọa độ đi kèm
```
L[endPoint-x],[endPoint-y]
VD: 'L30,60'
```
* A: Arcs - Vẽ cung elip. Theo sau là 4 bộ tham số cách nhau bới dấu `space`: VD: `A 20,20 0 0,1 50,30` (có thể có cách viết khác các cặp tham số này, nhưng mình viết theo cặp dấu phẩy cho dễ phân tích)
    * Cặp thứ 1: theo thứ tự là `X radius` và `Y radius`, nếu `X radius = Y radius` thì sẽ là vẽ cung của đường tròn, còn nếu 2 tham số khác nhau thì sẽ là vẽ cung của đường elip. Xem hình `react` đã minh họa phía trên, thì `X radius` (`rx`) là độ cao đường cong. Trên thực tế thì đây là 1 góc tư của hình elip được vẽ với chiều cao elip = `2ry`, chiều rộng elip = `2rx`. Như vậy, cặp thứ 1 sẽ định nghĩa đường elip với chiều cao elip = `2 * Y radius` và chiều rộng = `2 * X radius`
    * Tham số tiếp theo là `x-axis-rotation`. Sử dụng để xác định cung tròn có 2 điểm bắt đầu và kết thúc là vị trí nào trên hình elip, cũng có thể hiểu là xoay hình elip các kiểu, và nó cắt trục Ox tại 2 điểm start point và end point khi quay được bao nhiêu độ. (Tất nhiên đơn vị là đơn vị đo góc: độ).
![](https://images.viblo.asia/db3e9eb1-d50d-483e-ab0e-c110f62a6ce5.PNG)


    * Cặp tham số tiếp theo:  Quyết định vẽ cung tròn to hay cung tròn nhỏ của đường elip, vẽ cung lồi hay cung lõm. Mỗi tham số sẽ nhận 2 giá trị: 0 hoặc 1. Tham số thứ 1: 'Large arc sweep flag'. Có nghĩa là chọn vẽ cung lớn hay cung nhỏ: 0 là chọn lấy cung nhỏ, 1 là chọn lấy cung lớn. Tham số thứ 2: 'Sweep flag'. Tham số này để chọn cung sẽ 'lồi' hay 'lõm' - hay có thể hình dung là phần nhiều diện tích hình elip sẽ ở trên hay ở dưới: 0 là elip có phần lớn 'chìm', còn 1 là elip với phần lớn hơn 'nổi lên'.
    ![](https://images.viblo.asia/11445682-21fd-46d5-96f9-0b720f52b261.PNG)

    * Cặp tham số cuối: xác định điểm cuối của elip. Điểm đầu của elip được xác định bằng điểm kết thúc của hình vẽ trước đó, nên điểm cuối elip này cũng sẽ là điểm bắt đầu vẽ của hình tiếp theo.
```
A[X-radius],[Y-radius] [x-axis-rotation] [large arc sweep flag],[sweep flag] [endPoint-x],[endPoint-y]
VD: 'A20,20 0 0,1 50,30'
```
* Q: Vẽ đường cong bậc 2 - Quadratic Bezier Curves. Đường này dùng để nối 2 điểm 1 cách "smooth" khi có 1 tiêu điểm. Với Q, bạn sẽ xác định 2 param: cặp tham số đầu tiên là tọa độ tiêu điểm, cặp tham số thứ 2 là tọa độ end point của hình vẽ. Với tiêu điểm được xác định và 2 điểm start point, end point, ta sẽ vẽ được 2 đường thẳng cắt nhau tại tiêu điểm. Để giải thích bằng lời thì khá dài dòng, mọi người hãy đọc thêm bài http://www.svgbasics.com/curves.html để hiểu về đường Quadratic Bezier Curves này nhé. Ngoài ra thì có thể đọc thêm bài này và thực hành luôn (rất có ích cho việc tìm hiểu phần tử C tiếp theo đây): http://apex.infogridpacific.com/SVG/svg-tutorial-lesson18-path-quadratics.html

![](https://images.viblo.asia/e51fa058-f8b0-408f-9f11-87f0c54a518e.PNG)

```
Q[controlPoint-x],[controlPoint-y] [endPoint-x],[endPoint-y]
VD: 'Q90,60 90,50'
```

* C: Cubic Bezier Curves - đường cong 2 control point. Đường Q chỉ có 1 control point để tạo nên 1 đường cong nằm hoàn toàn về 1 phía như kia, thì đường C có đến 2 control point, có thể tạo được đường cong nằm ở 2 nửa mặt phẳng tạo bởi 2 điểm đầu cuối. Mỗi điểm start point và end point sẽ có 1 control point tương ứng để điều khiển hình dạng. Mỗi control point giống như 1 cục nam châm, còn đường vẽ là 1 sợi dây chun gắn các hạt sắt trên dây vậy. Control point ở xa thì dây chun sẽ dãn ra và hướng về phía đó. Nếu đã từng sử dụng pen tool trong photoshop hoặc các công cụ của Adobe, bạn sẽ thấy nó chính là anchor point (điểm neo). Ai mà quen dùng pentool thì sẽ sử dụng đường C này master luôn, mình ko cần hướng dẫn gì cả :D. Pentool cũng là thứ có thể vẽ mọi thứ, nên đường C cũng vậy :D.

![](https://images.viblo.asia/4ab431cd-3448-4d36-b561-3a68a71afa80.jpg)
> Vẽ hình với các control point

Khi 2 control point nằm trên 1 đường thẳng, thì đường C tạo thành cũng là 1 đường thẳng. 

Đường C có 3 cặp tham số: Cặp đầu tiên là tọa độ Control point của start point, cặp tiếp theo là tọa độ control point của end point, cuối cùng là tọa độ end point
```
C[controlStartPoint-x],[controlStartPoint-y] [controlEndPoint-x],[controlEndPoint-y] [endPoint-x],[endPoint1-y]
VD: 'C3,63 61,5 121,5'
```
Để sử dụng đường C khá là phức tạp, cần phải xác định các điểm gần chính xác, nên nếu bạn nào có khả năng sử dụng pen tool vẽ hình trong đồ họa thì có thể tự vẽ được, còn nếu không thì ... mò vậy :D

Dưới đây là hình mình vẽ sử dụng pen tool của Adobe Illustrator vẽ theo hướng dẫn tạo control point như hình con sóc kia, nhân tiện kẻ lưới để dễ xác định point vẽ lại bằng svg (1 ô nhỏ = 5px, 1 ô lớn = 70px)

![](https://images.viblo.asia/661ea3e1-5d12-4982-9cf9-927bd886803c.PNG)

Và đây là thành quả sau khi phân tích tọa độ các điểm: https://codepen.io/bunnypi04/pen/jObqxRX

(Mình đã vẽ thêm grid bằng JS cho mọi người dễ hình dung và xác định tọa độ)
> Vì lý do chỉ cần thẻ `<path>` cùng `d` - data là có thể vẽ mọi hình rồi nên mình sẽ chỉ giới thiệu các thẻ tới đây thôi. (Theo kinh nghiệm vẽ rất nhiều hình bằng Adobe Illustrator của mình thì mình nói thế :D)

### Tổng hợp các Path Command

Dưới đây là danh sách các command để vẽ dành cho path data. Mỗi command được ký hiệu bởi 1 chữ cái, và theo sau là các bộ tham số. Các chữ cái viết hoa sẽ diễn giải tọa độ theo hệ tọa độ xOy thông thường (tức là tính từ góc trên cùng bên trái của đối tượng SVG bao nó là gốc tọa độ - Vị trí tuyệt đối), còn chữ cái viết thường sẽ có chức năng command tương tự nhưng với diễn giải tọa độ với gốc tọa độ là điểm endPoint ngay trước đó (vị trí tương đối). Giả sử so với gốc tọa độ O của đối tượng SVG: điểm M có tọa độ 5, 5; điểm N có tọa độ 15,15; thì vị trí tuyệt đối của N là 15, 15 (vì so với gốc tọa độ); còn vị trí tương đối của N khi M là điểm start Point của nó là 10, 10.


| Command | Params | Tên | Thông tin |
| -------- | -------- | -------- | ------|
| M     | x,y     | move to     | Di chuyển tới điểm x,y mà ko vẽ line |
| m     | x,y     | move to     | Cũng như trên nhưng x,y có gốc tọa độ điểm dừng bút trước đó |
| L     | x,y     | line to     | Vẽ 1 đường thẳng tới điểm x,y |
| l (L nhỏ, không phải i in hoa nhé)     | x,y     | line to     | Cũng là vẽ 1 đường thẳng nhưng điểm x,y  x,y có gốc tọa độ là điểm dừng bút trước đó|
| H      | x     | horizontal line to     | Vẽ 1 đường thẳng ngang từ điểm dừng bút trước đó (song song với Ox ấy) tới giao điểm với đường thẳng y = x|
| h      | x     | horizontal line to     | Vẽ 1 đường thẳng ngang từ điểm dừng bút trước đó (song song với Ox ấy) tới giao điểm với đường thẳng y = x-params nhưng gốc tọa độ là điểm dừng bút trước đó|
|V      | y     | vertical line to     | Vẽ 1 đường thẳng dọc từ điểm dừng bút trước đó (song song với Oy ấy) tới giao điểm với đường thẳng x = y-params|
|v      | y     | vertical line to     | Vẽ 1 đường thẳng dọc từ điểm dừng bút trước đó (song song với Oy ấy) tới giao điểm với đường thẳng x = y-params nhưng gốc tọa độ là điểm dừng bút trước đó|
|C      | x1,y1 x2,y2 x,y     | curveto     | Vẽ đường cong tới điểm (x,y) với control Start point là (x1,y1) và control End point là (x2, y2)|
|c      | x1,y1 x2,y2 x,y     | curveto     | Như trên nhưng gốc tọa độ là điểm dừng bút trước đó |
|S      | x2,y2 x,y     | curveto shorthand     | (Viết gọn) Vẽ đường cong C tới điểm (x1, y1) với control Start point trùng với control End point của đường trước nó, còn control End point là (x2, y2) |
|s      | x2,y2 x,y     | shorthand     | Như trên nhưng gốc tọa độ là điểm dừng bút trước đó |
|Q      | x1,y1 x,y     | quadratic Bezier curveto    | Vẽ đường cong  quadratic Bezier tới điểm (x, y) với 1 control point là điểm (x1, y1)|
|q      | x1,y1 x,y     | quadratic Bezier curveto    | Như trên nhưng gốc tọa độ là điểm dừng bút trước đó|
|T      | x,y     | quadratic Bezier curveto shorthand  | Vẽ đường Q nhưng control point trùng với control point cuối của đường vẽ trước nó.|
|t      | x,y     | quadratic Bezier curveto shorthand  | Như trên nhưng gốc tọa độ là điểm dừng bút trước đó|
|A      | rx,ry x-axis-rotation  large-arc-flag, sweepflag x, y   | elliptical arc  | Vẽ đường cong elip với điểm kết thúc đường là (x, y), với rx, ry lần lượt là chiều dài và chiều rộng elip, x-axis-rotation là độ nghiêng so với hình gốc, large-arc-flag là chọn đường cong lớn/nhỏ, sweepflag để chọn mặt phẳng chứa đường cong |
|a      | rx,ry x-axis-rotation  large-arc-flag, sweepflag x, y   | elliptical arc  | Như trên nhưng gốc tọa độ là điểm dừng bút trước đó |
|Z      | no param   | closepath  | đóng đường vẽ lại bằng cách nối thẳng về điểm đầu tiên của path, tạo 1 hình khép kín |
|z      | no param   | closepath  | Cũng thế chả khác gì cả |

### Thử thực hành
Mình có tìm được 1 link code pen khá hữu ích cho việc hiểu hơn về các thành phần L, C, Q, A ở trên, mọi người vào đây thử nhé: https://codepen.io/anthonydugois/pen/mewdyZ

## 1 số thuộc tính thường dùng của SVG
Toàn bộ các thuộc tính của SVG thì dài lắm, mọi người có thể xem bản đầy đủ tại [đây](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute). Dưới đây mình sẽ giới thiệu 1 số thuộc tính thường dùng
### Stroke
Stroke là thuộc tính về đườg vẽ line của bạn. Có các thuộc tính stroke như sau:
* `stroke`: Màu cho nét vẽ. VD: `<path stroke="red" d="M5,20 l215,0" />`
* `stroke-width`: Độ dày nét vẽ. VD: `<path stroke="red" stroke-width="2" d="M5,20 l215,0" />`
* `stroke-linecap`: Dạng đầu mút nét vẽ. VD: `<path stroke-linecap="butt" d="M5,20 l215,0" />`

![](https://images.viblo.asia/8b05ca40-7743-4a20-9f49-b1264c29777f.PNG)

* `stroke-linejoin`: Hình dạng góc gấp khúc. VD: https://jsfiddle.net/api/mdn/
* `stroke-dasharray`: Nét đứt. Tạo nét đứt với các param lần lượt là độ dài nét, tiếp theo là độ dài khoảng trắng tiếp, cứ lặp lại như vậy. VD: https://www.w3schools.com/graphics/tryit.asp?filename=trysvg_stroke3
* `stroke-opacity`: Độ trong suốt nét vẽ
### Fill
Fill là thuộc tính chọn màu, đổ màu cho hình SVG, kể cả hình có kín hay không. VD: `<circle cx="150" cy="50" r="40" fill="tomato" />`. Ngoài ra còn có `fill-opacity` để set độ trong suốt cho màu nữa.
### Opacity
Như cái tên, thuộc tính này quyết định độ trong suốt cho cả hình SVG, bao gồm các thành phần thẻ bên trong, và cả đường viền lẫn màu nền.
### ViewBox
Với `viewBox`, SVG sẽ quy định giới hạn cho bạn nhìn thấy cái gì trên ảnh SVG này. VD bạn có 1 ảnh SVG mẫu, nó khá nhiều chi tiết nhưng bạn chỉ muốn dùng 1 chi tiết nhỏ trên đó, mà lại ngại ngồi phân tích điểm để xóa các chi tiết thừa (hoặc là ảnh SVG phức tạp thì mò bục mặt), vậy thì bạn chỉ cần tìm vị trí điểm đó so với ảnh SVG gốc, giới hạn khung chữ nhật đó hiện ra thôi, "ẩn" hết các thứ ngoài box đó. Ứng
dụng phổ biến nhất chính là SVG Sprites: 1 bộ icon vẽ bằng SVG trên 1 tấm SVG, rồi các icon sẽ là view box chỉ hiện 1 icon tương ứng, các cái còn lại ẩn hết. Nhờ vậy mà web chỉ cần load 1 tấm ảnh SVG và sử dụng cho tất cả các icon thay vì mỗi icon load 1 tấm ảnh.
# Hiệu ứng vẽ chữ
Sau khi tìm hiểu kha khá về SVG (tất nhiên là chưa đủ hết được :D), thì chỉ với nhiêu đó thì có thể quay trở lại mục đích ban đầu, đấy là hiệu ứng vẽ chữ, và tất nhiên hiệu ứng không dùng JS :D.

Đầu tiên cần vẽ cái chữ đã. Chữ `moon` trên kia mình vẽ dùng toàn nét cơ bản, sử dụng line, đường cung nửa hình tròn, hình tròn. Kết quả có hình SVG như sau:

```html
<svg viewBox="0 0 1000 1000">
    <path d="M100,300
            L100,200
            A50,50 0 0,1 200,200
            A50,50 0 0,1 300,200
            L300,300"
      stroke="black" fill="none"/>
    <circle cx="425" cy="225" r="75" stroke="black" fill="none"/>
    <circle cx="625" cy="225" r="75" stroke="black" fill="none"/>
    <path d="M750,300
            L750,200
            A50,50 0 0,1 850,200
            L850,300"
      stroke="black" fill="none"/>
</svg>
```

Giờ mới là phần hay này. Làm thế nào để nó chạy nét? Để có hiệu ứng thì tất nhiên sẽ sử dụng animation rồi. Mình sẽ chọn animation đặt tên là `draw`, thời gian chạy hiệu ứng là 5s, chọn `infinite` cho loop vô hạn, và `linear` để tốc độ chạy hiệu ứng đều như vắt chanh :D.

```css
animation: draw 5s infinite linear;
```

Để có chạy vẽ từng nét, mình cheat 1 chút, lợi dụng `stroke-dash` để tạo ra nét chữ và "nét trong suốt". Như vậy, hiệu ứng vẽ kia thực ra là các dash chạy qua chữ thôi. 

![](https://images.viblo.asia/6549df95-94e1-4abc-934d-abdf0228c52e.PNG)

Để cho nét vẽ được hết chữ, chọn đường dash dài sao cho đảm bảo dài hơn độ dài nét mỗi chữ, với hình kia mình đặt là 800 luôn:
```css
stroke-dasharray: 800;
```

Nhưng mà hiện tại nó sẽ hiển thị chữ rồi mất dần như nét tẩy, chứ chưa phải là từ "không thành có", vẽ ra chữ. Do vậy mình đặt tiếp 1 thuộc tính nữa: `stroke-dashoffset` để lùi điểm bắt đầu vẽ nét dash lại. Cũng đặt là 800 luôn cho chắc chắn là nó bay hết khỏi chữ :D. Do mình muốn hiệu ứng cho mỗi chữ cái, nên tất các các thẻ đường vẽ con đều chung css hiệu ứng vẽ luôn:

```css
path, circle {
   stroke-width: 10px;
   stroke: black;
   fill: none;
   stroke-dasharray: 800;
   stroke-dashoffset: 800;
   animation: draw 5s infinite linear;
}
```

Cuối cùng là chạy hiệu ứng. Giờ sử dụng keyframe đưa về dash offset về 0 khi hết thời gian hiệu ứng là được:
```css
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
```
Vậy là giờ có thành quả như đầu bài rồi

![](https://images.viblo.asia/c8488def-bf17-459a-ad19-03338bd99ed8.gif)

Mọi người test thử ở đây nhé: https://codepen.io/bunnypi04/pen/MWayaam

(Mình đã vẽ thêm grid bằng JS cho mọi người dễ hình dung và xác định tọa độ)

# Ứng dụng SVG - kết
SVG thì có nhiều công dụng lắm, VD như bộ icon icomoon chính là sử dụng svg sprites này, hay các icon trên các page họ cũng thường dùng ảnh SVG, bạn cũng có thể tự tạo bộ icon riêng nữa :). Ngoài ra thì vì vector bảo toàn độ nét, mà lại nhẹ hơn ảnh thường nên SVG cũng được dùng thay thế các hình ảnh đơn giản để giảm tải cho trang web (trừ trường hợp ảnh phức tạp như mình bảo ngay đầu bài nhé). 1 số người như mình thì thích tối thiểu js, mà thích mấy thứ hay ho như vẽ chữ kia thì cũng dùng cái này làm cho trang web trông ngầu hơn, mà lại không tải nặng chi chít js hay video hình ảnh.

Có 1 vài công cụ render SVG mình search được tại [đây](https://css-tricks.com/tools-visualize-edit-svg-paths-kinda/). Mặc dù không perfect, nhưng mà có thể dùng làm công cụ để thuần thục vẽ SVG này. Ngoài ra bạn cũng có thể export các hình ảnh thường ra SVG bằng các Graphic tool nữa đấy, tuy nhiên là khi đó vector sẽ không bảo toàn nét tuyệt đối như khi vẽ tay được :D. 1 cách để lấy code SVG từ 1 ảnh SVG bất kỳ đấy là mở file SVG ảnh bằng trình soạn thảo code, bạn sẽ nhậ được đoạn code của file SVG đó, hình ảnh vốn mang tính vector thì sẽ cho ra file SVG chính xác nhất.

Hy vọng bài viết đạt được mục đích "hiểu svg dễ dàng hơn" cho nhiều bạn mới tìm hiểu SVG :D
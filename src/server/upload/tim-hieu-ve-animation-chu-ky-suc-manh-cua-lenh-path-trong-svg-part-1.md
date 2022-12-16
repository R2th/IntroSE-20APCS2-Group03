*Ngày nay, các trình duyệt người dùng hiện nay ngày càng tân tiến, tỉ lệ trình duyệt hỗ trợ SVG ngày càng cao, nên chúng ta có thể thoải mái tận dụng toàn bộ sức mạnh của SVG mà không phải lo nghĩ quá nhiều :D 
Còn sức mạnh của SVG là gì á? Thật sự thì nhiều lắm :D Nhưng trong đó nổi bật nhất (ít nhất là với mình) thì vẫn là khả năng biến hóa khôn lường, tạo ra các effect khiến người dùng say mê. Và trong bài viết này, chúng ta sẽ thử tìm hiểu về hiệu ứng **Chữ ký** nhé.*

![](https://images.viblo.asia/87ca5f58-ca54-41fd-a472-8d3558e06edd.gif)

Mình đoán là sẽ nhiều bạn bảo là *Tại sao không dùng ảnh GIF cho xong mà đi dùng SVG làm chi ?_?*. Thật sự thì, file GIF rất nặng, FPS cà giật, mỗi lần tùy biến là phải ngồi export lại file GIF, nói chung là đấy là phương án kém tối ưu, nhưng rất dễ :D Còn nếu về mặt tối ưu thì SVG tốt hơn nhiều :D.
OK vậy bắt đầu thôi nhỉ.

# Ý tưởng hiệu ứng chữ ký

Như các bạn đã biết trong SVG có rất nhiều thể loại Vector hình học như là `<rect>` (Khối vuông), `<line>` (Đường thẳng), `<circle>` (Đường tròn), ... Mỗi cái sẽ giúp ta dựng lên một hình riêng.
Vậy chúng ta sẽ tạo ra một **đường tổ hợp** với SVG, sao cho trông nó giống như đường chữ ký mà tay bạn viết vậy - 1 đường phức tạp uốn lượn, liền mạch và đẹp mắt, có điểm đầu và điểm cuối.
Sau đó ta sẽ cho nó animate hiện dần cái đường tổ hợp đó.

Ảnh minh họa dưới đây vẽ bằng paint nên trông không thẩm mỹ cho lắm, các bạn thông cảm :rofl:

![](https://images.viblo.asia/92d1177a-6a0a-4345-be70-800a909c5ab5.jpg)

Vậy làm sao để vẽ **đường tổ hợp**, ta sẽ dùng `<path>`. Theo W3S,
> 
> SVG Path - `<path>` element is used to define a path.
> 
> The following commands are available for path data (Các lệnh sau đây dùng để vẽ đường):
> 
> M = moveto (Di chuyển đến, giống như ta nhấc bút ra và đặt bút vào một điểm nào đó trên tờ giấy vậy)
> 
> L = lineto (Kẻ đường thẳng đến tọa độ nào đó, giống như ta từ một điểm đặt bút trước đó, rê bút vẽ 1 đường thẳng đến tọa độ mới)
> 
> H = horizontal lineto (Kẻ đường thẳng ngang)
> 
> V = vertical lineto (Kẻ đường thẳng dọc)
> 
> C = curveto (Đường cong)
> 
> S = smooth curveto (Đường cong mượt)
> 
> Q = quadratic Bézier curve (Đường cong Bezier)
> 
> T = smooth quadratic Bézier curveto (Đường cong Bezier mượt)
> 
> A = elliptical Arc (Cung elip)
> 
> Z = closepath (Đóng đường)
> 


Ví dụ điển hình: 
![](https://images.viblo.asia/63351dc7-67b0-409d-a613-d53aed512cfe.PNG)

*Lưu ý: mỗi lệnh vẽ Path đều có 2 kiểu là chữ thường và chữ hoa, ví dụ L và l. Cả 2 đều là lệnh Lineto - nối đường, nhưng sự khác biệt là dạng chữ hoa luôn nhận tọa độ điểm đích theo dạng **ABSOLUTE** (báo tọa độ điểm đích ở đâu, nối đến đó) , trong khi bản thường là **RELATIVE**. (báo tọa độ ở đâu, nó sẽ từ tọa độ điểm đặt bút gần nhất cộng với tọa độ được khai báo. Ví dụ: đầu tiên bạn khai báo **M10,10**, bạn sẽ bắt đầu tại tọa độ là **X:10, Y:10**. Sau đó bạn báo **l 50 50** thì cái đường thẳng đấy sẽ không nối đến tọa độ (50,50) mà sẽ nối đến tọa độ (10 + 50, 10 + 50), tức là (60, 60) đó )*

(Để ý kỹ phần path với cú pháp trong attribute tên là d, ta thấy gồm các lệnh để vẽ path như M, l, q... với các tọa độ x y của các điểm)
```
<svg height="400" width="450">
  <path id="lineAB" d="M 100 350 l 150 -300" stroke="red"
  stroke-width="3" fill="none" />
  <path id="lineBC" d="M 250 50 l 150 300" stroke="red"
  stroke-width="3" fill="none" />
  <path d="M 175 200 l 150 0" stroke="green" stroke-width="3"
  fill="none" />
  <path d="M 100 350 q 150 -300 300 0" stroke="blue"
  stroke-width="5" fill="none" />
  <!-- Mark relevant points -->
  <g stroke="black" stroke-width="3" fill="black">
    <circle id="pointA" cx="100" cy="350" r="3" />
    <circle id="pointB" cx="250" cy="50" r="3" />
    <circle id="pointC" cx="400" cy="350" r="3" />
  </g>
  <!-- Label the points -->
  <g font-size="30" font-family="sans-serif" fill="black" stroke="none"
  text-anchor="middle">
    <text x="100" y="350" dx="-30">A</text>
    <text x="250" y="50" dy="-10">B</text>
    <text x="400" y="350" dx="30">C</text>
  </g>
</svg>
```

## Vẽ chữ ký
Mình đã giới thiệu về SVG và path rồi, giờ sẽ là lúc ta code thử.

Bắt đầu vẽ: 
* M 15 10 :  Đặt bút tại tọa độ 15,10
* L 15 30 : Từ điểm 15,10 ta nối đến 15,30 - Thu được một đường dọc dài 20 đơn vị
* Q 7 40 11 13: Từ điểm 15,30 trước đó, nối đến điểm 11,13, với điểm điều khiển (Control Point) nằm ở 7,40 tạo ra đường cong lên trên
* Q 13 7 25 12 : Tiếp tục kẻ tiếp đường cong đến tọa độ 25,12 với CP là 13,7
* blah blah....
Vẽ hộc cả bơ và đây là thành quả ...
{@embed: https://codepen.io/terry-do/pen/xxKyXZM}

Như các bạn thấy đó, quá tốn thời gian để ngồi tưởng tượng tọa độ, nối cho đến khi hoàn chỉnh được cái chữ ký ‾\_(ツ)_/‾ . Vậy có cách nào nhanh hơn không? Câu trả lời là có nhé :slightly_smiling_face: Có vài cách:

1. Dùng Adobe Illustrator để vẽ Path rồi xuất ra file SVG (Ngạc nhiên chưa :relieved: đến lúc mở miệng ra nhờ vả Designer rồi đấy haha)
2. Lên Google tìm từ khóa SVG Path Generator, sẽ có rất nhiều tool giúp bạn công việc này, thậm chí có cả tool sinh ra cả chữ ký lẫn animate hộ bạn luôn đấy, nhưng mình không chỉ đâu :stuck_out_tongue_winking_eye:

Dùng cách nào cũng được, ở đây mình sẽ dùng Illustrator để vẽ. Ở đây ta sẽ dùng Pen tool để vẽ đúng 1 đường chữ ký liền mạch từ đầu đến cuối. Sau đó vào File -> Save As -> Lưu dạng SVG.

![](https://images.viblo.asia/f9967511-0808-44bf-9a21-12fb6dc614ec.PNG)

Kết quả thu được: 
{@embed: https://codepen.io/terry-do/pen/QWLZOYe}

## To be con tờ niu (Còn tiếp)
Cảm ơn các bạn đã đọc bài viết của mình. Trong phần tiếp theo, mình sẽ giải thích nốt về cách tạo Animation cho cái path trên, cũng như cách tùy chỉnh tốc độ ký, những điều cần lưu ý,... Nếu bài viết trên có sai sót, mong các bạn thông cảm và chỉ giúp mình.

Peace :v:
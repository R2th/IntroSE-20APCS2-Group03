# Mở đầu
Tiếp theo bài trước, bài lần này sẽ là về việc ứng dụng 3d vào thực tế cho website của chúng ta.
# Mockup website 3d on hover
## Giới thiệu
Mock up là mô hình thu nhỏ, là hình ảnh mô phỏng mẫu thiết kế của Designer xuất hiện thật ngoài đời – được tạo ra dưới dạng file vector hoặc PSD được thiết kế sẵn. Tuy nhiên ở đây mình sử dụng nó như 1 bản vẽ thiết kế có khả năng 'nổi' trên trang web. Bản mock up này có thể bao gồm cả hình ảnh, cụ thể các 'lớp' mà bạn muốn đặt trong thiết kế của mình. Trong VD này, đơn giản mình dùng toàn hình khối vẽ bằng SVG (xem thêm cách vẽ SVG tại [đây](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-4-ve-bang-svg-Qpmlea0Nlrd)).

![](https://images.viblo.asia/96a64fe9-b757-4952-bb41-cec37e75edf6.png)

Như đã thấy, bài của mình làm 3 lớp, mỗi lớp sẽ ở 1 'tầng' riêng nổi lên. Tất nhiên làm bao nhiêu lớp là tùy ý mọi người :)
## Tạo hình phẳng

Trước hết, cần tạo hình ban đầu cho mock up đã. Hình mình vẽ ra như thế này:

![](https://images.viblo.asia/4a48e8d9-92f4-4c61-b58d-3bf2c79e3597.png)

Với mỗi layer mà bạn muốn, hãy group riêng cho lớp đặt tên class là 'layer-x' để sau đó dễ dàng style cho cả layer đó:
```html
<div class="container">
  <svg class="layer-1"> /* layer 1: là cái nền */
    <path class="layout" d="M50,50 L650,50 L650,500 L50,500 z" />
  </svg>
  <svg class=" layer-2">/* layer 2: gồm các ô chữ nhật màu hồng nhạt hơn */
    <path class="h1"
          d="M120,100 L580,100 L580,150 L120,150 z
             M120,170 L580,170 L580,190 L120,190 z
             M120,210 L340,210 L340,400 L120,400 z
             M420,210 L580,210 L580,250 L420,250 z
             M360,270 L580,270 L580,400 L360,400 z
             M120,420 L580,420 L580,450 L120,450 z"/>
    <circle class="ava" cx="380" cy="230" r="20"/>
  </svg>
  <svg class="layer-3"> /* layer 3 gồm ảnh, hình tròn, và chữ */
    <path class="text"
          d="M390,300 L550,300 L550,302 L390,302 z
             M390,315 L550,315 L550,317 L390,317 z
             M390,332 L550,332 L550,334 L390,334 z
             M390,349 L550,349 L550,351 L390,351 z
             M390,366 L550,366 L550,368 L390,368 z
             M250,435 L450,435 L450,437 L250,437 z"/>
    <path class="image"
          d="M150,250 L310,250 L310,360 L150,360 z
             M170,360 L210,315 L250,360 z
             " />
    <path class="image"
          d="M220,360 L270,300 L310,340 L310,360 z"/>
    <circle class="image" cx="185" cy="275" r="10" />
  </svg>
</div>
```
còn đây là css tham khảo
```css
body {
  background-color: white;
  position: relative;
}
svg {/* Do svg tự vẽ nên phải define chiều dài rộng để hiển thị được hết */
  width: 700px;
  height: 600px;
  top: 25vh;
  left: 10vw;
}
path, circle {
  stroke: #e12345;
  stroke-width: 2px;
  fill: #ec5252;
}
.h1, .ava {
  stroke: #ec5252;
  fill: white;
  opacity: .8;
}
.text, .image {
  fill: white;
  stroke: #ec5252;
  stroke-width: 2px;
}
.container {
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); /* giữ nguyên vị trí*/
  width: 50vw;
}
.layer-1, .layer-2, .layer-3 {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
}
.layer-1 {
  opacity: 0.5;
}
.container svg, .container {
  transform-style: preserve-3d;
}
```
Nếu sử dụng hình ảnh cho mockup, thì chỉ cần thay thẻ `svg` bằng thẻ `img` kèm link ảnh là được.

Chú ý dòng này
```css
.container {
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); /* giữ nguyên vị trí*/
}
```
Do mình đang làm hình ảnh phẳng trực diện bình thường, nên đặt bằng 0 hết. Tiếp theo đây, số góc mỗi params sẽ quyết định độ 'nghiêng' của mockup so với mắt nhìn.

Để các layer bên trong sẽ di chuyển theo thằng cha, và các layer có thể nhìn thấy được chồng lên nhau, mình sử dụng position absolute:

```css
body {
  position: relative;
}
.layer-1, .layer-2, .layer-3 {
  position: absolute;
}
```

Hiện giờ, sau vài công cuộc css sao cho các item trong bản mock đã hiển thị đúng vị trí mong muốn, việc tiếp theo là làm nó 'nghiêng'.

Do mình đã bao ngoài toàn bộ bằng `.container`, vì vậy giờ làm thằng cha nghiêng là các item bên trong sẽ cũng nghiêng theo. Giờ chỉ cần đổi góc ở container phía trên từ 0 thành góc nào mình thấy vừa mắt là được. Công cuộc này đôi khi phải 'mò' và cảm nhận :D
```css
.container {
  transform: rotateX(50deg) rotateY(0deg) rotateZ(-15deg);
}
```

![](https://images.viblo.asia/79b6b036-a14b-40c7-8e39-60a2aa78698b.png)

## Chèn hiệu ứng '3d layer'

Hiện tại thì bạn có thể thấy hình mock up của chúng ta đã nghiêng rồi, nhưng mà chưa nhìn thấy các 'layer' khác nhau đâu cả :D. Đấy là do từ lúc tạo tới bây giờ các layer đang 'dính' vào cha nó là `.container`. Lúc này chỉ cần cho mỗi lớp dịch chuyển 3d 1 chút là được. Mỗi 1 layer sẽ được dịch chuyển khác nhau, layer 1 thì cứ giữ nguyên vậy, layer 2 sẽ 'dịch chuyển' nổi lên trên layer 1 thêm 1 chút, layer 3 lại thêm 1 chút nữa. Tất nhiên là dịch chuyển vị trí thì mình sẽ dùng `transform: translate;`
```css
.container .layer-2 {
  transform: translateX(0px) translateY(60px) translateZ(120px);
}
.container .layer-3 {
  transform: translateX(0px) translateY(60px) translateZ(180px);
}
```
Sở dĩ đến đây mới dịch chuyển các lớp tạo hiệu ứng 3d, bởi vì nếu hướng dẫn bạn dịch ngay từ bước trước khi làm nghiêng, thì về lý thuyết là mình tạo đúng không gian 3 chiều cho lớp, rồi dịch chuyển cả 3 lớp như 1 group cùng lúc. Còn như hiện tại giống như mò miễn cưỡng tạo ra trông như mockup vậy. Tuy nhiên nếu làm như vậy thì khi đang ở mặt chiếu đứng, nhìn khó mà nhận ra được mỗi lớp đã dịch lên bao nhiêu rồi, và cũng khó kiểm soát được khoảng cách các layer sao cho góc nghiêng mình muốn thì layer tách ra đủ đẹp. Vì vậy ko nên cố tạo đúng ngay từ bước đầu nhé :D.

Và do mình tạo khoảng cách giữa các mặt phẳng lớp, nên việc chính sẽ là translateZ. Tuy nhiên là ở đây mình thấy chưa đẹp nên add thêm translate Y vào nhìn cho 3 lớp tách biệt rõ ràng

Vậy coi như là đã xong. Nhưng theo mình thấy thì để vậy khá nhàm chán, nên đã đổi qua là mock up thay đổi góc khi hover vào. Như vậy bày lên trang web sẽ gây ấn tượng hơn nhiều. Dưới đây là bài code chi tiết của mình:

https://codepen.io/bunnypi04/pen/yLeQpLr
{@embed: https://codepen.io/bunnypi04/pen/yLeQpLr}

# Isometric Model
## Giới thiệu
Ví dụ ứng dụng tiếp theo dựa vào 1 kiểu hình ảnh gọi là Isometric. Nói một cách ngắn gọn thì Isometric là phương pháp miêu tả vẻ ngoài của các đối tượng ba chiều trong không gian hai chiều, là 1 phương pháp vẽ tạo hiệu ứng 3D mô phỏng dựa trên kích thước thực tế. Bảng vẻ gồm có 3 mặt điều theo kích thước các cạnh, trong đó ba trục tọa độ xuất hiện như nhau và góc giữa bất kỳ hai trong số đó là 120 độ.. Isometric thực tế được áp dụng rất nhiều, tạo cảm giác 3d cho hình ảnh, điển hình là mấy game kiểu nhà hàng mình hay chơi :D. Có thể sử dụng từ khóa Isometric để hình dung rõ hơn về nó nhé:

![](https://images.viblo.asia/493005c8-1d03-41d0-9dac-3431bdf0c689.png)

## Base
Về cơ bản cách dựng, thì sẽ giống với cách tạo mock up ở trên:
 - Vẽ ra hình phẳng ban đầu
 - Chọn góc nghiêng cho 'mặt đất' chứa toàn bộ đối tượng
 - Nâng các layer lên độ cao mong muốn

Việc khó nhất là chọn góc nghiêng đủ để có hiệu ứng Isometric. Trong [bài trước](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-2-transforms-4dbZNpNg5YM#_3d-transform-10) mình cũng có giới thiệu về `rotate()` trong 3d rồi, dưới này sẽ dẫn hình ảnh cho dễ hình dung cần quay như nào nhé:

![](https://images.viblo.asia/75ed8c73-318c-4788-83d7-e388cdb5b2a8.png)

Mình tạo mẫu hình phẳng như sau:
```html
    <div class="isometriccontainer">
        <div class="isometric isometric-col-1"> /* tạo hẳn cột 3 cái cho dễ nhìn */
            <div class="isometric-item"></div>
            <div class="isometric-item"></div>
            <div class="isometric-item"></div>
        </div>
   </div>
```
```css
.isometriccontainer {
    opacity: 1;
    position: absolute;
    left: 10%;
    top: 5%;
    display: block;
    width: 1050px;
    margin-right: auto;
    margin-left: auto;
}
.isometriccontainer, .isometric, .isometric-item {
    transform-style: preserve-3d;
}
.isometric {
    float: left; /* để 3 tờ giấy nó đứng cạnh nhau */
}
.isometric-item {
    width: 120px;
    height: 120px;
    margin-right: 20px;
    margin-bottom: 20px;
    border: 1px solid #2974c2;
    border-radius: 3px;
    background-color: #fff;
}
```
## Xử lý

Đây là hình mẫu mình dự định làm (đơn giản cho dễ hiểu :D)

![](https://images.viblo.asia/22c1b661-a7cf-4f05-91a1-8ad3ea458fe9.png)

Nhìn vào hình ảnh này thì có thể biết được rằng mình cần xoay 2 trục: 
 - Trước hết là trục X để làm 'mặt phẳng (tờ giấy) đang đứng trước mặt sẽ nằm xuống làm nền nhà'
 - Tiếp theo trục Z để xoay cho góc tờ giấy đang từ mé bên trái (hoặc phải) chạy ra khoảng giữa tờ giấy (do ở đây mình làm giấy hình vuông).

Theo như lý thuyết, thì 3 trục của hệ tọa độ sẽ cách nhau đều 120 độ. Tuy nhiên với việc nghiêng mặt phẳng 'nền nhà' là mặt phẳng x 1 góc bất kỳ theo hình hướng dẫn xoay, thì các góc so với Oxy sẽ không chính xác là góc 120 độ so với Oy tiêu chuẩn. Tại đây, mình chọn nghiêng theo trục Z đi 45 độ (`rotatexZ(45deg)`). tất nhiên `rotateY` vẫn để bằng 0, thì sẽ có kết quả là đường chéo hình vuông đang trùng vào trục Oy luôn. Lúc này, bạn có thể tùy ý xoay theo Ox bao nhiêu cũng được, độ xoay theo Ox này sẽ quyết định hiệu ứng mắt chúng ta so với 'nền nhà như thế nào.

![](https://images.viblo.asia/6fa7990b-b7fb-411e-af26-76756d3b7fd4.png)

Giờ mình test xem nhé: cho thằng cha nó xoay là các thằng con absolute sẽ được ăn theo:
```css
.isometriccontainer {
    transform: rotateX(45deg) rotateY(0deg) rotateZ(-45deg);
}
```
Lúc này thì đã đạt được thành quả dự định rồi :D

![](https://images.viblo.asia/22c1b661-a7cf-4f05-91a1-8ad3ea458fe9.png)

Và tất nhiên, để nguyên thế thì chán, mình lại cho thêm tí hiệu ứng hover cho hấp dẫn:
```css
.isometric-item:hover {
    box-shadow: 0px 0px 0 0 #ffffff1a;
    transform: rotateX(-90deg) translate3d(0px, -50px, 10px);
}
/* và cho tí transition vào cho chuyển động mượt */
.isometric {
    transition: transform 2000ms linear 0s;
}
```

Cuối cùng là thành quả:

https://codepen.io/bunnypi04/pen/wvMQZBj

{@embed: https://codepen.io/bunnypi04/pen/wvMQZBj}
# 3D builder tools
## Tridiv
Trong quá trình tìm hiểu các ứng dụng về 3d, mình có tìm được 1 tool khá hay ho và hữu ích nếu kiên trì và biết cách sử dụng: đó là 
http://tridiv.com/

Với công cụ này, bạn sẽ vẽ ra các hình khối cơ bản, sau đó ứng dụng sẽ render ra css và style tương ứng cho những gì vừa tạo. Trong đây chỉ có sẵn các hình: Khối trụ, Khối hộp 6 mặt, Kim tự tháp, và lăng trụ (chẳng biết gọi có đúng không nữa :D)

Tuy nhiên, việc bắt đầu sử dụng tool này có chút (confused), vì vậy mình sẽ hướng dẫn sơ qua cách dùng
### Chú ý trước khi sử dụng
Như bài trước đã nói, trong 3D ngoại trừ hình tròn và border-radius ra thì ko tạo được gì 'cong' cả. Trong bài trước cũng có hướng dẫn 'fake' các mặt cong cho các bạn. Vì vậy, tool này cũng ko tạo được hình cong :D. Hình trụ trên thực tế ở đây tạo từ 2 mặt đáy tròn + mặt bên cấu tạo từ các hình chữ nhật.

![](https://images.viblo.asia/14dea604-dd29-4dfc-976b-e7bab9663022.png)

Vậy nên đừng mong chờ gì vào mấy mặt cong này nó đẹp nhé :D

### Hướng dẫn sử dụng

Khi mở app lên, sẽ có 4 màn hình để quan sát vật 3D: Màn hình dạng Isometric, màn hình mặt chiếu đứng, màn hình mặt chiếu bằng, màn hình mặt chiếu bên. Các màn hình đều có thể di chuyển trục tọa độ. Riêng mặt Isometric thì có thể thay đổi góc nhìn bằng cách giữ move chuột.

Bắt đầu này.

![](https://images.viblo.asia/3c50c7cb-3007-4b3a-898c-6232cd54347d.png)

Mình sẽ sử dụng hình kim tự tháp đơn giản này để làm mẫu. Phân tích ra thì nó sẽ gồm: mỗi tầng là 1 hình hộp chữ nhật, cái thang thì là hình lăng trụ tam giác, chỉ vậy thôi.

Để bắt đầu mình tạo tầng 1 trước. Bấm vào button 'add cuboid' sẽ cho mình 1 hình hộp chữ nhật. Mặc định ban đầu tạo nếu ko kéo thả gì thì tâm hình sẽ là gốc của hệ tọa độ.

![](https://images.viblo.asia/86974404-95aa-46f9-be65-6f86cc0a7dd1.png)

Hãy nhìn sang thanh tool bên phải, có các thông số như sau:
 - Zoom: zoom lớn nhỏ để nhìn hình khoảng cách gần hơn (perspective nhỏ hơn)
 - Snap to grid: Bật 'On' để khi di chuyển hình sẽ chỉ di chuyển theo 1 đơn vị định nghĩa ở snap. Như vậy để dễ dàng căn vị trí chính xác hơn
 - Snap: Đơn vị để di chuyển. Snap này sẽ được vẽ dạng lưới, là mắt lưới nhỏ nhất trên lưới cả các màn hình đang nhìn thấy. Hiện tại đang để 0.5, tức là khi Snap to Grid là On, đơn vị dịch chuyển nhỏ nhất là 0.5px.
 - Type: dạng của khối đang chọn
 - Name: đặt tên các khối cho dễ nhận biết, sau khi render sẽ dùng làm tên class luôn
 - x, y, z: là tọa độ tâm của khối trên không gian.
 - w, h, d: là chiều rộng, chiều cao và độ dày của khối
 - x deg, y deg, z deg: độ nghiêng theo các mặt (giống rotate, đơn vị là deg)
 - corner: bo góc. Tất nhiên là ko tạo được đường cong nên đây sẽ là các mặt chữ nhật ghép như hình trụ ở trên rồi :D
 - Shape style: opacity: Độ 'trong suốt' của khối
 - Colors: nếu muốn khối có các mặt là màu gì thì mở lên và sửa màu tương ứng
 - Images: Thay vì các mặt màu đơn, có thể thay bằng cách background-image bằng cách mở cái này và thay tương ứng.

Thực tế thì bạn có thể chỉnh trực tiếp kích thước bằng cách bấm vào mỗi hình, sẽ có thể kéo dãn các chiều (tương ứng tại các màn hình chiếu có thể hiện mặt đó), hoăc chỉnh vị trí bằng cách kéo thả tới nơi. Tuy nhiên, để chính xác nhất thì nên sử dụng tools bar này nhé.

Vị trí tâm x, y, z tất nhiên là bạn có thể đặt nó ở bất kỳ đâu, nhưng nên chọn sao cho tất cả các hình dễ căn chỉnh nhất: gần gốc tọa độ. Như hình của mình có tâm đối xứng, vì vậy mình chọn trục thẳng đứng với x = 0 và z = 0 làm tâm cho hầu hết các hình.

Lúc này thì vẽ hình ra dễ dàng có hình này:

![](https://images.viblo.asia/af14e779-8cf5-4fdc-ac01-a6850e50fd4e.png)

Xem kết quả của mình tại [đây](http://tridiv.com/app/index.html?dmlldz1wcmV2aWV3JmRvYz17InNldHRpbmdzIjp7Im5hbWUiOiJQeXJhbWlkIiwibGlnaHQiOiJzdGF0aWMiLCJzaGFkZSI6Ii4zIiwidGludCI6Ii4xNSIsImJvcmRlciI6IjAuNCIsImJnIjoidHJhbnNwYXJlbnQiLCJzbmFwIjoib24iLCJtYXRjaCI6MC41LCJ6b29tIjoiNjIuNSJ9LCJzaGFwZXMiOlt7InR5cGUiOiJjdWJvaWQiLCJ4IjoiMCIsInkiOiItMC41IiwieiI6IjAiLCJ3IjoiMTYiLCJoIjoiMTYiLCJkIjoiMSIsInJ4IjoiOTAiLCJjQWxsIjoiIzY1NjA0YiIsImNUcCI6IiM2NTYwNGIiLCJjTHQiOiIjNjU2MDRiIiwiY1J0IjoiIzY1NjA0YiIsImNGdCI6IiNjN2JmYTQiLCJjQmsiOiIjNjU2MDRiIiwibmFtZSI6ImN1Yi0xIn0seyJ0eXBlIjoiY3Vib2lkIiwieCI6IjAiLCJ5IjoiLTIuNSIsInoiOiIwIiwidyI6IjEyIiwiaCI6IjEyIiwiZCI6IjEiLCJyeCI6IjkwIiwiY0FsbCI6IiM2NTYwNGIiLCJjRnQiOiIjYzdiZmE0IiwibmFtZSI6ImN1Yi0yIn0seyJ0eXBlIjoiY3Vib2lkIiwieCI6IjAiLCJ5IjoiLTMuNSIsInoiOiIwIiwidyI6IjEwIiwiaCI6IjEwIiwiZCI6IjEiLCJyeCI6IjkwIiwiY0FsbCI6IiM2NTYwNGIiLCJjRnQiOiIjYzdiZmE0IiwibmFtZSI6ImN1Yi0zIn0seyJ0eXBlIjoiY3Vib2lkIiwieCI6IjAiLCJ5IjoiLTEuNSIsInoiOiIwIiwidyI6IjE0IiwiaCI6IjE0IiwiZCI6IjEiLCJyeCI6IjkwIiwiY0FsbCI6IiM2NTYwNGIiLCJjRnQiOiIjYzdiZmE0IiwibmFtZSI6ImN1Yi00In0seyJ0eXBlIjoiY3Vib2lkIiwieCI6IjAiLCJ5IjoiLTQuNSIsInoiOiIwIiwidyI6IjgiLCJoIjoiOCIsImQiOiIxIiwicngiOiI5MCIsImNBbGwiOiIjNjU2MDRiIiwiY0Z0IjoiI2M3YmZhNCIsIm5hbWUiOiJjdWItNSJ9LHsidHlwZSI6InByaXNtIiwieCI6IjUuNSIsInkiOiItMy41IiwieiI6IjAiLCJ3IjoiNCIsImgiOiI3IiwiZCI6IjciLCJyeSI6IjkwIiwicnoiOiIwIiwiY0FsbCI6IiNjN2JmYTQiLCJjTHQiOiIjNzk3MjU0IiwiY1J0IjoiIzc5NzI1NCIsImNCayI6IiM3OTcyNTQiLCJjQm0iOiIjNzk3MjU0IiwibmFtZSI6InByaS0xIn0seyJ0eXBlIjoiY3Vib2lkIiwieCI6IjAiLCJ5IjoiLTUuNSIsInoiOiIwIiwidyI6IjYiLCJoIjoiNiIsImQiOiIxIiwicngiOiI5MCIsImNBbGwiOiIjNjU2MDRiIiwiY0Z0IjoiI2M3YmZhNCIsIm5hbWUiOiJjdWItNiJ9LHsidHlwZSI6ImN1Ym9pZCIsIngiOiIwIiwieSI6Ii02LjUiLCJ6IjoiMCIsInciOiI0IiwiaCI6IjQiLCJkIjoiMSIsInJ4IjoiOTAiLCJjQWxsIjoiI2M3YmZhNCIsIm5hbWUiOiJjdWItNyJ9LHsidHlwZSI6ImN1Ym9pZCIsIngiOiIwIiwieSI6Ii04IiwieiI6IjAiLCJ3IjoiMi41IiwiaCI6IjIuNSIsImQiOiIyIiwicngiOiI5MCIsImNBbGwiOiIjYTE5Yzg3IiwiY1RwIjoiI2M3YmZhNCIsImNMdCI6IiNjN2JmYTQiLCJjUnQiOiIjYzdiZmE0IiwiY0Z0IjoiI2M3YmZhNCIsImNCayI6IiNjN2JmYTQiLCJuYW1lIjoiY3ViLTgifSx7InR5cGUiOiJwcmlzbSIsIngiOiIwIiwieSI6LTMuNTEsInoiOiI1LjUiLCJ3IjoiNCIsImgiOiI3IiwiZCI6IjciLCJyeSI6IjAiLCJyeiI6IjAiLCJjQWxsIjoiIzc5NzI1NCIsImNGdCI6IiNjN2JmYTQiLCJuYW1lIjoicHJpLTIifSx7InR5cGUiOiJwcmlzbSIsIngiOiIwIiwieSI6Ii0zLjUiLCJ6IjoiLTUuNSIsInciOiI0IiwiaCI6IjciLCJkIjoiNyIsInJ5IjoiMTgwIiwicnoiOiIwIiwiY0FsbCI6IiM2NTYwNGIiLCJjRnQiOiIjYzdiZmE0IiwibmFtZSI6InByaS0zIn0seyJ0eXBlIjoicHJpc20iLCJ4IjoiLTUuNSIsInkiOiItMy41IiwieiI6IjAiLCJ3IjoiNCIsImgiOiI3IiwiZCI6IjciLCJyeSI6Ii05MCIsInJ6IjoiMCIsImNBbGwiOiIjYzdiZmE0IiwiY0x0IjoiIzY1NjA0YiIsImNSdCI6IiM2NTYwNGIiLCJjQm0iOiIjNjU2MDRiIiwibmFtZSI6InByaS00In0seyJ0eXBlIjoiY3Vib2lkIiwieCI6IjAiLCJ5IjoiLTkiLCJ6IjoiMCIsInciOiIyLjYiLCJoIjoiMi42IiwiZCI6IjAuNSIsInJ4IjoiOTAiLCJjQWxsIjoiIzljOGY4NSIsImNGdCI6IiNlOWUyYzQiLCJuYW1lIjoiY3ViLTkifSx7InR5cGUiOiJjdWJvaWQiLCJ4IjoiMCIsInkiOiIwLjUiLCJ6IjoiMCIsInciOiIzMCIsImgiOiIzMCIsImQiOiIxIiwicngiOiI5MCIsImNBbGwiOiIjODNhMTAxIiwiY0x0IjoiI2Q3YjM3OCIsImNCbSI6IiNkN2IzNzgiLCJuYW1lIjoiY3ViLTEwIn1dfQ==)

Dựa vào hình minh họa, có thể thấy được vị trí hình so với gốc tọa độ khá là 'cân đối'. Khi đã có khối hình hoàn chỉnh, việc cần làm là lấy hình đã được render ra :D. 

Có 2 cách để lấy được model 3D vừa tạo:
 - Nhúng hình ảnh vào web
 - Hoặc lấy html css đem về thêm vào web
 
 ![](https://images.viblo.asia/f312dd21-e485-4005-a4af-0501f6eb3d18.png)

Trên góc bên phải, chọn sang chế độ preview, bạn sẽ thấy link nhúng ở bên cạnh kia, và bên trái hình preview là html css đã được tạo.

Lúc này chỉ cần đem đi thôi: 

Với việc nhúng, mình sẽ có kết quả như này:

![](https://images.viblo.asia/a53b54d6-38a0-4e85-b1cd-d10f3ad65962.png)

Còn sử dụng html css, sẽ có kết quả như này đây:

https://codepen.io/bunnypi04/pen/eYJxVBZ

{@embed: https://codepen.io/bunnypi04/pen/eYJxVBZ}

Việc sử dụng html css được render ra sẽ giúp mình nhìn 'ngầu' hơn, và dễ dàng customize lại trực tiếp thay vì phải vào tridiv để chỉnh sửa hình ảnh, vì vậy mình khuyến khích cách này nhé :D

## 3D transform webflow

Ngoài ra có 1 app trông 'có vẻ' khá hay ho để tạo hình không gian 3D là http://3d-transforms.webflow.com/

Mình chưa có thời gian tìm hiểu về công cụ này vì nhìn nó hơi phức tạp :D. Tuy nhiên là có vẻ sẽ có nhiều lựa chọn custom cho model đẹp hơn là app trên. Nếu có hứng thú và thời gian các bạn có thể tìm hiểu xem nhé :D
# Kết
Qua 2 bài minh họa ứng dụng, hy vọng rằng các bạn sẽ thạo hơn trong việc tạo dựng hình ảnh 3D, hoặc tạo bằng tool rồi ném lên web 'lòe' mọi người nhé =))
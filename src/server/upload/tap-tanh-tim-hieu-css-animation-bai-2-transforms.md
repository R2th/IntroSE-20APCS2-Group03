Bài trước mình đã tìm hiểu về thuộc tính phổ biến và quan trọng đầu tiên khi làm CSS animation rồi, bài lần này mình sẽ giới thiệu về thuộc tính cũng cực kỳ hay được sử dụng, đó là **Transforms**.

![](https://images.viblo.asia/70120ec6-5871-4509-9994-cd860c84b852.gif)

# Giới thiệu Transforms
## Dùng để làm gì nhỉ? 
Ở bài trước, chúng ta đã biết Transition giúp ta điều khiển được các thuộc tính CSS tác động lên các đối tượng cho "mượt" trong 1 khoảng thời gian. Transforms thì không giúp điều khiển các thuộc tính tác động lên đối tượng mà sẽ điều khiển trực tiếp đối tượng đó, như là `div`, `image`,... Thuộc tính transforms là thuộc tính được sử dụng để xác định các chuyển đổi 2 chiều, 3 chiều, có thể là chuyển đổi xoay, thay đổi tỉ lệ, hình dạng, di chuyển,... Theo 1 cách nói khác, chúng ta sẽ học cách thay đổi hình dạng kích thước và vị trí vật thể bằng Transforms.
## Các dạng transforms:
Bởi vì có thể xác định các chuyển đổi 2 chiều và 3 chiều, nên đương nhiên là có 2 dạng transforms: 2D transforms và 3D transforms.
# 2D Transforms
## Các function
Có 4 function của transforms sẽ phục vụ cho chúng ta định nghĩa cách hiển thị cho đối tượng của chúng ta: 
* Scale: Cho phép thay đổi kích thước đối tượng
* Translate: Điều khiển sự thay đổi vị trí của đối tượng
* Rotate: Xoay đối tượng theo góc bất ký
* Skew: kéo dãn đối tượng theo trục x hoặc y

[Xem trên codepen](https://codepen.io/bunnypi04/pen/qBBLEpv)
{@embed: https://codepen.io/bunnypi04/pen/qBBLEpv}

## Translate
Về cơ bản thì Translate function sẽ di chuyển đối tượng theo trục X và Y.
```css
translate(vị trí thay đổi theo trục X, vị trí thay đổi theo trục Y)
translateX(vị trí thay đổi theo trục X): sử dụng khi chỉ có nhu cầu dịch chuyển theo chiều ngang
translateY(vị trí thay đổi theo trục Y): sử dụng khi chỉ có nhu cầu dịch chuyển theo chiều dọc
=> ví dụ:
transform: translate(10px, -30px); => đối tượng di chuyển 10px về bên phải, và 30px hướng lên trên
```
Đừng quên hệ trục tọa độ của CSS hơi khác so với trục tọa độ mà ta đã học ở trường nhé:
![](https://images.viblo.asia/210456a1-3ad7-4528-9705-356380d6d5a7.PNG)

Như vậy là với 
* x > 0: đối tượng sẽ di chuyển về bên phải vị trí ban đầu
* x < 0: đối tượng sẽ di chuyển về bên trái vị trí ban đầu
* y > 0: đối tượng di chuyển xuống dưới vị trí ban đầu
* y < 0: đổi tượng di chuyển lên trên của vị trí ban đầu

Tại sao cái trục tọa độ lại có chiều dương như vậy? Lý do rất đơn giản. Khi bạn code, các phần tử sẽ xuất hiện đầu tiên ở trên cùng bên trái của màn hình, sau đó thêm các đối tượng khác, nếu không có css gì đặc biệt với các đối tượng này, mọi thứ sẽ được xuất hiện theo thứ tự từ trái sang phải, từ trên xuống dưới như khi viết chữ phải không? Đó cũng xác định chiều dương "đương nhiên" của 2 trục X, Y trên màn hình. 

Các bạn có thể thử bằng code pen phía trên nhé.
## Scale
Function Scale đúng như tên gọi của nó, giúp điều chỉnh kích cỡ của đối tượng. Mặc định scale sẽ có giá trị là 1, tức là nguyên bản kích thước của đối tượng. Với scale mang giá trị < 1, kích thước mới sau scale sẽ nhỏ hơn ban đầu, và với scale lớn hơn 1 sẽ cho kích thước lớn hơn. Scale = 1 có thể coi như 100%, như vậy scale = 2 => kích thước tăng gấp 2 lần, scale = 0.5 => kích thước chỉ còn 1 nửa. Việc điều chỉnh kích thước này căn bản chính là tăng/giảm chiều cao - height/độ rộng - width của đối tượng. Như vậy là sẽ có tương ứng có thể tách riêng thay đổi chỉ chiều cao, hoặc chỉ độ rộng, hoặc thay đổi cả 2 cùng lúc.

```css
scaleX(tỉ lệ giãn width)
scaleY(tỉ lệ giãn height)
scale(tỉ lệ thay đổi toàn bộ kích thước)
hoặc 
scale(tỉ lệ giãn width, tỉ lệ dãn height)
```

## Rotate
Rotate là function giúp xoay đối tượng, nó sẽ có 1 tham số là lượng muốn xoay hoặc số đo góc mà bạn muốn xoay, theo đơn vị Degrees (`deg`) hoặc gradients (`grad`)
```css
rotate(số góc - lượng)
```
Với số góc được đưa vào tham số, đối tượng sẽ xoay theo chiều dương là chiều kim đồng hồ tới góc đã chỉ định. Với tham số âm thì sẽ xoay ngược chiều kim đồng hồ. Lượng xoay ở đây là số lần bạn muốn xoay đối tượng. Ví dụ như muốn xoay 1 vòng, 2 vòng chẳng hạn:
```css
transform: rotate(1turn); => xoay 1 vòng 360 độ
transform: rotate(180deg);
transform: rotate(200grad);
```
## Skew
Skew function giống như sự kết hợp của translate và scale function, tức là có skewX để kéo giãn theo chiều ngang, và skewY để kéo giãn theo chiều dọc, hoặc skew(tham số X, tham số Y) để cùng lúc kéo giãn cả 2 phía. Skew sử dụng số đo góc để làm tham số kéo giãn.

Với skewX, đối tượng sẽ giữ nguyên chiều cao, và 2 đầu bị kéo tăng theo chiều ngang. Hiểu nôm na là lấy tâm đối tượng làm điểm gốc, hình sẽ bị nghiêng đi nhưng vẫn giữ nguyên chiều cao => hình sẽ bị méo.
Ví dụ: 

`transform: skewX(30deg);` => chiều cao giữ nguyên nhưng hình bị nghiêng kéo giãn 30 độ.
Giải thích bằng lời khá khó khăn, các bạn hãy thử trực tiếp ở code pen trên kia nhé

## Transform origin

Phía trên đã giới thiệu 4 function transform, tuy nhiên là còn 1 thuộc tính vô cùng quan trọng nữa phục vụ cho 4 function trên, đó là Transform origin. Transform origin xác định tâm điểm mà thuộc tính transform áp dụng lên.

Lấy ví dụ cho function rotate, Mặc định tâm xoay của đối tượng luôn là trọng tâm của đối tượng, nhưng nếu bạn muốn nó xoay với tâm là góc trên cùng bên trái thì sao? Lúc này sẽ sử dụng Transform origin nhé:

[Xem trên codepen](https://codepen.io/bunnypi04/pen/VwwqLmj)
{@embed: https://codepen.io/bunnypi04/pen/VwwqLmj}

Transform origin nhận các tham số là các key word: top, bottom, left, right. Với tham số `top`, thì điểm transform origin hay mình gọi ở đây là tâm xoay cho dễ hình dung, tâm xoay sẽ nằm ở trung điểm của cạnh trên hình. Tương tự nếu chỉ đưa 1 từ khóa vào thì 'điểm xoay' này sẽ nằm ở trung điểm cạnh đó.

Có thể kết hợp 2 từ khóa để chọn điểm xoay ở góc như ví dụ phía trên.

Ngoài ra transform-origin còn có thể nhận tham số như % nữa. Như phía trên đã nói, gốc tọa độ O sẽ là điểm `top left` của đối tượng. Vậy là tham số phần trăm đầu tiên sẽ là theo trục X, nếu tham số trục X là 100% tương ứng với điểm `top right` của đối tượng, tương ứng như vậy cũng với trục Y. Từ đó có thể tính điểm mà ta muốn theo phần trăm của 2 trục tọa độ. Ví dụ: 50% theo trục X kết hợp với 50% theo trục Y sẽ được điểm `center` của đối tượng:

`transform-origin: 50% 50%`

Để có thể nắm rõ hơn, hãy cứ thử thực hành nhé.
# 3D transform
![](https://images.viblo.asia/75ed8c73-318c-4788-83d7-e388cdb5b2a8.png)
Giờ tới 3D transform. 3D transform thực tế là tương tự như 2D transform, nhưng có bổ sung thêm 1 trục Z với chiều hướng vuông góc màn hình tới mắt chúng ta.

Để có thể tạo được môi trường 3D, cần có đầu tiên là thuộc tính `perspective`.

## Perspective & translateZ
Mà `perspective` là gì? Perspective bạn có thể hiểu như là khoảng cách giữa mắt chúng ta tới màn hình hiển thị đối tượng vậy - hay khoảng cách từ mắt người xem tới màn hình. `Perspective` nhận giá trị đơn vị là pixels.

Bất cứ khi nào bạn muốn thao tác với môi trường 3D, thì việc đầu tiên là nhớ định nghĩa `perspective` nhé. `Perspective` sẽ được định nghĩa trong phần tử cha chứa đối tượng cần transform 3D. Để dễ hình dung về `perspective`, hãy xem ví dụ dưới đây
```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    <img src="https://i.pinimg.com/564x/4f/33/a0/4f33a0124e75f4c7d6ce340b0b5e410d.jpg">
</body>
<style type="text/css">
    body {
        perspective: 1000px;
    }
    img {
        width: 300px;
        display: block;
        margin: auto;
        margin-top: 200px;
        transition: transform 1s;
    }
    img:hover {
        transform: translateZ(300px);
    }
</style>
</html>
```
Link codepen: https://codepen.io/bunnypi04/pen/OJJdqbZ
{@embed: https://codepen.io/bunnypi04/pen/OJJdqbZ}

Giờ khi hover vào hình ảnh bạn thấy nó giống như đang scale lớn lên phải không? Nhưng thực tế thì đó ko phải là hiệu ứng đã được cài đặt. Thực tế thì hiệu ứng sẽ là tấm ảnh được đưa lại gần mắt chúng ta (di chuyển theo trục Z trên hệ tọa độ màn hình), nên ta cảm thấy cái ảnh to hơn, mặc dù độ rộng và chiều cao của tấm ảnh không hề thay đổi. Vậy thì `perspective` làm nhiệm vụ gì ở đây? Bạn hãy thử thay `perspective` tại body từ 1000px xuống còn 300px (bằng với translateZ) để xem thử nhé. Bạn sẽ thấy cái ảnh trở nên "siêu to khổng lồ", cảm giác như dí sát mắt ta vậy. Đó là do ta đã định nghĩa khoảng cách tới màn hình bằng với khoảng cách translate Z. Từ ví dụ này chắc mọi người đã hiểu `perspective` chính là cơ sở để có độ lớn của hình ảnh khi translateZ. Đó là lý do luôn phải định nghĩa `perspective` trước khi thao tác 3D.

Mặc định, tâm điểm `perspective` -  hay dễ hiểu hơn là điểm hội tụ của không gian 3D sẽ là điểm trung tâm của khối đặt `perspective`. Tuy nhiên bạn có thể thay đổi điểm hội tụ này bằng cách sử dụng `perspective-origin`:
```css
perspective-origin: 24% 75%;
```

Dưới đây là 1 ví dụ mình tìm được:
[Xem trên code pen](https://codepen.io/desandro/pen/bMqZmr)
{@embed: https://codepen.io/desandro/pen/bMqZmr}

## Rotate in 3D

Có 1 thao tác nữa trong môi trường 3D ngoài translate, đó là rotate. Ở trên ta đã biết về rotate thường, nhưng thực ra có 3 loại rotate riêng lẻ: rotateX, rotateY, rotateZ

Giờ vẫn hình ảnh trên, ko translate nữa, đổi qua rotateZ thử xem nhé:
```css
    img:hover {
        transform: rotateZ(120deg);
    }
```
Bạn sẽ thấy hình ảnh xoay lấy trục Z làm tâm, trông như rotate thường vậy. Giờ thử thay rotateZ thành rotateX xem nhé. Khi chọn rotateX, trục quay của hình sẽ chính là trục Ox, hay là 1 đường ngang, thử hover sẽ thấy :D. Ví dụ như khi rotateX(90deg), bạn sẽ thấy hình ảnh xoay rồi biến mất luôn, vì nó đang nằm vuông góc với màn hình, mà nó lại ko có độ dày, nên trông như đang biến mất vậy. Tương tự với `rotateY()` sẽ là trục Oy làm trục xoay.

![](https://images.viblo.asia/d251c459-581b-4ad7-8a82-351fc7381aa0.gif)

## 3D world
Còn nhiều thứ khá hay ho về 3D transform và cách ứng dụng, nhưng mình chưa tìm hiểu và "thấm" hết để viết ra giải thích cho mọi người, như tiêu đề là "tập tành tìm hiểu", hy vọng sau này tận dụng làm được những thứ "super" hơn sẽ viết được bài nâng cao cho mọi người :D
# Kết bài
Bài này đã hướng dẫn tìm hiểu về transform, tuy nhiên con đường tới tận dụng làm thành animation sao cho đẹp còn cần khá nhiều điều kết hợp. Bài tiếp theo mình sẽ có vài hướng dẫn để mọi người dần dà làm quen và có thêm ý tưởng cho animation của mình nhé :D
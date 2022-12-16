Ở bài trước, mình đã giới thiệu vẽ bằng thuộc tính vô cùng phổ biến là Border rồi, bài này sẽ tiếp tục đến 1 thuộc tính phổ biến thường xuyên sử dụng và quen thuộc khác: background. Background thường chỉ được sử dụng để thêm màu nền thôi, nhưng thực ra khả năng của background có thể tạo ra nhiều hơn thế, mình chưa biết hết nhưng nay sẽ hướng dẫn 1 ít nhé.

# Background-image?
Đa số các bạn thường dùng `background-image: url()` để thêm ảnh nền cho div thôi đúng ko? Thực ra thì background image còn có vài thuộc tính khá là hay ho nữa cơ, đó là các thuộc tính tạo background gradient. Nói về gradient, nhiều người chắc cũng dùng rồi, nhưng ở đại khái mức `background-image: linear-gradient(to right, red , yellow);` thôi, nay mình se x làm chi tiết hơn 1 chút nhé
## Linear gradient
### Basic
Đúng như cái tên, hướng chuyển sắc (gradient) này là theo 1 đường thẳng, khá là thường gặp. Cú pháp đầy đủ như sau:
```css
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
```

`direction` sẽ là hướng chuyển sắc: 
 - `to right`: chuyển từ `color-stop1` ở bên trái dần sang `color-stop2` ở bên phải. `to left` thì ngược lại
 -  `to top`: `color-stop1` nằm dưới cùng, chuyển dần sang `color-stop2` ở trên cùng
 -  `to bottom right`: nghiêng theo đường chéo của div
 -  `angle`: nghiêng theo 1 góc đã cho (VD: `background-image: linear-gradient(60deg, red, yellow);`)


Ở đây, bạn có thể thấy dấu (...) tức là còn có thể chuyển lần lượt sang rất nhiều màu khác nữa, như cầu vồng chẳng hạn

![](https://images.viblo.asia/e3c3cf95-9259-4ade-b671-d1b9a204c6bd.png)

```css
background-image: linear-gradient(to right, #fe2c07, #ff7d01, #ffc700, #5aba00, #01cfff, #0172ff, #7d42ce);
```

### Điều chỉnh lượng màu chiếm phần
Mặc định, tùy vào số lượng màu bạn đưa vào, thì phần div chưa background sẽ chia đều 'thị phần' cho mỗi màu đó. Chẳng hạn như có 2 màu, thì điểm giao nhau sẽ ở chính giữa, 2 màu đúng sẽ ở 2 rìa, phần giữa hoàn toàn là dần dần chuyển màu. Chúng ta có thể control điều này bằng việc định mức % mà color stop lại để chuyển sang màu khác như sau:

![](https://images.viblo.asia/140bf260-fb23-4e66-9cdc-477cfbb1c137.png)

Với ảnh 1, define rõ ràng % của 2 màu thì có thể tạo được đường chia 2 màu rõ rệt, không còn là chuyển sắc từ từ nữa. Dựa vào đây, muốn background có bao nhiêu dải màu, chỉ cần define vị trí chiếm tới của từng màu là được rồi :D
## Radial Gradients
Tương tự với linear-gradient, thì radial-gradient khác 1 điểm là chuyển sắc từ tâm ra ngoài theo hình tròn hoặc elip mà thôi.
```css
background-image: radial-gradient(shape size at position, start-color, ..., last-color);
```

Các thông số bao gồm: 
 - Hình dạng tròn, hoặc elip (hình elip sẽ có tỉ lệ chiều cao - chiều rộng tương đương với kích cỡ chiều cao - rộng của div đó nhé). Nếu không muốn sử dụng elip theo tỷ lệ có sẵn, thì hãy define chiều cao - chiều rộng bằng pixel vào vị trí này nhé (VD: 20px 30px thay cho ellipse)
 - Vị trí tâm chuyển sắc
 - Lần lượt các dải màu loang dần ra ngoài. Có thể thêm vị trí điểm chuyển màu dạng gần solid (2 màu giao nhau rõ rệt bằng 1 đường cong) như linear-gradient ở trên.

Với radial gradient, cách sử dụng cũng gần như với linear gradient. Tuy nhiên nhờ vào việc có thể điều chỉnh được kích thước tỉ lệ hình elip chuyển sắc nên sử dụng được nhiều hình hơn. Thông thường thì các docs về radial-gradient chỉ hướng dẫn bạn tạo 1 tâm tròn tỏa ra như vầng sáng vậy, hoặc thêm repeating thì cũng chỉ có 1 tâm đó trên hình thôi. Vì vậy, dưới đây phần thực hành thứ 2 mình sẽ tạo nhiều tâm chuyển sắc để các bạn có thêm vài tips background hay ho nhé :D

# Thực hành
## Logo instagram
![](https://images.viblo.asia/fef4bca3-4b77-49c1-9e8c-22f14c0bfc89.png)

Logo quen thuộc này thì chắc ai cũng biết mặt rồi.  Phân tích 1 chút, thì logo gồm: 
 - 1 container hình vuông với góc bo tròn và nền gradient, 
 - Bên trong là 1 hình vuông góc bo tròn khác nhưng trong suốt viền trắng. 
 - Tiếp theo là lens máy ảnh hình tròn viền trắng, 
 - Cuối cùng là đèn flash là 1 chấm tròn. 

Về màu nền, thi phần loang màu chuyển sắc khá là phức tạp, ở bài này, mình sẽ đưa về 1 dạng radial circle cho dễ nhé:

![](https://images.viblo.asia/fee4e30f-9b5b-4171-93f9-2b9eec2e4f3c.png)

Theo như hình mẫu của mình, thì sẽ có 3 màu: vàng ở tâm, loang ra màu cam, cuối cùng loang sang màu xanh tím, và tất cả đều tâm tròn.

Mình dùng chấm màu, thì sẽ lấy ra 3 màu ở 3 điểm lần lượt từ trong ra ngoài là: Vàng - #FDF497, Cam - #D6249F, Xanh tím - #285AEB

### Bắt tay vào làm

Việc tạo các phần bên ngoài thì chắc đơn giản rồi, có bao nhiêu hình, thứ tự trong ngoài như nào thì cứ viết ra thôi:
```html
<div class="container">
  <div class="insta-logo">
    <div class="camera">
      <div class="lens"></div>
      <div class="flash"></div>
    </diov>
  </div>
</div>
```
Về phần css, chỉ cần dùng border-radius và tô border là được, mình tạo với kích thước 200 * 200 như sau:
```css
.insta-logo {
  width: 200px;
  height: 200px;
  background: yellow; /* Trọng tâm là đây nhé */
  border-radius: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.camera {
  width: 65%;
  height: 65%;
  border: 12px solid white;
  border-radius: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.lens {
  width: 50%;
  height: 50%;
  border-radius: 50%;
  border: 12px solid white;
}

.flash {
  width: 12%;
  height: 12%;
  position: absolute;
  background-color: white;
  border-radius: 50%;
  top: 11%;
  right: 11%;
}
```

Phần quan trọng nhất đến rồi đây, đó là phần màu nền của logo. Như đã nói ở trên, phần chuyển sắc sẽ là tâm tròn ở gần dưới logo, loang tròn dần ra 2 màu còn lại đến full logo. Công thức radial ở trên có rồi, chỉ cần thay bằng tỉ lệ mong muốn thôi :D 
```css
background: radial-gradient(circle at 30% 107%, #FDF497 0%, #FDF497 5%, #FD5949 45%, #D6249F 60%, #285AEB 90%);
```

Các bạn làm thử rồi xem kết quả có giống của mình không nhé: https://codepen.io/bunnypi04/pen/bGWydKg?editors=1100
{@embed: https://codepen.io/bunnypi04/pen/bGWydKg?editors=1100}

Logo insta chỉ là VD đơn giản về ứng dụng nền chuyển sắc, giờ sẽ nâng cao hơn 1 chút nhé
## Mặt trăng và củ cà rốt
![](https://images.viblo.asia/34fb5fc4-8adf-4ff6-8aed-cddc75f1086e.png)

Tại sao lại là mặt trăng và củ cà rốt? Tại mình hứng lên vẽ mặt trăng, định vẽ thêm con thỏ nhưng mà bài này học chưa vẽ được, nên quay qua củ cà rốt cho dễ ứng dụng bài thôi :D

### Trăng tròn
Giờ mình sẽ hướng dẫn bạn vẽ mặt trăng kia chỉ bằng 1 div nhé :D. Và đây là div của mình:
```html
<div class="moon"></div>
```

Tất cả html chỉ có vậy, còn lại sẽ phụ thuộc vào css hết, và nhân vật chính đương nhiên là background rồi
```css
.moon {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: inline-block;

  background-color: #E8EAE6;
  margin-bottom: 200px;
}
```

Với những css trên, ta được mặt trăng tròn với màu nền nhạt rồi đấy. Tới phần khó này. Theo như quan sát, thì vấn đề chính là tạo các miệng núi lửa hình tròn to nhỏ trên mặt trăng thôi. Với bài này, bạn không cần phải tạo từng div hình tròn rồi chồng lên hình mặt trăng với overflow hidden nữa, dùng radial-gradient là đủ rồi :open_mouth:

Radial-gradient 1 tâm thì dễ rồi, giống như logo insta kia, cứ radial chuyển dần dần đến hết là được. Cái này phức tạp hơn, các hình tròn ở các vị trí khác nhau, không chung 1 tâm nữa. Vậy thì, vẽ từng hình tròn là được rồi :woman_shrugging:. Để vẫn giữ màu nền background-color đã có sẵn, mình sẽ viết phần background này ở trên thuộc tính background-color để khỏi ghi đè background-color của mình, vị trí đã để trống sẵn trên kìa rồi  :yum:
```css
background: radial-gradient(30px circle at 100px 100px,
    #CDD0CB 50%,
    transparent 51%);
```

Được hình tròn đầu tiên rồi đấy: hình tròn bán kính 30px có tâm tại điểm: (100px, 100px), tô màu #CDD0CB từ tâm tới vị trí 50% - tức hình tròn màu #CDD0CB có đường kính 30px ấy, phần còn lại transparent với điểm chuyển sắc gần như solid luôn. Tiếp theo, vẽ thêm vài hình tròn nữa với các kích thước khác nhau và vị trí khác nhau nữa là xong, mỗi hình sẽ viết cách nhau bởi dấu `,` nhé:
```css
background: radial-gradient(30px circle at 100px 100px, #CDD0CB 50%, transparent 51%),
    radial-gradient(40px circle at 170px 150px, #CDD0CB 50%, transparent 51%),
    radial-gradient(25px circle at 120px 5px, #CDD0CB 50%, transparent 51%),
    radial-gradient(25px circle at 120px 5px, #CDD0CB 50%, transparent 51%),
    radial-gradient(20px circle at 42px 165px, #CDD0CB 50%, transparent 51%),
    radial-gradient(40px circle at 165px 40px, #CDD0CB 50%, transparent 51%),
    radial-gradient(60px circle at 15px 110px, #CDD0CB 50%, transparent 51%),
    radial-gradient(10px circle at 130px 180px, #CDD0CB 50%, transparent 51%),
    radial-gradient(20px circle at 70px 30px,  #CDD0CB 50%, transparent 51%);
```
Nếu bạn đặt background này ở sau background-color, thì với thuộc tính `background` mạnh hơn `background-color` sẽ ghi đè luôn background color của nó, hình sẽ thành ra như thế này:

![](https://images.viblo.asia/889c07a0-901f-4d13-8405-050c1bba08d0.png)

Tại vì mình để màu chuyển sắc tiếp theo là transparent đấy :D. Nhưng nếu bạn thay transparent kia bằng màu nền mặt trăng, thì sẽ chỉ có radial-gradient đầu tiên là 'ăn' thôi, vì màu thứ 2 của hình đầu tiên che hết mọi thứ rồi, nên nhớ chú ý cái này nhé :D

### Vài củ cà rốt
 Quan sát cho rõ mấy củ cà rốt này:
![](https://images.viblo.asia/a78d91a3-fe57-4a9e-ac90-237528bf71d8.png)

Về phần thân cà rốt, thì na ná mặt trăng thôi, nhưng thay vì các hình tròn, mình thay bằng hình elip nằm ngang để tạo các đường tối màu kia. Về lá cà rốt, mình định sử dụng 1 div tạo 1chiếc lá elip thôi, rồi dùng pseudo thêm 2 cái lá ý hệt 2 bên nữa. Vậy là html của mình chỉ như sau:

```html
<div class="carrot">
    <div class="leave"></div>
    <div class="root"></div>
</div>
```

Trước tiên thì tạo hình củ cà rốt đã. Thực ra nó chỉ dùng mỗi border-radius để tạo hình mà thôi, có gì khó thì bài trước còn khó hơn :D:
```css
.root {
  height: 100px;
  width: 40px;
  background-color: #FFA62B;
  border-radius: 30% 30% 70% 70%;
}
```

Tiếp tới là các đường sẫm màu kia. Như đã nói, chỉ là mấy hình elip background như cái mặt trăng thôi mà :D. Tuy nhiên thì phức tạp hơn tí là elip thì cần có chiều rộng và chiều cao, chứ không chỉ đường kính như hình tròn thôi:

```css
background: radial-gradient(20px 3px at 10px 10px, #DB6400 85%, transparent 86%),
    radial-gradient(15px 2px at 25px 30px, #DB6400 85%, transparent 86%),
    radial-gradient(15px 2px at 0px 55px, #DB6400 85%, transparent 86%),
    radial-gradient(18px 2px at 32px 75px, #DB6400 85%, transparent 86%);
```

Nhớ đừng quên note là phải viết trước background color như ở trên đấy nhé :smirk:

Với các bạn làm đến đây rồi thì mấy cái lá chỉ là chuyện đơn giản thôi :D, chẳng qua là có thêm cái psedo class là đôi khi ít dùng:
```css
.leave {
  position: relative;
  width: 10px;
  height: 30px;
  background-color: #A0C334;
  border-radius: 50%;
  margin-left: 50%;
  transform: translateX(-50%);
}
.leave:before {
  content: '';
  position: absolute;
  width: 10px;
  height: 30px;
  background-color: #A0C334;
  border-radius: 50%;
  top: 0;
  left: -10px;
  transform: rotate(-18deg); /* Nghiêng trái này */
}
.leave:after {
  content: '';
  position: absolute;
  width: 10px;
  height: 30px;
  background-color: #A0C334;
  border-radius: 50%;
  top: 0;
  right: -10px;
  transform: rotate(18deg); /* Nghiêng phải này */
}
```

Nhớ đừng quên cho `ontent: ''` thì mới hiện lên psedo class nhé 

Các bạn có thể tham khảo codepen của mình này: https://codepen.io/bunnypi04/pen/VwbOXKv?editors=1100
{@embed: https://codepen.io/bunnypi04/pen/VwbOXKv?editors=1100}

# Kết 
Qua bài này, từ giờ bạn có thể vẽ nhiều thứ với ít element html hơn rồi, hy vọng giúp cho việc vẽ vời của bạn trở nên 'cool ngầu' hơn khi người khác thấy nhé :D, sau này cũng đỡ phải dùng image cho background nhiều nữa :D
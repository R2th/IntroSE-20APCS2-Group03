Như bài trước có hứa, bài lần này mình sẽ giới thiệu 1 vài ứng dụng hay ho của css 3D cho trang web của chúng ta nhé.

![](https://images.viblo.asia/e314f021-ceb3-4e57-bd07-e6272108776f.png)




# Hiệu ứng cho hình ảnh
## Hiệu ứng lật
![](https://images.viblo.asia/50d0fec3-b877-404b-a1e7-15246f837254.gif)

Đây là 1 hiệu ứng khá là quen thuộc, tuy nhiên thì đa số mọi người khi cần sẽ search ra ngay js nhỉ :). Tuy nhiên hôm nay mình sẽ ứng dụng phức tạp hơn 1 tí. Đó là chữ cắt lật

Trước hết, mình sẽ tạo chữ đã, kèm theo đó sẽ là các container cho nó:
```html
<div class="letter-container">
    <div class="flip-left">
        <span data-letter="P">P</div>
    </div>
</div>
```
  Về tư tưởng, mình sẽ sử dụng `pseudo` là `:before` và `:after`  của span chứa chữ để lật hình. Mình cũng định làm 1 chuỗi chữ, nên để tiết kiệm thời gian cho thêm `content: "P"` cho mỗi ký tự khác nhau thì mình chèn `data-letter` kia có cùng nội dung với bên trong thẻ span, như vậy thì chỉ cần 1 dòng`content: attr(data-letter);` cho tất cả các `pseudo` là ổn 

Đã xong phần html, vô cùng ngắn gọn :D. Giờ tới phần phức tạp nhất: css. Ở đây thì Chữ `P` bên trong span chính là phần 'bị cắt mất', và nằm lại như cái lỗ hổng vậy. Vì vậy mình 
```css
body {
  font-size: 200px; /* chữ to cho đẹp =)) */
  background-color: #96bb7c;
}
.letter-container span {
        perspective: 550px; /* Việc đầu tiên đương nhiên là định nghĩa perspective để dùng được hiệu ứng 3d */
        transform-style: preserve-3d; /* để khi transform dùng được hiệu ứng 3d thì cần thêm cái này nữa */
        display: inline-block;
        font-weight: bold;
        position: relative; /* để các pseudo element có vị trí tuyệt đối với hệ quy chiếu element chính */
        color: rgba(0, 0, 0, 0.6); /* Vì là cái lỗ nên mình để màu tối, hơn trong suốt */
        z-index: 1;
}
```

Xong thằng 'lỗ'. Tiếp đến là thằng 'lật'. Ngoài việc lật ra thì để thêm sinh động, mình tạo thêm 1 cái bóng cho chữ đang lật nữa. Như vậy là mình sẽ dùng cả 2 `pseudo`: `:before` sẽ là cái bóng cho `:after` là chữ đang lật. 
```css
.letter-container span:before, .letter-container span:after {
        position: absolute; /* đính các pseudo vào span chính */
        content: attr(data-letter);
        line-height: inherit; /* đảm bảo 3 thằng cũng cỡ nếu nhiều dòng */
        transition: all 0.3s; /* chọn duration cho hiệu ứng */
    /* dính trùng 3 thằng vào nhau */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2; /* đảm bảo 2 thằng này nổi trên thằng 'lỗ ' */
}
.letter-container span:before {
        text-shadow: none;
        color: rgba(0, 0, 0, 0.12); /* Vì là bóng nên sẽ là màu đen nhưng gần trong suốt */
}
.flip-left span:after { 
    color: #96bb7c; /* màu cho thằng chữ bị cắt ra phải giống màu nền của giấy */
}
```

Hiện tại thì nhìn trên hình sẽ không thấy gì khác cả. Bởi vì 3 thằng vẫn đang trùng nhau. Lúc này việc tiếp theo là chọn chỗ lật (chọn vị trí trục lật). Như tên class là `flip-left`, mình muốn nó mở sang trái như khi đang lật sách thật vậy, thế nên trục lật sẽ ở vị trí x=0 theo trục Ox đối với hệ quy chiếu là thằng span gốc. Tham số y thì đặt đâu cũng như nhau, vì mình cũng chỉ quan tâm tới lật sang trái, mình chọn như sau:
```css
    .flip-left span:before,
    .flip-left span:after {
        transform-origin: 0 50%; /* điều chỉnh vị trí trục lật */
    }
```
Tùy vào mong muốn lật như thế nào, các bạn có thể thay đổi `transform-origin` để có được trục lật hình mong muốn. Để trông thật nhất, mình sẽ xác định hướng ánh sáng để tạo được cái bóng `:before` giống thật nhất. Ở đây mình chọn hướng sáng là từ góc trên bên trái như này:

![](https://images.viblo.asia/05f3f345-9fa0-4a9a-86f7-faeac0af583b.png)

Nhìn hình có thể tưởng tượng được cần làm gì với cái bóng `:before`: Ban đầu thằng lật vẫn chưa lật khỏi 'lỗ' thì nó cũng sẽ khớp với thằng 'lỗ' ban đầu. Khi `:after` lật sang bên trái, thì bóng sẽ bị kéo dãn theo 2 chiều x và y. Vậy cần phải điều chỉnh skew cho `:before` để có 1 cái bóng 'như thật'. Đây là thời điểm ban đầu
```css
    .flip-left span:before {
        transform: scale(1, 1) skew(0deg, 0deg);
    }
    /* do 3 thằng đang trùng nhau nên khó mà nhìn được, mình sẽ thêm box shadow cho thằng 'lật', hoặc các bạn có thể chọn thêm border cho nó */
    .flip-left span:after {
        text-shadow: 
            -1px 0px 0px rgba(255, 255, 255, 0.1), 
            3px 0px 1px rgba(0, 0, 0, 0.4);
        transform: rotateY(-15deg); /* nhân tiện xoay góc 1 tẹo cho dễ nhìn */
    }
```
Tiếp theo thì khi `:after` lật, ta chỉ cần `scale` và `skew` cho hợp lý là được.

![](https://images.viblo.asia/d81900f0-0412-46ac-bce9-f5dc1c576f7a.png)

Hình ban đầu thế ổn rồi, giờ thì đến phần hiệu ứng khi hover. Khi hover, mình sẽ cho `:after` xoay góc 45 độ theo trục từ trước, đồng thời kéo dãn thằng `:before` ra trông cho giống thật:
```css
.flip-left:hover span:before {
  transform: scale(0.85,1) skew(0deg,20deg);
}
.flip-left:hover span:after {
  transform: rotateY(-45deg);
}
```
Vậy là giờ bạn có thể thấy được kết quả như mong muốn rồi đây: https://codepen.io/bunnypi04/pen/ZEQLzaQ?editors=1100

{@embed: https://codepen.io/bunnypi04/pen/ZEQLzaQ?editors=1100}
# Ứng dụng hình học, 1 vài model 3d vật thể
## Model 3d vật thể
Mặc dù mình đã giới thiệu khá nhiều ứng dụng thực hành 3d chỉ với pure css, tuy nhiên là chỉ dùng pure css thì còn rất nhiều hạn chế. Về mặt lý thuyết thì hầu như các vật thể 3D được tạo từ mặt phẳng bạn có thể dùng toán để xây dựng được với css, và các vật thể bao gồm mặt phẳng cong thì không thể sử dụng được. Tuy nhiên là nếu phân tích 1 mặt phẳng cong được cấu thành từ nhiều hình phẳng thì vẫn có thể xây dựng được 1 cách hạn chế.

![](https://images.viblo.asia/fad0d26d-7de3-4507-b04b-3d70f22c2e99.png)

![](https://paulrhayes.com/images/creating-a-sphere-with-3d-css/sphere-normal.png)

Tất nhiên là với trường hợp tạo mặt phẳng cong, thì chia ra càng nhiều mặt phẳng cấu thành sẽ càng 'mượt'

Vậy với hình ảnh đầu tiên là cái thùng phuy, nếu muốn chèn 1 background-image vào thì làm sao để hiển thị cho đúng trên mỗi hình phẳng cấu thành? Mình sẽ đặt background image có chiều cao phù hợp, và dịch chuyển background-image vào vị trí tương ứng với số thứ tự của mỗi hình phẳng nhé
## Bắt đầu từ hình phẳng cong

![](https://images.viblo.asia/dba8eae8-57f3-4f83-a6c3-3a97610aaaf9.png)

Ở trên mình tạo border và khoảng cách cho mỗi thằng để các bạn nhìn tách biệt từng mảnh của hình, sau khi chỉnh sửa lại cho đúng với thực tế và thêm bớt vài chi tiết để sau đấy hiển thị, thì sẽ như sau nhé:

![](https://images.viblo.asia/ac94320f-cbeb-4fd0-82a2-668916f83ec3.png)

> Lưu ý, vị trí background lệch bao nhiêu phụ thuộc vào chiều rộng của mỗi mảnh, tức là cũng có thể các mảnh có kích thước khác nhau. Số lượng các mảnh càng nhiều, hiệu ứng càng mượt, và khối lượng công việc điều chỉnh cho mượt càng nhiều :D. Dựa vào số lượng các mảnh mà bạn chọn, chia đều ra sẽ được bề rộng mỗi ảnh nhé, height có thể để full background height.
![](https://images.viblo.asia/e5b7a5e0-2d84-454e-a7b0-3d826a5016a4.gif)

Khi đã tạo được hình như này, việc tiếp theo là xoay chuyển cho đúng vị trí thôi: Ở đây mình sẽ tạo hiệu ứng lật sách và trang sách uốn lên. Việc này sẽ có chút khó khăn, khó tính toán. Nếu bạn giỏi toán tọa độ thì mọi thứ sẽ dễ dàng hơn, còn ai như mình không muốn đau đầu thì có thể mò từng chút như dưới đây =))
* Mỗi khi hover, thì mỗi mảnh sẽ nghiêng 1 chút, đồng thời dịch chuyển vị trí đến vị trí mới trên không gian 3 chiều
* Theo lý thuyết, mỗi mảnh sẽ cần transform các thuộc tính như sau: `translate3d(x, y, z) rotate3d(x, y z)` - lưu ý là nhớ translate trước khi rotate nhé. Với dự tính lật như hình gif phía trên, thì transform-y sẽ bằng 0, và rotate-x, rotate-y cũng bằng 0.
* Như vậy, khi hover, mình cho mảnh nghiêng 1 góc dương, khi đấy thì cần dịch mảnh theo chiều tiền gần tới mắt mình hơn (chiều Z), đồng thời do các thẳng bên cạnh cũng bị nghiêng nên cần dịch sang trái 1 tẹo cho khớp.

![](https://images.viblo.asia/56e4be58-cb00-4210-8701-0251df6af9de.png)

Mọi người xem hình minh họa để hiểu hơn nhé, vì sao nó bị lệch thì do thầy dạy toán dạy thế nhé :D. Các bạn cũng có thể dựa vào hình này để tính toán 1 cách chính xác nhất mong muốn của mình. Còn dưới đây mình sẽ 'mò'.

Như đã nói, các mảnh slide cần phải khớp nhau, mà mình có 4 mảnh thôi nên sẽ tăng góc lớn 1 chút cho nhìn rõ sự thay đổi, tuy nhiên qua mỗi mảnh mà góc tăng càng nhanh trông càng bị gấp khúc, thiếu tự nhiên, nên hãy chọn số lượng và góc cho phù hợp nhé.

Mảnh đầu mình nhấc góc trái lên 5 độ: `rotate3d(0, 1, 0, -5deg);`. Lúc này, mặc định trục xoay của nó là trục giữa, vì vậy cạnh bên trái sẽ bị rời xa mắt chúng ta hơn 1 chút. Như vậy thì trông chưa tự nhiên cho lắm. 

![](https://images.viblo.asia/b218d918-5605-4adc-a97a-0198da9633c9.PNG)

Vì vậy mình sẽ dịch chuyển theo chiều Z (dịch lại gần mắt hơn) 1 chút xíu. Bao nhiêu thì được? Đã nói trước là mò nên mình chỉnh tăng transform-z lên từng xíu 1 xem cái nào thuận mắt nhất thôi =)). Về lý thuyết theo hình minh họa kia thì đáng lẽ phải dịch sang trái 1 tẹo, nhưng mình quên nên chỉnh z tăng thêm nhiều hơn chút trông nó vẫn vậy :v.

Với các mảnh tiếp theo, làm tương tự khi tăng góc nhấc lên, dịch từng xíu 1 đến khi thấy mượt mắt nhất nhé, dịch 3 tham số: `translate-X`, `translate-z`, và `rotate-z`, qua mỗi mảnh lại tăng số lên thêm 1 ít một.

```css
.container:hover .face:nth-child(1) {
  transform: translate3d(0px, 0px, 5px) rotate3d(0, 1, 0, -5deg);
}
.container:hover .face:nth-child(2) {
  transform: translate3d(-3px, 0px, 23px) rotate3d(0, 1, 0, -15deg)
}
.container:hover .face:nth-child(3) {
  transform: translate3d(-10px, 0, 57px) rotate3d(0, 1, 0, -25deg)
}
.container:hover .face:nth-child(4) {
  transform: translate3d(-27px, 0px, 110px) rotate3d(0, 1, 0, -40deg)
}
```

Với hình của mình thì như kia là 'mượt mắt' rồi. Tuy nhiên hiện tại khi hover thì nó 'teleport' 1 mạch tới vị trí cuối, vì vậy cần thêm chút transition cho nó di chuyển tới vị trí cuối mượt hơn. Tất nhiên cần sử dụng là `transition-duration` rồi. Mình sử dụng cho các mảnh nên sẽ thêm vào class của các mảnh, thời gian đi chuyển là 200ms, đừng quên chọn transform style 3D cho hiệu ứng di chuyển 3 chiều nhé:
```css
.face {
  transition: transform 200ms ease-in-out;
  transform-style: preserve-3d;
}
```
Công việc cuối cùng lại phải 'mò' tiếp đấy là căn thời gian delay cho mỗi mảnh cho mượt. Hãy căn từ thằng cuối trở về đầu nhé: thằng cuối để delay = 0 trước, rồi canh delay cho thằng cuối - 1, cứ thế mò từng chút `ms` một

Và đây là kết quả của mình, nhìn qua không chú ý thì cũng khá là 'cong' ko nhận ra đấy chứ nhỉ :D
https://codepen.io/bunnypi04/pen/QWydOaK?editors=1100
{@embed: https://codepen.io/bunnypi04/pen/QWydOaK?editors=1100}
## Tới các vật thể 3d ứng dụng
Mình có tìm kiếm trên mạng được 1 vài ứng dụng khá hay ho, tuy nhiên độ phức tạp thì cao quá nên từ đó làm cảm hứng viết ra bài phân tích phía trên cho mọi người đọc hiểu. Có 1 bài ứng dụng khá hay, tạo ra các vật thể đơn giản khá hoàn chỉnh, tuy nhiên sử dụng js để tính toán cho vị trí đặt các mảnh cho phù hợp (nhiều mảnh quá và cần độ chính xác cao), mà làm nhiều mảnh thế bằng css thuần (series này của mình là series no JS) thì tính toán và làm đau đầu lắm, nên mình không làm mẫu, mọi người có thể tham khảo tại đây nhé:
https://keithclark.co.uk/articles/creating-3d-worlds-with-html-and-css/

Tùy vào độ kiên nhẫn và phân tích của bạn, bạn có thể tự tạo ra những vật thể 3D bằng mỗi css, tất nhiên là với độ phức tạp nhỏ thôi, chứ build được nguyên mấy hình nhân vật trong game thì bạn chắc sẽ từ bỏ sớm =))
# Kết
Với những gì đã viết, mình nghĩ là giờ thì các bạn đã thấy sức mạnh của CSS thực ra rất to lớn, chứ ko phải chỉ dùng đổi màu chữ, chỉnh kích thước hay những screen 'tĩnh' như trước đây hay làm nữa :D. Nếu bạn rảnh, hãy làm vài thứ CSS thuần 'Awesome' để show vào CV hay web của bản thân cho ngầu nhé :D. Nếu mà khó quá thì cũng có thể sử dụng 'Giả 3D' như mình kiếm về cũng được: (sưu tầm từ Daniel Snows): https://tothemoon-min.com/
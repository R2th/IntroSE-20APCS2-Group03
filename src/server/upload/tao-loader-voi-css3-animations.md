Ban đầu, tôi có quan điểm rằng việc triển khai page loader CSS3 là một công việc khá nặng nề, vì vậy, tôi đã tìm một thư viện để tạo animations đơn giản. Tuy nhiên, tôi đã không tìm thấy một loader animations CSS hợp lý đáp ứng yêu cầu trong dự án của tôi. Tôi muốn một cái gì đó gọn gàng và đơn giản.

Sau khi nghịch ngợm với code trong chưa đầy một giờ, tôi đã làm một triển khai đơn giản về trải nghiệm loader page với CSS3 animation keyframes mà tôi rất hào hứng chia sẻ với các bạn.

{@codepen: https://codepen.io/oBuiThiHuyen/pen/xxKmWKB}

### Nghiên cứu:

Tôi đã không chuyển sang CSS @keyframes theo quy tắc ngay lập tức. Tôi đã mất một thời gian và nghiên cứu để tìm ra một cách hiệu quả để code trải nghiệm page loading.
Ban đầu, tôi bắt đầu chơi với CSS Transitions giúp thay đổi các giá trị thuộc tính CSS trong một khoảng thời gian. Nhưng tôi muốn giữ cho quá trình đơn giản như nó có thể nhận được và quy tắc @keyframes là tốt nhất.

Đây là những gì tôi sẽ làm vào hướng dẫn này:
![](https://images.viblo.asia/925ebbed-4dc3-4ca9-b347-5e9235c1f6f7.png)

### HTML

Trước tiên, hãy viết HTML cơ bản cho nó.

```
<div class="loader">
  <span></span>
  <span></span>
  <span></span>
</div>
```

Tôi đã thêm một *div* với *class* được gọi là *loader*. *Div* này chịu trách nhiệm tạo tất cả các yếu tố page loader. Trong *div* này, tôi đã thêm ba phần tử *span* liên tiếp, mỗi phần tử đại diện cho một hình tròn page loader.

### CSS Styles

Trước tiên hãy style cho các yếu tố cơ bản của chúng ta.

```
/*_ Styles cho bản demo. *_/
body {
  background: #2C294F;
  padding: 2rem;
}

p {
  font: 1rem/1.45 "Operator Mono";
  color: #A599E9;
  text-align: center;
}
```

đoạn code trên xác định các kiểu CSS tùy chọn cho thẻ *p* và *body*.

**Styling .loader Class**

Tiếp theo, tôi style cho page loader của mình với các thuộc tính sau:

```
/_ CSS cho animated bouncing loader. _/
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

Tôi đã sử dụng **Flexbox i.e**., *display: flex;* thuộc tính để đặt bouncing page loader ở giữa trang theo chiều ngang và chiều dọc.

```
/_ Hình tròn loader _/
.loader > span {
  background: #FAD000;
  border-radius: 50%;
  margin: 5rem 0.5rem;
  animation: bouncingLoader 0.6s infinite alternate;
}

.loader > span:nth-child(2) {
  animation-delay: 0.2s;
}

.loader > span:nth-child(3) {
  animation-delay: 0.4s;
}
```

Mỗi hình tròn loader có *width: 1rem;*  và *height:1rem;* với mã màu #FFB651. Theo mặc định, loader sẽ là hình vuông. Để cho nó một hình tròn tôi đặt *border-radius* là *50%*. 

Tôi cũng đã thêm một chút khoảng cách giữa các vòng tròn nhưng phần thú vị nhất ở đây là thuộc tính *animation*. Tôi đang sử dụng một animation keyframe được gọi là *bouncingLoader* chạy một lần trong 0,6 giây và lặp đi lặp lại một cách vô thức. Hãy nói nhiều hơn về điều đó và các thuộc tính animation delay bên dưới.

![](https://images.viblo.asia/0fe43f06-5595-40b8-bcb5-b44deed18c78.png)

Vì vậy, đây là một mẹo nhanh, tức là, nếu bạn muốn loader của mình ở dạng hình vuông, đừng sử dụng thuộc tính border-radius.

### Tạo Animation Keyframe

Các Keyframe chính được sử dụng để xác định hành vi animation và cung cấp cho chúng ta quyền kiểm soát hoàn toàn một chu kỳ của CSS animation. Chúng ta định nghĩa nó là *@keyframes* theo quy tắc theo sau là tên của animation là *bouncingLoader* trong trường hợp này.

Trong quy tắc *@keyframe*, bạn sử dụng các keywords *from* và *to* để chỉ định điểm bắt đầu và điểm kết thúc cho animation của bạn. Tương tự, bạn cũng có thể sử dụng *0%* * để từ đó mô tả điểm bắt đầu và * *100%* để mô tả điểm kết thúc của animation của bạn.

Hơn nữa, nếu bạn muốn một số hiệu ứng animation transitions, bạn có thể xác định một phạm vi tỷ lệ phần trăm mỗi phần có chứa một danh sách các styling selectors. Các tỷ lệ phần trăm này có thể được liệt kê theo bất kỳ thứ tự nào và với bất kỳ sự khác biệt giữa chúng. Một ví dụ đơn giản của các tỷ lệ phần trăm này được hiển thị dưới đây:

```
@keyframes animationNameHere {
  0% { opacity: 1; }
  30% { opacity: 0.75; }
  50% { opacity: 0.5; }
  100% { opacity: 0.25; }
}
```

Bây giờ chúng ta hãy viết code cho keyframe chính mà tôi đã viết để tạo bouncing page loader của mình:

```
/_ Xác định animation được gọi là bouncingLoader. _/
@keyframes bouncingLoader {
  from {
    width: 0.1rem;
    height: 0.1rem;
    opacity: 1;
    transform: translate3d(0);
  }
  to {
    width: 1rem;
    height: 1rem;
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
}
```

Tôi đang sử dụng các keywords *from* và *to* và xác định các thuộc tính kiểu dáng cơ bản về *width*, *height* và *opacity* của các hình tròn. Ngoài ra, để bouncing effect, tôi đã sử dụng thuộc tính CSS *transform* để thay đổi tọa độ của một phần tử đã cho do đó biến đổi vị trí của mỗi hình tròn.  

Với thuộc tính *transform* này, tôi đã sử dụng hàm *translate3D()* có ba đầu vào giải thích sự thay đổi trong tọa độ *(x, y, z)*. Vì tôi muốn loader của mình chạy theo chuyển động sóng, tôi cần dịch chủ yếu dọc theo *trục y* giữ cho *trục x và z* không đổi. Do đó, giá trị điểm kết thúc của tôi là *(0, -1rem, 0)*.

Hãy để tôi chỉ cho bạn một bản demo nhỏ để chơi với thuộc tính này. Nếu tôi đặt giá trị điểm kết thúc của mình là *transform: translate3d(1rem, 0rem, 1rem);*. Điều đó có nghĩa là tôi đang chuyển đổi nó dọc theo trục x và z trong khi giữ cho trục y của tôi không đổi. Bây giờ animation của tôi sẽ trông giống như thế này:

![](https://images.viblo.asia/79a9e35e-71ef-47c3-a4bf-8d4a70b759f4.png)

**Sử dụng Animation Delay với Keyframe**

Bây giờ bắt đầu phần cuối cùng. Vì tôi đã viết code cho @keyframe của mình, nên đã đến lúc thiết lập và chạy code. Loại animation mà bạn đang xem trong ảnh ở trên đã được thực hiện với một vài dòng mã sau:

```
/_ Loader hình tròn _/
.loader > span {
  background: #FAD000;
  border-radius: 50%;
  margin: 5rem 0.5rem;
  animation: bouncingLoader 0.6s infinite alternate;
}

.loader > span:nth-child(2) {
  animation-delay: 0.2s;
}

.loader > span:nth-child(3) {
  animation-delay: 0.4s;
}
```

Bạn style phần tử bạn muốn tạo hiệu ứng với thuộc tính *animation* và / hoặc thuộc tính phụ của nó. Sử dụng thuộc tính này, bạn có thể kiểm soát thời gian, thời lượng và các chi tiết khác của animation. 

Ở đây tôi đã sử dụng các thuộc tính animation sau:

```
animation: animation-name, animation-duration, animation-iteration-count, animation-direction;
```

* *animation-name*: Xác định name của animation của bạn trong trường hợp của tôi.
* *animation-duration*: Định cấu hình khoảng thời gian mà animation của bạn sẽ mất để hoàn thành một chu kỳ.
* *animation-iteration-count*: Cho biết số lần bạn muốn chu kỳ animation của mình phát trước khi stops.
* *animation-direction*: Xác định rằng animation của bạn sẽ được phát theo hướng nào.

Ngoài ra, còn có một số thuộc tính khác. Bạn có thể tham khảo chúng từ [đây](https://developer.mozilla.org/en-US/docs/Web/CSS/animation).

Dựa trên những điều này tôi đã định nghĩa animation của mình như sau:

```
animation: bouncingLoader 0.6s infinite alternate;
```

Dòng code này thực hiện ba điều sau đây:

☑️ Báo cho phần tử *loader* sử dụng keyframe *bouncingLoader* .

☑️ Nó cũng đặt thời lượng của animation thành 0,6 giây.

☑️ Nó chạy animation động vô số lần.

☑️ Sau khi hoàn thành một chu kỳ duy nhất, hướng animation sẽ thay thế, tức là nó đảo ngược.

Tôi đã xác định các thuộc tính này cho hình tròn đầu tiên của bouncing loader của tôi. Để nhắm mục tiêu vòng tròn thứ hai (2) và thứ ba (3), tôi đã sử dụng *nth-child(n)* cho phép bạn chọn và nhắm mục tiêu một hoặc nhiều phần tử là *nth-child* của cha mẹ của nó. Hơn nữa, đối với các phần tử *span* còn lại, tôi vừa xác định độ *animation-delay*, để mỗi phần tử không bắt đầu animate cùng một lúc.


###  Kết quả cuối cùng:

Đây là code hoàn chỉnh của animated bouncing page loader này:

**HTML Code**

```
<!-- HTML cho Bouncing Page Loader -->

<div class="loader">
  <span></span>
  <span></span>
  <span></span>
</div>
```

**CSS Code**

```
/_ CSS cho animated bouncing loader. _/
.loader {
  display: flex;
  justify-content: center;
    align-items: center;
}

/_ Loader circles _/
.loader > span {
  background: #FAD000;
  border-radius: 50%;
  margin: 5rem 0.5rem;
  animation: bouncingLoader 0.6s infinite alternate;
}

.loader > span:nth-child(2) {
  animation-delay: 0.2s;
}

.loader > span:nth-child(3) {
  animation-delay: 0.4s;
}

/_ Xác định animation được gọi là bouncingLoader. _/
@keyframes bouncingLoader {
  from {
    width: 0.1rem;
    height: 0.1rem;
    opacity: 1;
    transform: translate3d(0);
  }
  to {
    width: 1rem;
    height: 1rem;
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
}

/_ Style cho bản Demo. _/
body {
  background: #2C294F;
  padding: 2rem;
}

p {
  font: 1rem/1.45 "Operator Mono";
  color: #A599E9;
  text-align: center;
}
```

Dưới đây là bản demo codepen cho đoạn code trên, bạn có thể thử với nó:

{@codepen: https://codepen.io/oBuiThiHuyen/pen/xxKmWKB}
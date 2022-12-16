Trong web thì tính mượt mà trong các hiệu ứng là điều vô cùng cần thiết, nó tạo sự thân thiện và thẩm mỹ cho người dùng khiến họ có cảm giác dễ chịu hơn khi truy cập vào website. Để làm được điều này thì bạn cần phải nắm rõ một thuộc tính của CSS đó chính là Animation.
# 1. Animation là gì?
Animation cho phép một thành phần thay đổi từ style này qua style khác. Bạn có thể thay đổi bao nhiều thuộc tính CSS mà bạn muốn, bao nhiều lần mà bạn thích
<br>
Để sử dụng CSS animation, chúng ta phải khai báo keyframe cho từng animation. Keyframe sẽ tạo ra các styles của thành phần tại một thời điểm nhất định. Để làm rõ hơn thì hãy đọc tiếp về keyframe nhé!

### Keyframe rules
Hãy xem ví dụ dưới đây
```
@keyframes example-animation {
  0% {
   width: 50px;
  }
  100% {
    width: 100px;
  }
}
```
Giờ hãy cùng phân tích câu lệnh trên nhé: 
<br>
Trước hết từ khóa **keyframes** là để biểu hiện ta sẽ viết animation ở đây. Tiếp đến là tên animation, tên này có thể tùy ý do mình tự đặt, ở trường hợp trên là **example-animation**. 
<br>
Trong dấu *mở ngoặc nhọn* ta sẽ viết một list các keyframes. Với trường hợp trên thì animation sẽ chuyển động bắt đầu từ `0%` và kết khúc đi đến `100%`. Trong một vài trường hợp bạn cũng có thể sẽ nhìn thấy `from` và `to` cũng tương tự là `0%` và `100%`, ví dụ
```
@keyframes example-animation {
  from {
   width: 50px;
  }
  50% {
   width: 99px;
  }
  to {
    width: 100px;
  }
}
```

### Áp dụng Keyframe rules vào một thành phần:
Sau khi tạo ra được 1 keyframe thì chúng ta cần kết nối keyframe này với 1 thành phần như sau:
```
element {
    animation-name: example-animation;
    animation-duration: 2s;
}
```
Animation-name chính là tên animation mà chúng ta đã tạo ở ví dụ trên. Animation-duration biểu thị thời gian mà chúng ta muốn animation này chạy. Nó có thể biểu thị bằng giây(s) hoặc mili giây (ms). 

{@codepen: https://codepen.io/thang21/pen/oPavaG}

# 2. Một vài thuộc tính quan trọng của animation
## Animation delay
`animation-delay` là thuộc tính cho phép trì hoãn animation trong khoảng 1 khoảng thời gian trước khi chính thức chạy animation này, ví dụ:

```
element {
    animation-name: animation-1;
    animation-duration: 2s;
    animation-delay: 5s; // Sau 5 giây, animation này mới bắt đầu chạy
 }
```

## Animation iteration count: số lần chạy animation
Với thuộc tính `animation-iteration-count`, chúng ta có thể cho phép số lần chạy cho animation bao nhiều lần tùy thích, hoặc nếu muốn nó lặp đi lặp lại thì có thể để `infinite`. Còn với `animation-duration` là thời gian chạy của animation từ lúc bắt đầu đến lúc kết thúc như ở ví dụ dưới sẽ là 2s:
```
element {
   animation-name: animation-1;
   animation-duration: 2s;
   animation-delay: 5s;
   animation-iteration-count: 3; //chạy 3 lần
 }
```

Cùng xem ví dụ cụ thể cho 2 trường hợp trên nhé:

{@codepen: https://codepen.io/thang21/pen/zJJggO}


## Trước và sau trạng thái của animation
Thuộc tính `animation-fill-mode` sẽ cho phép biểu thị trạng thái của thành phần trước khi animation chạy và sau khi animation kết thúc

- `animation-fill-mode: forwards;` — sau khi animation hoàn tất, trạng thái của thành phần này trả về cái cuối cùng

- `animation-fill-mode: backwards;` — sau khi animation hoàn tất, trạng thái của thành phần này trả về cái đầu tiên

- `animation-fill-mode: both;` — trước khi animation bắt đầu, thì thành phần sẽ trả về cái đầu tiên và khi nó kết thúc sẽ là cái cuối cùng.

Hãy xem ví dụ dưới đây: 

{@codepen: https://codepen.io/thang21/pen/OoBJJG}

## Animation launch and pause
Với thuộc tính `animation-play-state`, thì nó chỉ có duy nhất 2 giá trị đó là `running`, hoặc `paused`. Khá đơn giản và dễ hiểu

## Animation direction
Thuộc tính `animation-direction` giúp chúng ta có thể điều chỉnh chiều hướng của animtion:

* `animation-direction: normal;` — đây là thuộc tính mặc định, sẽ chạy như như bình thường

* `animation-direction: reverse;` — thuộc tính này sẽ chạy đảo ngược, từ `to` đến `from`.

* `animation-direction: alternate;` — thuộc tính này ban đầu sẽ chạy từ normal đến reverse - nghĩa là ban đầu sẽ chạy từ `from` đến `to` và tiếp đến là từ `to` đến `from` rồi lại trở lại `from` đến `to` và cứ tiếp đến như vậy cho tới khi kết thúc animation.

* `animation-direction: alternate-reverse;` — tương tự như trên nhưng ngược lại.

{@codepen: https://codepen.io/thang21/pen/YOJJXp}

## Điều chỉnh tốc độ chạy của animation
Thuộc tính `animation-timing-function` cho phép chúng ta điều chỉnh tốc độ chạy của animation. Một vài giá trị khá quen thuộc như: `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`, `cubic-bezier`.
<br>
Tuy nhiên, bạn cũng có thể tự tạo ra các function tùy ý với `animation-timing-function: cubic-bezier(x1, y1, x2, y2);` 
<br>
Bạn có thể tìm hiểu thêm [tại đây](http://cubic-bezier.com/#.17,.67,.83,.67) hoặc [tại đây](https://matthewlein.com/tools/ceaser).

![](https://images.viblo.asia/8b050589-1325-4b23-8223-3df5843b7f8c.png)
# 3. Browser support
CSS Animations được hỗ trợ khá tốt trên mọi trình duyệt kể cả IE. 
![](https://images.viblo.asia/9428d7b5-818e-4ca1-97b3-3bb76403d82e.png)

<br>
Vừa rồi là bài viết về CSS Animation, mong rằng sau bài viết này bạn có thể hiểu hơn cũng như nắm rõ hơn về Animation và cách hoạt động của nó. Ở bài viết sau mình sẽ nói về cách kết hợp các thuộc tính của CSS3 kết hợp với Animation nhé! Chúc các bạn học tốt!
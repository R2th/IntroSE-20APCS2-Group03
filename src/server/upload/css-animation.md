**Giới thiệu:**

Thuộc tính **animation** trong CSS có thể được sử dụng để tạo sinh động cho nhiều thuộc tính CSS khác như màu sắc, màu nền, chiều cao hoặc chiều rộng. Mỗi animation cần phải được định nghĩa bằng nguyên tắc @keyframes sau đó được gọi với thuộc tính animation, như sau:

### 1. Các thuộc tính riêng lẻ

**Thuộc tính @keyframes**

Thuộc tính này có tác dụng thiết lập một chuyển động.

**Cú pháp:**

```
@keyframes Name {
  /*code*/
}
```

**Trong đó:**

* **Name**: là tên của chuyển động.
* **code:** là các đoạn code cho tiến trình chuyển động.
  * Đoạn code này có thể là các phần trăm từ 0% đến 100%
  * Hoặc cũng có thể là 2 thuộc tính from (tương ứng với 0 %), to (tương ứng với 100 %)

**Thuộc tính animation-name**

Thuộc tính này có tác dụng xác định thành phần sẽ thực thi animation nào.

**Cú pháp:**

```
animation-name: name;
```

**Trong đó:** 

**name:** là tên của thuộc tính keyframe ở phía trên.

**Ví dụ:**

```
@keyframes move {
    from {top: 0px;}
    to {top: 100px;}
}
p {
    animation-name: move;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    position: absolute;
    width: 100px;
    height: 100px;
    padding: 10px;
    background-color: orange;
}
```
**Thuộc tính animation-duration**

Thuộc tính này có tác dụng thiết lập khoảng thời gian thực thị 1 chuyển động animation.

**Cú pháp:**

```
animation-duration: time;
```

**Trong đó:** 

**time:** là có thể tính bằng **s** hoặc **ms**.

**Ví dụ:**

```
@keyframes move {
    from {top: 0px;}
    to {top: 100px;}
}
p {
    animation-name: move;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    position: relative;
    width: 100px;
    height: 100px;
    padding: 10px;
    background-color: orange;
}
```

**Thuộc tính animation-timing-function**

Thuộc tính này có tác dụng xác định tốc độ chuyển động của một animation sẽ như thế nào.

**Cú pháp:**

```
animation-timing-function: value;
```

**Trong đó:**

**value:** là một trong các giá trị sau:

* linear - chuyển động cùng 1 tốc độ từ đầu đến cuối.
* ease - chuyển động lúc đầu chậm sau đó nhanh dần và lại chậm dần về cuối (đây là giá trị mặc định).
* ease-in - chuyển động chậm ở đầu.
* ease-out - chuyển động chậm ở nửa cuối.
* ease-in-out - chuyển động chậm cả ở đầu và về cuối.
* step-start.
* step-end.
* steps(int,start|end) - chia animation ra thành các bước (int).
* cubic-bezier(n,n,n,n).

**Thuộc tính animation-delay**

Thuộc tính này có tác dụng xác định độ trễ của mỗi lượt chuyển động.

**Cú pháp:**

```
animation-delay: value;
```

**Trong đó:**

**value:** là khoảng thời gian trễ, được tính bằng **s** hoặc **ms**.

**Ví dụ:**

```
@keyframes move {
    from {top: 0px;}
    to {top: 200px;}
}
p {
    animation-name: move;
    animation-duration: 3s;
    /*Thiết lập thời gian trễ cho animation 2s*/
    animation-delay: 2s;
    animation-direction: normal;
    animation-iteration-count: infinite;
    position: relative;
    width: 100px;
    height: 100px;
    padding: 10px;
    background-color: orange;
}
```

**Thuộc tính animation-iteration-count**

Thuộc tính này có tác dụng, thiết lập số lần thực hiện một animation.

**Cú pháp:**

```
animation-iteration-count: value;
```

**Trong đó:**

**value:** là một trong các giá trị sau:

* là các con số lơn hơn 0 (mặc định value = 1).
* **infinite** - chạy không giới hạn số lần.

**Thuộc tính aniamtion-direction**

Thuộc tính này có tác dụng xác định xem chiều chạy của animation sẽ như thế nào.

**Cú pháp:**

```
aniamtion-direction: value;
```

**Trong đó:**

**value:** là một trong các giá trị sau:

* normal - animation chạy tự bình thường (đây là giá trị mặc định).
* reverse - animation sẽ chạy ngược lại so với bình thường.
* alternate - animation sẽ chạy bình thường ở các lượt lẻ (1,3,5,7,...) và chạy ngược lại ở các lượt chẵn (2,4,6,8,...).
* alternate-reverse - animation sẽ chạy ngược lại ở các lượt lẻ (1,3,5,7,...) và chạy bình thường ở các lượt chẵn (2,4,6,8,...).

**Ví dụ:**

```
@keyframes move {
    from {top: 0px;}
    to {top: 100px;}
}
p {
    animation-name: move;
    animation-duration: 3s;
    animation-direction: normal;
    animation-iteration-count: infinite;
    position: relative;
    width: 100px;
    height: 100px;
    padding: 10px;
    background-color: orange;
}
```

**Thuộc tính animation-fill-mode**

Thuộc tính này có tác dụng xác định trạng thái của một animation, khi mà animation không được chạy (có thể là animation này đã chạy xong hoặc đang bị delay).

**Cú pháp:**

```
animation-fill-mode: value;
```

**Trong đó:**

**value:** là một trong các giá trị sau:

* none  - đây là giá trị mặc định. Khi mà animation không hoạt động nữa thì nó sẽ không thêm một style nào vào thành phần.
* forwards - khi mà animation không hoạt động nữa thì nó sẽ apply hết tất cả các thuộc tính cuối cùng của animation.
* backwards - khi mà animation không hoạt động nữa nó sẽ apply tất cả các giá trị của thuộc tính trong lần đầu xuất hiện trong keyfames (phụ thuộc vào thuộc tính anmation-direction).
* both.

**Thuộc tính animation-play-state**

Thuộc tính này có tác dụng xác định trạng thái của animation.

**Cú pháp:**

```
animation-platy-state: value;
```

**Trong đó:**

**value:** là 1 trong 2 giá trị sau:

* running - animation đang chạy.
* paused - animation đang dừng.

### 2. Thuộc tính gộp

Ở phần trên mình đã hướng dẫn mọi người các thuộc tính riêng lẻ để tạo lên một chuyển động animation, nhưng có vẻ như làm như thế sẽ rất dài dòng. Và trong CSS3 có hỗ trợ chúng ta 1 thuộc tính có thể khai báo toàn bộ giá trị của các thuộc tính trên vào. Đó là thuộc tính **animation**.

**Cú pháp:**

```
animation: name duration timing-function delay iteration-count direction fill-mode play-state
```

**Ví dụ:**

```
@keyframes move {
    from {top: 0px;}
    to {top: 200px;}
}
p {
    animation: move 2s infinite;
    position: relative;
    width: 100px;
    height: 100px;
    padding: 10px;
    background-color: orange;
}
```

### 3. Ví dụ

Áp dụng các thuộc tính animation mà mình vừa giới thiệu để code 1 cái đồng.

```
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Demo</title>
</head>
<style type="text/css" media="screen">
    /*Tạo chuyển động cho giây*/
    @keyframes second {
        from {transform: rotate(-90deg);}
        to {transform: rotate(270deg);}
    }
    /*Tạo chuyển động cho phút*/
    @keyframes minute {
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }
    /*Tạo chuyển động cho giờ*/
    @keyframes hour {
        from {transform: rotate(-90deg);}
        to {transform: rotate(270deg);}
    }
    /*CSS cho Đồng hồ*/
    .clock {
        position: relative;
        width: 320px;
        margin: 0 auto;
    }
    .radius {
        position: absolute;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 15px solid orange;
        z-index: 2;
    }
    [class*="line-"] {
        position: absolute;
        top: 90px;
        left: 13px;
        background: black;
        width: 155px;
        height: 5px;
        z-index: -1;
    }
    .line-1 {
        /*tạo góc 12h và 6h*/
        transform: rotate(-90deg);
    }
    .line-2 {
        /*Tạo góc 1h và 7h*/
        transform: rotate(-60deg);
    }
    .line-3 {
        /*Tạo góc 2h và 8h*/
        transform: rotate(-30deg);
    }
    .line-4 {
        /*Tạo góc 3h và 9h*/
        transform: rotate(0deg);
    }
    .line-5 {
        /*Tạo góc 4h và 10h*/
        transform: rotate(30deg);
    }
    .line-6 {
        /*Tạo góc 5h và 11h*/
        transform: rotate(60deg);
    }
    .solid {
        background-color: white;
        width: 140px;
        height: 140px;
        position: absolute;
        border-radius: 50%;
        top: 20px;
        left: 20px;
    }
    .second {
        /*Tạo chuyển động cho kim giây chạy 60s 1 vòng*/
        animation: second 60s infinite steps(60,end);
        left: 90px;
        top: 90px;
        -webkit-transform-origin: left;
        position: absolute;
        background: gray;
        width: 65px;
        height: 2px;
    }
    .minute {
        /*Tạo chuyển động cho kim phút chạy 3600s =1h*/
        animation: minute 3600s infinite;
        left: 90px;
        top: 90px;
        -webkit-transform-origin: left;
        position: absolute;
        background: gray;
        width: 60px;
        height: 3px;
    }
    .hour {
        /*Tạo chuyển động cho kim giờ chạy 216000s  = 24h*/
        animation: hour 216000s infinite;
        left: 90px;
        top: 90px;
        -webkit-transform-origin: left;
        position: absolute;
        background: gray;
        width: 50px;
        height: 5px;
    }
    .center {
        background: red;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        position: absolute;
        top: 80px;
        left: 78.5px;
        z-index: 10;
    }
</style>
<body>
    <div class="clock">
        <div class="line">
            <div class="line-1"></div>
            <div class="line-2"></div>
            <div class="line-3"></div>
            <div class="line-4"></div>
            <div class="line-5"></div>
            <div class="line-6"></div>
            <div class="solid"></div>
        </div>
        <div class="radius"></div>
        <div class="center"></div>
        <div class="second"></div>
        <div class="minute"></div>
        <div class="hour"></div>
    </div>
</body>
</html>
```

**Kết luận:**

Ngày nay thuộc tính **animation** được áp dụng rất nhiều vào trong các trang web nhằm tăng trải nghiệm của người dùng, nên bạn cần phải biết cách sử dụng các thuộc tính này...Hy vọng bài viết này sẽ giúp ích các bạn.

**Tham khảo:**

https://css-tricks.com/almanac/properties/a/animation/

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations

https://toidicode.com/
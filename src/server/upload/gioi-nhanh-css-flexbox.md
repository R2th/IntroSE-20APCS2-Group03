### Giới thiệu
Chào toàn thể Anh Chị Em của cộng đồng Viblo !
Hôm nay chúng ta sẽ lại nói về CSS Flexbox, một vũ khí hạng nặng để xây dựng layout website 1 cách đơn giản. 
Chắc hẳn là với các bạn Frontend thì Flexbox đã dùng quá thạo rồi đúng không nhỉ, nếu vậy đây là 1 bài để chúng ta cùng nhìn lại ôn lại cùng nhau trao đổi nhé còn với các bạn Backend đang muốn thành thạo về Flexbox hay các bạn mới thì đây là 1 bài viết sẽ giúp các bạn hiểu sâu và sử dụng Flexbox thành thạo đấy. Chúng ta sẽ đi qua ví dụ thực tế để vừa học các thuộc tính của Flexbox vừa thấy được cách Flexbox hoạt động để dễ hiểu hơn nhé.

###  Flexbox Architecture
Đầu tiên chúng ta cùng xem cấu trúc của Flexbox ở ảnh bên dưới nhé. `Flex-Container` bao giờ cũng là 1 thằng Div cha rồi, bên trong nó sẽ bọc các phần tử con là A, B, C, Main Axis là toạ độ nằm ngang từ trái sang phải còn Cross Axis bằng trục Y từ trên xuống duới , kiểu giống như toạ độ trong toán học ý. Chiều nằm ngang thì cũng có điểm đầu vs điểm cuối tương ứng với Main-Start và Main-End. Chiều dọc cũng tương tự vậy. Cũng rất dễ hiểu các bạn nhỉ :)
![](https://images.viblo.asia/e1ff6cde-eca9-43e3-b026-004d12856d28.png)

### Flexbox chart 
Một hình ảnh thống kê lại toàn bộ sơ đồ các thuộc tính và các giá trị tương ứng của Flexbox trong đó `display`,`flex-direction`,`justify-content` và `align-items` là luôn được sử dụng nhiều nhất để dàn layout.

![](https://images.viblo.asia/eae749d1-06b3-4058-9453-bb2025a43be2.png)

### Ví dụ 
Để dễ hiểu chúng ta sẽ làm 1 ví dụ nhé, trong ví dụ có giải thích cụ thể chi tiếp và có thể xem trực tiếp cách hoạt động của Flexbox và các bạn cũng có thể xem qua Codepen cho trực quan ở phía dưới nhé. Layout mà chúng ra sẽ làm là như thế này
![](https://images.viblo.asia/2abbcd6c-6369-45b6-adfd-f196bb3c6043.png)

Đây là cấu trúc của nó,  ảnh để cũng thấy dễ hiểu hơn các bạn nhỉ.
![](https://images.viblo.asia/e0648eb8-4933-45d2-a154-9b786367d323.png)


Trước tiên tạo bố cục bằng HTML như thế này, ở đây mình sẽ viết bằng Pug
```Pug
.container
  .block-1
    .box-1 1
  .block-2
    .box-2 2
    .box-3 3
    .box-4 4
  .block-3 
    .box-5 5
```
Render ra HTML thì sẽ ra thế này
```HTML
<div class="container">
  <div class="block-1">
    <div class="box-1">1</div>
  </div>
  <div class="block-2">
    <div class="box-2">2</div>
    <div class="box-3">3</div>
    <div class="box-4">4</div>
  </div>
  <div class="block-3">
    <div class="box-5">5</div>
  </div>
</div>
```
Tiếp theo chúng ta sẽ tạo layout, ở đây sẽ được biết bằng SCSS

1.Setting base
```SCSS
// defining border color, gap, padding in variables 

$gap : 4vh;
$padding : 4vh;
$color : #48CAE4;

// Defining Break-Points

$bp : (
  mobile : 480px,
  tablet : 768px,
  desktop : 1440px,
);

//Defining our Conditional Media query Mixins.

@mixin query($display){
  @each $key, $value in $bp{

    //  defining max-width
    @if ($display == $key){
      @media (max-width: $value){@content;}
    }
  }
}

//Changing The Default Settings..

*{
  margin:0px;
  padding: 0px;
  box-sizing: border-box;
  body{
    width: 100%;
    min-height: 100vh;
    font-family: sans-serif;
    font-size: 45px;
  }
}
```

Dàn layout cho HTML ở trên để đuợc như ảnh
```SCSS
// Style rules for .container
.container{
  display: flex;
  flex-direction: column; // dàn các box theo hướng dọc (Cross Axis)
  gap: $gap; // Gap ở đây là khoảng các giữa các block và các box
  padding: $padding;
}

// Style rules of all .block-*
[class ^="block-"]{ Khi sử dụng attribute này sẽ style vào những thằng div nào có class chứa chữ block
  display: flex;
  flex-direction: row; // dàn các box theo hướng nằm ngang (Main Axis)
  gap: $gap;
}

// Style rules of all .box-*
[class ^="box-"]{
  display: flex;
  justify-content: center;
  align-items: center;
  border : 1vh solid $color;
  border-radius: 10px;
}

// Defining A & E Together
.box-1,.box-5{
  flex-basis: 100%;
  height: 20vh;
}

// Defining C here
.box-3{
  flex-basis: 60%;
//   Removing Gap & padding
  height: 60vh -$gap*2-$padding*2;
}

// Defining B & D Together
.box-2,.box-4{
  flex-basis: 20%;
}

// Media query for mobile Screen

@include query(mobile){
  .block-2{
    flex-direction: column;
    height: 60vh;
  }
// Hiding our B block
  .box-2{
    display: none;
  }
// Increasing Height of C  
  .box-3{
    flex-basis: 80%;
  }
}
```

Demo trên Codepen
https://codepen.io/tran-hanh/pen/wvgEgQX


### Lời kết
Flexbox là 1 kỹ thuật CSS dàn layout đang rất được ưa chuộng và sử dụng ở mọi nơi tương thích được với các trình duyệt đời mới , khi kết hợp với Bootstrap thì việc sử dụng Flexbox còn nhanh thuận tiện gấp nhiều lần. Hi vọng bài viết sẽ giúp ích cho các bạn Backend và các bạn mới muốn tìm hiểu học về Flexbox có thể học được nhanh và thấy thật đơn giản. Cảm ơn các bạn đã đọc bài !

Tham khảo : [dev.to](https://dev.to/)
#  Những kỹ thuật Responsive cơ bản bạn nên biết
Để nối tiếp [Phần I](https://viblo.asia/p/toi-uu-css-can-ban-den-chuyen-nghiep-phan-1-XL6lA8vBZek), mình tiếp tục bài viết với chủ đề: Làm sao để viết CSS đáp ứng mọi độ phân giải màn hình. Viết 1 lần mà hiển thị được trên tất cả các thiết bị.

## Những lưu ý quan trọng.

Mỗi dự án có nhưng yêu cầu khác nhau về việc tổ chức code và những tiêu chuẩn viết mã. Tuy nhiên theo kinh nghiệm học được từ những leader có nhiều năm kinh nghiệm thì tôi sẽ nêu ra một vài chú ý sau đây để khi bắt đầu 1 dự án mới chúng ta có thể áp dụng:

> - Hạn chế sử dụng style inline trong html
> - Hạn chế sử dụng ID: chỉ trừ 1 số trường hợp rất đặc biệt bắt buộc sử dụng các hàm javascript, jquery, và thư viện để select query phần tử cần thiết đó.
> - Dùng chủ yếu là class. Cách đặt tên class thật rõ nghĩa. Theo flow chung. Có thể áp dụng BEM.
> - Tránh sử dụng !importaint. Nếu bạn sử dụng .class trong mọi trượng hợp thì việc sử dụng !importaint là không cần thiết. Bạn có thể thay bằng việc cụ thể hơn với việc sử dụng độ ưu tiên chi tiết trong css như hướng dẫn phần I.
> - Sử dụng SCSS để tạo các file SCSS chức năng riêng và dùng @import theo từng file component riêng để không phát sinh thêm code dư thừa. Sử dụng lại một cách hợp lý.
> 
Tham khảo:

 [7 tips quan trọng để viết CSS tốt hơn](https://viblo.asia/p/7-tips-quan-trong-de-viet-css-tot-hon-naQZRpEP5vx)

[Một số mẹo tối ưu hóa HTML/CSS/JS đúng chuẩn](https://viblo.asia/p/mot-so-meo-toi-uu-hoa-htmlcssjs-dung-chuan-eW65GdJPKDO)
## 1: Tìm hiểu về Media Query
> Media Queries là một kỹ thuật CSS được giới thiệu trong CSS3. Ta sử dụng cú pháp @media để bao gồm một khối các thuộc tính CSS chỉ khi một điều kiện nhất định là đúng. Nói một cách đơn giản là ta sẽ định nghĩa CSS riêng cho một nhóm các thiết bị có kích thước giống nhau.
> 
> Media Type giúp ta xác định định dạng của mỗi loại thiết bị. Tất cả các giá trị của Media Type bao gồm:
```
All: Dùng cho tất cả các loại Media Type
Aural: Dùng cho speech and sound synthesizers
Braille: Dùng cho các devices liên quan đến chữ nổi (braille)
Embossed: Dùng cho các loại máy in các trang braille
Handheld: Dùng cho các thiết bị nhỏ, thiết bị cầm tay
Print: Dùng cho máy in
Projection: Dùng cho các loại máy chiếu
Screen: Dùng cho computer screen
Tty: Dùng cho các thiết bị sử dụng fixed-pitch character grid
Tv: Dùng cho các loại TV
```
Ta có thể sử dụng Media Type theo cú pháp sau đây:

`@media media_type {
    rules
}`
```
#Ví dụ 1
```
```
/*Áp dụng cho computer*/
@media screen {
  body {
    min-width: 960px;
  }
}
/*Áp dụng cho các thiết bị cầm tay*/
@media handheld {
  body {
    max-width: 320px
  }
}
```
### Media Query Syntax
`@media media_type (feature:value) { rules } `

Các thuộc tính feature và value sẽ giúp chúng ta xác định chính xác từng loại màn hình mà ta mong muốn.

*Mặc định của Media Type sẽ luôn là all, thế nên ta có thể lược bỏ phần mediatype ở trên nếu muốn nó được apply cho tất cả các devices.*

> Media Feature quan trọng: width, height, min-width, min-height, max-width, max-height, aspect-ratio và device-aspect-ratio, device-width, device-height, orientation...

Cách áp dụng:
```
/*Áp dụng cho những màn hình có có chiều rộng <= 900px*/
@media (max-width: 900px) { body {font-size: 16px;} }
/*Áp dụng cho những màn hình có chiều rộng >= 600px*/
@media (min-width: 600px) { body {font-size: 14px;} }
/*Áp dụng cho những màn hình có chiều rộng >= 800px*/
@media (min-width: 800px) { body {font-size: 15px;} }
/*Áp dụng cho những màn hình có chiều rộng <= 700px*/
@media (max-width: 700px) { body {font-size: 13px;} }
```

`#Ví dụ 2`
```
#Nếu kích thước của màn hình mobile là 600px hoặc nhỏ hơn, màu nền sẽ là blue và mặc định độ phân giải PC sẽ là màu vàng.

.backgound-responsive {
    color: black;
    background-color: yellow;
    
    # tablet
    @media only screen and (max-width: 960px) {
        body {
            background-color: red;
        }
    }
   
   # mobile
    @media only screen and (max-width: 599px) {
        body {
            background-color: blue;
        }
    }
}
```

Như vậy thì khi độ phân giải màn hình đang ở kích thức nào thì trong class sẽ ưu tiên áp dụng các thuộc tính tương ứng.
## 2: Tạo Mixin sử dụng breakpoint hiệu quả trong SCSS.
> Để có thể sử dụng lại một cách thuận tiện thì việc đặt các breakpoint theo tỷ lệ màn hình là rất cần thiết để tiết kiệm thời gian cũng như làm code sạch hơn, dễ đọc hơn là viết lại media query tại mỗi class chẳng hạn.
> 
> Trong file SCSS chúng ta tạo 1 file breakpoint.scss như sau:
```
$breakpoints: (
  phone-down: '(max-width: 480px)',
  phone-up: '(min-width: 481px)',
  tablet-down: '(max-width: 960px)',
  tablet-up: '(min-width: 961px)',
  iphone: '(device-width: 375px) and (device-height: 810px) and (-webkit-device-pixel-ratio: 2) and (orientation : portrait)',
);
```
Và ngay phía dưới chúng ta tạo Mixin sử dụng các breakpoint ở phía trên:
```
/// @access public
/// @param {String} $breakpoint
/// @requires $breakpoints

@mixin respond-for($breakpoint) {
  $querys: map-get($breakpoints, $breakpoint);

  @if $querys {
    $query: if(
        type-of($querys) == 'string',
        unquote($querys),
        inspect($querys)
    );

    @media screen and #{$query} {
      @content;
    }
  }
}
```
Và cách áp dụng như sau.
```
@import "breakpoints";

.element-example {
    min-width: 145px;
    
    # tablet to desktop
    @include respond-for(tablet-up) {
        margin-right: 18px;
    }
    
    # Phone
    @include respond-for(phone-down) {
        margin-right: 14px;
        margin-top: 14px;
    }
}
```
Như vậy chúng ta đã sử dụng các breakpoint tương ứng phía trên mà không cần phải viết lại @media cho mỗi lần sử dụng.

Kết thúc phần Responsive vs media query chúng ta sẽ đi đến một kỹ thuật mới hơi, linh hoạt hơn trong việc tạo ra những giao diện cực kỳ uyển chuyển.

## 3: Flex-Box kỹ thuật Responsive hiệu quả.
![](https://images.viblo.asia/3993dbfa-90d5-4ab2-9c7a-d7f8a1027bab.png)
> Trước đây khi chúng ta thiết kế web đặc biệt là dàn trang layout, menu, chia các cột cho các thành phần trong web thì hầu hết đều sử dụng các thuộc tính như float kèm theo đó là clear float để chia cột . Khó khăn là khi responsive và hiển thị trên nhiều thiết bị phải chỉnh sửa code khá nhiều nên rất tốn thời gian.
> 
> Hoặc nhanh hơn thì các bạn sử dụng CSS Framework như bootstrap chẳng hạn, nhưng như thế thì website của bạn lại có nhiều đoạn code ‘dư thừa’ bạn không sử dụng gây ảnh hưởng đến tốc độ website…
> 
> Thế là Flexbox được sinh ra để cải thiện tình hình này, giúp cho việc dàn trang, canh các thành phần với nhau linh hoạt, dễ dàng và tiết kiệm thời gian hơn rất nhiều.
> Flexbox là một kiểu dàn trang (layout mode) mà nó sẽ tự cân đối kích thước của các phần tử bên trong để hiển thị trên mọi thiết bị. Nói theo cách khác, bạn không cần thiết lập kích thước của phần tử, không cần cho nó float, chỉ cần thiết lập nó hiển thị chiều ngang hay chiều dọc, lúc đó các phần tử bên trong có thể hiển thị theo ý muốn.

### Thuộc tính Display: Flex

> Bố cục Flex được thiết lập từ một khung lớn (parent container) đóng vai trò là khung linh hoạt (flex containter) và các thẻ con ngay trong nó (immediate children) đóng vai trò các mục nhỏ linh hoạt (flex items).
> 
> Từ hình ảnh trên bạn có thể thấy các thuộc tính và thuật ngữ được sử dụng để mô tả khung linh hoạt (flex containter) và các các mục nhỏ linh hoạt (flex items).
> Tạo Flexbox cơ bản như sau:

```
<div class="flex-container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  div class="item"></div>
</div>
```

```
#Flexbox container

.flex-container {
  display: -webkit-flex; /* Safari */
  display: flex;
  background-color: #1a1c28;
}

#Flexbox container inline
.flex-container {
  display: -webkit-inline-flex; /* Safari */
  display: inline-flex;
  background-color: #1a1c28;
}

.item {
  width: 150px;
  height: 150px;
}
```

### flex-direction
![](https://images.viblo.asia/0fc48538-4c91-49eb-8c39-f506b25351bf.png)
> flex-direction định nghĩa hướng của các item trong container. Giống như trục X và Y trong toán học đồ thị.
> 
> flex-direction: row là giá trị mặc định trong flex-direction các items sẽ được sắp xếp theo chiều ngang(trục X) và hiển thị từ trái sang phải.
> 
> Trong đó:

* row (default): trái qua phải
* row-reverse: phải qua trái
* column: trên xuống dưới
* column-reverse: dưới lên trên

```
#Ví dụ:

.flex-container {
  flex-direction: column-reverse;
}
```
Kết quả:
![](https://images.viblo.asia/2e5e26cc-117d-4a75-a63f-a9fb6715ffcf.png)

### flex-wrap
![](https://images.viblo.asia/a71692fb-e31d-4c20-85e1-e667d4804b1f.png)
> Cho phép các items tự động xuống hàng hoặc vẫn luôn nằm trên cùng một hàng khi resize lại kích thước màn hình.

> Mặc định, các item sẽ co để vừa vào 1 dòng. Tuy nhiên bạn cũng có thể tuỳ chỉnh flex-wrap.
```
.container{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

* nowrap (default): 1 dòng
* wrap: nhiều dòng
* wrap-reverse: nhiều dòng và thể hiện theo thứ tự trái-phải và dưới-trên

### justify-content
![](https://images.viblo.asia/45b64f9c-39e6-445a-8d92-d099829609e6.jpg)

Thuộc tính này cho phép các bạn căn chỉnh các phần tử theo chiều ngang hoặc chiều dọc tùy thuộc vào thuộc tính flex-direction.
```
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

* flex-start (default): Các item dồn về bên trái.

![](https://images.viblo.asia/8722b88e-e3d1-4837-99f4-9f869820bd41.png)
* flex-end: các item dồn về bên phải.
* center: các item được căn giữa dòng.
* space-between: các item được căn cách đều nhau. Item đầu sẽ ở sát đầu dòng, item cuối sẽ ở cuối.
* space-around: các item được căn cách đều nhau và cách đều cả 2 đầu.
```
# Ví dụ
.flex-container {
  justify-content: space-around;
}
```
Kết quả:
![](https://images.viblo.asia/6adf12ad-1420-4272-b656-6ab967f2e8ad.png)

### Align-items
![](https://images.viblo.asia/9eb395d5-0374-44ad-b3d7-2a956d37b2d0.gif)
> Ngược lại với thuộc tính justify-content thì mặc định align-items canh các phần tử theo chiều dọc thay vì chiều ngang như justify-content.
> Trường hợp đầu tiên khi làm việc với flex-direction: row(mặc định). Các phần tử sẽ được canh theo chiều dọc. 
> Trong align-items có 5 giá trị đó là: flex-start, flex-end, center, stretch(default), baseline(typography)
> 
![](https://images.viblo.asia/31cd09e2-64f0-4922-9c6a-6bb7935febd1.png)

### Align-self

Thuộc tính  này tương tự với thuộc tính align-items ở trên nhưng khác ở chỗ là áp dụng riêng lẻ cho các phần tử mà bạn muốn thay đổi giá trị của nó. Nó được ưu tiên cao hơn  align-items.
Giả sử bạn có các phần tử đều là align-items: flex-start(mặc định) nhưng bạn muốn thẻ div màu vàng ở giữa chứ không phải ở trên thì lúc này các bạn chỉ cần css cho thẻ div màu vàng align-self: center là được.

### Flex-grow
![](https://images.viblo.asia/55c71b2a-44de-4679-b383-348a0310e4fb.png)

![](https://images.viblo.asia/875e5d3a-3d0c-4322-9a19-8891dce21c8c.png)

> Thuộc tính này khá là phức tạp nè, nó cho các phần tử giãn theo độ rộng của container, để mình giải thích cho các bạn qua từng hình ảnh nha. Đầu tiên mình cho các phần tử có độ rộng là 120px.
> 
> Mặc định giá trị trong thuộc tính flex-grow là 0. Nghĩa là các phần tử sẽ không tự động co giãn kích thước khi chiều rộng của container bao ngoài thay đổi. Hơi khó hiểu nhỉ ? Để mình tăng flex-grow lên 1 cho các phần tử coi sao.
> 
> Giá trị của flex-grow rất là linh động chứ không tuyệt đối nghĩa là khi set giá trị flex-grow cho các phần tử thì các phần tử đều có tỉ lệ với nhau. Ví dụ set tất cả các phần tử flex-grow là 1 thì tất cả đều như nhau tỉ lệ 1:1, nếu set 999 cho toàn bộ thì cũng vậy vì bằng nhau hết mà đơn giản về hết cũng là 1:1.
> Nhưng khi áp dụng riêng flex-grow cho mỗi phần tử riêng biệt thì flex sẽ tính lại toàn bộ tỷ lệ rồi co giãn lại đúng theo tỷ lệ trên toàn bộ giá trị tổng tính được

![](https://images.viblo.asia/146b60ad-75a0-4f8c-9b06-fcef0330e8a9.gif)


### Flex-shrink
![](https://images.viblo.asia/d5801d9e-7127-49f1-b1b6-f6c4fae11717.gif)
> Thuộc tính này thì nó ngược lại so với thuộc tính flex-grow ở trên, nó không giãn ra mà lại co lại khi chúng ta thay đổi độ rộng của container xuống. Mặc định giá trị trong flex-shrink là 1 nghĩa là cho phép các phần tử co lại khi độ rộng container giảm xuống.
> 

### Flex-basis
> Set chiều rộng hoặc chiều cao của phần tử dựa vào flex-direction row hay column.
> 
> Mặc định là flex-direction: row cho nên lúc này flex-basis sẽ tương ứng với thuộc tính width của phần tử và khi flex-direction: column thì lúc này flex-basis sẽ là height của phần tử.
> 
> Thuộc tính flex-basis sẽ đè lên thuộc tính width hoặc height của phần tử tùy thuộc vào giá trị của flex-direction. Các bạn có thể thay giá trị cho flex-direction vào Codepen dưới đây để hiểu hơn nha.
>
### Flex compound
![](https://images.viblo.asia/02ebb877-4aeb-448a-a0dd-7a108e3434e4.gif)
Flex là viết tắt của 3 thuộc tính flex-grow flex-shrink và flex-basis. 

Cú pháp: flex: 0 0 300px;
![](https://images.viblo.asia/c61b33e7-09b7-464c-b496-b07716aec531.gif)
Tham khảo: [https://evondev.com/css-flexbox-phan-3/]

## Áp dụng Flexbox trong dự án thực tế
### Sử dụng mixin cho Flexbox.

Trong file mixin.scss dự án thêm đoạn code như sau để tương thích với các trình duyệt:
```
@mixin flexbox() {
  display: flex;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
}
```

Trong file scss của chức năng chúng ta sẽ sử dụng breakpoint ở ví dụ phía trên và mixin vừa tạo ta có kết quả áp dụng như sau:
```
@import "variables";
@import "mixins";

.item {
    @include flexbox()
    flex-wrap: wrap;
    justify-content: space-round;
    
    @include respond-for(tablet-down) {
      margin-right: 16px;
      flex: 1 0 300px;
      justify-content: space-between;
    }

    @include respond-for(phone-up) {
      justify-content: center;
    }
 }
```

## Tổng kết:

**Media Query** là kỹ thuật giúp điều chỉnh lại thuộc tính các phần tử mong muốn theo kích thước màn hình đã được định nghĩa.

**Flexbox** thì linh hoạt hơn. Các item element được điều chỉnh không chỉ theo kích thước màn hình mà còn tự động điều chỉnh theo tỷ lệ của các items trong flex-container bất kể màn hình có kích thước như nào. Các items trở lên linh động hợp, chuyển động, bố trí hợp lý hơn. Giúp tăng trải nghiệm người dùng đồng thời giảm thiểu gánh nặng Responsive cho các Developer.
Khi kết hợp 2 kỹ thuật này thì việc Responsive  sẽ trở lên dễ dàng hơn bao giờ hết.

*Đến đây thì tôi đã hoàn thành serries hướng dẫn các bạn nhìn thấy chặng đường để trở thành Front-End Developer chuyên nghiệp rồi đấy.
Bản thân mình cũng từng bước và mất nhiều thời gian hơn để đi được đến những level này. Nên mình muốn chia sẻ nhưng bước này để các bạn có thể định hướng sớm case study cần thiết để nghiên cứu rút ngắn thời gian, tiết kiệm công sức.
Do mình chỉ chia sẻ case study lên mình không thể đi sâu vào code chi tiết được chỉ nêu ra những vấn đề quan trọng, và ví dụ để bạn dễ hình dung hơn về Responsive.
Rất mong nhận những góp ý và chia sẻ của các bạn. Để có động lực cải thiện trong những bài viết tiếp theo mang đến độc giả.*

## Tài liệu tham khảo: (Các bạn cần để tìm hiểu chi tiết hơn nhé)
[Tối ưu CSS căn bản đến chuyên nghiệp (Phần 1)](https://viblo.asia/p/toi-uu-css-can-ban-den-chuyen-nghiep-phan-1-XL6lA8vBZek) 

Media Query:
https://viblo.asia/p/tiet-kiem-thoi-gian-responsive-cho-trang-web-cua-ban-bang-scss-Qbq5Qpr4lD8
https://viblo.asia/p/tim-hieu-ve-media-query-3ZabG9oRzY6E


Flexbox: 
3 phần: https://evondev.com/css-flexbox-phan-1/

Flexbox cơ bản: https://viblo.asia/p/huong-dan-su-dung-css-flexbox-cho-nguoi-moi-tim-hieu-oOVlYyA4l8W
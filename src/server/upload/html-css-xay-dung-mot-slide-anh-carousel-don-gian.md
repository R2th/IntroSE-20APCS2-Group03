Trong bài này, chúng ta sẽ cùng xây dựng một slide ảnh đơn giản sử dụng HTML và CSS. Bài viết này là một phần của bài CSS số 15 trong [Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m) mà mình đang thực hiện.

Trước khi bắt đầu, hãy để mình giả định là bạn đến từ series bài viết về CSS mà mình đang thực hiện. Và như vậy thì tính tới thời điểm hiện tại, chúng ta vẫn chưa biết gì nhiều về JavaScript, mặc dù Series bài viết về JavaScript của chúng ta đã bắt đầu sau khi giới thiệu xong Bootstrap, và đang được thực hiện song song với việc hoàn thiện kiến thức cơ bản về CSS ở đây.

Việc xây dựng một slide ảnh không sử dụng JavaScript sẽ có một số hạn chế về lựa chọn phương thức xử lý chức năng chuyển ảnh và cấu trúc HTML. Tuy nhiên điều này không đồng nghĩa với việc chúng ta sẽ khó xây dựng slide ảnh hơn mà chỉ đơn giản là chúng ta sẽ có những ràng buộc nhất định trong cấu trúc HTML và có phần ảnh hưởng tới việc canh chỉnh, dàn vị trí các thành phần.

[Và đây là kết quả mà chúng ta dự kiến](https://codepen.io/semiarthanoi/full/mdpJPbG)

## Bắt tay vào việc thôi

Vẫn như thường lệ thì chúng ta khởi đầu với những công việc chuẩn bị quan trọng để kết quả hiển thị được đồng nhất ở các trình duyệt web khác nhau. Reset CSS và thiết lập một `.container` giả định là một nơi nào đó trong trang web bất kỳ mà chúng ta sẽ đặt `carousel` vào.

```carousel.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">

   <title>Simple Carousel</title>

   <link rel="stylesheet" href="carousel.css">  
</head>
<body>
   <div class="container">
      <!-- bắt đầu viết code cho carousel tại đây -->
   </div>
</body>
</html>
```

```carousel.css
/* Reset CSS + Container */

* {
   box-sizing: border-box;
   padding: 0;
   margin: 0;
}

.container {
   max-width: 720px;
   margin: 0 auto;
   padding: 30px 15px;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Carousel
 */
 
 /* bắt đầu viết code cho carousel tại đây */
```

Đầu tiên thì từ kết quả dự kiến chúng ta thấy là một `carousel` cơ bản gồm có 3 thành phần chính:

1. Các tấm ảnh để hiển thị chuyển đổi qua lại.
2. Các radio-button định vị số thứ tự của tấm ảnh đang được hiển thị. Đối với người dùng máy tính thì các radio-button này cũng được sử dụng làm các nút chuyển ảnh luôn.
3. Các nút chuyển slide trái/phải để di chuyển trong danh sách các ảnh. Người dùng thiết bị di động với màn hình nhỏ rất cần 2 nút nhấn này.

## 1. Tạo khung hiển thị và các ảnh

Chúng ta sẽ cố gắng duy trì cấu trúc HTML đơn giản nhất có thể và bổ sung từng thành phần khi cần tới. Ở đây chúng ta sẽ xuất phát với một `<div>` làm khung ảnh có tên class là `.carousel`.

```carousel.html
<div class="carousel">
   <!-- ... -->
</div>
```

Lúc này công việc cần làm trong code CSS là chúng ta cần định dạng khung ảnh để chắc chắn trong mọi trường hợp ảnh sẽ được hiển thị tốt nhất có thể. Trong ví dụ này chúng ta giả định là đang trình bày các tấm ảnh nền cho người dùng máy tính tải về với tỉ lệ màn hình thông dụng là 16:9, tức là các ảnh cần hiển thị có kích thước chiều cao ~56% so với chiều rộng. Như vậy chúng ta cần cố định tỉ lệ của khung ảnh `.carousel` với tỉ lệ này trong trường hợp không có ảnh đăng tải hoặc do kết nối internet chậm.

```carousel.css
/* Frame */

.carousel {
   background-color: lightgray;

   display: block;
   width: 100%;
   padding-top: 56%;
}
```

Mặc định thì CSS không hỗ trợ chúng ta tạo ràng buộc giữa thuộc tính `width` và `height`. Ví dụ chúng ta đặt `height: 40%;` thì lúc này giá trị của `height` sẽ được tính theo `height` của container cha ở bên ngoài `.carousel`. Tuy nhiên `padding` là trường hợp đặc biệt. Khi chúng ta thiết lập `padding` với một trị giá `%` thì kết quả sẽ được tính toán dựa trên `width` của container cha ở bên ngoài.

Lúc này thì chúng ta đã có được một khung ảnh màu nền xám nhạt để hiển thị trạng thái không có ảnh `worse-case` ở vị trí mà `carousel` này được đặt trên trang web.

![](https://images.viblo.asia/4823a04d-4e43-4f9e-aca3-290531946c9f.png)

Công việc quan trọng tiếp theo là đặt các tấm ảnh vào trong khung. Chúng ta cần đảm bảo là trong mọi trường hợp dù người quản trị đăng tải ảnh kích thước nhỏ hay lớn thì các ảnh cũng đều được điều chỉnh kích thước để hiển thị vừa trong khung. Còn về tác vụ canh chỉnh vị trí thì chúng ta chỉ đơn giản là thiết lập vị trí của các tấm ảnh trùng vào vị trí của khung. Lúc này các tấm ảnh sẽ được hiển thị chồng lên nhau và chỉ có tấm cuối cùng được nhìn thấy. Bạn có thể `comment` bớt vài thẻ `<img>` trong code HTML để kiểm tra hoạt động của code.

```carousel.html
<div class="carousel">
   <img class="carousel-image" src="https://bit.ly/34O6BZO">
   <img class="carousel-image" src="https://bit.ly/3ifqrjR">
   <img class="carousel-image" src="https://bit.ly/3wfhy26">
   <img class="carousel-image" src="https://bit.ly/363szIQ">
</div>
```

```carousel.css
/* Images */

.carousel-image {
   width: 100%;
   height: auto;
}

/* Positioning Images */

.carousel {
   position: relative;
}

.carousel-image {
   position: absolute;
   top: 0;
   left: 0;
}
```

![](https://images.viblo.asia/2c31c142-767d-44dd-97b0-6a23124a3ada.png)

## 2. Các radio-button định vị

Tại sao lại sử dụng các [`radio-button`](https://viblo.asia/p/gAm5yExk5db) mà không phải là một lựa chọn nào đó khác?

Như đã nói trước đó thì chúng ta vẫn chưa biết gì nhiều về JavaScript nên tác vụ chuyển ảnh đang được hiển thị cần phải được thực hiện bằng một thành phần nào đó có sẵn khả năng tương tác với người dùng, tức là nhận click chuột và đáp ứng lại. Lần trước khi xây dựng [thanh điều hướng `responsive`](https://viblo.asia/p/LzD5dRAEZjY) thì chúng ta đã sử dụng một `checkbox` để làm chức năng tương tác với người dùng thiết bị di động màn hình nhỏ; Và mô phỏng tín hiệu thanh điều hướng đang ở trạng thái thu gọn hay trạng thái đầy đủ. Tác vụ mà chúng ta đang xử lý cho `carousel` ở đây cũng khá giống như vậy.

Tuy nhiên điểm khác biệt ở đây là ở mỗi thời điểm thì chúng ta sẽ chỉ có duy nhất một tấm ảnh được đánh dấu là đang hiển thị và khi người dùng click chọn ảnh khác thì tấm ảnh hiện tại phải được tự động bỏ đánh dấu. Và vì vậy nên `checkbox` không phải là lựa chọn phù hợp nhưng các `radio-button` thì lại thật hoàn hảo cho tác vụ này.

```carousel.html
<div class="carousel">
   <input class="carousel-indicator" type="radio" name="indicator">
   <img class="carousel-image" src="https://bit.ly/34O6BZO">

   <input class="carousel-indicator" type="radio" name="indicator" checked>
   <img class="carousel-image" src="https://bit.ly/3ifqrjR">

   <input class="carousel-indicator" type="radio" name="indicator">
   <img class="carousel-image" src="https://bit.ly/3wfhy26">

   <input class="carousel-indicator" type="radio" name="indicator">
   <img class="carousel-image" src="https://bit.ly/363szIQ">
</div>
```

Lúc này khi người dùng click chuột vào một `.carousel-indicator` bất kỳ thì chúng ta cần chắc chắn rằng phần tử `.carousel-image` tương ứng đang được hiển thị và các phần tử `.carousel-image` còn lại cần phải được ẩn đi. Để chọn được `.carousel-image` cần hiển thị thì chúng ta chỉ cần kết hợp bộ chọn giống như trường hợp sử dụng `checkbox` thôi. Cứ chọn cái `indicator` nào đang được `:check` rồi trỏ tới `image` đứng ngay bên cạnh bằng dấu `+`.

```css
.carousel-indicator:checked + .carousel-image
```

 Tuy nhiên để chọn tất cả những phần tử còn lại thì chúng ta không thể chọn trực tiếp bằng cách kết hợp các bộ chọn như vậy. Lúc này chúng ta có thể nghĩ tới giải pháp phần bù. Tức là cứ chọn hết tất cả các ảnh bằng `.carousel-image` và cho ẩn đi trước, rồi sau đó chọn ảnh hiện tại bằng bộ chọn ở trên và ghi đè lại thuộc tính `display` để hiển thị.

```carousel.css
/* Indicators */

.carousel-image {
   display: none;
}

.carousel-indicator:checked + .carousel-image {
   display: inline-block;
}
```

Tới đây thì về cơ bản `carousel` của chúng ta đã có thể hoạt động được rồi và bạn có thể thử click chuột vào các `radio-button` để chuyển đổi qua lại giữa các ảnh. Tuy nhiên thì chúng ta vừa mới học xong cái thuộc tính `transition` nên mới quyết định mầy mò làm cái `carousel` này nên phải cố gắng suy nghĩ thêm một chút nữa về hiệu ứng chuyển ảnh. Nếu như là để đơn giản và dễ theo dõi nhất vị trí tương quan giữa các ảnh thì chắc chắn là hiệu ứng di chuyển các ảnh theo phương ngang. Vậy chúng ta chọn hiệu ứng này để triển khai đi. :D

Khi người dùng chọn chuyển tới tấm ảnh tiếp theo ở phía bên phải trong dãy `radio-button` (đứng sau ảnh hiện tại trong code HTML) thì ảnh hiện tại sẽ di chuyển về phía bên trái và đi ra khỏi khung ảnh. Và ảnh mới được chọn sẽ di chuyển từ phía bên phải vào khung ảnh. Như vậy chúng ta sẽ có 3 trạng thái của các tấm ảnh được chọn trong code CSS:

1. Các ảnh `đứng trước` ảnh được đánh dấu sẽ ở vị trí bên trái khung hiển thị ảnh.
2. Các ảnh `đứng sau` ảnh được đánh dấu sẽ ở vị trí bên phải khung hiển thị ảnh.
3. Ảnh đang được đánh dấu sẽ được hiển thị trong khung ảnh.

Lúc này trong code HTML chúng ta đang để tất cả các `indicator` và `image` đều là phần tử con của `.carousel`. Do đó từ `.carousel-indicator` đang được đánh dấu, chúng ta có thể chọn tới các `.carousel-image` đứng sau bằng cách sử dụng `~` để kết hợp bộ chọn. Việc cần làm là di chuyển hết các ảnh này sang phía bên phải khung hiển thị ảnh bằng thuộc tính `left` và sau đó chọn ảnh đang được đánh dấu để ghi đè lại vị trí trùng với khung hiển thị. Vẫn là cách xử lý phần bù như chúng ta đã làm ở phía trên thôi. :D

Như vậy là chúng ta đã có được 2 trạng thái ảnh trong số 3 trạng thái ở trên. Chỉ còn lại trạng thái đầu tiên tức là các ảnh đứng trước ảnh được đánh dấu cần được di chuyển về phía bên trái khung ảnh. Nhóm này lại là phần bù của 2 nhóm đã xử lý trước đó nên chúng ta có thể xem là trạng thái mặc định của tất cả các `.carousel-image`. 

```carousel.css
/* Indicators */

.carousel {
   overflow-x: hidden;
}

.carousel-image {
   transition: all 0.9s;
   left: -100%;
}

.carousel-indicator:checked ~ .carousel-image {
   left: 100%;
}

.carousel-indicator:checked + .carousel-image {
   left: 0;
}
```

![](https://images.viblo.asia/615f0a8f-c2bb-4bc3-a298-3c85d593ebf0.png)

Ở đây bạn lưu ý là việc di chuyển các nhóm ảnh chỉ nên thực hiện bằng 1 thuộc tính `left` hoặc `right` chứ không nên sử dụng lẫn cả 2. Tức là hoặc canh chỉnh vị trí theo cạnh bên trái của `.carousel` hoặc canh chỉnh theo cạnh phải. Tới đây chúng ta có thể xóa bớt 1 dòng `left` ở đoạn `/* Images */` mà chúng ta thiết lập khi mới đặt ảnh vào khung. Hoặc nếu bạn cũng dùng `left` như trong ví dụ của mình thì để lại cũng được.

Việc còn lại là canh chỉnh vị trí cho dãy `radio-button` vào giữa thì chúng ta có thể xử lý như canh chỉnh nội dung văn bản bình thường của `.carousel` bởi vì đây là các thành phần được mặc định `inline-block` để dùng lẫn với các thành phần khác khi tạo các biểu mẫu nhập liệu. Mặt khác thì chúng ta không nên sử dụng `position: absolute;` cho các `indicator` bởi vì như vậy sẽ không thể tạo ra dãy nối tiếp nhau được.

```carousel.css
/* Positioning Indicators */

.carousel {
   text-align: center;
   word-spacing: 12px;
}
```

![](https://images.viblo.asia/8dfcafb1-b547-4ec2-90ca-bb5885dabe4a.png)

Giờ thì chúng ta cần di chuyển các `indicator` dịch lên và giảm bớt `padding`của `.carousel` để bù trừ cho phần diện tích do các `indicator` tạo ra. Tuy nhiên thì mình vẫn sẽ để `padding` hơi dư một chút để có một đường viền mỏng ở phía dưới mô phỏng hiệu ứng đổ bóng cho ảnh. Như vậy người xem sẽ có cảm giác là ảnh được nổi lên so với các nội dung khác trong trang web. Nếu bạn muốn tạo bóng chi tiết thì có thể giảm `padding` để bỏ hẳn phần diện tích thừa và dùng `box-shadow`.

Việc di chuyển các `indicator` dịch vào trong khung ảnh sẽ có một chút lưu ý. Đó là các `indicator` của những ảnh đứng trước so với ảnh đang được hiển thị sẽ bị ảnh lấp đi. Lúc này chúng ta cần chỉ định `z-index` để chắc chắn là các `indicator` luôn luôn được hiển thị ở trên so với tất cả các ảnh.

```carousel.css
/* Positioning indicators */

.carousel {
   text-align: center;
   word-spacing: 12px;
}

.carousel-indicator {
   position: relative;
   bottom: 24px;
}

.carousel-image {
   z-index: 1;
}

.carousel-indicator {
   z-index: 2;
}

.carousel {
   padding-top: 54%;
}
```

![](https://images.viblo.asia/c8ad7974-a485-4e61-855d-c13524aa2300.png)

## 3. Các nút chuyển slide trái/phải

Như thường lệ thì sau khi viết code xong cho các thiết bị màn hình lớn chúng ta cần phải quan tâm tới người dùng các thiết bị di động có màn hình nhỏ. Các `radio-button` thực sự rất khó sử dụng đối với thao tác chạm trên màn hình điện thoại. Ở đây chúng ta có thể nghĩ đến cách xử lý giống với khi xây dựng thanh điều hướng responsive bằng cách sử dụng các thẻ `<label>` làm nút nhấn và kết nối tới các `radio-button` bằng các cặp `for/id`. Tuy nhiên lúc này chúng ta chỉ có 2 nút nhấn trái/phải làm sao để kết nối được với tất cả các `radio-button`?

Vấn đề mới của chúng ta lúc này lại rất giống với chức năng cơ bản của `carousel`: "Chúng ta có rất nhiều ảnh nhưng lại chỉ cần hiển thị 1 tấm duy nhất tại một thời điểm" ~ "Chúng ta có rất nhiều nút nhấn nhưng chỉ cần hiển thị 1 hoặc 2 nút nhấn của các ảnh bên trái và bên phải so với ảnh đang được hiển thị".

Tuy nhiên thì trước hết chúng ta hãy cứ khiến cho các nút nhấn xuất hiện đã. Thêm vào đó là chúng ta cần chèn biểu tượng vào các nút nhấn trong các trạng thái: đứng trước, đứng sau, và đang được chọn.

```carousel.html
<div class="carousel">
   <input id="indicator-1" class="carousel-indicator" type="radio" name="indicator">
   <img class="carousel-image" src="https://bit.ly/34O6BZO">
   <label for="indicator-1" class="carousel-button"></label>

   <input id="indicator-2" class="carousel-indicator" type="radio" name="indicator" checked>
   <img class="carousel-image" src="https://bit.ly/3ifqrjR">
   <label for="indicator-2" class="carousel-button"></label>

   <input id="indicator-3" class="carousel-indicator" type="radio" name="indicator">
   <img class="carousel-image" src="https://bit.ly/3wfhy26">
   <label for="indicator-3" class="carousel-button"></label>

   <input id="indicator-4" class="carousel-indicator" type="radio" name="indicator">
   <img class="carousel-image" src="https://bit.ly/363szIQ">
   <label for="indicator-4" class="carousel-button"></label>
</div>
```

```carousel.css
/* Buttons */

.carousel-button {
   background-color: whitesmoke;
   border: 1px solid lightgray;
   border-radius: 50%;

   display: inline-block;
   width: 42px;
   height: 42px;

   cursor: pointer;
}

/* Buttons Icons */

.carousel-button::before {
   content: "<";
}

.carousel-indicator:checked ~ .carousel-button::before {
   content: ">";
}

.carousel-indicator:checked + .carousel-image + .carousel-button::before {
   content: "o";
}

.carousel-button::before,
.carousel-indicator:checked ~ .carousel-button::before {
   line-height: 42px;
}
```

![](https://images.viblo.asia/aea8a6f0-d033-469b-a753-1018b6738b3e.png)

Như vậy là các nút nhấn đã xuất hiện và được kết nối tốt với các `radio-button`. Bây giờ chúng ta cần đặt các nút nhấn vào 2 góc trái/phải của `.carousel`. Riêng nút nhấn của ảnh đang được hiển thị thì chúng ta sẽ ẩn đi vì nó không có tác dụng gì khi người dùng chạm vào. Ở đây chúng ta có thể sử dụng `position: absolute` và canh chỉnh vị trí theo 2 cạnh trái/phải của `.carousel`. Thao tác này cũng sẽ tách các nút nhấn khỏi dòng chảy nội dung của `.carousel` và giúp chúng ta bỏ được phần diện tích thừa sinh ra khi mới bổ sung chúng vào code HTML.

```carousel.css
/* Positioning Buttons */

.carousel-button {
   position: absolute;
   z-index: 2;
   bottom: 12px;

   left: 9px;
   right: auto;
}

.carousel-indicator:checked ~ .carousel-button {
   left: auto;
   right: 9px;
}

.carousel-indicator:checked + .carousel-image + .carousel-button {
   display: none;
}
```

![](https://images.viblo.asia/73c9159b-f9c0-4e8b-999f-90b2d94142c0.png)

Tới đây thì có vẻ như mọi thứ đã hoàn thiện rồi. Tuy nhiên thì nếu như bạn thử sử dụng lại các nút nhấn thì sẽ có một vấn đề phát sinh. Đó là nếu như chúng ta sử dụng nút nhấn phía bên phải thì `.carousel` sẽ nhảy tới ảnh cuối cùng. Còn nút nhấn bên trái thì lại hoạt động rất tốt. Lý do là vì chúng ta xếp chồng các nút nhấn ở 2 vị trí do đó nên cứ nút nhấn nào đứng sau thì sẽ được hiển thị cao nhất và nhận được click chuột. Điều này hoàn toàn phù hợp với logic hoạt động của chồng nút nhấn phía bên trái, tuy nhiên lại bị ngược so với chồng nút nhấn phía bên phải.

Vậy bây giờ chúng ta cần điều chỉnh lại logic hiển thị của chồng nút nhấn phía bên phải với logic là cứ nút nhấn nào đứng sau thì sẽ được hiển thị thấp hơn. Tới đây thì phiên bản CSS chính thức hiện tại chưa hỗ trợ chúng ta công cụ để tự động hóa tác vụ này. Chúng ta sẽ phải chọn thủ công từ nút nhấn cuối cùng và đặt `z-index: 2;` - thấp nhất nhưng vẫn ở trên so với các ảnh; Sau đó lần lượt chọn tới các nút nhấn đứng trước và tăng dần `z-index`. Và chúng ta sẽ cần phải thiết lập CSS cho đủ số nút nhấn hay số ảnh có khả năng xuất hiện trong slide. Ở đây mình tạm giả định tối đa là 10 ảnh, bạn có thể code thêm nếu cần sử dụng nhiều hơn.

```carousel.css
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(1) { z-index: 2; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(2) { z-index: 3; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(3) { z-index: 4; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(4) { z-index: 5; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(5) { z-index: 6; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(6) { z-index: 7; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(7) { z-index: 8; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(8) { z-index: 9; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(9) { z-index: 10; }
```

## Dọn dẹp code

Xin chúc mừng!!! Bạn đã xây dựng xong một slide ảnh đơn giản và có thể sử dụng cho trang web của bạn. :D

Việc dọn dẹp code chỉ có một chút lưu ý là bạn cần cân nhắc khi gộp code ghi đè các thuộc tính được viết ở bên dưới lên các khối code ở trên có cùng bộ chọn. Code gọn gàng hơn và tập trung hơn thì tệp CSS sẽ nhẹ hơn và trang web được tải nhanh hơn nhưng cũng đánh đổi lại về khả năng đọc/sửa code sau một thời gian mà bạn không chạm vào.

Bạn đã hoàn thành một công việc thực sự nghiêm túc. Slide ảnh hiện tại của chúng ta khá hoàn thiện và có thể tương tác tốt với người dùng. Tuy nhiên nếu như người dùng mở trang web và không nhấn chuyển ảnh thì `carousel` sẽ không tự động lưu chuyển giữa các ảnh mà bạn đã đăng tải. Điều này có thể hiểu đơn giản là chúng ta sẽ có thể làm tốt hơn nữa trong tương lai khi có trong tay thêm nhiều công cụ hơn nữa.

Bạn đã sẵn sàng học thêm những kiến thức mới để kiến tạo tốt hơn? 😄

Hãy cùng quay trở lại bài viết về CSS mà chúng ta đang bỏ dở. Vẫn còn rất nhiều thứ thú vị đang chờ đợi chúng ta ở phía trước.

[[CSS] Bài 15 - Các Hiệu Ứng Chuyển Tiếp](https://viblo.asia/p/E375zAEJlGW)
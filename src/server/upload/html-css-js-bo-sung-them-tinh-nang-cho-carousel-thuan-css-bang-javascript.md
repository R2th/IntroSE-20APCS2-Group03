Bài viết này là một bài độc lập trong [**Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên**](https://viblo.asia/s/Wj53OQQP56m) - được thực hiện nhằm mục đích luyện tập và bổ sung thêm tính năng cho `carousel` thuần CSS đã được xây dựng trong [**Sub-Series CSS**](https://viblo.asia/p/vyDZORX9Kwj). Ở đây chúng ta sẽ sử dụng lại code của `carousel` đơn giản đã có và bổ sung thêm một số tính năng bằng cách viết thêm code xử lý bằng JavaScript. Để định hình rõ hơn thì `carousel` của chúng ta sẽ có 2 chế độ hoạt động -

1. Khi code JavaScript bổ sung không được tải về vì lý do nào đó, hoặc quá trình vận hành code JavaScript có phát sinh ngoại lệ sau một lần cập nhật nào đó; Lúc này `carousel` của chúng ta sẽ hoạt động ở chế độ `thuần CSS` với tính năng cơ bản là có thể chuyển đổi ảnh cần hiển thị khi người dùng click vào các thành phần điều khiển như các `radio-button` định vị hoặc các nút nhấn `trái/phải`.
2. Khi code JavaScript vận hành tốt thì `carousel` sẽ được bổ sung thêm một số tính năng mà việc triển khai trên code CSS thuần sẽ phức tạp hơn nhiều so với code JavaScript. Cụ thể là tính năng xoay vòng từ slide ảnh cuối cùng tới slide ảnh đầu tiên khi người dùng tiếp tục nhấn nút điều khiển phía bên phải, hoặc xoay vòng từ ảnh đầu tiên tới ảnh cuối cùng nếu người dùng nhấn nút điều khiển phía bên trái; Và tính năng tự động chuyển ảnh khi trang web mới được tải xong và người dùng chưa tương tác với `carousel`.

Tuy nhiên, trước khi bước vào thảo luận chi tiết hơn, hãy cùng nhìn lại code `carousel` mà chúng ta đã viết và kết quả hiển thị -

```carousel.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
   <title>A Simple Carousel</title>
   
   <link rel="stylesheet" href="carousel.css">
</head>
<body>
   <div class="container">
   
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
      </div><!-- .carousel -->
   
   </div><!-- .container -->
</body>
</html>
```

```carousel.css
   /* Reset CSS */

* {
   box-sizing: border-box;
   padding: 0;
   margin: 0;
}

   /* Container */

.container {
   max-width: 720px;
   margin: 0 auto;
   padding: 30px 15px;
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 * Carousel
 */

   /* Frame */
 
.carousel {
   display: block;
   width: 100%;
   padding-top: 56%;

   background-color: lightgray;
}

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

   /* Images States */

.carousel {
   overflow-x: hidden;
}

.carousel-image {
   transition: left 0.9s;
}

.carousel-image {
   left: -100%;
}

.carousel-indicator:checked ~ .carousel-image {
   left: 100%;
}

.carousel-indicator:checked + .carousel-image {
   left: 0;
}

   /* Positioning indicators */

.carousel {
   text-align: center;
   word-spacing: 9px;
}

.carousel-indicator {
   position: relative;
   bottom: 24px;
}

.carousel {
   padding-top: 54%;
}

.carousel-image {
   z-index: 1;
}

.carousel-indicator {
   z-index: 2;
}

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

.carousel-button::before {
   content: "\21FD";
}

.carousel-indicator:checked ~ .carousel-button::before {
   content: "\21FE";
}

.carousel-button::before,
.carousel-indicator:checked ~ .carousel-button::before {
   line-height: 42px;
}

   /* Positioning Buttons */

.carousel-button {
   position: absolute;
   z-index: 2;
   bottom: 12px;
}

.carousel-button {
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

[**Xem kết quả hiển thị**](https://codepen.io/semiarthanoi/full/mdpJPbG)

## Bổ sung tính năng xoay vòng trị số hiển thị ảnh

Với phương thức xử lý thuần CSS, chúng ta đã có thể khiến cho những nút nhấn `trái/phải` tạo ra bởi các thẻ `<label>` vận hành được logic chuyển đổi ảnh cơ bản. Tuy nhiên giới hạn mà chúng ta có ở đây là khi người dùng đang xem tấm ảnh ở vị trí cuối cùng, và muốn nhanh chóng quay lại ảnh đầu tiên, thì thao tác bắt buộc là phải click vào `radio-button` đầu tiên. Chúng ta có thể bổ sung thêm một tiện ích nhỏ ở điểm này - đó là khi đang ở vị trí ảnh cuối cùng, người dùng có thể click tiếp vào một nút chuyển ảnh ở góc phía bên phải và `carousel` sẽ chuyển ngay về vị trí hiển thị ảnh đầu tiên.

Ở đây chúng ta vẫn muốn đảm bảo rằng, trong trường hợp tệp JavaScript không khả dụng vì lý do nào đó, hoặc code JavaScript phát sinh ngoại lệ sau khi cập nhật ở một thời điểm nào đó; Thì `carousel` vẫn có thể hoạt động bình thường với code xử lý theo phương thức thuần CSS mà chúng ta đã viết trước đó. Vì vậy nên chúng ta sẽ không thay đổi bất kỳ thành phần nào của `carousel` trong cấu trúc HTML và CSS, mà chỉ bổ sung thêm những yếu tố cần thiết để có thể viết thêm code bổ sung tính năng bằng JavaScript.

Như vậy chúng ta sẽ cần tạo ra thêm 2 nút nhấn bằng JavaScript, một nút nhấn chuyển ảnh tiếp theo bổ sung vào chồng nút nhấn ở phía bên phải để chuyển từ ảnh cuối cùng về ảnh đầu tiên, và một nút nhấn chuyển ảnh bổ sung vào chồng nút nhấn ở phía bên trái để chuyển từ ảnh đầu tiên tới ảnh cuối cùng. Do chúng ta cần đảm bảo 2 nút nhấn này không ảnh hưởng tới logic điều khiển của các bộ chọn CSS giả định, chúng ta sẽ tạo ra các phần tử `<button>` đặt ở vị trí đầu tiên bên trong `carousel` -  đứng trước tất cả các phần tử khác. 

Và trước khi chuyển tác vụ này vào code JavaScript, chúng ta sẽ code thử kết quả trong tệp HTML trước để thực hiện các thao tác canh chỉnh vị trí cần thiết trong code CSS bổ sung. Ở đây chúng ta sẽ sử dụng thêm 2 class bổ trợ `.first` và `.last` để sử dụng trong code JavaScript và để di chuyển nút nhấn `.last` vào cùng vị trí của chồng nút nhấn phía bên phải tạo ra bởi các thẻ `<label>`.

```carousel.html
<div class="carousel">
   <button class="carousel-button first"><button>
   <button class="carousel-button last"><button>

   ...
```

```carousel.css
   /* Positioning Buttons */

...

.carousel-button.last,
.carousel-indicator:checked ~ .carousel-button {
   left: auto;
   right: 9px;
}
```

![](https://images.viblo.asia/82a9bb23-748b-4414-9afe-9928b00cb0f1.png)

Thêm vào đó là chúng ta cần đảm bảo nút nhấn `.last` sẽ có `z-index` ở dưới cùng so với các nút nhấn được tạo ra bởi các thẻ `<label>`, bằng cách điều chỉnh lại `z-index` thấp nhất của các nút nhấn `<label>` khi hiển thị ở chồng nút phía bên phải cao thêm một điểm.

```carousel.css
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(1) { z-index: 3; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(2) { z-index: 4; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(3) { z-index: 5; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(4) { z-index: 6; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(5) { z-index: 7; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(6) { z-index: 8; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(7) { z-index: 9; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(8) { z-index: 10; }
.carousel-indicator:checked ~ .carousel-button:nth-last-of-type(9) { z-index: 11; }
```

Bây giờ chúng ta đã có thể `xóa` 2 nút nhấn này trong `code HTML` và viết code JavaScript để hiển thị chúng khi tệp JavaScript được tải.

```carousel.js
   /* Creating Buttons & Binding Listeners */

var allCarousels = document.querySelectorAll('.carousel');

const createButton = function(className) {
   var button = document.createElement('button');
   button.className = className;
   return button;
};

Array.from(allCarousels)
   .forEach(function(carousel) {
      var firstButton = createButton('carousel-button first');
      firstButton.addEventListener('click', changeToLastIndex);
      carousel.prepend(firstButton);
      // - - -
      var lastButton = createButton('carousel-button last');
      lastButton.addEventListener('click', changeToFirstIndex)
      carousel.prepend(lastButton);
   });
```

![](https://images.viblo.asia/6c0cb904-a0bc-4c0a-a018-5a2b94ed2661.png)

Công việc còn lại là công việc quan trọng nhất, viết hàm xử lý sự kiện cho 2 nút nhấn này. Do hiện tại tác vụ điều hành logic hiển thị đang được thực hiện thông qua các `radio-button`, chúng ta có thể không cần phải quan tâm tới các phần tử khác. Bởi nếu như chúng ta tác động lên `radio-button` thì các yếu tố khác như vị trí của các nút nhấn `<label>` sẽ tự thay đổi để đáp ứng theo.

Vậy phương án xử lý đơn giản là đối với nút nhấn `.first`, chúng ta sẽ chuyển thuộc tính `checked` về vị trí `radio-button` cuối cùng bằng hàm `moveToLastIndex`; Và đối với nút nhấn `.last`, chúng ta sẽ chuyển thuộc tính `checked` về vị trí `radio-button` đầu tiên bằng hàm `moveToFirstIndex`.

```carousel.js
   /* Event Listeners */

const changeToFirstIndex = function(event) {
   var theCarousel = findTheCarousel(event.target);
   var [firstIndicator] = findAllIndicators(theCarousel);
   firstIndicator.dispatchEvent(new MouseEvent('click'));
};

const changeToLastIndex = function(event) {
   var theCarousel = findTheCarousel(event.target);
   var [lastIndicator] = findAllIndicators(theCarousel).reverse();
   lastIndicator.dispatchEvent(new MouseEvent('click'));
};

   /* Creating Buttons & Binding Listeners ... */
```

Ở đây chúng ta đang viết code xử lý chung cho tất cả các `carousel` có mặt trong cùng một trang web đơn. Do đó ở thời điểm một nút nhấn được click, chúng ta cần xác định được `carousel` tương ứng đang chứa nút nhấn đó; Và thực hiện thay đổi trong phạm vi của `carousel` đó. Như vậy chúng ta sẽ cần thực hiện một vài thao tác phụ để hỗ trợ là `findTheCarousel`, `findFirstIndicator`, và `findLastIndicator`.

```carousel.js
   /* Subsequent Tasks */

const findTheCarousel = function(decendant) {
   var parent = decendant.parentElement;
   var parentIsCarousel = (parent.className == 'carousel');
   if (parentIsCarousel)   return parent;
   else                    return findTheCarousel(parent);
};

const findAllIndicators = function(carousel) {
   return [...carousel.children]
      .filter(function(element) {
         return element.className.includes('carousel-indicator');
      });
}; // findAllIndicators

   /* Event Listeners ... */
```

Như vậy là 2 nút nhấn mới bổ sung của chúng ta đã hoạt động được. Tiếp đến, chúng ta sẽ tìm hiểu cách bổ sung tính năng tự động chuyển slide ảnh khi trang web mới tải xong và người dùng chưa thực hiện tương tác với `carousel`.

## Bổ sung tính năng tự động chuyển ảnh hiển thị

Việc thực hiện tính năng này chỉ có duy nhất một điểm mà chúng ta cần lưu ý - đó là khi người dùng click chuột tương tác với `carousel` ở bất kỳ đâu, thì tính năng này cần được tạm dừng trong một khoảng thời gian để người dùng có thể xem kĩ thông tin của slide ảnh đó. Chúng ta sẽ lấy khoảng thời gian tạm dừng giữa 2 lần chuyển ảnh là 5 giây và thời gian tạm dừng tự động chuyển ảnh khi có tương tác là 30 giây.

[**Và đây là kết quả hoạt động dự kiến**](https://codepen.io/semiarthanoi/full/yLppXyW)

Đối với bản thân mình thì việc cố gắng để suy nghĩ ra toàn bộ tiến trình logic của code trong một tình huống như thế này là thực sự khó. Nó khá giống với việc phải cố gắng tưởng tượng ra 1001 ngày tiếp theo cuộc sống sẽ diễn ra như thế nào. Do đó chúng ta sẽ sử dụng [**lối tư duy đệ quy**](https://viblo.asia/p/63vKjAaR52R) đơn giản mà chúng ta đã biết - nếu như `sự hoàn thành là 1001 bước` chưa thực hiện, thì chúng ta sẽ định nghĩa lại nó thành `1 bước có thể thực hiện ngay` và tìm kiếm tiếp `sự hoàn thành của 1000 bước còn lại`. :D

```carousel.js
   /* Creating Buttons & Binding Listeners ... */

   /* Auto-Change Index */

Array.from(allCarousels)
   .forEach(function(carousel) {
      addAutoChangeFeature(carousel);
      carousel.addEventListener('click', debounceAutoChange);
   });
```

Bước đầu tiên trong số 1001 bước mà chúng ta có thể nghĩ ra ngay để thực hiện công việc này - đó là đối với mỗi `carousel` có mặt trong trang web đơn, chúng ta cần thực hiện 2 việc -

- `addAutoChangeFeature(carousel)` - bổ sung thêm tính năng tự động chuyển ảnh sau mỗi 5 giây.
- Gắn hàm xử lý sự kiện `debounceAutoChange` để khi `carousel` nhận được click ở bất kỳ thành phần nào thì tính năng tự động chuyển ảnh sẽ được đẩy lui `debounce` 30 giây.

Chúng ta sẽ khởi đầu với hàm `addAutoChangeFeature` trước. Về cơ bản thì tính năng tự động chuyển đổi ảnh mà chúng ta mong muốn thực ra là một hành động `chuyển tới vị trí indicator tiếp theo` và được tự động lặp đi lặp lại không ngừng. 

Nó thực sự có phần rất giống với một hàm đệ quy mà chúng ta đã biết - cứ thực hiện xong một chuỗi các thao tác cần thiết, rồi lại tự gọi lại chính hàm đó. Nếu vậy chúng ta sẽ tạo ra một hàm đệ quy như vậy, rồi sau đó chỉ cần phát động lời gọi hàm 1 lần duy nhất; Và vòng xoay sẽ tự động lặp lại vô hạn. :D

```carousel.js
   /* Auto-Change Index */

const addAutoChangeFeature = function(carousel) {
   const changeToNextIndex = function() {
      // ... các thao tác cần thiết
      changeToNextIndex();   // tự gọi lại
   };
   
   // phát động lời gọi hàm 1 lần duy nhất
   changeToNextIndex();
}; // addAutoChangeFeature
```

Tuy nhiên chúng ta lại muốn mỗi lời `tự gọi lại` hàm có thời gian chờ khoảng 5 giây để người dùng có thể xem lướt qua nội dung của mỗi ảnh. Do đó ở vị trí `tự gọi lại` của hàm `changeToNextIndex` chúng ta cần thiết lập thời gian trễ bằng `window.setTimeout`.

```carousel.js
   /* Auto-Change Index */

const addAutoChangeFeature = function(carousel) {
   const changeToNextIndex = function() {
      // ... các thao tác cần thiết
      // chờ 5 giây rồi tự gọi lại
      window.setTimeout(changeToNextIndex, 5 * 1000);
   };
   
   // phát động lời gọi hàm 1 lần duy nhất
   changeToNextIndex();
}; // addAutoChangeFeature
```

Rồi... xong. Nếu bây giờ chúng ta đặt vào các thao tác xử lý cần thiết để chuyển tới slide ảnh tiếp theo thì có nghĩa là tính năng này đã có thể hoạt động.

```carousel.js
   /* Subsequent Tasks */

const findAllIndicators = ...

const findNextIndicator = function(carousel) {
   var allIndicators = findAllIndicators(carousel);
   var currnetIndex = allIndicators
      .findIndex((indicator) => indicator.checked);
   // - - -
   if (currnetIndex != allIndicators.length - 1)
      return allIndicators[currnetIndex + 1];
   else
      return allIndicators[0];
}; // findNextIndicator

   /* ... */

   /* Auto-Change Index */

const addAutoChangeFeature = function(carousel) {
   const changeToNextIndex = function() {
      var nextIndicator = findNextIndicator(carousel);
      nextIndicator.dispatchEvent(new MouseEvent('click'));
      // chờ 5 giây rồi tự gọi lại
      window.setTimeout(changeToNextIndex, 5 * 1000);
   };
   
   // phát động lời gọi hàm 1 lần duy nhất
   changeToNextIndex();
}; // addAutoChangeFeature
```

Tuy nhiên câu lệnh phát động lời gọi hàm ở bên ngoài đang được thực thi ngay, và nếu như vậy thì ngay khi chúng ta tải trang web xong, `carousel` sẽ chuyển sang ảnh thứ 2. Chắc chắn là chúng ta cũng muốn hẹn thời gian lùi lại một chút cho câu lệnh này.

```carousel.js
   /* Auto-Change Index */

const addAutoChangeFeature = function(carousel) {
   var delay = 5 * 1000;

   const changeToNextIndex = function() {
      var nextIndicator = findNextIndicator(carousel);
      nextIndicator.dispatchEvent(new MouseEvent('click'));
      // chờ `delay` rồi tự gọi lại
      window.setTimeout(changeToNextIndex, delay);
   };
   
   // phát động lời gọi hàm 1 lần duy nhất
   window.setTimeout(changeToNextIndex, delay);
}; // addAutoChangeFeature
```

Tuyệt.. như vậy là hàm xử lý đầu tiên xem như đã hoàn thành. Bây giờ chúng ta cần viết hàm xử lý sự kiện `debounceAutoChange` để mỗi khi người dùng click chuột tương tác thì máy tính sẽ hiểu rằng người dùng đã chủ động chọn xem một ảnh nào đó và cần tạm dừng tính năng tự động chuyển đổi ảnh một khoảng thời gian.

Công việc của hàm `debounceAutoChange` lúc này là cần phải tạm dừng bộ đếm tạo ra bởi phương thức `window.setTimeout` trong hàm `addAutoChangeFeature`. Nếu vậy trước hết chúng ta cần lưu lại bộ đếm trong một biến nào đó. Tuy nhiên biến này cần phải được gắn với mỗi `carousel`, bởi vì chúng ta đang viết code xử lý chung cho nhiều `carousel`. Mỗi `carousel` sẽ được áp dụng hàm `addAutoChangeFeature` một lần để gắn tính năng tự động, và như vậy biến này cần phải ở trong phạm vi của hàm `addAutoChangeFeature` và chúng ta sẽ tạm gọi nó là `timer`.

```carousel.js
   /* Auto-Change Index */

const addAutoChangeFeature = function(carousel) {
   var timer = null;
   var delay = 5 * 1000;

   const changeToNextIndex = function() {
      var nextIndicator = findNextIndicator(carousel);
      nextIndicator.dispatchEvent(new MouseEvent('click'));
      // chờ 5 giây rồi tự gọi lại
      timer = window.setTimeout(changeToNextIndex, delay);
   };
   
   // phát động lời gọi hàm 1 lần duy nhất
   window.setTimeout(changeToNextIndex, delay);
}; // addAutoChangeFeature
```

Lúc này chúng ta lại gặp một vấn đề mới - đó là nếu như chúng ta định nghĩa hàm `debounceAutoChange` ở phía bên ngoài hàm `addAutoChangeFeature`, thì hiển nhiên `debounceAutoChange` sẽ không thể truy xuất tới biến `timer` và tạm dừng bộ đếm. Còn nếu chúng ta định nghĩa hàm `debounceAutoChange` ở phía trong của hàm `addAutoChangeFeature` thì phần code gắn hàm xử lý sự kiện cho các `carousel` mà chúng ta đã viết sẽ không thể truy xuất và sử dụng được hàm `debounceAutoChange`.

Hiển nhiên việc định nghĩa hàm `debounceAutoChange` ở phía trong của hàm `addAutoChangeFeature` là điều bắt buộc, chúng ta không có lựa chọn khác bởi vì chúng ta cần làm việc với `timer`. Tuy nhiên sau đó thì chúng ta sẽ có 2 lựa chọn - hoặc là `return debounceAutoChange` cho code bên ngoài sử dụng để gắn vào các `carousel`, hoặc là sẽ thực hiện việc gắn hàm xử lý sự kiện `debounceAutoChange` ngay bên trong hàm `addAutoChangeFeature`. Bạn chọn cách nào cũng được; Còn mình thì chỉ đặt code ví dụ ở đây thôi. :D

```carousel.js
   /* Auto-Change Index */

const addAutoChangeFeature = function(carousel) {
      /* Setup Auto-Change */
   var timer = null;
   var delay = 5 * 1000;
   const changeToNextIndex = function() {
      var nextIndicator = findNextIndicator(carousel);
      nextIndicator.dispatchEvent(new MouseEvent('click'));
      timer = window.setTimeout(changeToNextIndex, delay)
   };
   
   window.setTimeout(changeToNextIndex, delay);

      /* Create & Return Debouncer */
   const debounceTimer = function(event) {
      window.clearTimeout(timer);
      timer = window.setTimeout(changeToNextIndex, 30 * 1000);
   };
   return debounceTimer;
}; // createDebounceAutoChange

Array.from(allCarousels)
   .forEach(function(carousel) {
      var debounceAutoChange = addAutoChangeFeature(carousel);
      carousel.addEventListener('click', debounceAutoChange);
   });
```

## Kết thúc bài viết

Xin chúc mừng. Bạn đã hoàn thành công việc bổ sung tính năng tự động chuyển ảnh và hoàn thiện chức năng luân chuyển giữa các ảnh khi người dùng cứ `next`, `next`, ... và `next`. :D Dưới dây là code mình đã tổng hợp lại để bạn có thể so sánh với phần nội dung thực hiện trong bài viết. Nhỡ có chỗ nào nhầm lẫn mà mình soát lại không tìm ra thì bạn thông cảm nhé. :D Hẹn gặp lại bạn trong những bài viết khác của [**Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên**](https://viblo.asia/s/Wj53OQQP56m).

```carousel.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
   <title>A Simple Carousel</title>
   
   <link rel="stylesheet" href="carousel.css">
</head>
<body>
   <div class="container">
   
      <div class="carousel">
         <input id="indicator-1" class="carousel-indicator" type="radio" name="indicator" checked>
         <img class="carousel-image" src="https://bit.ly/34O6BZO">
         <label for="indicator-1" class="carousel-button"></label>
   
         <input id="indicator-2" class="carousel-indicator" type="radio" name="indicator">
         <img class="carousel-image" src="https://bit.ly/3ifqrjR">
         <label for="indicator-2" class="carousel-button"></label>
   
         <input id="indicator-3" class="carousel-indicator" type="radio" name="indicator">
         <img class="carousel-image" src="https://bit.ly/3wfhy26">
         <label for="indicator-3" class="carousel-button"></label>
   
         <input id="indicator-4" class="carousel-indicator" type="radio" name="indicator">
         <img class="carousel-image" src="https://bit.ly/363szIQ">
         <label for="indicator-4" class="carousel-button"></label>
      </div><!-- .carousel -->
   
   </div><!-- .container -->
   
   <script src="carousel.js"></script>
</body>
</html>
```

```carousel.css
   /* Reset CSS */

* {
   box-sizing: border-box;
   padding: 0;
   margin: 0;
}

   /* Container */

.container {
   max-width: 720px;
   margin: 0 auto;
   padding: 30px 15px;
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 * Carousel
 */

   /* Frame */
 
.carousel {
   display: block;
   width: 100%;
   padding-top: 56%;

   background-color: lightgray;
}

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

   /* Images States */

.carousel {
   overflow-x: hidden;
}

.carousel-image {
   transition: left 0.9s;
   left: -100%;
}

.carousel-indicator:checked ~ .carousel-image {
   left: 100%;
}

.carousel-indicator:checked + .carousel-image {
   left: 0;
}

   /* Positioning indicators */

.carousel {
   text-align: center;
   word-spacing: 12px;
}

.carousel-indicator {
   position: relative;
   bottom: 24px;
}

.carousel {
   padding-top: 54%;
}

.carousel-image {
   z-index: 1;
}

.carousel-indicator {
   z-index: 2;
}

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

.carousel-button::before {
   content: "\21FD";
}

.carousel-button.last::before,
.carousel-indicator:checked ~ .carousel-button::before {
   content: "\21FE";
}

.carousel-button::before {
   line-height: 42px;
}

   /* Positioning Buttons */

.carousel-button {
   position: absolute;
   z-index: 2;
   bottom: 12px;
}

.carousel-button {
   left: 9px;
   right: auto;
}

.carousel-button.last,
.carousel-indicator:checked ~ .carousel-button {
   left: auto;
   right: 9px;
}

.carousel-indicator:checked + .carousel-image + .carousel-button {
   display: none;
}

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

```carousel.js
   /* Subsequent Tasks */

const findTheCarousel = function(decendant) {
   var parent = decendant.parentElement;
   var parentIsCarousel = (parent.className == 'carousel');
   if (parentIsCarousel)   return parent;
   else                    return findTheCarousel(parent);
};

const findAllIndicators = function(carousel) {
   return Array.from(carousel.children)
      .filter(function(element) {
         return element.className.includes('carousel-indicator');
      });
}; // findAllIndicators

const findNextIndicator = function(carousel) {
   var allIndicators = findAllIndicators(carousel);
   var currnetIndex = allIndicators
      .findIndex((indicator) => indicator.checked);
   // - - -
   if (currnetIndex != allIndicators.length - 1)
      return allIndicators[currnetIndex + 1];
   else
      return allIndicators[0];
}; // findNextIndicator

   /* Event Listeners */

const changeToFirstIndex = function(event) {
   var theCarousel = findTheCarousel(event.target);
   var [firstIndicator] = findAllIndicators(theCarousel);
   firstIndicator.dispatchEvent(new MouseEvent('click'));
};

const changeToLastIndex = function(event) {
   var theCarousel = findTheCarousel(event.target);
   var [lastIndicator] = findAllIndicators(theCarousel).reverse();
   lastIndicator.dispatchEvent(new MouseEvent('click'));
};

   /* Creating Buttons & Binding Listeners */

var allCarousels = document.querySelectorAll('.carousel');

const createButton = function (className) {
   var button = document.createElement('button');
   button.className = className;
   return button;
};

Array.from(allCarousels)
   .forEach(function(carousel) {
      var firstButton = createButton('carousel-button first');
      firstButton.addEventListener('click', changeToLastIndex);
      carousel.prepend(firstButton);
      // - - -
      var lastButton = createButton('carousel-button last');
      lastButton.addEventListener('click', changeToFirstIndex)
      carousel.prepend(lastButton);
   });

   /* Auto-Change Index */

const addAutoChangeFeature = function(carousel) {
      /* Set Auto-Change */
   var timer = null;
   var delay = 5 * 1000;
   const changeToNextIndex = function() {
      var nextIndicator = findNextIndicator(carousel);
      nextIndicator.dispatchEvent(new MouseEvent('click'));
      timer = window.setTimeout(changeToNextIndex, delay)
   };
   timer = window.setTimeout(changeToNextIndex, delay);

      /* Create & Return Debouncer */
   const debounceTimer = function(event) {
      window.clearTimeout(timer);
      timer = window.setTimeout(changeToNextIndex, 30 * 1000);
   };
   return debounceTimer;
}; // addAutoChangeFeature

Array.from(allCarousels)
   .forEach(function(carousel) {
      var debounceAutoChange = addAutoChangeFeature(carousel);
      carousel.addEventListener('click', debounceAutoChange);
   });
```
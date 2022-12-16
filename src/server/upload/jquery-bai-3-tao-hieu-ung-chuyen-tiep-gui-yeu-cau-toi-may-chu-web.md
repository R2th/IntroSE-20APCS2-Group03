Bên cạnh việc hỗ trợ đơn giản hóa các thao tác làm việc với văn bản HTML và các thuộc tính CSS, `jQuery` còn cung cấp một số các hàm hỗ trợ tạo hiệu ứng cho các thành phần tương tác với người dùng. Trong bài viết này, chúng ta sẽ thử sử dụng các hiệu ứng này thay cho hiệu ứng `transition: max-height 0.5s;` mà chúng ta đang sử dụng cho code `dropdown` trước đó. Đồng thời, chúng ta cũng sẽ nói về các hàm hỗ trợ đơn giản hóa thao tác gửi yêu cầu tới máy chủ web để truy vấn thêm dữ liệu.

## Các hàm tạo hiệu ứng chuyển tiếp

Để đơn giản hóa thao tác ẩn/hiện một phần tử HTML, `jQuery` cung cấp cho chúng ta 4 lựa chọn cơ bản là:

- Ẩn/hiện không sử dụng hiệu ứng được hỗ trợ bởi các hàm [`hide()`](https://api.jquery.com/hide/), [`show()`](https://api.jquery.com/show/), và [`toggle()`](https://api.jquery.com/toggle/).
- Ẩn/hiện với hiệu ứng trượt lên/xuống (giống như `dropdown` mà chúng ta đang có) được hỗ trợ bởi các hàm [`slideUp()`](https://api.jquery.com/slideUp/), [`slideDown()`](https://api.jquery.com/slideDown/), và [`slideToggle()`](https://api.jquery.com/slideToggle/).
- Ẩn/hiện với hiệu ứng mờ dần/hiện dần được hỗ trợ bởi các hàm [`fadeIn()`](https://api.jquery.com/fadeIn/), [`fadeOut()`](https://api.jquery.com/fadeOut/), và [`fadeToggle()`](https://api.jquery.com/fadeToggle/).
- Ẩn/hiện với các hiệu ứng tùy chỉnh được hỗ trợ bởi hàm [`animate()`](https://api.jquery.com/animate/) và các hàm hỗ trợ `animate` được liệt kê trong [**chỉ mục `Effects`**](https://api.jquery.com/category/effects/).

Chúng ta sẽ làm ví dụ với các hàm tạo hiệu ứng đơn giản là `fade`, áp dụng cho `dropdown` mà chúng ta đã có. Để chuẩn bị thì trong code CSS của `dropdown` chúng ta sẽ bỏ đi phần thuộc tính `transition` và các class `.hidden`, `.shown`. Mặc định, chúng ta sẽ để các `.dropdown-list` ẩn đi với `display: none;`.

```dropdown.html
<!doctype html>
<html>

<head>
   <meta charset="utf-8">
   <meta http-equiv="x-ua-compatible" content="ie=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

   <title>A Normal Dropdown</title>

   <link rel="stylesheet" href="dropdown.css">
</head>

<body>
   <div class="dropdown">
      <button class="dropdown-btn primary">
         Toggle List
      </button>

      <div class="dropdown-list">
         <a class="dropdown-item" href="#">The rose is red</a>
         <a class="dropdown-item" href="#">The sky is sunny</a>
         <a class="dropdown-item" href="#">The river is blue</a>
         <a class="dropdown-item" href="#">The grass is green</a>
      </div>
   </div><!-- .dropdown -->

   <!-- copy/paste 1000 dropdown nữa -->

   <script src="https://code.jquery.com/jquery-3.6.0.min.js"
      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous">
      </script>
   <script src="dropdown.js"></script>
</body>

</html>
```

```dropdown.css
.dropdown {
   font-family: Arial, sans-serif;
   font-size: 16px;

   display: inline-block;
   position: relative;
}

.dropdown-btn {
   font-size: 14px;
   font-weight: bold;
   letter-spacing: 1px;

   padding: 15px 30px;

   color: White;
   border: none;
   cursor: pointer;
}

.dropdown-btn.primary {
   background: RoyalBlue;
}

.dropdown-btn.primary:hover {
   background: DodgerBlue;
}

.dropdown-list {
   position: absolute;
   top: calc(100% + 3px);
   display: none;
}

.dropdown-item {
   display: block;
   min-width: 245px;
   max-width: 335px;
   padding: 15px 25px;

   color: White;
   background: RoyalBlue;
   border-bottom: 1px solid DodgerBlue;

   text-decoration: none;
}

.dropdown-item:hover {
   background: DodgerBlue;
}
```

Code xử lý JavaScript của chúng ta sẽ được bắt đầu lại từ đầu với tệp `dropdown.js` mới để làm quen với hàm `fadeIn()`. Cách sử dụng đơn giản nhất của các hàm tạo hiệu ứng là chúng ta có thể truyền vào hàm thời gian kéo dài của hiệu ứng tính theo mili-giây `milisecond` như sau:

```dropdown.js
$('.dropdown-list').fadeIn(0.45 * 1000);
```

Nếu như danh sách của `dropdown` hiện ra sau khi chúng ta làm mới trình duyệt web thì có nghĩa là code đã hoạt động tốt. Vậy có lẽ hàm `fadeToggle()` cũng sẽ hoạt động tốt như `jQuery` đã hứa hẹn trong tài liệu. :D 

Bây giờ chúng ta sẽ thử viết luôn hàm xử lý sự kiện click chuột vào nút nhấn `.dropdown-btn` và sử dụng hàm `fadeToggle()`. Cấu trúc tổng quan của logic hoạt động thì chúng ta vẫn sẽ có các hàm như cũ với hàm xử lý sự kiện chính `toggleList()` được chia thành 2 tác vụ là: Thay đổi trạng thái hiển thị của danh sách hiện tại `toggleTheList()`, và nếu có danh sách nào đó khác đang hiện thì ẩn đi `hideOtherLists()`.

```dropdown.js
const toggleTheList = function(event) {};
const hideOtherLists = function(event) {};

const toggleList = function(event) {
   toggleTheList(event);
   hideOtherLists(event);
};

$('.dropdown-btn').click(toggleList);
```

Bây giờ chúng ta thêm vào code xử lý trong thân hàm `toggleTheList()` và `hideOtherLists()` với sự hỗ trợ của `.fadeToggle()` và `.fadeOut()`.

```dropdown.js
const toggleTheList = function(event) {
   $theList = $(event.target).next();
   $theList.fadeToggle(0.45 * 1000);
};

const hideOtherLists = function(event) {
   $theList = $(event.target).next();
   $otherLists = $('.dropdown-list').not($theList);
   $otherLists.fadeOut(0.45 * 1000);
};

const toggleList = function(event) {
   toggleTheList(event);
   hideOtherLists(event);
};

$('.dropdown-btn').click(toggleList);
```

[**Xem kết quả hiển thị**](https://codepen.io/semiarthanoi/full/LYebzwV)

Bên cạnh đó thì các hàm tạo hiệu ứng của `jQuery` còn có thể nhận thêm nhiều giá trị khác để tùy chỉnh linh động hơn. Ví dụ như `.fadeOut(0.45 * 1000, callback)`, trong đó `callback` là một hàm xử lý thao tác nào đó mà bạn muốn thực hiện ngay khi hiệu ứng ẩn `.dropdown-list` kết thúc.

## Các hàm hỗ trợ gửi yêu cầu tới máy chủ web

Các hàm hỗ trợ đơn giản hóa giao tiếp với máy chủ web được `jQuery` lập tài liệu trong [**chỉ mục `AJAX`**](https://api.jquery.com/category/ajax/) - `Asynchronous JavaScript And XML` - được hiểu lơ mơ là các tác vụ được thực hiện xử lý không đồng bộ thời gian với dòng chảy chính của code JavaScript, và đối tượng làm việc là các dữ liệu được lưu trữ ở định dạng XML. Trong đó `XML` là một ngôn ngữ đánh dấu có cú pháp na ná với `HTML` nhưng lại được thiết kế và sử dụng với mục đích giống với `JSON`, đó là chung chuyển dữ liệu giữa các thiết bị qua mạng `network`.

Nghe thì có vẻ dài dòng ghê gớm vậy thôi, chứ thực ra chúng ta không cần phải học `XML` để sử dụng các hàm hỗ trợ này đâu. Chúng ta vẫn sẽ làm việc với `JSON` như ví dụ trong bài viết [**[JavaScript] Bài 8 - Window & Request**](https://viblo.asia/p/jvElaR465kw) mà chúng ta đã thực hiện trước đó. :D

```weather.js
var hanoiPosition = {
   latitude: 21.04912,
   longtitude: 105.877876
};
var openWeatherApiKey = '0f9b17d098964aeb784a6d638bf89603';
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather'
           + '?lat=' + hanoiPosition.latitude
           + '&lon=' + hanoiPosition.longtitude
           + '&appid=' + openWeatherApiKey;

const printWeatherType = function(data) {
   const weatherInfo = data.weather[0];
   const weatherType = weatherInfo.main;
   console.log(weatherType);
};

jQuery.get(apiUrl, printWeatherType);
```

Ở đây dữ liệu `data` mà chúng ta nhận được trong hàm `printWeatherType()` có thể là `JSON`, `XML`, hoặc `HTML` ở dạng chuỗi tùy vào xử lý của máy chủ web. Tuy nhiên hàm `.get()` của `jQuery` đã tự động chuyển đổi `chuỗi JSON` nhận được thành một `object` và chúng ta có thể thực hiện luôn thao tác truy xuất tới các biến bên trong.

## Kết thúc bài viết

Bài viết về sử dụng hiệu ứng chuyển tiếp trong jQuery và tương tác với máy chủ web của chúng ta đến đây là kết thúc. Trong bài tiếp theo, chúng ta sẽ được gặp một khái niệm mới đó là `plug-in` và có một phần giới thiệu nhanh về thư viện `jQuery UI` - một phần của dự án `jQueryDotCom`. 

Hẹn gặp lại bạn trong bài viết tiếp theo. :D

[**[jQuery] Bài 4 - Sử Dụng Thư Viện jQuery UI**](https://viblo.asia/p/bJzKmAXkK9N)
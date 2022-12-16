Trong bài viết này, chúng ta sẽ nói về object dựng sẵn `window`, công cụ giúp chúng ta thực hiện các thao tác người dùng đối với chính phần mềm trình duyệt web. Đồng thời, chúng ta cũng sẽ tìm hiểu cách gửi yêu cầu `request` truy vấn thêm dữ liệu tới một máy chủ web để hiển thị thêm nội dung mà không cần tải lại trang.

## Object `window`

Đây là object tổng quan lớn nhất đại diện cho cửa sổ trình duyệt web mà chúng ta đang sử dụng. Do `window` có quá nhiều tính năng nên người ta đã phân bổ thành các nhóm và tạo ra các object con đại diện cho các thành phần khác nhau của trình duyệt. Để tìm hiểu thông tin về object `window`, bạn có thể sử dụng các nguồn tài liệu dưới đây:

- [Tài liệu về object window của W3schools](https://www.w3schools.com/jsref/obj_window.asp)
- [Tài liệu về object window của MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window).

Các object `document` và `console` mà chúng ta đã sử dụng trước đó thực ra là các object thành phần được đóng gói trong `window`. Tuy nhiên do `window` là object mô phỏng cho cửa sổ trình duyệt web nên luôn được ngầm định trong code JavaScript; Và chúng ta có thể viết trực tiếp tên của các thành phần được đóng gói trong `window` để sử dụng thay vì `window.something`.

Bên cạnh `document` và `console`, thì `window` còn có thêm một vài object con đại diện cho các thành phần quan trọng khác là:

- [`history`](https://www.w3schools.com/jsref/obj_history.asp) - lịch sử của tab web hiện tại.
- [`frames`](https://www.w3schools.com/jsref/prop_win_frames.asp) - một bộ các object `window` khác mô phỏng các `<iframe>` bên trong trang web hiện tại.
- [`parent`](https://www.w3schools.com/jsref/prop_win_parent.asp) - tham chiếu tới cửa sổ bên ngoài với giả định trang web đang được tải trong một `<iframe>`.
- [`location`](https://www.w3schools.com/jsref/obj_location.asp) - thông tin về địa chỉ web hiện tại.
- [`screen`](https://www.w3schools.com/jsref/obj_screen.asp) - thông tin về màn hình hiển thị của người dùng.
- [`navigator`](https://www.w3schools.com/jsref/obj_navigator.asp) - thông tin về vị trí địa lý của người dùng.
- [`localStorage`](https://www.w3schools.com/jsref/prop_win_localstorage.asp) - cơ sở dữ liệu cục bộ của trình duyệt web cho phép lưu trữ dữ liệu trên thiết bị của người dùng.
- [`sessionStorage`](https://www.w3schools.com/jsref/prop_win_sessionstorage.asp) - giống với `localStorage`. Tuy nhiên dữ liệu lưu ở `sessionStorage` sẽ được xóa ngay khi người dùng đóng trang web.

Woa... chúng ta lại có thêm thật nhiều thứ cần phải học. :D  
Tuy nhiên thì chúng ta sẽ không cố gắng ghi nhớ chi tiết tất cả những kiến thức này mà chỉ cần xem tổng quan để biết được những tiềm năng của `window` mà chúng ta có thể cần sử dụng tới trong tương lai. Còn bây giờ thì bạn có thể lưu lại các liên kết tham khảo để sử dụng khi cần tới. Chúng ta sẽ thử sử dụng các công cụ này để thực hiện một vài thao tác phổ biến thường gặp.

## Chuyển hướng tới một địa chỉ web khác

Để thực hiện thao tác này, chúng ta tham chiếu qua object con `location`.

```redirect.js
location.href = 'https://bitly.com/';
// `bitly` là công cụ làm ngắn các liên kết web
// để đặt vào code cho đẹp và dễ đọc hơn
```

### Mở thêm một cửa sổ mới

Thao tác này được thực hiện bằng hàm [`open()`](https://www.w3schools.com/jsref/met_win_open.asp) của `window`. Tuy nhiên tùy vào thiết lập của người dùng đặt cho trình duyệt web, thao tác này có thể sẽ bị tạm khóa và hiện thông báo khác.

```window.js
open('https://www.duolingo.com/');
// trang web học ngoại ngữ miễn phí
```

## Hiện cửa sổ thông báo đơn giản để tương tác với người dùng

Cái này rất phổ biến vì không phải trang web nào cũng được xây dựng với giao diện người dùng được thiết kế và viết code vẽ giao diện chi tiết cho tất cả các tác vụ. Các trình duyệt web đều có sẵn các mẫu cửa sổ thông báo đơn giản để tương tác với người dùng và có thể được hiển thị bởi các hàm:

- [`alert(message)`](https://www.w3schools.com/jsref/met_win_alert.asp) - hiển thị thông báo đơn giản với một nút nhấn để đóng thông báo.
- [`confirm(message)`](https://www.w3schools.com/jsref/met_win_confirm.asp) - hiển thị một câu hỏi và hai nút nhấn để người dùng lựa chọn đồng ý hoặc không. Trả về giá trị `true` nếu người dùng chọn đồng ý, hoặc `false` nếu không đồng ý.
- [`prompt(message, defaultAnswer)`](https://www.w3schools.com/jsref/met_win_prompt.asp) - hiển thị một câu hỏi và một ô nhập liệu để người dùng nhập câu trả lời, kèm theo hai nút nhấn để gửi câu trả lời hoặc hủy nhập liệu. Trả về  chuỗi nội dung mà người dùng nhập vào, hoặc `null` nếu chọn hủy nhập liệu.

```prompt.js
var message = 'Nhập vào tên của bạn:';
var defaultAnswer = 'Some One';
var answer = prompt(message, defaultAnswer);
console.log(answer);
```

Ở đây bạn lưu ý là trình duyệt sẽ tạm dừng ở dòng `prompt` để chờ người dùng thao tác, sau đó mới tiếp tục chạy các câu lệnh ở bên dưới.

## Tạo bộ đếm thời gian để hẹn giờ hoặc tự động lặp một thao tác

Đôi khi chúng ta có thể sẽ muốn trì hoãn việc thực hiện một lời gọi hàm trong một khoảng thời gian. Điều này có thể được thực hiện với sự hỗ trợ của các hàm:

- [`setTimeout(oneFunction, miliseconds)`](https://www.w3schools.com/jsref/met_win_settimeout.asp) - tạo ra một bộ đếm `timer` và hẹn thời gian `miliseconds` sẽ thực hiện hàm `oneFunction`.
- [`clearTimeout(timer)`](https://www.w3schools.com/jsref/met_win_cleartimeout.asp) - hủy bộ đếm `timer` và không thực hiện hành động.

```timer.html
<p>
   Chúng ta sẽ chuyển tới
   <a href="'https://www.google.com/'">google.com</a>
   sau 10 giây nữa.
</p>

<button id="the-button">Đừng chuyển hướng :D</button>
```

```timer.js
   /* Tạo bộ hẹn giờ timer chuyển hướng sau 10 giây */

var goToGoogle = function() {
   location.href = 'https://www.google.com/';
};

var timer = setTimeout(goToGoogle, 10 * 1000);

   /* Gắn hàm xử lý cho nút nhấn hủy bộ hẹn giờ */

var theButton = document.getElementById('the-button');

theButton.onclick = function(event) {
   clearTimeout(timer);
};
```

Hoặc cũng có nhiều trường hợp, chúng ta sẽ muốn trình duyệt web tự động lặp lại một hành động sau mỗi khoảng thời gian nhất định.

- [`setInterval(oneFunction, miliseconds)`](https://www.w3schools.com/jsref/met_win_setinterval.asp) - tạo ra một bộ lặp `repeater` để tự động lặp hàm `oneFunction` sau mỗi khoảng thời gian `miliseconds`.
- [`clearInterval(repeater)`](https://www.w3schools.com/jsref/met_win_clearinterval.asp) - hủy bộ lặp `repeater`.

```repeater.html
<p>
   <b id="the-counter">0</b> ngôi sao...
</p>

<button id="the-btn">Dừng đếm đi :D</button>
```

```repeater.js
   /* Tạo bộ hẹn giờ tự động lặp thao tác đếm sao :D */

var numberOfStars = 0;

var countStar = function() {
   numberOfStars += 1;
   var theCounter = document.getElementById('the-counter');
   theCounter.textContent = numberOfStars;
};

var repeater = (countStar, 1 * 1000);

   /* Gắn hàm xử lý cho nút nhấn hủy bộ hẹn giờ */

var theBtn = document.getElementById('the-btn');

theBtn.onclick = function(event) {
   clearInterval(repeater);
};
```

[**Xem kết quả hiển thị**](https://codepen.io/semiarthanoi/full/QWaEGXo)

## Gửi yêu cầu `request` truy vấn thêm dữ liệu

Khi chúng ta sử dụng YouTube hay một mạng xã hội nào đó và cuộn trang chủ để xem nội dung mới, các nội dung sẽ được tiếp tục tải thêm vào trang web khi thanh cuộn chạm mốc giới hạn. Để làm được điều tương tự thì chúng ta cần tới sự giúp đỡ của một class dựng sẵn có tên là [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).

```request.js
   /* Các thông tin để gửi yêu cầu theo dạng của server cung cấp */

var hanoiPosition = {
   latitude   : 21.04912,
   longtitude : 105.877876
};
var openWeatherApiKey = '0f9b17d098964aeb784a6d638bf89603';
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather'
           + '?lat=' + hanoiPosition.latitude 
           + '&lon=' + hanoiPosition.longtitude
           + '&appid=' + openWeatherApiKey;

   /* Sử dụng XMLHttpRequest để gửi yêu cầu tới OpenWeatherMap.org */

var request = new XMLHttpRequest();
request.onload = function () {
   var requestDone = (this.readyState == 4);
   var gotResponse = (this.status == 200);
   if (requestDone && gotResponse)
      console.log(this.response);
   else
      console.log("Đã có lỗi xảy ra.");
};
request.open("GET", apiUrl);
request.send();

// kết quả:
// {"coord":{"lon":105.8779,"lat":21.0491},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":298.16,"feels_like":298.75,"temp_min":298.16,"temp_max":298.16,"pressure":1010,"humidity":78,"sea_level":1010,"grnd_level":1009},"visibility":10000,"wind":{"speed":4,"deg":160,"gust":5.62},"clouds":{"all":100},"dt":1647831393,"sys":{"type":1,"id":9308,"country":"VN","sunrise":1647817204,"sunset":1647860849},"timezone":25200,"id":1561096,"name":"Xom Pho","cod":200}
```

Ở đây bạn thấy dữ liệu mà chúng ta nhận được có dạng chuỗi mô tả một `object` chứa các `object` con và các mảng. Dữ liệu phản hồi ở dạng này còn được gọi là `JSON - JavaScript Object Notation` và là một trong các chuẩn dữ liệu giao tiếp giữa các ứng dụng hoạt động qua mạng `network`.

Để làm việc với `JSON` trong môi trường trình duyệt web, chúng ta có 2 hàm là:

- [`JSON.parse(jsonString)`](https://www.w3schools.com/jsref/jsref_parse_json.asp) - Chuyển đổi chuỗi mô tả JSON thành một `object` để viết code truy xuất tới các thành phần.
- [`JSON.stringify(jsonObject)`](https://www.w3schools.com/jsref/jsref_stringify.asp) - Chuyển đổi object `jsonObject` thành một chuỗi mô tả JSON để gửi đi.

```request.js
   /* Các thông tin để gửi yêu cầu ... */

   /* Hàm xử lý dữ liệu JSON nhận được và in ra console */

var printWeatherType = function(jsonString) {
   var jsonObject = JSON.parse(jsonString);
   var weatherInfo = jsonObject.weather[0];
   var weatherType = weatherInfo.main;
   console.log(weatherType);
};

    /* Sử dụng XMLHttpRequest để gửi yêu cầu ... */

var request = new XMLHttpRequest();
request.onload = function () {
   var requestDone = (this.readyState == 4);
   var gotResponse = (this.status == 200);
   if (requestDone && gotResponse)
      printWeatherType(this.resonse);      // In kết quả
   else
      console.log("Đã có lỗi xảy ra.");
};
request.open("GET", apiUrl);
request.send();

// kết quả: 'Clouds'
```

Bài viết của chúng ta về object `window` và `request` tới đây là kết thúc. Trong bài viết tiếp theo, chúng ta sẽ nói về việc sử dụng các thư viện `library` và `framework` JavaScript. Khi học CSS và được gặp gỡ Bootstrap, chúng ta đã biết `framework` tuyệt vời thế nào rồi. Vì vậy nên việc gặp lại khái niệm này tại Series JavaScript chắc chắn cũng là điều mà bất cứ ai trong số chúng ta đều rất mong muốn. :D

Hẹn gặp lại bạn trong bài viết tiếp theo.

[[JavaScript] Bài 9 - Library & Framework](https://viblo.asia/p/gAm5yEpw5db)
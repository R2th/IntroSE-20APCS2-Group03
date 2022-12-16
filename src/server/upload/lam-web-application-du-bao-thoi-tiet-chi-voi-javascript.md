Gần đây thời tiết Hà Nội nắng mưa thất thường lúc nóng lúc lạnh hẳn là app dự báo thời tiết sẽ là 1 trong những app mọi người thường xuyên lôi ra xài nhất (sau facebook) :D vậy sao chúng ta không tự làm 1 web app đơn giản xem thời tiết hiện tại để vui vẻ qua đó có thể luyện tập 1 một chút :).
chú ý đây là một web app ở dạng rất sơ khai chỉ để xem thời tiết và vui vẻ là chính đoạn vào đề chỉ để văn vẻ chút thôi. vì pờ rô rếch của chúng ta ở dạng rất đơn giản nên nó sẽ chỉ đc cấu tạo từ 4 thành phần chính:

* JavaScript: ngôn ngữ lập trình chính
* HTML: chắc chắn rồi để tạo trang hiển thị cho chúng ta
* CSS: làm màu một chút cho đỡ nhàm chán
* Data cho ứng dụng của chúng ta sẽ được lấy từ OpenWeatherMap API

     Để có được dữ liệu cập nhật về thời tiết, chúng ta cần đăng ký một trài khoản trên dịch vụ OpenWeatherMap. Để làm điều đó, hãy truy cập liên kết sau: https://home.openweathermap.org/users/sign_up

     Sau khi đăng ký, bạn có thể tìm thấy  API key lại bằng cách truy cập liên kết sau: https: //home.openweathermap.org/api_keys
     hãy lưu lại khóa này để sử dụng nhé!

Về phần code html, css không có gì cần chú ý cả mỗi người có thể tự custom theo ý mình bạn cũng có thể tham khảo code  ở bên dưới (mình cũng k giỏi FE đâu :3 ) 

```javascript:js
const appKey = "ff532977349290d86ac2bc3243a8ca5a";

var searchButton = document.getElementById("search-btn"),
  searchInput = document.getElementById("search-txt"),
  cityName = document.getElementById("city-name"),
  icon = document.getElementById("icon"),
  temperature = document.getElementById("temp"),
  humidity = document.getElementById("humidity-div");

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
  if (event.key === "Enter") {
    findWeatherDetails();
  }
}

function findWeatherDetails() {
  if (searchInput.value === "") {

  }else {
    var searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;
   httpRequestAsync(searchLink, theResponse);
  }
 }

function theResponse(response) {
  var jsonObject = JSON.parse(response);
  cityName.innerHTML = jsonObject.name;
  icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°";
  humidity.innerHTML = jsonObject.main.humidity + "%";
}

function httpRequestAsync(url, callback)
{
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => { 
      if (httpRequest.readyState == 4 && httpRequest.status == 200)
          callback(httpRequest.responseText);
  }
  httpRequest.open("GET", url, true); 
  httpRequest.send();
}
```

Ý tưởng đơn giản là khi người dùng nhập tên thành phố và nhân enter hoặc click submit thì sẽ gửi 1 XML request đến URL có dạng
"https://api.openweathermap.org/data/2.5/weather?q=cityname&appid=apikey"

Kết quả trả về ở dạng json giống như sau:
![](https://images.viblo.asia/bfd0c5bd-ae9c-4bd1-a29f-2dd18c8713b7.png)

Từ những data thu được ta chỉ việc show chúng lên trang chúng ta đã tạo bằng html 
dưới đây là thành quả :)

{@embed: https://codepen.io/ninhunest/pen/bMrqvr}

Bài viết có tham khảo từ nguồn:

https://openweathermap.org/current
https://boostlog.io/@israrawan/weather-application-using-javascript-5b0abc27a374750053e319f8
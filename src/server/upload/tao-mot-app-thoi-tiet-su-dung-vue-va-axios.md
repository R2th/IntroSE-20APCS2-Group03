Một trong những thử thách tương đối khó nhằn trên [freecodecamp](https://www.freecodecamp.org/) là xây dựng một [ứng dụng thời tiết](https://www.freecodecamp.org/learn/coding-interview-prep/take-home-projects/show-the-local-weather). Ý tưởng thì khá đơn giản. Nhận dữ liệu thời tiết từ API được cung cấp, xây dựng một function để chuyển đổi nhiệt độ từ độ C sang độ F và hiển thị thời tiết hiện tại.

Trong bài viết này, mình sẽ không diễn giải, hướng dẫn về cách giải quyết bài toán này một cách tường tận, chi tiết, nhưng đây có thể sẽ là một khởi đầu tốt, nếu bạn chưa biết phải làm gì.

Những gì mình sẽ chỉ cho bạn, là cách sử dụng Vue và Axios để kết nối với [OpenWeatherMap API](https://openweathermap.org/), lấy dữ liệu thời tiết từ một thị trấn (London) và hiển thị nó.

# OpenWeatherMap API
Để kết nối với API, bạn cần có API key, nếu không, máy chủ sẽ từ chối kết nối của bạn.

Bạn có thể nhận được API key miễn phí bằng cách nhấp vào nút subscribe trong "Current Weather Data" tại [đây](https://openweathermap.org/api).

API sẽ trả lại cho bạn dữ liệu ở định dạng JSON, nhưng bạn sẽ cần cung cấp một số thứ để có được nó:
* Endpoint
* API Key
* Đơn vị để lấy dữ liệu (độ C, độ F) - mặc định là hệ Anh
* Tên thành phố, tọa độ, zip code hoặc id thành phố

Bạn có thể kiểm tra các tham số mà API yêu cầu bạn truyền lên để lấy dữ liệu JSON từ trang [này](https://openweathermap.org/current).

Trong bài viết này, mình khai báo số liệu (độ C) là đơn vị và London là tên thành phố. Vì vậy, link API sẽ giống như sau:
```
http://api.openweathermap.org/data/2.5/weather + ?q=London + &?units=metric + &APPID={API KEY}
```

Mình đã chia nhỏ liên kết, vì vậy bạn có thể xem cách thêm thông số vào endpoint API để có được dữ liệu mà bạn mong muốn.

Link API hoàn chỉnh sẽ trông như thế này:
```
http://api.openweathermap.org/data/2.5/weather?q=London&?units=metric&APPID={API KEY}
```

Nếu bạn thêm API key của mình vào cuối link và dán nó vào trình duyệt, bạn sẽ nhận được tất cả dữ liệu mình cần. Bây giờ, tất cả những gì chúng ta phải làm là lấy dữ liệu đó vào Vue.

# Lấy dữ liệu thời tiết bằng Axios
Trong Javascript, bạn có thể sử dụng các công cụ khác nhau để lấy dữ liệu từ một API. Trong bài viết này, mình đang sử dụng axios. Cách bạn lấy dữ liệu từ API không thực sự thay đổi nhiều. Nếu bạn sử dụng một công cụ khác, bạn sẽ không gặp bất kỳ vấn đề gì.
Để sử dụng axios, bạn có thể thực hiện cài đặt `npm axios` hoặc thêm liên kết CDN `<script src = "https://unpkg.com/axios/dist/axios.min.js"> </script>` vào trang của bạn. Trong bài viết này, mình sẽ sử dụng axios thông qua CND.

Code mà bạn cần viết khá đơn giản. Đầu tiên, chúng ta gọi axios, sau đó chúng ta thực hiện một yêu cầu từ một URL và sau đó chúng ta sẽ nhận được phản hồi hoặc gặp lỗi nếu như nó được trả về.
Code sẽ trông như thế này:
```
axios
  .get(url)
  .then(response => {
    console.log(response.data);
})
  .catch(error => {
    console.log(error);
});
```

Nếu bạn đang tự hỏi tại sao chúng ta nhận được dữ liệu `response.data` chứ không phải đơn thuần là `response`, lý do cho điều này rất đơn giản. Response sẽ không chỉ trả về dữ liệu mà còn cả status code, title và loại request được thực hiện.
Sử dụng URL openweathermap và thêm một `console.log (response)` khác; và xem những gì bạn nhận được khi chạy code.

# Tạo Vue app
Mình sẽ không đi sâu về VueJs hoặc cách tạo ứng dụng với nó. Nhưng điều cơ bản là bạn tạo một ứng dụng bằng cách kích hoạt object Vue thành một id div.

Một ứng dụng Vue trông sẽ như thế này:
```
let weather = new Vue ({
  el: "#app",
  data: {

  },
  methods: {

  }
})
```

Tham số `el` là id của div bên trong html của bạn. Id div này thường được gọi là `app` nhưng bạn có thể đặt tên nó bất cứ thứ gì bạn muốn, chỉ cần đảm bảo bạn thay đổi `el` bên trong đối tượng Vue.

Tham số `data` chứa tất cả dữ liệu mà bạn có thể cần cho ứng dụng của mình, thông thường, bạn sẽ tạo các biến tại đây và sau đó sử dụng hoặc sửa đổi chúng. Đây cũng là nơi VueJs sẽ cố gắng lấy các tên biến để dịch các thẻ `{{name}}` trong HTML của chúng ta.

Tham số `methods` là nơi bạn chỉ định tất cả các hàm mà bạn có thể muốn gọi khi sử dụng ứng dụng.

Để sử dụng VueJs, bạn phải cài đặt nó bằng lệnh `npm install vue` hoặc thêm liên kết CDN `<script src = "https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue. js "> </script>` trên trang của bạn.

Mình hy vọng phần giới thiệu ngắn gọn và nhanh chóng này sẽ giúp bạn hiểu được mọi thứ với Vue nếu bạn chưa biết gì về framework này.

# Xây dựng ứng dụng

Bây giờ chúng ta đã có kiến thức cơ bản về cách kết nối với API OpenWeatherMap, cách sử dụng axios và cách tạo ứng dụng Vue, mình sẽ hướng dẫn bạn cách tạo ứng dụng thời tiết.

## HTML & CSS
HTML cho ứng dụng sẽ khá cơ bản. Trang sẽ có background và div ở giữa với id = "app" mà Vue sẽ sử dụng. Div này cũng sẽ có một hình nền đơn giản chỉ để làm cho nó trông đẹp hơn.

Vì vậy, hãy bắt đầu bằng cách tạo mã HTML. Chúng ta sẽ nhập các tệp css và js để có một trang web hoạt động, chúng ta cũng sẽ nhập VueJs, axios và hai phông chữ mà mình sẽ sử dụng trong ứng dụng.
```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Weather App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:extra-light|Vast+Shadow" rel="stylesheet">
  </head>

  <body>
    <div id="app">
    </div>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="main.js"></script>
  </body>

</html>
```

Bây giờ tất cả các tệp cần thiết đã được imported và trang đã có tiêu đề, chúng ta sẽ tạo khung cho div của mình. Để dữ liệu của bạn được hiển thị, bạn sẽ sử dụng định dạng `{{variableName}}`, tên `variableName` này sẽ là tên được sử dụng trong `data` trong ứng dụng Vuejs của chúng ta.

HTML sẽ được chia thành ba phần. Phần trên cùng bên trái sẽ hiển thị biểu tượng, thời tiết hiện tại và mô tả về thời tiết. Phần trên cùng bên phải sẽ hiển thị nhiệt độ tối thiểu và tối đa trong ngày. Cuối cùng là phần dưới cùng nơi chúng ta sẽ hiển thị các thông tin khác như độ ẩm, áp suất, thời gian mặt trời mọc / lặn và tốc độ gió.

`<Div id = "app">` sẽ giống như sau:
```
<div id="app">
  <div id="weather">
    <img src="images/sunny.svg"> {{overcast}}
    <span class="temperature">{{currentTemp}}°</span><br>
    <span id="temp-values">Min {{minTemp}}° <br> Max {{maxTemp}}°</span>
  </div>
  <div id="info">
    <img class="icon" :src=icon> {{sunrise}}
    <img class="icon" src="images/sunset.svg"> {{sunset}}
    <img class="icon" src="images/humidity.svg"> {{humidity}}
    <img class="icon" src="images/pressure.svg"> {{pressure}}
    <img class="icon" src="images/wind.svg"> {{wind}}
  </div>
  ```
  
Bây giờ, khung của trang web đã hoàn thành, chúng ta cần cập nhật tệp `main.css` để trang trông đẹp hơn một chút.
*Lưu ý: Code mà mình sẽ cho bạn thấy ở đây không đáp ứng responsive  và nó hơi khó hiểu. Mình chắc rằng có một cách tốt hơn để làm, nhưng nó sẽ phù hợp với mục đích của hướng dẫn này.*

**main.css File**
```
body {
  background: #3d4869; /* Old browsers */
  background: -moz-linear-gradient(#3d4869, #263048) fixed; /* FF3.6-15 */
  background: -webkit-linear-gradient(#3d4869,#263048) fixed; /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(#3d4869,#263048) fixed; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  background-repeat: no-repeat;

  font-family: 'Montserrat', sans-serif;
  font-weight: 100;
  text-shadow: 0px 0px 2px #000000;
  color: #ffffff;
}

#app {
  background: url(images/waves.svg) no-repeat;

  width:    520px;
  height:   170px;

  position: absolute;
  top:      35%;
  left:     35%;
}

#weather {
  padding: 15px;
  vertical-align: middle;
}

.temperature {
  font-family: 'Vast Shadow', cursive;
  font-size: 40px;
  vertical-align: top;
  position: absolute;
  left: 80px;
}

#temp-values {
  text-align: right;
  text-justify: distribute;
  display: block;
  position: relative;
  top: -60px;
}

#info {
  padding-left: 20px;
  position: relative;
  top: -20px;
}

.icon {
  position: inherit;
  top: 2px;
  padding-left: 8px;
}
```

**index.html file**
```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Weather App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:extra-light|Vast+Shadow" rel="stylesheet">
  </head>

  <body>
    <div id="app">
      <div id="weather">
        <img src="images/sunny.svg"> {{overcast}}
        <span class="temperature">{{currentTemp}}°</span><br>
        <span id="temp-values">Min {{minTemp}}° <br> Max {{maxTemp}}°</span>
      </div>
      <div id="info">
        <img class="icon" :src=icon> {{sunrise}}
        <img class="icon" src="images/sunset.svg"> {{sunset}}
        <img class="icon" src="images/humidity.svg"> {{humidity}}
        <img class="icon" src="images/pressure.svg"> {{pressure}}
        <img class="icon" src="images/wind.svg"> {{wind}}
      </div>
    </div>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="main.js"></script>
  </body>
</html>
```

Nếu bạn cố gắng mở trang, bạn sẽ nhận thấy rằng ứng dụng trông không thật sự tuyệt vời vào lúc này, đó là bởi vì chúng ta không có Vue làm dùm những việc nặng nhọc cho mình. Hãy tiếp tục và sửa lỗi này.

## Vue
Vue và axios đã được imported thông qua thẻ script nằm trong mã html của chúng ta, điều đó có nghĩa là chúng ta đã sẵn sàng để bắt đầu tạo hình cho ứng dụng của mình.

```
let weatherApp = new Vue ({
  el: '#app',
  data: {

  },
  methods: {
    getWeather() {
    },
  }
  beforeMount() {
    this.getWeather();
    }
});
```

Code trông sẽ khá đơn giản, chúng ta khởi tạo một ứng dụng Vue mới được đính kèm với div bằng id `app`. Bên trong ứng dụng Vue, chúng ta khai báo tất cả các biến cần thiết bên trong `data`, những biến này sẽ là những biến chúng ta sử dụng để điền thông tin thu được thông qua API.

Ngoài ra, chúng ta khai báo một phương thức gọi là `getWeather`, đây là phương thức sẽ sử dụng axios để lấy tất cả thông tin chúng ta cần từ API OpenWeatherMap.

Chúng ta muốn ứng dụng thời tiết hiển thị thời tiết hiện tại và các thông tin thời tiết khác như:
* Nhiệt độ tối thiểu trong ngày
* Nhiệt độ tối đa trong ngày
* Thời gian hoàng hôn
* Giờ mặt trời mọc
* Tốc độ gió
* Áp suất
* Phần trăm độ ẩm

API sẽ trả về tất cả các chi tiết này nên chúng ta không cần phải làm gì nhiều. Bên trong đối tượng Vue của chúng ta, chúng ta sẽ khai báo tất cả các biến mà chúng ta cần để cập nhật các thẻ `({{variableName}})` trong HTML của mình, sau khi kết nối với API và nhận được dữ liệu cần thiết.

Đối tượng `data` bên trong VueJs sẽ trông như thế này:
```
data: {
  currentTemp: '',
  minTemp: '',
  maxTemp:'',
  sunrise: '',
  sunset: '',
  pressure: '',
  humidity: '',
  wind: '',
  overcast: '',
  icon: ''
  },
```

## Nhận data từ API bằng Axios

Response từ API Openweathermap sẽ trông như sau:
```
{
    "coord": {
        "lon": -0.13,
        "lat": 51.51
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 24.82,
        "pressure": 1016,
        "humidity": 51,
        "temp_min": 23,
        "temp_max": 27
    },
    "visibility": 10000,
    "wind": {
        "speed": 8.2,
        "deg": 270
    },
    "clouds": {
        "all": 75
    },
    "dt": 1534695600,
    "sys": {
        "type": 1,
        "id": 5091,
        "message": 0.003,
        "country": "GB",
        "sunrise": 1534654394,
        "sunset": 1534706018
    },
    "id": 2643743,
    "name": "London",
    "cod": 200
}
```

Chúng ta sẽ sử dụng ví dụ về [axios](https://dev.to/fabiorosado/weather-app-using-vue-and-axios-4ia6?fbclid=IwAR1_ZY501n9m3E3lMNjvkPFPaoxbo1_oaS86sc6J9SlmCqIa91YL9WENh84#getting-the-weather-data-with-axios) này để xây dựng `getWeather` . Phương thức này sẽ trông giống như sau:
```
getWeather() {
  let url = "http://api.openweathermap.org/data/2.5/weather?q=London&?units=metric&APPID={API KEY}";
  axios
    .get(url)
    .then(response => {
          this.currentTemp = response.data.main.temp;
          this.minTemp = response.data.main.temp_min;
          this.maxTemp = response.data.main.temp_max;
          this.pressure = response.data.main.pressure;
          this.humidity = response.data.main.humidity + '%';
          this.wind = response.data.wind.speed + 'm/s';
          this.overcast = response.data.weather[0].description;
          this.icon = "images/" + response.data.weather[0].icon.slice(0, 2) + ".svg";
          this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,4);
          this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,4);
  })
  .catch(error => {
    console.log(error);
  })
}
```

Như bạn có thể thấy bằng response JSON mà chúng ta nhận được từ API, đoạn code trên chỉ đơn giản là gán từng bit dữ liệu được truy xuất từ API cho các biến được khai báo trong `data`, điều này sẽ cho phép chúng ta sử dụng dữ liệu ở mọi nơi trong ứng dụng.
Lưu ý rằng chúng ta đang thêm một số thứ vào một số biến.

Trong `icon`, chúng ta thêm đường dẫn cho thư mục hình ảnh, tên tệp và phần mở rộng tệp. Khi Vue chạy, nó sẽ thay đổi `src` của hình ảnh thành bất kỳ giá trị nào bên trong `icon`.

Đối với tên tệp, chúng ta sẽ cắt chuỗi mà chúng ta nhận được từ API từ ký tự nằm trên chỉ mục 0 đến ký tự ở chỉ mục 2 - điều này là do openweathermap thay đổi tên `icon` tùy thuộc vào đó là ngày hay đêm.

`sunrise` và `sunset` được đưa ra theo định dạng của Unix, vì vậy chúng ta chỉ cần chuyển đổi thời gian sang định dạng đọc hiểu của ngôn ngừ người và sau đó cắt chuỗi để chỉ lấy giờ và phút.

Tệp main.js của bạn và ứng dụng Vue bây giờ sẽ giống như sau:
```
let weatherApp = new Vue({
  el: '#app',
  data: {
    currentTemp: '',
    minTemp: '',
    maxTemp:'',
    sunrise: '',
    sunset: '',
    pressure: '',
    humidity: '',
    wind: '',
    overcast: '', 
    icon: ''
  },
  methods: {
    getWeather() {
      let url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID={Your API Key}";
      axios
        .get(url)
        .then(response => {
          this.currentTemp = response.data.main.temp;
          this.minTemp = response.data.main.temp_min;
          this.maxTemp = response.data.main.temp_max;
          this.pressure = response.data.main.pressure;
          this.humidity = response.data.main.humidity + '%';
          this.wind = response.data.wind.speed + 'm/s';
          this.overcast = response.data.weather[0].description;
          this.icon = "images/" + response.data.weather[0].icon.slice(0, 2) + ".svg";
          this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,4);
          this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,4);
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
  beforeMount() {
    this.getWeather();
  },
});
```

Thay thế `{Your API Key}` bằng khóa API mà bạn lấy được từ openweathermap và tải lại trang, bạn sẽ thấy ứng dụng với dữ liệu thời tiết hiện tại ngay bây giờ.

# Tổng kết
Cảm ơn mọi người đã dành thời gian cho bài viết khá dài này. Mình hy vọng bạn đã học cách sử dụng axios và Vue cùng nhau để lấy dữ liệu từ API. Nếu bạn có góp ý gì hay cần giải thích điều gì hãy comment bên dưới cho mình nha.
Link bài viết gốc: [đây](https://dev.to/fabiorosado/weather-app-using-vue-and-axios-4ia6)
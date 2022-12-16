VueJS là một framework nổi tiếng và được sử dụng nhiều trong việc làm web application. Nhưng bạn đã bao giờ sử dụng nó để xây dựng một Desktop Application.
Hôm nay mình sẽ giới thiệu với các bạn cách viết  một Desktop Application với VueJs và Election.
> Election là một thư việc mã nguồn mở được xây dựng bởi GitHub dành cho việc xây dựng ứng dụng Desktop đa nền tảng sử dụng HTML, CSS và Javascript. Electron làm điều này dựa trên việc kết hợp Chromium và Node.js vào một single runtion và ứng dụng có thể đóng gói cho Mac, Windows và Linux
>

### Chúng ta sẽ xây dựng cái gì?
Chúng ta sẽ build một ứng dụng tra cứu thời tiết đơn giản sử dụng API của [OpenWeatherMap API](https://openweathermap.org/api).

### Cài đặt

Cài đặt VueCLI
 ```
 npm install -g vue-cli
 ```
 Nếu muốn cài đặt phiên bản mới nhất của VueCLI:
 
 ```
 npm install -g @vue/cli @vue/cli-init
 ```
 
 Notes: Nếu như lỗi thì bạn hãy thử với sudo nhé.
 
 Sau khi cài đặt xong VueCLI thì chúng ta sẽ init project nhé.
 ```
 vue init simulatedgreg/electron-vue weather-app
 ```
Phía dưới là các options mà mình đã chọn trong quá trình init.
![](https://images.viblo.asia/4787c912-11dd-4e1c-8276-8bd4f2bc6350.png)
### Cấu trúc thư mực
Mở project lên thì chúng ta chú ý có 2 thư mục chính đó  là **main** và **renderer**.
Vậy chúng là gì?
main có 2 file là **index.js** và **index.dev.js**.

***index.js*** là file chính của ứng dụng, trong đó có chứa các config và đây chính là file electron và webpack sử dụng để build cho chúng ta một ứng dụng Desktop.

***index.dev.js*** cũng giống như index.js nhưng chỉ dành cho môi truờng dev. Ở dây nó config cho chúng ta sử dụng VUEJS_DEVTOOLS và electron-debug để dev có thể dễ dàng debug lỗi.

Tiếp theo đến thư mục **renderer**. Đây chính là nơi chứa các file code của chúng ta. Trong thư mục này nó giống như cây thư mục của một project VueJs.

### Xây dựng ứng dụng
Mở file App.vue, ta thấy nó đang sử dụng child component là LandingPage.
Chúng ta sẽ remove cái LandingPage này ra và code trên file App.vue luôn, vì chỉ làm một cái đơn giản nên mình sẽ không tách file ra. Nhưng nếu bạn muốn thì vẫn có thể, vì nó cũng giống như một project Vue bình thuờng.

Ok.  Xóa <landing-page> đi, chúng ta sẽ thêm đoạn code HTML sau vào:
    
```html
         <div id="app">
        <p>Enter the city name to check current weather in it</p>
        <section class="weather-input">
          <input type="text" v-model="query">
          <button :disabled="!query.length" @click="getWeather">Check</button>
        </section>
    </div>
 ```
 Đừng quên thêm **query** vào phía dưới nhé :D

 ```javascript
    data() {
      return {
        query: '',
      };
    },
```

OK. Bây giờ ứng dụng của chúng ta trông thế này:
![](https://images.viblo.asia/0d58a063-6642-4987-979d-1c9f4487bc3d.png)

Như các bạn thấy thì phía bên phải sẽ có debug, muốn tắt mở cái debug này thì chúng ta sử dụng F12 nhé.

### Thực hiện gọi API
    
    Như đã nói ở trên thì mình sẽ sử dụng[ OpenWeatherMap API](https://openweathermap.org/api).
Nếu bạn cũng sử dụng cái này thì hãy đăng ký một tài khoản để có API_KEY nhé.
Lúc init project thì chúng ta cũng đã install axios rồi. Nếu bạn  nào chưa install axios hãy install axios nhé.
Trong file renderer/main.js chúng ta đã có config:
```javascript
    if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
    Vue.http = Vue.prototype.$http = axios;
    Vue.config.productionTip = false;
```

Nên ở chúng ta có thể sử dụng this.$http trong component để gọi request nhé.
Thêm một chút config baseURL cho axios
```javascript
axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5';
```

Bây giờ trong file App.vue, chúng ta sẽ thay đổi data một chút nhé
```javascript
data() {
      return {
        query: '',
        error: false,
        city: '',
        country: '',
        weatherDescription: '',
        temp: null,
        tempMin: null,
        tempMax: null,
        humidity: null,
        icon: '',
      };
    },
```

Cùng viết một method để get dữ liệu về nhé
```javascript
    getWeather() {
        this.$http.get(`/weather?q=${this.query},uk&APPID=${API_KEY}`)
          .then((response) => {
            this.city = response.data.name;
            this.country = response.data.sys.country;
            this.weatherDescription = response.data.weather[0].description;
            this.temp = response.data.main.temp;
            this.tempMin = response.data.main.temp_min;
            this.tempMax = response.data.main.temp_max;
            this.humidity = response.data.main.humidity;
            this.icon = `http://openweathermap.org/img/w/${
              response.data.weather[0].icon
            }.png`;
            this.error = false;
          });
         .catch(() => {
            this.error = true;
            this.city = '';
          });
      },
```
    
và thêm callback khi click button
```html
<button :disabled="!query.length" @click="getWeather">Check</button>
```
Thử một chút và đây là response of request:
    ![](https://images.viblo.asia/0d7fd73d-fe63-4e31-bd59-b7b220a5b50c.png)
    
### Hiển thị dữ liệu
 Thêm vào App.vue
```html
<div id="app">
   <p>Enter the city name to check current weather in it</p>
    <section class="weather-input">
      <input type="text" v-model="query">
      <button :disabled="!query.length" @click="getWeather">Check</button>
    </section>
    <section v-if="error" class="weather-error">
      There is no such city in the database
    </section>
    <section v-if="city.length" class="weather-result">
      <h1>{{city}}, {{country}}</h1>
      <p><em>{{weatherDescription}}</em></p>
      <div class="weather-result__main">
        <img :src="icon" alt="Weather icon">
        <div class="weather-result__temp">
          {{temp}}&deg;C
        </div>
      </div>
      <div class="weather-result__details">
        <p>Min: {{tempMin}}&deg;C</p>
        <p>Max: {{tempMax}}&deg;C</p>
        <p>Humidity: {{humidity}}%</p>
      </div>
    </section>
  </div>
```
Thêm một ít CSS:
```CSS
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  padding: 10px;
  background: rgb(212, 228, 239);
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    rgba(212, 228, 239, 1) 0%,
    rgba(134, 174, 204, 1) 100%
  );
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    rgba(212, 228, 239, 1) 0%,
    rgba(134, 174, 204, 1) 100%
  );
  background: radial-gradient(
    ellipse at center,
    rgba(212, 228, 239, 1) 0%,
    rgba(134, 174, 204, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d4e4ef', endColorstr='#86aecc',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}

.weather-input {
  display: flex;
  align-items: center;
  padding: 20px 0;
}

.weather-result {
  text-align: center;
  &__main {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 5px;
    font-size: 1.3rem;
    font-weight: bold;
  }
  &__details {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: dimgray;
  }
}

.weather-error {
  color: red;
  font-weight: bold;
}

input {
  width: 75%;
  outline: none;
  height: 25px;
  font-size: 0.8rem;
  padding: 10px;
}

button {
  display: block;
  width: 25%;
  height: 25px;
  outline: none;
  white-space: nowrap;
  margin: 0 10px;
  font-size: 0.8rem;
  border-radius: 0;
  border: none;
}
```

Và ứng dụng của chúng ta sẽ trông thế này:
    
![](https://images.viblo.asia/827c51dc-5765-4a24-bede-07e7e43690c3.png)

### Kết luận
Vậy là chúng ta đã làm xong một ứng dụng Desktop đơn giản với Electron và VueJS.
Mình vẫn chưa tìm hiểu và cách packaging này thành 1 ứng dụng để cài đặt.
Lần tới đây mình sẽ tìm hiểu cái này và viết một Reminder or Todo App với cái này.
Hi vọng các bạn sẽ theo dõi.
Cuối cùng cám ơn các bạn đã đọc bài và Happy Hacking!!!!
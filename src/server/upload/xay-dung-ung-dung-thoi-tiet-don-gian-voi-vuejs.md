Việc build các ứng dụng nhỏ thường là một cách tốt để thực hành. Có khá nhiều thứ chúng ta có thể học được khi phát triển những ứng dụng nhỏ, và đặc biết nếu bạn chưa bao giờ làm cái gì đó cho riêng mình. Ứng dụng này cũng khá đơn giản khi đã có sẵn api cung cấp, chúng ta chỉ cần nhận dữ liệu và hiển thị thui.
# API là gì?
Nếu bạn chưa biết về api, có thể tham khảo bài viết này về API:

https://viblo.asia/p/chapter-1-gioi-thieu-ve-apis-m68Z0RmA5kG
# Weather API

Api mình sử dụng là https://developer.accuweather.com/ mình sử dụng vì thấy hướng dẫn của nó khá dễ hiểu. Để sử dụng thì các bạn cần phải đăng ký một tài khoản (miễn phí) và lấy api key.
Giao diện developer của accuweather:
![](https://images.viblo.asia/f94f0239-b066-48ce-b288-531c303a118b.png)
Ở đây mình dùng loại lấy dữ liệu dự báo của 5 ngày liên tiếp. LocationKey là id của thành phố mà chúng ta cần lấy thông tin. Mình có id của 3 thành phố là:
1.  Hà Nội - 353412
2.  Đà Nẵng - 352954
3.  TP Hồ Chí Minh - 353981

Cách lấy thì bạn trang https://www.accuweather.com và tìm tên thành phố thôi.

Kết quả trả về:
```javascript
{
  "Headline": {
    "EffectiveDate": "2018-12-22T01:00:00+07:00",
    "EffectiveEpochDate": 1545415200,
    "Severity": 2,
    "Text": "Dự kiến thời tiết mưa rào từ cuối đêm Thứ Bảy đến cuối đêm Thứ Hai",
    "Category": "rain",
    "EndDate": "2018-12-24T07:00:00+07:00",
    "EndEpochDate": 1545609600,
    "MobileLink": "http://m.accuweather.com/vi/vn/hanoi/353412/extended-weather-forecast/353412",
    "Link": "http://www.accuweather.com/vi/vn/hanoi/353412/daily-weather-forecast/353412"
  },
  "DailyForecasts": [
    {
      "Date": "2018-12-18T07:00:00+07:00",
      "EpochDate": 1545091200,
      "Temperature": {
        "Minimum": {
          "Value": 61,
          "Unit": "F",
          "UnitType": 18
        },
        "Maximum": {
          "Value": 73,
          "Unit": "F",
          "UnitType": 18
        }
      },
      "Day": {
        "Icon": 2,
        "IconPhrase": "Nhiều nắng"
      },
      "Night": {
        "Icon": 34,
        "IconPhrase": "Quang mây"
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://m.accuweather.com/vi/vn/hanoi/353412/daily-weather-forecast/353412?day=1",
      "Link": "http://www.accuweather.com/vi/vn/hanoi/353412/daily-weather-forecast/353412?day=1"
    },
    .....................
  ]
}    
```

Phân tích kết quả tra về thì mình sẽ sử dụng một số thông tin:
* DailyForecasts - mảng thông tin dự báo của 5 ngày
* DailyForecast.Date - Ngày dự báo
* DailyForecast.Temperature - Nhiệt độ cao và thấp nhất trong ngày (đang để ở độ F)
* DailyForecast.Day.Icon - Id của icon ban ngày
* DailyForecast.Day.IconPhrase - phần mô tả
* DailyForecast.Night.Icon - Id của icon ban đêm
* DailyForecast.Night.IconPhrase - phần mô tả

# Thiết kế
Sơ bộ thì cái app của mình có bố cục như hình:![](https://images.viblo.asia/b66c273a-50e5-45c5-bdb1-62a1c6fe189d.png)

Tiếp theo thì mình đi tải ảnh và các icon thời tiết cho app.

# Viết code
Đầu tiên với các thông tin đã có, mình khai báo như sau:
```js
const cities = [353412, 352954, 353981];
const apikey = '';
```

Tạo đối tượng Vue

```js
var app = new Vue({
  el: '#app',
  data: {
    city_key: cities[0],
    days: [],
  }
})
```

Để lấy dữ liệu từ accuweather, vì không có jquery hay dùng thư viện gì nên mình dùng Fetch API để gửi request lấy dữ liệu. Tìm hiểu về Fetch API bạn có thể tham khảo: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

Hàm fetch data:
```js
fetch_data() {
  let url = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + this.city_key;
  let param = '?language=vi&apikey=' + apikey;
  fetch(url + param)
    .then(res => {
      return res.json();
    })
    .then(res => {
      this.days = res.DailyForecasts;
    })
    .catch(res => {
      alert('Tải dữ liệu không thành công');
    })
}
```
Sau khi lấy dữ liệu về thì mình có thể show ra rồi:
![](https://images.viblo.asia/c47e0dca-a292-4471-822b-b91dff7c6cb6.png)


Tiếp theo mình sẽ tạo một component để hiển thị dự báo cho các ngày tới:
```js
Vue.component('weather-day', {
  props: ['day', 'mode'],
  computed: {
    weekday() {
      let d = new Date(this.day.Date);
      let days = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
      return days[d.getDay()];
    },

    wicon() {
      let wicon = '';
      if(this.mode == 'day') {
        let icon = this.day.Day.Icon;
        if([1,2].includes(icon)) wicon = 'svg/1.svg';
        if([3,4,5,6].includes(icon)) wicon = 'svg/2.svg';
        if([7,8,11].includes(icon)) wicon = 'svg/3.svg';
        if([12,13,14,18].includes(icon)) wicon = 'svg/4.svg';
        if([15,16,17].includes(icon)) wicon = 'svg/5.svg';
      } else {
        let icon = this.day.Night.Icon;
        if([33, 34].includes(icon)) return 'svg/10.svg';
        if([35, 36, 37, 38].includes(icon)) return 'svg/11.svg';
        if([7,8,11].includes(icon)) wicon = 'svg/3.svg';
        if([12,13,14,18].includes(icon)) wicon = 'svg/4.svg';
      }
      return wicon;
    },

    wtemp() {
      let wtemp = 0;
      if(this.mode == 'day') {
        wtemp = app.FtoC(this.day.Temperature.Maximum.Value);
      } else {
        wtemp = app.FtoC(this.day.Temperature.Minimum.Value);
      }
      return wtemp;
    }
  },
  template: `
    <div class="wday">
      <div class="weekday">{{ weekday }}</div>
      <div class="wicon">
        <img :src="wicon" />
      </div>
      <div class="wtemp">{{ wtemp }} &#176;C</div>
    </div>
  `,
})
```
Hình ảnh:
![](https://images.viblo.asia/2c4af239-a399-4979-84dc-8f52ad17b2b9.png)

Có hàm FtoC là hàm để đổi từ độ F sang độ C:
```js
FtoC(f) {
  return Math.round((f - 32) * 5 / 9);
}
```
Tiếp theo mình sẽ thêm chức năng cho phép chọn thành phố:
```html
<div v-for="(city, index) in cities"
     :key="index"
     :class="{city: true, active_city: city_key == city.value}"
     @click="city_key = city.value" >
    {{ city.name }}
</div>
```
Watch:
```js
watch: {
    city_key() {
      this.fetch_data();
    }
},
```
# Hoàn thành
Giao diện app khi hoàn thành:
![](https://images.viblo.asia/1bc787c5-236a-40be-8152-3d7ece9c2781.png)

Bạn có thể xem demo ở đây:
[Link DEMO](https://hungkieu.github.io/weather/)

Source Code: [link](https://github.com/hungkieu/hungkieu.github.io/tree/master/weather)

Mình có deploy bằng github page nếu bạn nào muốn tìm hiểu có thể xem ở đây: https://pages.github.com/

**Link demo có thể bị lỗi vì api chỉ cho 50calls/day :sob:** ![](https://tracktracktrack.herokuapp.com/0egnk6uoptxb9fay/img)
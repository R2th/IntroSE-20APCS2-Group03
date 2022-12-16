### Mở đầu
### Setup hệ thống
Trước tiên mình sẽ khởi tạo project bằng cách sử dụng npm để download các thư viện cần thiết và thiết lập môi trường cho ứng dụng:
```
npm init
```
Sau đây là các thư viện cần thiết mình đã cài đặt trong môi trường 
```
#package.json
{
  "name": "weather_app",
  "version": "1.0.0",
  "description": "",
  "author": "",
  "license": "ISC",
  "main": "src/index.js",
  "dependencies": {
    "react": "16.3.2",
    "react-dom": "16.3.2",
    "react-scripts": "1.1.4"
  },
  "devDependencies": {},
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```
Tiếp theo là mình sẽ tạo cấu trúc thư mục như sau để phát triển:
```
-public
    index.html
-src
    Hello.js
    index.js
package.json
```
Nội dung của các file lần lượt như sau:
```
#index.html
<body>
    <div id="root">
    </div>
</body>

#Hello.js
import React from 'react';

export default ({ name }) => <h1>Hello {name}!</h1>;

#index.js
import React from "react";
import ReactDOM from "react-dom";
import Hello from "./Hello";

ReactDOM.render(<Hello name="World" />, document.getElementById('root') );
```
Sau đó ta sẽ start ứng dụng bằng câu lệnh `npm start`:
```
npm start
```
![](https://images.viblo.asia/ff539b9e-bf00-47ce-b6f3-b70e8994f942.png)

### Weather API
Phần tiếp theo mình cần tìm api về thời tiết (do mình không thể tự xây server để lưu trữ dữ liệu về thời tiết) cho hệ thống của mình. Mình có tìm kiếm trên mạng và tìm hiểu được một số trang web cung cấp api về thời tiết rất chính xác, dễ sử dụng và quan trọng là có các gói miễn phí cho developer  sử dụng. Đó là:
1. https://developer.accuweather.com/
2. https://openweathermap.org/api

Mình đã đăng kí tài khoàn developer ở cả hai và đều đã sử dụng thử, dữ liệu trả về tương đối đầy đủ các thông tin nhưng mà ứng dụng của mình chắc cũng không thể sử dụng hết nhiều đến như thế. Mình recommend sử dụng api của thằng accuweather vì dữ liệu của nó sát với các trang web dự báo thời tiết ở Việt Nam, và mình thấy bọn accuweather này có cung cấp cả service cho tiếng việt nữa. Sau đây là giao diện developer của accuweather

![](https://images.viblo.asia/6438623d-e366-4fe0-b341-cf690b5f2c18.png)

Kết quả trả về:
![](https://images.viblo.asia/b6185607-8c3d-4dda-9ee4-1112c9b46a3e.png)

### Xây dựng module weather
Bước đầu tiên là mình sẽ tạo thư mục cho Module như sau:
```
-src
    WeatherContainer
        - index.css
        - index.jsx
        - weatherItem.jsx
    
    BaseComponent.jsx
    index.js
package.json
```
Trước tiên ta sẽ tạo file BaseComponent.jsx để có thể viết các hàm chung cho tất cả class kế thừa nó (Các hàm authen quyền hạn, kiểm tra đã login vào hệ thống...).
```
import { Component } from 'react';

class BaseComponent extends Component {

  baseFunction = () => {
    console.log("BaseComponent");
  }
}

export default BaseComponent;
```
Tiếp theo ta sẽ xây dựng một button đơn gian để get dữ liệu từ web api của developer.accuweather.com. Sau khi get dữ liệu thành công, ta sẽ kiểm tra lại bằng câu lệnh console.log(response) để xem kết quả trả về. Cơ chế hoạt động rất đơn giản từ button được xây dựng bởi component react, sử dụng hàm `onClick={this.loadCurrentWeather}` để bắt sự kiện click vào button, trong hàm loadCurrentWeather ta sử dụng ajax jquery để tạo request lên server. Trong request thì cần nhưng thông tin quan trọng như sau: apikey của app bạn tạo trên trang developer dùng để xác thực và locationId mà mình mong muốn xem dự báo thời tiết(locationId bạn có thể tìm kiếm ngay tại [đây](https://developer.accuweather.com/accuweather-locations-api/apis/get/locations/v1/cities/search)).

Một điều cần lưu ý nữa là trong này mình sẽ sử dụng tính năng arrow function trong es6 để viết các hàm. Arrow functions giúp cho việc viết code trờ lên ngắn gọn hơn, đơn giả dễ hiểu và cho phép thay thế thừ khóa .bind(this) trong react. Ví dụ: function loadCurrentWeather()
```loadCurrentWeather
import React from 'react';
import BaseComponent from '../BaseComponent';
import $ from 'jquery';

class WeatherContainer extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      arrWeather: [],
    };
  }

  loadCurrentWeather = () => {
    let key = process.env.REACT_APP_ACCUWEATHER_KEY;
    let locationId = '353412';   //location: Hanoi
    let url = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'
      + locationId + '?apikey=' + key + '&language=vi&details=true&metric=true';
    $.ajax({
      url: url,
      method: 'GET',
      success: (response) => {
        this.setState({
          arrWeather: response.DailyForecasts
        });
      },
      error: (xhr, status, err) => {
        console.log('false');
      }
    });
  }

  render(){
    return(
      <div className="site-content">
        <button className="load-weather" onClick={this.loadCurrentWeather}>
           Get weather
         </button>
      </div>
    )
  }
}

export default WeatherContainer
```
Ở bước này để có thể xem response trả về, có thể dùng console.log hoặc gán trực tiếp vào state như ở đoạn code trên thì các bạn có thể sử dụng extension trên chrome `React Developer Tools`. Kết quả trả về như sau:
![](https://images.viblo.asia/c5ee3004-315d-4e61-aff2-6051a2f7f84f.png)

Điều cần lưu ý tiếp theo là cách đăt tên cho biến env trong file .env
* Chỉ có những tham số bắt đầu bằng REACT_APP_ mới được chấp nhận và sử dụng làm biến môi trường.
* Những giá trị thỏa mãn trong file env có thể được gọi ra bằng biến process.env, ví dụ: process.env.REACT_APP_SECRET_CODE.
* Sau khi thêm mới hoặc sửa biến môi trường để hệ thống có thể hiểu được việc cần làm đó là reset server

Cuối cùng trong file index.js ta sẽ thay đổi code để load module weather trực tiếp luôn như sau:
```
import React from "react";
import ReactDOM from "react-dom";
import WeatherContainer from "./WeatherContainer/index";

ReactDOM.render(<WeatherContainer />, document.getElementById('root'));
```
Đến bước này bạn đã hoàn thành bộ khung của sản phẩm rồi save lại và gõ `npm start` trong terminal để xem kết quả của sản phẩm thôi.
###  Giao diện cho ứng dụng
Sau khi đã có dữ liệu trả về thì việc làm của bạn ngay lúc này là tìm kiếm một template hoặc tự mình thiết kế template cho ứng dụng của bạn. Ở đây thì mình có download template miễn phí để sử dụng các bạn có thể download tại [đây](https://www.themezy.com/free-website-templates/128-steel-weather-free-responsive-website-template) 

Bạn hãy thiết kế cho ứng dụng theo cá tính riêng, mình lười nên sử dụng template có sẵn luôn. Dữ liệu trả về thì rất nhiều bạn có thể thoải mái chọn những thông tin cần thiết chẳng hạn:
* Nhiệt độ lớn/nhỏ nhất trong ngày
* Buối sáng/tối có tình trạng thời tiết như thế nào
* Sức gió, độ ẩm ...

### Deploy
Mình sẽ đưa ứng dụng lên Heroku. Do đó bạn vào trang  [này](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) để đăng ký tài khoản, cài đặt Heroku CLI 

Sau khi cài đặt xong, quay trở lại với terminal đăng nhập tài khoản heroku để thực hiện deploy
```
$ heroku login
 ▸    heroku-cli: update available from 6.13.5-5be2d1f to 6.16.18-871efae
Enter your Heroku credentials:
Email: your_email@gmail.com
Password: *********
```

Tiếp theo tạo app mới trên heroku, đồng thời thêm remote heroku bằng câu lệnh sau
```
$ heroku create your-app-name
Creating ⬢ your-app-name... done
$ heroku git:remote -a  your-app-name
git remote -v // kiểm tra remote đã được thêm vào chưa
```

Cuối cùng ta sẽ thực hiện đây code lên bằng lệnh sau:
```
$ git add -A
$ git commit -m"depoy app"
$ git push heroku HEAD:master
```

Kết quả sau khi thực hiện 
```
remote: -----> Build succeeded!
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote: 
remote: -----> Compressing...
remote:        Done: 49.2M
remote: -----> Launching...
remote:        Released v3
remote:        https://weather-app-2018.herokuapp.com/ deployed to Heroku
remote: 
remote: Verifying deploy... done.
To https://git.heroku.com/weather-app-2018.git
 * [new branch]      HEAD -> master
```

Tuy nhiên chúng ta vẫn còn phải thực hiện một bước nữa trước khi chạy ứng dụng đó là set biến môi trường cho website
```
heroku config:set REACT_APP_ACCUWEATHER_KEY=AAAAAAAAAAAAAAAAAAAAAAAAAAAAA
```

Để chạy trang web gõ `heroku open`

Và đây là kết quả mình đã xây dựng được: https://weather-app-2018.herokuapp.com/

### Conclusion
Cảm ơn bạn đã đọc bài viết của mình, tuy nhìn có vẻ đơn giản nhưng trong quá trình làm mình cũng gặp phải nhiều khó khăn và đã tự search google đêr tìm cách giải quyết. Nếu bạn vào xem trang web của mình thì có thể thấy còn nhiều phần chưa làm xong, do đó phần tiếp theo mình sẽ hoàn thành nốt ứng dụng, áp dụng nhiều kĩ thuật hay hơn. 

Đây là source code của mình phát triển: https://github.com/duongpham910/weather_app_react. Hẹn gặp bạn vào phần tiếp theo
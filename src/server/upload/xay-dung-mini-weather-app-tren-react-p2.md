### Mở đầu
Như mình đã hứa với các bạn ở [phần 1](https://viblo.asia/p/xay-dung-mini-weather-app-tren-react-bWrZnNGnZxw), mình sẽ tiếp tục phát triển ứng dụng xem dự báo thời tiết. Ở phần 1 mình đã hoàn thành xong phần việc xem dự báo thời tiết của 5 ngày liên tiếp và xây dựng UI cho ứng dụng, tuy nhiên hệ thống vẫn còn nhiều hạn chế do chưa search theo từng thành phố, do mình fix cứng chỉ có thể xem dự báo thời tiết tại thành phố Hà nội. Phần tiếp theo mình sẽ xây dựng cơ chế auto suggest search khi tìm kiếm với tên của các thành phố, cải thiện giao diện của ứng dụng, và xử lý các lỗi có thể xảy ra với ứng dụng.
### Áp dụng auto suggest vào phần search
Trong phần 2 này mình sẽ thêm phần search vào ứng dụng, không còn mặc định load thời tiết tại một điểm nhất định. Tuy nhiên api cũng có giới hạn, không thể cung cấp thời tiết của tất cả các thành phố được các bạn có thể tham khảo cách lấy locationId của accuweather tại [đây](https://developer.accuweather.com/accuweather-locations-api/apis). 

Đọc qua api của accuweather thì bạn cũng có thể hiểu các thao tác thực hiện để sử dụng api, trước tiên cần xác định params locationId của thành phố mong muốn xem thời tiết, sau khi có locationId thì mới có thể tìm kiếm được thời tiết tại khu vực đó. Như vậy nếu để người dùng free search tại searchbar thì rất hầu như không có kết quả trả về. Do vậy mình quyết định sẽ hỗ trợ bằng cách thêm cơ chế auto suggest cho phần search của ứng dụng dựa trên package sau https://react-autosuggest.js.org/. 

Có rất nhiều ví dụ trên trang chủ , các bạn có thể tham khảo và xem cách hoạt động của react auto sugest nhuw sau:
{@codepen: https://codepen.io/moroshko/pen/LGNJMy}

Dựa vào ví dụ trên mình sẽ áp dụng cơ chế suggest địa điểm tương tự. Việc cần làm đầu tiên là xây dựng được bộ dữ liệu tên của các thành phố và id của các thành phố,  rất may accuweather cung cấp api để lấy dự liệu top 150 thành phố trên thế thới 
![](https://images.viblo.asia/c2ce28b4-c64c-44ac-93ab-2ffed30a1a61.png)

Với dữ liệu mà api accuweather cung cấp mình đã crawler để xây dựng master data cho phần auto suggest. Bạn có thể tham khảo file cities.json của mình tại [đây](https://github.com/duongpham910/weather_app_react/blob/develop/src/WeatherContainer/cities.json)

Bước tiếp theo là áp dụng module vào dự án :
```
npm install react-autosuggest --save 
```
Cấu trúc thư mục
```
-src
    WeatherContainer
        - cities.json
        - index.css
        - index.jsx
        - weatherItem.jsx
```
Tương tự với ví dụ ở trên mình sẽ thêm các function liên quan vào trong file index.jsx

```
...
import Autosuggest from 'react-autosuggest';
import cities from './cities.json';

class WeatherContainer extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      arrWeather: [],
      value: '',
      suggestions: [],
    };
  }
  
  ...
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  
  getSuggestions = (value) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp('^' + escapedValue, 'i');
    return cities.filter(city => regex.test(city.name));
  }
  
  render(){
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Find your location...",
      value,
      onChange: this.onChange
    };
    return(
      <div className="site-content">
        ...
          <div className="container">
            <div className="find-location">
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
              <button className="load-weather" onClick={this.loadCurrentWeather}>
                Get weather
              </button>
        ...
      </div>
    )
  }
}
  
export default WeatherContainer

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

```

Kết quả sau khi hoàn thiện module suggest:
![](https://images.viblo.asia/a297a1a9-b59f-4bd0-8799-55acbd6be220.png)
### Sử dụng thư viện axios
Phần tiếp theo mình muốn sử dụng module axios để gọi api của accweather thay vì sử dụng jquery thông thường. Dưới đây là 2 lí do của mình
* Axios là một thư viện HTTP Client dựa trên Promise
* Dễ dàng tạo các asynchronous HTTP request cho cho các endpoint API để thực hiện các thao tác CRUD.

Ban đầu khi xem lướt qua thì mình nghĩ rằng thư viện axios cũng ko khác gì so với jquery cũng chỉ là hỗ trợ thực hiện các thao tác synchronous HTTP request, tuy nhiên sau một thời gian nghiên cứu => mình phát hiện một diểm rất hay của axios là được xây dựng dưa trên cơ chế Promise. 

Và cũng ngẫu nhiên khi ở phần dưới đây mình cần thực hiện gọi hai api liên tiếp, kết quả trả về của api đầu sẽ là params truyền vào của api thứ 2 do đó việc sử dụng cơ chế Promise là cần thiết, các bạn có thể xem tại [đây](https://viblo.asia/p/mot-so-khai-niem-co-ban-trong-javascript-RnB5pNVwZPG#_promises-3) để biết lí do 

Cài đặt module
```
npm install axios
```

Trong phần code ta sẽ thay đổi như sau:
```
//old
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
//new
axios.get(url)
.then(response => {
  this.setState({
    arrWeather: response.data.DailyForecasts
  });
})
.catch(error => {
  console.error(error);
})
```  
### Xử lý abnormal case
Sau khi hoàn thành việc implement auto suggest tên các thành phố, mình phát hiện ra một số case sẽ gây lỗi cho hệ thống như sau:
+ Không nhập tên thành phố trên search bar sau đó thì ấn enter button search luôn
+ Nhập tên thành phố sai
+ ... tạm thời mình sẽ xử lý những case trên đã

Để xử lý 2 trường hợp trên, khi phát hiện ko có dữ liệu được truyền vào hoặc dữ liệu không chính xác mình sẽ request đến https://ipinfo.io/geo để lấy thông tin về thành phố hiện tại mà người dùng đang ở đấy và truy cập vào ứng dụng. Ví dụ kết quả trả về khi mình request đến như sau:
```
{
  "city": "Hanoi",
  "region": "Thanh Pho Ha Noi",
  "country": "VN",
  "loc": "21.0333,105.8500"
}
```
Như vậy là đã có thông tin về thành phố của người dùng việc còn lại ta sẽ xử lý logic code sao cho hợp lý là được. Mình sẽ viết loadLocation function để get dữ liệu về:
```
loadLocation = () => {
  let url = 'https://ipinfo.io/geo';
  axios.get(url)
  .then(response => {
    doSomething(response.data.city)
  })
  .catch(error => {
    console.error(error);
  })
}
```

Sau khi đã có thông tin về thành phố hiện tại, ta sẽ viết lại một chút phần get giá trị thời tiết của thành phố như sau:
```
requestAPI = (cityName) => {
  if (cities.find(city => city.name === cityName) !== undefined) {
    let key = process.env.REACT_APP_ACCUWEATHER_KEY;
    let locationId = cities.find(city => city.name === cityName).locationId;
    let url = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/'
      + locationId + '?apikey=' + key + '&language=vi&details=true&metric=true';
    axios.get(url)
    .then(response => {
      this.setState({
        arrWeather: response.data.DailyForecasts
      });
    })
    .catch(error => {
      console.error(error);
    })
  }
}
```

Cuối cùng trong function loadCurrentWeather sẽ chỉ còn chứa logic để kiểm tra tính chính xác của thành phố
```
this.state.value === '' || (cities.find(city => city.name === this.state.value) === undefined) ? this.loadLocation() : this.requestAPI(this.state.value)
```

### Cải thiện giao diện
Phần này mình sẽ cải thiện lại giao diện cho phần hiển thị thông tin thời tiết của ngày hiện tại(cung cấp thêm thông tin: khả năng mưa, gió, hướng gió). Trong phần index.jsx
```
this.state.arrWeather.map((weather, index) => {
  if (index === 0) {
    return (<TodayItem weather={weather} key={index} location={this.state.value}/>)
  } else {
    return (<WeatherItem weather={weather} key={index}/>)
  }
})
```

Việc tiếp theo ta sẽ tạo một component mới là todayItem.jsx. Đến bước này thì các bạn có thể thoaỉ mái thiết kế theo ý tưởng của mình. Ví dụ
![](https://images.viblo.asia/2486841f-3aaa-4add-8878-b9508defd228.png)
Các bạn có thể tham khảo giao diện của mình ở link github phía dưới
### Deploy
Vẫn như mọi khi mình sẽ thực hiện depoly ứng dụng
```
$ heroku login
 ▸    heroku-cli: update available from 6.13.5-5be2d1f to 6.16.18-871efae
Enter your Heroku credentials:
Email: your_email@gmail.com
Password: *********
```
Trước khi đẩy code ta sẽ kiểm tra remote đã có chưa bằng cậu lệnh `git remote -v` . Nếu chưa có remote thì phải thêm remote bằng câu lệnh sau: `git remote add heroku https://github.com/user/repo.git`
Tiếp theo ta sẽ thực hiện đẩy code lên bằng lệnh sau:
```
// check out sang nhánh mới để thực hiện nhé
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
remote:        Done: 49.7M
remote: -----> Launching...
remote:        Released v6
remote:        https://weather-app-2018.herokuapp.com/ deployed to Heroku
remote: 
remote: Verifying deploy... done.
To https://git.heroku.com/weather-app-2018.git
 * [new branch]      HEAD -> master
```
Để chạy trang web gõ `heroku open`

Và đây là kết quả mình đã xây dựng được: https://weather-app-2018.herokuapp.com/
### Conclusion
Cảm ơn bạn đã đọc bài viết của mình, hệ thống mình xây dựng trong có vẻ phức tạp hơn 1 chút rồi, sắp tới mình sẽ nghĩ thêm một số chức năng nâng cao hơn để thêm vào hoặc các bạn có ý tưởng gì cũng có thể đóng góp cho mình. 

Đây là source code của mình phát triển: https://github.com/duongpham910/weather_app_react. Hẹn gặp bạn vào phần tiếp theo
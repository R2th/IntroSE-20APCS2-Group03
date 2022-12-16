Chào các bạn, hôm nay mình sẽ giới thiệu cho các bạn một ứng dụng nho nhỏ bằng React đó là weather app ( xem điều kiện thời tiết theo địa điểm) . Cá nhân mình thấy ứng dụng này cũng bao hàm kha khá các kiến thức cơ bản của React nên sẽ giúp cho những người mới học React, hay chưa biết gì về React dễ hiểu hơn. (Hồi mới đầu học React mình cũng tập làm cái app này :laughing:).
Bài viết hướng tới đối tượng là những người mới học React nên trong khi thực hành mình sẽ đá qua một số thành phần cơ bản nha.

Thôi không dài dòng nữa, cùng bắt tay vào làm nào:
## Điều kiện tiên quyết
1. Điều kiện duy nhất app cần đó là phiên bản React 16 hoặc lớn hơn, bởi code có sử dụng arrow function bên trong react component
1. npm > 5.2 thì càng tốt, không có cũng không sao.
## Tạo 1 app React
Có nhiều cách để tạo mới một app React, bạn có thể google tìm hiểu thêm , nhưng cá nhân mình thường sử dụng command line cho tiện .:smile:
Mở terminal lên và lần lượt gõ các lệnh sau: 
```
npx create-react-app weather-app
cd weather-app
npm start
```
Lưu ý npx được sử dụng với npm phiên bản 5.2 hoặc > hơn, nếu phiên bản npm của bạn là 5.1 hoặc thấp hơn có thể tạo mới project bằng cách chạy lệnh :
```
npm install -g weather-app

create-react-app weather-app
```
 ## App component
Trong ReactJS, mỗi đoạn code sẽ được phân chia thành những Component không lệ thuộc lẫn nhau và có thể tái sử dụng khi cần thiết.
Cụ thể trong weather app của chúng ta sẽ chia làm 3 component, đó là :
1.  Titles Component : Hiển thị tiêu đề , một số miêu tả nhỏ cho app ( phần này mình làm màu thôi, chứ không có cần thiết. :sweat_smile::joy:)
2.  Form Component: HIển thị form cho người dùng nhập địa điểm, thành phố cần xem
3.  Weather Component: Hiển thị kết quả thời tiết trả về sau khi người dùng nhập địa điểm

Sau khi tạo mới 1 React app, chỉnh sửa cấu trúc thư mục như sau:

![](https://images.viblo.asia/bb4b85ff-fb49-4bac-b23f-de9ee0e12d6e.png)

Trong đó :
`components` là thư mục chứa các component mình vừa liệt kê ở trên nè

`img` là thư mục chứa cái ảnh background

`titles.js`
![](https://images.viblo.asia/54d5c07b-4370-4abb-a190-d7bbe0724388.png)

`form.js`

![](https://images.viblo.asia/29b0e1bf-f09c-4b77-8eac-73b7a6270817.png)

`App.js`

![](https://images.viblo.asia/0549b289-2b24-4880-8de7-070535d14b30.png)


## ReactDOM
ReactDOM là một thư viện độc lập dùng để render các React components ra DOM. Nếu bạn mở file index.js sẽ thấy chúng ta đang render App component sử dụng ReactDOM.

method ReactDOM.render() nhận 2 tham số, tham số đầu tiên là component cần render, và tham số thứ 2 là html element (id, class...)  cần render tới. 
```
ReactDOM.render(<App />, document.getElementById('root'));
```

Ở đây ta render component `App` vào element có `id` là `root` trong file `index.html` bên trong thư mục public.

Bây giờ component App đã được render, import các component title và form rồi run `npm start` nào:

![](https://images.viblo.asia/cc07d852-cb90-4069-994b-0299e360a6c2.png)

##  Gọi API
Tiếp theo, chúng ta sẽ gọi đến một API để get dữ liệu cho app của chúng ta.
Có nhiều API với bộ data lớn được cập nhật thường xuyên giúp ta có thể lấy được dữ liệu thời tiết như `metaweather, openweathermap...`, trong bài này mình sẽ sử dụng OpenWeatherMap.
Rất đơn giản, bạn chỉ cần truy cập vào [openweathermap.org/api](https://openweathermap.org/api) , đăng nhập, tạo 1 api keys và tạo một const trong `App.js` là có thể gọi tới API rồi :
Hoặc bạn có thể sử dụng key của mình : `const Api_Key = "8d2de98e089f1c28e1a22fc19a24ef04";` :sweat_smile:


Set giá trị default cho state đã nào: 
```
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
```
ở đây là mình đã biết trước API sẽ trả về những gì, và mình cần get những thông tin gì ra rồi, nếu bạn chưa biết API sẽ trả về gì thì console.log response hoặc dùng Postman kiểm tra response để tạo biến state cho phù hợp nhé. :v: 
Tiếp theo là công đoạn call API, tạo một hàm getWeather() và dùng async/await để việc lấy kết quả trả về đỡ phức tạp hơn nhé:
```
getWeather = async (e) => {

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();   
    try {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
      const response = await api_call.json();
      console.log(response)
      if (city && country) {
        this.setState({
          temperature: response.main.temp,
          city: response.name,
          country: response.sys.country,
          humidity: response.main.humidity,
          description: response.weather[0].description,
          error: ""
        })
      } else {
        this.setState({
          error: "Please fill all fields..."
        })
      }
    } catch (error) {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Can not find out this city..."
      })
    }
  }
```
Trong đó 2 biến city và country  lưu trữ giá trị người dùng nhập thành phố và đất nước. Ta sẽ dùng 2 thông tin này để gửi lên API thông qua url. 
```
 const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
 const response = await api_call.json();
```
Phần này call API và lấy giá trị trả về gán vào ` const response`
Còn lại là phần xử lí error , và thay đổi state để hiển thị lỗi( nếu xảy ra) hoặc hiển thị thông tin.

Đến đoạn này cũng đã gần xong rồi. :roll_eyes:
Sau khi có method getWeather(), ta cần biết khi gọi hàm này khi nào đúng không. Đầu tiên ta cần pass qua component Form, và gọi nó khi submit form thông qua props: 

`App.js`
```
<Form loadWeather={this.getWeather} />
```

`form.js`

```
<form onSubmit = {this.props.loadWeather}>
    <input type="text" name="city" placeholder="City..."/>
    <input type="text" name="country" placeholder="Country..."/>
    <button>Get Weather</button>
</form>
```
À tí quên, ta cần import component weather để hiển thị thông tin sau khi call API nữa chứ. :sweat_smile:

`App.js`

```
<Form loadWeather={this.getWeather} />
      <Weather
        temperature={this.state.temperature}
        city={this.state.city}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error}
      />
```

và `weather.js`

```
import React from "react";

class Weather extends React.Component{

    render(){

        return(

            <div className="weather-info">
                {
                    this.props.country && this.props.city && <p className="weather__key">Location: 
                        <span className="weather__value">  {this.props.city}, {this.props.country}</span>                    
                    </p> 
                }
                {
                    this.props.temperature && <p className="weather__key">Temperature: 
                        <span className="weather__value">  {this.props.temperature}</span>
                    </p>
                }
                {
                    this.props.humidity && <p className="weather__key">Humidity: 
                        <span className="weather__value">  {this.props.humidity}</span>
                    </p>
                }
                {
                    this.props.description && <p className="weather__key">Condition:  
                        <span className="weather__value">  {this.props.description}</span>
                    </p>
                }
                {
                    this.props.error && <p className="weather__error">{this.props.error}</p>
                }
            </div>
        )
    }
}

export default Weather;
```
Ta được:
![](https://images.viblo.asia/d93fc20b-2da0-4031-b49c-ebb92682c22e.png)

Cũng tạm xong rồi đó, giờ là công đoạn cuối cùng là makeup lại em nó 1 chút thôi. =))

![](https://images.viblo.asia/34e8f1a3-bcd4-460d-85db-885885af988e.png)

Mọi người có thể clone code tại đây : [github](https://github.com/tuanphamle112/weather-app)
## Kết luận
Trên đây mình đã giới thiệu cho các bạn cách tạo một weather app căn bản, mong rằng sau bài viết các bạn có thể hiểu rõ hơn về React. 
Bài viết là tổng hợp kiến thức của mình cũng như tham khảo một số website khác, nếu có thiếu sót mong mọi người góp ý. Chin cảm ơn và hẹn gặp lại trong những bài viết sau. :smile:
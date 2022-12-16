Gần đây, tôi có tìm hiểu về thư viện maps như google maps và một số open maps thì biết được MapBox và thấy được việc phát triển ứng dụng với bản đồ, áp dụng thực tế thực sự rất thú vị. Vậy nên mọi người có hứng thú hãy cùng tôi tìm hiểu thêm chút kiến thức về [**MapBox**](https://www.mapbox.com/) nhé. Let's go...
## MapBox là gì?
**Mapbox** là nhà cung cấp bản đồ trực tuyến cho các trang web và ứng dụng như Foursquare, Lonely Planet, Facebook, Financial Times, Weather Channel và Snapchat tại Mỹ. Tuy có một số hạn chế hơn so với dịch vụ được cung cấp bởi các nhà cung cấp bản đồ như Google Maps. Ở bài viết này chúng ta sẽ cùng nhau tìm hiểu thư viện JavaScript Mapbox GL-JS của Mapbox nhé.

![](https://images.viblo.asia/54258196-d018-48f2-ad55-c2d1111991fd.png)
## Mapbox GL JS
Đây là thư viện mã nguồn mở được phát triển bởi Mapbox. Thuư viện có hỗ các các kiểu bản đồ cho đường phố, ngoài trời, vệ tinh, chế độ ánh sáng và chế độ tối. Nó là tùy biến và các tài liệu được viết rất dễ hiểu và chi tiết.

Chúng ta sẽ bắt đầu tìm hiểu với tạo một ứng dụng React và bắt đầu truy xuất dữ liệu bằng cách thiết lập API với Mapbox. 

Đầu tiên chúng ta truy cập [mapbox.com](https://www.mapbox.com/), tạo một tài khoản và tạo mã Token cho API của mình.

![](https://images.viblo.asia/a8a47569-97ab-4ffb-b7ff-2be2c118570d.png)

## Cài đặt ứng dụng React với MapGL
Sử dụng command line: 

1. Cài đặt ứng dụng React `npx create-react-app mapbox`.
2. Di chuyển thư mục React App `mapbox` và cài đặt thư viện Mapbox GL JS cho ứng dụng `npm install react-map-gl`.
3. Chạy `npm start` thử xem ứng dụng của bạn đã hoạt động chưa nhé. 
### Cài đặt hiển thị
#### Thiết lập App.js như sau:
Chèn thư viện ReactMapGL: `import ReactMapGL from 'react-map-gl';`.
```JS
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactMapGL from 'react-map-gl';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-content">
          <ReactMapGL mapboxApiAccessToken="Your access token key!">
          </ReactMapGL>
        </div>
      </div>
    );
  }
}
```

Tiếp theo, chúng ta sẽ thiết lập các thông số như: kinh độ, vĩ độ, kích thước bản đồ, mức độ thu phóng. Chúng ta sẽ set state trong `App.js` như sau:
```JS
state = {
  viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 42.430472,
      longitude: -123.334102,
      zoom: 16
    }
};
```
ReactMapGL sử dụng `viewport` để thiết lập giá trị và styles trên map. Chúng ta có thể thêm `mapStyle` vào ReactMapGL component.

```JS
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactMapGL from 'react-map-gl';

export default class App extends Component {
  state = {
      viewport: {
          width: "100vw",
          height: "100vh",
          latitude: 21.0244246,
          longitude: 105.7938072,
          zoom: 16
      }
  };

  render() {
    return (
      <div className="App">
        <div className="App-content">
          <ReactMapGL {...this.state.viewport} mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken="Your access token key!">
          </ReactMapGL>
        </div>
      </div>
    );
  }
}
```
Quay lại ứng dụng của mình, chúng ta sẽ thấy được vị trí bản đồ mà chúng ta đã thiết lập ở trên. Tôi đã thiết lập cho ứng dụng của mình vị trí Lankmark 72. Cùng xem kết quả:

![](https://images.viblo.asia/2a082b89-fd20-4930-b190-be330bcc9f46.png)


### Tương tác với Map
Chúng ta sẽ nhận thấy rằng tại thời điểm này, ứng dụng chưa thể điều hướng được bản đồ và thực chất nó chỉ như một bức ảnh. Baya giờ, chúng ta sẽ thêm một callback function `onViewPortChange` để có thể thực hiện những tương tác cơ bản trên ReactMapGL.

```JS
<ReactMapGL {...this.state.viewport} mapStyle="mapbox://styles/mapbox/streets-v11"
    onViewportChange={(viewport => this.setState(viewport))}
    mapboxApiAccessToken="Your access token key!">
</ReactMapGL>
```
Việc tiếp theo của chúng ta là bắt các sự kiện và thiết lập lại các state latitudes, longitudes, and zoom bất cứ khi nào người dùng tương tác với map.

### Kết luận
Như vậy, chúng ta đã xây dựng được một ứng dụng cơ bản có thể tương tác với bản đồ sử dụng thư viện MapboxGL JS. Cảm ơn các bạn đã theo dõi bài viết này tôi sẽ đi sâu hơn vào phần mở rộng Mapbox trong những seri sau. 

Tham khảo thêm tại:
> https://docs.mapbox.com/mapbox-gl-js/
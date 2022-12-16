Chào mọi người , mình là Hiếu đây. Rất vui được quay lại để viết tiếp một bài viết về ReactJs với chủ đề tích hợp api google map vào reactjs. Ngay và luôn chúng ta cùng đi vào bài viết nào.
![](https://images.viblo.asia/5afa52df-a40c-4fee-829d-557d85f5e06b.jpg)

# 1. Mở đầu: 
Chắc hẳn các bạn đã từng nhìn thấy những bản đồ của google được tích hợp vào các ứng dụng IOT như theo dõi thiết bị thông minh, giám sát hành trình xe như Uber, Grab... Nhìn chúng thì có vẻ như là khó nhưng khi tìm hiểu dần dần thì cũng không có gì là khó cả. Google map đã cung cấp cho chúng ta API phục vụ tùy chỉnh, tích hợp vào ứng dụng của chúng ta một cách khá dễ dàng. Từ đó chúng ta có thể thực hiện các công việc như đánh dấu địa chỉ cửa hàng, theo dõi giám sát hay xem chỉ đường ngay trên ứng dụng mà không cần phải đi tới trang chính thức của google map. Google map cũng cấp api cho hầu hết các thiết bị như adnroid, ios, embed api hay trên website với Maps Javascript API. Các bạn có thể tham khảo ngay ở đây : https://developers.google.com/maps/documentation. Đối với javascript thuần mọi người có thể thực hiện ngay theo hướng dẫn tại trang chủ. Còn ngày hôm nay, mình sẽ giới thiệu một package giúp tích hợp google map api vào ReactJS đấy chính là
**react google maps** .
# 2. Cài đặt: 
Mình đã có một project được khởi tạo sẵn với ```npx create-react-app```. Nếu ai muốn tìm hiểu thêm hay đọc lại về ReactJs thì mọi người hãy xem ở đây: 
Tương tự với các package khác sử dụng npm. Chúng ta có thể cài đặt react-google-maps bằng cách sử dụng câu lệnh 
```bash
$ npm i --save react-google-maps
```
hoặc 
```bash
$ yarn add react-google-maps
```

Tiếp theo chúng ta sẽ tạo một component hay 1 instance cho Map. Mình sẽ tạo folder components và thêm file Map.js như sau:
```jsx
import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps"

const Map = () => {
  return (
    <div>
      <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));

```

Ở đây chúng ta thấy bắt buộc phải có hai HOC là withScriptjs và withGoogleMap thì bản đồ của chúng ta mới chạy được nhé.

các prop mình truyền vào GoogleMap bao gồm :

- defaultZoom: độ phóng to ban đầu của map, số càng lớn thì độ phóng sẽ càng gần
- defaultCenter: Mặc định điểm giữa ban đầu của map nằm ở đâu. Bạn có thể tùy chọn tọa độ khi lần đầu tiên mở bản đồ với cặp tọa độ bao gồm : lat và lng. 
> Với mọi người chưa từng biết tới lat và lng là gì thì mình giới thiệu qua về 2 tham số này.  Với mỗi vị trí trên bản đồ tương ứng chúng ta sẽ có một cặp tọa độ bao gồm kinh độ là Longitude và vĩ độ là Latitude tương ứng với lat và lng. Google map sẽ xác định chính xác cho chúng ta tọa độ thông qua việc truyền vào cặp tọa độ này. 



Tiếp theo ở file App.js chúng ta sẽ thêm component này vào : 

```jsx
import './App.css';
import Map from './components/Map'
function App() {
  const key = 'yourKey'

  return (
    <div className="App">
          <header>
            Map Demo
          </header>
          <Map 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
    </div>
  );
}

export default App;
```

Ở đây chúng ta cần tạo một API Key trên
https://console.cloud.google.com/google/maps-apis/api-list?project=master-gecko-318603 và kích hoạt Maps Javasript APi . Chúng ta cũng sẽ thêm một vài props vào đây : 

- googleMapURL: url của google map , nhớ thêm key đã được thiết lập thì mới chạy được nhé.
- loadingElement: chèn thêm hiệu ứng loading trước khi load xong map.
- containerElement, mapElement : là div chứa map. 

Kết quả ta sẽ được như thế này: 
![image.png](https://images.viblo.asia/ea9d8787-0429-4fe5-95ac-44415d6f9b86.png)
# 3. Một số công dụng cơ bản: 
### Marker:
Marker sẽ đánh dấu một vị trí lên bản đồ dựa theo lat, lng cho trước. để sử dụng marker chúng ta sử dụng component Marker của react-google-maps. dưới đây mình sẽ tạo một marker cũng như cho defaultCenter vào Hà nội. 

```jsx
import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps"

const Map = () => {
  return (
    <div>
      <GoogleMap
          defaultZoom={15}
          defaultCenter={{ lat: 21.027763, lng: 105.834160 }}
        >
         <Marker
              icon={{
                url: 'https://insulationpads.co.uk/wp-content/uploads/2017/10/Home.png',
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              position={{ lat: 21.027763, lng: 105.834160 }}
          />
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));

```

Phía trên mình tùy chỉnh marker có icon là 1 file ảnh. kích thướng scale của marker và quan trọng nhất là position của marker. Kết quả ở phía dưới đây.

![image.png](https://images.viblo.asia/3d303769-93ab-4399-9e1e-f9123af0eacb.png)

### InfoBox: 
Infobox là một hộp thoại chú thích cho marker . để thêm infobox chúng ta sử dụng : 
```jsx
import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'

const options = { closeBoxURL: '', enableEventPropagation: true };

const Map = () => {
  return (
    <div>
      <GoogleMap
          defaultZoom={15}
          defaultCenter={{ lat: 21.027763, lng: 105.834160 }}
        >
          <Marker
              icon={{
                url: 'https://insulationpads.co.uk/wp-content/uploads/2017/10/Home.png',
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              position={{ lat: 21.027763, lng: 105.834160 }}
          >
                  
            <InfoBox
              options={options}
            >
              <>
                <div style={{ backgroundColor: 'green', color: 'white', borderRadius:'1em', padding: '0.2em' }}>
                  someone's house
                </div>
              </>
            </InfoBox>  
                    
          </Marker>
        
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));

```

Vì đặt InfoBox trong Marker vì vậy chúng ta không cần truyền props position cho InfoBox. InfoBox tự nhận tọa độ từ Marker. hình ảnh như dưới: 
![image.png](https://images.viblo.asia/d5fa8659-fd34-49b8-8dfa-5180621b9367.png)

 
### Polyline:

Polyline là đường thẳng nối các điểm của Marker lại với nhau. Thường để theo dõi đường đi hay khoảng cách của các điểm. Để sử dụng Polyline chúng ta cần 2 vị trí trở lên. 
```jsx
import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker, Polyline } from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'

const options = { closeBoxURL: '', enableEventPropagation: true };

const optionsPolyline = {
  strokeColor: 'red',
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: '#085daa',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1
};

const positions = [{
  lat: 21.027763, lng: 105.834160, label: "position 1"
}, {
  lat: 21.027763, lng: 106, label: "position 2"
}, {
  lat: 21.127763, lng: 106.1, label: "position 3"
}]

const Map = () => {
  return (
    <div>
      <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: 21.027763, lng: 106 }}
        >
          {
            positions && positions.map((position, index) => 
              <Marker
                position={new window.google.maps.LatLng(position)}
              >
                      
                <InfoBox
                  options={options}
                >
                  <>
                    <div style={{ backgroundColor: 'green', color: 'white', borderRadius:'1em', padding: '0.2em' }}>
                      {position.label}
                    </div>
                  </>
                </InfoBox>  
                        
              </Marker>
            )
          }
          <Polyline
            path={positions}
            options={optionsPolyline}
          />
        
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));

```

Kết quả : 

![image.png](https://images.viblo.asia/dec8e763-bc34-4494-99b0-794f662bc97c.png)

### Polygon:

Polygon cũng tương tự Polyline tuy nhiên chúng ta sẽ có các đường nối khép kín.
Thử thay Polyline bằng Polygon nhé: 

```jsx
<Polygon
    path={positions}
    options={optionsPolyline}
/>
```


![image.png](https://images.viblo.asia/fd1b4226-6d16-4058-8cde-6d8f3d6341d7.png)

Polygon giúp chúng ta khoanh vùng dựa trên 3 điểm trở lên.

Ngoài ra còn rất nhiều tính năng khác mọi người nếu có hứng thú hãy vào trang document chính thức của thư viện này: https://tomchentw.github.io/react-google-maps để tìm hiểu thêm nhé. Chúng ta có thể tùy chính theo ý mình như realtime tọa độ của một thiết bị nào đấy. hay tùy chọn handle khi click vào Marker. Có rất nhiều thứ hay ho từ Api google map của google. 

# 3. Kết luận: 
Bài hôm nay mình đã giới thiệu , cài đặt cũng như thực hiện một số tính năng cơ bản của react-google-maps. Với google map api, có một số tính năng chúng ta cần phải trả phí để sử dụng nó vì vậy bạn hãy chắc chắn rằng đã trả phí hoặc kích hoạt tính năng thì mới có thể sử dụng được nhé. Bài viết này hi vọng sẽ giúp ích phần nào cho mọi nguời khi tiếp cận với api của google map. Cảm ơn mọi người đã theo dõi bài viết. Hẹn gặp lại vào những bài tiếp theo.
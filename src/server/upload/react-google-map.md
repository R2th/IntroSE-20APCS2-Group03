Google map  là một nền tảng bản đồ số free khá là xịn sò của anh google mà ai trong số chúng ta  ai cũng đã nghe qua. Trên web cũng như trên mobile tất cả đều có các thư viện support chúng ta cài google map một cách dễ dàng.

Trong dự án mình cũng có một bản đồ số google, hiển thị dữ liệu Multiple points dưới dạng các marker trên bản đồ. Chính yêu cầu đó mình có cơ hội làm việc với anh google map

Cái tên được mình sử dụng chính là là package [React google map](https://github.com/tomchentw/react-google-maps)

Nếu dự án nào đang cần dùng google thì React google map api là cái tên sáng giá cho sự lựa chọn này. Vì sao thế, chúng ta đi phân tích 1 số tính năng của hắn nhé.

React google maps, được cộng đồng đánh giá mức start đang là 4.2k một con số ấn tượng
1. Hỗ hỗ trợ hiện thị marker theo point, multiple points.
1. Hiện thị được line dạng polygon, polyline, rectangle.
1. Hỗ trợ hiển thị dự liệu định dạng KmlLayer, BicyclingLayer, TrafficLayer, TransitLayer, GroundOverlay.
1.  Hỗ trợ autocomplete search, standard search box.
1. Cấu hình khá là đơn giản, các component có doc clear dễ dùng.


**Cài đặt rất dễ dàng bằng câu lệnh**
```
npm install --save @react-google-maps/api
or
yarn add @react-google-maps/api
```

**Cách dùng và cấu hình**

Có 2 components yêu cầu bắt buộc khi dùng là **GoogleMap**, **LoadScript**

**LoadScript**: là component liên quan đến việc add api-key lúc load map, nếu như api-key không load đúng thì google sẽ không cho hiển thị bản đồ nữa. Nên các bạn chú ý vấn đề này

**GoogleMap**: là component điều khiển các vấn đề liên quan đến map, 

*Click*: Các event handle click, drag, drop map.

*Mount*: Mount event mount move, mount out, mouse over 

*Center*: Là cái required để ông google map định vị được vị trí cần hịện thị

*Zoom*: Để set default xem mức độ zoom ở mức độ nào 

*onZoomChanged*: Trigger mỗi khi map zoom

Đây là một ví dụ đơn giản để cấu hình google map

```
import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

class MyComponents extends Component {
  render() {
     return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey="YOUR_API_KEY"
        {...other props}
      >
        <GoogleMap
	       zoom={8}
           center={{ lat: -34.397, lng: 150.644 }}
           {...other props }
        >
          <Marker position={{ lat: -34.397, lng: 150.644 }} />
        </GoogleMap>
      </LoadScript>
     )
  }
}
```
Nếu chúng ta hiện thị các point, hay multiple points thì có component **Marker**, 
Các line thì có component **Polyline**, **Polygon**, **Rectangle**.

Tất cả các component hầu hết đều có các event handle click, mount drag,drop, over  và link api chúng ta có thể tham khảo [tại đây](https://react-google-maps-api-docs.netlify.com/#section-getting-started)

Về search thì chúng ta có thể search theo address hoặc searh theo lat,long kết hợp kiểu `${coordinate.lat},${coordinate.lng}` và trả về 10 kết quả đầu tiên.

Hi vọng bài viết giúp mọi người có cái nhìn tổng quan chức năng của [React google map](https://github.com/tomchentw/react-google-maps). Tiết kiệm thời gian cho các bạn trong vấn đề tìm giải pháp cho hiện thị google map trên các dự án đang sử dụng reactjs.
## Giới thiệu
   Khi bạn làm các dự án kể cả outsourcing hay product thì việc gặp phải yêu cầu làm bản đồ các vùng miền của các nước, hay một vùng miền nào đó cũng không phải hiếm. Vậy nên hôm nay mình muốn giới thiệu các bạn 1 dependence gọn nhẹ, hỗ trợ hiệu quả việc này bằng công nghệ SVG đó là react-simple-maps.

 
 react-simple-maps: RSM là gì?
     Nó là 1 dependence hỗ trợ việc tạo bản đồ svg có thể tương tác qua d3-Geo và topojson bằng cách sử dụng api khai báo (declarative api).
 RSM còn xử lý các task liên quan đến panning, zooming, tối ưu hoá quá trình render. Bạn có thể tham khảo thêm chi tiết ở trang này nhé: https://www.npmjs.com/package/react-simple-maps 

## Ví Dụ
Để hiểu hơn về việc RSM dùng làm gì và hỗ trợ những gì, hôm nay mình sử dụng nó để vẽ bản đồ Việt Nam đơn giản nhé:

Khỏi tạo project:
`create-react-app vn-simple-map`

Sau đó mình cài thêm dependence này vào nhé: 
`npm i react-simple-maps`

Đây là cấu trúc thư mục của mình với component App (file index.js trong folder App) là nơi mình thực hiện vẽ bản đồ đất liền nước ta:
![](https://images.viblo.asia/2f952f0c-2e41-4267-893d-97b1cbd46dbc.png)

Trước khi bắt đầu vào implement RSM, ta tải bản đồ Việt Nam trước đã, bản đồ này là topoJSON file là tập hợp toạ độ các cạnh cho phép chúng ta tạo bản đồ.
* Vào trang web https://gadm.org/download_country_v3.html
* Chọn nước Việt Nam mình rồi click vô Shapefile để download file toạ độ:
![](https://images.viblo.asia/6a56b76a-e880-43fb-a145-04b09e0694b3.png)
* Giải nén file mình vừa tải về
* Vào trang http://mapshaper.org/ để convert file vừa tải sang dạng topoJSON
Lưu ý: bạn chọn file có đuôi là .shp để convert. Ở đây mình dùng file gadm36_VNM_1.shp
![](https://images.viblo.asia/180f6022-c792-4b77-a510-4746e2b54d70.png)

* Ở trang http://mapshaper.org/ mình export sang file topoJSON và để nó vào thư mục geo_data trong project. Đây chính là file chứa toạ độ các đỉnh để vẽ nên bản đồ nước ta.
![](https://images.viblo.asia/a2779dc1-fee8-4e50-8cd5-90f9e4457d77.png)

Bắt đầu dùng RSM:
    Tại component App mình sẽ import các gói **ComposableMap**, **Geographies**, **Geography**, **ZoomableGroup**
*     ComposableMap là wrapper component cho mỗi bản đồ để set các configs, styles như chiều rộng chiều cao khung bản đồ…
*     Geographies  là Component để fetch tìm nạp ví trí địa lý và chuyển đổi chúng thành Geojson. đây chính là nơi mình truyền toạ độ các điểm của bản đồ Việt Nam.
*     Geography là component render các toạ độ thành các đường svg
*     ZoomableGroup là component hỗ trợ việc zoom bản đồ

Đây là caomponent App:
```
import React, { Component } from 'react';
import vnTopo from '../../geo_data/topoJSON.json'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

class App extends Component {
  render() {
    return (
      <ComposableMap
        projectionConfig={{ scale: 1800 }}
        width={980}
        height={700}
        style={{
          width: '100%',
          height: 'auto',
        }}
      >
        <ZoomableGroup center={[104, 17]}>
          <Geographies geography={vnTopo}>
            {({ geographies }) => {
              return geographies.map(
                (geography, i) =>
                  geography.id !== 'ATA' && (
                    <Geography
                      key={i}
                      geography={geography}
                      style={{
                        default: {
                          fill: '#808080',
                          stroke: '#212529',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        hover: {
                          fill: '#e6dfd9',
                          stroke: '#212529',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                      }}
                    />
                  ),
              )
            }
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    );
  }
}

export default App;

```

Và đây là kết quả: 
![](https://images.viblo.asia/a538d49f-32e1-460e-885d-a2e48acaf87a.png)

## Kết luận và tài liệu tham khảo:
* Kết luận: Mình sẽ cải thiến bản đồ này trong phần sau cho nó có tính tương tác nhiều hơn, hiện tại nó chỉ có chức năng hover và chuyển màu.
* Tài liệu tham khảo: 
   https://www.react-simple-maps.io/docs/zoomable-group/
   https://www.react-simple-maps.io/docs/zoomable-group/
   https://medium.com/@augustgiles8/rendering-the-us-with-react-simple-maps-2e31fe7d49d
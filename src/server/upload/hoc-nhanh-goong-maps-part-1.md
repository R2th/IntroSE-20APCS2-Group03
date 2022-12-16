Nếu bạn đã đọc [**bài viết này**](https://viblo.asia/p/minh-da-biet-den-goong-maps-nhu-the-nao-aWj53oPe56m), thì sẽ nhận ra Goong Maps cung cấp đến **100 javascript front end** 😵. Chính vì vậy, việc ngồi đọc hết phần docs là điều vô cùng khó khăn. Để giúp các bạn mới bắt đầu tìm hiểu về Maps API mình đã tổng hợp những kiến thức cốt lõi và thường dùng nhất về Goong Maps API (được ứng dụng trong các use-case).

Ngoài ra, để việc học có thể đi đôi với hành, nhanh chóng làm chủ Goong Maps API mình đã có **một bài viết tại đây** (*mình sẽ viết trong thời gian tới*), các bạn có thể kết hợp thực hành để hiểu hơn phần lý thuyết nhé.

# Khởi tạo API Key trên Goong Maps

Nếu bạn lần đầu tiên sử dụng Goong Maps hoặc đang cân nhắc sử dụng Google Maps API cho dự án của mình thì, bạn có thể tham khảo bài viết **Mình đã biết đến Goong Maps như thế nào?** và [**Hướng dẫn chuyển đổi Google Maps API sang Goong Maps API**](https://viblo.asia/p/huong-dan-chuyen-doi-google-maps-api-sang-goong-maps-api-1Je5E60mKnL) để có thể đưa ra quyết định lựa chọn. Cùng với đó là để được hướng dẫn chi tiết về cách khởi tạo Goong Maps API Key.

# Tổng quan về Goong JS API
Tổng quan về Goong JS API bạn có thể chia mọi kiến thức vào 4 nhánh chính đó là:

* **Map:** với các Instance (thao tác với Map) như : addControl, addSource, addLayer,...
* **Marker & Control:** Bao gồm marker (điểm đánh dấu), các Control như: Navigation, Geolocate,...
* **Events:** Sự kiện “lớn”
* **Style specification:** Các kiến thức riêng biệt

# Map
## Object: Map
Trong Goong Maps thì Map là một object quan trọng nhất để hiển thị bản đồ trên website của bạn với các thuộc tính tùy chỉnh. Và đóng vai trò như một container chứa và khởi tạo các Map Control, Map Events,...

Trong Object Map, chúng ta cần quan tâm đến một số thuộc tính thường dùng sau:

| Thuộc tính                                                                                                                                                                                                                                                                                                                                  | Giải thích                                                                                                                                                                             |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options.container<br><br>**Giá trị truyền vào:** HTML Element hoặc string là id của HTML Element                                                                                                                                                                                                                                                | Đây là thuộc tính quan trọng nhất, xác định phần tử HTML sẽ được Goong GL JS khởi tạo Map.<br><br>**Lưu ý:** thẻ HTML khởi tạo Map không được chứa các thẻ con                                 |
| options.style<br><br>Bạn có thể lựa chọn một trong các style sau:<br>https://tiles.goong.io/assets/goong_light_v2.json<br>https://tiles.goong.io/assets/goong_map_web.json<br>https://tiles.goong.io/assets/goong_map_dark.json<br>https://tiles.goong.io/assets/navigation_day.json<br>https://tiles.goong.io/assets/navigation_night.json | Goong Maps cung cấp các style khác nhau thông qua các URL JSON. <br><br>Xem thử các style khác nhau trên Map tại đây: https://docs.goong.io/example/setstyle/                              |
| options.center<br><br>**Giá trị truyền vào:** [kinh độ, vĩ độ]<br>**Giá trị mặc định:** [0, 0]                                                                                                                                                                                                                                                      | Đây là thuộc tính giúp bạn xác định điểm trung tâm khi khởi tạo bản đồ. <br><br>**Lưu ý:** Goong Maps sử dụng cặp giá trị [kinh độ, vĩ độ] (có đôi chút trái ngược với một số API về Map khác) |
| options.zoom<br><br>**Giá trị truyền vào:** Số nguyên<br>**Giá trị mặc định:** 0                                                                                                                                                                                                                                                                    | Thuộc tính này sẽ giúp bạn thiết lập mức độ zoom của bản đồ.                                                                                                                           |

Code demo:
```
var map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json', // stylesheet location
      center: [108.212, 16.068], // starting position [lng, lat]
      zoom: 5 // starting zoom
    });
```


## Instance Members: addControl
> Để thêm các control vào Object Map
 
**Cú pháp:** `addControl(IControl, position*)`

**Lưu ý** về ý nghĩa cách viết giải thích của mình: **<tên thuộc tính> (kiểu dữ liệu truyền vào) (ghi chú)**

**Giải thích**
* **IControl:** control bạn muốn thêm vào Object map
* **position (string) *(tham số không bắt buộc)*:** Nhận giá trị là một string chỉ vị trí mà IControl sẽ hiển thị trên Map. Các giá trị mà position có thể nhận: *'top-left' , 'top-right' , 'bottom-left' , 'bottom-right'* - **Giá trị mặc định:** 'top-right'

`Ex: map.addControl(zoom, 'bottom-right');`


## Instance Members: addSource
> Thêm nguồn dữ liệu/tài nguyên vào bản đồ

**Cú pháp:** `addSource(id, source)`

* **id (string):** Mã id được đặt cho nguồn dữ liệu/tài nguyên mà bạn sẽ thêm vào
* **source (Object):** Nguồn dữ liệu/tài nguyên bạn thêm vào có thể ở dạng một object hoặc một URL.

Code demo:
```
map.addSource('my-data', {
  type: 'vector',
  url: 'mapbox://myusername.tilesetid'
});
```


## Instance Members: addLayer
> Thêm vào map một Layer để thiết lập style cho source 

**Cú pháp:** `addLayer(layer, beforeId)`

* **layer ((Object | CustomLayerInterface)):** Style của layer được thêm vào.
* **beforeId (string) (tham số không bắt buộc):** Được sử dụng để phân lớp layer (lớp nào ở trên và lớp nào ở dưới)

Code demo:
```
// Add a circle layer with a vector source.
map.addLayer({
  id: 'points-of-interest',
  source: {
    type: 'vector',
    url: 'mapbox://mapbox.mapbox-streets-v8'
  },
  'source-layer': 'poi_label',
  type: 'circle',
  paint: {
    // Mapbox Style Specification paint properties
  },
  layout: {
    // Mapbox Style Specification layout properties
  }
});
```
## Instance Members: getSource
> Trả về nguồn có ID được chỉ định theo kiểu của bản đồ.


## Instance Members: queryRenderedFeatures
Trả về một mảng các đối tượng **GeoJSON Feature objects** đại diện cho các đối tượng có thể nhìn thấy thỏa mãn các tham số truy vấn

**Cú pháp:** `queryRenderedFeatures(geometry, options)`

* **geometry(`(PointLike | Array <PointLike>)`)**:   Thiết lập hình dạng cho vùng truy vấn: Một điểm đơn lẻ hoặc cặp điểm theo hướng [tây nam, đông bắc] mô tả một không gian giới hạn. Nếu bạn bỏ qua tham số này (tức là gọi *queryRenderedFeatures* không có đối số hoặc chỉ có đối số tùy chọn) thi sẽ tương đương với việc chọn một không gian toàn bản đồ
* options(Object?): Có các giá trị sau:

| Thuộc tính                                              | Giải thích                                                                                                                                                                              |
|---------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options.layers<br><br>**Giá trị truyền vào:** Array<string> | Một mảng các style layer IDs để truy vấn kiểm tra. (Chỉ các tính năng trong các lớp này sẽ được trả về) <br><br>Nếu bỏ qua tham số này, tất cả các lớp sẽ được kiểm tra.                |
| options.filter<br><br>**Giá trị truyền vào:** Array         | Giới hạn kết quả tìm được từ mỗi truy vấn                                                                                                                                               |
| options.validateboolean<br><br>**Giá trị mặc định:** true   | Kiểm tra xem `[options.filter]` có tuân theo Mapbox GL Style Specification hay không. <br><br>Để tối ưu hóa hiệu xuất bạn có thể tắt chức năng này. Hãy sử dụng nó khi thực sự cần thiết. |

## Instance Members: getCanvas
> Trả về cho map thuộc tính `<canvas>`

Bạn có thể đọc thêm về [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)

# Controls
## NavigationControl
> **NavigationControl** là một control giúp map của bạn có thêm chức năng zoom và một la bàn định hướng bản đồ.


Các thuộc tính thường dùng trong Navigation Control là:

| Thuộc tính                                                                       | Giải thích                                                                                    |
|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| options.showCompass<br><br>**Giá trị truyền vào:** Boolean<br>**Giá trị mặc định:** true | Nếu giá trị truyền vào là `true`, nút la bàn sẽ hiển thị                                        |
| options.showZoom<br><br>**Giá trị truyền vào:** Boolean<br>**Giá trị mặc định:** true    | Nếu giá trị truyền vào là `true`, chức năng zoom với 2 nút phóng to và thu nhỏ sẽ được hiển thị |

## GeolocateControl
> **GeolocateControl** cung cấp một nút sử dụng API định vị địa lý của trình duyệt để xác định vị trí của người dùng trên bản đồ.


**Lưu ý:** GeolocateControl chỉ hiển thị trên các trình duyệt hỗ trợ định vị vị trí địa lý và trang web phải được truy cập với giao thức HTTPS. 

| Thuộc tính                                                                               | Giải thích                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options.positionOptions<br><br>**Giá trị mặc định:** {enableHighAccuracy:false,timeout:6000} | API định vị vị trí PositionOptions                                                                                                                                                                                                                                                                                                                                                                                                                                |
| options.trackUserLocation<br><br>**Giá trị mặc định:** false                                 | Nếu nhận giá trị `false`. Goong sẽ xác định vị trí của người dùng một lần duy nhất<br><br>Nếu nhận giá trị `true` Thông tin về vị trí địa lý của người dùng sẽ được cập nhật liên tục với 3 chế độ thiết lập<br><br>* **active** - khung hình bản đồ tự động dịch chuyển khi vị trí của người dùng thay đổi, giữ cho điểm đánh dấu vị trí người dùng luôn ở trung tâm.<br>* **passive** - Chỉ có điểm đánh dấu vị trí người dùng di chuyển, còn khung hình bản đồ giữ nguyên.<br>disabled |
| options.showUserLocation<br><br>**Giá trị mặc định:** true                                   | Nếu giá trị là `true`, một dấu chấm sẽ được hiển thị trên bản đồ tại vị trí của người dùng.                                                                                                                                                                                                                                                                                                                                                                         |

Code demo:
```
var getLocal = new goongjs.GeolocateControl(
      {
        positionOptions: {
          enableHighAccuracy:false,
          timeout:6000
        },
        trackUserLocation: false,
        showUserLocation: true
      })
```
# Events
## Evented: On
Evented này có tác dụng lắng nghe sự kiện được chỉ định.

**Cú pháp 1:** `on(type, listener)`

* **type (string)** Kiểu event của Map hoặc Controls được lắng nghe. Nhận một trong các giá trị sau:  *'mousedown' , 'mouseup' , 'click' , 'dblclick' , 'mousemove' , 'mouseenter' , 'mouseleave' , 'mouseover' , 'mouseout' , 'contextmenu' , 'touchstart' , 'touchend' , 'touchcancel'*
* **listener (Function)** Hàm sẽ thực thi khi kiểu event của Map hoặc Controls xảy ra.

**Cú pháp 2:** `on(type, layerID, listener)`

Ở cú pháp 2 này có thêm tham số layerID. Điều này có nghĩa chỉ thực thi khi sự kiện diễn ra trên layer có ID được truyền vào tham số layerID..
## Map event: load
Được kích hoạt ngay lập tức sau khi tất cả các tài nguyên cần thiết đã được load và hiển thị bản đồ lần đầu hoàn tất.
# STYLE SPECIFICATION
## Sources

> Để xác định cụ thể nguồn dữ liệu hoặc tài nguyên sử dụng, bạn cần sử dụng thuộc tính type

### Giới thiệu về GeoJSON

Dành cho những bạn chưa thao tác với dữ liệu trên bản đồ thì GeoJSON là một dạng cấu trúc dữ liệu địa lý, dựa trên JavaScript Object Notation (JSON). Nó thể hiện chức năng địa lý, thuộc tính và dữ liệu hình học. GeoJSON sử dụng hệ tọa độ địa lý *World Geodetic System 1984 (WGS84)* và đơn vị độ thập phân.

Về cấu trúc sẽ gồm **3 thuộc tính chính, đó là type, geometry, properties.** Trong đó:
* **type:** kiểu dữ liệu của file GeoJSON này. Gồm các loại sau:
    * **Feature:** Chỉ 1 đối tượng địa lý.
    * **FeatureCollection:** Tập hợp nhiều đối tượng địa lý.
* **geometry:** toạ độ của đối tượng. Gồm các loại sau:
    * **Point:** Một điểm. Thường được dùng việc hiển thị marker.
    * **LineString:** Một đường thẳng.
    * **MultiLineString:** Tập hợp nhiều đường thẳng.
    * **Polygon:** Một đa giác.
    * **MultiPolygon:** Tập hợp nhiều đa giác.
    * **GeometryCollection:** Tập hợp nhiều loại hình học khác nhau.
* **properties:** danh sách thuộc tính của đối tượng.

![image.png](https://images.viblo.asia/9a241780-6ac5-40b0-bf0e-484fe884db99.png)

### geojson trong Goong Maps
Để bắt đầu sử dụng geojson, bạn hãy đặt giá trị cho thuộc tính type như sau: 

`type: 'geojson'`

Tiếp theo là dữ liệu geojson cần phải được đặt trong thuộc tính data. Giá trị mà thuộc tính này nhận có thể là một URL hoặc một object dạng GeoJSON.

```
"geojson-marker": {
    "type": "geojson",
    "data": {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-77.0323, 38.9131]
        },
        "properties": {
            "title": "Mapbox DC",
            "marker-symbol": "monument"
        }
    }
}
```


## Layers
Các thuộc tính của layers như sau:

| Thuộc tính                                                                | Giải thích                                                                                                                                                        |
|---------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id<br><br>*Giá trị bắt buộc - Nhận định dạng string*                        | ID được gán cho layer                                                                                                                                             |
| type<br><br>*Giá trị bắt buộc - Nhận định dạng string*                      | Là một trong các kiểu layer sau: *"fill", "line", "symbol", "circle", "heatmap", "fill-extrusion", "raster", "hillshade", "background".*                            |
| source<br><br>**Bắt buộc đối với mọi layer.** Ngoại trừ layer kiểu `background` | ID source được sử dụng cho layer                                                                                                                                  |
| filter<br><br>*Giá trị tùy chọn - Nhận một expression.*                     | Một biểu thức xác định các điều kiện lọc trên Sources. (Để hiểu hơn hãy đọc Expression ở mục dưới)                                                                |
| paint<br><br>*Giá trị tùy chọn - Nhận định dạng paint*                      | Thuộc tính có tác dụng vẽ layer lên map                                                                                                                           |
| layout                                                                    | Tại đây có một số thuộc tính quen thuộc:<br>`'text-field': '{point_count_abbreviated}',`<br>          `'text-font': ['Roboto Regular'],`<br>         ` 'text-size': 12` |

### Circle
Khi vẽ hình tròn trên map, bạn cần quan tâm đến một số thuộc tính của hình tròn như sau:

| Thuộc tính                                                                                                                                                          | Giải thích                                |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------|
| circle-color<br><br>*Giá trị tùy chọn - Nhận vào một mã màu*<br>**Giá trị mặc định:** "#000000"<br><br>**Hỗ trợ sử dụng trong expression loại:** *feature-state* và *interpolate* | Đổ màu cho hình tròn                      |
| circle-radius<br><br>*Giá trị tùy chọn - Nhận vào một số nguyên (lớn hơn hoặc bằng 0)*<br>**Giá trị mặc định:** 5<br>**Đơn vị:** px                                           | Bán kính hình tròn                        |
| circle-stroke-width<br><br>*Giá trị tùy chọn - Nhận vào một số nguyên (lớn hơn hoặc bằng 0)*<br>**Giá trị mặc định:** 0<br>**Đơn vị:** px                                     | Thiết lập độ dày cho đường viền hình tròn |
| circle-stroke-color<br><br>*Giá trị tùy chọn - Nhận vào một mã màu*<br>**Giá trị mặc định:** "#000000"                                                                    | Thiết lập màu cho đường viền hình tròn    |


## Expression

**Cú pháp:**` [expression_name, argument_0, argument_1, ...]`

* **Expression_name** là một trong các giá trị sau: *get, has, id, geometry-type, properties, step, feature-state*
* **argument_0, argument_1, …:** là các đối số

**Lưu ý:** *feature-state* chỉ hoạt động trong tham số paint của Layers

### get
> **Trả về giá trị** của một thuộc tính trong các đối tượng được cung cấp thông qua các đối số. 
> **Trả về null** nếu không tìm thấy thuộc tính trong các đối số.

`['get', 'point_count']`

### has

> Kiểm tra có tồn tại một thuộc tính trong các đối tượng được cung cấp thông qua các đối số. 

`['has', 'point_count']`

### step
> Tạo ra một chuỗi các input và output rời rạc

```
["step",
    input: number,
    stop_output_0: OutputType,
    stop_input_1: number, stop_output_1: OutputType,
    stop_input_n: number, stop_output_n: OutputType, ...
]: OutputType
```

* **input** có thể là bất cứ một biểu thức numeric nào.

Mình sẽ lấy một ví dụ giúp các bạn hiểu dễ hơn: Giả sử, mình có một bộ dữ liệu về số lượng nhà hàng theo từng tỉnh thành. Và mình muốn hiển thị một hình tròn kèm theo số tổng số nhà hàng tại mỗi tỉnh đó.

Để trực quan hơn mình muốn các tỉnh có số lượng nhà hàng theo nhóm ít, nhiều, cực nhiều sẽ có màu sắc khác nhau. Chẳng hạn:
* **Hiển thị màu xanh** với những tỉnh có số lượng nhà hàng **ít hơn 100**
* **Hiển thị màu vàng** với những tỉnh có số lượng nhà hàng **từ 100 -> 750**
* **Hiển thị màu đỏ** với những tỉnh có số lượng nhà hàng **trên 750**

Lúc này step sẽ có tác dụng và code sẽ trông như sau
```
'circle-color': [
            'step',
            ['get', 'point_count'], //input
            '#51bbd6', 
            100,  '#f1f075', 
            750,  '#f28cb1'
          ],
```

### Toán tử !
> Toán tử logic. Trả về `true` nếu nhận vào giá trị `false` và ngược lại.

## Cluster

Để có thể gom các markers hoặc điểm thành một cụm bạn có thể tạo một cluster với Goong Maps. Nó sẽ trông giống như sau:

![image.png](https://images.viblo.asia/0d4d1cfa-a5b2-4004-a29a-4ff2af11d885.png)

Để có thể thiết lập được chế độ cluster bạn phải có một Source dạng GeoJSon. Khi thiết lập geojson bạn cần thêm một số thuộc tính sau:

| Thuộc tính                                                                 | Giải thích                                                                                                                                                               |
|----------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| cluster<br><br>**Giá trị truyền vào:** Boolean<br>**Giá trị mặc định:** false      | Nếu giá trị truyền vào là `true`, cluster sẽ được kích hoạt. <br><br>**Đặc biệt lưu ý:** Khi này, GL-JS sẽ tự động thêm một thuộc tính là: point_count vào source data của bạn |
| clusterMaxZoom<br><br>**Giá trị truyền vào:** Số nguyên                        | Độ zoom tối đa tới một điểm trong cluster                                                                                                                                |
| clusterRadius<br><br>**Giá trị truyền vào:** Số nguyên<br>**Giá trị mặc định:** 50 | Bán kính của cluster khi hiển thị các điểm                                                                                                                               |


Code demo:
```
map.addSource('earthquakes', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: 'https://docs.goong.io/assets/earthquakes.geojson',
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });
```
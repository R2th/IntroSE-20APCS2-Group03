Học một một framework mới, hay cách sử dụng API mới để ứng dụng trong dự án luôn là một những yêu cầu đối với lập trình viên trong quá trình phát triển sản phẩm để đáp ứng nhu cầu mà công ty hay khách hàng đề ra. Và sẽ thật nhàm chán để hiểu được cách sử dụng và cách khai thác các tính năng của một API mới toanh chỉ bằng cách đọc document dài cả trăm trang và xem “vài” tấm hình minh họa.

Hiểu được vấn đề đó, bài viết này sẽ được thực hiện với tinh thần hướng dẫn bạn khai thác hiệu quả các tính năng của Goong Maps API từ use-case thực tế, thay cho việc bạn dành ra đến vài tuần để đọc hiểu document khô khan. 

Và như lời hứa của [**bài viết kỳ trước**](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6) mình sẽ cùng bạn phân tích xem SoSmap đã ứng dụng Maps như thế nào nhé!

# Để đọc bài viết hiệu quả
Nếu bạn đã có kinh nghiệm và kiến thức với Google Maps API thì các bạn có thể đọc luôn các mục bài viết này. 

Tuy nhiên nếu bạn là người mới bắt đầu hoặc lần đầu sử dụng Maps API thì tại mỗi Task đều có các kiến thức cần biết để có thể hiểu và thực hành được task đó. Việc của bạn là click vào đường dẫn và đọc hiểu phần mục đó (docs giản lược). Sau khi hoàn thành các phần mục kiến thức cần biết, bạn có thể quay lại để đọc tiếp task đó.

# Phân tích SOSmap
Sơ qua về SOSmap, thì đây là một ứng dụng kết nối và san sẻ khó khăn mùa dịch. Với hai phần chính: người cho và người cần nhận. Người dân có hoàn cảnh khó khăn và đang cần hỗ trợ nhu yếu phẩm có thể vào SOSmap điền các thông tin cần hỗ trợ. Thông tin sẽ được xác minh và hiển thị trên bản đồ cứu trợ. Các đội nhóm của SOSmap sẽ liên hệ hoặc kết nối với các tổ chức hỗ trợ người khó khăn.

Để phục vụ cho việc các bạn tìm hiểu Maps API, mình sẽ chỉ phân tích và thực hiện các task cần sử dụng đến Goong Maps API.

![](https://images.viblo.asia/be8b3bdb-e768-466f-894d-290cab6fe25d.png)


1. Khởi tạo Map toàn màn hình với vị trí trung tâm bản đồ là Đà Nẵng, thiết lập độ zoom vừa phải để nhìn thấy toàn bộ Việt Nam trên bản đồ.
2. Thêm chức năng zoom với 2 button phóng to và thu nhỏ ở góc dưới bên phải màn hình ở vị trí góc dưới bên phải
3. Thêm button có khả năng xác định vị trí hiện tại của người dùng ở vị trí góc dưới bên phải.
4. Tạo các cluster (các điểm gom nhóm điểm dữ liệu nhỏ). Hiển thị tại các vị trí địa lí tương ứng với GeoJSON đã load vào bản đồ.
# Task 1
> Khởi tạo Map toàn màn hình với vị trí trung tâm bản đồ là Đà Nẵng, thiết lập độ zoom vừa phải để nhìn thấy toàn bộ Việt Nam trên bản đồ.

Đầu tiên bạn cần thêm, Goong Map vào website bằng cách chèn một CDN JavaScript và CSS vào thẻ `<head>` của file HTML
```
<script src='https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js'></script>
<link href='https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css' rel='stylesheet' />
```
    
Để thực hiện task này, bạn cần phải phải hiểu về:
* [Object Map](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_object-map-3)

Trong phần `<body>` bạn có thể khởi tạo bản đồ như sau:

```
<!-- Tạo một thẻ div gán id = ‘map’ là phần tử chứa bản đồ khởi tạo  -->
<div id='map'></div> 
  <script>
  goongjs.accessToken = 'Maptiles_Key_(Loại_2)';
  var map = new goongjs.Map({
      container: 'map', //Khởi tạo Map tại phần tử HTML có giá trị id là map
      style: 'https://tiles.goong.io/assets/goong_map_web.json', // Style cho Map
      center: [108.212, 16.068], // Lấy [Kinh độ, Vị độ] của Đà Nẵng làm vị trí trung tâm khi bản đồ khởi tạo
      zoom: 9 // Độ zoom phù hợp giúp nhìn thấy toàn bộ Việt Nam
  });
  </script>
```

Để bản đồ hiển thị toàn màn hình, bạn nên thêm một chút CSS

```
body { margin: 0; padding: 0; }
#map { position: absolute; top: 0; bottom: 0; width: 100%; }
```

Và đây là kết quả sau khi hoàn thành task 1

![](https://images.viblo.asia/322a6f8b-c9dd-40dc-8ed9-7241fa42bfc8.png)

# Task 2+3
    
> Thêm chức năng zoom với 2 button phóng to và thu nhỏ ở góc dưới bên phải màn hình ở vị trí góc dưới bên phải

> Thêm button có khả năng xác định vị trí hiện tại của người dùng ở vị trí góc dưới bên phải.


Để thực hiện task này, bạn cần phải phải hiểu về:
* [Instance Members: addControl](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_instance-members-addcontrol-4)
* [NavigationControl](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_navigationcontrol-11)
* [GeolocateControl](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_geolocatecontrol-12)

## Khởi tạo NavigationControl
```
var zoom = new goongjs.NavigationControl(
  {
    showCompass: false, // Ẩn button la bàn
  });
```

## Khởi tạo GeolocateControl
```
var getLocal = new goongjs.GeolocateControl(
  {
    positionOptions: {
      enableHighAccuracy: true, // Bật chế độ định vị với độ chính xác cao
    },
    trackUserLocation: false,
    showUserLocation: true
  })
```

Thực hiện thêm 2 control vào map bằng **Instance Members: addControl**
```
map.addControl(getLocal, 'bottom-right');
map.addControl(zoom, 'bottom-right');
```
Sau khi hoàn thành task 2+3 bạn sẽ thu được kết quả dưới đây:
![](https://images.viblo.asia/d2ea164e-2441-4ceb-9bfc-0455672a37d9.png)

# Task 4
> Tạo các cluster (các điểm gom nhóm điểm dữ liệu nhỏ). Hiển thị tại các vị trí địa lí tương ứng với GeoJSON đã load vào bản đồ.

Để thực hiện task này, bạn cần phải phải hiểu về:
* [GeoJSON là gì](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_gioi-thieu-ve-geojson-18)
* Sources: GeoJSON
* [Evented: On](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_evented-on-14)
* [Map event: load](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_map-event-load-15)
* [addSource](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_instance-members-addsource-5)
* [addLayer](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_instance-members-addlayer-6)
* [getSource](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_instance-members-getsource-7)
* getRenderFeatures
* getClusterExpansionZoom
* [getCanvas](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_instance-members-getcanvas-9)
* [Layers: Circle](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_circle-21)
* [Expression: get,has, step, toán tử !](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_expression-22)
* [Cluster](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_cluster-27)

Trước khi bắt đầu task này, bạn cần thêm một **Evented: On** và sẽ viết các dòng code tiếp theo vào vị trí mà mình đặt comment.

```
map.on('load', function () {
// Code task 4
});
```

## Mini task 4.1: Thêm source data GeoJSON. 
Đặt thuộc tính `'cluster' = true` (Khi đó, GL-JS sẽ tự động thêm một thuộc tính là: `point_count` vào source data của bạn)

```
// Add a new source from our GeoJSON data and
// set the 'cluster' option to true. 
GL-JS will add the point_count property to your source data.
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

## Mini task 4.2: Thêm layer để vẽ vòng tròn cluster

```
map.addLayer({
        id: 'clusters',
        type: 'circle', //circle, point, custom
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.goong.io/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100, '#f1f075',
            750, '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100, 30,
            750, 40
          ]
        }
      });
```

## Mini task 4.3: Thêm số đếm cho cluster
```
map.addLayer({
        id: 'cluster-count', // Create id
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['Roboto Regular'],
          'text-size': 12
        }
      });
```

## Mini task 4.4: Thiết lập điểm tròn cho một điểm duy nhất (không tạo thành cluster)

```
map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']], // type express Decision
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });
```

## Mini task 4.5: Truy cập vào một cụm (cluster) để xem dữ liệu chi tiết hơn

```
// inspect a cluster on click
      map.on('click', 'clusters', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('earthquakes').getClusterExpansionZoom(
          clusterId,
          function (err, zoom) {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          }
        );
      });
```


## Mini task 4.6: Hiển thị popup khi ấn vào một điểm dữ liệu. Và đảm bảo sự chính xác của vị trí popup hiển thị khi zoom to/nhỏ bản đồ

```
map.on('click', 'unclustered-point', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var mag = e.features[0].properties.mag;
        var tsunami;
        if (e.features[0].properties.tsunami === 1) {
          tsunami = 'yes';
        } else {
          tsunami = 'no';
        }

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new goongjs.Popup()
          .setLngLat(coordinates)
          .setHTML(
            'magnitude: ' + mag + '<br>Was there a tsunami?: ' + tsunami
          )
          .addTo(map);
      });
```

## Mini task 4.7: Thiết lập con trỏ khi di chuột lên cluster

```
map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
      });
map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
      });
```

Và đây là toàn bộ source code

{@embed: https://jsfiddle.net/pvtd264/8fx4smpy/1/embed/html,css/dark/}
    
# Kết
Hy vọng rằng, với cách tiếp cận mới này, bạn sẽ có thể nhanh chóng làm chủ và ứng dụng Goong Maps hiệu quả trong những dự án liên quan đến bản đồ số.
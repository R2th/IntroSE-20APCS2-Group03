Chào mừng bạn đến với Tutorial 2 về chủ đề tạo bản đồ nhiệt với Goong Maps. Nếu bạn đã có kinh nghiệm và kiến thức với Google Maps API thì các bạn có thể đọc vào nội dung của tutorial
Tuy nhiên, nếu bạn là người mới bắt đầu hoặc lần đầu sử dụng Maps API thì tại mỗi Task đều có các kiến thức cần biết để có thể hiểu và thực hành được task đó. Việc của bạn là click vào đường dẫn và đọc hiểu phần mục đó (docs giản lược). Sau khi hoàn thành các phần mục kiến thức cần biết, bạn có thể quay lại để đọc tiếp task đó.

# Task 1: Khởi tạo bản đồ
Đầu tiên bạn cần thêm, Goong Map vào website bằng cách chèn một CDN JavaScript và CSS vào thẻ `<head>` của file HTML
    
```
<script src='https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js'></script>
<link href='https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css' rel='stylesheet' />
```

**Để thực hiện task này, bạn cần phải phải hiểu về:**
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
      center: [108.212, 16.068], // Lấy [Kinh độ, Vị độ] của vị trí trung tâm khi bản đồ khởi tạo
      zoom: 9 // Thiết lập độ zoom phù hợp
  });
  </script>
```

Để bản đồ hiển thị toàn màn hình, bạn nên thêm một chút CSS

```
body { margin: 0; padding: 0; }
#map { position: absolute; top: 0; bottom: 0; width: 100%; }
```

Trước khi bắt đầu các task tiếp theo, bạn cần thêm một Evented: On và sẽ viết các dòng code tiếp theo vào vị trí mà mình đặt comment.

```
map.on('load', function () {
// Code task 2 - 4
});
```

# Task 2: Thêm source data GeoJSON. 
**Để thực hiện task này, bạn cần phải phải hiểu về:**
* [GeoJSON là gì](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_sources-17)
* [Sources: GeoJSON](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_sources-17)
* [addSource](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_instance-members-addsource-5)

Ở đây mình sẽ sử dụng file GeoJSON ghi lại lịch sử dữ liệu động đất làm demo.

```
map.addSource('earthquakes', {
'type': 'geojson',
'data': 'https://docs.goong.io/assets/earthquakes.geojson'
});
```

# Task 3: Thêm layer tạo bản đồ nhiệt
**Để thực hiện task này, bạn cần phải phải hiểu về:**
* [Các thuộc tính của layer](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_layers-20)
* [addLayer](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_instance-members-addlayer-6)
* [getSource](https://viblo.asia/p/hoc-nhanh-goong-maps-part-1-Do754zY4ZM6#_instance-members-getsource-7)
* [Layers: Heatmap](https://viblo.asia/p/hoc-nhanh-goong-maps-part-2-Ljy5V3R9Kra#_heatmap-2)
* [Expression: interpolate](https://viblo.asia/p/hoc-nhanh-goong-maps-part-2-Ljy5V3R9Kra#_expression-3)

```
map.addLayer(
{
'id': 'earthquakes-heat',
'type': 'heatmap',
'source': 'earthquakes',
'maxzoom': 9,
'paint': {
// Increase the heatmap weight based on frequency and property magnitude
'heatmap-weight': [
'interpolate',
['linear'],
['get', 'mag'],
0,
0,
6,
1
],
// Increase the heatmap color weight weight by zoom level
// heatmap-intensity is a multiplier on top of heatmap-weight
'heatmap-intensity': [
'interpolate',
['linear'],
['zoom'],
0,
1,
9,
3
],
// Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
// Begin color ramp at 0-stop with a 0-transparancy color
// to create a blur-like effect.
'heatmap-color': [
'interpolate',
['linear'],
['heatmap-density'],
0,
'rgba(33,102,172,0)',
0.2,
'rgb(103,169,207)',
0.4,
'rgb(209,229,240)',
0.6,
'rgb(253,219,199)',
0.8,
'rgb(239,138,98)',
1,
'rgb(178,24,43)'
],
// Adjust the heatmap radius by zoom level
'heatmap-radius': [
'interpolate',
['linear'],
['zoom'],
0,
2,
9,
20
],
// Transition from heatmap to circle layer by zoom level
'heatmap-opacity': [
'interpolate',
['linear'],
['zoom'],
7,
1,
9,
0
]
}
},
'water'
);
```

**Một số điểm lưu ý:**
* Bạn cần thiết lập type của layer là heatmap: `'type': 'heatmap'`,
* Các thuộc tính của Heatmap như: `‘heatmap-weight', 'heatmap-intensity', 'heatmap-color', 'heatmap-radius', 'heatmap-opacity'`: Nên sử dụng **expression interpolate**
* Hãy nhớ lại một chút về Cú pháp của addLayer trong “Học nhanh Goong Maps - Part 1”: `addSource(layer, beforeId)`
    * Trong đó, `beforeId (string)` (tham số không bắt buộc) Được sử dụng để phân lớp layer (lớp nào ở trên và lớp nào ở dưới)
    * Và nếu bạn để ý kĩ thì sẽ thấy khối lệnh trên có cấu trúc `map.addLayer( {...}, 'water');`
    * Như vậy, khi này ta có sử dụng `beforeId = ‘water’`. Đoạn code này có tác dụng giúp Goong Maps hiểu rằng, layer chúng ta đang khởi tạo sẽ nằm trên layer `‘water’`của bản đồ khởi tạo.
# Task 4: Thêm layer đánh dấu chính xác vị trí điểm xảy ra động đất bằng 1 điểm
```
map.addLayer(
{
'id': 'earthquakes-point',
'type': 'circle',
'source': 'earthquakes',
'minzoom': 7,
'paint': {
// Size circle radius by earthquake magnitude and zoom level
'circle-radius': [
'interpolate',
['linear'],
['zoom'],
7,
['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
16,
['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
],
// Color circle by earthquake magnitude
'circle-color': [
'interpolate',
['linear'],
['get', 'mag'],
1,
'rgba(33,102,172,0)',
2,
'rgb(103,169,207)',
3,
'rgb(209,229,240)',
4,
'rgb(253,219,199)',
5,
'rgb(239,138,98)',
6,
'rgb(178,24,43)'
],
'circle-stroke-color': 'white',
'circle-stroke-width': 1,
// Transition from heatmap to circle layer by zoom level
'circle-opacity': [
'interpolate',
['linear'],
['zoom'],
7,
0,
8,
1
]
}
},
'water'
);
```

Ở phần này, các bạn cần lưu ý các điểm mình đã note ở task 3 và quan tâm thêm một vấn đề là ở đoạn code: 

```
'circle-radius': [
'interpolate',
['linear'],
['zoom'],
7,
['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
16,
['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
],
```
Có sử dụng interpolate lồng nhau


-----


Dưới đây là code và demo. Chúc các bạn thành công!
{@embed: https://jsfiddle.net/pvtd264/s93cyr2f/1/embed/js,html,result/dark/}
# Kết
Hy vọng rằng, với tutorial này, bạn sẽ có thể nhanh chóng làm chủ và ứng dụng Goong Maps hiệu quả trong những dự án liên quan đến bản đồ số.
# Google Maps API bị chặn ở Việt Nam và giải pháp nào?
Theo thông báo từ Google Cloud Platform, ***Việt Nam nằm trong danh sách những vùng bị chặn***, và không thể sử dụng các tính năng của Google Maps Platform ([Thông báo gốc tại đây](https://cloud.google.com/maps-platform/terms/maps-prohibited-territories/)). Với việc bị chặn này, rất nhiều dự án sử dụng Google Maps API tại Việt Nam đã bị ảnh hưởng, kể cả những site lớn như: VPbank, Coffee house, Cộng coffee, vnpost, kidplaza. tpbank….vvvv

![image.png](https://images.viblo.asia/e60dda56-4705-4ca5-a518-18da2ca7ddff.png)

![image.png](https://images.viblo.asia/5d737c33-4d75-4eae-b555-99c48ba1f292.png)

Và thế là người người, nhà nhà nhanh chóng bắt đầu công cuộc tìm kiếm giải pháp khắc phục hoặc đi tìm một dịch vụ bản đồ số mới thay thế. Tất nhiên, mình cũng không phải là ngoại lệ :grinning:

Trước "ma trận" các dịch vụ bản đồ số như: Here map, OSM, Goong map .v.v Thì mình đã [tình cờ gặp Goong Maps](https://viblo.asia/p/minh-da-biet-den-goong-maps-nhu-the-nao-aWj53oPe56m) trước. Có thể nói đây là một sự lựa chọn không tồi. Vì :
* Hỗ trợ các APIs mình có thể sử dụng ngay mà không cần code lại như: **Tự động gợi ý (auto complete), Place detail, Geocode, Direction, Distance matrix….vv**
* Map view cũng được hỗ trợ nhưng khác biệt với Google, mình sẽ hướng dẫn trong bài sau.

# Chuyển đổi tích hợp Google Maps API sang Goong Maps API

Hiện tại mình thấy, Goong Maps API cung cấp các tính năng gồm:
* Geocode/ Reverse Geocode
* Autocomplete
* Routing
* Distance Matrix
* Map View
* Map SDK iOS
* Map SDK Android

Ngoài ra, việc tích hợp Goong Maps vào hệ thống cũng rất đơn giản, chỉ cần thay đổi `end-point-URL` và `key.` Các format gọi lên và trả về đều giống với Google Maps. Chính vì thế mà chỉ với vài thay đổi nhỏ trong mã nguồn là mình đã hoàn thành công việc chuyển đổi. 

Để giúp các bạn có nhu cầu chuyển đổi sang sử dụng Goong Maps, mình sẽ sử dụng một ví dụ về ***"Tạo bản đồ có đánh dấu điểm đơn giản"*** để các bạn có thể sử dụng ngay và luôn đối với những bạn có nhu cầu hiển thị vị trí cửa hàng/đơn vị trên bản đồ để nhúng vào website.

# Tạo bản đồ có đánh dấu điểm đơn giản với Goong Maps
## 1. Khởi tạo API Key trên Goong Maps
### Bước 1: Truy cập và đăng nhập vào hệ thống Goong Maps
![Giao diện Login của Goong Maps](https://images.viblo.asia/27155672-3af3-46de-980d-48f8a8642f82.png) 

Để bắt đầu, bạn cần truy cập vào: https://account.goong.io/login để tạo một tài khoản và đăng nhập. (Hoặc đăng nhập gián tiếp thông qua tài khoản Facebook hoặc Google.)
![image.png](https://images.viblo.asia/cabba695-84d6-4795-ae65-23c989447e91.png)

Sau khi đăng nhập thành công, bạn sẽ được đưa tới Dashboard của Goong Maps. Tin vui là mỗi tài khoản “Free” sẽ được tặng 100 USD vào tài khoản mỗi tháng. Do vậy, bạn hoàn toàn có thể triển khai các dịch vụ của Goong Maps API trên ứng dụng có quy mô nhỏ với chi phí 0 đồng. 

### Bước 2: Khởi tạo API Keys
![image.png](https://images.viblo.asia/e60d0250-82bc-4d21-b1ea-082c3ab69aa6.png)

Trước khi đi vào khởi tạo API Keys, bạn cần phải cập nhật SĐT bằng cách click vào **Ảnh đại điện** và chọn **Settings**

![image.png](https://images.viblo.asia/83f381dc-3ef3-4126-a698-f9635745e231.png)

Sau khi cập nhật SĐT, bạn chuyển đến tab **Keys** và chọn nút **Create Key**
![image.png](https://images.viblo.asia/4fa89385-6e39-48e0-8920-25dd02ce78c2.png)

Tại đây, Goong Maps cung cấp cho bạn 2 loại API Key đó là:
* **API Key (Loại 1):** sử dụng đối với các tính năng của REST APIs (Directions, Distance Matrix, Places, Geocoding, Static Map)
* **Maptiles Key (Loại 2):** sử dụng cho việc hiển thị Map view

> **Lưu ý:** Sau khi tạo xong API Key bạn vẫn có thể thay đổi loại API nhưng việc thay đổi này có thể khiến quota của bạn bị thay đổi.


> **Tips:** Để thuận tiện cho quá trình phát triển dự án, bạn nên tạo luôn cả API Key và Maptiles Key


Tại tab **Information** bạn cần điều đầy đủ thông tin vào **API Key Name** (tên API Key để giúp bạn xác định xem API Key này được dùng trong dự án nào), **Description** (Một chút mô tả về dự án) 
![image.png](https://images.viblo.asia/2af6d4d8-1cbb-44e5-9cb1-ec0c296934db.png)

Sau khi hoàn tất mọi thông tin ở tab **Information**, bạn nên chuyển sang tab **Restrictions** để thiết lập giới hạn các trang web, địa chỉ IP có thể sử dụng API Key của bạn. Mục đích là để Key của bạn không bị sử dụng trái phép, hay vượt quá giới hạn requests một cách bất thường. 
![image.png](https://images.viblo.asia/e344e250-2435-43c3-b216-93d01458b193.png)

* Nếu bạn muốn giới hạn website/IP có thể sử dụng Key thì tick chọn vào dòng HTTP referrers (websites) sau đó nhập địa chỉ website/IP cần gắn bản đồ Goong Maps.
* Nếu bạn chọn None thì API key của bạn sẽ nhận requests từ bất kỳ website/IP nào sử dụng Key trên!

Cuối cùng là ấn **Create API Key** để Goong Maps tự động tạo ra một chuỗi ngẫu nhiên cho bạn
![image.png](https://images.viblo.asia/0eb1c273-52cd-414d-850c-090aeddf0f32.png)

Vậy là bạn đã khởi tạo thành công Goong Maps API key rồi đó!

## 2. Xác định kinh độ, vĩ độ của điểm muốn đánh dấu trên bản đồ
Để có thể xác định kinh độ, vĩ độ của một vị trí bất kì mà bạn muốn. Hãy truy cập vào https://www.maps.ie/coordinates.html và nhập địa điểm cần tìm.
 
*Ví dụ:* Mình muốn lấy tọa độ của Hồ Hoàn Kiếm
![image.png](https://images.viblo.asia/c3b19fd1-3d26-4af3-ab92-c66a43732d05.png)

Ghi chú: Bạn cũng có thể xác định kinh độ và vĩ độ của một điểm thông qua [Goong Geocodeing API](https://docs.goong.io/rest/geocode/). Và tất nhiên bạn cần phải có một API Key loại 1 trước đó.

## 3. Hiển thị bản đồ
### 3.1 Đối với Website
Để thêm Goong Map vào website bạn cần chèn một **CDN JavaScript và CSS** vào thẻ `<head>` của file HTML
```
<script src='https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js'></script>
<link href='https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css' rel='stylesheet' />
```
Tiếp theo, trong thẻ `<body>` bạn cần chèn đoạn code
 
```
<div id='map' style='width: 500px; height: 300px;'></div>
<script>
goongjs.accessToken = 'your maptiles key here';
var map = new goongjs.Map({
    container: 'map',
    style: 'https://tiles.goong.io/assets/goong_map_web.json', // stylesheet location
    center: [105.85258524102564, 21.0287601], // starting position [lng, lat]
    zoom: 9 // starting zoom
});
</script>
```
Vì mình chỉ muốn hiển thị bản đồ và một điểm đánh dấu vị trí nên mình sẽ dùng **Maptiles Key (API Key loại 2)** đã khởi tạo ở mục 1. Cùng với đó là thay đổi tọa độ ở trung tâm bản đồ.

Kế đến, để thêm một điểm đánh dấu (*Marker*) bạn cần sử dụng đoạn code sau:
```
var marker = new goongjs.Marker()
  .setLngLat([105.85258524102564, 21.0287601])// position add marker [lng, lat]
  .addTo(map);
```
Hãy nhớ điền kinh độ và vĩ độ của điểm mà bạn đã xác định từ bước 2 vào nhé!

Dưới đây là code và hình ảnh demo:
{@embed: https://jsfiddle.net/pvtd264/0n3z24vg/1/embed/html,result/dark/}

![image.png](https://images.viblo.asia/3a1c16f6-467d-451b-bbee-e09e4be3b06e.png)

### 3.2 Đối với ứng dụng mobile
Nếu bạn là một nhà phát triển ứng dụng mobile thì cũng đừng lo, Goong Maps đã được phát triển với các hệ điều hành và Framework mobile khác nhau:
* iOS
* Android
* React Native
* Flutter
    
**3.2.1 Đối với iOS**
```
import Mapbox
class ViewController: UIViewController {
	override func viewDidLoad() {
		 super.viewDidLoad()
		 let url = URL(string: "https://tiles.goong.io/assets/goong_map_web.json?api_key=your_maptiles_key")
		 let mapView = MGLMapView(frame: view.bounds, styleURL: url)
		 mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
		 mapView.setCenter(CLLocationCoordinate2D(latitude: 21, longitude: 105), zoomLevel: 9, animated: false) 
		 view.addSubview(mapView) 
	}
}
```
**3.2.2 Đối với Android**
```
private var mapView: MapView? = null
override fun onCreate(savedInstanceState: Bundle?) {
  super.onCreate(savedInstanceState)
  Mapbox.getInstance(this, getString(R.string.mapbox_access_token))
  setContentView(R.layout.activity_main)
  mapView = findViewById(R.id.mapView)
  mapView?.onCreate(savedInstanceState)
  mapView?.getMapAsync { mapboxMap ->
  	mapboxMap.setStyle(Style.Builder().fromUri("https://tiles.goong.io/assets/goong_map_web.json?api_key=your_maptiles_key")) {
      // Map is set up and Goong style has loaded. Now you can add data or make other map adjustments
      	}
  }
}
```
 
Vậy là bạn đã hoàn tất quá trình khởi tạo Goong Maps. Chúc bạn chuyển đổi thành công từ Google Maps API sang Goong Maps.
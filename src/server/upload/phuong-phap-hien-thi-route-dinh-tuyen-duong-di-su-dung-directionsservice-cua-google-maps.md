![](https://images.viblo.asia/726680c3-e893-45b4-85ac-a15678de83c4.png)

Trong bài viết lần này mình sẽ chia sẻ một phương pháp hiển thị route định tuyến tự động sử dụng dịch vụ DirectionsService của Google Maps mà mình tìm hiểu được.
# Mục lục
1. DirectionsService là gì ?
2. Áp dụng
3. Tổng kết

# 1. DirectionsService là gì ?
DirectionsService là một chức năng của Google Maps cho phép tính toán các tuyến đường đi với các phương tiện giao thông khác nhau. Đối tượng này sẽ giao tiếp với Route Service của Google Maps API và Route Service này sẽ tiếp nhận request và trả về kết quả tính toán. Kết quả của Route thu được có thể được xử lý bởi chính bản thân nó hoặc có thể rendering sử dụng DirectionsRenderer Object.

# 2. Áp dụng
Ở bên HTML bạn khởi tạo một Map canvas : 
```
<div id="map_canvas" style="width:600px; height:400px"></div>
```
Sau đấy bên JS bạn sẽ xử lý như sau : 
```
let startLatLng = [35.712408, 139.776188]; // Ga Ueno
let targetLatLng = [35.710552, 139.777074]; // LIG
let goalMarkerImg = 'https://test.l-svr.net/blog/images/marker-on-dummy.png';
let map;

function initialize() {
  let options = {
    zoom: 16,
    center: new google.maps.LatLng(startLatLng[0], startLatLng[1]),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map_canvas'), options);
  let rendererOptions = {
    map: map, // Bản đồ đích
    draggable: true, //Cho phép kéo map
    preserveViewport: true 
  };
  let directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
  let directionsService = new google.maps.DirectionsService();
  directionsDisplay.setMap(map);
  let request = {
    origin: new google.maps.LatLng(startLatLng[0], startLatLng[1]), //Điểm Start
    destination: new google.maps.LatLng(targetLatLng[0], targetLatLng[1]), // Điểm Đích
    travelMode: google.maps.DirectionsTravelMode.WALKING, // Phương tiện giao thông
  };
  directionsService.route(request, function(response,status) {
    if (status === google.maps.DirectionsStatus.OK) {
      new google.maps.DirectionsRenderer({
        map: map,
        directions: response,
        suppressMarkers: true // Xóa marker default
      });
      let leg = response.routes[0].legs[0];
      makeMarker(leg.end_location, markers.goalMarker, map);
      setTimeout(function() {
        map.setZoom(16); // Thay đổi tỉ lệ zoom
      });
    }
  });
}

function makeMarker(position, icon, map) {
  let marker = new google.maps.Marker({
    position: position,
    map: map,
    icon: icon
  });
}

let markers = {
  goalMarker: new google.maps.MarkerImage(
    goalMarkerImg, //  Đường dẫn của img
    new google.maps.Size(24, 33), // width,height của marker
    new google.maps.Point(0, 0), 
    new google.maps.Point(12, 33), 
    new google.maps.Size(24, 33))
};

initialize()
```
Kết quả thu được : 
![](https://images.viblo.asia/a93bcbb1-c228-4120-a010-2564d08b9b9e.png)

## Chi tiết nội dung đoạn code
```
let rendererOptions = {
map: map, 
draggable: true,
preserveViewport: true 
};
let directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
let directionsService = new google.maps.DirectionsService();
directionsDisplay.setMap(map);
let request = {
origin: new google.maps.LatLng(startLatLng[0], startLatLng[1]), 
destination: new google.maps.LatLng(targetLatLng[0], targetLatLng[1]), 
travelMode: google.maps.DirectionsTravelMode.WALKING, 
};
directionsService.route(request, function(response,status) {
if (status === google.maps.DirectionsStatus.OK) {
new google.maps.DirectionsRenderer({
map: map,
directions: response,
suppressMarkers: true 
});
let leg = response.routes[0].legs[0];
makeMarker(leg.end_location, markers.goalMarker, map);
setTimeout(function() {
map.setZoom(16); 
});
}
});
```
Mình sẽ giải thích những phần quan trọng nhất của đoạn code này  như sau :
```
preserveViewport: true
```
Nếu tùy chọn này không được đặt thì sẽ không thể thay đổi tỷ lệ phóng to thu nhỏ của map đang hiển thị.
```
travelMode: google.maps.DirectionsTravelMode.WALKING
```
Đây là option để thiết đặt phương pháp di chuyển cho đến mục tiêu đích. Trong lần này mình thiết đặt là đi bộ.
Ngoài ra còn có nhiều thiết đặt bằng các phương tiện khác như ô tô, xe đạp ...

```
suppressMarkers: true
```
Ở đây mặc định một marker màu đỏ sẽ được tự động đặt vào nhưng để có thể xóa nó đi thì mình sẽ thiết đặt giá trị bằng true cho nó.
```
map.setZoom(16);
```
Giá trị này để thiết đặt tỷ lệ phóng của bản đồ.
Hàm này sẽ được đưa vào trong setTimeout để chạy . Tuy đây không phải là cách viết chuẩn xác nhưng nếu không xử lý bất đồng độ bằng setTimeout thì sẽ không thể nào chạy được.
# Tổng kết
Trong bài biết này mình đã chia sẻ một phương pháp hiển thị route định tuyến đường đi sử dụng DirectionsService. Hi vọng sẽ có ích cho mọi người.

Link code tham khảo:
https://codepen.io/Flowerlantern/pen/OZmWBb
![](https://images.viblo.asia/866f138f-d6e0-4149-a40a-2b7182134f8c.jpeg)
(hi), chào mọi người, hôm nay mình sẽ hướng dẫn các bạn cách sử dụng Google Map Api cho Rails App nhé. Từng bước một mà quất thôi. Để làm được việc này dĩ nhiên yêu cầu các bạn cần biết về Rails và Javascript ở mức độ cơ bản. Bắt đầu nào !
### Tạo mới 1 project để nghịch nhé
```shell
rails new gmaps-rails-example
cd gmaps-rails-example
```
tiếp theo chúng ta dùng scaffold để tạo nhanh CRUD cho Place. Nơi lưu thông tin các tọa độ mà các bạn cần dùng cho Map
```shell
rails g scaffold Place name:string latitude:decimal longitude:decimal --javascript-engine=js
```
Chúng ta tạo ra Model Place với các attributes như 
- name : Tên địa điểm
- latitude: Vĩ độ của địa điểm
- longitude: Kinh độ của địa điểm
- javascript-engine=js: còn cái này thì chúng ta chỉ là báo cho thằng Scafffold biết là mình sẽ dùng js thôi chứ ko cóa gì

Dĩ nhiên rồi, map thì phải có kinh vĩ độ.

Đến đây đã xong phần thêm sửa xóa căn bản cho các tọa độ rồi. Nếu lười tạo tay thì làm file seed vài địa điểm cho tiện
```ruby
Place.create!([
{ "name": "Buckingham Palace", "latitude": "51.501564","longitude": "-0.141944"},
{ "name": "Westminster Abbey", "latitude": "51.499581", "longitude": "-0.127309"},
{ "name": "Big Ben", "latitude": "51.500792", "longitude": "-0.124613"}
])
```
Mở file `seed.rb` ra và nhét đám này vào
```ruby
Place.create!([
{ "name": "Buckingham Palace", "latitude": "51.501564","longitude": "-0.141944"},
{ "name": "Westminster Abbey", "latitude": "51.499581", "longitude": "-0.127309"},
{ "name": "Big Ben", "latitude": "51.500792", "longitude": "-0.124613"}
])
```
Chạy migrate để tạo DB
```css
rails db:migrate db:seed
```

Mở server lên 
```shell
rails s
```
Vào link
```shell
http://localhost:3000/places
```
![](https://images.viblo.asia/705564b2-c49e-4d79-badd-c6c9c0141bc6.jpeg)
Và đây, chúng ta có 3 Places để nghịch rồi.
Tiếp đến, để sử dụng được Map theo qui định mới của GG thì chúng ta cần phải đăng ký 1 cái [API key như này](https://developers.google.com/maps/documentation/javascript/get-api-key)

> Vào đấy làm theo hướng dẫn 3 bước là chúng ta có cái Key ngon lành (lưu ý đọc kĩ các phần nó tính tiền nhé, chỉ nghịch trong phạm vi free ko thì tốn kha khá đấy, ngày trước mình nghịch ngu AWS mất vài trăm $ nên giờ cũng ái ngại chút).

Sau khi có cái key api của gmaps rồi thì vứt nó vào project để sử dụng, chỗ nào kín 1 tý để đỡ can lộ lộ. Mình thì vứt đại vào `secrets.yml`
```shell
google_maps_api_key: INSERT-YOUR-KEY-HERE
```

### Bắt đầu nghịch ngợm tý với [Google Maps Static API](https://developers.google.com/maps/documentation/maps-static/intro)

Ở cái link local ban nãy chúng ta có list các place mà chúng ta đã seed ra, tùy tiện bấm vào để "Show" 1 thằng 
![](https://images.viblo.asia/db17e1d0-f6c7-4186-9b6b-a46ce4840a4b.jpeg)

Ở đây là 2 thông tin cơ bản kinh vĩ độ của thằng Buckingham. Chưa thấy map ở đâu hết nhỉ ?

Chỉnh sửa 1 tý ở file `app/views/places/show.html.erb`

Thêm đoạn hiển thị ảnh chụp Map
```ruby
<p>
<%= image_tag "https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=400x300&center=#{@place.latitude},#{@place.longitude}&key=#{Rails.application.secret.google_maps_api_key}", alt: "Map" %>
</p>
```

Đoạn `{Rails.application.secret.google_maps_api_key}` gọi ra cái chỗ đặt Key lúc nãy nhé. 
Thêm đoạn này vào dưới cái kinh vĩ độ của bạn và chúng ta sẽ có kết quả thế này 

![](https://images.viblo.asia/ee527db3-9a11-4414-a03d-e0611655f2d6.jpeg)

Đoạn code trên chúng ta cung cấp vài thông tin như tỷ lệ zoom map là 17, kích thước file image chụp về là 400 x 300 ... mấy cái này nhìn là thấy rồi, phần này khá là dễ.

Tiếp theo nghịch cái khác hay hơn chút 

### Sử dụng [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial)

Dĩ nhiên để dùng được js thì phải khai báo nó trong `app/views/layouts/application.html.erb`

```html
<%= javascript_include_tag 'https://maps.googleapis.com/maps/api/js?key='+Rails.application.credentials.google_maps_api_key %>
<%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
```

Chèn nó vào như này là ổn rồi.
Lúc nãy chúng ta chèn 1 đoạn code để lấy cái hình ảnh tĩnh tại tọa độ mà chúng ta cung cấp, bây giờ không dùng tĩnh nữa nên remove nó đi nhé. Thay vào đó chúng ta thêm vào trong file `app/views/places/show.html.erb`


Xóa thằng này đi
```ruby
<p>
<%= image_tag "https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=400x300&center=#{@place.latitude},#{@place.longitude}&key=#{Rails.application.secret.google_maps_api_key}", alt: "Map" %>
</p>
```

thêm đoạn này 
```html
<p>
    <div id="map"></div>
</p>
```

Chỉnh xíu css cho vừa nhìn `app/assets/stylesheets/places.scss`

```css
#map {
    width: 600px;
    height: 400px;
}
```

Ở Rails 5.2 có phần Tuborlink này cũng tương đối hay, mình cũng chưa rành lắm nhưng cơ bản nó giúp load hết các js ở head ra 1 thể giảm việc load đi lại nhiều lần làm chậm web của bạn, nôm na là vậy. Nên để đảm bảo mọi thứ ok thì thêm cái này vào `app/views/layouts/application.html.erb

`
```html
...
    <%= yield(:head_tags) %>
  </head>
...
```
Rồi sau đó chúng ta chèn nhẹ chút script vào `app/views/places/show.html.erb`( cái này làm hơi ẩu nên khi rành rồi các bạn chế biến nó lại tý nhé)
```html
<% provide :head_tags do %>
    <script>
    document.addEventListener("DOMContentLoaded", function(){
        initMap(<%=@place.latitude%>, <%=@place.longitude%>)
    });
    </script>
<% end %>
```
Chèn nó lên <head> chỗ chúng ta yield ra lúc nãy 

Khi DOM load xong thì cái function initMap của chúng ta cũng sẽ hoạt động và nó sẽ gọi 2 cái params mà chúng ta truyền vào là kinh vĩ độ của địa điểm `<%=@place.latitude%>, <%=@place.longitude%>`

Tiếp theo là viết lại cái function js initMap đấy và thêm vài option mà chúng ta muốn vào. Mở file `app/assets/javascripts/places.js` và thêm vào đoạn code này.

```javascript
function initMap(lat, lng) {
    var myCoords = new google.maps.LatLng(lat, lng);
    var mapOptions = {
    center: myCoords,
    zoom: 14
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
```
Đây là mấy option cơ bản, còn khá nhiều các bạn tìm hiểu thêm nhé.

Sau khi xong, f5 lại trình duyệt phát và xem thành quả 

![](https://images.viblo.asia/80f1b0f8-0249-4154-8950-e2df6edc9c8f.jpeg)

Nó đã hiển thị được dạng map động của gg rồi đấy, cơ mà chưa thấy địa điểm của chúng ta chỗ nào. Vậy thì thêm cái dấu màu đỏ vào nhỉ ? 

```javascript
var marker = new google.maps.Marker({
    position: myCoords,
    map: map
});
```

file js ban nãy giờ sẽ đầy đủ hơn và trông như này :

```javascript
function initMap(lat, lng) {
    var myCoords = new google.maps.LatLng(lat, lng);
    var mapOptions = {
    center: myCoords,
    zoom: 14
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var marker = new google.maps.Marker({
        position: myCoords,
        map: map
    });
}
```

lại f5 phát nữa và xem kết quả

![](https://images.viblo.asia/6a721dc5-0d25-4ec5-97f4-a60e64b79008.jpeg)

đó! nó đã hiển thị cái dấu đỏ lên rồi đó :v: 

Có 1 điều, khi các bạn quay về trang index và chọn 1 place khác thì sẽ ko có map, bởi vì thằng Tuborlink này rối lắm, nó chả thèm load lại. Giờ có 2 phương án, 1 là vứt nó luôn ra ngoài, remove nó đi và xóa require ở thằng `application.js`. Xóa đi rồi mỗi lần chuyển page thì nó load lại js nên sẽ ổn cả. Phương án 2 là giữ lại Tuborlink này làm cho web mượt hơn chút thì thêm vào thẻ này ở phần <head> của file `application.html.erb`
```html
<meta name='turbolinks-visit-control' content='reload'>
```
và sửa lại ở file `app/views/places/show.html.erb`
```html
<% provide :head_tags do %>
  <meta name='turbolinks-visit-control' content='reload'>
  <script>
    document.addEventListener("DOMContentLoaded", function(){
      initMap(<%=@place.latitude%>, <%=@place.longitude%>)
    });
  </script>
<% end %>
```
Chẳng qua nó ép cho thằng Rails reload js thoy.
Bây giờ thì ổn rồi, lướt địa điểm nào cũng sẽ load map ra :v:
    
### Bonus
Nãy giờ là show với mấy tọa độ có sẵn, nhưng mà tọa độ đấy đâu ra và edit nó thế nào thì giờ mình hướng dẫn nốt 

Phần create và edit thằng scaffold này dùng chung 1 partial là `_form.html.erb`

Chúng ta thêm vào `app/views/places/_form.html.erb`
```html
<% provide :head_tags do %>
    <meta name='turbolinks-visit-control' content='reload'>
    <script>
        document.addEventListener("DOMContentLoaded", initMap2);
    </script>
<% end %>
```

Ở đây chúng ta tạo ra 1 cái map mới gọi là map2 nhé, để dùng cho create edit, vì cái này nó ko có tọa độ sẵn đâu.

Vẫn lại từng bước như lúc nãy.

Thêm cái này vào 

```html
<p>
  <div id="map2"></div>
</p>
```
định nghĩa chỗ này để hiển thị cái map2

Thêm tý css
```css
#map2 {
    width: 600px;
    height: 400px;
}
```

Viết thêm function js cho initMap2 trong `app/assets/javascripts/places.js`

```javascript
function initMap2() {
    var lat = document.getElementById('place_latitude').value;
    var lng = document.getElementById('place_longitude').value;
    
    var myCoords = new google.maps.LatLng(lat, lng);
    var mapOptions = {
    center: myCoords,
    zoom: 14
    };
    var map = new google.maps.Map(document.getElementById('map2'), mapOptions);
    var marker = new google.maps.Marker({
        position: myCoords,
        animation: google.maps.Animation.DROP,
        map: map,
        draggable: true
    });
}

```

Trong cái form của rails này nó set id mặc định cho 2 cái file nhập kinh vĩ độ là `place_latitude` và `place_longitude` chúng ta mượn nó để lấy(thay) giá trị.
Bây giờ vào trang edit hay create thì chúng ta thấy được map và mark được trên bản đồ rồi
Giờ chúng ta muốn mỗi khi chúng ta nắm thằng dấu đỏ rê trên map thì cái kinh vĩ độ nó thay đổi theo thì thêm 1 function vào trong file js

```javascript
function refreshMarker(){
    var lat = document.getElementById('place_latitude').value;
    var lng = document.getElementById('place_longitude').value;
    var myCoords = new google.maps.LatLng(lat, lng);
    marker.setPosition(myCoords);
    map.setCenter(marker.getPosition());   
}
```
sau đó cho nó update các giá trị vào 2 file của form

```javascript
document.getElementById('place_latitude').onchange = refreshMarker;
document.getElementById('place_longitude').onchange = refreshMarker
```

Khi muốn click vào map để đặt cái dấu đỏ và lấy dữ liệu thì lại thêm chút nữa

```javascript
marker.addListener('drag', function() {
    latlng = marker.getPosition();
    newlat=(Math.round(latlng.lat()*1000000))/1000000;
    newlng=(Math.round(latlng.lng()*1000000))/1000000;
    document.getElementById('place_latitude').value = newlat;
    document.getElementById('place_longitude').value = newlng;
});
```

```javascript
marker.addListener('dragend', function() {
    map.panTo(marker.getPosition());   
});
```
kết quả chúng ta có được sẽ là 
![](https://images.viblo.asia/61f56af4-0e1a-4b0b-a9f7-bd045035dd34.gif)

Có một điều bất tiện là khi tạo mới map thì cái bản đồ nó sẽ nằm ở 0,0. Quá lạ lẫm với chúng ta và chúng ta phải kéo nó đi thật xa để tìm chỗ mà mình muốn, mệt mỏi. Nên thêm chút định nghĩa để mỗi lần tạo mới chúng ta có trung tâm map nằm ở Đà Nẵng hoặc ở đâu đó mà bạn muốn
```javascript
// if not defined create default position
if (!lat || !lng){
    lat=16.072086;
    lng=108.226675;
    document.getElementById('place_latitude').value = lat;
    document.getElementById('place_longitude').value = lng;
}
```
Cái này mặc định nó mở vào tọa độ cầu Sông Hàn
Code hoàn thiện nó sẽ như sau :

```javascript
function initMap2() {
    var lat = document.getElementById('place_latitude').value;
    var lng = document.getElementById('place_longitude').value;
    
    // if not defined create default position
   if (!lat || !lng){
        lat=16.072086;
        lng=108.226675;
        document.getElementById('place_latitude').value = lat;
        document.getElementById('place_longitude').value = lng;
    }
    var myCoords = new google.maps.LatLng(lat, lng);
    var mapOptions = {
    center: myCoords,
    zoom: 14
    };
    var map = new google.maps.Map(document.getElementById('map2'), mapOptions);
    var marker = new google.maps.Marker({
        position: myCoords,
        animation: google.maps.Animation.DROP,
        map: map,
        draggable: true
    });
    // refresh marker position and recenter map on marker
    function refreshMarker(){
        var lat = document.getElementById('place_latitude').value;
        var lng = document.getElementById('place_longitude').value;
        var myCoords = new google.maps.LatLng(lat, lng);
        marker.setPosition(myCoords);
        map.setCenter(marker.getPosition());   
    }
    // when input values change call refreshMarker
    document.getElementById('place_latitude').onchange = refreshMarker;
    document.getElementById('place_longitude').onchange = refreshMarker;
    // when marker is dragged update input values
    marker.addListener('drag', function() {
        latlng = marker.getPosition();
        newlat=(Math.round(latlng.lat()*1000000))/1000000;
        newlng=(Math.round(latlng.lng()*1000000))/1000000;
        document.getElementById('place_latitude').value = newlat;
        document.getElementById('place_longitude').value = newlng;
    });
    // When drag ends, center (pan) the map on the marker position
    marker.addListener('dragend', function() {
        map.panTo(marker.getPosition());   
    });
}
```

Mọi thứ trông có vẻ ok hơn rồi. Chúc các bạn thành công và chúc một ngày tốt lành!


Bài viết này dựa trên câu chuyện của anh chàng [Paulo Belo trên Medium](https://medium.com/@pjbelo/using-google-maps-api-v3-with-rails-5-2-b066a4b2cf14)
Trong hướng dẫn này, tôi sẽ nói về cách sử dụng API Google Maps với Rails. Hãy thử một số ví dụ về việc sử dụng static API và Javascript API, cách đặt marker và cách kéo thả vị trí marker khi thay đổi giá trị input của form. Và cuối cùng là làm thế nào để cập nhật giá trị input bằng cách kéo thả marker. Thực hiện tất cả điều này mà không sử dụng bất kỳ gem nào.

Cấp độ: Dành cho người mới bắt đầu

Yêu cầu: Có kiến thức cơ bản về Rails và Javascript

# Cài đặt Rails

Yêu cầu cài phiên bản Rails 5.2 trở lên. Bạn có thể kiểm tra phiên bản rails bằng lệnh `rails -v`

Khởi tạo một ứng dụng Rails:

```
rails new gmaps-rails-example
cd gmaps-rails-example
```

Bắt đầu với một ứng CRUD cơ bản:

```
rails g scaffold Place name:string latitude:decimal longitude:decimal --javascript-engine=js
```

Giải thích qua một chút, thì ở đây chúng ta sẽ tạo ra một model **Place** với các thông tin cơ bản bao gồm:

* name: kiểu dữ liệu *string*
* latitude: kiểu dữ liệu *decimal*
* longitude: kiểu dữ liệu *decimal*

và kèm theo là `controller`, `views`, `routes` và `assets` tương ứng. Ở đây tôi có thêm option là `javascript-engine=js` để làm việc với `Javascript` thay cho `Coffeescript`. Làm việc với Javascript dễ dàng hơn vì chúng ta có thể tìm thấy nhiều ví dụ và code mẫu trên internet :D. Trong trường hợp này, toàn bộ [tài liệu của Google Maps API](https://developers.google.com/maps/documentation/) đều có code mẫu bằng Javascript. 

Tiếp theo là migrate database:

```
rails db:migrate
```

Tiếp tục là seed ra một ít data mẫu để sử dụng: 

```Ruby
# db/seeds.rb

Place.create!([
{ "name": "Buckingham Palace", "latitude": "51.501564","longitude": "-0.141944"},
{ "name": "Westminster Abbey", "latitude": "51.499581", "longitude": "-0.127309"},
{ "name": "Big Ben", "latitude": "51.500792", "longitude": "-0.124613"}
])
```

Chạy lệnh:
```
rails db:seed
```

Khởi động server bằng lệnh `rails server` và check trên trình duyệt của bạn tại link [http://localhost:3000/places](http://localhost:3000/places) và có thể thấy như sau:

![](https://images.viblo.asia/a45def17-63df-4f86-8eda-88b6b9fad683.jpeg)

Bây giờ chúng ta sẽ bắt đầu với việc thêm map vào ứng dụng của bạn. Trước tiên thì bạn sẽ cần phải có một API key hoặc có thể lấy trên: [Google Maps  API key](https://developers.google.com/maps/documentation/javascript/get-api-key)

# Google Maps API và Rails Credentials

Bây giờ chúng ta sẽ thiết lập Rails để sử dụng key. Để bảo đảm key, chúng ta nên sử dụng Rails Credentials. Bạn có thể tham khảo tại [đây](https://guides.rubyonrails.org/security.html#custom-credentials) để hiểu hơn về Rails Credentials 

Trước tiên cần chạy lệnh:

```
rails credentials:edit
```

Thêm dòng này vào cuối file 
```
google_maps_api_key: INSERT-YOUR-KEY-HERE
```

Đừng để quên key của bạn trong trình giữ chỗ. Chúng ta có thể access key trong Rails app thông qua: 

```
Rails.application.credentials.google_maps_api_key
```

Lưu ý: Nếu bạn không muốn sử dụng `credentials` và không cần bảo mật key, bạn có thể sử dụng API key string để thay thế. 

# Sử dụng Google Maps [Static API](https://developers.google.com/maps/documentation/maps-static/intro) 

Theo Google: 

> "Map Static API cho phép bạn nhúng hình ảnh Google Maps trên trang web của mình mà không yêu cầu JavaScript hoặc tải bất kì trang động nào. Dịch vụ Map Static API cho phép tạo bản đồ của bạn dựa trên các tham số URL được gửi qua HTTP request tiêu chuẩn và trả về bản đồ dưới dạng hình ảnh có thể hiện thị trên trang web."

Thêm đoạn code sau vào cuối cùng của file `app/views/places/show.html.erb`  

```
<p>
<%= image_tag "https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=400x300&center=#{@place.latitude},#{@place.longitude}&key=#{Rails.application.credentials.google_maps_api_key}", alt: "Map" %>
</p>
```

Check lại trình duyệt của bạn sẽ thấy map như sau: 

![](https://images.viblo.asia/ca1021a4-b22f-4d87-b533-edaa4ea166a8.jpeg)

Trong đoạn code phía trên chúng ta đã pass các tham số sau:

* zoom: chi tiết gần đúng là 1 - Thế giới, 5 - lục địa, 10 - Thành phố, 15 - Đường phố, 20 - ác tòa nhà
* size: chiều rộng (width) và chiều cao (height) theo pixels
* center: nơi trung tâm của bản đồ

# Thêm marker 
Tiếp theo chúng ta sẽ chèn thê marker. Cập nhật lại phần code mới thêm vào một chút

```
<p>
<%= image_tag "https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=400x300&markers=size:small%7Ccolor:red%7C#{@place.latitude},#{@place.longitude}&key=#{Rails.application.credentials.google_maps_api_key}", alt: "Map" %>
</p>
```

Kí hiệu (%7C) được sử dụng để phân tách các thuộc tính của marker. Chúng ta đã có một marker kích thước nhỏ và có màu đỏ. 

![](https://images.viblo.asia/cd6ed51f-8522-4860-bfbc-88448e90a338.jpeg)

Lưu ý rằng khi sử dụng marker, chúng ta không cần phải xác định trung tâm bản đồ. Vị trí marker sẽ được sử dụng để căn giữa bản đồ. 

# Sử dụng Google Maps [Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial)
Chúng ta phải thêm code load api vào trang của mình. Thay đổi file `app/views/layouts/application.html.erb` và thêm vào phần `<head>`, trước `application` vì nó cần phải được load trước khi code được inlcuded trong `application` minitest. 

```
# app/views/layouts/application.html.erb

...
    <%= javascript_include_tag 'https://maps.googleapis.com/maps/api/js?key='+Rails.application.credentials.google_maps_api_key %>
    <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
</head>
...
```

Tiếp theo bạn cần phải xóa static map và thêm vào thẻ `<div>` để có thể đặt map vào đó: 

```
# app/views/places/show.html.erb

<p>
    <div id="map"></div>
</p>
```

Config size:
```CSS
# app/assets/stylesheets/places.scss

#map {
    width: 600px;
    height: 400px;
}
```

Tiếp theo gọi một hàm javascript từ view. 

Rails mặc định sử dụng **[Turbolinks](https://github.com/turbolinks/turbolinks)**. Với Turbolink bạn sẽ cần phải [load javascript vào `<head>` của document](https://github.com/turbolinks/turbolinks#loading-your-applications-javascript-bundle). Hãy tạo một `yield` trong file `application.html.erb`, nó sẽ nhận code từ views được lựa chọn. 

```
# app/views/layouts/application.html.erb

...
    <%= yield(:head_tags) %>
  </head>
...
```

Bây giờ bạn có thể gọi javascript function từ view, thêm các đoạn scripts trong `<head>` bằng cách pass một block với method `provide`

Thêm phần code sau ở đầu của file:

```
# app/views/places/show.html.erb

<% provide :head_tags do %>
    <script>
    document.addEventListener("DOMContentLoaded", function(){
        initMap(<%=@place.latitude%>, <%=@place.longitude%>)
    });
    </script>
<% end %>
```

Khi Dom được load, function `initMap`sẽ được gọi và pass 2 tham số: `<%= @place.latitude %>` và `<%= @place.longitude %>`. 

Bắt đầu viết code javascript cho Javascript API Map.

```
# app/assets/javascripts/places.js

function initMap(lat, lng) {
    var myCoords = new google.maps.LatLng(lat, lng);
    var mapOptions = {
    center: myCoords,
    zoom: 14
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
```

Bản đồ sẽ được tập trung vào các tọa độ được cung cấp và mức zoom là 14. 

![](https://images.viblo.asia/583bc194-407b-49d1-b96f-16d1e6ef3512.jpeg)

Bây giờ chúng ta đã có một Javascript map động có thể tương tác, phóng to và thu nhỏ, xoay, thay đổi giữa lộ trình và chế độ xem vệ tinh, tạo toàn màn hình và thậm chí sử dụng chế độ xem phố.

Thêm marker: 

```CSS
var marker = new google.maps.Marker({
    position: myCoords,
    map: map
});
```

Method initMap đầy đủ sẽ như sau: 

```JS
// app/assets/javascripts/places.js

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

![](https://images.viblo.asia/752e1cc0-9137-4f57-9e12-691198f6d091.jpeg)

Bây giờ, quay về homepage và chọn "show" một địa điểm khác.

Có thể map sẽ không được load vì Rails sử dụng Turbolinks không reload page. Để có thể thực hiện được, chúng ta có thể thực hiện như sau. Include script vào `<head>` của HTML page: `<meta name='turbolinks-visit-control' content='reload'>`

```
# app/views/places/show.html.erb

<% provide :head_tags do %>
  <meta name='turbolinks-visit-control' content='reload'>
  <script>
    document.addEventListener("DOMContentLoaded", function(){
      initMap(<%=@place.latitude%>, <%=@place.longitude%>)
    });
  </script>
<% end %>
...
```

Bây giờ khi click "show" thì map sẽ xuất hiện lại theo như bạn mong muốn. 

# Sử dụng Map để lấy dữ liệu

Khi bạn muốn tạo mới hoặc sửa đổi thông tin của một place, Rails sẽ sử dụng partial `_form.html.erb` 

Chúng ta cần tạo một map mới để tương tác với form trên, sẽ thay đổi marker khi giá trị nhập vào thay đổi và thay đổi giá trị nhập vào khi kéo thả marker. 

Thêm đoạn code sau vào đầu file: 

```
# app/views/places/_form.html.erb

<% provide :head_tags do %>
    <meta name='turbolinks-visit-control' content='reload'>
    <script>
        document.addEventListener("DOMContentLoaded", initMap2);
    </script>
<% end %>
```

Lưu ý rằng ở đây chúng ta không truyền tham số cho hàm `initMap2`. Trong trường hợp này, hàm của chúng ta sẽ đọc các giá trị của các giá trị đầu vào HTML

Hãy thêm một thẻ `<div>` vào field cuối cùng và trước button submit:

```
<p>
  <div id="map2"></div>
</p>
```

Tiếp tục với config size: 

```CSS
# app/assets/stylesheets/places.scss

#map2 {
    width: 600px;
    height: 400px;
}
```

Chúng ta sẽ cần tạo thêm functions mới trong javascript:

```JS
// app/assets/javascripts/places.js

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

Với hàm này, sẽ sinh ra một map tương tự và có marker có thể kéo thả được. 

Rails đặt `id` của các input là `place_latitude`, và `place_longitude`, vì vậy chúng ta có thể sử dụng chúng để đọc các giá trị của chúng. 

Bây giờ hãy thử click "Edit" và "New place" để thử tưởng tác với nó. 

Chúng ta cần thực hiện 2 việc: 

* Khi thay đổi giá trị input của *longtitude* và *latitude* thì vị trí của marker cũng thay đổi theo:

```JS
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
```

* Khi kéo thả vị trí của marker, giá trị input của *longtitude* và *latitude* thay đổi theo:

```JS
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
```

![](https://images.viblo.asia/87bdbda7-ef63-400e-aac3-7f11dd578696.gif)

Cuồi cùng, nếu như bạn tạo một địa điểm mới map sẽ luôn có giá trị trung tâm ở vị trí 0, 0. Trông có vẻ không được đẹp lắm. Chúng ta nên đặt một vị trí mặc định cho map của mình. Đoạn code này phải được đặt ở đầu function, sau khi khởi tạo biến

```JS
// if not defined create default position
if (!lat || !lng){
    lat=51.5;
    lng=-0.125;
    document.getElementById('place_latitude').value = lat;
    document.getElementById('place_longitude').value = lng;
}
```

Bây giờ function đầy đủ của chúng ta sẽ là: 
```JS
function initMap2() {
    var lat = document.getElementById('place_latitude').value;
    var lng = document.getElementById('place_longitude').value;
    
    // if not defined create default position
    if (!lat || !lng){
        lat=51.5;
        lng=-0.125;
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

Hi vọng rằng bài viết này hữu ích đối với bạn. Bạn có thể lấy source code tại [đây](https://github.com/pjbelo/gmaps-rails-example)

Bài viết này được dịch từ [nguồn](https://medium.com/@pjbelo/using-google-maps-api-v3-with-rails-5-2-b066a4b2cf14)
Điều đầu tiên và quan trọng nhất bạn cần biết về Google Maps service đó là nó thật tuyệt vời! Google cung cấp công cụ Freemium với tốc độ cực nhanh, đáng tin cậy và có khả năng tùy biến cao. Hơn nữa, cho đến khi bạn đạt đến giới hạn 2500 yêu cầu mỗi ngày, nó hoàn toàn miễn phí, vì vậy nó phù hợp cho hầu hết các start-up.

 Việc tích hợp API Google Maps vào một ứng dụng cũng  không hề quá khó khăn, bạn nên bắt đầu từ các guides hướng dẫn thay vì tìm kiếm một số giải pháp chìa khóa.
 
 **Geocoding**
 
 Trước khi đi đến tích hợp Google Maps, điều đáng nói đến trước tiên là Geocoding.Theo Google Maps guides, Geocoding là quá trình chuyển đổi địa chỉ (như "1600 Amphitheatre Parkway, Mountain View, CA") thành tọa độ địa lý (như vĩ độ 37.423021 và kinh độ -122.083739).
 
 Các tọa độ này có thể được sử dụng để đánh dấu địa điểm hoặc định vị bản đồ.
 
 Có một gem tuyệt vời trong Rails - [Geocoder](https://github.com/alexreisner/geocoder), nó có thể xử lý tất cả các nhiệm vụ liên quan đến geocoding và khá đơn giản để thiết lập nó. Những gì bạn phải làm là thêm hai trường - latitude:float và longitude:float - vào bảng chứa thông tin địa chỉ, và cài đặt trong model:
 ```
 geocoded_by :address
after_validation :geocode
```
và như thế, các tọa độ sẽ được cập nhật mỗi khi một bản ghi được lưu.

Geocoder cũng có các tính năng địa lý thú vị khác, như tìm kiếm các đối tượng cụ thể trong một khu vực địa phương hoặc trong vùng lân cận của vị trí được chỉ định.

**Static maps**

Google cung cấp hai loại bản đồ - static maps and dynamic maps (bản đồ tĩnh và bản đồ động).

Có vẻ như không có nhiều ứng dụng sử dụng các static maps, vì những dynamic maps có nhiều chức năng hơn và hấp dẫn hơn. Tuy nhiên, có hai ưu điểm khi sử dụng static Google Maps:

* Trước hết, chúng dễ tích hợp hơn nhiều;
* Thứ hai và quan trọng nhất, chúng có thể dễ dàng được thêm vào bất kỳ tài liệu tĩnh nào được tạo như tệp PDF.

Static API khá đơn giản - một truy vấn HTTP tới Google Maps API sẽ trả về một hình ảnh. Xong. Bạn có thể làm bất cứ điều gì với hình ảnh nhận được. Chắc chắn, bạn không nên cắt thông tin bản quyền của Google hoặc làm bất cứ điều gì kiểu kiểu đó.

Ví dự như hình ảnh trả về của thủ đô Hà Nội quen thuộc của chúng ta:

![](https://images.viblo.asia/790bac2e-15a5-463c-9366-2d3ae11e0174.png)

Và khi nó zoom rõ hơn:

![](https://images.viblo.asia/56e9ee25-d162-4e7b-b6bb-9f12fc4f51bf.png)

Và một lần nữa, cùng một địa điểm, nhưng lần này là chế độ xem dạng hình ảnh vệ tinh:

![](https://images.viblo.asia/72570e3c-d826-4793-ba93-f8592138a395.png)


Bạn có thể tìm thấy danh sách các tham số có sẵn tại [đây](https://developers.google.com/maps/documentation/maps-static/intro).

Để tránh việc lặp lại code mỗi khi tích hợp static Google Map, bạn có thể viết một method đơn giản trong 1 helper, như sau:
```
def google_map(center)
  "https://maps.googleapis.com/maps/api/staticmap?center=#{center}&size=300x300&zoom=17"
end
```

với `center` là  một tham số, bạn có thể truyền vào một địa chỉ hoặc một cặp tọa độ.

và gọi method đó trong view:

```
image_tag google_map(center: location.address)
```
hoặc
```
image_tag google_map(center: [ location.latitude, location.longitude ].join(','))
```
Rõ ràng là trong các ứng dụng thực tế, các tham số nên không phải là một trong các loại `magic numbers`. Chúng có thể được truyền một cách rõ ràng vào phương thức helper hoặc được lưu trữ trong tệp cài đặt.

Đó là tất cả cho việc tích hợp static maps.

**Embedded maps**

Google Maps Embed API khá giống với static API.

Với một yêu cầu HTTP, bạn có thể dễ dàng thêm bản đồ tương tác vào ứng dụng của mình. Nó có thể được nhúng bằng cách thêm một iframe và chỉ định URL Google Maps Embed API vào thuộc tính src:

```
<iframe width="300" height="300" frameborder="0" style="border:0"
 src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=ADDRESS_OR_COORDINATES"
 allowfullscreen>
</iframe>
```
Điều này cho phép bạn có được chức năng cơ bản của Google Maps một cách nhanh chóng và dễ dàng.

Chắc chắn, trong một ứng dụng thực sự code này nên được chuyển đến helper và sự tích hợp cũng rất đơn giản. 

Bạn có thể tìm thêm thông tin về Google Embed API tại [đây](https://developers.google.com/maps/documentation/embed/guide).

**Dynamic maps (JS)**

Nó cũng không hề khó!
Điều đầu tiên bạn phải làm là thêm Google Maps Scripts vào thẻ `<script>`: 
    
 ```
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY async defer></script>
 ```

 Thứ hai, bạn cần phải thêm một div với một id cụ thể (tức là bản đồ) vào một trang .JS sẽ sử dụng id này để xác định vị trí của bản đồ.

Thứ ba, bạn có thể bắt đầu nghiên cứu hướng dẫn của Google Maps và thêm chức năng mới vào bản đồ tương tác của bạn.

Ví dụ: giả sử rằng có một số tab trong ứng dụng của bạn và mỗi tab chứa một bản đồ của cùng một khu vực nhưng với một bộ đánh dấu khác nhau. Bằng cách nhấp vào bất kỳ điểm đánh dấu nào, bản đồ sẽ được căn giữa trên đó và phóng to.

Dưới đây bạn có thể tìm thấy code CoffeeScript để thực hiện chức năng được yêu cầu bên trên:
```
class GoogleMap 
  # defaults
  zoom =
    initialView: 15
    closeView: 18
  markers = []
  map = undefined

  constructor: (home) ->
    # set map center and view options
    lat = home["lat"]
    lon = home["lon"]
    myLatlng = new google.maps.LatLng(lat, lon)
    mapOptions =
      zoom: zoom.initialView
      center: myLatlng

    # create map
    map = new google.maps.Map(document.getElementById("map"), mapOptions)

  addMarker: (location, title) ->
    # create marker and add it to the array of markers
    marker = new google.maps.Marker(
      position: location,
      title: title,
      map: map
    )
    markers.push marker

    # add event listener - change zoom and center position on marker click
    google.maps.event.addListener marker, "click", ->
      map.setZoom zoom.closeView
      map.setCenter marker.getPosition()

  addMarkers: (markerList) ->
    # add all markers
    _.each markerList, (marker) =>
      position = new google.maps.LatLng marker["lat"], marker["lon"]
      title = "#{marker['full_address']}"
      @addMarker position, title
  
  drawMarkers: (map) ->
    # draw markers
    _.each markers, (marker) ->
      marker.setMap map
      # IMPORTANT: calling setMap method on marker will draw this marker, calling setMap with null parameter will erase it
  
  showMarkers: ->
    @setAllMap map

  hideMarkers: ->
    @setAllMap null

  removeListeners: ->
    _.each markers, (marker) ->
      google.maps.event.clearInstanceListeners(marker)

  deleteMarkers: ->
    @hideMarkers()
    @removeListeners()
    markers = []

app.google or= { classes: {} }
app.google.classes.GoogleMap = GoogleMap
```

Class này có thể được sử dụng như sau:

```
 $ ->
  { GoogleMap } = app.google.classes
  
  googleMap = new GoogleMap($('[data-map]:eq(0)').data('home'))
  googleMap.placeMarkers($("[data-map]:eq(0)").data("markers-list"))

  $(document).on 'click', '[data-tab]', ->
    googleMap.deleteMarkers()
    googleMap.placeMarkers($("[data-map]:eq($(@).index())").data("markers-list"))
```
Nó hơi phức tạp, nhưng vẫn có thể đọc được, phải không?

**Rails gems và JS plugins**
 
Đương nhiên, một trong những câu hỏi cháy bỏng nhất được các developers RoR yêu cầu khi họ muốn tích hợp Google Maps là liệu họ có thể sử dụng tất cả các tính năng tuyệt vời của Google Maps mà không cần viết code JavaScript hay không.
    
Vâng, có một vài gem đã cố gắng giúp bạn làm điều này.

Gem đầu tiên và nổi tiếng nhất là gem [Google-Maps-for-Rails](https://github.com/apneadiving/Google-Maps-for-Rails). Bạn chỉ cần thêm các đoạn mã JS để tùy chỉnh bản đồ của bạn, gem này sẽ giúp bạn thức hiện tất cả các vai trò khác.

Một gem khác là gem [GoogleMaps](https://github.com/9peso/google_maps), nó cố gắng thực hiện tất cả điều này trong Rails way và tự thêm tất cả các JS scripts cơ bản. Tuy nhiên, việc tích hợp các bản đồ google bằng gem này cũng không phải không có lỗi.

Mọi thứ trở nên tồi tệ hơn, khi bạn cần thêm một số tương tác với bản đồ. Bạn không thể xử lý nó mà không cần thêm các kịch bản JS và điều này làm giảm đáng kể giá trị của tất cả các nỗ lực để xây dựng các chức năng như gem.

Vì vậy, sau khi tất cả, câu trả lời là không, bạn không thể thêm một dynamic map đầy đủ chức năng mà không cần code JS.
Đối với các plugin JS - hầu hết trong số chúng chỉ là code copy/pasted từ Google Maps, đôi khi được sắp xếp lại một chút.

Dưới đây là danh sách các plugin hấp dẫn nhất:

* [gmap3](http://gmap3.net/),
* [Maplace.Js](https://maplacejs.com/),
* [gmaps.js](https://hpneo.github.io/gmaps/).

Vì vậy, tôi đã không tìm thấy bất kỳ thuận lợi của việc sử dụng gem. Lợi ích duy nhất của việc sử dụng plugin là tất cả các tập command đã được cài đặt, vì vậy bạn có thể bắt đầu làm việc với Google Maps ngay lập tức và không cần thêm thời gian để triển khai các chức năng cơ bản.

Một đối số chống lại cả gem và plugin là việc bạn phải xây dựng logic ứng dụng dựa trên cú pháp của chúng và bạn nên tìm hiểu cú pháp này trước. Hơn nữa, nếu Google thay đổi Google Maps API, bạn sẽ phải chờ cho đến khi phiên bản cập nhật của gem hoặc plugin được phát hành hoặc tích hợp các bản đồ theo cách thủ công, đó chính xác là những gì bạn đã cố tránh.

**Tóm tắt**

Tích hợp static and embedded maps là một câu hỏi về việc tạo một phương thức đơn lẻ. Hoàn toàn không có ý nghĩa trong việc tìm kiếm các giải pháp chìa khóa.

Tích hợp dynamic maps khó hơn một chút, nhưng nó vẫn không ngăn cản bạn cố gắng tích hợp chúng từ đầu bởi vì:

* Giúp bạn hiểu sâu về API và khả năng của họ, điều này chắc chắn sẽ có ích trong tương lai;
* Sẽ không mất nhiều thời gian hơn so với tích hợp thông qua các giải pháp chìa khóa;
* Giải phóng bạn khỏi dành thời gian tìm kiếm một giải pháp tốt hơn;
* Giải thoát bạn khỏi cú pháp studying (có khả năng vụng về) được tạo bởi người khác;
* Cải thiện kỹ năng front-end của bạn;
* Và cuối cùng, nó rất thú vị.

Và code bạn viết có thể dễ dàng được sử dụng trong một dự án mới hoặc thậm chí trở thành cơ sở cho bạn sở hữu các plugin!

Link nguồn: https://anadea.info/blog/how-to-integrate-google-maps-into-ruby-on-rails-app
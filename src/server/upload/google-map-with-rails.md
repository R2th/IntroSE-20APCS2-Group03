# Google map with Rails

Nếu bạn đang cần cài đặt Google Map cho ứng dụng Rails của bạn, bài viết này có thể giúp bạn đôi chút :joy:. 

Việc triển khai Google Map trên ứng dụng Rails khá đơn giản vì Rails đã hỗ trợ Google Map bằng việc sử dụng `gem 'gmaps4rails'`. Bài viết dưới đây sẽ giúp bạn hiểu thêm về cách cài đặt Google Map trên ứng dụng Rails. Ví dụ trong bài viết sẽ hiển thị tất cả các định tuyến không dây trên Google Map. Nó phục vụ như là một bản điều khiển cho kỹ sư mạng.

### Initial Setup

Xác định 1 vị trí trên Google Map cần 2 thông tin: `longitude` (kinh độ) và `latitude` (vĩ độ). Chúng ta sẽ tạo các thông tin linh hoạt từ cơ sở dữ liệu của mình, trước tiên sử dụng `scaffold` để tạo các component của MVC.

Giả sử rằng chúng ta tạo một trang cho `Router` để hiển thị từng thông tin Bộ định tuyến không dây và mỗi định tuyến chứa một vị trí (kinh độ và vĩ độ) và tên, chúng ta sẽ sử dụng lệnh sau đây.

`rails generate scaffold Router name:string latitude:float longitude:float`

Sau đó sử dụng lệnh dưới đây để tạo database:

`rails db:migrate`

Hiển thị trang index của `Router` có 3 trường longtitue, latitude và name như hình dưới đây.

![](https://images.viblo.asia/26f0ea6c-af2b-4ca6-9963-380bf3d9ed77.png)

### Configure gmaps4rails
Cài đặt và cấu hình gem gmaps4rails, các bạn có thể xem [tại đây](https://github.com/apneadiving/Google-Maps-for-Rails) để hiểu thêm về các tính năng và cài đặt của gem. Dưới đây là phần cài đặt và cấu hình gem. Trong Gemfile thêm `gem 'gmaps4rails'` và chạy lệnh `bundle install`. 

Sau đó, thêm các dòng code sau vào file `application.html.erb`

``` javascript
<script src="//maps.google.com/maps/api/js?key=[your API key]"></script>  
<script src="//cdn.rawgit.com/mahnunchik/markerclustererplus/master/dist/markerclusterer.min.js"></script>  
<script src='//cdn.rawgit.com/printercu/google-maps-utility-library-v3-read-only/master/infobox/src/infobox_packed.js' type='text/javascript'></script>
<script src='//underscorejs.org/underscore-min.js' type='text/javascript'></script>
```
Bạn sẽ phải nhập key api vào `[your API key]`. Key API sẽ được nói trong phần tiếp theo.

Có lưu ý nhỏ, bạn có thể đặt đoạn code trên trong bất kỳ phần nào của View nơi mà bạn muốn hiển thị map ra. Nếu bạn để code như trên thì nó đóng vai trò toàn cục.

Bây giờ ta sẽ thêm asset pipeline. Trong file `application.js` thêm `//= require gmaps/google`

### Obtain API Key
Để có key API cho dự án, bạn cần phải truy cập vào [trang web](https://developers.google.com/maps/documentation/javascript/get-api-key) của Google Maps APIs để lấy key api. Nhấn `GET A KEY` và đồng ý với các điều khoản và điều kiện để tạo 1 key.

![](https://images.viblo.asia/48ea35bd-6e55-413c-9dbd-9872532d1ff4.png)

Một màn hình sẽ hiển thị sau khi key được tạo ra. Thay thế  `[your API key]` bằng key vừa được tạo ra.

![](https://images.viblo.asia/f66619a4-528f-4105-9f17-ac1a56000c96.png)

### Add Google Map to View

Hướng dẫn dưới đây sẽ giúp bạn thêm Google Map vào view của bạn. Đoạn code sau sẽ dựng giao diện map trong view mà bạn muốn hiển thị. Ví dụ bạn muốn hiển thị trong trang routers/index.html.erb bạn thêm đoạn code sau vào:

```html
<div style='width: 800px;'>  
  <div id="map" style='width: 800px; height: 400px;'></div>  
</div>  

<script type="text/javascript">  
handler = Gmaps.build('Google');  
handler.buildMap({ provider: {}, internal: {id: 'map'}}, function(){  
  markers = handler.addMarkers([  
    {  
      "lat": 37.3333945,  
      "lng": -121.8806499,  
      "picture": {  
        "width":  32,  
        "height": 32  
      },  
      "infowindow": "SJSU"  
    }  
  ]);  
  handler.bounds.extendWith(markers);  
  handler.fitMapToBounds();  
});  
</script>
```

Trong Google Map có thể thấy được điểm đánh dấu. Trên điểm đánh dấu có hiển thị thông báo. Thông tin điểm đánh dấu này có thể được thay thế dựa trên nhu cầu của bạn. Bạn có thể xem tại hình dưới.

![](https://images.viblo.asia/ca25e9e6-69ea-497f-bdf3-6bfc4a05eaeb.png)

Nếu bạn chỉ thử tạo một Google Map tĩnh với dữ liệu tĩnh thì bạn có thể dừng tại đây :joy:. Phần tiếp theo chúng ta sẽ thảo luận làm thế nào để tạo một Google Map động.

### Dynamic Map Marker

Các phần trên chúng ta đã tạo và chèn thành công Map vào giao diện của ứng dụng. Để map của bạn lấy và hiển thị được dữ liệu từ cơ sở dữ liệu, bạn phải tạo method trong controller.

```ruby routers_controller.rb
def load_routers  
   @routers_default = Gmaps4rails.build_markers(Router.all) do |plot, marker|  
      marker.lat plot.latitude  
      marker.lng plot.longitude  

      @status = rand(1..4)  
      @battery = rand(10..90)  
      @ip = "192.168."+rand(0..255).to_s+"."+rand(15..250).to_s  
      @connected = rand(50..100)  

      if @status == 1  
        url_alert = "/good.png"  
        @status == "Normal"  
      else  
        url_alert = "/alert.png"  
      end  

      marker.picture({  
        "url" => url_alert,  
        "width" => 35,  
        "height" => 30  
      })  

      marker.infowindow render_to_string(:partial => "/routers/info",   
        :locals => {:name => plot.name, :battery => @battery, :date => rand(6.months.ago..Time.now), :ip => @ip, :connected => @connected })  
   end  
 end

def index  
   load_routers  
   @routers = Router.all  
end
```

Tạo 1 method là load_routers. Trong method này, bắt dữ liệu từng hàng của database và thay thế tên đối tượng `longtitude` `latitue` bằng `lng` và `lat`. Chúng ta đổi tên đối như vậy vì thư viện mà chúng ta sử dụng chỉ chấp nhận `lng` và `lat`.

Sau đó, chúng ta sử dụng method rand để tạo một vài giá trị ngẫu nhiên để phục vụ cho việc đánh dấu. Bạn có thể thay thế đối tượng với các giá trị có trong database. Đó là 1 câu lệnh điều kiện để kiểm tra trạng thái. Nếu `=1` chúng ta gán `url_alert` cho `/good.png` hoặc `/alert.png` nếu không bằng 1. 2 bức ảnh trên sẽ nằm trong thư mục `/public/` . Chúng phục vụ như 2 biểu tượng đánh dấu trạng thái. Sau đó,  2 ảnh sẽ thay đổi kích thước theo chiều rộng vào cao tương ứng với từng trạng thái. 

Tất cả thông tin sẽ được phân tích từ controller để đưa ra view. Sau đây chúng ta sẽ tạo 1 `partial` với tên `_info.html.erb`.

``` ruby /routers/_info.html.erb
<style type="text/css">    
 #low     { color: red;     }  
 #medium  { color: orange;  }  
 #high    { color: green;   }  
</style>    
    <b>Name:</b> <%= name %><br>  
    <% if @battery <30 %>  
        <b>Status:</b> <span id="low">Low Battery!</span><br>  
    <% elsif @status == 1 %>  
        <b>Status:</b> <span id="high">System Normal</span><br>  
    <% elsif @status == 2 %>  
        <b>Status:</b> <span id="medium">High Network Traffic</span><br>  
    <% elsif @status == 3 %>  
        <b>Status:</b> <span id="low">System Error!</span><br>  
    <% else %>   
        <b>Status:</b> <span id="low">High Network Traffic</span><br>  
    <% end %>  

    <% if battery <= 30 %>  
        <b>Battery:</b> <span id="low"><%= battery %>%</span><br>  
    <% else %>  
        <b>Battery:</b> <span id="high"><%= battery %>%</span><br>  
    <% end %>  

    <b>Last collection:</b> <%= date %><br><br>  
    <b>WiFi SSID:</b> SJSU_Premier<br>  
    <b>IP Address:</b> <%= ip %><br>  
    <b>Connected Users:</b> <%= connected %>
```

Để ứng dụng có thể chạy chúng ta cần vào lại file index.html.erb để xóa và thêm đoạn code theo hướng dẫn sau:

```html routers/index.html.erb
#Code to remove
<script type="text/javascript">  
handler = Gmaps.build('Google');  
handler.buildMap({ provider: {}, internal: {id: 'map'}}, function(){  
  markers = handler.addMarkers([  
    {  
      "lat": 37.3333945,  
      "lng": -121.8806499,  
      "picture": {  
        "width":  32,  
        "height": 32  
      },  
      "infowindow": "SJSU"  
    }  
  ]);  
  handler.bounds.extendWith(markers);  
  handler.fitMapToBounds();  
});  
</script>

#Code to add
<script type="text/javascript">  
handler = Gmaps.build('Google');  
handler.buildMap({ provider: {}, internal: {id: 'map'}}, function(){  
    markers = handler.addMarkers(<%=raw @routers_default.to_json %>);  
    handler.bounds.extendWith(markers);  
    handler.fitMapToBounds();  
});  
</script>
```
Cuối cùng là bạn có thể lấy một số kinh độ và vĩ độ và đưa vào cơ sở dữ liệu. Kết quả cuối cùng bạn có thể tham khảo một số hình dưới đây.

![](https://images.viblo.asia/6fe013ac-8dff-46a0-ae4b-5661628c763f.png)

![](https://images.viblo.asia/3f6b7e56-323c-4e53-8e89-cb383b87b6d8.png)

![](https://images.viblo.asia/51326c55-932b-41f6-8159-1da1f99c8e46.png)

Trên đây là bài hướng dẫn về sử dụng gem gmaps4rails trong ứng dụng rails. Cảm ơn các bạn đã quan tâm :joy:.

Nguồn tham khảo: https://melvinchng.github.io/rails/GoogleMap.html#65-dynamic-map-marker
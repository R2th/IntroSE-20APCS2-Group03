# Ruby client for the Google Distance Matrix API

Để nối tiếp bài tìm hiểu trước của mình về GoogleMaps (các bạn có thể  [xem tại đây](https://viblo.asia/p/google-map-with-rails-LzD5dbpOZjY)), nay mình tiếp tục tìm hiểu về một service của google maps - GoogleDistanceMatrix.

Thư viện này tạo ra distance matrix API của google dễ dàng để làm việc, cho phép người dùng thiết lập nhiều điểm gốc và nhiều điểm đích và kéo được distance matrix từ Google.

Chỉ 1 lần bạn có được matrix bạn có thể có được tất cả các routes từ 1 điểm gốc đã cho hoặc tới một điểm đích.

Matrix này cũng có thể được sử dụng như một bộ dữ liệu cho vấn đề "traveling salesman", nhưng để giải quyết nó bạn có thể xem tại [](http://ai4r.org/).

Bây giờ chúng ta sẽ đi đến phần cài đặt.
## Installation
Thêm gem sau vào Gemfile của bạn: gem 'google_distance_matrix'

Và sau đó chạy lệnh: bundle

Hoặc cũng có thể sử dụng dòng lệnh sau để cài đặt gem trên: 

`gem install google_distance_matrix`

## Configuration
Cấu hình được thực hiện trực tiếp trên matrix hoặc thông qua GoogleDistanceMatrix.configure_defaults.

### Rút gọn URL bằng tọa độ được mã hóa
Thay vì các giá trị lat, lng trong URL nó có thể sử dụng bộ tọa độ được mã hóa bằng thuật toán Encoded Polyline Algorithm. Điều này thực sự hữu ích nếu bạn có số lượng lớn các điểm gốc (origin), bởi vì url sẽ ngắn hơn đáng kể khi sử dụng mã hóa đa đường.

```
GoogleDistanceMatrix.configure_defaults do |config|
  config.use_encoded_polylines = true
end
```

### Request Cache
Đưa ra giới hạn của Googles về dịch vụ bạn có thể cần cache requests (lưu trữ các yêu cầu). Điều này được thực hiện bằng cách đơn giản sử dụng URL như cache keys. Chúng ta sử dụng giao diện mặc định ActiveSupport::Cache::Store để cấu hình lại

```
GoogleDistanceMatrix.configure_defaults do |config|
  config.cache = ActiveSupport::Cache.lookup_store :your_store, {
    expires_in: 12.hours
    # ..or other options you like for your store
  }
end
```

## Example
Thiết lập một matrix để làm việc

`matrix = GoogleDistanceMatrix::Matrix.new`

Nó sẽ sinh ra 1 matrix có dạng như sau:

![](https://images.viblo.asia/a97d61fd-439f-4fb1-ab42-59e49daef804.png)

Tạo một vài địa để để sử dụng như origins hoặc destinations cho matrix

```
origin = GoogleDistanceMatrix::Place.new lng: -31.9548767, lat: 115.8604619
 origin_address = GoogleDistanceMatrix::Place.new address: "Perth Town Hall, Hay St & Barrack St, Perth WA 6000, Australia"
  destination_address = GoogleDistanceMatrix::Place.new address: "Parliament House, Harvest Terrace, West Perth WA 6005, Australia"
  destination_origin = GoogleDistanceMatrix::Place.new lng:31.9517177, lat: 115.8470932
```

Thêm các place vào matrix data

```
 matrix.origins << origin << origin_address
 matrix.destinations << destination_origin << destination_address
```
  
  Có thể thêm một vài config
  
```
 matrix.configure do |config|
  config.mode = 'driving'
  config.avoid = 'tolls'
  #To build signed URLs to use with a Google Business account.
  config.google_business_api_client_id = "123"
  config.google_business_api_private_key = "your-secret-key"
  #If you have an API key, you can specify that as well.
  config.google_api_key = "YOUR_API_KEY"
end
```

Để xem dữ liệu của matrix sử dụng câu lệnh `matrix.data`

![](https://images.viblo.asia/3a4eeec7-38de-42f1-9af9-891cd7de3130.png)

Nó là một mảng đa chiều. Các hàng là các giá trị theo gốc. Mỗi hàng phản hồi tới 1 điểm gốc và mỗi phần tử bên trong là một cặp origin-destination.

Truy vấn với matrix

Trả ra một mảng của `Google::DistanceMatrix::Route` với tất cả các origin hoặc destination được đưa vào

`matrix.routes_for dest_address` 

Trả về `Google::DistanceMatrix::Route` with dữ liệu đưa vào là origin vào destination cụ thể

`matrix.route_for origin: lat_lng, destination: dest_address`
ví dụ:

![](https://images.viblo.asia/9e860659-160c-4d38-a883-22e7a82913dc.png)

```
#Returns the shortest route to given destination, either by distance or duration
matrix.shortest_route_by_distance_to(dest_address)
matrix.shortest_route_by_duration_to(dest_address)
```

Ví dụ:
![](https://images.viblo.asia/b74481e1-bb35-4726-9efb-260df327a17b.png)

```
#If your matrix is for driving and you provided a departure_time all Route objects within
#the matrix will have duration_in_traffic_in_seconds. We can query the matrix for this data as well:
matrix.shortest_route_by_duration_in_traffic_to(dest_address)
```


Nguồn tham khảo: https://github.com/Skalar/google_distance_matrix#shorting-the-url-using-encoded-coordinates

Các bạn có thể đọc thêm tại: https://developers.google.com/maps/documentation/distance-matrix/intro

Bài tìm hiểu còn nhiều thiếu sót rất mong nhận được góp ý của các bạn (bow).
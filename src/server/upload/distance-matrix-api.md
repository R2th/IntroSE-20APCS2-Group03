# Introduction
Distance Matrix API là một dịch vụ cung cấp khoảng cách và thời gian di chuyển cho một ma trận (Matrix) các điểm xuất phát (origins) và điểm đến(destinations). API trả về thông tin dựa trên tuyến đường được đề xuất giữa điểm xuất phát và điểm cuối, được tính toán bởi API Google Maps và bao gồm các rows chứa giá trị thời lượng và khoảng cách cho mỗi pair.

# Before you begin
Trước khi bạn bắt đầu phát triển với Distance Matrix API, hãy xem lại các yêu cầu xác thực ([bạn cần API key](https://developers.google.com/maps/documentation/distance-matrix/get-api-key)) và thông tin thanh toán và sử dụng API (bạn cần bật[ tính năng thanh toán](https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing) trên dự án của mình).

# Distance Matrix requests
Distance Matrix API yêu cầu có dạng:
`https://maps.googleapis.com/maps/api/distancematrix/outputFormat?parameters`

Trong đó ***outputFormat*** có giá trị:
* json (recommended) hoặc
* xml
## Request parameters
Theo tiêu chuẩn trong URL, tất cả các tham số được phân tách bằng ký tự dấu và (&)
Tất cả các ký tự reserved (ví dụ: dấu cộng "+") phải được URL-encoded. Danh sách các tham số và giá trị của chúng được liệt kê bên dưới.
## Required parameters
**1. origins**
Điểm bắt đầu để tính quãng đường và thời gian di chuyển. Bạn có thể cung cấp một hoặc nhiều vị trí được phân tách bằng ký tự ống dẫn (|), dưới dạng ID địa điểm, địa chỉ hoặc tọa độ vĩ độ / kinh độ
`origins=Bobcaygeon+ON|24+Sussex+Drive+Ottawa+ON`
`origins=41.43206,-81.38992|-33.86748,151.20699`
`origins=place_id:ChIJ3S-JXmauEmsRUcIaWtf4MzE`

Distance Matrix API request example:

GET:
```
https://maps.googleapis.com/maps/api/distancematrix/json?origins=Nice+buiding,+467+%C4%90i%E1%BB%87n+Bi%C3%AAn+Ph%E1%BB%A7,+Ph%C6%B0%E1%BB%9Dng+25,+B%C3%ACnh+Th%E1%BA%A1nh,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh&destinations=Nh%C3%A0+th%E1%BB%9D+%C4%90%E1%BB%A9c+B%C3%A0,+C%C3%B4ng+x%C3%A3+Paris,+B%E1%BA%BFn+Ngh%C3%A9,+District+1,+Ho+Chi+Minh+City&key=<your_access_token>
```

**2. destinations**
Một hoặc nhiều vị trí được sử dụng làm điểm kết thúc để tính khoảng cách và thời gian di chuyển. Các tùy chọn cho thông số destinations cũng giống như đối với thông số origins được mô tả ở trên.

**3. key**
Chính là [API key](https://developers.google.com/maps/documentation/distance-matrix/get-api-key) của bạn đấy
# Optional parameters
**1. mode** (defaults to driving)
Chỉ định phương thức vận tải sẽ sử dụng khi tính toán khoảng cách
* driving
* walking
* bicycling
* transit

**2. language**
Ngôn ngữ trả về ở kết quả. Các ngôn ngữ hỗ trợ được liệt kê [ở đây](https://developers.google.com/maps/faq#languagesupport).

**3. region**
là [ccTLD](https://en.wikipedia.org/wiki/Country_code_top-level_domain) (country code top-level domain)

**4. avoid**
Tránh được tuyến đường được chỉ định và chỉ được chọn 1 cái.
* avoid=tolls
* avoid=highways
* avoid=ferries
* avoid=indoor

**5. units**
đơn vị khoảng cách
* units=metric (default) trả về khoảng cách đơn vị là kilometers và meters.
* units= trả về khoảng cách đơn vị là miles và feet.

**6. transit_mode**
* bus
* subway
* train
* tram
* rail

7. Ngoài ra còn có **arrival_time, departure_time, traffic_model, transit_routing_preference**
# Distance Matrix responses
Kết quả được trả về theo hàng, mỗi hàng chứa một điểm origin được ghép nối với mỗi điểm destination.

Với ví dụ request params origins ở 467 Điện Biên Phủ, HCM và destination là Nhà thờ Đức Bà - 01 Công xã Paris, Bến Nghé, Quận 1.

Ta sẽ nhận được output như sau
![](https://images.viblo.asia/78bdf15b-024a-4cbf-a985-145604d81929.png)
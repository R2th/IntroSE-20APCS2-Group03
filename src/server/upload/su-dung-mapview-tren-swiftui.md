# Giới thiệu
Tìm kiếm địa danh, định hướng và chỉ đường là những những chức năng cơ bản mà các ứng dụng bản đồ số cung cấp cho người dùng.
Trong bài viết hôm nay, ta sẽ từng bước sử dụng chức năng **MapView** trên **SwiftUI**

# Khởi tạo MapView
Để hiển thị MapView trên SwiftUI ta sẽ sử dụng cấu trúc **Map** của **MapKit**.
Cấu trúc này cho phép hiển bản đồ số trong một View.
Ta có thể sử dụng cấu trúc này để người dùng tương tác, hiển thị, theo dõi vị trí và đánh dấu địa điểm trên bản đồ số.

Trước hết ta cần phải khởi tạo một số thông tin trên bản đồ như  khu vực hiển thị của bản đồ và thêm các chú thích.
Ta sẽ khai báo tọa độ để xác định vùng hiển thị trên bản đồ, thông tin này được đặc trưng bởi **state** lưu trong kiểu dữ liệu **MKCoordinateRegion** bao gồm tọa độ trung tâm và tọa độ các khu vục mở rộng xung quanh

```
struct MapView: View {
    @State var coordinateRegion = MKCoordinateRegion(
      center: CLLocationCoordinate2D(latitude: 56.948889, longitude: 24.106389),
      span: MKCoordinateSpan(latitudeDelta: 0.2, longitudeDelta: 0.2))
    
    var body: some View {
      Map(coordinateRegion: $coordinateRegion)
        .edgesIgnoringSafeArea(.all)
    }
  }
```


Với đoạn code trên, bản đồ số sẽ hiển thị trung tâm thành phố Riga của Latvia.

![](https://images.viblo.asia/d8adae31-1bfb-4395-93a0-0efbe6ebb450.png)


# Thêm chú thích lên bản đồ
Để thêm các chú thích lên bản đồ, ta cần khởi tạo các thông số cho đối tượng **MKCoordinateRegion**, và sử dụng  **MapAnnotationProtocol** để trả về danh sách các chú thích sẽ hiển thị.

Thư viện MapKit cho phép hỗ trợ các kiểu chú thích sau:
- MapPin - Chú thích với biểu tượng Ghim
- MapMarker - Chú thích với biểu tượng Bóng bay
- MapAnnotation - Chú thích do người dùng tự định nghĩa

Đoạn code dưới đây sẽ khởi tạo một đối tượng MapMaker đơn giản:
`MapMarker(coordinate: place.coordinate, tint: .green)`

Để thêm marker trên vào bản đồ số ta cần thực hiện như sau:
```
struct MapViewWithAnnotations: View {
    let veganPlacesInRiga = [
      VeganFoodPlace(name: "Kozy Eats", latitude: 56.951924, longitude: 24.125584),
      VeganFoodPlace(name: "Green Pumpkin", latitude:  56.967520, longitude: 24.105760),
      VeganFoodPlace(name: "Terapija", latitude: 56.9539906, longitude: 24.13649290000000)
    ]
    
    @State var coordinateRegion = MKCoordinateRegion(
      center: CLLocationCoordinate2D(latitude: 56.948889, longitude: 24.106389),
      span: MKCoordinateSpan(latitudeDelta: 0.2, longitudeDelta: 0.2))
    
    var body: some View {
      Map(coordinateRegion: $coordinateRegion,
          annotationItems: veganPlacesInRiga) { place in
        MapMarker(coordinate: place.coordinate, tint: .green)
      }.edgesIgnoringSafeArea(.all)
    }
  }
```

Ngoài ra, các Marker cần phải tuần theo **Identifiable** protocol, tức là ta cần phải cung cấp ID cho từng Marker
```
  struct VeganFoodPlace: Identifiable {
    var id = UUID()
    let name: String
    let latitude: Double
    let longitude: Double

    var coordinate: CLLocationCoordinate2D {
      CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    }
  }
```

# Kết luận
Bài viết này cung cấp các bước cơ bản để sử dụng MapView trong SwiftUI, sử dụng các Marker được xây dựng sẵn trong bộ thư viện MapKit.
Để tự định nghĩa các Map Maker sẽ được giới thiệu trong các bài viết sau.

# Nguồn tham khảo
https://medium.com/flawless-app-stories/mapview-with-swiftui-a9fbdceff93a
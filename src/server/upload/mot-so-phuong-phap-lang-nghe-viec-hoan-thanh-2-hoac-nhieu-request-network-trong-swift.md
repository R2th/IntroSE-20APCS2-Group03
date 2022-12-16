Giả sử mình có trường hợp như sau: Trong một màn hình của ứng dụng,  có sử dụng hai request network, bạn chỉ được cập nhật giao diện người dùng sau khi cả hai hoàn thành. <br>
Ở bài viết này, mình sẽ hướng dẫn một số cách lắng nghe việc hoàn thành của hai hoặc nhiều request network.<br>
# Sử dụng Dispatch Group
Dispatch group cho phép nhóm nhiều task với nhau và chờ cho chúng hoàn thành hoặc nhận thông báo khi chúng hoàn thành.
## Sử dụng wait()
```
func fetchData() {
    DispatchQueue.global(qos: .userInitiated).async {
        let dispatchGroup = DispatchGroup()
        dispatchGroup.enter()
        self.fetchDataTask1()
        dispatchGroup.leave()
        
        dispatchGroup.enter()
        self.fetchDataTask2()
        dispatchGroup.leave()
        
        dispatchGroup.wait()
        //code your here
    }
}
```
Ở đây có thể thấy mình sử dụng `dispatchGroup.wait()` nó sẽ làm block thread hiện tại, nên mình có sử dụng DispatchQueue.global(qos: .userInitiated).async để đưa func đó vào background.<br>
Gọi `dispatchGroup.enter()` để báo hiệu task được bắt đầu thực thi, `dispatchGroup.leave()` báo hiệu task đã hoàn thành, tuy nhiên chú ý một điều là số enter() phải bằng số leave().<br>
## Sử dụng notify
```
func fetchData() {
    DispatchQueue.global(qos: .userInitiated).async {
        let dispatchGroup = DispatchGroup()
        dispatchGroup.enter()
        self.fetchDataTask1()
        dispatchGroup.leave()
        
        dispatchGroup.enter()
        self.fetchDataTask2()
        dispatchGroup.leave()
        
        dispatchGroup.notify(queue: .main, execute: { _ in
         // code your here
        }
    }
}
```
Khi cả hai task đều hoàn thành, dispatchGroup sẽ thông báo thông qua `.notify`. Việc sử dụng notify nó sẽ không block thread hiện tại, nên mình khuyến khích sử dụng cách này.<br>
# Sử dụng Combine
Combine là một framework vừa được phát hành gần đây cho tất cả các nền tảng của Apple. Nó áp dụng mô hình phản ứng(reactive) trong lập trình.<br>
Đầu tiên, bạn tạo một Playground và import Combine, khai báo thuộc tính subscriptions.<br>
```
import Combine

var subscriptions = Set<AnyCancellable>()
```
Tiếp theo, viết thêm một hàm getPhotos():<br>
```
func getPhotos(url: String) -> AnyPublisher<Data, Never> {
    let url = URL(string: url)!
    
    return URLSession.shared.dataTaskPublisher(for: url)
        .map(\.data)
        .replaceError(with: Data())
        .eraseToAnyPublisher()
}
```
Ở đây ta có thể thấy, Combine đã tích hợp sẵn cho URLSessionDataTask một publisher. Sử dụng toán tử map để map data, nếu lỗi thì sẽ thay thế lỗi bằng một data được khởi tạo mặc định<br>
Tiếp theo, để có thể thực hiện việc lắng nghe 2 yêu cầu request network thành công, combine có đưa ra toán tử `.zip`
```
let sunPlazaPublisher = getPhotos(url: "https://dulichkhatvongviet.com/wp-content/uploads/2018/09/sun-plaza-sapa.jpg")
let sunPublisher = getPhotos(url: "https://sun-asterisk.vn/wp-content/uploads/2020/10/logo-sun@2x.png")

sunPlazaPublisher
    .zip(sunPublisher)
    .handleEvents(receiveOutput: { (sunPlazaPhotoData, sunPhotoData) in
        let sunPlazaPhoto = UIImage(data: sunPlazaPhotoData)
        let sunPhoto = UIImage(data: sunPhotoData)
        
        print(sunPlazaPhoto ?? "")
        print(sunPhoto ?? "")
    })
    .sink(receiveValue: { _ in })
    .store(in: &subscriptions)
```
Khi sử dụng toán tử `.zip`, ở handleEvents ta sẽ có nhận được 2 output chính là giá trị nhận được từ 2 publisher.<br>
Chạy thử rồi xem kết quả.<br>
Ngoài ra, bạn có thể sử dụng các reactive programming khác như Rxswift..<br>
Chúc các bạn thành công!!!
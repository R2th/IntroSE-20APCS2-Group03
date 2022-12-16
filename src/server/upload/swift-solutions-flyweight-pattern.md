The flyweight pattern là một mẫu tiết kiệm bộ nhớ được sử dụng khi có nhiều đối tượng được khởi tạo có chung điểm tương đồng. Trong bài đăng này, chúng ta sẽ minh họa và mã hóa flyweight pattern trong Swift. Sau khi đọc bài viết này, bạn sẽ biết cách tiết kiệm bộ nhớ khi phải tạo ra một khối lượng lớn các đối tượng liên quan.
### Illustration
Để bắt đầu, hãy để sử dụng ví dụ cổ điển của trình soạn thảo văn bản. Trình soạn thảo văn bản khởi tạo và sử dụng tất cả 26 chữ cái của bảng chữ cái nhiều lần. Chẳng hạn, khi gõ “HELLO WORLD”, chúng ta tạo lại ký tự  “L”  ba lần khác nhau. Điều này là lãng phí vì chúng ta tạo ba đối tượng ký tự để thể hiện cùng một chữ cái chính xác. Mục tiêu của flyweight pattern là chia sẻ các đối tượng có thể tái sử dụng thay vì không cần sao chép chúng, cho phép trình soạn thảo văn bản của chúng tôi gọn nhẹ.

Mặt khác, dữ liệu nội tại thể hiện những gì vẫn giữ nguyên giữa các ký tự. Một ví dụ về dữ liệu nội tại sẽ là hình dạng của một ký tự nhất định. Tất cả các ký tự lặp lại là một hình dạng được hiển thị và hình dạng không thay đổi từ lần xuất hiện này sang lần xuất hiện tiếp theo. Chúng ta có thể sử dụng cùng một hình dạng “L”  mỗi khi character xuất hiện trong suốt tác phẩm của chúng ta và áp dụng các thuộc tính bên ngoài cho nó sau đó.

**Tóm tắt:** 
   - Dữ liệu nội tại là bất biến, giống hệt nhau, không có ngữ cảnh và kết quả là có thể tái sử dụng. 
   - Dữ liệu bên ngoài là có thể thay đổi và theo ngữ cảnh, và kết quả là, không thể sử dụng lại trong tất cả các trường hợp.

#### Implementation

 ```swift 
 protocol Soldier {
  func render(from location: CGPoint, to newLocation: CGPoint)
}

   ```
   
**Flyweight**

 ```swift 
 class Infantry: Soldier {
  
  private let modelData: Data
  
  init(modelData: Data) {
    self.modelData = modelData
  }
  
  func render(from location: CGPoint, to newLocation: CGPoint) {
    // Remove rendering from original location
    // Graphically render at new location
  }
}

   ```
   
   Infantry của chúng ta phù hợp với Soldier và đóng vai trò là đối tượng bay bổng . Là flyweight của chúng ta, nó lưu trữ dữ liệu nội tại trong thuộc tính modelData. Thuộc tính giả này chứa đồ họa để kết xuất Infantries. Vì tất cả các Infantries trong army của chúng ta trông giống nhau, sử dụng một mô hình để kết xuất tất cả chúng.
   
   
  ####  Client
  
  Chúng ta vẫn đang thiếu một client để lưu trữ tất cả dữ liệu bên ngoài.
  ```swift 
  
  class SoldierClient {
  
  // 1
  var currentLocation: CGPoint
  
  // 2
  let soldier: Soldier
  
  init(currentLocation: CGPoint, soldier: Soldier) {
    self.currentLocation = currentLocation
    self.soldier = soldier
  }
  
  // 3
  func moveSoldier(to nextLocation: CGPoint) {
    soldier.render(from: currentLocation, to: nextLocation)
    currentLocation = nextLocation
  }
}

  ```
  ###    Factory
  
  Khách hàng của chúng tôi đề cập đến một đối tượng phù hợp với Soldier, nhưng làm thế nào để chúng tôi đảm bảo nhiều khách hàng không tạo các tham chiếu trùng lặp? Nếu tất cả các loại Bộ binh giống hệt nhau và có thể chia sẻ, nó sẽ đánh bại mục đích của mẫu nếu nhiều đối tượng bộ binh được khởi tạo trong ứng dụng của chúng tôi. Cần đảm bảo tất cả khách hàng chỉ chia sẻ một đối tượng bộ binh. Đây là nơi một đối tượng nhà máy trở nên hữu ích:
  
  ```swift 
  class SoldierFactory {
  
  // 1
  enum SoldierType {
    case infantry
  }
  
  // 2
  private var availableSoldiers =  [SoldierType: Soldier]()
  
  // 3
  static let sharedInstance = SoldierFactory()
  
  private init(){}
  
  private func createSoldier(of type: SoldierType) -> Soldier {
    switch type {
    case .infantry:
      let infantry = Infantry(modelData: Data())
      availableSoldiers[type] = infantry
      return infantry
    }
  }
  
  // 4
  func getSoldier(type: SoldierType) -> Soldier {
    if let soldier = availableSoldiers[type] {
      return soldier
    } else {
      let soldier = createSoldier(of: type)
      return soldier
    }
  }
}

  ```
  
  Công việc của đối tượng nhà máy là đảm bảo chỉ có một người lính cụ thể thuộc loại nhất định được khởi tạo. Nếu đối tượng không tồn tại, nó được tạo, thêm vào từ điển có sẵn và trả lại cho người gọi. Lần tới, một khách hàng khác cần một bộ binh, đơn giản là họ sẽ sử dụng lại khách hàng hiện có. Đây là một sự cố từng bước:
Tạo một bảng liệt kê của tất cả các binh sĩ cụ thể có thể. Chúng tôi chỉ có một, nhưng bạn có thể tưởng tượng được thêm vào theo thời gian (Cung thủ, có ai không?)
Lưu trữ một từ điển riêng có chứa tất cả các binh sĩ ngay lập tức.
Chúng tôi đảm bảo rằng nhà máy của chúng tôi là một singleton. Chúng tôi muốn tất cả người gọi tham khảo cùng một nhóm đối tượng, vì vậy họ cũng chia sẻ một nhà máy. Để có cách xử lý phù hợp với singletons, vui lòng đọc Swift Solutions: Singleton.
Bất cứ khi nào khách hàng yêu cầu một người lính, chúng tôi sẽ kiểm tra xem nó đã tồn tại trong sẵn có. Nếu không, chúng tôi khởi tạo và lưu trữ nó trong từ điển, và sau đó trả lại. Tất cả các yêu cầu trong tương lai cho trẻ sơ sinh được sử dụng lại thay vì được tạo lại.
  
  ### Usage
  
  
  ```swift 
  let soldierFactory = SoldierFactory.sharedInstance
let infantry = soldierFactory.getSoldier(type: .infantry)
let firstSoldier = SoldierClient(currentLocation: CGPoint.zero, soldier: infantry)
let secondSoldier = SoldierClient(currentLocation: CGPoint(x: 5, y: 10), soldier: infantry)

firstSoldier.moveSoldier(to: CGPoint(x: 1, y: 5))
  
 
  ```
  
  Trước tiên chúng tôi tạo một tham chiếu đến SoldierFactory của chúng tôi, sau đó chúng tôi có được một tham chiếu đến đối tượng bộ binh của chúng tôi. Vì đây là lần đầu tiên chúng tôi yêu cầu bộ binh, một trường hợp mới được tạo và lưu trữ trong nhà máy. Sau đó chúng tôi tạo ra hai bộ binh với các địa điểm khác nhau và tiến hành di chuyển người lính đầu tiên của chúng tôi đến một địa điểm khác.
  
### Final Thoughts
    
   Có những biến thể của mô hình này chúng ta nên đề cập. Một số phiên bản lưu trữ nhà máy bên trong client và có tất cả trạng thái bên ngoài được tính toán. Có những lợi ích cho cách tiếp cận này, nhưng vì đơn giản, chúng nằm ngoài phạm vi của bài viết này.
Thay vào đó, tôi đã đưa ra một triển khai thay thế vì mục đích ngắn gọn. Mặc dù số lượng khách hàng tăng lên với mỗi soldier được rendered, nhưng chi phí sẽ giảm đáng kể vì trạng thái nội tại được chia sẻ. Khái niệm cốt lõi của hạng ruồi đã được chứng minh.
Vì vậy, trong tương lai, bất cứ lúc nào bạn nhận thấy nhu cầu khởi tạo một số lượng lớn các đối tượng chia sẻ những gì có thể được tách biệt dưới dạng dữ liệu nội tại, hãy tiếp cận với mẫu này. Hiệu suất rất quan trọng đối với người dùng và mô hình này chắc chắn mang lại!

Referent from Source: [Link](https://medium.com/@emanharout/swift-solutions-flyweight-pattern-7b9dcae59f35)
State là không thể tránh khỏi trong bất kỳ ứng dụng hiện đại nào, nhưng với SwiftUI, điều quan trọng cần nhớ là tất cả các views của chúng ta chỉ đơn giản là functions của trạng thái của chúng - chúng ta không trực tiếp thay đổi view mà thay vào đó thao tác trên state và để điều đó quyết định kết quả.

SwiftUI cho chúng ta rất nhiều cách để lưu trữ trạng thái trong ứng dụng, nhưng chúng khác nhau một cách tinh tế và điều quan trọng là phải hiểu chúng khác nhau như thế nào để sử dụng đúng cách.

Cách đơn giản nhất để làm việc với trạng thái là **@State**, được sử dụng như sau:

```
struct ContentView: View {
    @State private var tapCount = 0

    var body: some View {
        Button("Tap count: \(tapCount)") {
            tapCount += 1
        }
    }
}
```

Điều này tạo ra một thuộc tính bên trong một view, nhưng nó sử dụng **@State** để yêu cầu SwiftUI quản lý bộ nhớ. Điều quan trọng: tất cả các view của chúng ta đều là  dạng cấu trúc (struct), có nghĩa là chúng không thể thay đổi được và nếu chúng ta thậm chí không thể sửa đổi một số nguyên trong ứng dụng của mình thì chúng ta sẽ không thể làm được gì nhiều. Vì vậy, khi chúng ta nói **@State** để tạo một thuộc tính, chúng ta giao quyền kiểm soát nó cho SwiftUI để nó vẫn tồn tại trong bộ nhớ miễn là view còn tồn tại. Khi trạng thái đó thay đổi, SwiftUI biết tự động tải lại view với những thay đổi mới nhất để nó có thể phản ánh thông tin mới của nó.

**@State** rất phù hợp cho các thuộc tính đơn giản thuộc về một view cụ thể và không bao giờ được sử dụng bên ngoài view đó, do đó, điều quan trọng là phải đánh dấu các thuộc tính đó là riêng tư (**private**) để thực thi lại ý tưởng rằng trạng thái đó được thiết kế đặc biệt không bao giờ thoát khỏi view.

Cuối cùng hãy nhớ rằng **@State** chỉ dùng cho những kiểu dữ liệu cơ bản, đừng dùng nó với object.

### What is @ObservedObject?

Đối với các thuộc tính phức tạp hơn - khi bạn có một loại tùy chỉnh mà bạn muốn sử dụng có thể có nhiều thuộc tính và phương thức hoặc có thể được chia sẻ trên nhiều view - thay vào đó, bạn sẽ thường sử dụng **@ObservedObject**.

Điều này rất giống với **@State** ngoại trừ bây giờ chúng ta đang sử dụng một loại tham chiếu bên ngoài thay vì một thuộc tính cục bộ đơn giản như một chuỗi hoặc một số nguyên. Bạn vẫn đang nói rằng view của bạn phụ thuộc vào dữ liệu sẽ thay đổi, ngoại trừ bây giờ đó là dữ liệu do bạn tự chịu trách nhiệm quản lý - bạn cần tạo một instance của class, tạo các thuộc tính của riêng nó, v.v.

Bất kỳ loại nào bạn sử dụng với **@ObservedObject** đều phải tuân theo giao thức **ObservableObject**. Khi bạn thêm thuộc tính vào observable object, bạn sẽ quyết định xem các thay đổi đối với từng thuộc tính có buộc các view đang theo dõi đối tượng của bạn refresh hay không. Bạn thường sẽ làm như vậy, nhưng không bắt buộc.

Có một số cách để observable object thông báo cho các views rằng dữ liệu quan trọng đã thay đổi, nhưng cách dễ nhất là sử dụng trình bao bọc thuộc tính **@Published**. Bạn cũng có thể sử dụng các custom publishers từ Combine nếu bạn cần kiểm soát nhiều hơn, nhưng trên thực tế, điều này sẽ rất hiếm. Nếu observable object tình cờ có một số views sử dụng dữ liệu của nó, một trong hai tùy chọn sẽ tự động thông báo cho tất cả chúng.

**Warning: Khi bạn sử dụng 1 custom publisher để thông báo rằng object của bạn đã thay đổi, điều này cần được thực hiện ở main thread.**

### What is @StateObject?

Đâu đó giữa **@State** và **@ObservedObject** nằm ở **@StateObject**. Đây là phiên bản chuyên biệt của **@ObservedObject** và nó hoạt động theo cách gần như giống hệt nhau: bạn phải tuân theo giao thức ObservableObject, bạn có thể sử dụng @Published để đánh dấu các thuộc tính là gây ra thông báo thay đổi và bất kỳ view nào theo dõi @StateObject sẽ làm mới body của chúng khi object thay đổi.

Có một điểm khác biệt quan trọng giữa **@StateObject** và **@ObservedObject**, đó là quyền sở hữu - view nào đã tạo ra đối tượng và view nào chỉ lắng nghe nó.

Quy tắc là thế này: bất kỳ view nào là lần đầu tiên tạo đối tượng của bạn phải sử dụng **@StateObject**, để cho SwiftUI biết nó là chủ sở hữu của dữ liệu và chịu trách nhiệm giữ cho nó tồn tại. Tất cả các view khác phải sử dụng **@ObservedObject**, để cho SwiftUI biết rằng họ muốn xem đối tượng để biết các thay đổi nhưng không sở hữu trực tiếp đối tượng đó.

### What is @EnvironmentObject?

Bạn đã thấy cách **@State** khai báo các thuộc tính đơn giản cho một kiểu tự động làm mới view khi nó thay đổi và cách **@ObservedObject** khai báo một thuộc tính cho một kiểu bên ngoài có thể hoặc không thể làm mới view khi nó thay đổi . Cả hai điều này phải được đặt bởi view của bạn, nhưng **@ObservedObject** có thể được chia sẻ với các views khác.

Có một loại trình bao bọc thuộc tính khác có sẵn để sử dụng, đó là **@EnvironmentObject**. Đây là giá trị được cung cấp cho các view của bạn thông qua chính ứng dụng - đó là dữ liệu được chia sẻ mà mọi view đều có thể đọc nếu họ muốn. Vì vậy, nếu ứng dụng của bạn có một số dữ liệu mô hình quan trọng mà tất cả các views cần đọc, bạn có thể chuyển nó từ view này sang view khác hoặc chỉ cần đặt nó vào môi trường mà mọi views đều có quyền truy cập tức thì.

Hãy coi  **@EnvironmentObject** là một tiện ích lớn cho những lúc bạn cần chuyển nhiều dữ liệu xung quanh ứng dụng của mình. Bởi vì tất cả các views đều trỏ đến cùng một mô hình, nếu một views thay đổi mô hình thì tất cả các views sẽ cập nhật ngay lập tức - không có nguy cơ làm cho các phần khác nhau của ứng dụng của bạn không đồng bộ.


### Tổng hợp sự khác biệt
- Sử dụng **@State** cho các thuộc tính đơn giản thuộc về một view duy nhất. Chúng thường phải được đánh dấu là **private**.
Sử dụng **@ObservedObject** cho các thuộc tính phức tạp có thể thuộc về một số dạng views. Hầu hết khi bạn đang sử dụng một loại tham chiếu, bạn nên sử dụng @ObservedObject cho nó.
Sử dụng **@StateObject** một lần cho mỗi đối tượng có thể quan sát mà bạn sử dụng, ở nơi mà bạn khởi tạo nó.
Sử dụng **@EnvironmentObjec** cho các thuộc tính đã được tạo ở nơi khác trong ứng dụng, chẳng hạn như dữ liệu được chia sẻ.
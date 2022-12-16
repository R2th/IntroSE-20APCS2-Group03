Nếu bạn có danh sách SwiftUI có nhiều hàng, bạn có thể thấy việc cập nhật rất chậm khi sắp xếp hoặc lọc các hàng đó - mã s có thể mất một hoặc hai giây hoặc nếu bạn có nhiều mục hoặc bạn có thể mất một vài phút.
Tôi sẽ chỉ cho bạn biết mã nào gây ra sự cố, sau đó chỉ cho bạn một dòng mã SwiftUI sửa lỗi đó và cuối cùng là phần quan trọng nhất: giải thích tại sao sự cố xảy ra để bạn sử dụng mã đúng cách.

Hãy cùng đến với Xcode

### Our problem code

Đây là một đoạn mã SwiftUI ngắn gọn thể hiện vấn đề:

```
struct ContentView: View {
    @State var items = Array(1...600)

    var body: some View {
        VStack {
            Button("Shuffle") {
                self.items.shuffle()
            }

            List(items, id: \.self) {
                Text("Item \($0)")
            }
        }
    }
}
```

Tôi có một view với một thuộc tính, đó là một mảng gồm 600 số nguyên từ 1 đến 600.

Bên trong body có một VStack với Button shuffles các item mỗi lần nhấn và *List* hiển thị tất cả các vật phẩm. Xáo trộn mảng là cách chúng tôi mô phỏng bạn thay đổi các mục, bởi vì nó buộc danh sách phải cập nhật các hàng của nó.

Nếu bạn chạy mã đó trong simulator, bạn sẽ thấy button and list of items và nếu bạn tiếp tục nhấn nút, bạn sẽ thấy không có gì xảy ra - ít nhất là lúc đầu. Nếu chúng tôi chờ đợi lâu hơn một chút, các danh sách cập nhật được thay đổi liên tục. Và nếu bạn nhấn nút lần nữa, điều tương tự sẽ xảy ra - thực tế nó xảy ra mỗi khi bạn sắp xếp hoặc lọc danh sách.

Nhấn nó lần cuối, nhưng lần này tôi muốn bạn mở trình điều hướng gỡ lỗi của Xcode trước để bạn có thể thấy việc sử dụng CPU. Khi bạn nhấn Shuffle, bạn sẽ thấy CPU tối đa hóa toàn bộ thời gian trong khi các mục đang được xáo trộn, vì vậy nó không giống như chương trình sắp ngủ.

### one-line fix for slow SwiftUI lists

Tôi sẽ chỉ cho bạn chính xác lý do tại sao điều này xảy ra chỉ trong chốc lát, nhưng trước tiên tôi muốn chỉ cho bạn cách khắc phục. Quay lại Xcode, thêm đoạn mã này vào danh sách - không phải vào các mục trong danh sách, mà vào chính danh sách.

```
.id(UUID())
```

Code bạn sẽ trông như thế này:

```
List(items, id: \.self) {
    Text("Item \($0)")
}
.id(UUID())
```

Bây giờ nếu bạn chạy lại mã, bạn sẽ thấy bạn có thể nhấn Shuffle bao nhiêu lần tùy thích và nó sẽ cập nhật ngay lập tức. Nếu bạn nhấn nó thật nhanh, bạn có thể thấy việc sử dụng CPU tăng lên, nhưng điều đó hầu như không gây ra sự bất ngờ nào.

Vì vậy, đó là vấn đề và đó là cách nó khắc phục. Nhưng tôi không muốn bạn chỉ sao chép mã vào dự án của mình và hy vọng điều tốt nhất, vì điều đó không dạy cho bạn bất cứ điều gì và bạn đang bỏ lỡ cơ hội tìm hiểu thêm về cách SwiftUI hoạt động.

### Điều gì làm cho nó chậm?

Nhận xét cách khắc phục một dòng của chúng tôi để chúng tôi quay lại mã cũ một lần nữa, sau đó chuyển đến Product menu and chọn Profile. Điều này sẽ khởi chạy Instruments, là công cụ phân tích hiệu suất tích hợp của Xcode.

Có rất nhiều cách để các công cụ có thể kiểm tra mã của chúng tôi, nhưng tùy chọn tốt nhất ở đây là Time Profiler vì nó báo cáo những gì mã của chúng tôi đã làm trong khi nó đang chạy. Bây giờ hãy nhấn Record, điều này sẽ khiến ứng dụng khởi chạy trong trình giả lập trong khi Time Profiler đang xem.

Hàng trên cùng này là mức sử dụng CPU và có một chút đột biến ở đó khi ứng dụng khởi chạy, nhưng nó ổn định về 0 vì ứng dụng của chúng tôi chỉ ở chế độ chờ. Bây giờ hãy xem điều gì xảy ra khi bạn chuyển sang trình giả lập và nhấn Shuffle. Việc sử dụng CPU tăng đột biến lên tối đa và về cơ bản chỉ ở đó trong vài giây trong khi danh sách đang được cập nhật.
Vì vậy, CPU đang được tối đa hóa, nhưng điều đó không cho chúng ta biết bất cứ điều gì chúng ta chưa biết. Để xem lý do tại sao nó được tối đa hóa, chúng ta cần tìm kiếm trong các Time Profilers, và đặc biệt chúng ta nên tìm kiếm dấu vết ngăn xếp nặng nhất. Đây là một tính năng tuyệt vời trong Instruments cho chúng tôi biết một đoạn mã nào mất nhiều thời gian nhất trong chương trình của chúng tôi, vì vậy nếu bạn muốn tìm kiếm chỉ một đoạn mã để tối ưu hóa thì đây thường là một nơi tốt để bắt đầu.

Bạn có thể thấy một số thứ có màu trắng và những thứ khác màu xám; mã trắng là mã riêng của chúng tôi, trong khi thứ màu xám là mã khung của Apple. Bạn có thể thấy bên cạnh mỗi tên phương thức là một con số cho chúng ta biết đã dành bao nhiêu mili giây cho mỗi phương thức và bạn có thể thấy rằng hàng ngàn mili giây đã được sử dụng trong *PlatformViewChild.update (), hàng nghìn mili giây trong ListCoreBatchUpdates.formUpdates () trong computeRemoveAndInserts (), v.v.*

Cuối cùng, bạn đến CollectionChanges.formChanges và trong thử nghiệm của tôi, 4833 mili giây đã được sử dụng ở đó. Dưới 2818 mili giây đó trong Collection.commonPrefix và dưới 1433 mili giây trong giao thức này chứng kiến cho Collection.subcript.read. Giữa ba phương thức này là một khoảng cách 3,4 giây và công việc sẽ tiếp tục đi xuống sau đó. 368/5000
Vì vậy, dấu vết ngăn xếp nặng nhất của chúng tôi - thứ mà một đoạn mã gây ra nhiều công việc nhất - đang nói với chúng tôi rằng Collection.formChanges cuối cùng chịu trách nhiệm cho 4,8 giây làm việc. Và trong đầu ra Time Profiler chính, bạn có thể thấy rằng tổng thời gian CPU trên toàn bộ quá trình chỉ là 5,17 giây. Điều đó có nghĩa là gọi Collection.formChanges là phần lớn công việc của chúng tôi.

### It's a different list, promise!

Quay lại mã của chúng tôi, bạn có thể thấy vấn đề là gì. Danh sách của chúng tôi hiển thị tất cả 600 chuỗi trong mảng vật phẩm và mảng được đánh dấu bằng @State. Đó là trình bao bọc thuộc tính Swift cho phép thay đổi giá trị của chế độ xem của chúng tôi, nhưng điều đó cũng có nghĩa là khi mảng thay đổi, thuộc tính cơ thể sẽ được kích hoạt lại - nó sẽ cập nhật khung nhìn để phản ánh những thay đổi đó.

Bản thân danh sách đã không thay đổi, nhưng những thứ bên trong danh sách - các hàng đến từ các mặt hàng - đã thay đổi, vì giờ đây chúng đã được xếp theo thứ tự mới. Vì vậy, List quyết định nó muốn xem các mục đã thay đổi như thế nào, vì vậy, nó đi qua các mục ban đầu của nó và các mục mới và tìm ra mục nào mới, đã bị xóa và vừa được di chuyển. Đây là một tính năng thực sự gọn gàng, vì nó cho phép danh sách làm động các thay đổi của nó và đó cũng là lý do Danh sách cần có tham số id đó - nó cần có thể xác định từng hàng duy nhất, để nó có thể biết khi nào chúng di chuyển.

Vấn đề là, nó đang cố gắng so sánh 600 mặt hàng với 600 mặt hàng khác và điều đó cực kỳ chậm. Tệ hơn, nếu chúng ta đã sử dụng 10.000 hàng, mã sẽ không bao giờ kết thúc; nó sẽ mất quá nhiều thời gian.

Hãy tiếp tục và bỏ qua sửa lỗi của chúng tôi cho vấn đề này, đó là sử dụng công cụ sửa đổi *id ()* với UUID mới. Mỗi lần bạn tạo UUID, bạn nhận được một chuỗi chữ cái và số khác nhau được đảm bảo là duy nhất - bạn có thể tự thử nó trên thiết bị đầu cuối bằng cách gọi lệnh *uuidgen* một vài lần.

Hãy nhớ rằng, SwiftUI gọi body mỗi khi thuộc tính @State thay đổi, điều đó có nghĩa là chúng ta sẽ nhận được UUID mới mỗi khi mảng thay đổi. UUID mới đó sau đó đi vào công cụ sửa đổi id (), được sử dụng để xác định duy nhất các khung nhìn. Chúng tôi đã nói với SwiftUI rằng danh sách này có một định danh duy nhất và định danh đó là một UUID mới mỗi lần.

Đó là lý do tại sao bản sửa lỗi một dòng của chúng tôi hoạt động rất tốt: chúng tôi đang tạo cho SwiftUI nghĩ rằng bản thân danh sách là khác nhau nên họ không cố gắng nhìn vào bên trong để tìm ra sự khác biệt. 

Bây giờ, có một nhược điểm khi sử dụng id () như thế này: bạn sẽ không nhận được animation. Hãy nhớ rằng, chúng tôi đang nói với SwiftUI một cách hiệu quả danh sách cũ đã biến mất và bây giờ có một danh sách mới, điều đó có nghĩa là nó sẽ không cố gắng di chuyển các hàng xung quanh với animation. Tuy nhiên, nếu ứng dụng của bạn đóng băng trong 10 giây vì SwiftUI tính toán sự khác biệt, mất animation là một cái giá nhỏ phải trả!

Bài viết được tham khảo từ https://www.hackingwithswift.com/articles/210/how-to-fix-slow-list-updates-in-swiftui
Cảm ơn các bạn đã đọc bài viết!
> Xcode 13 đã xuất hiện tại WWDC21 và kết hợp vô số các yếu tố mới, nâng cấp và cải tiến hiệu suất. Trong bài viết này, mình sẽ chia sẻ với bạn những thay đổi chính mà mình thấy hấp dẫn và hữu ích.

### 1. Swift

Swift hiện hỗ trợ lập trình đồng thời bằng cách sử dụng async / await và các actors. 

Nếu bạn có code đang sử dụng `completionHandler`, bạn có thể refactor lại chúng một cách dễ dàng. Tái cấu trúc mới giúp chuyển sang mã bất đồng bộ. **“Convert Call to Async Alternative”** có sẵn trên các lệnh gọi có `completionHandler` làm đối số cuối cùng của chúng, và refactor lại chúng để sử dụng các tính năng ngôn ngữ bất đồng bộ mới.

![](https://images.viblo.asia/94e6d44b-8486-4bed-9193-75bed8d14005.png)

Các hàm bất đồng bộ có thể tạo đồng thời thực thi các tác vụ con với binding `async let` , và các biến `async let` khai báo `await` tại điểm chúng được sử dụng. `async let` đợi cho đến khi tác vụ con hoàn thành và trả về một giá trị.

ví dụ như sau:

```
func chopVegetables() async throws -> [Vegetables]
func marinateMeat() async -> Meat
func preheatOven(temperature: Int) async -> Oven
func makeDinner() async throws -> Meal { 
    async let veggies = chopVegetables()  
    async let meat = marinateMeat()  
    async let oven = preheatOven(temperature: 350)
    let dish = Dish(ingredients: await [try veggies, meat])  
    return try await oven.cook(dish, duration: .hours(3))}
}
```

Tất cả các tác vụ con hoàn thành trước scope mà chúng được khai báo là exits.

### 2. Source Control

Giờ đây, bạn có thể create, review và merge các pull requests bằng cách sử dụng các tính năng kiểm soát mã nguồn của Xcode, khi đăng nhập vào tài khoản máy chủ GitHub hoặc Bitbucket.

Giờ đây, bạn có thể bật xem lại code trong bất kỳ trình chỉnh sửa nào (hoặc phân tách trình chỉnh sửa) từ thanh tab tài liệu và nó hiển thị các so sánh trong bản trình bày nội tuyến theo mặc định. Các bộ chọn commit mới ở cuối trình chỉnh sửa cho phép bạn tùy chỉnh để hiển thị được sự khác biệt.

### 3. VIM

Xcode 13 hiện hỗ trợ liên kết khóa Vim và nếu bạn quan tâm, bạn có thể tìm thêm lệnh trong [VIM Cheat sheet.](https://vim.rtorr.com/)

### 4. DocC: Trình biên dịch tài liệu 

**DocC** là một công cụ tài liệu mới trong Xcode 13 mở rộng dựa trên cú pháp Markdown hiện có cho tài liệu mã nguồn. Bên cạnh tham chiếu API, bạn có thể tạo các bài viết và hướng dẫn cho các gói của mình và tạo kho lưu trữ tài liệu.

### 5. Code Auto Completion

Xcode 13 bao gồm tính năng tự động hoàn thành đoạn code Swift, được thiết kế lại nhằm tối đa hóa độ tin cậy và hiệu suất, đặc biệt là khi có sự mâu thuẫn về cấu trúc và logic trong mã nguồn dự án. Code completion trong Xcode 13 giúp bạn nhanh chóng kết thúc suy nghĩ của mình, ngay cả khi nguồn xung quanh bị hỏng. Việc hoàn thành diễn ra nhanh hơn và mang tính dự đoán cao hơn, gợi ý những lần hoàn thành có nhiều khả năng xảy ra nhất sau khi nhập ít hơn.

Ngoài ra để hoàn thành types và các methods , code completion trong Xcode 13 cung cấp toàn bộ các câu lệnh như `for item in items {` hoặc `guard let item = item else { return nil }` và thậm chí toàn bộ câu lệnh `switch` với các trường hợp `enum` đi kèm.  Code completion cũng tìm kiếm trên các thuộc tính để cung cấp các chuỗi hoàn thành như `layer.cornerRadius`.

Hoàn thành mã giúp bạn hoàn thành các biểu thức chưa đúng. Nó tìm và xác định các loại trong các modul bạn chưa nhập và tự động thêm các thao tác nhập cần thiết. Khi nguồn xung quanh có lỗi, quá trình hoàn thành mã vẫn mang ý nghĩa của bạn. Nó cung cấp sự hoàn thành mà bạn đang tìm kiếm với một thông báo mô tả cách làm cho nó hợp lệ.

Khi mở rộng trình giữ chỗ thành một closure trong Swift, việc hoàn thành mã sử dụng tên đối số của closure thay vì `<# Type #>`.

Xcode hiện tự động unwrap các optionals.

### 6. Column Breakpoints

Để đặt điểm ngắt cột trên một dòng, hãy bấm **Command** vào biểu thức rồi chọn "**Set Column Breakpoint**" từ menu tác vụ.

```
func findMultiplesOf2() -> [Int] {
   return [1,2,3,4,5].map { $0 * 2 }.filter { $0.isMultiple(of: 2) }
}
```

Bây giờ bạn có thể đặt điểm dừng tại `filter { $0.isMultiple(of: 2) }` bằng cách nhấp chuột phải vào `filter` rồi chọn `Code Actions` -> `Set Column Breakkpoint`

![](https://images.viblo.asia/09090cab-4175-4898-b3e4-a48c204f2509.png)

### 7. Accessibility Settings

Giờ đây, bạn có thể xem trước các cài đặt trợ năng sau trong các scenes của trình tạo giao diện: Dynamic Type, Bold Text, Button Shapes, On/Off Labels, Increase Contrast,  và Reduce Transparency. Bạn có thể kích hoạt các cài đặt này bằng cách nhấp vào nút trợ năng trong thanh nút canvas và đặt chúng trong cửa sổ bật lên trợ năng.

### 8. Previews

Bản xem trước hiện hỗ trợ việc kiểm tra các phần tử trợ năng của một chế độ xem trong khi xem trước chế độ xem. Hỗ trợ này yêu cầu macOS 12.

![](https://images.viblo.asia/5b3bfccd-6659-47e0-a368-3fba2057301c.png)



### 9. Design

Xcode 13 có một trình điều hướng dự án được làm mới kết hợp các ký hiệu cho nhiều loại tài liệu khác nhau. Tên phần mở rộng tệp hiện được che một cách tự nhiên để có giao diện gọn gàng hơn nhiều. Rõ ràng, bạn có thể quyết định hiển thị chúng trong trường hợp bạn muốn.

![](https://images.viblo.asia/56dc4472-44f9-4eee-a201-8258160a2a66.png)


Nếu bạn muốn biết chuyên sâu hơn về những gì mình chia sẻ về Xcode 13, bạn có thể tìm hiểu [tại đây.](https://developer.apple.com/documentation/xcode-release-notes/xcode-13-beta-release-notes)

### 10. Kết luận 

Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn 😍.

Vậy là bài viết của mình đến đây là hết 😁. Cảm ơn các bạn đã theo dõi bài viết. 😃
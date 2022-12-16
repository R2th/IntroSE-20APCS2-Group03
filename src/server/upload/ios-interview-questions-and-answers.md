#  I. Giới thiệu 

   Ngôn ngữ Swift chỉ vừa mới bốn năm tuổi nhưng nó đã trở thành ngôn ngữ mặc định cho lập trình iOS. Vì Swift đã phát triển đến phiên bản 5.0, nó trở thành một ngôn ngữ phức tạp và mạnh mẽ bao hàm các mô hình lập trình hướng đối tượng và hướng chức năng. Mỗi phiên bản mới lại mang đến nhiều sự hoàn thiện và cải tiến tốt hơn.
   
   Dưới đây mình xin nêu vài câu hỏi có thể các bạn sẽ gặp phải khi đi phỏng vấn xin việc, hoặc các bạn cũng có thể đọc để củng cố lại kiến thức. Những câu hỏi này không phải do mình nghĩ ra, mà do mình tình cờ đọc được trên Medium.com. Bài viết này chỉ mang tính chất tham khảo, củng cố kiến thức cho vui, các bạn đi phỏng vấn mà bên tuyển dụng không hỏi câu nào trong đây thì cũng không được trách mình đâu nhé ! =)) 
#  II. Nội dung câu hỏi
 Optional là gì ?  
 -  Là một kiểu dữ liệu có thể chứa giá trị nil

  Optional Binding là gì  ? 
  - Là một phương thức để làm việc với kiểu dữ liệu optional và đảm bảo có dữ liệu trả ra bằng cách sửa dụng if let hoặc guard let

 Optional Chaining là gì ?
 - Là một chuỗi dữ liệu trong đó có ít nhất 1 phần tử trong chuỗi là kiểu Optional

  Phân biệt Optional và Implicitly Unwrapped Optional ?
  - Optional và Implicitly Unwrapped Optional đều là Optional nên nó đều có thể nhận các giá trị nil. 
Nhưng khác so với Optional, mỗi khi gọi một biến được khai báo là Implicitly Unwrapped Optional, nó sẽ được tự động Force Unwrap. Vì vậy khi gọi một biến Implicitly Unwrapped Optional lúc nó đang mang giá trị nil thì app sẽ bị crash. 
Chính vì thế, với các biến này chúng ta cũng phải kiểm tra nó trước khi sử dụng giống như sử dụng một biến Optional

Làm thế nào để tự động Force Unwrap một biến mỗi khi ta gọi đến nó ? 
- var optional: Int!

So sánh Thuộc tính tính toán và thuộc tính lưu trữ ? 

- Computed properties, một loại property không thật sự lưu trữ value, thay vào đó, nó cung cấp getter và optional setter để nhận và set những properties và gán giá trị một cách gián tiếp.
- Một stored property, class, structure và enums  là một constant hoặc variable được lưu trữ như là một phần của instance thuộc về một class hoặc structure cụ thể. Stored properties có thể là variable stored properties (với từ khoá var) hoặc constant stored properties (với từ khoá let).

Giải thích *var xx: Int {willSet { khác gì so với var yy: Int {didSet {*  ? 

- Với var xx: Int {willSet { : thì thực hiện các phương thức trước khi gán giá trị.
- Với var yy: Int {didSet { : thì thực hiện các phương thức ngay sau khi biến được gán giá trị


Array khác Dictionary như thế nào ? 

- Array thì quan tâm đến thứ tự, còn Dictionary thì ko quan tâm đến thứ tự


Array khác Set như thế nào ? 
 
- Array thì quan tâm đến thứ tự, còn Set thì ko quan tâm đến thứ thự và phần tử trong set không được lặp lại (nên các element trong Set phải implement Equatable)

Làm thế nào để tạo ra một biến mà nó chỉ được khởi tạo giá trị khi được gọi đến lần đầu tiên ?
- *- '  Lazy var XXX: 'Kiểu dữ liệu' = {
    return 'Giá trị tương ứng kiểu dữ liệu'
}()*


GET khác POST như thế nào?
- Get: Parameter truyền lên được đính trong url, 
- Post: Parameter truyền lên thì được đính trong Body

So sánh giữa Merge và Rebase ?
- Merge là gom tất cả những thay đổi của nhánh nguồn vào 1 commit merge trong nhánh hiện thời.
- Rebase là chuyển tất cả các commit của nhánh nguồn vào dưới cùng của nhánh hiện thời, sau đó apply từng commit trong nhánh hiện thời lên trên trên những commit đó 


Revert khác gì so với reset ? 
- Reset là xóa mọi sự thay đổi từ thời điểm hiện tại ngược lại cho đến commit được chọn. Revert là tạo một commit nghịch đảo mọi sự thay đổi của commit được chọn 


Cherry Pick là gì ?
- Sao chép các thay đổi từ 1 commit và apply vào branch hiện thời

Stash là gì ? 
- Lưu trữ những thay đổi vào một ngăn tạm

Merge Request là gì? 
- Tạo 1 yêu cầu để Gom tất cả các thay đổi từ nhánh khác vào 1 commit trên nhánh hiện đích

 Pull To Request là gì? 
- Tạo một yêu cầu để gom tất cả các thay đổi từ 1 nhánh trên repo khác vào một commit trên nhánh hiện thời của repo đích

 So sánh Hard Reset, Soft Reset
 - Hard reset là xóa hết commit đến commit được chọn. 
 - Còn Soft reset là xóa các commit nhưng vẫn giữ nguyên các thay đổi. 


Nêu các cách truyền dữ liệu ?
'- Có 06 cách truyền dữ liệu:
1. Segue để truyền dữ liệu đi. Unwind Segue để trả dữ liệu về 
2. Delegate 
3. Closure
4. NotificationCenter. 
5. Singleton (Một biến toàn cục sử dụng trên toàn ứng dụng khai báo dạng static).
6. UserDefault, CoreData, Reaml... sử dụng lưu dữ liệu xuống DataBase và load lên.
7. KVO

Singleton là gì và được sử dụng khi nào? 
- Definition: Singleton là pattern đảm bảo rằng một lớp chỉ có một instence duy nhất cung cấp một cổng giao tiếp chung nhất để truy cập vào lớp đó.
Example: 

             Class API  {
     
        static let shared: API = API()
  
               }
               
Trình bày vòng đời của một ViewController (bỏ qua LoadView) ?

- Vòng đời Viewcontroller: 
-ViewDidload -> ViewwillAppear -> ViewdidAppear -> ViewwilldisAppear -> ViewdidDisAppear
Detail:
-VIewdidLoad: được gọi khi Viewcontroller đã được nạp vào bộ nhớ.(set up data or khởi tạo object ,UI trên màn hình)
-ViewwillAppear: được gọi trước khi một view hiển thị lên
-ViewdidAppear: gọi khi view đã được hiển thị lên màn hình
-ViewwillDisappear: Gọi khi 1 view đã ẩn khỏi màn hình và animation khi ẩn view đó.
-VIewDidDisAppear: gọi khi một view đã ẩn khỏi màn hình


Trình bày vòng đời của một App ?

- Đầu tiên vào DidFinishLaunching -> (WillEnterForcegrounh -> DidBecomeActive -> WillResignActive -> DidEnterBackgrouch) -> WillTerminate

Unowned VS Weak như thế nào? 
- Unowned là một Non-Optional. Vòng đời của nó trùng với vòng đời Object. Nghĩa là nó được tạo cùng Object, và được giải phóng khi object bị giải phóng. Không một object nào được trỏ đến nó, nên nó có tên là Unowned.

- Weak là một biến Optional. Nó có thể được khởi tạo sau, và có thể tiếp tục tồn tại sau khi object trỏ đến nó bị giải phóng.

Tạm thời mới tìm hiểu tới đây phần sau mình sẽ viết thêm ....
SwiftUI là một Framework được Apple giới thiệu tại sự kiện WWDC2019 để xử lý thiết kế giao diện theo phong cách mới nhằm khắc phục các vấn đề mà mọi người gặp phải với cách tiếp cận Swift + Interface Builder cũ. 
Một tư tưởng quan trọng của SwiftUI đó là những gì hiển thị lên Views là kết quả của State tương ứng - Chúng ta không thay đổi trực tiếp Views, thay vào đó, khi State bị thay đổi, nó sẽ làm cho View  tự động cập nhật theo. Chắc nhiều bạn sẽ không hiểu State nói tới ở đây là gì.\
Apple định nghĩa khái niệm đó như sau:
 ![](https://images.viblo.asia/fbaadeaa-eb56-420b-abfa-5e8714862709.png)
 
Hơi khó để dịch khái niệm này, nhưng có thể hiểu đơn giản, State bao gồm dữ liệu mà ta đổ lên View như text set cho Label, data hiển thị lên Tableview hoặc các biến trạng thái như isVisible chúng ta tạo ra để set trạng thái cho 1 view hiện ra hoặc ẩn đi. Và khi những giá trị đó thay đổi, UI sẽ tự động cập nhật thay vì chúng ta phải tự tay gọi các hàm như tableView.reloadData(), titleLabel.isHidden == isVisible, ...

Việc này hỗ trợ rất nhiều trong việc bindingData trong mô hình MVVM.
SwiftUI hỗ trợ chúng ta một số cách để lưu giữ State trong ứng dụng. Mới tiếp cận sẽ khó nhận ra sự khác nhau giữa chúng, nhưng việc phân biệt được các khái niệm là rất quan trọng để sử dụng framework đúng cách. 

## @State
Trước khi nói về @State, có một vấn đề mà các bạn phải nắm được, đó là trong SwiftUI, các Views đều là Structs, đồng nghĩa nó không thể bị thay đổi. Hơi khó hiểu phải không, hãy thử một ví dụ đơn giản như sau. Khai báo một biến detailText dạng String.  Trên view, có 1 button và 1 Text (Giống với Label khi dùng Storyboards) hiển thị giá trị của detailText, khi ấn button, detailText được gắn lại và nội dung trên Text cũng bị thay đổi theo. Ta sẽ thử đoạn code như sau:

![](https://images.viblo.asia/e206fe61-8ff0-443c-8f57-7c15287c41cc.png)
Ta thấy báo lỗi "... 'self' is immutable". Vấn đề là do View không thể thay đổi, điều mà mình đã nhắc đến trước đó (detailText được khai báo trong View). Vậy ta phải xử lý thế nào ?

Ta sẽ thêm từ khoá @State trước khi khai báo. Điều này đồng nghĩa ta sẽ uỷ thác cho SwiftUI lưu trữ giá trị biến đó trong bộ nhớ chừng nào View còn tồn tại. Và khi State có sự thay đổi, SwiftUI sẽ tự động hiểu để cập nhật lại View tương ứng với trạng thái mới nhất của dữ liệu. Quay lại ví dụ bãn nãy

![](https://images.viblo.asia/bc14e01a-eb15-4fe9-92b2-cd4fe28a7566.png)

Thêm @State và từ khoá Self (truy cập biến trong Closure) thấy không còn lỗi nữa. Build và Run lại project ta thu được kết quả mong muốn. Nhận thấy, khi ấn Button, ta thay đổi giá trị detailText và Text sẽ tự cập nhật mà không cần phải mất thêm 1 dòng set lại text như khi sử dụng UIKit.

@State là cách đơn giản, hiệu quả để sử dụng cho thuộc tính có kiểu dữ liệu đơn giản, thuộc về 1 view cụ thể và không bao giờ được truy xuất từ bên ngoài view đó. Đặc tính này cũng là sự khác biệt của @State so với các Wrapper khác.

Do đó các thuộc tính được khai báo @State nên được để private. Đây không phải điều bắt buộc nhưng nên được thêm vào để chỉ định nó không bao giờ được truy cập bên ngoài view chứa nó.

## @ObservedObject
Như đã nói ở trên, @State tỏ ra phù hợp với những thuộc tính có kiểu dữ liệu đơn giản. Vậy khi chúng ta muốn khai báo thuộc tính với kiểu dữ liệu phức tạp do chúng ta định nghĩa, hoặc chúng được chia sẻ giữa các views thì sao ??? -> @ObservedObject là một giải pháp
Tư tưởng của @ObservedObject khá tương đồng với @State, nhưng có một vài sự khác biệt:
- Chúng ta sẽ sử dụng các "External Reference Type" thay cho các "Simple Local Property" như string hay interger. Nhớ là Reference Type nhé, @ObservedObject không thể dùng cho Struct
- View vẫn tự cập nhật khi data được set cho nó thay đổi, trừ việc data sẽ do chúng ta chịu trách nhiệm quản lý (từ việc tạo thuộc tính, khởi tạo instance, ...)

Khi muốn sử dụng @ObservedObject, hãy đảm bảo Class đã implement ObservableObject protocol (Bắt buộc). Khi khai báo các thuộc tính cho ObservableObject, bạn sẽ phải quyết định thuộc tính nào sẽ được "theo dõi", tức là khi chúng thay đổi, view có bắt buộc phải được cập nhật lại hay không. Đây không phải điều bắt buộc nhưng đã sử dụng ObservableObject thì chắc hẳn bạn sẽ cần tới nó.

Có 1 số cách để thông báo cho các View rằng data đã bị thay đổi, nhưng đơn giản nhất là sử dụng @Published wrapper. Bạn cũng có thể sử dụng các custom publishers khác của Combine Framework để tăng tính kiểm soát nếu muốn. Do data được bind lên Views nên hãy đảm bảo việc thông báo data thay đổi và cập nhật giao diện xảy ra trên Main thread.

Giả sử ta có class MainViewModel đảm nhiện việc request API và trả về Data

![](https://images.viblo.asia/9186ecd9-b268-4851-804e-a746b6761cb9.png)

Bên ContentView, để hiển thị và cập nhật dữ liệu, ta gọi như sau
![](https://images.viblo.asia/29b86694-7770-4fab-9fdd-0d3972184629.png)


Lưu ý: Nếu nhiều Views sử dụng data của một Observable Object, khi object thay đổi, nó cũng sẽ tự động thông báo tới tất cả view đó.

## @EnvironmentObject
Khi chúng ta có một model data mà tất cả các views đều cần tới, chúng ta có thể sử dụng @EnvironmentObject.\
Tất cả các views có thể truy cập tới giá trị của một @EnvironmentObject model nếu chúng muốn, do đó đây là một cách thuật tiện nếu chúng ta muốn chuyển dữ liệu xung quanh các Views mà không cần làm bằng tay quá nhiều.\
Khi model thay đổi giá trị, tất cả các Views cũng sẽ lập tức cập nhật, do đó cũng loại bỏ rủi ro các Views hiển thị chung data nhưng lại không đồng bộ.

## @Binding
So sánh @Binding với 3 khái niệm trên có lẽ không đúng lắm vì chúng không thực sự có chung một nhiệm vụ. Tuy nhiên đây cũng là một khái niệm dễ gặp trong quá trình tìm hiểu về SwiftUI nên mình sẽ đưa luôn vào trong bài viết này.

@Binding là một Property Wrappers trong SwiftUI, nó cho phép chúng ta khai báo một giá trị thực chất được khai báo ở một nơi khác, nhưng được chia sẻ lẫn nhau. Hơi khó hiểu đúng không ? Xem ví dụ dưới đây để hiểu công dụng cũng như phân biệt nó với các khái niệm được nêu ở trên nhé.

Giả sử chúng ta khai báo một @State property dạng Bool để quyết định child View có được hiển thị hay không.

![](https://images.viblo.asia/3c0ca3b0-828f-49fd-b3cd-3b280f206afb.png)

Chúng ta sử dụng showingAddUser làm tham số, có nghĩa là nếu biến này nếu gắn bằng True thì Add User View sẽ hiện ra


Vậy bây giờ, làm sao để cho Add User View tự dismiss nó khi cần thiết (chẳn hạn như người dùng ấn Done)
Thứ chúng ta cần là làm sao showAddUser được set về false, nó sẽ khiến ContentView tự động ẩn đi Add User View. Đấy chính là lúc cần tới @Binding. Nó cho phép tạo ra một thuộc tính trong Add User View và báo cho nó rằng giá trị của biến này sẽ được cung cấp từ một nơi khác, và giá trị đó sẽ được chia sẻ cho Add User View và những View khác.

Bổ sung đoạn code sau vào AddUserView

![](https://images.viblo.asia/0bb0e30f-6265-4f1c-b82d-8b23c108f07b.png)

@Binding var isPresnter ở đây có thể hiểu, tôi có 1 biến kiểu dữ liệu Boolean gọi là isPresenter,  giá trị của nó sẽ được cung cấp ở một nơi khác. Và vì giá trị của biến này được chia sẻ ở nhiều nơi, nên khi thay đổi giá trị, nó cũng sẽ cập nhật lại giá trị ở những View khác.

Thay thế đoạn code sau vào ContentView

![](https://images.viblo.asia/78619c8f-3db8-41e0-8cfa-805bb67247e3.png)

Do đã nói ở trên, isPresented là một @Binding property, chúng ta cần cung cấp giá trị cho nó để nó có thể sử dụng.

Ta truyền vào $showingAddUser, tức là cho phép cả ContentView và AddView chia sẻ chung một giá trị Boolean, và khi có sự thay đổi ở 1 nơi, nó cũng sẽ thay đổi ở tất cả Views khác.

## Tổng kết
- @State được sử dụng cho những kiểu dữ liệu đơn giản, thuộc về một view duy nhất và nên được khai báo private
- @ObservedObject sử dụng cho những kiểu dữ liệu phức tạp hơn như các class chúng ta định nghĩa và có thể được chia sẻ cho nhiều Views. Đây cũng là kiểu lưu trữ State hữu dụng và sử dụng phổ biết nhất
- @EnviromentObject sử dụng cho những thuộc tính được khởi tạo ở một nơi nào đó trong App nhưng có thể truy xuất ở mọi nơi
- @Binding được sử dụng khi muốn đánh dấu giá trị của một biến trong View được cung cấp từ một nơi khác và chia sẻ lẫn nhau


### Nguồn tham khảo
https://www.hackingwithswift.com/quick-start/swiftui/whats-the-difference-between-observedobject-state-and-environmentobject